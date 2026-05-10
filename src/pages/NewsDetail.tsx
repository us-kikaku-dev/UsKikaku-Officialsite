import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { client, News } from '../lib/client';
import { isCmsConfigured, allowMockFallback, formatDateSlash } from '../lib/cms';
import { motion } from 'motion/react';
import { ChevronLeft } from 'lucide-react';
import { Helmet } from 'react-helmet-async';
import DOMPurify from 'dompurify';
import '../RichText.css';

export const NewsDetail = () => {
    const { id } = useParams<{ id: string }>();
    const [news, setNews] = useState<News | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchNews = async () => {
            if (!id) return;
            setLoading(true);

            // 未設定時：開発のみモック、本番は null のまま（404相当）
            if (!isCmsConfigured()) {
                if (allowMockFallback()) {
                    await new Promise(resolve => setTimeout(resolve, 500));
                    setNews({
                        id: id,
                        createdAt: new Date().toISOString(),
                        updatedAt: new Date().toISOString(),
                        publishedAt: new Date().toISOString(),
                        revisedAt: new Date().toISOString(),
                        title: '（モック）ニュース記事タイトル: データ連携未設定',
                        content: '<p>APIキーが設定されていないため、モックデータを表示しています。</p>',
                        date: new Date().toISOString(),
                        business_type: ['コーポレート'],
                        category: ['お知らせ'],
                        image: {
                            url: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=2301',
                            height: 600,
                            width: 800
                        }
                    });
                }
                setLoading(false);
                return;
            }

            try {
                const data = await client.get({
                    endpoint: 'news',
                    contentId: id,
                });
                setNews(data);
            } catch (error) {
                console.error('Failed to fetch news detail:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchNews();
    }, [id]);

    const formatDate = formatDateSlash;

    if (loading) {
        return (
            <div className="pt-48 pb-40 bg-white min-h-screen">
                <article className="max-w-3xl mx-auto px-5 lg:px-8 animate-pulse">
                    {/* Categories Skeleton */}
                    <div className="w-full flex justify-start items-center mb-4 gap-2">
                        <div className="h-6 w-24 bg-gray-200 rounded-full"></div>
                        <div className="h-6 w-20 bg-gray-200 rounded-full"></div>
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

                    {/* Image Skeleton */}
                    <div className="mb-12 w-full aspect-[16/9] bg-gray-200 rounded-xl"></div>

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

    if (!news) {
        return (
            <div className="min-h-screen pt-32 pb-20 flex justify-center items-center bg-white">
                <div className="text-center">
                    <p className="text-gray-500 mb-4">記事が見つかりませんでした。</p>
                    <Link to="/news" className="text-[#998438] hover:underline">
                        ニュース一覧に戻る
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="pt-48 pb-40 bg-white min-h-screen">
            <Helmet>
                <title>{news.title} | 株式会社U's企画</title>
                <meta property="og:title" content={news.title} />
                <meta property="og:description" content="株式会社U's企画のニュース記事です。" />
                <meta property="og:type" content="article" />
                <meta property="og:url" content={window.location.href} />
                {news.image && <meta property="og:image" content={news.image.url} />}
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:title" content={news.title} />
                <meta name="twitter:description" content="株式会社U's企画のニュース記事です。" />
                {news.image && <meta name="twitter:image" content={news.image.url} />}
            </Helmet>

            <article className="max-w-3xl mx-auto px-6 md:px-8 lg:px-12">
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                >
                    {/* Business Type (Left above Title) */}
                    <div className="w-full flex justify-start items-center mb-2 text-left gap-2 mb-4">
                        {news.business_type?.map((bt, index) => (
                            <span key={index} className="px-4 py-1 bg-gray-100 rounded-full text-sm text-gray-700 font-medium tracking-wide">
                                {bt}
                            </span>
                        ))}
                        {news.category?.map((cat, index) => (
                            <span key={`cat-${index}`} className="px-4 py-1 border border-gray-200 rounded-full text-sm text-gray-600 font-medium tracking-wide">
                                {cat}
                            </span>
                        ))}
                    </div>

                    {/* Title */}
                    <h1 className="text-3xl md:text-4xl font-bold text-[#0F172A] mb-4 leading-relaxed text-left block w-full">
                        {news.title}
                    </h1>

                    {/* Date (Right below Title) */}
                    <div style={{ textAlign: 'right', display: 'block', width: '100%' }} className="text-gray-600 mb-12 text-base">
                        <time dateTime={news.date || news.publishedAt} className="inline-block">
                            {formatDate(news.date || news.publishedAt)}
                        </time>
                    </div>

                    {/* Thumbnail/Image */}
                    {news.image && (
                        <div className="mb-12 w-full overflow-hidden rounded-xl">
                            <img
                                src={news.image.url}
                                alt={news.title}
                                className="w-full h-auto object-cover"
                            />
                        </div>
                    )}

                    {/* Content */}
                    <div
                        className="rich-text-content prose prose-lg max-w-none text-gray-700 leading-8"
                        dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(news.content) }}
                    />

                    {/* Footer / Back Link */}
                    <div style={{ marginTop: '160px', paddingTop: '40px' }} className="border-t border-gray-100">
                        <Link
                            to="/news"
                            className="inline-flex items-center text-gray-500 hover:text-[#998438] transition-colors"
                        >
                            <ChevronLeft size={20} className="mr-1" />
                            ニュース一覧に戻る
                        </Link>
                    </div>
                </motion.div>
            </article>
        </div>
    );
};
