import React, { memo } from 'react';
import { motion } from 'framer-motion';
import { Layout, Server, Database, Cpu } from 'lucide-react';
import { skillCategories } from '../content/skills';

const CATEGORY_ICONS = {
  layout: Layout,
  server: Server,
  database: Database,
  cpu: Cpu,
};

const SkillCard = memo(({ icon: Icon, title, skills, color }) => (
  <div className="bg-white/[0.02] border border-white/5 p-6 rounded-2xl hover:border-white/10 hover:bg-white/[0.04] transition-all hover:-translate-y-1 group backdrop-blur-sm">
    <div className={`mb-4 p-3 bg-white/5 rounded-xl w-fit ${color} group-hover:scale-110 transition-transform`}>
      <Icon aria-hidden />
    </div>
    <h3 className="text-lg font-bold mb-4 text-slate-200">{title}</h3>
    <ul className="space-y-2" role="list">
      {skills.map((s) => (
        <li key={s} className="flex items-center gap-2 text-slate-400 text-sm" role="listitem">
          <div className={`w-1.5 h-1.5 rounded-full ${color.replace('text', 'bg')}`} aria-hidden />
          {s}
        </li>
      ))}
    </ul>
  </div>
));
SkillCard.displayName = 'SkillCard';

const Skills = () => {
  return (
    <section id="skills" className="py-32 px-6 relative z-10" aria-labelledby="skills-heading">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <h2 id="skills-heading" className="text-3xl font-bold mb-4">
            Technical <span className="text-cyan-500">Arsenal</span>
          </h2>
          <div className="h-1 w-20 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full" aria-hidden />
        </motion.div>
        <div className="grid md:grid-cols-4 gap-6">
          {skillCategories.map((category) => {
            const Icon = CATEGORY_ICONS[category.icon] ?? Cpu;
            return (
              <SkillCard
                key={category.id}
                icon={Icon}
                title={category.title}
                skills={category.skills}
                color={category.color}
              />
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Skills;
