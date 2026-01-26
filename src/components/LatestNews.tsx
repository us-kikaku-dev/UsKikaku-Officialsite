import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { client, News } from '../lib/client';
import { motion } from 'framer-motion';
import './LatestNews.css';

// Mock data
const MOCK_NEWS: News[] = [
    {
        id: '1',
        createdAt: '2024-01-01T10:00:00.000Z',
        updatedAt: '2024-01-01T10:00:00.000Z',
        publishedAt: '2024-01-01T10:00:00.000Z',
        revisedAt: '2024-01-01T10:00:00.000Z',
        title: 'Webサイトをリニューアルいたしました',
        content: '<p>公式サイトをリニューアルいたしました。今後ともよろしくお願いいたします。</p>',
        category: { id: 'info', name: 'お知らせ' }
    },
    {
        id: '2',
        createdAt: '2023-12-15T10:00:00.000Z',
        updatedAt: '2023-12-15T10:00:00.000Z',
        publishedAt: '2023-12-15T10:00:00.000Z',
        revisedAt: '2023-12-15T10:00:00.000Z',
        title: '年末年始休業のお知らせ',
        content: '<p>誠に勝手ながら、12月29日から1月4日まで休業とさせていただきます。</p>',
        category: { id: 'info', name: 'お知らせ' }
    }
];

export const LatestNews = () => {
    const [news, setNews] = useState<News[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchNews = async () => {
            // Check if API key is configured, if not use mock
            if (!import.meta.env.VITE_MICROCMS_SERVICE_DOMAIN || import.meta.env.VITE_MICROCMS_SERVICE_DOMAIN === 'YOUR_DOMAIN') {
                setNews(MOCK_NEWS.slice(0, 3));
                setLoading(false);
                return;
            }

            try {
                const data = await client.get({ endpoint: 'news', queries: { limit: 3 } });
                setNews(data.contents);
            } catch (error) {
                console.error('Failed to fetch news:', error);
                setNews(MOCK_NEWS.slice(0, 3));
            } finally {
                setLoading(false);
            }
        };

        fetchNews();
    }, []);

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}/${month}/${day}`;
    };

    return (
        <section className="latest-news-section">
            <div className="latest-news-container">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                >
                    <div className="text-center" style={{ marginBottom: '60px' }}>
                        <span className="text-[#998438] tracking-widest text-sm uppercase block mb-5">
                            NEWS
                        </span>
                        <h2 className="text-4xl md:text-5xl serif-text font-bold text-[#0F172A] tracking-wider">
                            お知らせ
                        </h2>
                    </div>

                    {/* News List */}
                    <div>
                        {loading ? (
                            <p className="text-center text-gray-400">Loading...</p>
                        ) : (
                            <ul className="space-y-0">
                                {news.map((item) => (
                                    <li key={item.id} className="latest-news-item">
                                        <Link
                                            to="/news"
                                            className="group block latest-news-link"
                                        >
                                            <div className="latest-news-content-wrapper">
                                                {/* Meta Info: Date & Category */}
                                                <div className="flex items-center gap-4 min-w-[220px]">
                                                    <time className="text-sm font-medium whitespace-nowrap latest-news-date">
                                                        {formatDate(item.publishedAt)}
                                                    </time>
                                                    <span className="inline-block px-4 py-1 text-xs tracking-wider whitespace-nowrap latest-news-category">
                                                        {item.category?.name || 'お知らせ'}
                                                    </span>
                                                </div>

                                                {/* Title */}
                                                <h3 className="text-lg font-medium latest-news-item-title flex-1 line-clamp-1 md:line-clamp-none">
                                                    {item.title}
                                                </h3>
                                            </div>
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>

                    {/* View All Button */}
                    <div className="latest-news-btn-wrapper">
                        <Link
                            to="/news"
                            className="inline-block tracking-widest text-sm font-medium latest-news-btn"
                        >
                            VIEW ALL
                        </Link>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};
