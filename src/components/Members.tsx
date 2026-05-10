import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import './LatestNews.css';

export const Members = () => {
  // 共通スタイル
  const bodyStyle = { lineHeight: 2.15, letterSpacing: '0.05em' };

  return (
    <section id="member" className="py-24 bg-white">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* セクションヘッダー */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: 'easeOut' }}
          className="text-center mb-20"
        >
          <span className="text-[#998438] tracking-widest text-sm uppercase block mb-2">
            Board Members
          </span>
          <h2 className="serif-text text-3xl md:text-4xl text-[#050A14]">
            役員紹介
          </h2>
        </motion.div>

        {/* 役員リスト：各役員の上下に薄いグレーの横線（インラインスタイルで確実に描画） */}
        <div>
          {/* CEO */}
          <motion.article
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: 'easeOut' }}
            style={{
              borderTop: '1px solid #E5E7EB',
              paddingTop: '4rem',
              paddingBottom: '4rem'
            }}
          >
            <h3 className="serif-text text-3xl md:text-4xl text-[#050A14] tracking-wider">
              石原 優多
            </h3>
            <span
              className="block text-[#998438] tracking-widest text-sm uppercase"
              style={{ marginTop: '1.75rem' }}
            >
              Representative Director / CEO
            </span>
            <div
              style={{
                width: '3rem',
                height: '1px',
                backgroundColor: '#D4AF37',
                marginTop: '1.5rem',
                marginBottom: '2rem'
              }}
            />
            <p
              className="font-medium text-base md:text-lg text-[#1a1a40] max-w-3xl"
              style={bodyStyle}
            >
              1992年生まれ。東京理科大学理学部を卒業後、SMBC日興証券に新卒入社。プライベートバンキング部にて上場企業オーナーを起点とした資本政策の立案に携わり、その後、公開引受部にて新規上場企業のコンサルティング業務に従事。これらの経験を経て、株式会社U’s企画を創業。
            </p>
          </motion.article>

          {/* Partner */}
          <motion.article
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: 'easeOut', delay: 0.2 }}
            style={{
              borderTop: '1px solid #E5E7EB',
              borderBottom: '1px solid #E5E7EB',
              paddingTop: '4rem',
              paddingBottom: '4rem'
            }}
          >
            <h3 className="serif-text text-3xl md:text-4xl text-[#050A14] tracking-wider">
              田代 昌之
            </h3>
            <span
              className="block text-[#998438] tracking-widest text-sm uppercase"
              style={{ marginTop: '1.75rem' }}
            >
              Executive Officer / Head of Sales
            </span>
            <div
              style={{
                width: '3rem',
                height: '1px',
                backgroundColor: '#D4AF37',
                marginTop: '1.5rem',
                marginBottom: '2rem'
              }}
            />
            <p
              className="font-medium text-base md:text-lg text-[#1a1a40] max-w-3xl"
              style={bodyStyle}
            >
              金融文筆家。北海道出身。1979年生まれ。中央大学文学部史学科日本史学科卒業。新光証券（現みずほ証券）やシティバンクなどを経て、金融情報会社に入社。アナリスト業務やコンプライアンス業務、グループの暗号資産交換業者や証券会社の経営に従事。IFTA国際検定テクニカルアナリスト3次資格（MFTA®）を保有。酒と古地図と歴史をこよなく愛する。ラジオNIKKEI マーケット・テラス コメンテーターを務めるほか、楽天証券投資情報メディアトウシルやAllAboutに記事を掲載。
            </p>
            <div className="mt-16 md:mt-20 flex justify-center">
              <Link
                to="/tashiro"
                className="inline-block tracking-widest text-sm font-medium latest-news-btn"
              >
                プロフィールを見る
              </Link>
            </div>
          </motion.article>
        </div>
      </div>
    </section>
  );
};
