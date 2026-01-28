import React from 'react';
import { Tilt } from 'react-tilt';
import { ExternalLink, Bot, Lock, Smartphone, Database, Code } from 'lucide-react';

const ProjectCard = ({ title, desc, tags, link, icon: Icon }) => (
  <Tilt options={{ max: 5, scale: 1.02, glare: true, "max-glare": 0.3 }} className="h-full">
    <a 
      href={link} 
      target="_blank" 
      rel="noreferrer"
      className="block h-full bg-[#0a0a0a] border border-white/10 rounded-2xl overflow-hidden hover:border-cyan-500/30 transition-all group flex flex-col backdrop-blur-md relative cursor-pointer"
    >
      {/* Background Hover Gradient */}
      <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
      
      {/* Top Graphic Section (The "Empty" Space - Now Themed) */}
      <div className="h-48 bg-gradient-to-br from-[#121212] to-[#1a1a1a] relative overflow-hidden group z-10">
        <div className="absolute inset-0 flex items-center justify-center opacity-40 group-hover:opacity-100 transition-opacity duration-500 transform group-hover:scale-110">
          {/* Dynamic Icon based on project */}
          <Icon size={64} className="text-cyan-500 drop-shadow-[0_0_15px_rgba(6,182,212,0.5)]" />
        </div>
        {/* Subtle decorative grid in the background */}
        <div className="absolute inset-0 opacity-[0.1] bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:16px_16px]"></div>
      </div>
      
      {/* Text Content */}
      <div className="p-8 flex-1 flex flex-col z-10">
        <div className="flex justify-between items-start mb-4">
          <h3 className="text-2xl font-bold text-white group-hover:text-cyan-400 transition-colors">
            {title}
          </h3>
          <ExternalLink size={20} className="text-slate-600 group-hover:text-white transition-colors" />
        </div>
        
        <p className="text-slate-400 mb-6 leading-relaxed flex-1">
          {desc}
        </p>
        
        <div className="flex flex-wrap gap-2 mt-auto">
          {tags.map(t => (
            <span key={t} className="px-3 py-1 bg-white/5 text-cyan-200 text-xs font-medium rounded-full border border-white/10">
              {t}
            </span>
          ))}
        </div>
      </div>
    </a>
  </Tilt>
);

const Projects = () => {
  return (
    <section id="projects" className="py-32 px-6 bg-black/30 border-y border-white/5 relative z-10 backdrop-blur-sm">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl font-bold mb-16">Featured <span className="text-cyan-500">Work</span></h2>
        <div className="grid md:grid-cols-2 gap-8">
          
          <ProjectCard 
            title="AI Website Builder" 
            desc="An AI-driven platform that automates website generation from natural language prompts using Next.js and Gemini/Groq APIs." 
            tags={["Next.js", "Gemini API", "React"]} 
            link="https://ai-websitebuilder.vercel.app/"
            icon={Bot} // ROBOT ICON
          />
          
          <ProjectCard 
            title="Stegano-web" 
            desc="Secure image steganography tool to conceal AES-256-GCM encrypted messages using LSB manipulation logic in Python." 
            tags={["Python", "React", "Cryptography"]} 
            link="https://github.com/antariksh19/stegano-web"
            icon={Lock} // LOCK ICON
          />
          
           <ProjectCard 
            title="Dozo - Medication App" 
            desc="Cloud-native Android medication adherence app built with Kotlin, Jetpack Compose, and Firebase Authentication." 
            tags={["Kotlin", "Jetpack Compose", "Firebase"]} 
            link="https://github.com/antariksh19/Dozo"
            icon={Smartphone} // PHONE ICON
          />
          
           <ProjectCard 
            title="WARESYNC Inventory" 
            desc="Full-stack inventory dashboard using PHP and MySQL to streamline warehouse logistics and real-time stock reporting." 
            tags={["PHP", "MySQL", "JavaScript"]} 
            link="http://waresync.great-site.net/"
            icon={Database} // DATABASE ICON
          />
          
        </div>
      </div>
    </section>
  );
};

export default Projects;