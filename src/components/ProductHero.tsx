import React from 'react';
import { motion } from 'motion/react';
import { ExternalLink } from 'lucide-react';
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
                            className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-[#FF4081] via-[#FBC02D] to-[#00B0FF] leading-[1.2] mb-6 tracking-normal pb-2"
                            style={{ fontFamily: '"M PLUS Rounded 1c", sans-serif', fontWeight: 800 }}
                        >
                            予定として管理する、<br />
                            新しいSNS。
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
                            <style>{`
                                .okkake-cta-btn {
                                    background: linear-gradient(90deg, #E6007E 0%, #FF6B6B 100%);
                                    border-radius: 16px;
                                    box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.2), 0 8px 10px -6px rgba(0, 0, 0, 0.1);
                                    transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
                                    transform: translateY(0);
                                    cursor: pointer;
                                    text-decoration: none;
                                    color: #FFFFFF !important;
                                    
                                    /* Layout Enforcements */
                                    display: inline-flex !important;
                                    width: auto !important;
                                    flex-direction: row !important;
                                    flex-wrap: nowrap !important;
                                    align-items: center !important;
                                    justify-content: center !important;
                                    white-space: nowrap !important;
                                    font-weight: 800 !important;
                                }
                                .okkake-cta-btn:hover {
                                    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
                                    transform: translateY(6px);
                                    color: #FFFFFF !important;
                                }
                                .okkake-cta-btn:active {
                                    transform: translateY(6px) scale(0.95);
                                    color: #FFFFFF !important;
                                }
                            `}</style>
                            <a
                                href="https://okkake.us-kikaku.com/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="okkake-cta-btn inline-flex flex-nowrap items-center justify-center gap-2 text-white px-6 py-4 text-lg font-extrabold whitespace-nowrap"
                            >
                                OKKAKEのサービスサイトを見る
                                <ExternalLink className="w-5 h-5 flex-shrink-0" />
                            </a>
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
        </section>
    );
};
