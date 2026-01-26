import React from 'react';
import { motion } from 'motion/react';

export const ServiceHeroFinalFixed = () => {
    return (
        <header className="relative h-screen flex items-center justify-center overflow-hidden bg-[#050A14]">
            {/* Background Image Layer */}
            <div
                className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat bg-scroll md:bg-fixed"
                style={{
                    backgroundImage: "url('https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?q=80&w=2670&auto=format&fit=crop')",
                }}
            />

            {/* Dark Overlay Layer */}
            <div className="absolute inset-0 z-[1] bg-black/85"></div>

            {/* Content Layer */}
            <div className="relative z-10 w-full max-w-5xl mx-auto px-4 flex flex-col items-center justify-center h-full">

                {/* Text Content Group with Background Box */}
                <div className="flex flex-col items-center text-center bg-black/60 backdrop-blur-md p-8 md:p-12 rounded-xl border border-white/10 shadow-2xl max-w-4xl">
                    <motion.h1
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1, ease: 'easeOut', delay: 0.2 }}
                        className="serif-text text-4xl md:text-6xl lg:text-7xl font-medium leading-tight md:leading-snug text-white tracking-wider whitespace-nowrap"
                    >
                        IRコンサルティング事業
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1, ease: 'easeOut', delay: 0.3 }}
                        className="text-white text-sm md:text-lg tracking-wider mt-8 font-light"
                    >
                        戦略設計から開示資料、投資家コミュニケーションまで一貫支援
                    </motion.p>
                </div>

                {/* CTA Button - Forced Spacing */}
                <motion.a
                    href="https://docs.google.com/forms/d/e/1FAIpQLSc9AehA1NqD4kngknlIt4_y6LmrvDs8f56_jRUe4o8kh-rGIg/viewform"
                    target="_blank"
                    rel="noopener noreferrer"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, ease: 'easeOut', delay: 0.4 }}
                    className="inline-block border border-[#D4AF37] px-10 py-4 text-[#D4AF37] text-sm md:text-base tracking-widest hover:bg-[#D4AF37] hover:text-[#050A14] transition-colors duration-300"
                    style={{ marginTop: '120px' }} // Explicit inline style to guarantee spacing
                >
                    決算資料のレビューを受ける
                </motion.a>
            </div>
        </header>
    );
};
