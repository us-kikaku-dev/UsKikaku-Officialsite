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
    { name: 'NEWS', href: '/news', type: 'route' },
    { name: 'BLOG', href: '/blog', type: 'route' },
  ];

  return (
    <nav
      className={`fixed w-full z-50 transition-all duration-300 ${scrolled || location.pathname === '/contact'
        ? 'bg-[#050A14]/95 backdrop-blur-md shadow-lg'
        : 'bg-[#050A14]/95 backdrop-blur-md border-b border-[#162A52]'
        }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center group cursor-pointer" onClick={() => navigate('/')}>
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
            <Link
              to="/contact"
              className="btn-slide px-6 py-2 border border-[#D4AF37] text-[#D4AF37] text-sm tracking-widest block"
            >
              CONTACT
            </Link>
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
            <Link
              to="/contact"
              className="block px-3 py-2 text-base font-medium text-[#D4AF37]"
              onClick={() => setIsOpen(false)}
            >
              CONTACT
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};
