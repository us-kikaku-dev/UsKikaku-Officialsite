import React from 'react';
import { motion } from 'motion/react';
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from '../../components/ui/accordion';
import './IRVoicePage.css';

const faqData = [
    {
        question: '利用は無料ですか？',
        answer: 'はい、投資家向けアプリは無料でご利用いただけます。',
    },
    {
        question: 'どの企業の情報が見られますか？',
        answer: '上場企業の適時開示は自動で集約されます。参加企業は動画・記事・イベント案内なども配信します。対応企業は順次拡大予定です。',
    },
    {
        question: '通知が多くなりませんか？',
        answer: '通知はフォローした企業の新着のみ。カテゴリごとにオン/オフを細かく設定できます。',
    },
    {
        question: '証券口座の連携は必要ですか？',
        answer: '不要です。口座情報や保有銘柄を登録しなくても、すべての機能をご利用いただけます。',
    },
];

export const IRVoiceFAQ = () => {
    return (
        <section className="irv-faq">
            <div className="irv-container">
                <motion.div
                    className="irv-section-head"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                >
                    <span className="irv-eyebrow">FAQ</span>
                    <h2 className="irv-heading irv-section-title">よくあるご質問</h2>
                </motion.div>

                <motion.div
                    className="irv-faq-inner"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.15 }}
                >
                    <Accordion type="single" collapsible className="w-full">
                        {faqData.map((item, index) => (
                            <AccordionItem
                                key={item.question}
                                value={`item-${index}`}
                                className="border-b border-gray-200 last:border-0"
                            >
                                <AccordionTrigger className="py-6 hover:no-underline group text-left">
                                    <div className="flex items-start gap-4">
                                        <span className="text-[#0d9488] font-bold text-lg leading-snug shrink-0">
                                            Q.
                                        </span>
                                        <span className="text-[#17272e] font-bold text-base md:text-lg leading-snug group-hover:text-[#0d9488] transition-colors">
                                            {item.question}
                                        </span>
                                    </div>
                                </AccordionTrigger>
                                <AccordionContent className="pb-8 pt-2">
                                    <div className="flex items-start gap-4">
                                        <span className="text-[#0d9488] font-bold text-lg leading-relaxed shrink-0">
                                            A.
                                        </span>
                                        <p className="text-[#3d4d54] leading-relaxed text-base">
                                            {item.answer}
                                        </p>
                                    </div>
                                </AccordionContent>
                            </AccordionItem>
                        ))}
                    </Accordion>
                </motion.div>
            </div>
        </section>
    );
};
