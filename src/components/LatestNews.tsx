import React from 'react';
import { Link } from 'react-router-dom';
import { News } from '../lib/client';
import { isCmsConfigured, allowMockFallback, formatDate } from '../lib/cms';
import { useCmsList } from '../hooks/useCmsList';
import { motion } from 'motion/react';
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
        date: '2024-01-01T10:00:00.000Z',
        business_type: ['コーポレート'],
        category: ['お知らせ']
    },
    {
        id: '2',
        createdAt: '2023-12-15T10:00:00.000Z',
        updatedAt: '2023-12-15T10:00:00.000Z',
        publishedAt: '2023-12-15T10:00:00.000Z',
        revisedAt: '2023-12-15T10:00:00.000Z',
        title: '年末年始休業のお知らせ',
        content: '<p>誠に勝手ながら、12月29日から1月4日まで休業とさせていただきます。</p>',
        date: '2023-12-15T10:00:00.000Z',
        business_type: ['コーポレート'],
        category: ['お知らせ']
    }
];

export const LatestNews = () => {
    const cmsConfigured = isCmsConfigured();
    const { state, retry } = useCmsList<News>({
        endpoint: 'news',
        queries: { limit: 3, orders: '-publishedAt' },
        enabled: cmsConfigured,
    });

    // 未設定時のみ開発でモック表示（初期セットアップ用途）。本番は空状態のまま
    const news: News[] =
        state.status === 'success'
            ? state.contents
            : !cmsConfigured && allowMockFallback()
                ? MOCK_NEWS.slice(0, 3)
                : [];
    const loading = state.status === 'loading';

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
                        ) : state.status === 'error' ? (
                            <div className="text-center py-12">
                                <p className="text-gray-400 mb-6">お知らせの読み込みに失敗しました。時間をおいて再度お試しください。</p>
                                <button type="button" onClick={retry} className="cms-retry-button">再試行</button>
                            </div>
                        ) : news.length === 0 ? (
                            <p className="text-center text-gray-400 py-12">現在表示できるお知らせはありません。</p>
                        ) : (
                            <ul className="space-y-0">
                                {news.map((item) => (
                                    <li key={item.id} className="latest-news-item">
                                        <Link
                                            to={`/news/${item.id}`}
                                            className="group block latest-news-link"
                                        >
                                            <div className="latest-news-content-wrapper">
                                                {/* Meta Info: Date & Category */}
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

                                                {/* Title */}
                                                <h3
                                                    className="text-lg font-medium latest-news-item-title flex-1"
                                                    style={{
                                                        display: '-webkit-box',
                                                        WebkitLineClamp: 2,
                                                        WebkitBoxOrient: 'vertical',
                                                        overflow: 'hidden'
                                                    }}
                                                >
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
