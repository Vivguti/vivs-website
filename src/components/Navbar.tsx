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

const pageImports: Record<string, () => Promise<any>> = {
  '/about': () => import('../pages/About'),
  '/selected-works': () => import('../pages/SelectedWorks'),
  '/portfolio': () => import('../pages/Portfolio'),
  '/project/living-infrastructure': () => import('../pages/LivingInfrastructure'),
  '/contact': () => import('../pages/Contact'),
};

const preloadRoute = (path: string) => {
  if (pageImports[path]) {
    pageImports[path]().catch(console.error);
  }
};

export default function Navbar() {
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <motion.nav
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
      className="fixed top-4 md:top-6 left-0 right-0 z-50 flex justify-center pointer-events-none"
    >
      <div className="w-[95%] md:w-[90%] max-w-4xl">
        
        {/* --- MOBILE LAYOUT: Individual Circles --- */}
        <div className="md:hidden flex justify-between items-start w-full">
          {/* Logo Circle */}
          <Link 
            to="/" 
            className="glass-nav p-2 rounded-full pointer-events-auto shadow-sm flex items-center justify-center" 
            aria-label="Home" 
            onClick={() => setIsMobileMenuOpen(false)}
            onMouseEnter={() => preloadRoute('/')}
            onTouchStart={() => preloadRoute('/')}
          >
            <div className="monogram-coin !w-10 !h-10">
              <div className="coin-inner">
                <div className="coin-face coin-front">
                  <img src="/vg-monogram.webp" alt="VG Monogram" className="monogram-img" />
                </div>
                <div className="coin-face coin-back">
                  <img src="/vg-monogram.webp" alt="VG Monogram" className="monogram-img" />
                </div>
              </div>
            </div>
          </Link>

          {/* Hamburger Circle & Dropdown */}
          <div className="flex flex-col items-end pointer-events-auto relative">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="glass-nav p-3.5 rounded-full shadow-sm text-gray-800 hover:text-black transition-colors flex items-center justify-center"
              aria-label="Toggle Menu"
            >
              {isMobileMenuOpen ? <X size={22} strokeWidth={2.5} /> : <Menu size={22} strokeWidth={2.5} />}
            </button>

            <AnimatePresence>
              {isMobileMenuOpen && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95, y: -10 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95, y: -10 }}
                  transition={{ duration: 0.2 }}
                  className="absolute top-full right-0 mt-3 w-56 glass-nav rounded-[24px] p-4 flex flex-col items-stretch gap-2 shadow-lg"
                >
                  {navLinks.map((link) => {
                    const isActive = location.pathname === link.path;
                    return (
                      <Link
                        key={link.name}
                        to={link.path}
                        onClick={() => setIsMobileMenuOpen(false)}
                        onMouseEnter={() => preloadRoute(link.path)}
                        onTouchStart={() => preloadRoute(link.path)}
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
                  
                  <div className="h-px bg-black/10 my-1 w-full" />
                  
                  <Link
                    to="/contact"
                    onClick={() => setIsMobileMenuOpen(false)}
                    onMouseEnter={() => preloadRoute('/contact')}
                    onTouchStart={() => preloadRoute('/contact')}
                    className="mt-1 text-center py-3 rounded-full bg-[#93A3B9] text-white text-[13px] font-semibold tracking-widest uppercase border border-white/30 hover:bg-[#8093AC] transition-all duration-300 shadow-sm"
                  >
                    Contact
                  </Link>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* --- DESKTOP LAYOUT: Long Rectangular Pill --- */}
        <div className="hidden md:grid glass-nav px-6 py-3 rounded-full pointer-events-auto grid-cols-[1fr_auto_1fr] items-center">
          {/* VG Monogram Logo */}
          <Link 
            to="/" 
            className="monogram-coin !w-[54px] !h-[54px] justify-self-start" 
            aria-label="Home"
            onMouseEnter={() => preloadRoute('/')}
            onTouchStart={() => preloadRoute('/')}
          >
            <div className="coin-inner">
              <div className="coin-face coin-front">
                <img src="/vg-monogram.webp" alt="VG Monogram" className="monogram-img" />
              </div>
              <div className="coin-face coin-back">
                <img src="/vg-monogram.webp" alt="VG Monogram" className="monogram-img" />
              </div>
            </div>
          </Link>

          {/* Desktop Nav Links */}
          <div className="flex items-center justify-center gap-16">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.path;
              return (
                <Link
                  key={link.name}
                  to={link.path}
                  onMouseEnter={() => preloadRoute(link.path)}
                  onTouchStart={() => preloadRoute(link.path)}
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

          {/* Contact Button (Desktop) */}
          <Link
            to="/contact"
            onMouseEnter={() => preloadRoute('/contact')}
            onTouchStart={() => preloadRoute('/contact')}
            className="inline-flex px-6 py-2.5 rounded-full bg-[#93A3B9] text-white text-xs font-semibold tracking-widest uppercase border border-white/30 hover:bg-[#8093AC] hover:scale-105 active:scale-95 transition-all duration-300 shadow-sm hover:shadow-md justify-self-end whitespace-nowrap"
          >
            Contact
          </Link>
        </div>

      </div>
    </motion.nav>
  );
}
