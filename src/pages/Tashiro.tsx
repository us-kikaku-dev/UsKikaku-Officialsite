import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { ExternalLink } from 'lucide-react';
import { client, TashiroArticle } from '../lib/client';
import tashiroProfile from '../assets/tashiro-profile.png';

const MEDIA_PROGRAM_URL = 'https://www.radionikkei.jp/personality/personality/masayukitashiro.html';
const X_PROFILE_URL = 'https://x.com/crypto_fin256?s=21';

function formatDate(dateStr: string): string {
  const d = new Date(dateStr);
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${y}.${m}.${day}`;
}

function ArticleCard({ article }: { article: TashiroArticle }) {
  return (
    <a
      className="snap-start bg-white border rounded-sm transition-all group flex flex-col h-full overflow-hidden cursor-pointer"
      style={{ borderColor: '#e2e8f0', minWidth: '280px', maxWidth: '320px', flexShrink: 0 }}
      href={article.url}
      target="_blank"
      rel="noopener noreferrer"
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLElement).style.borderColor = '#94a3b8';
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLElement).style.borderColor = '#e2e8f0';
      }}
    >
      <div
        className="w-full flex items-center justify-center relative overflow-hidden"
        style={{ aspectRatio: '16/9', backgroundColor: '#f8fafc' }}
      >
        {article.image ? (
          <img
            src={article.image.url}
            alt={article.title}
            className="w-full h-full object-cover"
            loading="lazy"
          />
        ) : (
          <span
            className="material-symbols-outlined"
            style={{ fontSize: '2.25rem', color: '#cbd5e1' }}
          >
            image
          </span>
        )}
      </div>
      <div className="p-5 flex-grow flex flex-col">
        <div className="flex items-center justify-between mb-3">
          <span
            className="font-bold uppercase rounded-sm"
            style={{
              fontSize: '10px',
              letterSpacing: '0.05em',
              color: '#475569',
              backgroundColor: '#f1f5f9',
              padding: '0.25rem 0.5rem',
            }}
          >
            {article.media}
          </span>
          <time
            className="font-medium"
            style={{ fontSize: '10px', color: '#94a3b8' }}
          >
            {formatDate(article.date)}
          </time>
        </div>
        <div className="flex items-start justify-between gap-2">
          <h3
            className="text-base font-bold leading-snug line-clamp-2"
            style={{ color: '#0f172a' }}
          >
            {article.title}
          </h3>
          <ExternalLink className="w-4 h-4 shrink-0" style={{ color: '#94a3b8', marginTop: '0.125rem' }} />
        </div>
      </div>
    </a>
  );
}

export const Tashiro = () => {
  const [articles, setArticles] = useState<TashiroArticle[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const data = await client.get({
          endpoint: 'article',
          queries: { limit: 6, orders: '-date' },
        });
        setArticles(data.contents);
      } catch (error) {
        console.error('Failed to fetch tashiro articles:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchArticles();
  }, []);

  return (
    <>
      <Helmet>
        <title>田代 昌之 | U's企画</title>
        <meta
          name="description"
          content="金融文筆家 田代昌之の公式プロフィール。ラジオNIKKEI「マーケットプレス」パーソナリティ。上場企業のIR支援と市場解説を専門とする。"
        />
      </Helmet>

      <div className="pt-20 bg-white antialiased" style={{ color: '#1e293b' }}>
        {/* ===== Hero ===== */}
        <section className="relative bg-white" id="hero" style={{ paddingTop: '3rem', paddingBottom: '5rem' }}>
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
              {/* テキスト側 */}
              <div className="flex flex-col lg:col-span-7 order-2 lg:order-1 pt-4">
                <div className="flex flex-col gap-1 mb-10">
                  <span
                    className="font-medium tracking-wide text-sm mb-2"
                    style={{ color: '#64748b' }}
                  >
                    ラジオNIKKEI パーソナリティ / U's企画 執行役員
                  </span>
                  <h1
                    className="font-bold tracking-tight lg:text-7xl"
                    style={{ fontSize: '3rem', color: '#0f172a', marginBottom: '0.5rem', lineHeight: 1.1 }}
                  >
                    田代 昌之
                  </h1>
                  <p
                    className="font-light tracking-wide text-xl"
                    style={{ color: '#94a3b8', marginBottom: '2rem' }}
                  >
                    Masayuki Tashiro
                  </p>

                  <div className="mb-8">
                    <p
                      className="font-bold leading-snug text-2xl"
                      style={{ color: '#0f172a' }}
                    >
                      金融文筆家。<br />
                      上場企業のIR支援と市場解説を専門とする。<br />
                      ラジオNIKKEI「マーケットプレス」レギュラーパーソナリティ。
                    </p>
                  </div>

                  <div
                    className="leading-relaxed text-justify mb-10"
                    style={{ color: '#475569', maxWidth: '42rem' }}
                  >
                    <p className="text-base mb-4">
                      金融文筆家。北海道出身。2011年より株式投資を開始し、個人投資家としての経験を経て、現在は投資家向け広報（IR）支援およびマーケット解説の第一線で活動中。
                    </p>
                    <p className="text-base mb-4">
                      ラジオNIKKEI「マーケットプレス」などの経済番組でレギュラーパーソナリティを務める傍ら、上場企業の決算説明会資料の作成支援や、投資家とのコミュニケーション戦略の立案に従事。複雑な市場動向や企業財務を、個人投資家にも分かりやすく噛み砕いて伝える解説スタイルに定評がある。
                    </p>
                    <p className="text-base">
                      公平かつ中立的な視点に基づいた分析は、多くの個人投資家から信頼を集めており、各種メディアへの寄稿や講演活動も精力的に行っている。
                    </p>
                  </div>

                  {/* X CTA - 囲い背景なし */}
                  <div className="mt-2">
                    <a
                      className="inline-flex items-center justify-center gap-3 text-white px-8 py-3 rounded-sm font-bold transition-all shadow-sm w-full sm:w-[40%]"
                      style={{ backgroundColor: '#0f172a' }}
                      href={X_PROFILE_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      onMouseEnter={(e) => {
                        (e.currentTarget as HTMLElement).style.backgroundColor = '#333333';
                      }}
                      onMouseLeave={(e) => {
                        (e.currentTarget as HTMLElement).style.backgroundColor = '#0f172a';
                      }}
                    >
                      <svg
                        aria-hidden="true"
                        className="h-4 w-4"
                        viewBox="0 0 24 24"
                        style={{ fill: 'currentColor' }}
                      >
                        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                      </svg>
                      <span className="text-sm">Xをフォロー</span>
                      <ExternalLink className="w-4 h-4 shrink-0" />
                    </a>
                  </div>
                </div>
              </div>

              {/* 写真側 */}
              <div className="relative lg:col-span-5 order-1 lg:order-2">
                <div
                  className="relative w-full overflow-hidden rounded-sm"
                  style={{ aspectRatio: '3/4', backgroundColor: '#f8fafc' }}
                >
                  <img
                    alt="田代 昌之"
                    className="h-full w-full object-cover object-top"
                    src={tashiroProfile}
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ===== メディア出演 ===== */}
        <section
          className="py-24"
          id="media"
          style={{ backgroundColor: '#f8fafc', borderTop: '1px solid #e2e8f0', borderBottom: '1px solid #e2e8f0' }}
        >
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="flex flex-col" style={{ gap: '2.5rem' }}>
              <div>
                <h2
                  className="text-xl font-bold tracking-tight inline-flex flex-col gap-3"
                  style={{ color: '#0f172a' }}
                >
                  メディア出演
                  <span className="block" style={{ width: '1.5rem', height: '2px', backgroundColor: '#0f172a', marginTop: '0.25rem' }} />
                </h2>
              </div>

              <div className="w-full">
                <div
                  className="bg-white p-8 lg:p-10 rounded-sm shadow-sm flex flex-col md:flex-row items-center justify-between gap-8 mx-auto max-w-4xl"
                  style={{ border: '1px solid #e2e8f0' }}
                >
                  <div className="flex-grow text-center md:text-left">
                    <div
                      className="inline-flex items-center justify-center md:justify-start w-full md:w-auto"
                      style={{ marginBottom: '1.25rem' }}
                    >
                      <div
                        className="h-8 px-4 rounded-sm flex items-center justify-center font-bold uppercase"
                        style={{
                          backgroundColor: '#f1f5f9',
                          border: '1px solid #e2e8f0',
                          fontSize: '10px',
                          color: '#64748b',
                          letterSpacing: '0.1em',
                        }}
                      >
                        Radio NIKKEI
                      </div>
                    </div>
                    <h3
                      className="text-xl font-bold leading-tight mb-3"
                      style={{ color: '#0f172a' }}
                    >
                      ラジオNIKKEI「マーケットプレス」<br />パーソナリティ
                    </h3>
                    <p className="text-base leading-relaxed" style={{ color: '#64748b' }}>
                      レギュラーパーソナリティ（後場）を担当。<br className="md:hidden" />
                      市場の動きをリアルタイムで解説。
                    </p>
                  </div>
                  <a
                    className="shrink-0 inline-flex items-center justify-center gap-2 rounded-sm px-8 text-sm font-bold text-white shadow-sm transition-all w-full md:w-auto"
                    style={{ backgroundColor: '#0f172a', minWidth: '200px', paddingTop: '0.875rem', paddingBottom: '0.875rem' }}
                    href={MEDIA_PROGRAM_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    onMouseEnter={(e) => {
                      (e.currentTarget as HTMLElement).style.backgroundColor = '#1e293b';
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget as HTMLElement).style.backgroundColor = '#0f172a';
                    }}
                  >
                    <span>番組ページを見る</span>
                    <ExternalLink className="w-4 h-4 shrink-0" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ===== 記事寄稿 ===== */}
        <section className="py-24 bg-white" id="articles">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="flex flex-col gap-12 mb-12">
              <div>
                <h2
                  className="text-xl font-bold tracking-tight inline-flex flex-col gap-3 mb-2"
                  style={{ color: '#0f172a' }}
                >
                  記事寄稿
                  <span className="block" style={{ width: '1.5rem', height: '2px', backgroundColor: '#0f172a', marginTop: '0.25rem' }} />
                </h2>
                <p className="text-sm leading-relaxed mt-2" style={{ color: '#64748b' }}>
                  各種メディアにて市場分析・資本市場論考を寄稿しています。
                </p>
              </div>

              <div className="w-full">
                {loading ? (
                  <div className="flex justify-center py-24">
                    <div className="h-8 w-8 rounded-sm" style={{ border: '2px solid #e2e8f0', borderTopColor: '#0f172a', animation: 'spin 1s linear infinite' }} />
                  </div>
                ) : articles.length > 0 ? (
                  <div
                    className="flex overflow-x-auto pb-8 gap-6 justify-start lg:justify-center"
                    style={{ scrollSnapType: 'x mandatory' }}
                  >
                    {articles.map((article) => (
                      <ArticleCard key={article.id} article={article} />
                    ))}
                  </div>
                ) : (
                  <p className="text-center py-12" style={{ color: '#94a3b8' }}>記事はまだありません。</p>
                )}

                <div className="mt-8 text-center">
                  <Link
                    to="/tashiro/articles"
                    className="inline-flex items-center justify-center rounded-sm px-10 py-4 text-sm font-bold text-white transition-all"
                    style={{ backgroundColor: '#0f172a', minWidth: '240px', boxShadow: '0 4px 6px -1px rgba(0,0,0,.1)' }}
                    onMouseEnter={(e) => {
                      (e.currentTarget as HTMLElement).style.backgroundColor = '#1e293b';
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget as HTMLElement).style.backgroundColor = '#0f172a';
                    }}
                  >
                    すべての記事を見る
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};
