import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { ExternalLink } from 'lucide-react';
import { client, TashiroArticle } from '../lib/client';

const PER_PAGE = 9;

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
      className="bg-white rounded-sm transition-all group flex flex-col h-full overflow-hidden cursor-pointer"
      style={{ border: '1px solid #e2e8f0' }}
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

export const TashiroArticles = () => {
  const [articles, setArticles] = useState<TashiroArticle[]>([]);
  const [loading, setLoading] = useState(true);
  const [totalCount, setTotalCount] = useState(0);
  const [offset, setOffset] = useState(0);

  const fetchArticles = async (currentOffset: number) => {
    try {
      setLoading(true);
      const data = await client.get({
        endpoint: 'article',
        queries: { limit: PER_PAGE, offset: currentOffset, orders: '-date' },
      });
      if (currentOffset === 0) {
        setArticles(data.contents);
      } else {
        setArticles((prev) => [...prev, ...data.contents]);
      }
      setTotalCount(data.totalCount);
    } catch (error) {
      console.error('Failed to fetch tashiro articles:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchArticles(0);
  }, []);

  const hasMore = articles.length < totalCount;

  const handleLoadMore = () => {
    const newOffset = offset + PER_PAGE;
    setOffset(newOffset);
    fetchArticles(newOffset);
  };

  return (
    <>
      <Helmet>
        <title>記事寄稿一覧 | 田代 昌之 | U's企画</title>
        <meta
          name="description"
          content="市場分析、資本政策、マクロ経済に関する田代昌之の寄稿記事を掲載しています。"
        />
      </Helmet>

      <div className="pt-20 bg-white antialiased" style={{ color: '#1e293b' }}>
        {/* ページヘッダー */}
        <section style={{ paddingTop: '3rem', paddingBottom: '3rem' }}>
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div style={{ marginBottom: '2rem' }}>
              <Link
                to="/tashiro"
                className="inline-flex items-center gap-1 text-sm font-medium transition-colors"
                style={{ color: '#64748b' }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.color = '#0f172a';
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.color = '#64748b';
                }}
              >
                ← 田代 昌之 プロフィールに戻る
              </Link>
            </div>
            <h1
              className="text-3xl font-bold tracking-tight"
              style={{ color: '#0f172a', marginBottom: '0.75rem' }}
            >
              記事寄稿一覧
            </h1>
            <p className="text-base leading-relaxed" style={{ color: '#64748b' }}>
              市場分析、資本政策、マクロ経済に関する寄稿記事を掲載しています。
            </p>
          </div>
        </section>

        {/* 記事グリッド */}
        <section style={{ paddingBottom: '6rem' }}>
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            {loading && articles.length === 0 ? (
              <div className="flex justify-center py-24">
                <div className="h-8 w-8 rounded-sm" style={{ border: '2px solid #e2e8f0', borderTopColor: '#0f172a', animation: 'spin 1s linear infinite' }} />
              </div>
            ) : articles.length === 0 ? (
              <p className="text-center py-12" style={{ color: '#94a3b8' }}>記事はまだありません。</p>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {articles.map((article) => (
                  <ArticleCard key={article.id} article={article} />
                ))}
              </div>
            )}

            {/* さらに読み込むボタン */}
            {hasMore && (
              <div className="text-center" style={{ marginTop: '3rem' }}>
                <button
                  onClick={handleLoadMore}
                  className="inline-flex items-center justify-center rounded-sm px-10 py-4 text-sm font-bold text-white transition-all cursor-pointer"
                  style={{
                    backgroundColor: '#0f172a',
                    minWidth: '240px',
                    border: 'none',
                    boxShadow: '0 4px 6px -1px rgba(0,0,0,.1)',
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.backgroundColor = '#1e293b';
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.backgroundColor = '#0f172a';
                  }}
                >
                  さらに読み込む
                </button>
              </div>
            )}
          </div>
        </section>
      </div>
    </>
  );
};
