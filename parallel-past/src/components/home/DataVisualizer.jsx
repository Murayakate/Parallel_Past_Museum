import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const DataVisualizer = () => {
  const [count, setCount] = useState(0);
  const targetCount = 490000;

  useEffect(() => {
    const duration = 2000; // 2 seconds
    const steps = 60; // 60 frames for smooth animation
    const increment = targetCount / steps;
    let current = 0;
    
    const timer = setInterval(() => {
      current += increment;
      if (current >= targetCount) {
        setCount(targetCount);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, duration / steps);

    return () => clearInterval(timer);
  }, []);

  const formatNumber = (num) => {
    return num.toLocaleString();
  };

  return (
    <section className="bg-black py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto text-center">
        <div className="mb-16">
          <div className="text-6xl md:text-7xl lg:text-8xl font-bold font-heading text-prussian mb-6">
            {formatNumber(count)}+
          </div>
          <div className="w-32 h-1 bg-prussian/30 mx-auto mb-8"></div>
          <h3 className="font-heading text-2xl md:text-3xl text-white uppercase tracking-wider">
            GLOBAL ARTIFACTS INDEXED
          </h3>
        </div>
        
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          viewport={{ once: true }}
          className="font-body text-white max-w-2xl mx-auto text-lg"
        >
          Every artifact in our collection has been digitally preserved, categorized, and made searchable 
          for historical comparison and discovery.
        </motion.p>
      </div>
    </section>
  );
};

export default DataVisualizer;
