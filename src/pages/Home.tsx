import { Seo } from '../components/common/Seo';
import { Hero } from '../features/home/Hero';
import { LatestNews } from '../features/home/LatestNews';
import { Message } from '../features/home/Message';
import { MediaSection } from '../features/home/MediaSection';
import { ConsultingService } from '../features/home/ConsultingService';
import { IRVoiceProduct } from '../features/ir-voice/IRVoiceProduct';
import { BlogSection } from '../features/home/BlogSection';

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
