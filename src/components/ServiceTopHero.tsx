import React from 'react';
import { motion } from 'motion/react';

export const ServiceTopHero = () => {
    return (
        <div
            className="relative h-[50vh] min-h-[400px] flex items-center justify-center overflow-hidden bg-cover bg-center"
            style={{
                backgroundImage:
                    "url('https://images.unsplash.com/photo-1611974765270-ca12586343bb?q=80&w=2670&auto=format&fit=crop')",
            }}
        >
            {/* Dark Overlay */}
            <div className="absolute inset-0 bg-black/50"></div>

            <div className="relative z-10 text-center px-4 max-w-5xl mx-auto flex flex-col items-center justify-center h-full pt-20">
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: 'easeOut' }}
                    className="text-[#D4AF37] tracking-[0.3em] text-sm md:text-base mb-4 uppercase font-medium"
                >
                    SERVICE
                </motion.p>

                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: 'easeOut', delay: 0.2 }}
                    className="serif-text text-4xl md:text-5xl lg:text-6xl font-bold text-white tracking-wider"
                >
                    事業内容
                </motion.h1>
            </div>
        </div>
    );
};
