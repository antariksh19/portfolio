import React, { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { metrics as metricsConfig } from '../content/profile';
import { getTechnologyCount } from '../content/skills';

const AnimatedCounter = ({ value, suffix = '' }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!inView) return undefined;

    const duration = 1400;
    const start = performance.now();

    const tick = (now) => {
      const t = Math.min((now - start) / duration, 1);
      const eased = 1 - (1 - t) ** 3;
      setCount(Math.round(eased * value));
      if (t < 1) requestAnimationFrame(tick);
    };

    requestAnimationFrame(tick);
    return undefined;
  }, [inView, value]);

  return (
    <span ref={ref} className="tabular-nums">
      {count}
      {suffix}
    </span>
  );
};

const METRIC_ITEMS = [
  { key: 'projectsBuilt', getValue: () => metricsConfig.projectsBuilt },
  { key: 'leetcodeProblems', getValue: () => metricsConfig.leetcodeProblems },
  { key: 'yearsCoding', getValue: () => metricsConfig.yearsCoding },
  {
    key: 'technologiesUsed',
    getValue: () => ({
      value: getTechnologyCount(),
      suffix: '+',
      label: metricsConfig.technologiesUsed.label,
    }),
  },
];

const Metrics = () => {
  return (
    <section
      id="metrics"
      className="py-20 px-6 relative z-10 border-y border-white/5 bg-black/20 backdrop-blur-sm"
      aria-labelledby="metrics-heading"
    >
      <div className="max-w-6xl mx-auto">
        <motion.header
          className="mb-12 text-center sm:text-left"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 id="metrics-heading" className="text-3xl font-bold mb-3">
            Engineering <span className="text-cyan-500">Metrics</span>
          </h2>
          <p className="text-slate-400 max-w-2xl">
            Quantified delivery—products shipped, practice depth, and breadth across the stack.
          </p>
        </motion.header>

        <div
          className="grid grid-cols-2 lg:grid-cols-4 gap-6"
          role="list"
          aria-label="Engineering metrics"
        >
          {METRIC_ITEMS.map(({ key, getValue }, index) => {
            const { value, suffix, label } = getValue();
            return (
              <motion.div
                key={key}
                role="listitem"
                className="group relative rounded-2xl border border-white/10 bg-white/[0.03] p-6 sm:p-8 text-center backdrop-blur-md hover:border-cyan-500/30 transition-colors"
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.08, duration: 0.5 }}
              >
                <div
                  className="absolute inset-0 rounded-2xl bg-gradient-to-br from-cyan-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"
                  aria-hidden
                />
                <p className="text-3xl sm:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500 mb-2">
                  <AnimatedCounter value={value} suffix={suffix} />
                </p>
                <p className="text-sm text-slate-500 group-hover:text-slate-400 transition-colors">{label}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Metrics;
