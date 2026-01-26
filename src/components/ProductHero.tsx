import React from 'react';
import { motion } from 'motion/react';
import { ExternalLink } from 'lucide-react';
import { OkkakeCTA } from './OkkakeCTA';
import OkkakeBg from '../assets/okkake-bg.png';
import OkkakeMockup from '../assets/okkake-mockup.png';
import OkkakeLogo from '../assets/okkake-logo.png';

export const ProductHero = () => {
    return (
        <section
            className="relative overflow-hidden pt-32 pb-24 md:pt-48 md:pb-56"
            style={{
                backgroundImage: `url(${OkkakeBg})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                paddingBottom: '100px',
            }}
        >
            <div className="max-w-7xl mx-auto px-6 md:px-8 lg:px-12 w-full relative z-10">
                <div className="flex flex-col md:flex-row items-center gap-12 lg:gap-20">

                    {/* Left Column: Text (50%) */}
                    <div className="w-full md:w-1/2 text-center md:text-left">

                        {/* 1. Service Logo */}
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                            className="mb-8 flex justify-center md:justify-start"
                        >
                            <img src={OkkakeLogo} alt="OKKAKE" className="h-12 md:h-14 w-auto" />
                        </motion.div>

                        {/* 2. Main Copy */}
                        <motion.h1
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.1 }}
                            className="mb-6 pb-2"
                        >
                            <span className="hero-copy-line1">予定として管理する、</span>
                            <span className="hero-copy-line2">新しいSNS。</span>
                        </motion.h1>

                        {/* 3. Description */}
                        <motion.p
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            className="text-gray-600 text-lg leading-relaxed mb-16 font-medium"
                            style={{ fontFamily: '"M PLUS Rounded 1c", sans-serif' }}
                        >
                            OKKAKEは、イベントや配信などの情報をカレンダーを軸に<br />
                            発信・共有するSNS型アプリです。
                        </motion.p>

                        {/* 4. CTA Button */}
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.3 }}
                        >
                            <OkkakeCTA />
                        </motion.div>
                    </div>

                    {/* Right Column: Visual (50%) */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="w-full md:w-1/2 flex justify-center md:justify-end"
                    >
                        <div className="relative" style={{ width: '100%', maxWidth: '444px' }}>
                            {/* Mockup Image */}
                            <img
                                src={OkkakeMockup}
                                alt="OKKAKE App"
                                className="w-full h-auto drop-shadow-2xl"
                            />
                        </div>
                    </motion.div>
                </div>

            </div>
        </section >
    );
};
