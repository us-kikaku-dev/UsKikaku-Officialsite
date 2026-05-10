import React from 'react';

import { motion } from 'motion/react';
import { ExternalLink } from 'lucide-react';
import './OkkakeProduct.css';
import OkkakeMockupNew from '../assets/okkake-mockup-new.png';

export const OkkakeProduct = () => {
    return (
        <section className="okkake-section">
            <div className="okkake-container">
                <div className="okkake-grid">

                    {/* Left Column: Visual */}
                    <motion.div
                        className="okkake-image-wrapper"
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                    >
                        <img
                            src={OkkakeMockupNew}
                            alt="OKKAKE Product Visual"
                            className="okkake-image"
                        />
                    </motion.div>

                    {/* Right Column: Content */}
                    <motion.div
                        className="okkake-content"
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                    >
                        <div className="text-left mb-8">
                            <span className="tracking-widest text-sm uppercase block mb-3" style={{ color: '#C89498' }}>
                                PRODUCT
                            </span>
                            <h3 className="text-2xl md:text-3xl serif-text font-bold text-[#0F172A] tracking-wider leading-relaxed">
                                予定として管理する、<br />新しいSNS。
                            </h3>
                        </div>

                        <p className="okkake-description mb-8">
                            OKKAKEは、イベントや配信などの情報をカレンダーを軸に発信・共有するSNS型のアプリケーションです。<br />
                            イベントや配信情報を時系列の予定として整理することで、情報がカレンダーに届く体験をユーザーに提供します。
                        </p>

                        <div className="w-full">
                            <div className="mb-8 okkake-cta-wrapper">
                                <a href="https://okkake.us-kikaku.com/" target="_blank" rel="noopener noreferrer" className="okkake-cta-btn inline-flex items-center justify-center gap-2">
                                    OKKAKE公式サイトを見る
                                    <ExternalLink className="w-5 h-5 flex-shrink-0" />
                                </a>
                            </div>


                        </div>
                    </motion.div>

                </div>
            </div>
        </section>
    );
};
