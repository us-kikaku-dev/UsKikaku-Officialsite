import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';

export const ServiceHeroFixed = () => {
    const scrollToMessage = () => {
        const content = document.getElementById('service-content');
        if (content) {
            content.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <header
            className="relative h-screen flex items-center justify-center overflow-hidden bg-[#050A14]"
        >
            {/* Background Image Layer */}
            <div
                className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat bg-scroll md:bg-fixed"
                style={{
                    backgroundImage: "url('https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?q=80&w=2670&auto=format&fit=crop')",
                }}
            />

            {/* Overlay Layer */}
            <div className="absolute inset-0 z-[1] bg-gradient-to-b from-[#050A14]/70 via-[#050A14]/40 to-[#050A14]/70"></div>

            {/* Content Layer */}
            <div className="relative z-10 text-center px-4 max-w-5xl mx-auto flex flex-col items-center justify-center h-full pt-16">

                {/* Content Wrapper with gap to ensure spacing */}
                <div className="flex flex-col items-center gap-12">
                    <motion.p
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1, ease: 'easeOut' }}
                        className="text-[#F3E5AB] tracking-[0.3em] text-sm md:text-base uppercase"
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
                        className="text-white text-sm md:text-lg tracking-wider font-light"
                    >
                        戦略設計から開示資料、投資家コミュニケーションまで一貫支援
                    </motion.p>
                </div>

                {/* CTA Button with separate margin from the content block */}
                <Link
                    to="/contact"
                    className="mt-24 inline-block border border-[#D4AF37] px-10 py-4 text-[#D4AF37] text-sm md:text-base tracking-widest hover:bg-[#D4AF37] hover:text-[#050A14] transition-colors duration-300"
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
                    transition={{ duration: 1, ease: 'easeOut', delay: 0.5 }}
                    className="mt-20 flex flex-col items-center cursor-pointer group absolute bottom-10"
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
