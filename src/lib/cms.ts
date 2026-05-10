// microCMS共通ヘルパー
// クライアント・型は client.ts、設定判定や共通関数はここに集約

/**
 * 環境変数が「未設定」相当（空 or プレースホルダー）かを判定
 */
const isPlaceholder = (value: string | undefined, placeholder: string): boolean => {
    return !value || value === placeholder;
};

/**
 * U's企画 microCMS が設定済みか判定（ドメイン・APIキー両方チェック）
 */
export const isCmsConfigured = (): boolean => {
    const domain = import.meta.env.VITE_MICROCMS_SERVICE_DOMAIN;
    const apiKey = import.meta.env.VITE_MICROCMS_API_KEY;
    return !isPlaceholder(domain, 'YOUR_DOMAIN') && !isPlaceholder(apiKey, 'YOUR_API_KEY');
};

/**
 * Capital Voice Japan microCMS が設定済みか判定（ドメイン・APIキー両方チェック）
 */
export const isCapitalVoiceConfigured = (): boolean => {
    const domain = import.meta.env.VITE_CAPITAL_VOICE_SERVICE_DOMAIN;
    const apiKey = import.meta.env.VITE_CAPITAL_VOICE_API_KEY;
    return !isPlaceholder(domain, 'YOUR_DOMAIN') && !isPlaceholder(apiKey, 'YOUR_API_KEY');
};

/**
 * 開発環境のときだけモックを許可するためのフラグ
 * 本番ではAPI失敗時にモック表示せず、空状態を見せる
 */
export const allowMockFallback = (): boolean => {
    return import.meta.env.DEV;
};

/**
 * 日付を YYYY.MM.DD 形式でフォーマット
 * CMS側の値欠落・形式違いに備え、invalid な場合は "-" を返す
 */
export const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    if (Number.isNaN(date.getTime())) return '-';
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}.${month}.${day}`;
};

/**
 * 日付を YYYY/MM/DD 形式でフォーマット（BlogSection 用）
 * CMS側の値欠落・形式違いに備え、invalid な場合は "-" を返す
 */
export const formatDateSlash = (dateString: string): string => {
    const date = new Date(dateString);
    if (Number.isNaN(date.getTime())) return '-';
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}/${month}/${day}`;
};
