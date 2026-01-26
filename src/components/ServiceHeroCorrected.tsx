import React from 'react';
import { motion } from 'motion/react';

export const ServiceHeroCorrected = () => {
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

            {/* Dark Overlay Layer - Increased opacity for readability */}
            <div className="absolute inset-0 z-[1] bg-black/70"></div>

            {/* Content Layer */}
            <div className="relative z-10 text-center px-4 max-w-5xl mx-auto flex flex-col items-center justify-center h-full pt-16">

                {/* Main Content Group */}
                <div className="flex flex-col items-center">
                    {/* Title */}
                    <motion.h1
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1, ease: 'easeOut', delay: 0.2 }}
                        className="serif-text text-4xl md:text-6xl lg:text-7xl font-medium leading-tight md:leading-snug text-white tracking-wider"
                    >
                        IRコンサルティング事業
                    </motion.h1>

                    {/* Sub-message */}
                    <motion.p
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1, ease: 'easeOut', delay: 0.3 }}
                        className="text-white text-sm md:text-lg tracking-wider mt-10 font-light"
                    >
                        戦略設計から開示資料、投資家コミュニケーションまで一貫支援
                    </motion.p>
                </div>

                {/* CTA Button - Large spacing from content */}
                <motion.a
                    href="https://docs.google.com/forms/d/e/1FAIpQLSc9AehA1NqD4kngknlIt4_y6LmrvDs8f56_jRUe4o8kh-rGIg/viewform"
                    target="_blank"
                    rel="noopener noreferrer"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, ease: 'easeOut', delay: 0.4 }}
                    className="mt-20 inline-block border border-[#D4AF37] px-10 py-4 text-[#D4AF37] text-sm md:text-base tracking-widest hover:bg-[#D4AF37] hover:text-[#050A14] transition-colors duration-300"
                >
                    決算資料のレビューを受ける
                </motion.a>

                {/* Centered Scroll Indicator */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, ease: 'easeOut', delay: 0.5 }}
                    className="absolute bottom-10 flex flex-col items-center cursor-pointer group"
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
