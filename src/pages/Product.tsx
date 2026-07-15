import React from 'react';
import { Helmet } from 'react-helmet-async';
import { IRVoiceHero } from '../components/IRVoice/IRVoiceHero';
import { IRVoiceFeatures } from '../components/IRVoice/IRVoiceFeatures';
import { IRVoiceForBusiness } from '../components/IRVoice/IRVoiceForBusiness';
import { IRVoiceFAQ } from '../components/IRVoice/IRVoiceFAQ';

/**
 * プロダクト紹介ページ。
 * 公式LPの完全な複製は作らず、要約に留めて詳細は公式LPへ送る方針。
 */
export const Product = () => {
    return (
        <div className="bg-white min-h-screen">
            <Helmet>
                <title>プロダクト IR Voice | 株式会社U's企画</title>
                <meta
                    name="description"
                    content="株式会社U's企画が開発するIRフィードアプリ「IR Voice」のご紹介。開示・動画・イベントなど散らばるIR情報をひとつのフィードにまとめ、企業のIRご担当者様には投資家の反応が見えるダッシュボードを提供します。近日公開予定。"
                />
                <link rel="canonical" href="https://us-kikaku.com/product" />
            </Helmet>
            <IRVoiceHero />
            <IRVoiceFeatures />
            <IRVoiceForBusiness />
            <IRVoiceFAQ />
        </div>
    );
};
