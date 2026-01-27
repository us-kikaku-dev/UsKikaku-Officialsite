import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

interface FooterProps {
  onPrivacyClick: () => void;
  onTermsClick: () => void;
}

export const Footer = ({ onPrivacyClick, onTermsClick }: FooterProps) => {
  return (
    <footer id="contact" className="bg-[#050A14] text-white pt-20 pb-10 border-t border-[#0B1C3D]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
          <div>
            <h2 className="serif-text text-3xl font-bold mb-6">
              U's<span className="text-[#D4AF37]">企画</span>
            </h2>
            <p className="text-gray-400 mb-8 font-light">
              株式会社U's企画<br />
              IR Consulting Firm
            </p>


          </div>
          <div className="flex flex-col justify-center items-start md:items-end">
            <p className="text-[#F3E5AB] mb-4 text-lg">お問い合わせはこちら</p>
            <Link
              to="/contact"
              className="btn-slide inline-flex items-center justify-center px-8 py-4 border border-[#D4AF37] text-[#D4AF37] w-full md:w-auto"
            >
              <span className="tracking-widest">CONTACT FORM</span>
              <ArrowRight className="ml-2 w-4 h-4" />
            </Link>
          </div>
        </div>

        <div className="border-t border-[#0B1C3D] pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-gray-500 font-light">
          <p>&copy; {new Date().getFullYear()} U's Planning Inc. All Rights Reserved.</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <button
              onClick={onPrivacyClick}
              className="link-underline transition-colors hover:text-[#D4AF37]"
            >
              Privacy Policy
            </button>
            <button
              onClick={onTermsClick}
              className="link-underline transition-colors hover:text-[#D4AF37]"
            >
              Terms of Service
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
