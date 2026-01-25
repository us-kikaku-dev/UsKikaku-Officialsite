import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronDown } from 'lucide-react';

export const Members = () => {
  const [isActivitiesOpen, setIsActivitiesOpen] = useState(false);

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
                <span className="text-[#998438] tracking-widest text-sm uppercase pb-1">Advisory Partner</span>
              </div>
              <div className="text-gray-600 font-light leading-relaxed text-justify max-w-3xl mb-4">
                金融文筆家。北海道出身。1979年生まれ。中央大学文学部史学科日本史学科卒業。新光証券（現みずほ証券）やシティバンクなどを経て、金融情報会社に入社。アナリスト業務やコンプライアンス業務、グループの暗号資産交換業者や証券会社の経営に従事。IFTA国際検定テクニカルアナリスト3次資格（MFTA®）を保有。酒と古地図と歴史をこよなく愛する。ラジオNIKKEIのパーソナリティを務めるほか、楽天証券投資情報メディアトウシルやAllAboutに記事を掲載。
              </div>

              {/* Activities Toggle */}
              <div className="max-w-3xl">
                <button
                  onClick={() => setIsActivitiesOpen(!isActivitiesOpen)}
                  className="flex items-center gap-2 text-[#0B1C3D] hover:text-[#998438] transition-colors text-sm font-medium group/btn outline-none"
                >
                  <span className="border-b border-transparent group-hover/btn:border-[#998438] transition-all">
                    {isActivitiesOpen ? '活動実績を閉じる' : '活動実績を見る'}
                  </span>
                  <ChevronDown 
                    className={`w-4 h-4 transition-transform duration-300 ${isActivitiesOpen ? 'rotate-180' : ''}`} 
                  />
                </button>

                <AnimatePresence>
                  {isActivitiesOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: 'easeInOut' }}
                      className="overflow-hidden"
                    >
                      <div className="pt-6 space-y-5">
                        <div className="text-sm text-gray-600 leading-relaxed">
                          <p className="font-medium text-[#0B1C3D] mb-1">ラジオNIKKEI「マーケットプレス」</p>
                          <p className="mb-1">毎週火・水 12:30–14:30 に出演し、市場動向や企業分析を解説しています。</p>
                          <a 
                            href="https://www.radionikkei.jp/personality/personality/masayukitashiro.html" 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="text-[#D4AF37] hover:text-[#B89530] hover:underline transition-colors inline-flex items-center text-xs mt-0.5"
                          >
                            → 番組ページを見る
                          </a>
                        </div>
                        
                        <div className="text-sm text-gray-600 leading-relaxed">
                          <p className="font-medium text-[#0B1C3D] mb-1">楽天証券トウシル</p>
                          <p className="mb-1">「田代くん注目！気になる5銘柄」を連載し、決算ポイントやKPI分析を発信しています。</p>
                          <a 
                            href="https://media.rakuten-sec.net/list/authors/article?author_name=%E7%94%B0%E4%BB%A3+%E6%98%8C%E4%B9%8B" 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="text-[#D4AF37] hover:text-[#B89530] hover:underline transition-colors inline-flex items-center text-xs mt-0.5"
                          >
                            → 連載を見る
                          </a>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
