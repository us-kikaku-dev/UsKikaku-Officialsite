import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useParams, Link } from 'react-router-dom';
import { client, Blog } from '../lib/client';
import { motion } from 'framer-motion';
import { ChevronLeft } from 'lucide-react';
import '../RichText.css';

export const BlogDetail = () => {
    const { id } = useParams<{ id: string }>();
    const [blog, setBlog] = useState<Blog | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchBlog = async () => {
            if (!id) return;
            setLoading(true);

            // Check if API key is configured
            const isCmsConfigured = import.meta.env.VITE_MICROCMS_SERVICE_DOMAIN && import.meta.env.VITE_MICROCMS_SERVICE_DOMAIN !== 'YOUR_DOMAIN';

            if (!isCmsConfigured) {
                // Mock Logic for Detail
                await new Promise(resolve => setTimeout(resolve, 500));
                // Return a mock blog object
                setBlog({
                    id: id,
                    createdAt: new Date().toISOString(),
                    updatedAt: new Date().toISOString(),
                    publishedAt: new Date().toISOString(),
                    revisedAt: new Date().toISOString(),
                    title: '（モック）ブログ記事タイトル: データ連携未設定',
                    content: '<p>APIキーが設定されていないため、モックデータを表示しています。</p><h2>セクション1</h2><p>本文テキスト...</p>',
                    date: new Date().toISOString(),
                    business_type: ['Tips'],
                    tag: ['モック'],
                    description: 'この記事はAPIキーが設定されていない場合に表示されるモックデータです。実際の記事概要がここに表示されます。',
                    thumbnail: {
                        url: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2670&auto=format&fit=crop',
                        height: 600,
                        width: 800
                    }
                });
                setLoading(false);
                return;
            }

            try {
                const data = await client.get({
                    endpoint: 'blog',
                    contentId: id,
                });
                setBlog(data);
            } catch (error) {
                console.error('Failed to fetch blog detail:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchBlog();
        // window.scrollTo(0, 0); // Removed to avoid duplication with ScrollToTop
    }, [id]);

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}/${month}/${day}`;
    };

    if (loading) {
        return (
            <div className="pt-48 pb-40 bg-white min-h-screen">
                <article className="max-w-3xl mx-auto px-5 lg:px-8 animate-pulse">
                    {/* Business Type Skeleton */}
                    <div className="w-full flex justify-start items-center mb-2 text-left">
                        <div className="h-6 w-24 bg-gray-200 rounded-full"></div>
                    </div>

                    {/* Title Skeleton */}
                    <div className="space-y-3 mb-4">
                        <div className="h-10 bg-gray-200 rounded w-3/4"></div>
                        <div className="h-10 bg-gray-200 rounded w-1/2"></div>
                    </div>

                    {/* Date Skeleton */}
                    <div className="w-full flex justify-end mb-12">
                        <div className="h-6 w-32 bg-gray-200 rounded"></div>
                    </div>

                    {/* Thumbnail Skeleton */}
                    <div className="mb-8 w-full aspect-[16/9] bg-gray-200 rounded-xl"></div>

                    {/* Tags Skeleton */}
                    <div className="flex flex-wrap gap-2 mb-16 w-full">
                        <div className="h-8 w-20 bg-gray-200 rounded-full"></div>
                        <div className="h-8 w-24 bg-gray-200 rounded-full"></div>
                    </div>

                    {/* Description Skeleton */}
                    <div className="space-y-4 mb-12">
                        <div className="h-6 bg-gray-200 rounded w-full"></div>
                        <div className="h-6 bg-gray-200 rounded w-5/6"></div>
                    </div>

                    {/* Content Skeleton */}
                    <div className="space-y-6">
                        <div className="h-4 bg-gray-200 rounded w-full"></div>
                        <div className="h-4 bg-gray-200 rounded w-full"></div>
                        <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                        <div className="h-40 bg-gray-200 rounded w-full mt-8"></div>
                    </div>
                </article>
            </div>
        );
    }

    if (!blog) {
        return (
            <div className="min-h-screen pt-32 pb-20 flex justify-center items-center bg-white">
                <div className="text-center">
                    <p className="text-gray-500 mb-4">記事が見つかりませんでした。</p>
                    <Link to="/blog" className="text-[#998438] hover:underline">
                        ブログ一覧に戻る
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="pt-48 pb-40 bg-white min-h-screen">
            <Helmet>
                <title>{blog.title} | 株式会社U's企画</title>
                <meta property="og:title" content={blog.title} />
                <meta property="og:description" content={blog.description || '株式会社U\'s企画のブログ記事です。'} />
                <meta property="og:type" content="article" />
                <meta property="og:url" content={window.location.href} />
                {blog.thumbnail && <meta property="og:image" content={blog.thumbnail.url} />}
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:title" content={blog.title} />
                <meta name="twitter:description" content={blog.description || '株式会社U\'s企画のブログ記事です。'} />
                {blog.thumbnail && <meta name="twitter:image" content={blog.thumbnail.url} />}
            </Helmet>

            <article className="max-w-3xl mx-auto px-5 lg:px-8">
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                >
                    {/* Business Type (Left above Title) */}
                    <div className="w-full flex justify-start items-center mb-2 text-left">
                        {blog.business_type?.map((bt, index) => (
                            <span key={index} className="px-4 py-1 bg-gray-100 rounded-full text-sm text-gray-700 font-medium tracking-wide">
                                {bt}
                            </span>
                        ))}
                    </div>

                    {/* Title */}
                    <h1 className="text-3xl md:text-4xl font-bold text-[#0F172A] mb-4 leading-relaxed text-left block w-full">
                        {blog.title}
                    </h1>

                    {/* Date (Right below Title) */}
                    <div style={{ textAlign: 'right', display: 'block', width: '100%' }} className="text-gray-600 mb-12 text-base">
                        <time dateTime={blog.date || blog.publishedAt} className="inline-block">
                            {formatDate(blog.date || blog.publishedAt)}公開
                        </time>
                    </div>

                    {/* Thumbnail */}
                    {blog.thumbnail && (
                        <div className="mb-8 w-full overflow-hidden rounded-xl shadow-sm">
                            <img
                                src={blog.thumbnail.url}
                                alt={blog.title}
                                className="w-full h-auto object-cover"
                            />
                        </div>
                    )}

                    {/* Tags (Below Thumbnail) */}
                    <div className="flex flex-wrap gap-2 mb-16 w-full">
                        {blog.tag?.map((tag, index) => (
                            <span key={index} className="inline-flex items-center px-4 py-2 rounded-full border border-gray-200 bg-white text-sm text-gray-700 transition-colors hover:bg-gray-50">
                                <span className="mr-1 text-[#998438] font-bold">#</span>
                                {tag}
                            </span>
                        ))}
                    </div>

                    {/* Description (Above Content, Bold) */}
                    {blog.description && (
                        <div className="mb-12 font-bold text-lg text-gray-800 leading-relaxed">
                            {blog.description}
                        </div>
                    )}

                    {/* Content */}
                    <div
                        className="rich-text-content prose prose-lg max-w-none text-gray-700 leading-8"
                        dangerouslySetInnerHTML={{ __html: blog.content }}
                    />

                    {/* Footer / Back Link */}
                    <div style={{ marginTop: '160px', paddingTop: '40px' }} className="border-t border-gray-100">
                        <Link
                            to="/blog"
                            className="inline-flex items-center text-gray-500 hover:text-[#998438] transition-colors"
                        >
                            <ChevronLeft size={20} className="mr-1" />
                            ブログ一覧に戻る
                        </Link>
                    </div>
                </motion.div>
            </article>
        </div>
    );
};
