import React from 'react';
import { motion } from 'motion/react';

const steps = [
  {
    step: 'STEP 1',
    title: 'インタビュー',
    duration: '（約1ヶ月）',
    description: '投資家に貴社の事業価値が正しく伝わるよう、経営陣・事業責任者の皆様へ入念なインタビューを実施します。\n戦略・KPI・競争優位性など、資料構成の基盤となる情報を深く理解します。'
  },
  {
    step: 'STEP 2',
    title: '資料作成',
    duration: '（約1ヶ月）',
    description: 'ヒアリング内容を踏まえ、開示方針や投資家目線を意識した資料を作成します。\n開示前の決算短信・業績速報をご共有いただければ、最新数値への差し替えにも対応します。'
  },
  {
    step: 'STEP 3',
    title: '内容確認・フィードバック',
    duration: '',
    description: '作成プロセスと並行し、随時ドラフトをご共有。\nご担当者様と連携しながら、スピーディにブラッシュアップを進めます。'
  },
  {
    step: 'STEP 4',
    title: '納品（PowerPoint形式）',
    duration: '',
    description: '最終版をPowerPoint形式で納品します。\n社内での再編集や今後の開示更新にも柔軟にご活用いただけます。'
  }
];

export const ServiceFlow = () => {
  return (
    <section id="service-deck-flow" className="py-24 bg-[#F9FAFB] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-20"
        >
            <span className="text-[#998438] tracking-widest text-sm uppercase block mb-2">Process</span>
            <h2 className="serif-text text-3xl md:text-4xl text-[#050A14] mb-6 tracking-wide">
                決算説明資料作成の流れ
            </h2>
            <p className="text-gray-600 max-w-3xl mx-auto leading-relaxed">
                通常、全工程で約3ヶ月ほどお時間をいただきます。
            </p>
        </motion.div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {steps.map((item, index) => (
                <div key={index} className="relative group">
                    {/* Connector Arrow for Desktop - REMOVED */}

                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: index * 0.15 }}
                        className="h-full bg-white p-8 rounded-lg shadow-sm hover:shadow-xl transition-all duration-500 border-t-2 border-transparent hover:border-[#D4AF37] relative overflow-hidden group-hover:-translate-y-1"
                    >
                        {/* Watermark Number */}
                        <div className="absolute -right-6 -top-6 text-[8rem] font-serif font-bold text-[#0B1C3D] opacity-[0.03] select-none pointer-events-none group-hover:opacity-[0.06] transition-opacity duration-500">
                            {index + 1}
                        </div>

                        {/* Step Label */}
                        <div className="flex items-center gap-3 mb-5 relative z-10">
                            <span className="text-[#D4AF37] font-serif text-sm font-bold tracking-widest uppercase border-b border-[#D4AF37] pb-1">
                                {item.step}
                            </span>
                        </div>

                        {/* Content */}
                        <div className="relative z-10">
                            <h3 className="serif-text text-xl text-[#0B1C3D] font-bold mb-2 min-h-[3.5rem] flex items-start">
                                {item.title}
                            </h3>
                            
                            <div className="mb-4 min-h-[1.5rem]">
                                {item.duration && (
                                    <p className="text-sm text-[#D4AF37] font-medium">
                                        {item.duration}
                                    </p>
                                )}
                            </div>
                            
                            <div className="pt-5 border-t border-gray-100">
                                <p className="text-sm text-gray-600 leading-7 whitespace-pre-line text-justify">
                                    {item.description}
                                </p>
                            </div>
                        </div>
                    </motion.div>
                </div>
            ))}
        </div>
      </div>
    </section>
  );
};
