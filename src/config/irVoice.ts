/**
 * IR Voice のHP掲載まわりの設定値。
 * リンク先URLはこのファイルに集約し、各コンポーネントにURLを直書きしないこと。
 */

/**
 * 公式LPのURL（2026-07-18 公開済み）。
 * 空文字に戻すとLPへのリンクを描画せず「準備中」表示にフォールバックする。
 */
export const IR_VOICE_LP_URL = 'https://ir-voice.com';

/**
 * 企業向けページのURL。
 *
 * ※本番の企業向けページは /lp/for-business 配下にある（2026-07-18時点）。
 *   /for-business は404。ルートへの移設や /for-business へのリダイレクトが
 *   IR-SaaS側で入ったらここを更新すること。
 */
export const IR_VOICE_LP_FOR_BUSINESS_URL = 'https://ir-voice.com/lp/for-business';

/**
 * リリース予定日の表示ラベル。
 * トップページとヒーローの両方で使う。延期等の変更はここだけ直せばよい。
 * 表示側では必ず「リリース予定」と組で使うこと（断定表記にしない）。
 */
export const IR_VOICE_RELEASE_DATE_LABEL = '2026年8月1日';

/**
 * App Store で公開済みかどうか。
 *
 * ★公開時に true へ変更する。あわせて公式LP側の `appLaunched` も true にすること
 *  （/Users/ishiharayuuta/code/IR-SaaS/apps/web-biz/src/app/(marketing)/_components/lp-config.ts）。
 *  false の間はリリース予定表示のみで、ダウンロード導線は一切出さない。
 *  公開時はDL用CTAの配置を改めて設計する（ストアバッジ等）。
 */
export const IR_VOICE_APP_LAUNCHED = false;

/** 問い合わせ先 */
export const IR_VOICE_CONTACT_EMAIL = 'info@us-kikaku.com';

/** 公式LPへのリンクを描画してよいか */
export const isLpLinkReady = (): boolean => IR_VOICE_LP_URL !== '';
