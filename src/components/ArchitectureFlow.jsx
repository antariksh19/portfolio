import React from 'react';
import { motion } from 'framer-motion';
import {
  User,
  Monitor,
  Server,
  Database,
  Sparkles,
  Rocket,
  Shield,
  Image,
  Smartphone,
  KeyRound,
  Bell,
  ChevronDown,
  ChevronRight,
} from 'lucide-react';

const LAYER_ICONS = {
  user: User,
  frontend: Monitor,
  mobile: Smartphone,
  api: Server,
  backend: Server,
  database: Database,
  ai: Sparkles,
  deploy: Rocket,
  crypto: Shield,
  steganography: Image,
  auth: KeyRound,
  notifications: Bell,
};

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.1, delayChildren: 0.08 },
  },
};

const nodeVariants = {
  hidden: { opacity: 0, y: 20, scale: 0.96 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { type: 'spring', damping: 26, stiffness: 300 },
  },
};

const arrowVariants = {
  hidden: { opacity: 0, scale: 0.6 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { type: 'spring', damping: 22, stiffness: 340 },
  },
};

const FlowArrowVertical = () => (
  <div className="flex flex-col items-center py-1.5 shrink-0" aria-hidden>
    <div className="w-px h-4 bg-gradient-to-b from-cyan-500/50 via-cyan-500/20 to-transparent" />
    <ChevronDown size={18} className="text-cyan-400/90 -mt-0.5" strokeWidth={2.5} />
  </div>
);

const FlowArrowHorizontal = () => (
  <div className="flex items-center justify-center px-1.5 sm:px-2 shrink-0" aria-hidden>
    <div className="h-px w-3 sm:w-5 bg-gradient-to-r from-transparent via-cyan-500/35 to-cyan-500/60" />
    <ChevronRight size={18} className="text-cyan-400/90 -ml-0.5" strokeWidth={2.5} />
  </div>
);

const FlowNode = ({ step, index, total }) => {
  const Icon = LAYER_ICONS[step.icon] ?? Server;
  const isEndpoint = index === 0 || index === total - 1;

  return (
    <article
      className={[
        'relative w-full rounded-xl border px-3.5 py-3 sm:px-4 sm:py-3.5',
        'bg-gradient-to-br from-white/[0.08] to-white/[0.02]',
        'shadow-[inset_0_1px_0_0_rgba(255,255,255,0.07)]',
        'transition-colors duration-200',
        isEndpoint
          ? 'border-cyan-500/30 shadow-[0_0_24px_-8px_rgba(6,182,212,0.35)]'
          : 'border-white/10 hover:border-cyan-500/25',
      ].join(' ')}
    >
      <div className="flex flex-col items-center text-center gap-2.5 sm:gap-3 md:gap-2">
        <div
          className={[
            'flex items-center justify-center w-10 h-10 sm:w-11 sm:h-11 rounded-xl border',
            isEndpoint
              ? 'bg-cyan-500/15 border-cyan-500/35 text-cyan-400 shadow-[0_0_12px_-2px_rgba(6,182,212,0.4)]'
              : 'bg-white/5 border-white/10 text-slate-300',
          ].join(' ')}
          aria-hidden
        >
          <Icon size={20} strokeWidth={1.75} />
        </div>
        <div className="min-w-0 w-full">
          <p className="text-sm font-semibold text-white tracking-tight leading-tight">{step.label}</p>
          {step.detail && (
            <p className="text-[11px] sm:text-xs text-slate-400 mt-1 leading-snug line-clamp-3 md:line-clamp-4">
              {step.detail}
            </p>
          )}
        </div>
        <span className="text-[10px] font-mono uppercase tracking-widest text-slate-600 tabular-nums">
          {String(index + 1).padStart(2, '0')}
        </span>
      </div>
    </article>
  );
};

const ArchitectureFlow = ({ steps, title = 'System flow' }) => {
  if (!steps?.length) return null;

  return (
    <figure className="w-full" aria-label={title}>
      <figcaption className="sr-only">{title}</figcaption>
      <div className="rounded-2xl border border-white/10 bg-[#080808]/90 p-4 sm:p-5 overflow-hidden">
        <p className="text-[10px] sm:text-xs font-mono uppercase tracking-widest text-slate-500 mb-4 text-center md:text-left">
          {title}
        </p>

        <motion.ol
          className="list-none p-0 m-0 flex flex-col items-stretch max-w-sm mx-auto md:max-w-none md:mx-0 md:flex-row md:items-center md:justify-center md:gap-0 md:overflow-x-auto md:pb-1 md:snap-x md:snap-mandatory [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          role="list"
        >
          {steps.map((step, index) => (
            <React.Fragment key={`${step.label}-${index}`}>
              <motion.li
                role="listitem"
                variants={nodeVariants}
                className="md:flex-1 md:min-w-[7.5rem] md:max-w-[10.5rem] lg:min-w-[8.25rem] lg:max-w-none md:snap-center shrink-0"
              >
                <FlowNode step={step} index={index} total={steps.length} />
              </motion.li>
              {index < steps.length - 1 && (
                <>
                  <motion.li
                    role="presentation"
                    variants={arrowVariants}
                    className="md:hidden list-none"
                    aria-hidden
                  >
                    <FlowArrowVertical />
                  </motion.li>
                  <motion.li
                    role="presentation"
                    variants={arrowVariants}
                    className="hidden md:list-item md:shrink-0"
                    aria-hidden
                  >
                    <FlowArrowHorizontal />
                  </motion.li>
                </>
              )}
            </React.Fragment>
          ))}
        </motion.ol>
      </div>
    </figure>
  );
};

export default ArchitectureFlow;
