import React, { useState } from 'react';
import { Hero } from '../components/Hero';
import { LatestNews } from '../components/LatestNews';
import { Message } from '../components/Message';
import { ConsultingService } from '../components/ConsultingService';
import { BlogSection } from '../components/BlogSection';
import { PrivacyModal } from '../components/PrivacyModal';
import { TermsModal } from '../components/TermsModal';

export const Home = () => {
  const [isPrivacyOpen, setIsPrivacyOpen] = useState(false);
  const [isTermsOpen, setIsTermsOpen] = useState(false);

  // Helper to pass down to Footer/Layout if needed, or keeping page-specific modals here?
  // Looking at original App.tsx, modals were at root. 
  // For now, let's keep them in Home if they are only triggered from Footer which might be global.
  // Actually, standard practice for global footer is to be in the Layout.
  // But wait, the original App.tsx had Footer. 
  // Let's first reproduce the content of App.Main in Home, and handle Layout in App.tsx.

  return (
    <>
      <Hero />
      <LatestNews />
      <Message />
      <ConsultingService />
      <BlogSection />

      {/* 
        Modals are currently managed here. 
        If Footer is moved to a global Layout, these states might need to be lifted up or managed via Context/Event.
        For Step 1, let's assume Footer is part of the Layout in App.tsx, 
        but we need a way to open these modals from the Footer.
        
        However, to minimize complexity in Step 1, I will keep the page structure simple.
        If the Footer is global, it should be in App.tsx (or a Layout component).
        The original App.tsx had: Navbar, Main, Footer, Modals.
        
        So Home component should only contain the "Main" part.
      */}
    </>
  );
};
