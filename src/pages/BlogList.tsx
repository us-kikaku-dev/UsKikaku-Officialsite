import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { client, Blog } from '../lib/client';
import { isCmsConfigured, allowMockFallback, formatDateSlash } from '../lib/cms';
import { motion } from 'motion/react';
import { ChevronRight } from 'lucide-react';
import '../components/BlogSection.css'; // Import shared styles for cards

// Helper to generate mock data
const generateMockBlogs = (count: number): Blog[] => {
    return Array.from({ length: count }, (_, i) => ({
        id: `${i + 1}`,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        publishedAt: new Date(2024, 0, 25 - i).toISOString(),
        revisedAt: new Date().toISOString(),
        title: `ブログ記事タイトル ${i + 1} - 投資家との対話を深めるために`,
        content: '<p>詳細内容...</p>',
        date: new Date(2024, 0, 25 - i).toISOString(),
        business_type: i % 2 === 0 ? ['Tips'] : ['トレンド'], // string[]
        tag: ['戦略', 'デザイン'], // string[]
        thumbnail: {
            url: `https://images.unsplash.com/photo-${1550000000000 + i}?q=80&w=800&auto=format&fit=crop`,
            height: 600,
            width: 800
        }
    }));
};

const MOCK_BLOGS_ALL = generateMockBlogs(25);
const PER_PAGE = 9;

export const BlogList = () => {
    const [blogs, setBlogs] = useState<Blog[]>([]);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalCount, setTotalCount] = useState(0);

    useEffect(() => {
        const fetchBlogs = async () => {
            setLoading(true);

            const setMockPage = () => {
                const offset = (currentPage - 1) * PER_PAGE;
                setBlogs(MOCK_BLOGS_ALL.slice(offset, offset + PER_PAGE));
                setTotalCount(MOCK_BLOGS_ALL.length);
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
                    endpoint: 'blog',
                    queries: {
                        limit: PER_PAGE,
                        offset: (currentPage - 1) * PER_PAGE,
                        orders: '-publishedAt',
                    }
                });
                setBlogs(data.contents);
                setTotalCount(data.totalCount);
            } catch (error) {
                console.error('Failed to fetch blogs:', error);
                // 失敗時はモックを出さず空状態に
                setBlogs([]);
                setTotalCount(0);
            } finally {
                setLoading(false);
            }
        };

        fetchBlogs();
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, [currentPage]);

    const totalPages = Math.ceil(totalCount / PER_PAGE);

    const handleNext = () => {
        if (currentPage < totalPages) setCurrentPage(prev => prev + 1);
    };

    const handlePrev = () => {
        if (currentPage > 1) setCurrentPage(prev => prev - 1);
    };

    return (
        <div className="pt-48 pb-40 bg-white min-h-screen">
            <div className="max-w-5xl mx-auto px-5 lg:px-8">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    {/* Header */}
                    <div className="text-center mb-[120px]">
                        <span className="text-[#998438] tracking-widest text-sm uppercase block mb-5">
                            BLOG
                        </span>
                        <h1 className="text-4xl md:text-5xl serif-text font-bold text-[#0F172A] tracking-wider">
                            投稿記事
                        </h1>
                    </div>

                    {/* Blog Grid */}
                    <div>
                        {loading ? (
                            <div className="blog-grid min-h-[600px]">
                                {Array.from({ length: 6 }).map((_, i) => (
                                    <div key={i} className="blog-card animate-pulse">
                                        <div className="blog-card-image-wrapper bg-gray-200"></div>
                                        <div className="blog-card-meta mt-4">
                                            <div className="h-3 w-20 bg-gray-200 rounded"></div>
                                            <div className="h-3 w-16 bg-gray-200 rounded ml-auto"></div>
                                        </div>
                                        <div className="space-y-2 mt-3">
                                            <div className="h-5 bg-gray-200 rounded w-full"></div>
                                            <div className="h-5 bg-gray-200 rounded w-2/3"></div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : blogs.length === 0 ? (
                            <p className="text-center text-gray-400 py-16">現在表示できる記事はありません。</p>
                        ) : (
                            <>
                                <div className="blog-grid min-h-[600px]">
                                    {blogs.map((post) => (
                                        <Link to={`/blog/${post.id}`} key={post.id} className="blog-card group">
                                            <div className="blog-card-image-wrapper">
                                                {post.thumbnail ? (
                                                    <img
                                                        src={post.thumbnail.url}
                                                        alt={post.title}
                                                        className="blog-card-image"
                                                    />
                                                ) : (
                                                    <div className="w-full h-full flex items-center justify-center text-gray-400 bg-gray-100">
                                                        No Image
                                                    </div>
                                                )}
                                            </div>
                                            <div className="blog-card-meta">
                                                <time className="blog-card-date">
                                                    {post.date ? formatDateSlash(post.date) : formatDateSlash(post.publishedAt)}
                                                </time>
                                                <span className="blog-card-category">
                                                    {/* Display tag or business_type as category */}
                                                    {post.business_type && post.business_type.length > 0 ? post.business_type[0] : (post.tag && post.tag.length > 0 ? post.tag[0] : 'Blog')}
                                                </span>
                                            </div>
                                            <h3 className="blog-card-title">
                                                {post.title}
                                            </h3>
                                        </Link>
                                    ))}
                                </div>

                                {/* Pagination */}
                                {totalPages > 1 && (
                                    <div className="pagination-container">
                                        {/* Prev Arrow */}
                                        {currentPage > 1 && (
                                            <button
                                                onClick={handlePrev}
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
                                                // Simplified Logic for pagination dots if needed (not here as 3 pages)
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

