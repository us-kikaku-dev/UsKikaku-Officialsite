import React from 'react';
import { motion } from 'motion/react';
import ServiceReviewImage from '../assets/service-review.jpg';

export const ServiceReviewLPV3 = () => {
    return (
        <section style={{ padding: '160px 0', backgroundColor: '#FAF7F0' }}>
            <style>{`
                .service-review-btn {
                    display: inline-block;
                    border: 1px solid #D4AF37;
                    background-color: transparent;
                    color: #D4AF37;
                    padding: 20px 64px; /* px-16 is 64px, user wanted padding */
                    font-size: 1.125rem; /* text-lg */
                    letter-spacing: 0.1em; /* tracking-widest */
                    transition: all 0.3s ease;
                    text-decoration: none;
                }
                .service-review-btn:hover {
                    background-color: #D4AF37;
                    color: #ffffff;
                }
            `}</style>
            <div className="max-w-7xl mx-auto px-6 md:px-12 w-full">
                <div className="flex flex-col-reverse md:flex-row items-center gap-12 lg:gap-20">

                    {/* Left Column: Text (60%) */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="w-full md:w-3/5 text-center md:text-left flex flex-col items-center md:items-start"
                    >
                        {/* English Label */}
                        <span className="text-[#998438] tracking-widest text-sm uppercase block mb-6">
                            SERVICE REVIEW
                        </span>

                        {/* Main Title */}
                        <h2 className="serif-text text-3xl md:text-4xl text-[#050A14] tracking-wide mb-8">
                            プロの視点で、IR資料に新たな<br />
                            「気づき」と「確信」を。
                        </h2>

                        {/* Body Text */}
                        <p className="text-gray-600 leading-relaxed tracking-wide mb-8 text-base">
                            現状の課題を可視化し、構成の違和感やデザインのブラッシュアップをプロの視点でアドバイスします。決算説明資料をより効果的なものに変えましょう。
                        </p>

                        <p className="leading-relaxed tracking-wide mb-16 text-base" style={{ color: '#800020' }}>
                            現在の決算説明資料を拝見し、<br />
                            構成や伝え方の観点からレビューします。
                        </p>

                        {/* CTA Button */}
                        <a
                            href="https://ir.us-kikaku.com/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="service-review-btn shadow-sm"
                        >
                            決算資料のレビューを受ける
                        </a>
                    </motion.div>

                    {/* Right Column: Visual (40%) */}
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="w-full md:w-2/5 h-[300px] md:h-[400px] relative"
                    >
                        <div className="absolute inset-0 bg-[#050A14] bg-opacity-5 z-10 hidden md:block"></div> {/* Subtle overlay for integration */}

                        {/* Image: Abstract chart/presentation */}
                        <img
                            src={ServiceReviewImage}
                            alt="Data Analysis and Presentation"
                            className="w-full h-full object-cover shadow-lg"
                        />
                    </motion.div>

                </div>
            </div>
        </section>
    );
};
