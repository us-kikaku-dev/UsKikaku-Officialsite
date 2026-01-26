import React from 'react';
import { Services } from '../components/Services';
import { ServiceFlow } from '../components/ServiceFlow';
import { FAQ } from '../components/FAQ';
import { ServiceHeroFinalV4 } from '../components/ServiceHeroFinalV4';
import { ServiceApproach } from '../components/ServiceApproach';
import { ServiceReviewLPV3 } from '../components/ServiceReviewLPV3';

export const ServicePage = () => {
    return (
        <div className="bg-white min-h-screen">
            <ServiceHeroFinalV4 />
            <ServiceApproach />

            <div className="pt-24 pb-24">
                <Services />
                <ServiceFlow />
                <ServiceReviewLPV3 />
                <FAQ />
            </div>
        </div>
    );
};


