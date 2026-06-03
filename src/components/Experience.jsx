import React, { memo } from 'react';
import { Globe, Code, Award, Briefcase } from 'lucide-react';
import {
  workExperience,
  leadership,
  education,
  certifications,
} from '../content/experience';

const TimelineItem = memo(({ role, org, desc, period }) => (
  <div className="relative pl-8 border-l border-white/10 hover:border-cyan-500 transition-colors group">
    <div
      className="absolute -left-[5px] top-0 w-2.5 h-2.5 bg-[#050505] border border-slate-500 group-hover:border-cyan-500 rounded-full transition-colors"
      aria-hidden
    />
    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-baseline mb-2">
      <h3 className="text-xl font-bold text-slate-200 group-hover:text-cyan-400 transition-colors">{role}</h3>
      <span className="text-sm font-mono text-slate-500 bg-white/5 px-2 py-1 rounded">{period}</span>
    </div>
    <p className="text-purple-400 font-medium mb-2 text-sm">{org}</p>
    <p className="text-slate-400 leading-relaxed max-w-2xl">{desc}</p>
  </div>
));
TimelineItem.displayName = 'TimelineItem';

const EducationCard = memo(({ school, degree, period, score }) => (
  <div className="bg-white/[0.02] border border-white/5 p-6 rounded-xl hover:bg-white/[0.04] transition-colors flex justify-between items-center gap-4">
    <div>
      <h3 className="text-lg font-bold text-white">{school}</h3>
      <p className="text-slate-400 text-sm">{degree}</p>
    </div>
    <div className="text-right shrink-0">
      <p className="text-cyan-400 font-mono text-sm">{period}</p>
      <p className="text-slate-500 text-xs mt-1">{score}</p>
    </div>
  </div>
));
EducationCard.displayName = 'EducationCard';

const Experience = () => {
  return (
    <>
      <section id="experience" className="py-32 px-6 relative z-10" aria-labelledby="experience-heading">
        <div className="max-w-4xl mx-auto">
          <h2 id="experience-heading" className="text-3xl font-bold mb-12 flex items-center gap-3">
            <Briefcase className="text-cyan-500" aria-hidden /> Work Experience
          </h2>
          <div className="space-y-12 mb-20">
            {workExperience.map((item) => (
              <TimelineItem
                key={item.id}
                role={item.role}
                org={item.org}
                desc={item.description}
                period={item.period}
              />
            ))}
          </div>

          <h2 className="text-3xl font-bold mb-12 flex items-center gap-3">
            <Globe className="text-purple-500" aria-hidden /> Leadership
          </h2>
          <div className="space-y-12">
            {leadership.map((item) => (
              <TimelineItem
                key={item.id}
                role={item.role}
                org={item.org}
                desc={item.description}
                period={item.period}
              />
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 px-6 bg-black/30 border-t border-white/5 relative z-10" aria-labelledby="education-heading">
        <div className="max-w-4xl mx-auto">
          <h2 id="education-heading" className="text-3xl font-bold mb-12 flex items-center gap-3">
            <Code className="text-cyan-500" aria-hidden /> Education
          </h2>
          <div className="grid gap-6">
            {education.map((item) => (
              <EducationCard
                key={item.id}
                school={item.school}
                degree={item.degree}
                period={item.period}
                score={item.score}
              />
            ))}
          </div>

          <div className="mt-12">
            <h2 className="text-xl font-bold mb-6 flex items-center gap-3">
              <Award className="text-yellow-500" aria-hidden /> Certifications
            </h2>
            <div className="grid md:grid-cols-2 gap-4" role="list">
              {certifications.map((cert) => (
                <a
                  key={cert.id}
                  href={cert.url}
                  target="_blank"
                  rel="noreferrer"
                  role="listitem"
                  className="block p-4 border border-white/10 rounded-xl bg-white/[0.02] hover:bg-white/[0.05] hover:border-cyan-500/50 transition-all group cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500"
                  aria-label={`View certificate: ${cert.title} from ${cert.issuer}`}
                >
                  <span className="text-white font-bold block mb-1 group-hover:text-cyan-400 transition-colors">
                    {cert.title}
                  </span>
                  <span className="text-slate-500 text-sm">{cert.issuer}</span>
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Experience;
