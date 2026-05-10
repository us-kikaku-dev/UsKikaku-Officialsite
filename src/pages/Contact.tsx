import React from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'motion/react';
import { ContactForm } from '../components/ContactForm';

export const Contact = () => {
    return (
        <div className="bg-white min-h-screen font-sans">
            <Helmet>
                <title>お問い合わせ | 株式会社U's企画</title>
                <meta
                    name="description"
                    content="株式会社U's企画へのお問い合わせフォーム。IRコンサルティング、Capital Voice Japan、受託開発・Web制作のご相談などはこちらから。"
                />
                <link rel="canonical" href="https://www.us-kikaku.com/contact" />
            </Helmet>
            <div className="pt-48 pb-40 px-4 md:px-8 bg-[#F9FAFB]">
                <div className="max-w-4xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1, ease: 'easeOut', delay: 0.2 }}
                        className="text-center"
                        style={{ marginBottom: '60px' }}
                    >
                        <span className="text-[#D4AF37] tracking-widest text-sm uppercase block mb-3 font-medium">
                            CONTACT
                        </span>
                        <h1 className="serif-text text-3xl md:text-5xl text-[#050A14] mb-6 font-bold tracking-wider">
                            お問い合わせ
                        </h1>
                        <p className="text-gray-500 leading-relaxed max-w-xl mx-auto">
                            IRコンサルティング、制作のご依頼、採用についてなど、<br className="hidden md:block" />
                            お気軽にお問い合わせください。
                        </p>
                    </motion.div>

                    <ContactForm />

                </div>
            </div>
        </div>
    );
};
