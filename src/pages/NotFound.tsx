import React from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'motion/react';

export const NotFound = () => {
    return (
        <div className="min-h-screen bg-white flex flex-col items-center justify-center text-[#050A14] px-4 pt-48 pb-40">
            <Helmet>
                <title>ページが見つかりません | 株式会社U's企画</title>
                <meta
                    name="description"
                    content="お探しのページは見つかりませんでした。URLが変更されたか、削除された可能性があります。"
                />
                <meta name="robots" content="noindex" />
            </Helmet>
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="text-center"
            >
                <span className="text-[#D4AF37] text-lg font-medium tracking-widest block mb-4">
                    404 NOT FOUND
                </span>

                <h1 className="text-4xl md:text-6xl font-serif font-bold mb-8 leading-tight">
                    お探しのページは<br />
                    見つかりませんでした
                </h1>

                <p className="text-gray-600 mb-12 leading-relaxed max-w-md mx-auto">
                    申し訳ありませんが、お探しのページは削除されたか、
                    URLが変更された可能性があります。
                </p>
            </motion.div>
        </div>
    );
};
