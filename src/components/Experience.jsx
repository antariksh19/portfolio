import React from 'react';
import { Globe, Code } from 'lucide-react';

const TimelineItem = ({ role, org, desc, year }) => (
  <div className="relative pl-8 border-l border-white/10 hover:border-cyan-500 transition-colors group">
    <div className="absolute -left-[5px] top-0 w-2.5 h-2.5 bg-[#050505] border border-slate-500 group-hover:border-cyan-500 rounded-full transition-colors"></div>
    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-baseline mb-2"><h3 className="text-xl font-bold text-slate-200 group-hover:text-cyan-400 transition-colors">{role}</h3><span className="text-sm font-mono text-slate-500 bg-white/5 px-2 py-1 rounded">{year}</span></div>
    <p className="text-purple-400 font-medium mb-2 text-sm">{org}</p>
    <p className="text-slate-400 leading-relaxed max-w-2xl">{desc}</p>
  </div>
);

const EducationCard = ({ school, degree, year, score }) => (
  <div className="bg-white/[0.02] border border-white/5 p-6 rounded-xl hover:bg-white/[0.04] transition-colors flex justify-between items-center">
    <div><h3 className="text-lg font-bold text-white">{school}</h3><p className="text-slate-400 text-sm">{degree}</p></div>
    <div className="text-right"><p className="text-cyan-400 font-mono text-sm">{year}</p><p className="text-slate-500 text-xs mt-1">{score}</p></div>
  </div>
);

const Experience = () => {
  return (
    <>
      <section id="experience" className="py-32 px-6 relative z-10">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold mb-12 flex items-center gap-3"><Globe className="text-cyan-500" /> Leadership Journey</h2>
          <div className="space-y-12">
            <TimelineItem role="Designing Lead" org="Tech Fest" desc="Spearheaded the visual design and branding strategies for the college fest." year="2024" />
            <TimelineItem role="Media Lead" org="Xplore Coding Club" desc="Contributed to the execution and marketing of coding competitions." year="2023" />
            <TimelineItem role="Designing Lead" org="Student Media Cell" desc="Produced high-impact visual content to support marketing campaigns." year="2023" />
          </div>
        </div>
      </section>

      <section className="py-20 px-6 relative z-10">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold mb-12 flex items-center gap-3"><Code className="text-purple-500" /> Education</h2>
          <div className="grid gap-6">
            <EducationCard school="XIM University" degree="B.Tech in CSE" year="2023 – 2027" score="CGPA: 7.43" />
            <EducationCard school="Future Bhubaneswar School" degree="Class XII" year="2023" score="81.00%" />
            <EducationCard school="ODM Public School" degree="Class X" year="2021" score="88.00%" />
          </div>
        </div>
      </section>
    </>
  );
};

export default Experience;