import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import './IRVoiceProduct.css';
import { PhoneFrame } from './IRVoice/PhoneFrame';
import { BrandMark } from './IRVoice/BrandMark';
import AppHome from '../assets/ir-voice/app_home.webp';

/**
 * トップページのプロダクト紹介セクション。
 * 詳細は紹介ページ(/product)へ送客する。アプリ未公開のためダウンロード導線は置かない。
 */
export const IRVoiceProduct = () => {
    return (
        <section className="irvoice-section">
            <div className="irvoice-container">
                <div className="irvoice-grid">

                    {/* 左カラム: テキスト */}
                    <motion.div
                        className="irvoice-content"
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                    >
                        <div className="irvoice-eyebrow">
                            <span className="irvoice-eyebrow-label">Product</span>
                            <span className="irvoice-status">近日公開</span>
                        </div>

                        <h3 className="irvoice-title">
                            気になる企業の“今”が、<br />毎日届く。
                        </h3>

                        <p className="irvoice-description">
                            開示・動画・イベント。散らばるIR情報を、ひとつのフィードで。
                        </p>

                        {/* 製品ロゴ＋製品名。マークは装飾扱いで、名前はテキストで読ませる */}
                        <p className="irvoice-caption">
                            <span className="irvoice-caption-brand">
                                <BrandMark tone="dark" size={20} />
                                <span className="irvoice-caption-name">IR Voice</span>
                            </span>
                            <span className="irvoice-caption-desc">投資家のための IRフィードアプリ</span>
                        </p>

                        <div className="irvoice-cta-wrapper">
                            <Link to="/product" className="irvoice-cta-btn">
                                詳しく見る
                            </Link>
                        </div>
                    </motion.div>

                    {/* 右カラム: スマホ実機フレーム */}
                    <motion.div
                        className="irvoice-phone-wrapper"
                        initial={{ opacity: 0, y: 24 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                    >
                        <PhoneFrame
                            src={AppHome}
                            alt="IR Voice のホームフィード画面。開示・動画・イベントが時系列で並んでいる"
                            onLight
                        />
                    </motion.div>

                </div>
            </div>
        </section>
    );
};
