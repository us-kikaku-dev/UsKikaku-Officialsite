/**
 * SEOスタブ生成スクリプト（監査バッチ3・案B）
 *
 * vite build 後に実行し、以下を生成する:
 *  1. 静的ルートごとの dist/<route>.html（index.htmlのSEO領域をルート固有メタに置換）
 *  2. microCMSの news / blog 全記事の dist/news/<id>.html, dist/blog/<id>.html
 *  3. dist/sitemap.xml（静的ルート＋記事URL）
 *
 * 設計メモ:
 *  - メタ定義は src/config/seoRoutes.json を単一の情報源とし、
 *    クライアント側の Seo コンポーネントと内容を一致させる
 *  - 生成タグには data-rh="true" を付け、react-helmet-async に引き継がせて重複を防ぐ
 *  - ファイルは <route>.html のフラット形式（Netlifyは /company を company.html から
 *    配信するため、末尾スラッシュへのリダイレクトが発生せず、canonicalの
 *    「スラッシュなし」形式と一致する）
 *  - CMS取得失敗時はビルドを失敗させる（記事ゼロのsitemap/HTMLを本番に出さない）
 */
import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'node:fs';
import path from 'node:path';
import process from 'node:process';

const ROOT = path.resolve(new URL('.', import.meta.url).pathname, '..');
const DIST = path.join(ROOT, 'dist');
const seoConfig = JSON.parse(readFileSync(path.join(ROOT, 'src/config/seoRoutes.json'), 'utf8'));

