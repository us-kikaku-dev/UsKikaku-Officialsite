import { motion } from 'motion/react';

export const Step3Complete = () => {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="text-center py-20"
        >
            <h3 className="serif-text text-2xl md:text-3xl text-[#333] mb-6 font-bold" style={{ fontSize: '24px', marginBottom: '24px' }}>送信完了いたしました</h3>
            <p className="text-[#666] leading-relaxed mb-16 tracking-wide" style={{ fontSize: '15px', lineHeight: '1.8', marginBottom: '60px' }}>
                お問い合わせありがとうございます。<br />
                担当者より2〜3営業日以内にご連絡させていただきます。
            </p>
            <a href="/" className="force-link-btn-style">
                トップページへ戻る
            </a>
        </motion.div>
    );
};
