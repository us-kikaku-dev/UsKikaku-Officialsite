import React from 'react';
import { motion } from 'motion/react';

export const ServiceHeroFinalV4 = () => {
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
                <div className="flex flex-col items-center text-center w-full max-w-5xl px-4">
                    <motion.h1
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1, ease: 'easeOut', delay: 0.2 }}
                        className="serif-text text-2xl md:text-4xl lg:text-5xl font-medium leading-relaxed text-white tracking-wider"
                    >
                        <span className="inline-block whitespace-nowrap">戦略設計から開示資料、</span><br />
                        <span className="inline-block whitespace-nowrap">投資家コミュニケーションまで</span><br />
                        <span className="inline-block whitespace-nowrap">一気通貫で支援するIRコンサルティング</span>
                    </motion.h1>
                </div>

                {/* CTA Button - Styling via Motion/Inline to ensure application */}
                <motion.a
                    href="https://docs.google.com/forms/d/e/1FAIpQLSc9AehA1NqD4kngknlIt4_y6LmrvDs8f56_jRUe4o8kh-rGIg/viewform"
                    target="_blank"
                    rel="noopener noreferrer"
                    initial={{ opacity: 0, y: 30, scale: 1 }}
                    animate={{ opacity: 1, y: 0 }}
                    whileHover={{
                        scale: 1.02,
                        backgroundColor: '#F3E5AB', // Hover: Fill with Champagne Gold
                        color: '#050A14', // Hover: Dark Text
                        boxShadow: "0 0 30px rgba(243, 229, 171, 0.3)", // Soft Gold Glow
                        borderColor: '#F3E5AB'
                    }}
                    transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }} // Ultra smooth bezier
                    className="inline-block text-sm md:text-lg font-medium tracking-widest shadow-lg rounded-sm whitespace-nowrap"
                    style={{
                        marginTop: '120px',
                        backgroundColor: '#050A14', // Base: Dark Navy
                        color: '#F3E5AB', // Text: Champagne Gold
                        border: '1px solid #F3E5AB', // Border: Champagne Gold
                        cursor: 'pointer',
                        textDecoration: 'none',
                        textShadow: 'none',
                        padding: '20px 100px' // Forced padding
                    }}
                >
                    決算資料のレビューを受ける
                </motion.a>
            </div>
        </header>
    );
};
