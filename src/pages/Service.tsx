import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Services } from '../components/Services';
import { ServiceFlow } from '../components/ServiceFlow';
import { FAQ } from '../components/FAQ';
import { ServiceHeroFinalV4 } from '../components/ServiceHeroFinalV4';
import { ServiceApproach } from '../components/ServiceApproach';

export const ServicePage = () => {
    return (
        <div className="bg-white min-h-screen">
            <Helmet>
                <title>IRコンサルティングサービス | 株式会社U's企画</title>
                <meta
                    name="description"
                    content="IR戦略の設計から決算説明資料・統合報告書の作成支援、投資家コミュニケーションの高度化まで、上場・上場準備企業のIR活動を一貫してサポートします。"
                />
                <link rel="canonical" href="https://www.us-kikaku.com/service" />
            </Helmet>
            <ServiceHeroFinalV4 />
            <ServiceApproach />

            <div className="pt-24 pb-24">
                <Services />
                <ServiceFlow />
                <FAQ />
            </div>
        </div>
    );
};


