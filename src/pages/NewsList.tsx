import React, { useEffect, useState } from 'react';
import { client, News } from '../lib/client'; // Assuming client and types are exported
import { motion } from 'framer-motion';

// Mock data for development when CMS is not connected
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

export const NewsList = () => {
    const [news, setNews] = useState<News[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchNews = async () => {
            // Check if API key is configured, if not use mock
            if (!import.meta.env.VITE_MICROCMS_SERVICE_DOMAIN || import.meta.env.VITE_MICROCMS_SERVICE_DOMAIN === 'YOUR_DOMAIN') {
                setNews(MOCK_NEWS);
                setLoading(false);
                return;
            }

            try {
                const data = await client.get({ endpoint: 'news' });
                setNews(data.contents);
            } catch (error) {
                console.error('Failed to fetch news:', error);
                // Fallback to mock data on error for demo purposes
                setNews(MOCK_NEWS);
            } finally {
                setLoading(false);
            }
        };

        fetchNews();
    }, []);

    return (
        <div className="pt-32 pb-24 bg-white min-h-screen">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    <h1 className="text-4xl md:text-5xl serif-text font-bold text-[#050A14] mb-4 text-center">
                        NEWS
                    </h1>
                    <p className="text-[#D4AF37] text-center font-medium tracking-widest mb-16">
                        お知らせ
                    </p>

                    <div className="space-y-8">
                        {loading ? (
                            <p className="text-center text-gray-500">Loading...</p>
                        ) : (
                            news.map((item) => (
                                <article key={item.id} className="border-b border-gray-200 pb-8 hover:bg-gray-50 transition-colors p-4 rounded-sm">
                                    <div className="flex flex-col md:flex-row md:items-baseline gap-4 mb-2">
                                        <time className="text-sm text-gray-500 font-medium whitespace-nowrap">
                                            {new Date(item.publishedAt).toLocaleDateString('ja-JP')}
                                        </time>
                                        <span className="inline-block px-3 py-1 bg-[#050A14] text-white text-xs tracking-wider">
                                            {item.category?.name || 'お知らせ'}
                                        </span>
                                        <h2 className="text-xl font-medium text-[#050A14] hover:text-[#D4AF37] transition-colors">
                                            {item.title}
                                        </h2>
                                    </div>
                                </article>
                            ))
                        )}
                    </div>
                </motion.div>
            </div>
        </div>
    );
};
