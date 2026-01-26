import React from 'react';
import { ProductHero } from '../components/ProductHero';
import { AboutOkkake } from '../components/AboutOkkake';


export const Product = () => {
    return (
        <div className="bg-white min-h-screen">
            <ProductHero />
            <AboutOkkake />
        </div>
    );
};
