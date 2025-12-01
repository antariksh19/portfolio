import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Menu, X } from 'lucide-react';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? 'bg-[#050505]/80 backdrop-blur-xl border-b border-white/5 py-4' : 'bg-transparent py-6'}`}>
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="flex items-center gap-2">
          <div className="w-9 h-9 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-lg flex items-center justify-center text-white font-bold shadow-lg shadow-cyan-500/20">AM</div>
          <span className="text-lg font-bold tracking-tight">Antariksh<span className="text-cyan-500">.dev</span></span>
        </motion.div>
        
        <div className="hidden md:flex space-x-8 text-sm font-medium items-center">
          {['About', 'Skills', 'Projects', 'Experience'].map((item) => (
            <a key={item} href={`#${item.toLowerCase()}`} className="text-slate-400 hover:text-white transition-colors relative group">
              {item}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-cyan-500 transition-all group-hover:w-full"></span>
            </a>
          ))}
          <a href="#contact" className="px-6 py-2.5 bg-white/10 border border-white/10 text-white font-bold rounded-full hover:bg-cyan-500/20 hover:border-cyan-500/50 transition-all backdrop-blur-md">Hire Me</a>
        </div>
        
        <div className="md:hidden">
          <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-white">{isMenuOpen ? <X /> : <Menu />}</button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;