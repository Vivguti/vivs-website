import { motion } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';

const navLinks = [
  { name: 'Home', path: '/' },
  { name: 'About', path: '/about' },
  { name: 'Portfolio', path: '/portfolio' },
];

export default function Navbar() {
  const location = useLocation();

  return (
    <motion.nav
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
      className="fixed top-6 left-1/2 -translate-x-1/2 z-50 w-[90%] max-w-4xl"
    >
      <div className="glass-nav rounded-full px-6 py-3" style={{ display: 'grid', gridTemplateColumns: '1fr auto 1fr', alignItems: 'center' }}>
        {/* VG Monogram Logo */}
        <Link to="/" className="monogram-coin" aria-label="Home">
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

        {/* Centered Nav Links */}
        <div className="flex items-center justify-center gap-16">
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

        {/* Contact Button */}
        <Link
          to="/contact"
          className="px-6 py-2.5 rounded-full bg-[#93A3B9] text-white text-xs font-semibold tracking-widest uppercase border border-white/30 hover:bg-[#8093AC] hover:scale-105 active:scale-95 transition-all duration-300 shadow-sm hover:shadow-md justify-self-end"
        >
          Contact
        </Link>
      </div>
    </motion.nav>
  );
}
