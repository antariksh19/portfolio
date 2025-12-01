import React from 'react';
import { Tilt } from 'react-tilt';
import { ExternalLink, Code } from 'lucide-react';

const ProjectCard = ({ title, desc, tags }) => (
  <Tilt options={{ max: 5, scale: 1.02, glare: true, "max-glare": 0.3 }} className="h-full">
    <div className="h-full bg-[#0a0a0a] border border-white/10 rounded-2xl overflow-hidden hover:border-cyan-500/30 transition-all group flex flex-col backdrop-blur-md relative">
       <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
      <div className="h-48 bg-gradient-to-br from-[#121212] to-[#1a1a1a] relative overflow-hidden group z-10">
        <div className="absolute inset-0 flex items-center justify-center opacity-30 group-hover:opacity-100 transition-opacity duration-500 transform group-hover:scale-110"><Code size={48} className="text-cyan-500" /></div>
      </div>
      <div className="p-8 flex-1 flex flex-col z-10">
        <div className="flex justify-between items-start mb-4"><h3 className="text-2xl font-bold text-white group-hover:text-cyan-400 transition-colors">{title}</h3><ExternalLink className="text-slate-600 group-hover:text-white transition-colors" size={20} /></div>
        <p className="text-slate-400 mb-6 leading-relaxed flex-1">{desc}</p>
        <div className="flex flex-wrap gap-2 mt-auto">{tags.map(t => <span key={t} className="px-3 py-1 bg-white/5 text-cyan-200 text-xs font-medium rounded-full border border-white/10">{t}</span>)}</div>
      </div>
    </div>
  </Tilt>
);

const Projects = () => {
  return (
    <section id="projects" className="py-32 px-6 bg-black/30 border-y border-white/5 relative z-10 backdrop-blur-sm">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl font-bold mb-16">Featured <span className="text-cyan-500">Work</span></h2>
        <div className="grid md:grid-cols-2 gap-8">
          <ProjectCard title="Inventory Management System" desc="Designed a comprehensive web-based inventory management system for warehouse stock tracking. Features include real-time data retrieval." tags={["PHP", "MySQL", "JavaScript", "HTML/CSS"]} />
          <ProjectCard title="Antariksh.dev Portfolio" desc="The modern, high-performance portfolio you are viewing right now. Built with the React ecosystem and modern UI." tags={["React", "Tailwind", "Framer Motion", "Vite"]} />
        </div>
      </div>
    </section>
  );
};

export default Projects;