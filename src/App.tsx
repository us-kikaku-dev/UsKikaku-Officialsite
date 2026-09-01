import React, { useState, Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { MotionConfig } from 'motion/react';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { ScrollToTop } from './components/ScrollToTop';

// 法務モーダルは本文が長くRadix Dialogも同梱されるため、開くまで読み込まない
const PrivacyModal = lazy(() => import('./components/PrivacyModal').then(module => ({ default: module.PrivacyModal })));
const TermsModal = lazy(() => import('./components/TermsModal').then(module => ({ default: module.TermsModal })));

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
  // 一度開いたらマウントを維持する（閉じるアニメーションを壊さないため、
  // isOpenでの条件付きアンマウントはしない）
  const [privacyMounted, setPrivacyMounted] = useState(false);
  const [termsMounted, setTermsMounted] = useState(false);

  return (
    // reducedMotion="user": OSの「動きを減らす」設定時にMotionのtransform系アニメーションを自動で抑制する
    <MotionConfig reducedMotion="user">
    <Router>
      <ScrollToTop />
      <div className="bg-white text-[#374151] font-sans antialiased flex flex-col min-h-screen">
        {/* キーボード利用者向け: フォーカス時のみ表示されるスキップリンク */}
        <a href="#main-content" className="skip-link">本文へスキップ</a>
        <Navbar />
        <main id="main-content" tabIndex={-1} className="flex-grow">
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
          onPrivacyClick={() => { setPrivacyMounted(true); setIsPrivacyOpen(true); }}
          onTermsClick={() => { setTermsMounted(true); setIsTermsOpen(true); }}
        />

        {privacyMounted && (
          <Suspense fallback={null}>
            <PrivacyModal
              isOpen={isPrivacyOpen}
              onClose={() => setIsPrivacyOpen(false)}
            />
          </Suspense>
        )}
        {termsMounted && (
          <Suspense fallback={null}>
            <TermsModal
              isOpen={isTermsOpen}
              onClose={() => setIsTermsOpen(false)}
            />
          </Suspense>
        )}
      </div>
    </Router>
    </MotionConfig>
  );
}
