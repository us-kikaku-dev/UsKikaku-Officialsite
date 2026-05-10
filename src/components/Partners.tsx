import React from 'react';
import { motion } from 'motion/react';
import './Partners.css';

export const Partners = () => {
    return (
        <section className="partners-section">
            <div className="partners-container">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                >
                    {/* Header */}
                    <div className="text-center mb-16">
                        <span className="text-[#998438] tracking-widest text-sm uppercase block mb-2">
                            PARTNERS
                        </span>
                        <h2 className="serif-text text-3xl md:text-4xl text-[#050A14]">
                            提携企業一覧
                        </h2>
                    </div>

                    {/* Cards Grid */}
                    <div className="partners-grid">
                        <a
                            href="https://events.co.jp/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="partner-card"
                        >
                            <div className="partner-card-logo-wrapper">
                                <img
                                    src="/events-logo.png"
                                    alt="イベントス"
                                    className="partner-card-logo"
                                />
                            </div>
                            <div className="partner-card-divider" />
                            <h3 className="partner-card-name">株式会社イベントス</h3>
                            <p className="partner-card-description">
                                個人投資家向けの投資情報配信・セミナー運営
                            </p>
                        </a>

                        <a
                            href="https://shonan-invest.com/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="partner-card"
                        >
                            <div className="partner-card-logo-wrapper">
                                <img
                                    src="/shonan-investment-logo.png"
                                    alt="湘南投資勉強会"
                                    className="partner-card-logo"
                                />
                            </div>
                            <div className="partner-card-divider" />
                            <h3 className="partner-card-name">湘南投資勉強会</h3>
                            <p className="partner-card-description">
                                個人投資家コミュニティの運営・投資勉強会の主催
                            </p>
                        </a>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};
