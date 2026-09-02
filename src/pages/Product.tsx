import React from 'react';
import { Seo } from '../components/common/Seo';
import { IRVoiceHero } from '../features/ir-voice/IRVoiceHero';
import { IRVoiceFeatures } from '../features/ir-voice/IRVoiceFeatures';
import { IRVoiceForBusiness } from '../features/ir-voice/IRVoiceForBusiness';
import { IRVoiceFAQ } from '../features/ir-voice/IRVoiceFAQ';

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
