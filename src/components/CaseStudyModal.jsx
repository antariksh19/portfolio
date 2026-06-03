import React, { useCallback, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import {
  Bot,
  Lock,
  Smartphone,
  Database,
  ExternalLink,
  X,
  Github,
  Layers,
  Target,
  Wrench,
  TrendingUp,
  AlertTriangle,
  CheckCircle2,
  ImageIcon,
} from 'lucide-react';
import ArchitectureFlow from './ArchitectureFlow';

const ICONS = { Bot, Lock, Smartphone, Database };

const FOCUSABLE =
  'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])';

const CaseStudySection = ({ icon: Icon, title, children, id }) => (
  <div id={id}>
    <h4 className="flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-cyan-400 mb-3">
      <Icon size={16} aria-hidden />
      {title}
    </h4>
    {children}
  </div>
);

const BulletList = ({ items, bulletClass = 'text-cyan-500' }) => (
  <ul className="space-y-2">
    {items.map((item) => (
      <li key={item} className="flex gap-2 text-slate-300 text-sm sm:text-base leading-relaxed">
        <span className={`${bulletClass} mt-1.5 shrink-0`} aria-hidden>
          ▸
        </span>
        {item}
      </li>
    ))}
  </ul>
);

const ProjectGallery = ({ images, projectTitle }) => {
  if (!images?.length) return null;

  return (
    <CaseStudySection icon={ImageIcon} title="Project gallery" id="case-study-gallery">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4" role="list" aria-label={`${projectTitle} screenshots`}>
        {images.map((img) => (
          <figure
            key={img.id}
            role="listitem"
            className="rounded-xl border border-white/10 bg-gradient-to-br from-[#121212] to-[#0a0a0a] overflow-hidden"
          >
            {img.src ? (
              <img src={img.src} alt={img.alt} className="w-full aspect-video object-cover" loading="lazy" />
            ) : (
              <div
                className="aspect-video flex flex-col items-center justify-center gap-2 text-slate-500 border-b border-white/5"
                aria-label={img.alt}
              >
                <ImageIcon size={32} className="text-cyan-500/40" aria-hidden />
                <span className="text-xs font-mono uppercase tracking-widest">Screenshot placeholder</span>
              </div>
            )}
            {img.caption && (
              <figcaption className="px-3 py-2 text-xs text-slate-500">{img.caption}</figcaption>
            )}
          </figure>
        ))}
      </div>
    </CaseStudySection>
  );
};

const CaseStudyModal = ({ project, onClose }) => {
  const Icon = ICONS[project.icon] ?? Bot;
  const panelRef = useRef(null);
  const closeBtnRef = useRef(null);

  const handleKeyDown = useCallback(
    (e) => {
      if (e.key === 'Escape') {
        onClose();
        return;
      }
      if (e.key !== 'Tab' || !panelRef.current) return;

      const focusables = [...panelRef.current.querySelectorAll(FOCUSABLE)];
      if (!focusables.length) return;

      const first = focusables[0];
      const last = focusables[focusables.length - 1];

      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    },
    [onClose],
  );

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    closeBtnRef.current?.focus();

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = prev;
    };
  }, [handleKeyDown]);

  const titleId = `case-study-title-${project.id}`;
  const descId = `case-study-desc-${project.id}`;

  return (
    <motion.div
      className="fixed inset-0 z-[80] flex items-end sm:items-center justify-center p-0 sm:p-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      role="presentation"
    >
      <button
        type="button"
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        onClick={onClose}
        aria-label="Close case study dialog"
        tabIndex={-1}
      />

      <motion.div
        ref={panelRef}
        className="relative w-full sm:max-w-2xl max-h-[92vh] sm:max-h-[85vh] overflow-y-auto bg-[#0a0a0a] border border-white/10 rounded-t-2xl sm:rounded-2xl shadow-2xl shadow-cyan-500/10 focus:outline-none"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 24 }}
        transition={{ type: 'spring', damping: 28, stiffness: 320 }}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        aria-describedby={descId}
        tabIndex={-1}
      >
        <div className="h-40 sm:h-44 bg-gradient-to-br from-[#121212] to-[#1a1a1a] relative overflow-hidden border-b border-white/10">
          <div className="absolute inset-0 flex items-center justify-center opacity-50">
            <Icon size={72} className="text-cyan-500 drop-shadow-[0_0_20px_rgba(6,182,212,0.45)]" aria-hidden />
          </div>
          <div
            className="absolute inset-0 opacity-[0.08] bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:16px_16px]"
            aria-hidden
          />
          <button
            ref={closeBtnRef}
            type="button"
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full bg-black/50 border border-white/10 text-slate-400 hover:text-white hover:border-cyan-500/40 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500"
            aria-label="Close case study"
          >
            <X size={20} aria-hidden />
          </button>
        </div>

        <div className="p-6 sm:p-8 space-y-8">
          <header>
            <p className="text-xs font-mono uppercase tracking-widest text-purple-400 mb-2">Case study</p>
            <h3 id={titleId} className="text-2xl sm:text-3xl font-bold text-white mb-2">
              {project.title}
            </h3>
            <p id={descId} className="text-slate-400 leading-relaxed">
              {project.tagline}
            </p>
          </header>

          <CaseStudySection icon={Target} title="Problem">
            <p className="text-slate-300 leading-relaxed">{project.problem}</p>
          </CaseStudySection>

          <CaseStudySection icon={Wrench} title="Solution">
            <p className="text-slate-300 leading-relaxed">{project.solution}</p>
          </CaseStudySection>

          <CaseStudySection icon={Layers} title="Architecture">
            <div className="space-y-6">
              {project.systemFlow?.length > 0 && (
                <ArchitectureFlow steps={project.systemFlow} title={`${project.title} — system flow`} />
              )}
              {project.architecture?.length > 0 && (
              <ul className="space-y-2 pt-1 border-t border-white/5">
                {project.architecture.map((item) => (
                  <li key={item} className="flex gap-2 text-slate-300 text-sm sm:text-base leading-relaxed">
                    <span className="text-cyan-500 mt-1.5 shrink-0" aria-hidden>
                      ▸
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
              )}
            </div>
          </CaseStudySection>

          {project.challenges?.length > 0 && (
            <CaseStudySection icon={AlertTriangle} title="Challenges">
              <BulletList items={project.challenges} bulletClass="text-amber-400" />
            </CaseStudySection>
          )}

          {project.outcomes?.length > 0 && (
            <CaseStudySection icon={CheckCircle2} title="Outcomes">
              <BulletList items={project.outcomes} bulletClass="text-emerald-400" />
            </CaseStudySection>
          )}

          <CaseStudySection icon={TrendingUp} title="Impact">
            <BulletList items={project.impact} bulletClass="text-purple-400" />
          </CaseStudySection>

          <ProjectGallery images={project.images} projectTitle={project.title} />

          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-slate-500 mb-3">Technologies</h4>
            <div className="flex flex-wrap gap-2" role="list" aria-label="Project technologies">
              {project.tech.map((t) => (
                <span
                  key={t}
                  role="listitem"
                  className="px-3 py-1 bg-white/5 text-cyan-200 text-xs font-medium rounded-full border border-white/10"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 pt-2 border-t border-white/10">
            {project.demo && (
              <a
                href={project.demo}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-cyan-500 text-black font-semibold hover:bg-cyan-400 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0a0a0a]"
              >
                {project.github && project.demo === project.github ? 'View on GitHub' : 'Live product'}
                <ExternalLink size={18} aria-hidden />
              </a>
            )}
            {project.github && project.github !== project.demo && (
              <a
                href={project.github}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl border border-white/10 text-white font-medium hover:border-cyan-500/40 hover:bg-white/5 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500"
              >
                Source <Github size={18} aria-hidden />
              </a>
            )}
            <button
              type="button"
              onClick={onClose}
              className="inline-flex items-center justify-center px-5 py-3 rounded-xl text-slate-400 hover:text-white transition-colors sm:ml-auto focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500"
            >
              Close
            </button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default React.memo(CaseStudyModal);
