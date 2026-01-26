import React from 'react';
import { motion } from 'framer-motion';
import './CompanyMap.css';

export const CompanyMap = () => {
    return (
        <section className="company-map-section">
            <div className="company-map-container">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                >
                    {/* Header: Board Members Style */}
                    <div className="text-center mb-20">
                        <span className="text-[#998438] tracking-widest text-sm uppercase block mb-2">
                            ACCESS
                        </span>
                        <h2 className="serif-text text-3xl md:text-4xl text-[#050A14]">
                            アクセス
                        </h2>
                    </div>

                    {/* Map Wrapper */}
                    <div className="company-map-wrapper">
                        <iframe
                            className="company-map-iframe"
                            title="Office Location"
                            src="https://maps.google.com/maps?q=神奈川県川崎市中原区今井南町4-11-101&t=&z=15&ie=UTF8&iwloc=&output=embed"
                            loading="lazy"
                            allowFullScreen
                        ></iframe>
                    </div>

                    <div className="company-map-address">
                        <p>〒211-0064</p>
                        <p>神奈川県川崎市中原区今井南町4-11-101</p>
                        <div style={{ marginTop: '1.5rem' }}>
                            <p>東急東横線・目黒線「武蔵小杉駅」南改札　徒歩10分</p>
                            <p>JR南武線・横須賀線・湘南新宿ライン「武蔵小杉駅」北改札　徒歩10分</p>
                        </div>
                    </div>

                </motion.div>
            </div>
        </section>
    );
};
