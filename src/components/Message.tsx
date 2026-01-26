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
          {/* 
             DECORATIVE TEXT (ASHIRAI)
             Style: Matches LatestNews subtitle
             - Color: #D4AF37 (Gold from News/Members)
             - Size: text-sm
             - Spacing: tracking-widest
          */}
          <span className="block text-sm font-medium tracking-widest text-[#D4AF37] mb-6">
            MESSAGE
          </span>

          {/* 
             MAIN HEADLINE
             Style: Matches LatestNews "NEWS" title
             - Size: text-4xl md:text-5xl
             - Font: Serif (serif-text class)
             - Weight: Bold
             - Color: #1a1a40 (Dark Navy)
             - Alignment: Center
          */}
          <h2 className="text-4xl md:text-5xl serif-text font-bold tracking-wider text-[#1a1a40] mb-16 text-center leading-tight">
            企業の「顔」を、<br className="md:hidden" />もっと伝わるカタチに。
          </h2>

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
