import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import './CompanyProfile.css';

export const CompanyProfile = () => {
    return (
        <section className="company-profile-section">
            <div className="company-profile-container">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                >
                    {/* Header */}
                    <div className="text-center mb-20">
                        <span className="text-[#998438] tracking-widest text-sm uppercase block mb-2">
                            COMPANY PROFILE
                        </span>
                        <h2 className="serif-text text-3xl md:text-4xl text-[#050A14]">
                            会社概要
                        </h2>
                    </div>

                    {/* Table */}
                    <div className="company-profile-table">
                        <div className="company-profile-row">
                            <div className="company-profile-label">会社名</div>
                            <div className="company-profile-value">株式会社U's企画</div>
                        </div>

                        <div className="company-profile-row">
                            <div className="company-profile-label">設立</div>
                            <div className="company-profile-value">2023年11月</div>
                        </div>

                        <div className="company-profile-row">
                            <div className="company-profile-label">代表者</div>
                            <div className="company-profile-value">石原 優多</div>
                        </div>

                        <div className="company-profile-row">
                            <div className="company-profile-label">所在地</div>
                            <div className="company-profile-value">神奈川県川崎市中原区今井南町4-11-101</div>
                        </div>

                        <div className="company-profile-row">
                            <div className="company-profile-label">事業内容</div>
                            <div className="company-profile-value">
                                IRコンサルティング事業<br />
                                プロダクト開発事業
                            </div>
                        </div>

                        <div className="company-profile-row">
                            <div className="company-profile-label">お問い合わせ</div>
                            <div className="company-profile-value">
                                <Link to="/contact" className="company-profile-link">
                                    お問い合わせはこちら →
                                </Link>
                            </div>
                        </div>
                    </div>

                </motion.div>
            </div>
        </section>
    );
};
