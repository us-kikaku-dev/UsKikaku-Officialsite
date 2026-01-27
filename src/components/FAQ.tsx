import React from 'react';
import { motion } from 'motion/react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from './ui/accordion';

const faqData = [
  {
    question: '費用感を教えてください。',
    answer: '支援内容や対象範囲、業務量によって費用は異なるため、まずはお打ち合わせのうえ、個別にお見積もりを提出しています。初回のご相談では、現状や課題感をお伺いしながら、想定される支援内容と費用の目安をご説明いたしますので、お気軽にご相談ください。'
  },
  {
    question: '契約前にサンプルを確認することはできますか？',
    answer: 'ご依頼前に、数スライドのサンプル案を作成し、品質をご確認いただけます。'
  },
  {
    question: 'IR資料以外の資料作成も依頼できますか？',
    answer: 'IR資料に限らず、営業資料・サービス説明資料・社内向け資料など、幅広いドキュメント作成に対応しております。'
  },
  {
    question: '納品後に自社内でメンテナンスすることは可能ですか？',
    answer: 'PowerPoint形式で納品し、貴社内で編集しやすい構成・レイアウトに調整してお渡しいたします。'
  },
  {
    question: '毎四半期ごとに継続して依頼することはできますか？',
    answer: '初回作成時にヒアリングと設計を行い、その後は更新料のみで継続的な四半期アップデートに対応いたします。'
  },
  {
    question: '開示内容やKPI、方針が定まっていない段階でも相談できますか？',
    answer: '競合事例や業界標準を踏まえ、開示方針の整理、KPIの設計、ストーリー構築まで丁寧にサポートします。'
  },
  {
    question: '数値情報の取り扱いはどのように管理していますか？',
    answer: '開示前情報は秘密保持契約（NDA）を締結のうえ、厳格な管理体制で取り扱います。'
  },
  {
    question: '上場準備企業（IPO準備企業）でも依頼できますか？',
    answer: '上場準備企業向けの開示資料整備、想定質問の整理、ストーリー設計など、ステージに応じた支援を提供します。'
  },
  {
    question: '決算説明資料はどの程度の期間をかけて作成しますか？',
    answer: '通常は約3ヶ月（ヒアリング1ヶ月＋作成1ヶ月＋確認期間）を想定しています。決算スケジュールに合わせた短縮対応にも柔軟に対応可能です。'
  }
];

export const FAQ = () => {
  return (
    <section id="faq" className="py-24 bg-[#F9FAFB]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <span className="text-[#D4AF37] tracking-widest text-sm uppercase block mb-2 font-medium">
            Q&A
          </span>
          <h2 className="serif-text text-3xl md:text-4xl text-[#050A14] mb-6 tracking-wide">
            よくあるご質問
          </h2>
        </motion.div>

        {/* Accordion */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden"
        >
          <Accordion type="single" collapsible className="w-full">
            {faqData.map((item, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="border-b border-gray-100 last:border-0 px-6 md:px-10"
              >
                <AccordionTrigger className="py-6 hover:no-underline hover:bg-gray-50/50 transition-colors group">
                  <div className="flex items-start text-left gap-4">
                    <span className="text-[#D4AF37] font-serif font-bold text-lg leading-snug shrink-0">
                      Q{index + 1}.
                    </span>
                    <span className="text-[#0B1C3D] font-bold text-base md:text-lg leading-snug group-hover:text-[#D4AF37] transition-colors">
                      {item.question}
                    </span>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="pb-8 pt-2">
                  <div className="flex items-start gap-4">
                    <span className="text-[#D4AF37] font-serif font-bold text-lg leading-relaxed shrink-0 opacity-0 select-none">
                      A{index + 1}.
                    </span>
                    <div className="text-gray-600 leading-relaxed text-base -ml-14 md:-ml-16 w-full pl-14 md:pl-16">
                      {/* A. Icon visual alignment hack: keeping the indentation consistent */}
                      <span className="text-[#D4AF37] font-serif font-bold mr-3">A.</span>
                      {item.answer}
                    </div>
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
