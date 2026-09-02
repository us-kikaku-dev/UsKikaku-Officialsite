import { Helmet } from 'react-helmet-async';
import seoConfig from '../../config/seoRoutes.json';

/**
 * 全ページ共通のSEOメタタグ出力コンポーネント。
 *
 * - title / description / canonical / OGP / Twitter Card を一括で出力する
 * - 静的ルートは src/config/seoRoutes.json に定義があり、path だけ渡せば
 *   タイトル・説明文が補完される（ビルド時のSEOスタブ生成スクリプト
 *   scripts/generate-seo-pages.mjs と同じ定義を共有し、静的HTMLと
 *   Helmetの出力内容を一致させる）
 * - ページ側で個別のHelmetを併用しないこと（タグ重複はcanonical無視等の
 *   SEO事故につながる）
 */
interface SeoProps {
    /** サイトルートからのパス（例: "/news/abc123"）。canonical と og:url に使う */
    path: string;
    /** ページタイトル。静的ルートは seoRoutes.json の定義で補完される */
    title?: string;
    /** ページ説明文。静的ルートは seoRoutes.json の定義で補完される */
    description?: string;
    ogType?: 'website' | 'article';
    /** OG画像の絶対URL。未指定時はサイト既定画像 */
    ogImage?: string;
    /** ogType="article" のときの公開日時（ISO 8601） */
    publishedTime?: string;
    /** 検索エンジンにインデックスさせないページ（404等）。canonicalは出力しない */
    noindex?: boolean;
}

export const Seo = ({ path, title, description, ogType = 'website', ogImage, publishedTime, noindex }: SeoProps) => {
    const routeMeta = seoConfig.routes.find((r) => r.path === path);
    const resolvedTitle = title ?? routeMeta?.title ?? seoConfig.siteName;
    const resolvedDescription = description ?? routeMeta?.description ?? '';
    const url = `${seoConfig.siteUrl}${path === '/' ? '/' : path}`;
    const image = ogImage ?? `${seoConfig.siteUrl}${seoConfig.defaultOgImage}`;

    return (
        <Helmet>
            <title>{resolvedTitle}</title>
            <meta name="description" content={resolvedDescription} />
            {noindex ? (
                <meta name="robots" content="noindex" />
            ) : (
                <link rel="canonical" href={url} />
            )}
            <meta property="og:site_name" content={seoConfig.siteName} />
            <meta property="og:title" content={resolvedTitle} />
            <meta property="og:description" content={resolvedDescription} />
            <meta property="og:type" content={ogType} />
            <meta property="og:url" content={url} />
            <meta property="og:image" content={image} />
            {publishedTime && <meta property="article:published_time" content={publishedTime} />}
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:title" content={resolvedTitle} />
            <meta name="twitter:description" content={resolvedDescription} />
            <meta name="twitter:image" content={image} />
        </Helmet>
    );
};
