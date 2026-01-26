import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import './ConsultingService.css';

export const ConsultingService = () => {
    return (
        <section className="consulting-section">
            <div className="consulting-container">
                <div className="consulting-grid">

                    {/* Left Column: Visual */}
                    <motion.div
                        className="consulting-image-wrapper"
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                    >
                        <img
                            // Unsplash image: Modern office / Architecture. 
                            // Keywords: office, architecture, glass, building, minimal
                            // specific ID or similar
                            src="https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=2301&auto=format&fit=crop"
                            alt="IR Consulting Office Environment"
                            className="consulting-image"
                        />
                    </motion.div>

                    {/* Right Column: Content */}
                    <motion.div
                        className="consulting-content"
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                    >
                        {/* Header: Label + Title */}
                        <div className="text-left mb-8">
                            <span className="text-[#998438] tracking-widest text-sm uppercase block mb-3">
                                IR CONSULTING
                            </span>
                            <h3 className="text-2xl md:text-3xl serif-text font-bold text-[#0F172A] tracking-wider leading-relaxed">
                                資本市場と企業をつなぐ、<br />実践型IRコンサルティング
                            </h3>
                        </div>

                        <p className="consulting-description mb-8">
                            当社は、上場企業および上場準備企業を対象に、IR戦略の設計から決算説明資料・統合報告書などの開示資料作成、投資家コミュニケーションの高度化までを一貫して支援するIRコンサルティングを提供しています。IR方針策定やKPI設計、各種IRコンテンツの作成支援を通じて、企業の成長戦略と整合した、再現性のあるIR体制の構築を支援します。
                        </p>

                        <div className="w-full">
                            <div className="mb-8">
                                <Link to="/contact" className="consulting-cta-btn">
                                    決算資料のレビューを受ける
                                </Link>
                            </div>

                            <div className="consulting-link-wrapper">
                                <Link to="/service" className="consulting-link">
                                    IRコンサルティングについて詳しく見る →
                                </Link>
                            </div>
                        </div>
                    </motion.div>

                </div>
            </div>
        </section>
    );
};
