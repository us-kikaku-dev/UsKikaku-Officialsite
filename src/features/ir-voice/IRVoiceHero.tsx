import React from 'react';
import { motion } from 'motion/react';
import { ExternalLink } from 'lucide-react';
import './IRVoicePage.css';
import { PhoneFrame } from './PhoneFrame';
import { BrandMark } from './BrandMark';
import { IR_VOICE_LP_URL, IR_VOICE_RELEASE_DATE_LABEL, isLpLinkReady } from '../../config/irVoice';
import AppHome from '../../assets/ir-voice/app_home.webp';

export const IRVoiceHero = () => {
    return (
        <section className="irv-hero">
            <div className="irv-container">
                <div className="irv-hero-grid">

                    <motion.div
                        className="irv-hero-copy"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        {/* リリース予定日。日付は設定ファイルで一元管理 */}
                        <p className="irv-hero-release">{IR_VOICE_RELEASE_DATE_LABEL}リリース予定</p>

                        {/* 製品ロゴ＋製品名のロックアップ。マークは装飾扱いで、名前はテキストで読ませる */}
                        <div className="irv-brand-lockup">
                            <BrandMark tone="dark" size={30} animated />
                            <span className="irv-brand-wordmark">IR Voice</span>
                        </div>
                        <p className="irv-brand-desc">投資家のための IRフィードアプリ</p>

                        <h1 className="irv-heading irv-hero-title">
                            気になる企業の<br />“今”が、
                            {/* マーカーが蛍光ペンのように左から引かれる */}
                            <motion.span
                                className="irv-marker"
                                initial={{ backgroundSize: '0% 100%' }}
                                animate={{ backgroundSize: '100% 100%' }}
                                transition={{ duration: 0.7, delay: 0.7, ease: 'easeOut' }}
                            >
                                毎日届く。
                            </motion.span>
                        </h1>

                        <p className="irv-hero-sub">
                            開示・動画・イベント。散らばるIR情報を、ひとつのフィードで。
                        </p>

                        <div className="irv-hero-launch">
                            {isLpLinkReady() ? (
                                <a
                                    href={IR_VOICE_LP_URL}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="irv-btn irv-btn--outline"
                                >
                                    公式サイトで詳しく見る
                                    <ExternalLink className="w-4 h-4 flex-shrink-0" aria-hidden="true" />
                                </a>
                            ) : (
                                /* ドメイン確定までリンクは出さない。押せない案内に留める */
                                <p className="irv-note">公式サイトは近日公開予定です</p>
                            )}
                            <p className="irv-hero-caption">App Store / Google Play にて配信予定です</p>
                        </div>
                    </motion.div>

                    <motion.div
                        className="irv-hero-phone"
                        initial={{ opacity: 0, y: 32 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.9, delay: 0.2 }}
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
