import React from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';

import Highlights from './components/Highlights';
import Background from './components/Background';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Metrics from './components/Metrics';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Experience from './components/Experience';
import Contact from './components/Contact';
import AIAssistant from './components/AIAssistant';
import { personalInfo } from './content/profile';

const Portfolio = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });

  return (
    <div className="min-h-screen bg-[#050505] text-slate-200 font-sans overflow-x-hidden selection:bg-cyan-500 selection:text-black">
      <a
        href="#about"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[200] focus:px-4 focus:py-2 focus:bg-cyan-500 focus:text-black focus:rounded-lg focus:font-semibold"
      >
        Skip to main content
      </a>
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-cyan-500 origin-left z-[100]"
        style={{ scaleX }}
        role="progressbar"
        aria-label="Page scroll progress"
        aria-valuemin={0}
        aria-valuemax={100}
      />
      <Background />
      <Navbar />
      <main>
        <Hero personalInfo={personalInfo} />
        <Metrics />
        <Skills />
        <Projects />
        <Highlights />
        <Experience />
        <AIAssistant />        
        <Contact personalInfo={personalInfo} />
      </main>
      
    </div>
  );
};

export default Portfolio;
