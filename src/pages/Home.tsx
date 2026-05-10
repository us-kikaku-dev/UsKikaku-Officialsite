import { Helmet } from 'react-helmet-async';
import { Hero } from '../components/Hero';
import { LatestNews } from '../components/LatestNews';
import { Message } from '../components/Message';
import { MediaSection } from '../components/MediaSection';
import { ConsultingService } from '../components/ConsultingService';
import { OkkakeProduct } from '../components/OkkakeProduct';
import { BlogSection } from '../components/BlogSection';

export const Home = () => {
  return (
    <>
      <Helmet>
        <title>株式会社U's企画 | IR Consulting Firm</title>
        <meta
          name="description"
          content="株式会社U's企画は、戦略設計から開示資料作成、投資家コミュニケーションまで一気通貫で支援するIRコンサルティングファームです。企業の「顔」となる決算説明資料のクオリティを高め、企業価値の向上に貢献します。"
        />
        <link rel="canonical" href="https://www.us-kikaku.com/" />
      </Helmet>
      <Hero />
      <LatestNews />
      <Message />
      <MediaSection />
      <ConsultingService />
      <OkkakeProduct />
      <BlogSection />
    </>
  );
};
