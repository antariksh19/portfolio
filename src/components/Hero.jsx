import React from 'react';
import { motion } from 'framer-motion';
import { Tilt } from 'react-tilt';
import { TypeAnimation } from 'react-type-animation';
import { Download, ChevronRight, Sparkles, Github, Linkedin, Mail, Code } from 'lucide-react';

const Hero = ({ personalInfo }) => {
  return (
    <section id="about" className="relative pt-32 pb-20 px-6 min-h-screen flex items-center justify-center overflow-hidden">
      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center relative z-10">
        
        {/* TEXT CONTENT */}
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="z-10 order-2 lg:order-1">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-cyan-400 text-sm font-medium mb-8 backdrop-blur-md shadow-xl">
            <Sparkles size={14} className="text-yellow-400 animate-pulse" />
            <span>Based in {personalInfo.location}</span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight tracking-tight text-white drop-shadow-2xl">
            Hello, I'm <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 animate-gradient font-extrabold">Antariksh</span>
          </h1>

          <div className="text-xl text-slate-300 mb-10 font-mono h-[30px] flex items-center drop-shadow-md">
            <span className="text-cyan-500 mr-3">&gt;</span>
            <span className="text-white">
              <TypeAnimation 
                sequence={[
                  'Computer Science Engineer', 2000, 
                  'Design Lead @ Tech Fest', 2000, 
                  'Full Stack Developer', 2000,
                  'Creative Thinker', 2000
                ]} 
                wrapper="span" speed={50} repeat={Infinity} 
              />
            </span>
            <span className="animate-pulse ml-1">_</span>
          </div>
          
          <p className="text-slate-400 mb-8 max-w-lg leading-relaxed">
            {personalInfo.role} at <strong>XIM University</strong>. Bridging the gap between robust engineering and creative design.
          </p>

          <div className="flex flex-wrap gap-4">
            <a href="/resume.pdf" target="_blank" className="group relative px-8 py-4 bg-cyan-500 text-black font-bold rounded-xl overflow-hidden shadow-lg shadow-cyan-500/20 hover:scale-105 transition-transform">
              <span className="relative z-10 flex items-center gap-2"><Download size={20} /> Download Resume</span>
            </a>
            <a href="#projects" className="px-8 py-4 bg-black/30 border border-white/20 backdrop-blur-md text-white rounded-xl transition-all hover:bg-white/10 flex items-center gap-2 hover:border-cyan-500/50">View Projects <ChevronRight size={18} /></a>
          </div>
        </motion.div>

        {/* PROFILE IMAGE CARD */}
        <Tilt options={{ max: 15, scale: 1.02, speed: 400, glare: true, "max-glare": 0.2 }} className="order-1 lg:order-2">
          <motion.div initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.5, duration: 0.8 }} className="relative w-full max-w-md mx-auto">
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-purple-600 rounded-2xl blur-xl opacity-30 animate-pulse"></div>
            <div className="relative bg-[#0a0a0a]/90 backdrop-blur-xl border border-white/10 rounded-2xl overflow-hidden shadow-2xl">
              <div className="h-96 bg-slate-800 relative overflow-hidden group">
                <img src="/profile.png" alt="Profile" className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105" onError={(e) => {e.target.style.display='none'; e.target.nextSibling.style.display='flex'}} />
                <div className="absolute inset-0 hidden flex-col items-center justify-center bg-slate-800 text-slate-500"><span className="text-6xl mb-4">👨‍💻</span><p>Add profile.png</p></div>
              </div>
              <div className="p-6 relative z-10 -mt-20">
                <div className="inline-block px-3 py-1 bg-cyan-500/20 border border-cyan-500/30 rounded-full text-cyan-400 text-xs font-bold mb-2">Open for Work</div>
                <h3 className="text-2xl font-bold text-white mb-1">{personalInfo.name}</h3>
                <div className="flex gap-4 border-t border-white/10 pt-4 mt-4">
                  {[
                    { href: personalInfo.github, icon: <Github size={20} /> },
                    { href: personalInfo.linkedin, icon: <Linkedin size={20} /> },
                    { href: personalInfo.leetcode, icon: <Code size={20} /> }, // Added LeetCode Here
                    { href: `mailto:${personalInfo.email}`, icon: <Mail size={20} /> }
                  ].map((s, i) => (
                    <a key={i} href={s.href} target="_blank" rel="noreferrer" className="text-slate-400 hover:text-white hover:scale-110 transition-all">{s.icon}</a>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </Tilt>
      </div>
    </section>
  );
};

export default Hero;