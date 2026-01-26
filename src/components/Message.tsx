import React from 'react';
import { motion } from 'motion/react';

export const Message = () => {
  return (
    <section id="message" className="relative" style={{ backgroundColor: '#FDFBF7', padding: '200px 0' }}>
      {/* 
         BACKGROUND COLOR: #FDFBF7 (Explicitly set as requested) 
         PADDING: 120px top/bottom (Increased from 60px/100px)
      */}

      <div className="max-w-4xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="flex flex-col items-center"
        >
          {/* Header */}
          <div className="text-center" style={{ marginBottom: '60px' }}>
            <span className="text-[#998438] tracking-widest text-sm uppercase block mb-5">
              MESSAGE
            </span>
            <h2 className="text-4xl md:text-5xl serif-text font-bold text-[#0F172A] tracking-wider leading-tight">
              企業の「顔」を、<br className="md:hidden" />もっと伝わる形に。
            </h2>
          </div>

          {/* 
             BODY TEXT WITH DROP CAP
             Layout:
             - Container: Centered (via flex-col items-center on parent)
             - Text Alignment: Justify (to cleanly wrap around drop cap) or Left
             - Width: max-w-2xl
             
             DROP CAP:
             - Char: "決"
             - Color: #C0A060 (As requested)
             - Size: text-7xl md:text-8xl (~3-4 lines height)
             - Font: Serif
             - Float: Left
          */}
          <div className="w-full max-w-2xl text-[#1a1a40]">
            <p className="font-medium leading-loose text-base md:text-lg text-justify">
              <span
                className="font-serif"
                style={{
                  float: 'left',
                  fontSize: '4.5rem', // ~text-7xl
                  lineHeight: '0.8',
                  marginRight: '1rem',
                  marginTop: '-6px',
                  marginBottom: '-10px',
                  color: '#C0A060'
                }}
                aria-hidden="true"
              >
                決
              </span>
              算説明資料は、投資家だけでなく、取引先や採用応募者など多くのステークホルダーが目にする、まさに企業の「顔」とも言える重要資料です。
              私たちは、そのクオリティを高めることこそが、企業ブランドの信頼と価値の向上に直結すると確信しています。
              <br /><br />
              一方で、限られたリソースでの資料作成は大きな負担となりがちです。
              実務を知り尽くした私たちが、貴社の「本質」を引き出し、市場が求める形へと昇華させます。
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
