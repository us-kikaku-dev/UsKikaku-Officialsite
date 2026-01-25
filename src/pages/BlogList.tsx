import React, { useEffect, useState } from 'react';
import { client, Blog } from '../lib/client';
import { motion } from 'framer-motion';

const MOCK_BLOGS: Blog[] = [
    {
        id: '1',
        createdAt: '2024-01-20T10:00:00.000Z',
        updatedAt: '2024-01-20T10:00:00.000Z',
        publishedAt: '2024-01-20T10:00:00.000Z',
        revisedAt: '2024-01-20T10:00:00.000Z',
        title: '決算説明資料作成のポイント',
        content: '<p>本文...</p>',
        category: { id: 'tips', name: 'Tips' },
        eyecatch: {
            url: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2426&auto=format&fit=crop',
            height: 600,
            width: 800
        }
    },
    {
        id: '2',
        createdAt: '2024-01-15T10:00:00.000Z',
        updatedAt: '2024-01-15T10:00:00.000Z',
        publishedAt: '2024-01-15T10:00:00.000Z',
        revisedAt: '2024-01-15T10:00:00.000Z',
        title: 'IRサイトのトレンド2024',
        content: '<p>本文...</p>',
        category: { id: 'trend', name: 'トレンド' },
        eyecatch: {
            url: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2670&auto=format&fit=crop',
            height: 600,
            width: 800
        }
    }
];

export const BlogList = () => {
    const [blogs, setBlogs] = useState<Blog[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchBlogs = async () => {
            if (!import.meta.env.VITE_MICROCMS_SERVICE_DOMAIN || import.meta.env.VITE_MICROCMS_SERVICE_DOMAIN === 'YOUR_DOMAIN') {
                setBlogs(MOCK_BLOGS);
                setLoading(false);
                return;
            }

            try {
                const data = await client.get({ endpoint: 'blogs' }); // endpoint name 'blogs' is common, user can change
                setBlogs(data.contents);
            } catch (error) {
                console.error('Failed to fetch blogs:', error);
                setBlogs(MOCK_BLOGS);
            } finally {
                setLoading(false);
            }
        };

        fetchBlogs();
    }, []);

    return (
        <div className="pt-32 pb-24 bg-white min-h-screen">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    <h1 className="text-4xl md:text-5xl serif-text font-bold text-[#050A14] mb-4 text-center">
                        BLOG
                    </h1>
                    <p className="text-[#D4AF37] text-center font-medium tracking-widest mb-16">
                        ブログ
                    </p>

                    {loading ? (
                        <p className="text-center text-gray-500">Loading...</p>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {blogs.map((post) => (
                                <article key={post.id} className="group cursor-pointer">
                                    <div className="relative overflow-hidden aspect-video bg-gray-100 mb-4">
                                        {post.eyecatch ? (
                                            <img
                                                src={post.eyecatch.url}
                                                alt={post.title}
                                                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                            />
                                        ) : (
                                            <div className="w-full h-full flex items-center justify-center text-gray-400">No Image</div>
                                        )}
                                        <div className="absolute top-4 left-4">
                                            <span className="inline-block px-3 py-1 bg-[#050A14]/80 backdrop-blur-sm text-white text-xs tracking-wider">
                                                {post.category?.name || 'Blog'}
                                            </span>
                                        </div>
                                    </div>

                                    <time className="text-sm text-gray-500 font-medium block mb-2">
                                        {new Date(post.publishedAt).toLocaleDateString('ja-JP')}
                                    </time>
                                    <h2 className="text-xl font-medium text-[#050A14] leading-snug group-hover:text-[#D4AF37] transition-colors">
                                        {post.title}
                                    </h2>
                                </article>
                            ))}
                        </div>
                    )}
                </motion.div>
            </div>
        </div>
    );
};
