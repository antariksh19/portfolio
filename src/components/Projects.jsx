import React, { memo, useCallback, useState } from 'react';

import { AnimatePresence } from 'framer-motion';

import { Tilt } from 'react-tilt';

import {

  Bot,

  Lock,

  Smartphone,

  Database,

  ExternalLink,

  ArrowRight,

} from 'lucide-react';

import { featuredProjects, otherProjects } from '../content/projects';

import CaseStudyModal from './CaseStudyModal';



const ICONS = { Bot, Lock, Smartphone, Database };



const FeaturedProjectCard = memo(({ project, onOpenCaseStudy }) => {

  const Icon = ICONS[project.icon] ?? Bot;



  return (

    <Tilt options={{ max: 4, scale: 1.01, glare: true, 'max-glare': 0.25 }} className="h-full">

      <article className="h-full bg-[#0a0a0a] border border-white/10 rounded-2xl overflow-hidden hover:border-cyan-500/30 transition-all group flex flex-col backdrop-blur-md relative">

        <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />



        <div className="h-40 sm:h-48 bg-gradient-to-br from-[#121212] to-[#1a1a1a] relative overflow-hidden z-10">

          <div className="absolute inset-0 flex items-center justify-center opacity-40 group-hover:opacity-90 transition-opacity duration-500 transform group-hover:scale-105">

            <Icon size={56} className="text-cyan-500 drop-shadow-[0_0_15px_rgba(6,182,212,0.5)]" aria-hidden />

          </div>

          <div

            className="absolute inset-0 opacity-[0.1] bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:16px_16px]"

            aria-hidden

          />

        </div>



        <div className="p-6 sm:p-8 flex-1 flex flex-col z-10">

          <p className="text-xs font-mono uppercase tracking-widest text-purple-400/90 mb-2">Featured product</p>

          <h3 className="text-xl sm:text-2xl font-bold text-white group-hover:text-cyan-400 transition-colors mb-2">

            {project.title}

          </h3>

          <p className="text-slate-300 text-sm sm:text-base mb-4 leading-relaxed">{project.tagline}</p>



          <div className="mb-4 rounded-xl bg-white/[0.03] border border-white/5 p-4">

            <p className="text-xs font-semibold uppercase tracking-wider text-slate-500 mb-1">Problem</p>

            <p className="text-slate-400 text-sm leading-relaxed line-clamp-3">{project.problem}</p>

          </div>



          <div className="flex flex-wrap gap-2 mb-6" role="list" aria-label={`${project.title} technologies`}>

            {project.tech.slice(0, 4).map((t) => (

              <span

                key={t}

                role="listitem"

                className="px-3 py-1 bg-white/5 text-cyan-200 text-xs font-medium rounded-full border border-white/10"

              >

                {t}

              </span>

            ))}

            {project.tech.length > 4 && (

              <span className="px-3 py-1 text-slate-500 text-xs font-medium">+{project.tech.length - 4}</span>

            )}

          </div>



          <div className="mt-auto flex flex-col sm:flex-row gap-3">

            <button

              type="button"

              onClick={() => onOpenCaseStudy(project)}

              className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white font-medium hover:border-cyan-500/50 hover:bg-cyan-500/10 transition-all group/btn focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500"

              aria-label={`View case study for ${project.title}`}

            >

              View Case Study

              <ArrowRight size={16} className="group-hover/btn:translate-x-0.5 transition-transform" aria-hidden />

            </button>

            {project.demo && (

              <a

                href={project.demo}

                target="_blank"

                rel="noreferrer"

                className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl text-slate-400 hover:text-white text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500"

              >

                Open product <ExternalLink size={16} aria-hidden />

              </a>

            )}

          </div>

        </div>

      </article>

    </Tilt>

  );

});

FeaturedProjectCard.displayName = 'FeaturedProjectCard';



const CompactProjectRow = memo(({ project, onOpenCaseStudy }) => {

  const Icon = ICONS[project.icon] ?? Database;



  return (

    <div className="flex flex-col sm:flex-row sm:items-center gap-4 p-5 sm:p-6 bg-[#0a0a0a] border border-white/10 rounded-2xl hover:border-cyan-500/20 transition-colors group">

      <div className="flex items-center gap-4 flex-1 min-w-0">

        <div className="shrink-0 w-12 h-12 rounded-xl bg-gradient-to-br from-[#121212] to-[#1a1a1a] border border-white/10 flex items-center justify-center">

          <Icon size={24} className="text-cyan-500" aria-hidden />

        </div>

        <div className="min-w-0">

          <h3 className="text-lg font-bold text-white group-hover:text-cyan-400 transition-colors truncate">

            {project.title}

          </h3>

          <p className="text-slate-400 text-sm line-clamp-2">{project.tagline}</p>

        </div>

      </div>

      <div className="flex gap-3 shrink-0">

        <button

          type="button"

          onClick={() => onOpenCaseStudy(project)}

          className="flex-1 sm:flex-none px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-sm font-medium text-white hover:border-cyan-500/40 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500"

          aria-label={`View case study for ${project.title}`}

        >

          View Case Study

        </button>

        {project.demo && (

          <a

            href={project.demo}

            target="_blank"

            rel="noreferrer"

            className="p-2 rounded-xl border border-white/10 text-slate-500 hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500"

            aria-label={`Open ${project.title} live demo`}

          >

            <ExternalLink size={18} aria-hidden />

          </a>

        )}

      </div>

    </div>

  );

});

CompactProjectRow.displayName = 'CompactProjectRow';



const Projects = () => {

  const [activeProject, setActiveProject] = useState(null);



  const openCaseStudy = useCallback((project) => setActiveProject(project), []);

  const closeCaseStudy = useCallback(() => setActiveProject(null), []);



  return (

    <section

      id="projects"

      className="py-32 px-6 bg-black/30 border-y border-white/5 relative z-10 backdrop-blur-sm"

      aria-labelledby="projects-heading"

    >

      <div className="max-w-6xl mx-auto">

        <header className="mb-12 sm:mb-16 max-w-3xl">

          <h2 id="projects-heading" className="text-4xl font-bold mb-4">

            Featured <span className="text-cyan-500">Products</span>

          </h2>

          <p className="text-slate-400 leading-relaxed text-base sm:text-lg">

            Engineering case studies—how each product solves a real problem, how it was architected, and the impact it

            delivers. Not assignment write-ups; shipped systems with clear trade-offs.

          </p>

        </header>



        <div className="grid md:grid-cols-2 gap-8 mb-16">

          {featuredProjects.map((project) => (

            <FeaturedProjectCard key={project.id} project={project} onOpenCaseStudy={openCaseStudy} />

          ))}

        </div>



        {otherProjects.length > 0 && (

          <div>

            <h3 className="text-xl font-bold text-slate-200 mb-6 flex items-center gap-2">

              More engineering work

            </h3>

            <div className="space-y-4">

              {otherProjects.map((project) => (

                <CompactProjectRow key={project.id} project={project} onOpenCaseStudy={openCaseStudy} />

              ))}

            </div>

          </div>

        )}

      </div>



      <AnimatePresence>

        {activeProject && <CaseStudyModal project={activeProject} onClose={closeCaseStudy} />}

      </AnimatePresence>

    </section>

  );

};



export default Projects;


