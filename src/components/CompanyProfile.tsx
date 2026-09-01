import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
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
                        {/* 会社情報ページのページタイトルにあたるためh1にする */}
                        <h1 className="serif-text text-3xl md:text-4xl text-[#050A14]">
                            会社概要
                        </h1>
                    </div>

                    {/* 会社情報の一覧: 用語と説明の対なので dl/dt/dd で意味付けする */}
                    <dl className="company-profile-table">
                        <div className="company-profile-row">
                            <dt className="company-profile-label">会社名</dt>
                            <dd className="company-profile-value">株式会社U's企画</dd>
                        </div>

                        <div className="company-profile-row">
                            <dt className="company-profile-label">設立</dt>
                            <dd className="company-profile-value">2023年11月</dd>
                        </div>

                        <div className="company-profile-row">
                            <dt className="company-profile-label">代表者</dt>
                            <dd className="company-profile-value">石原 優多</dd>
                        </div>

                        <div className="company-profile-row">
                            <dt className="company-profile-label">所在地</dt>
                            <dd className="company-profile-value">神奈川県川崎市中原区今井南町4-11-101</dd>
                        </div>

                        <div className="company-profile-row">
                            <dt className="company-profile-label">事業内容</dt>
                            <dd className="company-profile-value">
                                IRコンサルティング事業<br />
                                プロダクト開発事業
                            </dd>
                        </div>

                        <div className="company-profile-row">
                            <dt className="company-profile-label">お問い合わせ</dt>
                            <dd className="company-profile-value">
                                <Link to="/contact" className="company-profile-link">
                                    お問い合わせはこちら
                                </Link>
                            </dd>
                        </div>
                    </dl>

                </motion.div>
            </div>
        </section>
    );
};
