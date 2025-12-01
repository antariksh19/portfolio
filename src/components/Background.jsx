import React, { useState, useEffect } from 'react';

const Background = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => setMousePosition({ x: e.clientX, y: e.clientY });
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
      <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-purple-600/20 rounded-full blur-[120px] animate-pulse"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-cyan-600/20 rounded-full blur-[120px] animate-pulse delay-1000"></div>
      <div 
        className="absolute w-[400px] h-[400px] bg-blue-500/10 rounded-full blur-[100px] transition-transform duration-100 ease-out will-change-transform"
        style={{ left: mousePosition.x - 200, top: mousePosition.y - 200 }}
      />
      <div 
        className="absolute inset-0 opacity-[0.05]"
        style={{
          backgroundImage: `linear-gradient(#00f2ff 1px, transparent 1px), linear-gradient(90deg, #00f2ff 1px, transparent 1px)`,
          backgroundSize: '40px 40px',
          transform: 'perspective(500px) rotateX(60deg) translateY(-100px) scale(2)',
        }}
      />
    </div>
  );
};

export default Background;