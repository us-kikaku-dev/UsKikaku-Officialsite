import React from 'react';
import { motion } from 'motion/react';

export const ServiceApproach = () => {
    return (
        <section className="py-24 md:py-32 bg-white text-[#050A14] overflow-hidden relative" id="service-apporach">
            {/* Background Decor */}
            <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-gradient-to-b from-[#D4AF37]/20 to-transparent blur-3xl rounded-full translate-x-1/2 -translate-y-1/2 pointer-events-none"></div>

            <div className="max-w-4xl mx-auto px-6 relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="text-center mb-16"
                >
                    <span className="text-[#D4AF37] tracking-[0.2em] text-sm md:text-base uppercase block mb-4">
                        OUR APPROACH
                    </span>
                    <h2 className="serif-text text-3xl md:text-4xl text-[#050A14]">
                        IR支援に対する考え方
                    </h2>
                    <div className="w-16 h-[1px] bg-[#D4AF37] mx-auto mt-8"></div>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="space-y-8 text-base leading-relaxed tracking-wide text-gray-600"
                >
                    <p>
                        当社は、IR活動を単なる情報開示や資料作成とは捉えていません。<br />
                        企業の事業内容や業績の根幹となるKPIを深く理解した上で、その背景や意味合いまで整理し、投資家に正しく伝えることが重要だと考えています。
                    </p>
                    <p>
                        また、IRの開示物は投資家だけに向けたものではありません。<br />
                        決算説明資料や統合報告書、IR関連コンテンツは、採用を検討する方や取引先など、さまざまなステークホルダーの目にも触れる情報発信の場です。
                    </p>
                    <p>
                        そのため、当社では、正確性と分かりやすさの両立を重視するとともに、企業の価値や方向性が一貫して伝わるよう設計することで、コーポレートブランディングの観点からも意味のあるIR支援を行っています。
                    </p>
                </motion.div>
            </div>
        </section>
    );
};
