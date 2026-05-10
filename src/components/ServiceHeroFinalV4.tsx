import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import ServiceHeroImage from '../assets/service-hero.jpg';

export const ServiceHeroFinalV4 = () => {
    const ref = useRef(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ['start start', 'end start'],
    });

    // パララックス：背景がスクロールより遅く動く
    const backgroundY = useTransform(scrollYProgress, [0, 1], ['0%', '50%']);

    const scrollToNext = () => {
        if (ref.current) {
            const next = (ref.current as HTMLElement).nextElementSibling;
            if (next) {
                next.scrollIntoView({ behavior: 'smooth' });
            }
        }
    };

    return (
        <header
            ref={ref}
            className="relative h-screen flex items-center justify-center overflow-hidden bg-[#050A14]"
        >
            {/* Parallax Background Layer */}
            <motion.div
                className="absolute inset-0 z-0"
                style={{
                    y: backgroundY,
                    backgroundImage: `linear-gradient(to bottom, rgba(5, 10, 20, 0.4), rgba(5, 10, 20, 0.6)), url(${ServiceHeroImage})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    height: '120%',
                    top: 0,
                }}
            />

            {/* Gradient Overlay */}
            <div className="absolute inset-0 z-[1] bg-gradient-to-b from-[#050A14]/40 via-transparent to-[#050A14]/10 pointer-events-none"></div>

            {/* Content with Parallax */}
            <div
                className="relative z-10 text-center px-4 max-w-5xl mx-auto flex flex-col items-center justify-center h-full pt-16"
            >
                <motion.p
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, ease: 'easeOut' }}
                    className="text-[#F3E5AB] tracking-[0.3em] text-sm md:text-base mb-6 uppercase"
                >
                    Service
                </motion.p>

                <motion.h1
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, ease: 'easeOut', delay: 0.2 }}
                    className="serif-text text-4xl md:text-6xl lg:text-7xl font-medium leading-tight md:leading-snug text-white tracking-wider"
                >
                    IRに、<br />
                    <span className="gold-gradient-text">本質的な対話</span>を。
                </motion.h1>

                {/* Centered Scroll Indicator */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, ease: 'easeOut', delay: 0.4 }}
                    className="mt-16 flex flex-col items-center cursor-pointer group"
                    onClick={scrollToNext}
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
