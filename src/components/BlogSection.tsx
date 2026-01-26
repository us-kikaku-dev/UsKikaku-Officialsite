import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { client, Blog } from '../lib/client';
import './BlogSection.css';

// Reuse mock data format matching Blog types
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
    },
    {
        id: '3',
        createdAt: '2024-01-10T10:00:00.000Z',
        updatedAt: '2024-01-10T10:00:00.000Z',
        publishedAt: '2024-01-10T10:00:00.000Z',
        revisedAt: '2024-01-10T10:00:00.000Z',
        title: '投資家との対話を深めるために',
        content: '<p>本文...</p>',
        category: { id: 'communication', name: 'コミュニケーション' },
        eyecatch: {
            url: 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?q=80&w=2664&auto=format&fit=crop',
            height: 600,
            width: 800
        }
    }
];

export const BlogSection = () => {
    const [blogs, setBlogs] = useState<Blog[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchBlogs = async () => {
            // Mock fetch logic same as LatestNews
            if (!import.meta.env.VITE_MICROCMS_SERVICE_DOMAIN || import.meta.env.VITE_MICROCMS_SERVICE_DOMAIN === 'YOUR_DOMAIN') {
                setBlogs(MOCK_BLOGS.slice(0, 3));
                setLoading(false);
                return;
            }

            try {
                const data = await client.get({ endpoint: 'blogs', queries: { limit: 3 } });
                setBlogs(data.contents);
            } catch (error) {
                console.error('Failed to fetch blogs:', error);
                setBlogs(MOCK_BLOGS.slice(0, 3));
            } finally {
                setLoading(false);
            }
        };

        fetchBlogs();
    }, []);

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('ja-JP').replace(/\//g, '.'); // 2024.01.01 style or match News YYYY/MM/DD?
        // News: 2024/01/01. BlogList: 2024/1/20.
        // Let's use standard slash
    };

    return (
        <section className="blog-section">
            <div className="blog-container">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                >
                    {/* Header */}
                    <div className="text-center" style={{ marginBottom: '60px' }}>
                        <span className="text-[#998438] tracking-widest text-sm uppercase block mb-5">
                            BLOG
                        </span>
                        <h2 className="text-4xl md:text-5xl serif-text font-bold text-[#0F172A] tracking-wider">
                            最新の記事
                        </h2>
                    </div>

                    {/* Blog Grid */}
                    <div className="blog-grid">
                        {loading ? (
                            <p className="text-center text-gray-400 col-span-full">Loading...</p>
                        ) : (
                            blogs.map((post) => (
                                <Link to={`/blog/${post.id}`} key={post.id} className="blog-card group">
                                    <div className="blog-card-image-wrapper">
                                        {post.eyecatch ? (
                                            <img
                                                src={post.eyecatch.url}
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
                                            {new Date(post.publishedAt).toLocaleDateString('ja-JP')}
                                        </time>
                                        <span className="blog-card-category">
                                            {post.category?.name || 'Blog'}
                                        </span>
                                    </div>
                                    <h3 className="blog-card-title">
                                        {post.title}
                                    </h3>
                                </Link>
                            ))
                        )}
                    </div>

                    {/* View All Button */}
                    <div className="blog-view-all">
                        <Link to="/blog" className="blog-view-all-btn">
                            VIEW ALL
                        </Link>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};