// ---- 環境変数（Netlifyでは環境変数、ローカルでは.envから同名キーのみ読む） ----
const loadEnvVar = (name) => {
    if (process.env[name]) return process.env[name];
    const envPath = path.join(ROOT, '.env');
    if (existsSync(envPath)) {
        // 必要なキーの値だけを取り出す（値はログに出さないこと）
        const line = readFileSync(envPath, 'utf8')
            .split('\n')
            .find((l) => l.trim().startsWith(`${name}=`));
        if (line) return line.slice(line.indexOf('=') + 1).trim().replace(/^["']|["']$/g, '');
    }
    return undefined;
};

const SERVICE_DOMAIN = loadEnvVar('VITE_MICROCMS_SERVICE_DOMAIN');
const API_KEY = loadEnvVar('VITE_MICROCMS_API_KEY');

// ローカル検証用: SEO_SKIP_CMS=1 で記事生成をスキップし静的ルートのみ生成する。
// 本番（Netlify）では設定しないこと。CMS未設定・取得失敗はビルド失敗が正。
const SKIP_CMS = process.env.SEO_SKIP_CMS === '1';

if (!SKIP_CMS && (!SERVICE_DOMAIN || !API_KEY)) {
    console.error('エラー: VITE_MICROCMS_SERVICE_DOMAIN / VITE_MICROCMS_API_KEY が未設定です。');
    console.error('  記事メタとsitemapを生成できないため、ビルドを中断します。');
    console.error('  （静的ルートのみのローカル検証は SEO_SKIP_CMS=1 を指定）');
    process.exit(1);
}

// ---- ユーティリティ ----
const escapeAttr = (value) =>
    String(value)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;');

// microCMSのコンテンツIDのみ許可（パス逸脱・URL破壊を防ぐ）
const isSafeId = (id) => /^[A-Za-z0-9_-]{1,64}$/.test(id);

const SEO_REGION = /<!-- SEO:START[\s\S]*?<!-- SEO:END -->/;

/** Seoコンポーネントと同一内容のメタタグ群を生成する */
const buildSeoTags = ({ title, description, pathName, ogType = 'website', ogImage, publishedTime }) => {
    const url = `${seoConfig.siteUrl}${pathName === '/' ? '/' : pathName}`;
    const image = ogImage ?? `${seoConfig.siteUrl}${seoConfig.defaultOgImage}`;
    const t = escapeAttr(title);
    const d = escapeAttr(description);
    const u = escapeAttr(url);
    const img = escapeAttr(image);
    const lines = [
        `<title data-rh="true">${t}</title>`,
        `<meta data-rh="true" name="description" content="${d}" />`,
        `<link data-rh="true" rel="canonical" href="${u}" />`,
        `<meta data-rh="true" property="og:site_name" content="${escapeAttr(seoConfig.siteName)}" />`,
        `<meta data-rh="true" property="og:title" content="${t}" />`,
        `<meta data-rh="true" property="og:description" content="${d}" />`,
        `<meta data-rh="true" property="og:type" content="${ogType}" />`,
        `<meta data-rh="true" property="og:url" content="${u}" />`,
        `<meta data-rh="true" property="og:image" content="${img}" />`,
    ];
    if (publishedTime) {
        lines.push(`<meta data-rh="true" property="article:published_time" content="${escapeAttr(publishedTime)}" />`);
    }
    lines.push(
        `<meta data-rh="true" name="twitter:card" content="summary_large_image" />`,
        `<meta data-rh="true" name="twitter:title" content="${t}" />`,
        `<meta data-rh="true" name="twitter:description" content="${d}" />`,
        `<meta data-rh="true" name="twitter:image" content="${img}" />`,
    );
    return lines.map((l) => `  ${l}`).join('\n');
};

/** ルートパス→出力ファイルパス（フラット形式）。dist外への逸脱を検証する */
const outputFileFor = (routePath) => {
    const rel = routePath === '/' ? 'index.html' : `${routePath.replace(/^\//, '')}.html`;
    const abs = path.resolve(DIST, rel);
    if (!abs.startsWith(DIST + path.sep) && abs !== path.join(DIST, 'index.html')) {
        throw new Error(`出力先がdist外です: ${routePath}`);
    }
    return abs;
};

// ---- microCMS 全件取得（totalCountに従いページング） ----
const fetchAll = async (endpoint, fields) => {
    const contents = [];
    const limit = 100;
    let offset = 0;
    for (;;) {
        // orders は複数フィールドで安定ソートにする（publishedAt が同値でも
        // ページ境界の重複・欠落が起きないよう createdAt をタイブレークに使う）
        const url = `https://${SERVICE_DOMAIN}.microcms.io/api/v1/${endpoint}?limit=${limit}&offset=${offset}&fields=${fields}&orders=-publishedAt,createdAt`;
        const res = await fetch(url, { headers: { 'X-MICROCMS-API-KEY': API_KEY } });
        if (!res.ok) {
            throw new Error(`microCMS ${endpoint} の取得に失敗しました: HTTP ${res.status}`);
        }
        const data = await res.json();
        contents.push(...data.contents);
        offset += limit;
        if (offset >= data.totalCount) break;
    }
    return contents;
};

// ---- メイン ----
const template = readFileSync(path.join(DIST, 'index.html'), 'utf8');
if (!SEO_REGION.test(template)) {
    console.error('エラー: dist/index.html に SEO:START/END マーカーが見つかりません。');
    process.exit(1);
}

const writePage = (routePath, meta) => {
    const html = template.replace(SEO_REGION, buildSeoTags({ ...meta, pathName: routePath }).trimStart());
    const file = outputFileFor(routePath);
    mkdirSync(path.dirname(file), { recursive: true });
    writeFileSync(file, html);
};

const sitemapEntries = [];

// 1. 静的ルート
for (const route of seoConfig.routes) {
    writePage(route.path, { title: route.title, description: route.description });
    sitemapEntries.push({
        loc: `${seoConfig.siteUrl}${route.path === '/' ? '/' : route.path}`,
        changefreq: route.changefreq,
        priority: route.priority,
    });
}

// 2. CMS記事（news / blog）
if (SKIP_CMS) {
    console.warn('警告: SEO_SKIP_CMS=1 のため記事ページとsitemapの記事URLを生成していません（ローカル検証用）。');
}
const [newsItems, blogItems] = SKIP_CMS
    ? [[], []]
    : await Promise.all([
          fetchAll('news', 'id,title,publishedAt,revisedAt,image'),
          fetchAll('blog', 'id,title,description,publishedAt,revisedAt,thumbnail'),
      ]);

for (const item of newsItems) {
    if (!isSafeId(item.id)) {
        console.warn(`スキップ: 不正な形式のニュースID "${item.id}"`);
        continue;
    }
    writePage(`/news/${item.id}`, {
        title: `${item.title} | ${seoConfig.siteName}`,
        description: `${seoConfig.siteName}のニュース記事です。`,
        ogType: 'article',
        ogImage: item.image?.url,
        publishedTime: item.publishedAt,
    });
    sitemapEntries.push({
        loc: `${seoConfig.siteUrl}/news/${item.id}`,
        lastmod: (item.revisedAt || item.publishedAt).slice(0, 10),
        changefreq: 'monthly',
        priority: '0.6',
    });
}

for (const item of blogItems) {
    if (!isSafeId(item.id)) {
        console.warn(`スキップ: 不正な形式のブログID "${item.id}"`);
        continue;
    }
    writePage(`/blog/${item.id}`, {
        title: `${item.title} | ${seoConfig.siteName}`,
        description: item.description || `${seoConfig.siteName}のコラム記事です。`,
        ogType: 'article',
        ogImage: item.thumbnail?.url,
        publishedTime: item.publishedAt,
    });
    sitemapEntries.push({
        loc: `${seoConfig.siteUrl}/blog/${item.id}`,
        lastmod: (item.revisedAt || item.publishedAt).slice(0, 10),
        changefreq: 'monthly',
        priority: '0.6',
    });
}

// 3. sitemap.xml
const sitemap = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
    ...sitemapEntries.map((e) =>
        [
            '  <url>',
            `    <loc>${escapeAttr(e.loc)}</loc>`,
            e.lastmod ? `    <lastmod>${e.lastmod}</lastmod>` : null,
            `    <changefreq>${e.changefreq}</changefreq>`,
            `    <priority>${e.priority}</priority>`,
            '  </url>',
        ]
            .filter(Boolean)
            .join('\n'),
    ),
    '</urlset>',
    '',
].join('\n');
writeFileSync(path.join(DIST, 'sitemap.xml'), sitemap);

console.log(
    `SEOスタブ生成完了: 静的${seoConfig.routes.length}ルート / ニュース${newsItems.length}件 / ブログ${blogItems.length}件 / sitemap ${sitemapEntries.length}URL`,
);
