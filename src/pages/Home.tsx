import { Seo } from '../components/Seo';
import { Hero } from '../components/Hero';
import { LatestNews } from '../components/LatestNews';
import { Message } from '../components/Message';
import { MediaSection } from '../components/MediaSection';
import { ConsultingService } from '../components/ConsultingService';
import { IRVoiceProduct } from '../components/IRVoiceProduct';
import { BlogSection } from '../components/BlogSection';

export const Home = () => {
  return (
    <>
      <Seo path="/" />
      <Hero />
      <LatestNews />
      <Message />
      <MediaSection />
      <ConsultingService />
      <IRVoiceProduct />
      <BlogSection />
    </>
  );
};
