import React from 'react';
import { Helmet } from 'react-helmet-async';
import { ProductHero } from '../components/ProductHero';
import { AboutOkkake } from '../components/AboutOkkake';

import { ProductPhilosophy } from '../components/ProductPhilosophy';

export const Product = () => {
    return (
        <div className="bg-white min-h-screen">
            <Helmet>
                <title>プロダクト OKKAKE | 株式会社U's企画</title>
                <meta
                    name="description"
                    content="株式会社U's企画が提供する自社プロダクト「OKKAKE」のご紹介。プロダクトの思想と特徴、提供価値をご覧いただけます。"
                />
                <link rel="canonical" href="https://www.us-kikaku.com/product" />
            </Helmet>
            <ProductHero />
            <ProductPhilosophy />
            <AboutOkkake />
        </div>
    );
};
