import React from 'react';
import { motion } from 'motion/react';

export const ServiceHeroFinal = () => {
    const scrollToContent = () => {
        const content = document.getElementById('service-content');
        if (content) {
            content.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <header
            className="relative h-[66vh] min-h-[500px] flex items-center justify-center overflow-hidden bg-cover bg-center bg-no-repeat bg-scroll md:bg-fixed"
            style={{
                backgroundImage:
                    "linear-gradient(to bottom, rgba(5, 10, 20, 0.6), rgba(5, 10, 20, 0.7)), url('https://images.unsplash.com/photo-1611974765270-ca12586343bb?q=80&w=2670&auto=format&fit=crop')",
            }}
        >
            <div className="absolute inset-0 bg-gradient-to-b from-[#050A14]/40 via-transparent to-[#050A14]/10"></div>

            <div className="relative z-10 text-center px-4 max-w-5xl mx-auto flex flex-col items-center justify-center h-full pt-16">

                {/* Main Title - Centered */}
                <motion.h1
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, ease: 'easeOut', delay: 0.2 }}
                    className="serif-text text-3xl md:text-5xl lg:text-6xl font-medium leading-tight md:leading-snug text-white tracking-wider"
                >
                    IRコンサルティング事業
                </motion.h1>

                {/* Centered Scroll Indicator */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, ease: 'easeOut', delay: 0.4 }}
                    className="mt-10 flex flex-col items-center cursor-pointer group"
                    onClick={scrollToContent}
                >
                    <span className="text-[#D4AF37]/80 text-[10px] tracking-[0.2em] mb-4 uppercase font-light transition-colors group-hover:text-[#F3E5AB]">
                        Scroll
                    </span>
                    <div className="w-[1px] h-16 bg-white/10 relative overflow-hidden">
                        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-[#D4AF37] to-transparent animate-scroll-line"></div>
                    </div>
                </motion.div>
            </div>
        </header>
    );
};
