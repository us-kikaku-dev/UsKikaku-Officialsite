import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { client, News } from '../lib/client';
import { isCmsConfigured, allowMockFallback, formatDate } from '../lib/cms';
import { motion } from 'motion/react';
import { ChevronRight } from 'lucide-react';
import '../components/LatestNews.css'; // Import shared styles

// Helper to generate mock data
const generateMockNews = (count: number): News[] => {
    return Array.from({ length: count }, (_, i) => ({
        id: `${i + 1}`,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        publishedAt: new Date(2024, 0, 25 - i).toISOString(), // Descending dates
        revisedAt: new Date().toISOString(),
        title: `ニュース記事タイトル ${i + 1} - 公式サイトを更新しました`,
        content: '<p>詳細内容...</p>',
        date: new Date(2024, 0, 25 - i).toISOString(),
        business_type: ['お知らせ'],
        category: i % 3 === 0 ? ['プレスリリース'] : ['お知らせ']
    }));
};

const MOCK_NEWS_ALL = generateMockNews(25); // 25 items for testing

const PER_PAGE = 10;

export const NewsList = () => {
    const [news, setNews] = useState<News[]>([]);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalCount, setTotalCount] = useState(0);

    useEffect(() => {
        const fetchNews = async () => {
            setLoading(true);

            const setMockPage = () => {
                const offset = (currentPage - 1) * PER_PAGE;
                setNews(MOCK_NEWS_ALL.slice(offset, offset + PER_PAGE));
                setTotalCount(MOCK_NEWS_ALL.length);
            };

            // 未設定時：開発はモック、本番は空のまま
            if (!isCmsConfigured()) {
                if (allowMockFallback()) {
                    await new Promise(resolve => setTimeout(resolve, 500));
                    setMockPage();
                }
                setLoading(false);
                return;
            }

            try {
                const data = await client.get({
                    endpoint: 'news',
                    queries: {
                        limit: PER_PAGE,
                        offset: (currentPage - 1) * PER_PAGE,
                        orders: '-publishedAt',
                    }
                });
                setNews(data.contents);
                setTotalCount(data.totalCount);
            } catch (error) {
                console.error('Failed to fetch news:', error);
                // 失敗時はモックを出さず空状態に
                setNews([]);
                setTotalCount(0);
            } finally {
                setLoading(false);
            }
        };

        fetchNews();
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, [currentPage]);

    // Pagination Calculation
    const totalPages = Math.ceil(totalCount / PER_PAGE);

    // Generate page numbers to display
    const getPageNumbers = () => {
        if (totalPages <= 7) return Array.from({ length: totalPages }, (_, i) => i + 1);

        const pages: (number | string)[] = [];

        if (totalPages <= 5) {
            for (let i = 1; i <= totalPages; i++) pages.push(i);
            return pages;
        }

        // Always show first 3
        pages.push(1, 2, 3);

        // If total is large, show ellipsis and last
        if (totalPages > 4) {
            pages.push('...');
            pages.push(totalPages);
        }

        return pages;
    };

    const handlePageChange = (p: number | string) => {
        if (typeof p === 'number' && p !== currentPage) {
            setCurrentPage(p);
        }
    };

    const handleNext = () => {
        if (currentPage < totalPages) {
            setCurrentPage(prev => prev + 1);
        }
    };

    return (
        <div className="pt-48 pb-40 bg-white min-h-screen">
            <div className="max-w-5xl mx-auto px-5 lg:px-8">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    <div className="text-center mb-[120px]">
                        <span className="text-[#998438] tracking-widest text-sm uppercase block mb-5">
                            NEWS
                        </span>
                        <h1 className="text-4xl md:text-5xl serif-text font-bold text-[#0F172A] tracking-wider">
                            お知らせ
                        </h1>
                    </div>

                    <div>
                        {loading ? (
                            <ul className="space-y-0 min-h-[500px]">
                                {Array.from({ length: 5 }).map((_, i) => (
                                    <li key={i} className="latest-news-item animate-pulse">
                                        <div className="latest-news-link" style={{ pointerEvents: 'none' }}>
                                            <div className="latest-news-content-wrapper">
                                                <div className="latest-news-meta">
                                                    <div className="h-4 w-20 bg-gray-200 rounded"></div>
                                                    <div className="h-6 w-24 bg-gray-200 rounded"></div>
                                                </div>
                                                <div className="flex-1 space-y-2">
                                                    <div className="h-5 bg-gray-200 rounded w-3/4"></div>
                                                    <div className="h-5 bg-gray-200 rounded w-1/2"></div>
                                                </div>
                                            </div>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        ) : news.length === 0 ? (
                            <p className="text-center text-gray-400 py-16">現在表示できるお知らせはありません。</p>
                        ) : (
                            <>
                                <ul className="space-y-0 min-h-[500px]">
                                    {news.map((item) => (
                                        <li key={item.id} className="latest-news-item">
                                            <Link to={`/news/${item.id}`} className="latest-news-link cursor-pointer group">
                                                <div className="latest-news-content-wrapper">
                                                    <div className="latest-news-meta">
                                                        <time className="text-sm font-medium whitespace-nowrap latest-news-date">
                                                            {formatDate(item.date || item.publishedAt)}
                                                        </time>
                                                        <div className="flex gap-2">
                                                            {item.category && item.category.length > 0 ? (
                                                                item.category.map((cat, index) => (
                                                                    <span key={index} className="inline-block px-4 py-1 text-xs tracking-wider whitespace-nowrap latest-news-category">
                                                                        {cat}
                                                                    </span>
                                                                ))
                                                            ) : (
                                                                <span className="inline-block px-4 py-1 text-xs tracking-wider whitespace-nowrap latest-news-category">
                                                                    お知らせ
                                                                </span>
                                                            )}
                                                        </div>
                                                    </div>
                                                    <h2
                                                        className="text-lg font-medium latest-news-item-title flex-1"
                                                        style={{
                                                            display: '-webkit-box',
                                                            WebkitLineClamp: 2,
                                                            WebkitBoxOrient: 'vertical',
                                                            overflow: 'hidden'
                                                        }}
                                                    >
                                                        {item.title}
                                                    </h2>
                                                </div>
                                            </Link>
                                        </li>
                                    ))}
                                </ul>

                                {/* Pagination */}
                                {totalPages > 1 && (
                                    <div className="pagination-container">
                                        {/* Prev Arrow */}
                                        {currentPage > 1 && (
                                            <button
                                                onClick={() => setCurrentPage(prev => prev - 1)}
                                                className="pagination-arrow"
                                                aria-label="Previous page"
                                            >
                                                <ChevronRight size={20} className="rotate-180" />
                                            </button>
                                        )}

                                        {/* Numbers */}
                                        <div className="pagination-list">
                                            {Array.from({ length: totalPages }).map((_, i) => {
                                                const pageNum = i + 1;
                                                // Simplified Logic
                                                if (totalPages > 10 && pageNum > 3 && pageNum < totalPages && Math.abs(currentPage - pageNum) > 1) {
                                                    if (pageNum === 4 && currentPage > 5) return <span key="dots-1" className="self-end px-1 pb-1 text-[#0F172A]">...</span>;
                                                    return null;
                                                }

                                                return (
                                                    <button
                                                        key={pageNum}
                                                        onClick={() => setCurrentPage(pageNum)}
                                                        className={`pagination-item ${currentPage === pageNum ? 'active' : ''}`}
                                                    >
                                                        {pageNum}
                                                    </button>
                                                );
                                            })}
                                        </div>

                                        {/* Next Arrow */}
                                        {currentPage < totalPages && (
                                            <button
                                                onClick={handleNext}
                                                className="pagination-arrow"
                                                aria-label="Next page"
                                            >
                                                <ChevronRight size={20} />
                                            </button>
                                        )}
                                    </div>
                                )}
                            </>
                        )}
                    </div>
                </motion.div>
            </div>
        </div>
    );
};
