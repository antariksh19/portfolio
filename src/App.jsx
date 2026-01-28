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
  
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });

  // --- UPDATED PERSONAL INFO FROM RESUME ---
  const personalInfo = {
    name: "Antariksh Mohapatra",
    role: "Computer Science Undergraduate",
    location: "Bhubaneswar, India",
    email: "antariksh19m@gmail.com",
    phone: "+91 977642505",
    linkedin: "https://www.linkedin.com/in/antariksh-mohapatra/",
    github: "https://github.com/antariksh19",
    leetcode: "https://leetcode.com/u/antariksh19m/"
  };

  return (
    <>
      <AnimatePresence>
        {loading && <Preloader onComplete={() => setLoading(false)} />}
      </AnimatePresence>

      {!loading && (
        <div className="min-h-screen bg-[#050505] text-slate-200 font-sans overflow-x-hidden selection:bg-cyan-500 selection:text-black">
          <motion.div className="fixed top-0 left-0 right-0 h-1 bg-cyan-500 origin-left z-[100]" style={{ scaleX }} />
          <Background />
          <Navbar />
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