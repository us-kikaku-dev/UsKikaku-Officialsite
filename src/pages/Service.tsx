import React from 'react';

import { Services } from '../components/Services';
import { ServiceFlow } from '../components/ServiceFlow';
import { FAQ } from '../components/FAQ';
import { ServiceTopHero } from '../components/ServiceTopHero';

export const Service = () => {
    return (
        <div className="bg-white min-h-screen">
            <ServiceTopHero />

            <div className="pt-24 pb-24">
                {/* Moved content from Home */}
                <Services />
                <ServiceFlow />
                <FAQ />
            </div>
        </div>
    );
};


