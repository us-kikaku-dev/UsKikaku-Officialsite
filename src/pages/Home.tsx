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
