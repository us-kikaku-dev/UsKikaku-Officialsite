import React from 'react';
import { motion } from 'motion/react';
import './IRVoicePage.css';
import { PhoneFrame } from './PhoneFrame';
import AppHome from '../../assets/ir-voice/app_home.webp';
import AppCompanyFinancials from '../../assets/ir-voice/app_company_financials.webp';
import AppEventDetail from '../../assets/ir-voice/app_event_detail.webp';
import AppSurveys from '../../assets/ir-voice/app_surveys.webp';

/* 連番・構成は公式LP本体の 01〜04 を踏襲している */
const FEATURES = [
    {
        numeral: '01',
        title: 'ホームフィード',
        desc: '動画・記事・開示をカテゴリで絞り込み。気になった話題は「保存」であとから見返せる。新着はプッシュ通知でお知らせ。',
        image: AppHome,
        alt: 'IR Voice のホームフィード画面。カテゴリで絞り込まれた開示・動画が並んでいる',
    },
    {
        numeral: '02',
        title: '企業ページでIR情報を一覧化',
        desc: '業績や配当をグラフでサクッと確認。決算短信を開かなくても、まず全体像がつかめます。',
        image: AppCompanyFinancials,
        alt: 'IR Voice の企業ページ業績タブ。売上・利益がグラフで表示されている',
    },
    {
        numeral: '03',
        title: 'IRイベントを管理する',
        desc: '説明会の案内がフィードに届き、ワンタップでスマホのカレンダーへ。開催前のリマインド通知も。',
        image: AppEventDetail,
        alt: 'IR Voice のIRイベント詳細画面',
    },
    {
        numeral: '04',
        title: 'アンケートに答える',
        desc: '企業からのアンケートに答えると、あなたの声がIR活動に届きます。',
        image: AppSurveys,
        alt: 'IR Voice のアンケート一覧画面',
    },
];

export const IRVoiceFeatures = () => {
    return (
        <section className="irv-features">
            <div className="irv-container">
                <div className="irv-section-head">
                    <span className="irv-eyebrow">Features</span>
                    <h2 className="irv-heading irv-section-title">
                        投資家のための、4つの機能。
                    </h2>
                </div>

                {FEATURES.map((feature, index) => (
                    <motion.div
                        key={feature.numeral}
                        className={`irv-feature-row ${index % 2 === 1 ? 'irv-feature-row--reverse' : ''}`}
                        initial={{ opacity: 0, y: 24 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: '-80px' }}
                        transition={{ duration: 0.7 }}
                    >
                        <div className="irv-feature-text">
                            <span className="irv-feature-num" aria-hidden="true">{feature.numeral}</span>
                            <h3 className="irv-heading irv-feature-title">{feature.title}</h3>
                            <p className="irv-feature-desc">{feature.desc}</p>
                        </div>
                        <div className="irv-feature-visual">
                            <PhoneFrame src={feature.image} alt={feature.alt} onLight />
                        </div>
                    </motion.div>
                ))}
            </div>
        </section>
    );
};
