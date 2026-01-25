import React from 'react';
import { motion } from 'framer-motion';
import { Members } from '../components/Members';

export const Company = () => {
    return (
        <div className="pt-32 pb-24 bg-white min-h-screen">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    <h1 className="text-4xl md:text-5xl serif-text font-bold text-[#050A14] mb-4 text-center">
                        COMPANY
                    </h1>
                    <p className="text-[#D4AF37] text-center font-medium tracking-widest mb-16">
                        会社概要
                    </p>
                    <div className="text-center text-gray-500 mb-16">
                        Content coming soon...
                    </div>
                </motion.div>
            </div>

            <Members />
        </div>
    );
};
