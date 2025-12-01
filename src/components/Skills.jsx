import React from 'react';
import { motion } from 'framer-motion';
import { Layout, Server, Database, Cpu } from 'lucide-react';

const SkillCard = ({ icon, title, skills, color }) => (
  <div className="bg-white/[0.02] border border-white/5 p-6 rounded-2xl hover:border-white/10 hover:bg-white/[0.04] transition-all hover:-translate-y-1 group backdrop-blur-sm">
    <div className={`mb-4 p-3 bg-white/5 rounded-xl w-fit ${color} group-hover:scale-110 transition-transform`}>{icon}</div>
    <h3 className="text-lg font-bold mb-4 text-slate-200">{title}</h3>
    <ul className="space-y-2">{skills.map((s, i) => <li key={i} className="flex items-center gap-2 text-slate-400 text-sm"><div className={`w-1.5 h-1.5 rounded-full ${color.replace('text', 'bg')}`}></div> {s}</li>)}</ul>
  </div>
);

const Skills = () => {
  return (
    <section id="skills" className="py-32 px-6 relative z-10">
      <div className="max-w-6xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-16">
          <h2 className="text-3xl font-bold mb-4">Technical <span className="text-cyan-500">Arsenal</span></h2>
          <div className="h-1 w-20 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full"></div>
        </motion.div>
        <div className="grid md:grid-cols-4 gap-6">
          <SkillCard icon={<Layout />} title="Frontend" skills={["React.js", "Tailwind CSS", "JavaScript", "Bootstrap"]} color="text-cyan-400" />
          <SkillCard icon={<Server />} title="Backend" skills={["Node.js", "Express.js", "PHP", "XML"]} color="text-purple-400" />
          <SkillCard icon={<Database />} title="Database" skills={["MySQL", "MongoDB"]} color="text-green-400" />
          <SkillCard icon={<Cpu />} title="Languages" skills={["Java", "Python", "C", "HTML/CSS"]} color="text-yellow-400" />
        </div>
      </div>
    </section>
  );
};

export default Skills;