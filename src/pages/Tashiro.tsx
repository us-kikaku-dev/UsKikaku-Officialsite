import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { ExternalLink } from 'lucide-react';
import { client, TashiroArticle } from '../lib/client';
import tashiroProfile from '../assets/tashiro-profile.webp';

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
          content="U's企画 執行役員 田代昌之の公式プロフィール。ラジオNIKKEI「マーケットプレス」パーソナリティ。年間延べ5,000社の決算短信を読み、500社のIR担当者と話す。MFTA®保有。"
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
                    U's企画 執行役員 / ラジオNIKKEI番組パーソナリティ
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
                      年間延べ5,000社の決算短信を読み、<br />
                      500社のIR担当者と話す<br />
                      ラジオNIKKEIパーソナリティ。
                    </p>
                  </div>

                  <div
                    className="leading-relaxed text-justify mb-10"
                    style={{ color: '#475569', maxWidth: '42rem' }}
                  >
                    <p className="text-base mb-4">
                      北海道出身。新光証券（現みずほ証券）やシティバンク、投資助言会社などでアナリスト業務やコンプライアンス業務を経験したのち、暗号資産交換業者や証券会社の取締役に従事。
                    </p>
                    <p className="text-base mb-4">
                      2026年よりU's企画に参画。IFTA国際検定テクニカルアナリスト3次資格（MFTA®）を保有。「金融文筆家」としても活動中。
                    </p>
                    <p className="text-base mb-4">
                      ラジオNIKKEI「マーケットプレス」などの株式番組でレギュラーパーソナリティを務める傍ら、上場企業の決算説明会資料の作成支援や、投資家とのコミュニケーション戦略の立案に従事。複雑な市場動向や企業財務を、個人投資家にも分かりやすく噛み砕いて伝える解説スタイルに定評がある。
                    </p>
                    <p className="text-base">
                      また、金融文筆家として、江戸時代の経済を背景とした論文を複数本執筆。現在、暗号資産をモチーフとした小説を作成中。
                    </p>
                  </div>

                  {/* 資格・所属 */}
                  <div className="mb-10">
                    <h3
                      className="text-sm font-bold tracking-wide mb-4 inline-flex flex-col gap-2"
                      style={{ color: '#0f172a' }}
                    >
                      資格・所属
                      <span className="block" style={{ width: '1.5rem', height: '2px', backgroundColor: '#0f172a' }} />
                    </h3>
                    <ul className="space-y-2 text-base" style={{ color: '#475569' }}>
                      <li>ラジオNIKKEI マーケットプレス パーソナリティ</li>
                      <li>国際テクニカルアナリスト連盟 検定テクニカルアナリスト（MFTA®）</li>
                      <li>NPO法人 日本テクニカルアナリスト協会 評議員</li>
                      <li>All About 資産運用・ビットコイン ガイド</li>
                      <li>楽天トウシルにも記事掲載中</li>
                    </ul>
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
