import React from 'react';
import { motion } from 'motion/react';
import { FileText, BookOpen, Video, Users, Globe, Handshake } from 'lucide-react';

const services = [
  {
    icon: FileText,
    title: '決算説明資料作成',
    description: 'ストーリー構成の立案からデザインまで、投資家の意思決定に資する、論理的かつ魅力的な決算説明資料を作成します。',
    delay: 0
  },
  {
    icon: BookOpen,
    title: '統合報告書 / レポート',
    description: '財務・非財務情報を高度に統合。中長期的な価値創造ストーリーを投資家に伝える高品質なレポートを制作します。',
    delay: 0.1
  },
  {
    icon: Video,
    title: 'IR関連動画作成',
    description: '決算説明会やトップインタビューなど、視覚と聴覚に訴える映像コンテンツで、より深い理解を促進します。',
    delay: 0.2
  },
  {
    icon: Users,
    title: 'IR担当者向け研修',
    description: 'IR実務の基礎から、最新の開示トレンド、機関投資家対応まで。社内リソースの専門性を高める実践的研修。',
    delay: 0.3
  },
  {
    icon: Globe,
    title: 'コーポレートサイト制作',
    description: 'ステークホルダーとのデジタル接点を最適化。信頼性を高め、必要な情報へ即座にアクセスできるWebサイトを構築。',
    delay: 0.4
  },
  {
    icon: Handshake,
    title: '長期伴走支援',
    description: '単なる制作代行に留まらず、年間のIR戦略立案から実行、フィードバックまで、パートナーとして長期的にコミットします。',
    delay: 0.5
  }
];

export const Services = () => {
  return (
    <section id="service" className="py-24 bg-plus-pattern relative">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: 'easeOut' }}
          className="text-center mb-20"
        >
          <span className="text-[#D4AF37] tracking-widest text-sm uppercase block mb-2">Our Services</span>
          <h2 className="serif-text text-3xl md:text-4xl text-white">事業内容</h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, ease: 'easeOut', delay: service.delay }}
              className="group bg-[#050A14]/50 backdrop-blur-md p-8 border border-white/10 shadow-lg hover:bg-[#050A14]/70 hover:border-[#D4AF37]/50 transition-all duration-500"
            >
              <div className="w-12 h-12 border border-[#D4AF37]/30 rounded-none flex items-center justify-center text-[#D4AF37] mb-6 transition-colors duration-300">
                <service.icon className="w-6 h-6" />
              </div>
              <h3 className="serif-text text-xl text-white mb-4 group-hover:text-[#F3E5AB] transition-colors">
                {service.title}
              </h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                {service.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
