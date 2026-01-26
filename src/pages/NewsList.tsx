import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { client, News } from '../lib/client';
import { motion } from 'framer-motion';
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
        category: { id: 'info', name: i % 3 === 0 ? 'プレスリリース' : 'お知らせ' }
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

            // Check if API key is configured
            const isCmsConfigured = import.meta.env.VITE_MICROCMS_SERVICE_DOMAIN && import.meta.env.VITE_MICROCMS_SERVICE_DOMAIN !== 'YOUR_DOMAIN';

            if (!isCmsConfigured) {
                // Mock Logic
                await new Promise(resolve => setTimeout(resolve, 500)); // Simulate delay
                const offset = (currentPage - 1) * PER_PAGE;
                const sliced = MOCK_NEWS_ALL.slice(offset, offset + PER_PAGE);
                setNews(sliced);
                setTotalCount(MOCK_NEWS_ALL.length);
                setLoading(false);
                return;
            }

            // Real CMS Logic
            try {
                const data = await client.get({
                    endpoint: 'news',
                    queries: {
                        limit: PER_PAGE,
                        offset: (currentPage - 1) * PER_PAGE,
                    }
                });
                setNews(data.contents);
                setTotalCount(data.totalCount);
            } catch (error) {
                console.error('Failed to fetch news:', error);
                setNews([]);
            } finally {
                setLoading(false);
            }
        };

        fetchNews();
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, [currentPage]);

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}/${month}/${day}`;
    };

    // Pagination Calculation
    const totalPages = Math.ceil(totalCount / PER_PAGE);

    // Generate page numbers to display
    // Rule: Show all if small? Or truncate? Request implies truncation "①②③・・・⑧"
    const getPageNumbers = () => {
        if (totalPages <= 7) return Array.from({ length: totalPages }, (_, i) => i + 1);

        // Simple hydration for large pages: 1, 2, 3 ... Last
        // If current is near start: 1, 2, 3, 4 ... Last
        // If current is near end: 1 ... 7, 8, 9
        // A simple version based on request "①②③・・・⑧" (Example showing start ... end)
        // Let's implement: Always 1, 2, 3 ... LastPage
        // Or if current > 3?
        // Let's stick to a standard responsive pagination or the specific request pattern.
        // User pattern: 1 2 3 ... 8.

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

        // This is static logic matching "①②③・・・⑧". 
        // Real logic should probably adapt to current page, but for now let's match the visual hint.

        // BETTER LOGIC:
        // 1, 2, 3, ..., Last
        // If current is 5: 1 ... 4 5 6 ... Last
        // Let's assume standard behavior is best.

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
            <div className="max-w-[1000px] mx-auto px-5 lg:px-8">
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
                            <div className="flex justify-center py-20">
                                <span className="text-gray-400">Loading...</span>
                            </div>
                        ) : (
                            <>
                                <ul className="space-y-0 min-h-[500px]">
                                    {news.map((item) => (
                                        <li key={item.id} className="latest-news-item">
                                            <div className="latest-news-link cursor-default group">
                                                <div className="latest-news-content-wrapper">
                                                    <div className="flex items-center gap-4 min-w-[220px]">
                                                        <time className="text-sm font-medium whitespace-nowrap latest-news-date">
                                                            {formatDate(item.publishedAt)}
                                                        </time>
                                                        <span className="inline-block px-4 py-1 text-xs tracking-wider whitespace-nowrap latest-news-category">
                                                            {item.category?.name || 'お知らせ'}
                                                        </span>
                                                    </div>
                                                    <h2 className="text-lg font-medium latest-news-item-title flex-1 line-clamp-1 md:line-clamp-none">
                                                        {item.title}
                                                    </h2>
                                                </div>
                                            </div>
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
