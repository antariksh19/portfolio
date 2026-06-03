import React from 'react';

const highlights = [
  "250+ LeetCode Problems",
  "15+ Projects Built",
  "4+ Years Coding",
  "AI Applications",
  "Cloud Infrastructure",
  "Mobile Development"
];

const Highlights = () => {
  return (
    <section className="py-24 px-6 relative z-10">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl font-bold mb-12">
          Engineering Highlights
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {highlights.map((item) => (
            <div
              key={item}
              className="bg-white/5 border border-white/10 rounded-xl p-6 text-center backdrop-blur-sm"
            >
              {item}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Highlights;