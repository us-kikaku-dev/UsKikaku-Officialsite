import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { Message } from './components/Message';
import { Services } from './components/Services';
import { ServiceFlow } from './components/ServiceFlow';
import { Members } from './components/Members';
import { FAQ } from './components/FAQ';
import { Footer } from './components/Footer';
import { PrivacyModal } from './components/PrivacyModal';
import { TermsModal } from './components/TermsModal';

export default function App() {
  const [isPrivacyOpen, setIsPrivacyOpen] = useState(false);
  const [isTermsOpen, setIsTermsOpen] = useState(false);

  return (
    <div className="bg-white text-[#374151] font-sans antialiased">
      <Navbar />
      <main>
        <Hero />
        <Message />
        <Services />
        <ServiceFlow />
        <Members />
        <FAQ />
      </main>
      <Footer 
        onPrivacyClick={() => setIsPrivacyOpen(true)}
        onTermsClick={() => setIsTermsOpen(true)}
      />
      
      <PrivacyModal 
        isOpen={isPrivacyOpen} 
        onClose={() => setIsPrivacyOpen(false)} 
      />
      <TermsModal 
        isOpen={isTermsOpen} 
        onClose={() => setIsTermsOpen(false)} 
      />
    </div>
  );
}
