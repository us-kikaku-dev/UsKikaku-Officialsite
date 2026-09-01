import React from 'react';
import { Seo } from '../components/Seo';
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
            <Seo path="/product" />
            <IRVoiceHero />
            <IRVoiceFeatures />
            <IRVoiceForBusiness />
            <IRVoiceFAQ />
        </div>
    );
};
