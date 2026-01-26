import React from 'react';
import { motion } from 'motion/react';

export const ServiceHeroFinalV3 = () => {
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
            <div className="absolute inset-0 z-[1] bg-black/80 backdrop-blur-md"></div>

            {/* Content Layer */}
            <div className="relative z-10 w-full max-w-6xl mx-auto px-4 flex flex-col items-center justify-center h-full">

                {/* Text Content Group */}
                <div className="flex flex-col items-center text-center w-full max-w-5xl">
                    <motion.h1
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1, ease: 'easeOut', delay: 0.2 }}
                        className="serif-text text-3xl md:text-5xl lg:text-7xl font-medium leading-tight text-white tracking-wider whitespace-nowrap"
                    >
                        IRコンサルティング事業
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1, ease: 'easeOut', delay: 0.3 }}
                        className="text-white text-xs md:text-lg tracking-wider mt-8 font-medium drop-shadow-md"
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
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.3 }}
                    className="inline-block bg-[#F3E5AB] px-10 py-4 text-white text-sm md:text-base tracking-widest shadow-lg hover:shadow-xl hover:bg-[#E6D59B] transition-all duration-300"
                    style={{ marginTop: '120px' }}
                >
                    決算資料のレビューを受ける
                </motion.a>
            </div>
        </header>
    );
};
