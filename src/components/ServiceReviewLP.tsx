import React from 'react';
import { motion } from 'motion/react';

export const ServiceReviewLP = () => {
    return (
        <section className="py-[160px] bg-[#FAF7F0]">
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
                        <span className="text-[#D4AF37] font-bold text-sm tracking-[0.3em] mb-6 block">
                            SERVICE REVIEW
                        </span>

                        {/* Main Title */}
                        <h2 className="serif-text text-3xl md:text-4xl text-[#050A14] leading-tight mb-8 font-medium">
                            プロの視点で、IR資料に<br className="hidden md:block" />
                            新たな「気づき」と「確信」を。
                        </h2>

                        {/* Body Text */}
                        <p className="text-gray-700 leading-relaxed mb-10 text-base md:text-lg">
                            現状の課題を可視化し、構成の違和感やデザインのブラッシュアップをプロの視点でアドバイスします。決算説明資料をより効果的なものに変えましょう。
                        </p>

                        {/* CTA Button */}
                        <a
                            href="https://ir.us-kikaku.com/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-block border border-[#D4AF37] text-[#D4AF37] px-10 py-4 text-sm tracking-widest hover:bg-[#D4AF37] hover:text-white transition-all duration-300 transform hover:scale-105"
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
                            src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2670&auto=format&fit=crop"
                            alt="Data Analysis and Presentation"
                            className="w-full h-full object-cover shadow-lg"
                        />
                    </motion.div>

                </div>
            </div>
        </section>
    );
};
