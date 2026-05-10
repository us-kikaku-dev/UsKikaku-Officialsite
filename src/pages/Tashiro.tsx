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
      className="bg-white border transition-all group flex flex-col h-full overflow-hidden cursor-pointer"
      style={{ borderColor: '#e5e1d6' }}
      href={article.url}
      target="_blank"
      rel="noopener noreferrer"
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLElement).style.borderColor = '#050A14';
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLElement).style.borderColor = '#e5e1d6';
      }}
    >
      <div
        className="w-full flex items-center justify-center relative overflow-hidden"
        style={{ aspectRatio: '16/9', backgroundColor: '#fafaf7' }}
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
      <div
        className="flex-grow flex flex-col"
        style={{ padding: '1.75rem 1.75rem 1.875rem' }}
      >
        <div
          className="flex items-center justify-between"
          style={{ marginBottom: '1.5rem' }}
        >
          <span
            className="font-medium uppercase"
            style={{
              fontSize: '10px',
              letterSpacing: '0.18em',
              color: '#64748b',
            }}
          >
            {article.media}
          </span>
          <time
            className="font-light"
            style={{
              fontSize: '11px',
              color: '#94a3b8',
              fontFamily: '"Cormorant Garamond", serif',
              letterSpacing: '0.1em',
            }}
          >
            {formatDate(article.date)}
          </time>
        </div>
        <h3
          className="text-base line-clamp-2"
          style={{
            color: '#050A14',
            fontWeight: 600,
            lineHeight: 1.65,
            letterSpacing: '0.02em',
            marginBottom: '1.5rem',
          }}
        >
          {article.title}
        </h3>
        <div
          className="flex items-center"
          style={{
            marginTop: 'auto',
            paddingTop: '0.5rem',
            borderTop: '1px solid #f1ede0',
            color: '#94a3b8',
            fontSize: '11px',
            letterSpacing: '0.18em',
            fontWeight: 500,
            justifyContent: 'space-between',
          }}
        >
          <span className="uppercase">Read More</span>
          <ExternalLink className="shrink-0" style={{ color: '#94a3b8', width: '14px', height: '14px' }} />
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
          queries: { limit: 3, orders: '-date' },
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
          content="U's企画 執行役員 田代昌之の公式プロフィール。ラジオNIKKEI「マーケット・テラス」コメンテーター。年間延べ5,000社の決算短信を読み、500社のIR担当者と話す。MFTA®保有。"
        />
      </Helmet>

      <div className="pt-20 bg-white antialiased" style={{ color: '#1e293b' }}>
        {/* ===== Hero ===== */}
        <section className="relative bg-white" id="hero" style={{ paddingTop: '3rem', paddingBottom: '5rem' }}>
          <div className="mx-auto max-w-5xl px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
              {/* テキスト側 */}
              <div className="flex flex-col lg:col-span-7 order-2 lg:order-1 pt-4">
                <span
                  className="font-medium tracking-wide text-sm mb-8"
                  style={{ color: '#64748b', letterSpacing: '0.08em' }}
                >
                  U's企画 執行役員 / ラジオNIKKEI番組コメンテーター
                </span>
                <h1
                  className="serif-text tracking-tight lg:text-7xl"
                  style={{
                    fontSize: '3rem',
                    color: '#050A14',
                    marginBottom: '0.75rem',
                    lineHeight: 1.1,
                    fontWeight: 500,
                  }}
                >
                  田代 昌之
                </h1>
                <p
                  className="font-light text-base mb-10"
                  style={{
                    color: '#94a3b8',
                    letterSpacing: '0.22em',
                    fontFamily: '"Cormorant Garamond", serif',
                    fontSize: '1.125rem',
                  }}
                >
                  Masayuki Tashiro
                </p>

                <p
                  className="serif-text leading-relaxed text-2xl mb-12"
                  style={{ color: '#050A14', fontWeight: 500 }}
                >
                  年間延べ5,000社の決算短信を読み、<br />
                  500社のIR担当者と話す<br />
                  ラジオNIKKEIコメンテーター。
                </p>

                {/* X CTA - 既存デザイン維持 */}
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

              {/* 写真側 */}
              <div className="relative lg:col-span-5 order-1 lg:order-2">
                <div
                  className="relative w-full overflow-hidden"
                  style={{
                    aspectRatio: '3/4',
                    backgroundColor: '#f8fafc',
                  }}
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

        {/* ===== Bio (経歴) ===== */}
        <section className="py-24 bg-white" id="bio">
          <div className="mx-auto max-w-5xl px-6 lg:px-8">
           <div className="max-w-3xl">
            <div className="mb-12">
              <p
                className="font-light mb-2"
                style={{
                  color: '#94a3b8',
                  letterSpacing: '0.25em',
                  fontFamily: '"Cormorant Garamond", serif',
                  fontSize: '0.875rem',
                }}
              >
                CAREER
              </p>
              <h2
                className="serif-text tracking-tight"
                style={{ color: '#050A14', fontSize: '1.75rem', fontWeight: 500 }}
              >
                経歴
              </h2>
            </div>
            <div
              className="leading-relaxed"
              style={{ color: '#475569' }}
            >
              <p className="text-base mb-4">
                北海道出身。新光証券（現みずほ証券）やシティバンク、投資助言会社などでアナリスト業務やコンプライアンス業務を経験したのち、暗号資産交換業者や証券会社の取締役に従事。
              </p>
              <p className="text-base mb-4">
                2026年よりU's企画に参画。IFTA国際検定テクニカルアナリスト3次資格（MFTA®）を保有。「金融文筆家」としても活動中。
              </p>
              <p className="text-base mb-4">
                ラジオNIKKEI「マーケット・テラス」などの株式番組でコメンテーターを務める傍ら、上場企業の決算説明会資料の作成支援や、投資家とのコミュニケーション戦略の立案に従事。複雑な市場動向や企業財務を、個人投資家にも分かりやすく噛み砕いて伝える解説スタイルに定評がある。
              </p>
              <p className="text-base">
                また、金融文筆家として、江戸時代の経済を背景とした論文を複数本執筆。現在、暗号資産をモチーフとした小説を作成中。
              </p>
            </div>
           </div>
          </div>
        </section>

        {/* ===== Credentials (資格・所属) ===== */}
        <section className="py-24" id="credentials" style={{ backgroundColor: '#fafaf7' }}>
          <div className="mx-auto max-w-5xl px-6 lg:px-8">
           <div className="max-w-3xl">
            <div className="mb-12">
              <p
                className="font-light mb-2"
                style={{
                  color: '#94a3b8',
                  letterSpacing: '0.25em',
                  fontFamily: '"Cormorant Garamond", serif',
                  fontSize: '0.875rem',
                }}
              >
                CREDENTIALS
              </p>
              <h2
                className="serif-text tracking-tight"
                style={{ color: '#050A14', fontSize: '1.75rem', fontWeight: 500 }}
              >
                資格・所属
              </h2>
            </div>
            <ul>
              {[
                'ラジオNIKKEI マーケット・テラス コメンテーター',
                '国際テクニカルアナリスト連盟 検定テクニカルアナリスト（MFTA®）',
                'NPO法人 日本テクニカルアナリスト協会 評議員',
                'All About 資産運用・ビットコイン ガイド',
                '楽天トウシルにも記事掲載中',
              ].map((item, idx) => (
                <li
                  key={item}
                  className="flex items-baseline text-base"
                  style={{
                    color: '#1e293b',
                    paddingTop: '1.125rem',
                    paddingBottom: '1.125rem',
                    borderBottom: '1px solid #e5e1d6',
                    borderTop: idx === 0 ? '1px solid #e5e1d6' : 'none',
                  }}
                >
                  <span
                    className="font-light shrink-0"
                    aria-hidden="true"
                    style={{
                      color: '#94a3b8',
                      letterSpacing: '0.1em',
                      fontFamily: '"Cormorant Garamond", serif',
                      fontSize: '0.75rem',
                      width: '2.5rem',
                    }}
                  >
                    {String(idx + 1).padStart(2, '0')}
                  </span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
           </div>
          </div>
        </section>

        {/* ===== 記事寄稿 ===== */}
        <section className="py-24 bg-white" id="articles">
          <div className="mx-auto max-w-5xl px-6 lg:px-8">
            <div className="flex flex-col gap-12 mb-12">
              <div>
                <p
                  className="font-light mb-2"
                  style={{
                    color: '#94a3b8',
                    letterSpacing: '0.25em',
                    fontFamily: '"Cormorant Garamond", serif',
                    fontSize: '0.875rem',
                  }}
                >
                  ARTICLES
                </p>
                <h2
                  className="serif-text tracking-tight"
                  style={{ color: '#050A14', fontSize: '1.75rem', fontWeight: 500 }}
                >
                  記事寄稿
                </h2>
                <p className="text-sm leading-relaxed mt-4" style={{ color: '#64748b' }}>
                  各種メディアにて市場分析・資本市場論考を寄稿しています。
                </p>
              </div>

              <div className="w-full">
                {loading ? (
                  <div className="flex justify-center py-24">
                    <div className="h-8 w-8 rounded-sm" style={{ border: '2px solid #e2e8f0', borderTopColor: '#0f172a', animation: 'spin 1s linear infinite' }} />
                  </div>
                ) : articles.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                    {articles.map((article) => (
                      <ArticleCard key={article.id} article={article} />
                    ))}
                  </div>
                ) : (
                  <p className="text-center py-12" style={{ color: '#94a3b8' }}>記事はまだありません。</p>
                )}

                <div className="text-center" style={{ marginTop: '5rem' }}>
                  <Link
                    to="/tashiro/articles"
                    className="inline-block tracking-widest text-sm font-medium latest-news-btn"
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
