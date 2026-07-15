/**
 * IR Voice のHP掲載まわりの設定値。
 *
 * 公式LPは本番公開・独自ドメイン取得がまだ完了していないため、
 * リンク先URLはこのファイルだけを差し替えれば全箇所に反映される形にしている。
 * 各コンポーネントにURLを直書きしないこと。
 */

/**
 * 公式LPのURL。
 *
 * ★ドメイン確定後、ここだけを実URLに差し替える（例: 'https://ir-voice.jp'）。
 * 空文字の間はLPへのリンクを描画せず「準備中」表示にフォールバックするため、
 * リンク切れ（'#' への遷移）は発生しない。
 *
 * ※検証環境 https://web-biz--ir-saas-staging.asia-east1.hosted.app/lp は
 *   社内確認用のため、公開リンク先として設定しないこと。
 */
export const IR_VOICE_LP_URL = '';

/** 企業向けページのURL。LPのURLが決まると自動で組み立てられる */
export const IR_VOICE_LP_FOR_BUSINESS_URL = IR_VOICE_LP_URL
    ? `${IR_VOICE_LP_URL.replace(/\/$/, '')}/for-business`
    : '';

/**
 * App Store で公開済みかどうか。
 *
 * ★公開時に true へ変更する。あわせて公式LP側の `appLaunched` も true にすること
 *  （/Users/ishiharayuuta/code/IR-SaaS/apps/web-biz/src/app/(marketing)/_components/lp-config.ts）。
 *  false の間は「近日公開」表示のみで、ダウンロード導線は一切出さない。
 */
export const IR_VOICE_APP_LAUNCHED = false;

/** 問い合わせ先 */
export const IR_VOICE_CONTACT_EMAIL = 'info@us-kikaku.com';

/** 公式LPへのリンクを描画してよいか */
export const isLpLinkReady = (): boolean => IR_VOICE_LP_URL !== '';
