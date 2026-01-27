import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';

export const ServiceHeroStock = () => {
    const scrollToMessage = () => {
        const content = document.getElementById('service-content');
        if (content) {
            content.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <header
            className="relative h-screen flex items-center justify-center overflow-hidden bg-cover bg-center bg-no-repeat bg-scroll md:bg-fixed"
            style={{
                backgroundImage:
                    "linear-gradient(to bottom, rgba(5, 10, 20, 0.6), rgba(5, 10, 20, 0.7)), url('https://images.unsplash.com/photo-1611974765270-ca12586343bb?q=80&w=2670&auto=format&fit=crop')",
            }}
        >
            <div className="absolute inset-0 bg-gradient-to-b from-[#050A14]/40 via-transparent to-[#050A14]/10"></div>

            <div className="relative z-10 text-center px-4 max-w-5xl mx-auto flex flex-col items-center justify-center h-full pt-16">
                <motion.p
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, ease: 'easeOut' }}
                    className="text-[#F3E5AB] tracking-[0.3em] text-sm md:text-base mb-6 uppercase"
                >
                    SERVICE
                </motion.p>

                <motion.h1
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, ease: 'easeOut', delay: 0.2 }}
                    className="serif-text text-4xl md:text-6xl lg:text-7xl font-medium leading-tight md:leading-snug text-white tracking-wider"
                >
                    IRコンサルティング事業
                </motion.h1>

                <motion.p
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, ease: 'easeOut', delay: 0.3 }}
                    className="text-white text-sm md:text-lg tracking-wider mt-10 font-light"
                >
                    戦略設計から開示資料、投資家コミュニケーションまで一貫支援
                </motion.p>

                <Link
                    to="/contact"
                    className="mt-40 inline-block border border-[#D4AF37] px-8 py-3 text-[#D4AF37] text-sm md:text-base tracking-widest hover:bg-[#D4AF37] hover:text-[#050A14] transition-colors duration-300"
                >
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1, ease: 'easeOut', delay: 0.4 }}
                        className="w-full h-full flex items-center justify-center"
                    >
                        決算資料のレビューを受ける
                    </motion.div>
                </Link>

                {/* Centered Scroll Indicator */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, ease: 'easeOut', delay: 0.4 }}
                    className="mt-16 flex flex-col items-center cursor-pointer group"
                    onClick={scrollToMessage}
                >
                    <span className="text-[#D4AF37]/80 text-[10px] tracking-[0.2em] mb-4 uppercase font-light transition-colors group-hover:text-[#F3E5AB]">
                        Scroll
                    </span>
                    <div className="w-[1px] h-24 bg-white/10 relative overflow-hidden">
                        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-[#D4AF37] to-transparent animate-scroll-line"></div>
                    </div>
                </motion.div>
            </div>
        </header>
    );
};
