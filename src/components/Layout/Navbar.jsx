import React, { useState, useEffect } from 'react';
import { Link } from 'react-scroll';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Button from '../ui/Button';
import { navItems } from '../../data/siteContent';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 24);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const closeMenu = () => setIsMobileMenuOpen(false);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-slate-950/75 backdrop-blur-xl border-b border-white/10 py-4 shadow-[0_20px_50px_rgba(2,6,23,0.55)]' : 'bg-transparent py-6'
      }`}
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between">
          <Link
            to="home"
            smooth={true}
            duration={300}
            className="text-2xl font-bold cursor-pointer text-white flex items-center gap-3 transition-transform hover:scale-[1.01]"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-blue-400/30 bg-gradient-to-br from-blue-500/20 to-cyan-500/10 text-sm font-black tracking-widest text-blue-300 shadow-[0_0_28px_rgba(59,130,246,0.30)]">
              GL
            </div>
            <span className="text-[0.75rem] sm:text-base font-semibold tracking-[0.22em] text-white">GL SOLUTIONS</span>
          </Link>

          <div className="hidden md:flex items-center space-x-8">
            <div className="flex items-center space-x-6">
              {navItems.map((link) => (
                <Link
                  key={link.name}
                  to={link.to}
                  smooth={true}
                  duration={100}
                  offset={-80}
                  spy={true}
                  activeClass="text-blue-300"
                  className="group relative text-sm font-medium text-gray-300 hover:text-white transition-colors"
                >
                  <span className="relative inline-flex items-center gap-1">
                    {link.name}
                    <span className="absolute -bottom-1 left-0 h-px w-0 bg-gradient-to-r from-blue-400 to-cyan-300 transition-all duration-300 group-hover:w-full" />
                  </span>
                </Link>
              ))}
            </div>
            <Link to="contact" smooth={true} duration={100} offset={-80}>
              <Button variant="primary" size="sm">Start a Project</Button>
            </Link>
          </div>

          <button
            type="button"
            aria-label={isMobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            className="md:hidden text-white focus:outline-none"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -18 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -18 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className="absolute top-full left-0 right-0 bg-slate-950/95 border-t border-white/10 md:hidden flex flex-col py-4 px-6 shadow-2xl backdrop-blur-xl"
          >
            {navItems.map((link, index) => (
              <motion.div
                key={link.name}
                initial={{ opacity: 0, x: -12 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.04 }}
              >
                <Link
                  to={link.to}
                  smooth={true}
                  duration={100}
                  offset={-80}
                  onClick={closeMenu}
                  className="text-gray-300 hover:text-white py-3 border-b border-white/5 cursor-pointer text-lg block"
                >
                  {link.name}
                </Link>
              </motion.div>
            ))}
            <div className="pt-4">
              <Link to="contact" smooth={true} duration={100} offset={-80} onClick={closeMenu}>
                <Button variant="primary" className="w-full">Start a Project</Button>
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
