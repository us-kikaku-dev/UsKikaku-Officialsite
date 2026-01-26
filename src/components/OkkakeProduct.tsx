import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import './OkkakeProduct.css';

export const OkkakeProduct = () => {
    return (
        <section className="okkake-section">
            <div className="okkake-container">
                <div className="okkake-grid">

                    {/* Left Column: Visual */}
                    <motion.div
                        className="okkake-image-wrapper"
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                    >
                        <img
                            // Unsplash: Abstract pink/rose gold/digital
                            src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2564&auto=format&fit=crop"
                            alt="OKKAKE Product Visual"
                            className="okkake-image"
                        />
                    </motion.div>

                    {/* Right Column: Content */}
                    <motion.div
                        className="okkake-content"
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                    >
                        <div className="text-left mb-8">
                            <span className="tracking-widest text-sm uppercase block mb-3" style={{ color: '#C89498' }}>
                                PRODUCT
                            </span>
                            <h3 className="text-2xl md:text-3xl serif-text font-bold text-[#0F172A] tracking-wider leading-relaxed">
                                予定として管理する、<br />新しいSNS。
                            </h3>
                        </div>

                        <p className="okkake-description mb-8">
                            OKKAKEは、イベントや配信などの情報をカレンダーを軸に発信・共有するSNS型のアプリケーションです。<br />
                            イベントや配信情報を時系列の予定として整理することで、情報がカレンダーに届く体験をユーザーに提供します。
                        </p>

                        <div className="w-full">
                            <div className="mb-8">
                                <a href="https://okkake.me" target="_blank" rel="noopener noreferrer" className="okkake-cta-btn">
                                    OKKAKE公式サイトを見る
                                </a>
                            </div>

                            <div className="okkake-link-wrapper">
                                <Link to="/products" className="okkake-link">
                                    自社開発プロダクト一覧を見る →
                                </Link>
                            </div>
                        </div>
                    </motion.div>

                </div>
            </div>
        </section>
    );
};
