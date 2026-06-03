import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';

const SECTION_IDS = ['about', 'metrics', 'skills', 'projects', 'experience', 'contact'];

const DESKTOP_NAV_ITEMS = [
  { label: 'About', href: '#about', id: 'about' },
  { label: 'Skills', href: '#skills', id: 'skills' },
  { label: 'Projects', href: '#projects', id: 'projects' },
  { label: 'Experience', href: '#experience', id: 'experience' },
];

const MOBILE_NAV_ITEMS = [
  ...DESKTOP_NAV_ITEMS,
  { label: 'Contact', href: '#contact', id: 'contact' },
];

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('about');

  const closeMenu = useCallback(() => setIsMenuOpen(false), []);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const mq = window.matchMedia('(min-width: 768px)');
    const handleChange = (e) => {
      if (e.matches) closeMenu();
    };
    mq.addEventListener('change', handleChange);
    return () => mq.removeEventListener('change', handleChange);
  }, [closeMenu]);

  useEffect(() => {
    if (!isMenuOpen) return undefined;

    const onKeyDown = (e) => {
      if (e.key === 'Escape') closeMenu();
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [isMenuOpen, closeMenu]);

  useEffect(() => {
    const sections = SECTION_IDS.map((id) => document.getElementById(id)).filter(Boolean);
    if (!sections.length) return undefined;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

        if (visible[0]) {
          setActiveSection(visible[0].target.id);
        }
      },
      { rootMargin: '-35% 0px -50% 0px', threshold: [0, 0.15, 0.35, 0.55, 0.75, 1] }
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  const handleMobileNavClick = () => {
    closeMenu();
  };

  return (
    <nav
      className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? 'bg-[#050505]/80 backdrop-blur-xl border-b border-white/5 py-4' : 'bg-transparent py-6'}`}
      aria-label="Primary navigation"
    >
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="flex items-center gap-2">
          <div className="w-9 h-9 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-lg flex items-center justify-center text-white font-bold shadow-lg shadow-cyan-500/20">AM</div>
          <span className="text-lg font-bold tracking-tight">Antariksh<span className="text-cyan-500">.dev</span></span>
        </motion.div>

        <div className="hidden md:flex space-x-8 text-sm font-medium items-center">
          {DESKTOP_NAV_ITEMS.map((item) => (
            <a
              key={item.id}
              href={item.href}
              className={`text-slate-400 hover:text-white transition-colors relative group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500 rounded-sm ${
                activeSection === item.id ? 'text-white' : ''
              }`}
              aria-current={activeSection === item.id ? 'location' : undefined}
            >
              {item.label}
              <span
                className={`absolute -bottom-1 left-0 h-0.5 bg-cyan-500 transition-all ${
                  activeSection === item.id ? 'w-full' : 'w-0 group-hover:w-full'
                }`}
                aria-hidden
              />
            </a>
          ))}
          <a
            href="#contact"
            className="px-6 py-2.5 bg-white/10 border border-white/10 text-white font-bold rounded-full hover:bg-cyan-500/20 hover:border-cyan-500/50 transition-all backdrop-blur-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500"
          >
            Hire Me
          </a>
        </div>

        <div className="md:hidden">
          <button
            type="button"
            onClick={() => setIsMenuOpen((open) => !open)}
            className="text-white p-2 rounded-lg hover:bg-white/5 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500/60 transition-colors"
            aria-expanded={isMenuOpen}
            aria-controls="mobile-nav-menu"
            aria-label={isMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
          >
            {isMenuOpen ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            id="mobile-nav-menu"
            role="navigation"
            aria-label="Mobile navigation"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.32, ease: [0.4, 0, 0.2, 1] }}
            className="md:hidden overflow-hidden"
          >
            <motion.div
              initial={{ y: -12, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -12, opacity: 0 }}
              transition={{ duration: 0.28, ease: [0.4, 0, 0.2, 1] }}
              className="mx-4 mt-3 mb-2 rounded-2xl border border-white/10 bg-[#050505]/85 backdrop-blur-2xl shadow-2xl shadow-black/60"
            >
              <motion.ul
                initial="closed"
                animate="open"
                exit="closed"
                variants={{
                  open: { transition: { staggerChildren: 0.05, delayChildren: 0.06 } },
                  closed: { transition: { staggerChildren: 0.03, staggerDirection: -1 } },
                }}
                className="flex flex-col p-2"
              >
                {MOBILE_NAV_ITEMS.map((item) => {
                  const isActive = activeSection === item.id;

                  return (
                    <motion.li
                      key={item.id}
                      variants={{
                        open: { opacity: 1, x: 0 },
                        closed: { opacity: 0, x: -8 },
                      }}
                      transition={{ duration: 0.22, ease: 'easeOut' }}
                    >
                      <a
                        href={item.href}
                        onClick={handleMobileNavClick}
                        className={`group flex items-center gap-3 rounded-xl px-4 py-3.5 text-base font-medium transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500/50 ${
                          isActive
                            ? 'bg-cyan-500/10 text-cyan-400'
                            : 'text-slate-300 hover:bg-white/5 hover:text-cyan-400'
                        }`}
                        aria-current={isActive ? 'page' : undefined}
                      >
                        <span
                          className={`h-1.5 w-1.5 rounded-full transition-all duration-200 ${
                            isActive ? 'bg-cyan-400 scale-100' : 'bg-transparent scale-0 group-hover:bg-cyan-500/70 group-hover:scale-100'
                          }`}
                          aria-hidden="true"
                        />
                        {item.label}
                        {isActive && (
                          <span className="ml-auto h-px w-8 bg-gradient-to-r from-cyan-500/80 to-transparent" aria-hidden="true" />
                        )}
                      </a>
                    </motion.li>
                  );
                })}
              </motion.ul>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
