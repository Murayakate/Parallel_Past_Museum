import React from 'react';
import { motion } from 'framer-motion';

const MissionStatement = () => {
  return (
    <section className="bg-black py-24 px-4 sm:px-6 lg:px-8 relative">
      {/* Vertical Line Connector */}
      <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-px bg-prussian/20"></div>
      
      <div className="max-w-4xl mx-auto text-center relative z-10">
        <h2 className="font-heading text-4xl md:text-6xl lg:text-7xl font-bold text-white uppercase tracking-tighter mb-8">
          HISTORY IS<br />SYNCHRONOUS
        </h2>
        <div className="w-24 h-1 bg-prussian/30 mx-auto mb-12"></div>
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          viewport={{ once: true }}
          className="font-body text-lg md:text-xl text-white max-w-2xl mx-auto leading-relaxed"
        >
          We believe history shouldn't be studied in isolation. By examining parallel developments across civilizations, 
          we uncover the universal patterns of human innovation, conflict, and creativity that connect us all.
        </motion.p>
      </div>
    </section>
  );
};

export default MissionStatement;
