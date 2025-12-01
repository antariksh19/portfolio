import React, { useState } from 'react';
import { motion, useScroll, useSpring, AnimatePresence } from 'framer-motion';

// Component Imports
import Preloader from './components/Preloader';
import Background from './components/Background';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Experience from './components/Experience';
import Contact from './components/Contact';

const Portfolio = () => {
  const [loading, setLoading] = useState(true);
  
  // Scroll Progress Bar Logic
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });

  // Centralized Data (Easier to update later)
  const personalInfo = {
    name: "Antariksh Mohapatra",
    role: "B.Tech CSE Student & Design Lead",
    location: "Bhubaneswar, India",
    email: "antriksh19m@gmail.com",
    phone: "+91 97764 12505",
    linkedin: "https://linkedin.com/in/yourprofile", 
    github: "https://github.com/yourprofile" 
  };

  return (
    <>
      <AnimatePresence>
        {loading && <Preloader onComplete={() => setLoading(false)} />}
      </AnimatePresence>

      {!loading && (
        <div className="min-h-screen bg-[#050505] text-slate-200 font-sans overflow-x-hidden selection:bg-cyan-500 selection:text-black">
          
          {/* Global UI Elements */}
          <motion.div className="fixed top-0 left-0 right-0 h-1 bg-cyan-500 origin-left z-[100]" style={{ scaleX }} />
          <Background />
          <Navbar />

          {/* Page Sections */}
          <Hero personalInfo={personalInfo} />
          <Skills />
          <Projects />
          <Experience />
          <Contact personalInfo={personalInfo} />

        </div>
      )}
    </>
  );
};

export default Portfolio;