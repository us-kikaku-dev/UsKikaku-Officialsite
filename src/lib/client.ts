import { createClient } from 'microcms-js-sdk';

// Initialize the client with environment variables
// Users will need to set these in a .env file
export const client = createClient({
    serviceDomain: import.meta.env.VITE_MICROCMS_SERVICE_DOMAIN || 'YOUR_DOMAIN',
    apiKey: import.meta.env.VITE_MICROCMS_API_KEY || 'YOUR_API_KEY',
});

// Capital Voice Japan（irmedia）用クライアント
export const capitalVoiceClient = createClient({
    serviceDomain: import.meta.env.VITE_CAPITAL_VOICE_SERVICE_DOMAIN || 'YOUR_DOMAIN',
    apiKey: import.meta.env.VITE_CAPITAL_VOICE_API_KEY || 'YOUR_API_KEY',
});

// Type definitions for Blog and News
export type Blog = {
    id: string;
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
    revisedAt: string;
    title: string;
    content: string;
    date?: string; // 公開日
    business_type?: string[]; // セレクトフィールド (複数選択の可能性も考慮して配列)
    tag?: string[]; // タグ (複数選択の可能性も考慮して配列)
    thumbnail?: {
        url: string;
        height: number;
        width: number;
    };
    description?: string;
};

export type TashiroArticle = {
    id: string;
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
    revisedAt: string;
    title: string;
    media: string;
    date: string;
    image?: {
        url: string;
        height: number;
        width: number;
    };
    url: string;
    category?: string[];
};

// Capital Voice Japan の記事型
export type CapitalVoiceArticle = {
    id: string;
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
    revisedAt: string;
    title: string;
    publishdate: string; // 取材日
    category?: string[];
    tags?: string[];
    eyecatch?: {
        url: string;
        height: number;
        width: number;
    };
    description?: string;
    company?: {
        id: string;
        companyName?: string;
        stockCode?: string;
    };
};

export type News = {
    id: string;
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
    revisedAt: string;
    title: string;
    date: string; // 投稿日
    business_type: string[]; // 事業種別：セレクトフィールド（IRコンサルティング、プロダクト、コーポレート、その他）
    category: string[]; // カテゴリ：セレクトフィールド（お知らせ、プレスリリース、イベント・セミナー、メディア掲載、実績・事例公開、IR更新、採用情報）
    image?: {
        url: string;
        height: number;
        width: number;
    };
    content: string; // 本文：リッチエディター
};
