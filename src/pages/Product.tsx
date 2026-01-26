import React from 'react';
import { ProductHero } from '../components/ProductHero';
import { AboutOkkake } from '../components/AboutOkkake';

import { ProductPhilosophy } from '../components/ProductPhilosophy';

export const Product = () => {
    return (
        <div className="bg-white min-h-screen">
            <ProductHero />
            <ProductPhilosophy />
            <AboutOkkake />
        </div>
    );
};
