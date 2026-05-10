import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { ExternalLink } from 'lucide-react';
import { capitalVoiceClient, CapitalVoiceArticle } from '../lib/client';
import { isCapitalVoiceConfigured, allowMockFallback, formatDate } from '../lib/cms';
import CapitalVoiceHeroImage from '../assets/capital-voice-hero.jpg';
import './MediaSection.css';

const CAPITAL_VOICE_BASE = 'https://capital-voice.com';

// モックデータ（API未設定時のフォールバック）
const MOCK_ARTICLES: CapitalVoiceArticle[] = [
    {
        id: 'sample-1',
        createdAt: '2026-04-23T05:30:00.000Z',
        updatedAt: '2026-04-23T05:30:00.000Z',
        publishedAt: '2026-04-23T05:30:00.000Z',
        revisedAt: '2026-04-23T05:30:00.000Z',
        title: '【後編】なぜ社員は辞めないのか、会社は"ドラクエ"だった',
        publishdate: '2026-04-23T05:30:00.000Z',
        category: ['Executive Interview'],
    },
    {
        id: 'sample-2',
        createdAt: '2026-04-23T06:00:00.000Z',
        updatedAt: '2026-04-23T06:00:00.000Z',
        publishedAt: '2026-04-23T06:00:00.000Z',
        revisedAt: '2026-04-23T06:00:00.000Z',
        title: '【前編】売上は伸びるのに倒産寸前、それでも動き続けた理由',
        publishdate: '2026-04-23T06:00:00.000Z',
        category: ['Executive Interview'],
    },
    {
        id: 'sample-3',
        createdAt: '2026-04-23T01:30:00.000Z',
        updatedAt: '2026-04-23T01:30:00.000Z',
        publishedAt: '2026-04-23T01:30:00.000Z',
        revisedAt: '2026-04-23T01:30:00.000Z',
        title: '【後編】"決める覚悟"が会社を動かす',
        publishdate: '2026-04-23T01:30:00.000Z',
        category: ['Executive Interview'],
    },
];

export const MediaSection = () => {
    const [articles, setArticles] = useState<CapitalVoiceArticle[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchArticles = async () => {
            // 未設定時：開発はモック、本番は空のまま
            if (!isCapitalVoiceConfigured()) {
                if (allowMockFallback()) setArticles(MOCK_ARTICLES);
                setLoading(false);
                return;
            }

            try {
                const data = await capitalVoiceClient.get({
                    endpoint: 'articles',
                    queries: { limit: 3, orders: '-publishdate' },
                });
                setArticles(data.contents);
            } catch (error) {
                console.error('Failed to fetch Capital Voice articles:', error);
                // 失敗時はモックを出さず空状態に
                setArticles([]);
            } finally {
                setLoading(false);
            }
        };

        fetchArticles();
    }, []);

    return (
        <section className="media-section">
            <div className="media-container">
                {/* Intro: 左ビジュアル / 右コンテンツ */}
                <div className="media-intro">
                    <motion.div
                        className="media-intro-image-wrapper"
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                    >
                        <img
                            src={CapitalVoiceHeroImage}
                            alt="Capital Voice Japan"
                            className="media-intro-image"
                        />
                    </motion.div>

                    <motion.div
                        className="media-intro-content"
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                    >
                        <span className="media-label">MEDIA</span>
                        <h2 className="text-2xl md:text-3xl serif-text font-bold text-[#0F172A] tracking-wider leading-relaxed mb-8">
                            企業と投資家のあいだに、<br />新しい対話を。
                        </h2>

                        <div className="media-description">
                            <p>
                                Capital Voice Japanは、上場企業の経営者・IR担当者・著名投資家へのインタビューを通じて、資本市場の"人"に焦点を当てるメディアです。
                            </p>
                            <p>
                                ニュースや決算資料では語られない経営者の思考、IR担当者の工夫、投資家の視点。インタビュー形式で、企業と投資家のあいだに新しい対話を生み出していきます。
                            </p>
                        </div>
                    </motion.div>
                </div>

                {/* Latest Articles Grid */}
                <motion.div
                    className="media-articles-wrapper"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                >
                    <div className="media-articles-header">
                        <span className="media-articles-label">LATEST ARTICLES</span>
                        <h3 className="media-articles-heading">最新の記事</h3>
                    </div>

                    <div className="media-grid">
                        {loading ? (
                            <p className="media-loading">Loading...</p>
                        ) : articles.length === 0 ? (
                            <p className="text-center text-gray-400 py-12" style={{ gridColumn: '1 / -1' }}>現在表示できる記事はありません。</p>
                        ) : (
                            articles.map((article, index) => (
                                <a
                                    key={article.id}
                                    href={`${CAPITAL_VOICE_BASE}/article/${encodeURIComponent(article.id)}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className={`media-card${index > 0 ? ' media-card-mobile-hidden' : ''}`}
                                >
                                    <div className="media-card-image-wrapper">
                                        {article.eyecatch ? (
                                            <img
                                                src={article.eyecatch.url}
                                                alt={article.title}
                                                className="media-card-image"
                                                width={article.eyecatch.width}
                                                height={article.eyecatch.height}
                                                loading="lazy"
                                            />
                                        ) : (
                                            <div className="media-card-image-placeholder">
                                                No Image
                                            </div>
                                        )}
                                    </div>
                                    <div className="media-card-meta">
                                        {article.category && article.category.length > 0 && (
                                            <span className="media-card-category">
                                                {article.category[0]}
                                            </span>
                                        )}
                                        <time className="media-card-date">
                                            {formatDate(article.publishdate || article.publishedAt)}
                                        </time>
                                    </div>
                                    <h4 className="media-card-title">
                                        {article.title}
                                    </h4>
                                </a>
                            ))
                        )}
                    </div>

                    {/* CTA */}
                    <div className="media-cta-wrapper">
                        <a
                            href={CAPITAL_VOICE_BASE}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="media-cta-btn inline-flex items-center justify-center gap-2"
                        >
                            すべての記事を見る
                            <ExternalLink className="w-5 h-5 flex-shrink-0" />
                        </a>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};
