import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import { Tilt } from 'react-tilt';
import { TypeAnimation } from 'react-type-animation';
import { Download, ChevronRight, Sparkles, Github, Linkedin, Mail, Code } from 'lucide-react';
import { heroContent, metrics as metricsConfig } from '../content/profile';

const FOCUS_RING =
  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500 focus-visible:ring-offset-2 focus-visible:ring-offset-[#050505]';

const PILL_HOVER =
  'transition-all duration-300 ease-out hover:-translate-y-0.5 hover:border-cyan-500/40 hover:shadow-[0_0_14px_rgba(34,211,238,0.12)]';

const HERO_METRICS = [
  metricsConfig.projectsBuilt,
  metricsConfig.leetcodeProblems,
  metricsConfig.yearsCoding,
];

const Hero = ({ personalInfo }) => {
  const socialLinks = useMemo(
    () => [
      { href: personalInfo.github, icon: <Github size={20} aria-hidden />, label: 'GitHub profile' },
      { href: personalInfo.linkedin, icon: <Linkedin size={20} aria-hidden />, label: 'LinkedIn profile' },
      { href: personalInfo.leetcode, icon: <Code size={20} aria-hidden />, label: 'LeetCode profile' },
      {
        href: `mailto:${personalInfo.email}`,
        icon: <Mail size={20} aria-hidden />,
        label: `Email ${personalInfo.name}`,
      },
    ],
    [personalInfo],
  );

  return (
    <section
      id="about"
      aria-labelledby="hero-headline"
      className="relative pt-32 pb-20 px-6 min-h-screen flex items-center justify-center overflow-hidden"
    >
      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 lg:gap-16 items-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="z-10 order-1"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-cyan-400 text-sm font-medium mb-6 lg:mb-8 backdrop-blur-md shadow-xl">
            <Sparkles size={14} className="text-yellow-400 animate-pulse" aria-hidden />
            <span>Based in {personalInfo.location}</span>
          </div>

          <h1
            id="hero-headline"
            className="text-4xl sm:text-5xl md:text-5xl lg:text-6xl font-bold mb-4 lg:mb-5 leading-[1.1] tracking-tight text-white drop-shadow-2xl lg:max-w-2xl"
          >
            Building{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 animate-gradient font-extrabold">
              {heroContent.headline.highlight}
            </span>
            ,<br />
            {heroContent.headline.lines[0]}
            <br />
            {heroContent.headline.lines[1]}
          </h1>

          <div className="mb-5 lg:mb-6 lg:max-w-2xl">
            <p className="text-xl md:text-2xl font-medium text-white tracking-tight">{personalInfo.name}</p>
            <p className="text-sm md:text-base font-medium text-cyan-400 mt-1 tracking-wide">{heroContent.role}</p>
          </div>

          <p className="text-lg md:text-xl text-slate-300 mb-6 lg:mb-8 max-w-xl leading-relaxed">
            {heroContent.subtitle}
          </p>

          <div
            className="text-xl text-slate-300 mb-6 lg:mb-8 font-mono min-h-[30px] flex items-center drop-shadow-md"
            aria-live="polite"
            aria-label="Current focus area"
          >
            <span className="text-cyan-500 mr-3" aria-hidden>
              &gt;
            </span>
            <span className="text-white">
              <TypeAnimation sequence={heroContent.typeSequence} wrapper="span" speed={50} repeat={Infinity} />
            </span>
            <span className="animate-pulse ml-1" aria-hidden>
              _
            </span>
          </div>

          <div className="flex flex-wrap gap-2 mb-8 lg:mb-10" role="list" aria-label="Core technologies">
            {heroContent.techPills.map((tech) => (
              <span
                key={tech}
                role="listitem"
                className={`px-3 py-1 bg-white/5 text-cyan-200 text-xs font-medium rounded-full border border-white/10 ${PILL_HOVER}`}
              >
                {tech}
              </span>
            ))}
          </div>

          <div
            className="grid grid-cols-3 gap-4 sm:gap-8 md:gap-12 mb-8 lg:mb-10 max-w-lg sm:max-w-none"
            role="list"
            aria-label="Career highlights"
          >
            {HERO_METRICS.map(({ value, suffix, shortLabel }) => (
              <div
                key={shortLabel}
                role="listitem"
                className="group text-center sm:text-left transition-transform duration-300 ease-out hover:-translate-y-0.5"
              >
                <div className="text-xl sm:text-2xl md:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500 tabular-nums transition-opacity duration-300 group-hover:opacity-90">
                  {value}
                  {suffix}
                </div>
                <div className="text-xs sm:text-sm text-slate-500 mt-1 sm:mt-1.5 leading-snug transition-colors duration-300 group-hover:text-slate-400">
                  {shortLabel}
                </div>
              </div>
            ))}
          </div>

          <div className="flex flex-wrap gap-4">
            <a
              href={personalInfo.resumePath ?? '/resume.pdf'}
              target="_blank"
              rel="noreferrer"
              aria-label="Download resume (PDF, opens in new tab)"
              className={`group relative px-8 py-4 bg-cyan-500 text-black font-bold rounded-xl overflow-hidden shadow-lg shadow-cyan-500/20 transition-all duration-300 hover:scale-105 hover:shadow-cyan-500/35 active:scale-[0.98] ${FOCUS_RING}`}
            >
              <span className="relative z-10 flex items-center gap-2">
                <Download size={20} aria-hidden /> Download Resume
              </span>
            </a>
            <a
              href="#projects"
              aria-label="View projects section"
              className={`px-8 py-4 bg-black/30 border border-white/20 backdrop-blur-md text-white rounded-xl transition-all duration-300 hover:bg-white/10 hover:border-cyan-500/50 hover:shadow-[0_0_20px_rgba(34,211,238,0.08)] active:scale-[0.98] flex items-center gap-2 ${FOCUS_RING}`}
            >
              View Projects <ChevronRight size={18} aria-hidden />
            </a>
          </div>
        </motion.div>

        <Tilt options={{ max: 15, scale: 1.02, speed: 400, glare: true, 'max-glare': 0.2 }} className="order-2">
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="relative w-full max-w-md mx-auto"
          >
            <div
              className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-purple-600 rounded-2xl blur-xl opacity-30 animate-pulse"
              aria-hidden
            />
            <article
              className="relative bg-[#0a0a0a]/90 backdrop-blur-xl border border-white/10 rounded-2xl overflow-hidden shadow-2xl"
              aria-label={`${personalInfo.name} profile`}
            >
              <div className="h-96 bg-slate-800 relative overflow-hidden group">
                <img
                  src="/profile.png"
                  alt={`Portrait of ${personalInfo.name}, ${heroContent.role}`}
                  className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
                  onError={(e) => {
                    e.target.style.display = 'none';
                    e.target.nextSibling.style.display = 'flex';
                  }}
                />
                <div className="absolute inset-0 hidden flex-col items-center justify-center bg-slate-800 text-slate-500">
                  <span className="text-6xl mb-4" aria-hidden>
                    👨‍💻
                  </span>
                  <p>Add profile.png</p>
                </div>
              </div>
              <div className="p-6 relative z-10 -mt-20">
                <div className="inline-block px-3 py-1 bg-cyan-500/20 border border-cyan-500/30 rounded-full text-cyan-400 text-xs font-bold mb-2">
                  Open for Work
                </div>
                <h3 className="text-2xl font-bold text-white mb-1">{personalInfo.name}</h3>
                <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">{heroContent.profileTagline}</p>
                <nav className="flex gap-4 border-t border-white/10 pt-4 mt-4" aria-label="Social and contact links">
                  {socialLinks.map(({ href, icon, label }) => (
                    <a
                      key={label}
                      href={href}
                      target="_blank"
                      rel="noreferrer"
                      aria-label={label}
                      className={`text-slate-400 hover:text-white hover:scale-110 transition-all duration-300 ${FOCUS_RING} rounded-md`}
                    >
                      {icon}
                    </a>
                  ))}
                </nav>
              </div>
            </article>
          </motion.div>
        </Tilt>
      </div>
    </section>
  );
};

export default Hero;
