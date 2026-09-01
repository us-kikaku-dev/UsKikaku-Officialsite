# プロジェクトルール

## Codex 連携ルール

- **実装前の方針確認と実装後の監査を Codex に依頼する**: 一定規模の実装は、着手前に
  `./scripts/codex-review.sh` で設計方針を確認し、実装後に差分の監査を受ける。
  Request changes が返ったら指摘を反映して再監査し、Approve を得てから PR にする
- **Codex に実装を依頼した方が良いと判断した場合は依頼してよい**。その場合は
  Claude Code が成果物のレビューを担当する（役割の逆転）
- **絶対に余分な課金を発生させない**: 呼び出しは必ず scripts/codex-review.sh 経由
  （課金ガード 3 重入り）。codex コマンドを直接叩かない。`--with-api-key` や
  OPENAI_API_KEY の設定は禁止
- 推論強度の使い分け: 方針確認・再確認は `--effort low〜medium`、実装監査は
  `--effort high`。トークン節約のため、依頼文には差分の場所 (ブランチ・コミット
  範囲) と観点を明記し、Codex 自身に diff を読ませる
