import React from 'react';
import { motion } from 'motion/react';

export const Message = () => {
  return (
    <section id="message" className="py-24 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="lg:grid lg:grid-cols-2 lg:gap-16 items-center">
          {/* Image Side */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: 'easeOut' }}
            className="relative mb-12 lg:mb-0 flex justify-center lg:justify-end"
          >
            <div className="relative max-w-md w-full">
              <div className="absolute -top-4 -left-4 w-24 h-24 border-t border-l border-[#998438]/30"></div>
              <img
                src="https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?q=80&w=2070&auto=format&fit=crop"
                alt="Stock Market Data"
                className="w-full h-auto object-cover shadow-2xl grayscale hover:grayscale-0 transition-all duration-700"
              />
              <div className="absolute -bottom-4 -right-4 w-24 h-24 border-b border-r border-[#998438]/30"></div>
            </div>
          </motion.div>

          {/* Text Side */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: 'easeOut', delay: 0.2 }}
            className="lg:pl-8"
          >
            <h2 className="serif-text text-3xl md:text-4xl lg:text-5xl font-medium text-[#050A14] leading-snug mb-8">
              企業の「顔」を、<br />もっと伝わるカタチに。
            </h2>
            <div className="space-y-6 text-gray-600 leading-relaxed font-light text-justify">
              <p>
                <span className="drop-cap text-[#D4AF37]">決</span>
                算説明資料は、投資家だけでなく、取引先や採用応募者など多くのステークホルダーが目にする、まさに企業の「顔」とも言える重要資料です。
                私たちは、そのクオリティを高めることこそが、企業ブランドの信頼と価値の向上に直結すると確信しています。
              </p>
              <p>
                一方で、限られたリソースでの資料作成は大きな負担となりがちです。<br />
                実務を知り尽くした私たちが、貴社の「本質」を引き出し、市場が求める形へと昇華させます。
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
