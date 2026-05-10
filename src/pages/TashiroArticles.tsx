import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import {
  fetchUnifiedTashiroArticles,
  UnifiedTashiroArticle,
} from '../lib/tashiro';
import { TashiroArticleCard } from '../components/TashiroArticleCard';

const PER_PAGE = 9;

function PaginationButton({
  children,
  onClick,
  active,
  disabled,
  ariaLabel,
  ariaCurrent,
}: {
  children: React.ReactNode;
  onClick: () => void;
  active?: boolean;
  disabled?: boolean;
  ariaLabel: string;
  ariaCurrent?: 'page';
}) {
  const baseBg = active ? '#050A14' : '#ffffff';
  const baseColor = active ? '#ffffff' : '#050A14';
  const baseBorder = active ? '#050A14' : '#e5e1d6';
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-label={ariaLabel}
      aria-current={ariaCurrent}
      className="inline-flex items-center justify-center transition-all"
      style={{
        width: '40px',
        height: '40px',
        backgroundColor: baseBg,
        color: baseColor,
        border: `1px solid ${baseBorder}`,
        fontFamily: '"Cormorant Garamond", serif',
        fontSize: '1rem',
        letterSpacing: '0.05em',
        fontWeight: active ? 600 : 400,
        cursor: disabled ? 'not-allowed' : active ? 'default' : 'pointer',
        opacity: disabled ? 0.4 : 1,
      }}
      onMouseEnter={(e) => {
        if (disabled || active) return;
        (e.currentTarget as HTMLElement).style.borderColor = '#050A14';
      }}
      onMouseLeave={(e) => {
        if (disabled || active) return;
        (e.currentTarget as HTMLElement).style.borderColor = '#e5e1d6';
      }}
    >
      {children}
    </button>
  );
}

export const TashiroArticles = () => {
  const [allArticles, setAllArticles] = useState<UnifiedTashiroArticle[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    let cancelled = false;
    const load = async () => {
      try {
        setLoading(true);
        const all = await fetchUnifiedTashiroArticles();
        if (!cancelled) setAllArticles(all);
      } catch (error) {
        console.error('Failed to fetch tashiro articles:', error);
        if (!cancelled) setAllArticles([]);
      } finally {
        if (!cancelled) setLoading(false);
      }
    };
    load();
    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentPage]);

  const totalPages = Math.ceil(allArticles.length / PER_PAGE);
  const articles = allArticles.slice(
    (currentPage - 1) * PER_PAGE,
    currentPage * PER_PAGE,
  );

  const goToPage = (page: number) => {
    if (page < 1 || page > totalPages || page === currentPage) return;
    setCurrentPage(page);
  };

  const buildPageList = (): (number | 'ellipsis-left' | 'ellipsis-right')[] => {
    if (totalPages <= 7) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }
    const pages: (number | 'ellipsis-left' | 'ellipsis-right')[] = [1];
    if (currentPage > 4) pages.push('ellipsis-left');
    const start = Math.max(2, currentPage - 1);
    const end = Math.min(totalPages - 1, currentPage + 1);
    for (let p = start; p <= end; p++) pages.push(p);
    if (currentPage < totalPages - 3) pages.push('ellipsis-right');
    pages.push(totalPages);
    return pages;
  };

  return (
    <>
      <Helmet>
        <title>執筆記事一覧 | 田代 昌之 | U's企画</title>
        <meta
          name="description"
          content="自社メディア『Capital Voice Japan』および各種媒体への田代昌之の執筆記事を掲載しています。"
        />
      </Helmet>

      <div className="pt-20 bg-white antialiased" style={{ color: '#1e293b' }}>
        {/* ページヘッダー */}
        <section style={{ paddingTop: '3rem', paddingBottom: '3rem' }}>
          <div className="mx-auto max-w-5xl px-6 lg:px-8">
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
              執筆記事一覧
            </h1>
            <p className="text-base leading-relaxed" style={{ color: '#64748b' }}>
              自社メディア『Capital Voice Japan』および各種媒体への執筆記事を掲載しています。
            </p>
          </div>
        </section>

        {/* 記事グリッド */}
        <section style={{ paddingBottom: '6rem' }}>
          <div className="mx-auto max-w-5xl px-6 lg:px-8">
            {loading && articles.length === 0 ? (
              <div className="flex justify-center py-24">
                <div className="h-8 w-8 rounded-sm" style={{ border: '2px solid #e2e8f0', borderTopColor: '#0f172a', animation: 'spin 1s linear infinite' }} />
              </div>
            ) : articles.length === 0 ? (
              <p className="text-center py-12" style={{ color: '#94a3b8' }}>記事はまだありません。</p>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {articles.map((article) => (
                  <TashiroArticleCard key={article.id} article={article} />
                ))}
              </div>
            )}

            {/* ページネーション */}
            {totalPages > 1 && (
              <nav
                aria-label="記事一覧ページネーション"
                className="flex justify-center items-center"
                style={{ marginTop: '4rem', gap: '0.5rem' }}
              >
                <PaginationButton
                  onClick={() => goToPage(currentPage - 1)}
                  disabled={currentPage === 1}
                  ariaLabel="前のページ"
                >
                  <ChevronLeft style={{ width: '16px', height: '16px' }} />
                </PaginationButton>

                {buildPageList().map((item, idx) => {
                  if (item === 'ellipsis-left' || item === 'ellipsis-right') {
                    return (
                      <span
                        key={`${item}-${idx}`}
                        aria-hidden="true"
                        className="inline-flex items-center justify-center"
                        style={{
                          width: '40px',
                          height: '40px',
                          color: '#94a3b8',
                          fontFamily: '"Cormorant Garamond", serif',
                          fontSize: '1rem',
                          letterSpacing: '0.1em',
                        }}
                      >
                        …
                      </span>
                    );
                  }
                  return (
                    <PaginationButton
                      key={item}
                      onClick={() => goToPage(item)}
                      active={item === currentPage}
                      ariaLabel={`${item}ページ目`}
                      ariaCurrent={item === currentPage ? 'page' : undefined}
                    >
                      {item}
                    </PaginationButton>
                  );
                })}

                <PaginationButton
                  onClick={() => goToPage(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  ariaLabel="次のページ"
                >
                  <ChevronRight style={{ width: '16px', height: '16px' }} />
                </PaginationButton>
              </nav>
            )}
          </div>
        </section>
      </div>
    </>
  );
};
