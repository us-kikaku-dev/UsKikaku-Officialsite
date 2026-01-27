import React from 'react';
import { motion } from 'motion/react';
import { ExternalLink } from 'lucide-react';
import ServiceReviewImage from '../assets/service-review-meeting.jpg';
import './ConsultingService.css';

export const ServiceReviewLPV3 = () => {
    return (
        <section className="consulting-section" style={{ backgroundColor: '#ffffff' }}>
            <div className="consulting-container">
                <div className="consulting-grid">

                    {/* Left Column: Visual (Now comes first for mobile stacking: image-on-top) */}
                    <motion.div
                        className="consulting-image-wrapper"
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                    >
                        <img
                            src={ServiceReviewImage}
                            alt="Service Review"
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
                        <div className="text-center md:text-left mb-8">
                            <span className="text-[#998438] tracking-widest text-sm uppercase block mb-3">
                                SERVICE REVIEW
                            </span>
                            <h2 className="text-2xl md:text-3xl serif-text font-bold text-[#0F172A] tracking-wider leading-relaxed">
                                プロの視点で、IR資料に新たな<br />
                                「気づき」と「確信」を。
                            </h2>
                        </div>

                        <p className="consulting-description mb-6 !text-center md:!text-left">
                            現状の課題を可視化し、構成の違和感やデザインのブラッシュアップをプロの視点でアドバイスします。決算説明資料をより効果的なものに変えましょう。
                        </p>

                        <p className="consulting-description font-medium mb-8" style={{ color: '#800020', textAlign: 'center' }}>
                            現在の決算説明資料を拝見し、<br />
                            構成や伝え方の観点からレビューします。
                        </p>

                        <div className="w-full">
                            <div className="mb-8 consulting-cta-wrapper">
                                <a
                                    href="https://ir.us-kikaku.com/"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="consulting-cta-btn inline-flex items-center justify-center gap-2"
                                >
                                    決算資料のレビューを受ける
                                    <ExternalLink className="w-5 h-5 flex-shrink-0" />
                                </a>
                            </div>
                        </div>
                    </motion.div>

                </div>
            </div>
        </section>
    );
};
