import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const Preloader = ({ onComplete }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCount((prev) => {
        if (prev === 100) {
          clearInterval(interval);
          setTimeout(onComplete, 500);
          return 100;
        }
        return prev + 1;
      });
    }, 20);
    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <motion.div
      className="fixed inset-0 z-[100] bg-[#050505] flex flex-col items-center justify-center font-mono text-cyan-500"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, y: -50 }}
      transition={{ duration: 0.5 }}
    >
      <div className="mb-4 text-4xl font-bold tracking-tighter">{count}%</div>
      <div className="w-64 h-1 bg-white/10 rounded-full overflow-hidden">
        <motion.div className="h-full bg-cyan-500" initial={{ width: 0 }} animate={{ width: `${count}%` }} />
      </div>
      <div className="mt-4 text-xs text-slate-500">INITIALIZING SYSTEM...</div>
    </motion.div>
  );
};

export default Preloader;