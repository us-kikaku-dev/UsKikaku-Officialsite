import React from 'react';
import { Seo } from '../components/common/Seo';
import { Services } from '../features/service/Services';
import { ServiceFlow } from '../features/service/ServiceFlow';
import { FAQ } from '../features/service/FAQ';
import { ServiceHero } from '../features/service/ServiceHero';
import { ServiceApproach } from '../features/service/ServiceApproach';

export const ServicePage = () => {
    return (
        <div className="bg-white min-h-screen">
            <Seo path="/service" />
            <ServiceHero />
            <ServiceApproach />

            <div className="pt-24 pb-24">
                <Services />
                <ServiceFlow />
                <FAQ />
            </div>
        </div>
    );
};


