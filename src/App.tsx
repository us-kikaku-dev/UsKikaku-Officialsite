import React, { useState, Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { PrivacyModal } from './components/PrivacyModal';
import { TermsModal } from './components/TermsModal';
import { ScrollToTop } from './components/ScrollToTop';

// Lazy loading pages
const Home = lazy(() => import('./pages/Home').then(module => ({ default: module.Home })));
const NewsList = lazy(() => import('./pages/NewsList').then(module => ({ default: module.NewsList })));
const NewsDetail = lazy(() => import('./pages/NewsDetail').then(module => ({ default: module.NewsDetail })));
const BlogList = lazy(() => import('./pages/BlogList').then(module => ({ default: module.BlogList })));
const BlogDetail = lazy(() => import('./pages/BlogDetail').then(module => ({ default: module.BlogDetail })));
const Company = lazy(() => import('./pages/Company').then(module => ({ default: module.Company })));
const ServicePage = lazy(() => import('./pages/Service').then(module => ({ default: module.ServicePage })));
const Product = lazy(() => import('./pages/Product').then(module => ({ default: module.Product })));
const Contact = lazy(() => import('./pages/Contact').then(module => ({ default: module.Contact })));
const Tashiro = lazy(() => import('./pages/Tashiro').then(module => ({ default: module.Tashiro })));
const TashiroArticles = lazy(() => import('./pages/TashiroArticles').then(module => ({ default: module.TashiroArticles })));
const NotFound = lazy(() => import('./pages/NotFound').then(module => ({ default: module.NotFound })));

// Loading Component
const Loading = () => (
  <div className="flex items-center justify-center min-h-screen bg-[#050A14]">
    <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-[#D4AF37]"></div>
  </div>
);

export default function App() {
  const [isPrivacyOpen, setIsPrivacyOpen] = useState(false);
  const [isTermsOpen, setIsTermsOpen] = useState(false);

  return (
    <Router>
      <ScrollToTop />
      <div className="bg-white text-[#374151] font-sans antialiased flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow">
          <Suspense fallback={<Loading />}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/company" element={<Company />} />
              <Route path="/service" element={<ServicePage />} />
              <Route path="/product" element={<Product />} />
              <Route path="/news" element={<NewsList />} />
              <Route path="/news/:id" element={<NewsDetail />} />
              <Route path="/blog" element={<BlogList />} />
              <Route path="/blog/:id" element={<BlogDetail />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/tashiro" element={<Tashiro />} />
              <Route path="/tashiro/articles" element={<TashiroArticles />} />
              {/* 404 Route */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
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
