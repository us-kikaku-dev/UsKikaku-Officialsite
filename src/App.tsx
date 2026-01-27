import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { PrivacyModal } from './components/PrivacyModal';
import { TermsModal } from './components/TermsModal';
import { ScrollToTop } from './components/ScrollToTop';
import { Home } from './pages/Home';
import { NewsList } from './pages/NewsList';
import { NewsDetail } from './pages/NewsDetail';
import { BlogList } from './pages/BlogList';
import { BlogDetail } from './pages/BlogDetail';
import { Company } from './pages/Company';
import { ServicePage } from './pages/Service';
import { Product } from './pages/Product';

export default function App() {
  const [isPrivacyOpen, setIsPrivacyOpen] = useState(false);
  const [isTermsOpen, setIsTermsOpen] = useState(false);

  return (
    <Router>
      <ScrollToTop />
      <div className="bg-white text-[#374151] font-sans antialiased flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/company" element={<Company />} />
            <Route path="/service" element={<ServicePage />} />
            <Route path="/product" element={<Product />} />
            <Route path="/news" element={<NewsList />} />
            <Route path="/news/:id" element={<NewsDetail />} />
            <Route path="/blog" element={<BlogList />} />
            <Route path="/blog/:id" element={<BlogDetail />} />
          </Routes>
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
    </Router>
  );
}
