import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { useLocation, useNavigate, Link } from 'react-router-dom';

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  /* 
    Updated to standard routing. 
    Home scroll logic is removed for these specific pages as requested by "Update nav to Company, Service, Product... creating new directories".
    The original handleNavClick logic was for scrolling to sections on Home. 
    Since these are now separate pages, we can just use simple Link, except if "Contact" needs external link behavior.
  */

  const navLinks = [
    { name: 'COMPANY', href: '/company', type: 'route' },
    { name: 'SERVICE', href: '/service', type: 'route' },
    { name: 'PRODUCT', href: '/product', type: 'route' },
    { name: 'NEWS', href: '/news', type: 'route' },
    { name: 'BLOG', href: '/blog', type: 'route' },
  ];

  return (
    <nav
      className={`fixed w-full z-50 transition-all duration-300 ${scrolled
        ? 'bg-[#050A14]/95 backdrop-blur-md shadow-lg'
        : 'bg-[#050A14]/95 backdrop-blur-md border-b border-[#162A52]'
        }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center gap-3 group cursor-pointer" onClick={() => navigate('/')}>
            <div className="w-10 h-10 flex items-center justify-center border border-[#D4AF37] bg-[#0B1C3D] text-[#D4AF37] font-serif text-xl font-bold rounded-sm transition-all duration-300 group-hover:bg-[#D4AF37] group-hover:text-[#0B1C3D]">
              U
            </div>
            <span className="text-2xl serif-text font-bold tracking-widest text-white">
              U's<span className="text-[#D4AF37]">企画</span>
            </span>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-10">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.href}
                className="link-underline text-sm font-medium text-gray-300 transition-colors tracking-wider"
              >
                {link.name}
              </Link>
            ))}
            <a
              href="https://docs.google.com/forms/d/e/1FAIpQLSc9AehA1NqD4kngknlIt4_y6LmrvDs8f56_jRUe4o8kh-rGIg/viewform"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-slide px-6 py-2 border border-[#D4AF37] text-[#D4AF37] text-sm tracking-widest block"
            >
              CONTACT
            </a>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={toggleMenu}
              className="text-gray-300 hover:text-white focus:outline-none"
            >
              {isOpen ? <X className="w-8 h-8" /> : <Menu className="w-8 h-8" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-[#050A14] border-t border-[#162A52] absolute w-full">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.href}
                className="block px-3 py-2 text-base font-medium text-gray-300 hover:text-[#D4AF37]"
                onClick={() => setIsOpen(false)}
              >
                {link.name}
              </Link>
            ))}
            <a
              href="https://docs.google.com/forms/d/e/1FAIpQLSc9AehA1NqD4kngknlIt4_y6LmrvDs8f56_jRUe4o8kh-rGIg/viewform"
              target="_blank"
              rel="noopener noreferrer"
              className="block px-3 py-2 text-base font-medium text-[#D4AF37]"
              onClick={() => setIsOpen(false)}
            >
              CONTACT
            </a>
          </div>
        </div>
      )}
    </nav>
  );
};
