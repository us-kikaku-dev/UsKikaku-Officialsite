import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { ExternalLink } from 'lucide-react';
import './IRVoicePage.css';
import { IR_VOICE_LP_FOR_BUSINESS_URL, isLpLinkReady } from '../../config/irVoice';
import BizAnalytics from '../../assets/ir-voice/biz_analytics.webp';
import BizDashboardHome from '../../assets/ir-voice/biz_dashboard_home.webp';
import BizSurveyResults from '../../assets/ir-voice/biz_survey_results.webp';
import BizEvents from '../../assets/ir-voice/biz_events.webp';

/* 画像と訴求の対応は公式LP(for-business)の DASHBOARD_FEATURES に合わせている */
const BUSINESS_FEATURES = [
    {
        numeral: '01',
        title: '誰に届いたかが、行動ファネルで見える',
        desc: 'コンテンツの閲覧から保存・フォローまで、投資家の行動をファネルと推移グラフで確認できます。',
        image: BizAnalytics,
        alt: 'IR Voice for Business のアナリティクス画面。行動ファネルと推移グラフが表示されている',
    },
    {
        numeral: '02',
        title: 'どんな投資家に見られているかがわかる',
        desc: 'フォロワーの年代・投資経験などの属性を匿名集計で把握。個人が特定される情報は一切表示されません。',
        image: BizDashboardHome,
        alt: 'IR Voice for Business のダッシュボードホーム画面',
    },
    {
        numeral: '03',
        title: '投資家の“声”を集める',
        desc: 'アンケートを配信し、結果は自動で集計。IR資料や説明会の改善に活用できます。',
        image: BizSurveyResults,
        alt: 'IR Voice for Business のアンケート集計結果画面',
    },
    {
        numeral: '04',
        title: '説明会の告知から受付まで、ひとつで',
        desc: '告知はフォロワーのフィードへ自動配信。会場受付はQRコードでスムーズに。',
        image: BizEvents,
        alt: 'IR Voice for Business のイベント管理画面',
    },
];

export const IRVoiceForBusiness = () => {
    return (
        <section className="irv-business">
            <div className="irv-container">
                <motion.div
                    className="irv-section-head"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                >
                    <span className="irv-eyebrow">For Business</span>
                    <h2 className="irv-heading irv-section-title">
                        投資家の反応が、<br className="irv-br-narrow" />
                        {/* マーカーはスクロールで見えたときに引かれる */}
                        <motion.span
                            className="irv-marker"
                            initial={{ backgroundSize: '0% 100%' }}
                            whileInView={{ backgroundSize: '100% 100%' }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.7, delay: 0.4, ease: 'easeOut' }}
                        >
                            数字でわかる。
                        </motion.span>
                    </h2>
                    <p className="irv-business-lead">
                        閲覧・フォロー・アンケートで投資家の反応を見える化する、企業のIRご担当者様向けダッシュボード。
                    </p>
                </motion.div>

                <div className="irv-business-grid">
                    {BUSINESS_FEATURES.map((feature, index) => (
                        <motion.div
                            key={feature.numeral}
                            className="irv-business-item"
                            initial={{ opacity: 0, y: 24 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: '-60px' }}
                            transition={{ duration: 0.7, delay: (index % 2) * 0.1 }}
                        >
                            <span className="irv-business-num" aria-hidden="true">{feature.numeral}</span>
                            <img
                                src={feature.image}
                                alt={feature.alt}
                                className="irv-shot"
                                loading="lazy"
                                decoding="async"
                            />
                            <h3 className="irv-business-item-title">{feature.title}</h3>
                            <p className="irv-business-item-desc">{feature.desc}</p>
                        </motion.div>
                    ))}
                </div>

                <div className="irv-business-actions">
                    {isLpLinkReady() ? (
                        <a
                            href={IR_VOICE_LP_FOR_BUSINESS_URL}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="irv-btn irv-btn--outline-dark"
                        >
                            企業向けの詳細を見る
                            <ExternalLink className="w-4 h-4 flex-shrink-0" aria-hidden="true" />
                        </a>
                    ) : (
                        /* ドメイン確定までリンクは出さない */
                        <p className="irv-note irv-note--on-dark">企業向けの詳細ページは近日公開予定です</p>
                    )}
                    {/* 種別「IR Voiceについて」を事前選択した状態でフォームへ */}
                    <Link to="/contact?type=ir-voice" className="irv-btn irv-btn--primary">
                        お問い合わせ
                    </Link>
                </div>
            </div>
        </section>
    );
};
