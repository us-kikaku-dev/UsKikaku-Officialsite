import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';

export const Members = () => {
  return (
    <section id="member" className="py-24 bg-white">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: 'easeOut' }}
          className="text-center mb-20"
        >
          <span className="text-[#998438] tracking-widest text-sm uppercase block mb-2">Board Members</span>
          <h2 className="serif-text text-3xl md:text-4xl text-[#050A14]">役員紹介</h2>
        </motion.div>

        <div className="space-y-16">
          {/* CEO */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: 'easeOut' }}
            className="group"
          >
            <div className="border-l-4 border-[#D4AF37] pl-8 md:pl-12 py-2 hover:bg-gray-50 transition-colors duration-500 rounded-r-lg">
              <div className="flex flex-col md:flex-row md:items-end gap-2 md:gap-6 mb-6">
                <h3 className="serif-text text-3xl text-[#050A14]">石原 優多</h3>
                <span className="text-[#998438] tracking-widest text-sm uppercase pb-1">Representative Director / CEO</span>
              </div>
              <div className="text-gray-600 font-light leading-relaxed text-justify max-w-3xl">
                1992年生まれ。東京理科大学理学部を卒業後、SMBC日興証券に新卒入社。プライベートバンキング部にて上場企業オーナーを起点とした資本政策の立案に携わり、その後、公開引受部にて新規上場企業のコンサルティング業務に従事。これらの経験を経て、株式会社U’s企画を創業。
              </div>
            </div>
          </motion.div>

          {/* Partner */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: 'easeOut', delay: 0.2 }}
            className="group"
          >
            <div className="border-l-4 border-[#D4AF37] pl-8 md:pl-12 py-2 hover:bg-gray-50 transition-colors duration-500 rounded-r-lg">
              <div className="flex flex-col md:flex-row md:items-end gap-2 md:gap-6 mb-6">
                <h3 className="serif-text text-3xl text-[#050A14]">田代 昌之</h3>
                <span className="text-[#998438] tracking-widest text-sm uppercase pb-1">Executive Officer / Head of Sales</span>
              </div>
              <div className="text-gray-600 font-light leading-relaxed text-justify max-w-3xl mb-4">
                金融文筆家。北海道出身。1979年生まれ。中央大学文学部史学科日本史学科卒業。新光証券（現みずほ証券）やシティバンクなどを経て、金融情報会社に入社。アナリスト業務やコンプライアンス業務、グループの暗号資産交換業者や証券会社の経営に従事。IFTA国際検定テクニカルアナリスト3次資格（MFTA®）を保有。酒と古地図と歴史をこよなく愛する。ラジオNIKKEI マーケット・テラス コメンテーターを務めるほか、楽天証券投資情報メディアトウシルやAllAboutに記事を掲載。
              </div>

              <div className="max-w-3xl mt-4">
                <Link
                  to="/tashiro"
                  className="inline-flex items-center gap-2 text-sm font-medium text-[#0B1C3D] hover:text-[#998438] transition-colors border-b border-transparent hover:border-[#998438]"
                >
                  プロフィールを見る →
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
