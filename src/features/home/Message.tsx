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
              資本市場の対話を、<br className="md:hidden" />もっとひらかれたものへ。
            </h2>
          </div>

          <div className="w-full max-w-2xl text-[#1a1a40]">
            <p
              className="font-medium text-base md:text-lg text-left"
              style={{ lineHeight: 2.15, letterSpacing: '0.05em' }}
            >
              <span className="md:font-serif md:float-left md:text-7xl md:leading-[0.8] md:mr-3 md:-mt-1.5 md:-mb-2.5 md:text-[#C0A060]">
                資
              </span>
              本市場は、企業と投資家、その背景にいるすべての人々が織りなす対話の場です。
              私たちは、IRコンサルティング、メディア、プロダクトという3つの事業を通じて、その対話をより透明で、より深く、より双方向なものへと進化させていきます。
            </p>
            <p
              className="font-medium text-base md:text-lg text-left mt-8 md:mt-10"
              style={{ lineHeight: 2.15, letterSpacing: '0.05em' }}
            >
              決算説明資料の制作支援にとどまらず、メディア『Capital Voice Japan』の運営、そして新たなIRプロダクトの開発。
              私たちは、これらすべての事業を通じて、資本市場の対話を、もっとひらかれたものへと進化させていきます。
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
