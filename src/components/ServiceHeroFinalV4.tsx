import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { ExternalLink } from 'lucide-react';

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
                <Link
                    to="/contact" // Changed from external Google Form link
                    className="inline-block text-sm md:text-lg font-medium tracking-widest shadow-lg rounded-sm"
                    style={{
                        marginTop: '120px',
                        backgroundColor: '#050A14', // Base: Dark Navy
                        color: '#F3E5AB', // Text: Champagne Gold
                        border: '1px solid #F3E5AB', // Border: Champagne Gold
                        cursor: 'pointer',
                        textDecoration: 'none',
                        textShadow: 'none',
                        padding: '12px 24px', // Reduced padding
                        whiteSpace: 'nowrap', // Force no wrap
                        display: 'inline-flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '0.5rem',
                        fontSize: 'clamp(12px, 4vw, 18px)' // Dynamic font size
                    }}
                >
                    <motion.div
                        initial={{ opacity: 0, y: 30, scale: 1 }}
                        animate={{ opacity: 1, y: 0 }}
                        whileHover={{
                            scale: 1.02,
                            backgroundColor: '#F3E5AB',
                            color: '#050A14',
                            boxShadow: "0 0 30px rgba(243, 229, 171, 0.3)",
                        }}
                        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                        className="flex items-center gap-2 w-full h-full justify-center"
                        style={{ width: '100%', height: '100%' }} // Ensure fill
                    >
                        決算資料のレビューを受ける
                        <ExternalLink className="w-5 h-5 flex-shrink-0" />
                    </motion.div>
                </Link>
            </div>
        </header>
    );
};
