import { motion, AnimatePresence } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import { useState } from 'react';
import { Menu, X } from 'lucide-react';

const navLinks = [
  { name: 'Home', path: '/' },
  { name: 'About', path: '/about' },
  { name: 'Selected Works', path: '/selected-works' },
  { name: 'Portfolio', path: '/portfolio' },
];

export default function Navbar() {
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <motion.nav
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
      className="fixed top-4 md:top-6 left-1/2 -translate-x-1/2 z-50 w-[95%] md:w-[90%] max-w-4xl"
    >
      <div 
        className={`glass-nav px-4 md:px-6 py-3 transition-all duration-300 overflow-hidden ${isMobileMenuOpen ? 'rounded-[24px]' : 'rounded-full'}`}
      >
        <div className="flex items-center justify-between md:grid md:grid-cols-[1fr_auto_1fr]">
          {/* VG Monogram Logo */}
          <Link to="/" className="monogram-coin !w-10 !h-10 md:!w-[54px] md:!h-[54px] md:justify-self-start" aria-label="Home" onClick={() => setIsMobileMenuOpen(false)}>
            <div className="coin-inner">
              {/* Front face */}
              <div className="coin-face coin-front">
                <img
                  src="/vg-monogram.png"
                  alt="VG Monogram"
                  className="monogram-img"
                />
              </div>
              {/* Back face (mirrored) */}
              <div className="coin-face coin-back">
                <img
                  src="/vg-monogram.png"
                  alt="VG Monogram"
                  className="monogram-img"
                />
              </div>
            </div>
          </Link>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex items-center justify-center gap-16">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.path;
              return (
                <Link
                  key={link.name}
                  to={link.path}
                  className="relative text-[13px] font-semibold tracking-widest uppercase text-gray-800 hover:text-black transition-colors"
                >
                  {link.name}
                  {isActive && (
                    <motion.div
                      layoutId="activeNavIndicator"
                      className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-1 h-1 bg-gray-900 rounded-full"
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    />
                  )}
                </Link>
              );
            })}
          </div>

          {/* Mobile Hamburger Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 text-gray-800 hover:text-black transition-colors"
              aria-label="Toggle Menu"
            >
              {isMobileMenuOpen ? <X size={24} strokeWidth={2} /> : <Menu size={24} strokeWidth={2} />}
            </button>
          </div>

          {/* Contact Button (Desktop) */}
          <Link
            to="/contact"
            onClick={() => setIsMobileMenuOpen(false)}
            className="hidden md:inline-flex px-6 py-2.5 rounded-full bg-[#93A3B9] text-white text-xs font-semibold tracking-widest uppercase border border-white/30 hover:bg-[#8093AC] hover:scale-105 active:scale-95 transition-all duration-300 shadow-sm hover:shadow-md justify-self-end whitespace-nowrap"
          >
            Contact
          </Link>
        </div>

        {/* Mobile Dropdown Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="md:hidden overflow-hidden"
            >
              <div className="flex flex-col items-stretch gap-2 pt-4 pb-2 border-t border-black/10 mt-4">
                {navLinks.map((link) => {
                  const isActive = location.pathname === link.path;
                  return (
                    <Link
                      key={link.name}
                      to={link.path}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="relative text-[14px] font-semibold tracking-widest uppercase text-gray-800 hover:text-black transition-colors text-center py-3 rounded-lg hover:bg-black/5"
                    >
                      {link.name}
                      {isActive && (
                        <motion.div
                          layoutId="activeNavIndicatorMobile"
                          className="absolute bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 bg-gray-900 rounded-full"
                          transition={{ type: "spring", stiffness: 300, damping: 30 }}
                        />
                      )}
                    </Link>
                  );
                })}
                
                {/* Mobile Contact Button */}
                <Link
                  to="/contact"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="mt-2 text-center py-3 rounded-full bg-[#93A3B9] text-white text-[13px] font-semibold tracking-widest uppercase border border-white/30 hover:bg-[#8093AC] transition-all duration-300 shadow-sm"
                >
                  Contact
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  );
}
