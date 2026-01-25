import React from 'react';
import { motion } from 'framer-motion';
import { Services } from '../components/Services';
import { ServiceFlow } from '../components/ServiceFlow';
import { FAQ } from '../components/FAQ';

export const Service = () => {
    return (
        <div className="pt-32 pb-24 bg-white min-h-screen">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    <h1 className="text-4xl md:text-5xl serif-text font-bold text-[#050A14] mb-4 text-center">
                        SERVICE
                    </h1>
                    <p className="text-[#D4AF37] text-center font-medium tracking-widest mb-16">
                        サービス
                    </p>
                </motion.div>
            </div>

            {/* Moved content from Home */}
            <Services />
            <ServiceFlow />
            <FAQ />
        </div>
    );
};
