import React from 'react';

import { motion } from 'motion/react';
import { ExternalLink } from 'lucide-react';
import ServiceHeroImage from '../assets/service-hero.jpg';

export const ServiceHeroFinalV4 = () => {
    return (
        <header className="relative h-screen flex items-center justify-center overflow-hidden bg-[#050A14]">
            {/* Background Image Layer */}
            <div
                className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat bg-scroll md:bg-fixed"
                style={{
                    backgroundImage: `url(${ServiceHeroImage})`,
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
                <a
                    href="https://ir.us-kikaku.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block text-sm md:text-lg font-medium tracking-widest shadow-lg rounded-sm"
                    style={{
                        marginTop: '120px',
                        textDecoration: 'none',
                        display: 'inline-block', // Reset to block/inline-block
                    }}
                >
                    <motion.div
                        initial={{ opacity: 0, y: 30, scale: 1, backgroundColor: '#050A14', borderColor: '#F3E5AB', color: '#F3E5AB' }}
                        animate={{ opacity: 1, y: 0 }}
                        whileHover={{
                            scale: 1.02,
                            backgroundColor: '#C5A065',
                            color: '#FFFFFF',
                            borderColor: '#C5A065',
                            fontWeight: 'bold',
                            boxShadow: "0 0 30px rgba(197, 160, 101, 0.5)",
                        }}
                        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                        className="flex items-center gap-2 justify-center"
                        style={{
                            border: '1px solid', // Width handled here, color via motion
                            padding: '12px 24px',
                            cursor: 'pointer',
                            fontSize: 'clamp(12px, 4vw, 18px)',
                            whiteSpace: 'nowrap'
                        }}
                    >
                        決算資料のレビューを受ける
                        <ExternalLink className="w-5 h-5 flex-shrink-0" />
                    </motion.div>
                </a>
            </div>
        </header>
    );
};
