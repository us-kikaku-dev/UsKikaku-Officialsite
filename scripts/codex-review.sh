#!/bin/bash
# Codex レビュー呼び出しラッパー (ChatGPT 月額プラン枠専用)
#
# 使い方:
#   ./scripts/codex-review.sh "レビュー依頼の本文"
#   ./scripts/codex-review.sh --effort low "軽い確認"     # low|medium|high|xhigh
#   echo "本文" | ./scripts/codex-review.sh -             # stdin から本文
#
# 課金ガード 3 重:
#   1. 環境変数 OPENAI_API_KEY が設定されていたら実行前に中止
#   2. ~/.codex/auth.json の auth_mode が chatgpt でなければ中止
#   3. codex login status が ChatGPT でなければ中止
set -euo pipefail

CODEX_BIN="${CODEX_BIN:-$HOME/.npm-global/bin/codex}"
EFFORT="high"

if [ ! -x "$CODEX_BIN" ]; then
  echo "エラー: codex が見つかりません ($CODEX_BIN)" >&2
  echo "  npm install -g @openai/codex でインストールしてください" >&2
  exit 1
fi

if [ "${1:-}" = "--effort" ]; then
  EFFORT="${2:?--effort の値が必要です}"
  shift 2
fi
case "$EFFORT" in
  low | medium | high | xhigh) ;;
  *)
    echo "エラー: --effort は low / medium / high / xhigh のいずれか" >&2
    exit 1
    ;;
esac

PROMPT="${1:?レビュー依頼の本文を渡してください}"
if [ "$PROMPT" = "-" ]; then
  PROMPT="$(cat)"
fi

# ── 課金ガード 1: 環境変数 ──
if [ -n "${OPENAI_API_KEY:-}" ]; then
  echo "中止: 環境変数 OPENAI_API_KEY が設定されています。" >&2
  echo "  このまま実行すると従量課金側に切り替わる恐れがあります。" >&2
  echo "  unset OPENAI_API_KEY してから再実行してください。" >&2
  exit 1
fi

# ── 課金ガード 2: auth.json の認証方式 ──
AUTH_MODE="$(
  python3 - <<'PY' 2>/dev/null || echo "unknown"
import json, os
try:
    d = json.load(open(os.path.expanduser("~/.codex/auth.json")))
    print(d.get("auth_mode") or "unknown")
except Exception:
    print("unknown")
PY
)"
if [ "$AUTH_MODE" != "chatgpt" ]; then
  echo "中止: 認証方式が chatgpt ではありません (auth_mode=$AUTH_MODE)" >&2
  echo "  従量課金になる可能性があるため実行しません。" >&2
  echo "  codex login   (ChatGPT アカウントでログイン) を実行してください。" >&2
  echo "  ※ --with-api-key は使わないこと (従量課金になります)" >&2
  exit 1
fi

# ── 課金ガード 3: ログイン状態の最終確認 ──
if ! "$CODEX_BIN" login status 2>&1 | grep -qi "ChatGPT"; then
  echo "中止: ChatGPT アカウントでログインしていません。" >&2
  "$CODEX_BIN" login status >&2 || true
  exit 1
fi

echo "── Codex へ依頼 (ChatGPT 枠 / 推論強度: $EFFORT) ──" >&2

# OPENAI_API_KEY を明示的に空で前置 (親シェルからの継承事故を二重に防ぐ)。
# stdin は /dev/null に固定必須: codex exec はプロンプト引数があっても stdin を
# 追加入力として読みに行き、パイプが閉じない環境では EOF 待ちで永久に固まる
OPENAI_API_KEY= \
  "$CODEX_BIN" exec \
  --skip-git-repo-check \
  -c "model_reasoning_effort=\"$EFFORT\"" \
  "$PROMPT" < /dev/null
