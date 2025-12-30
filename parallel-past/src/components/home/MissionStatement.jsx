import React, { useRef } from 'react';
import { motion } from 'framer-motion';

const MissionStatement = () => {
  const ref = useRef(null);

  return (
    <section ref={ref} className="relative py-24 sm:py-32 px-6 lg:px-8 overflow-hidden min-h-[60vh] md:min-h-[80vh] flex items-center justify-center bg-gradient-to-b from-gray-900 via-black to-black">
      {/* Vertical Line Connector */}
      <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-px bg-prussian/30 z-20"></div>
      
      <div className="max-w-4xl mx-auto text-center relative z-30 mix-blend-screen px-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="font-heading text-4xl md:text-7xl lg:text-8xl font-bold text-white uppercase tracking-tighter mb-8 leading-none">
            HISTORY IS<br />
            <motion.span 
              className="text-transparent bg-clip-text bg-gradient-to-r from-white via-white/80 to-white/50"
              animate={{ backgroundPosition: ["0%", "100%"] }}
              transition={{ duration: 5, repeat: Infinity, repeatType: "reverse" }}
            >
              SYNCHRONOUS
            </motion.span>
          </h2>
        </motion.div>
        
        <div className="w-32 h-1 bg-prussian/50 mx-auto mb-12 backdrop-blur-sm"></div>
        
        <motion.p 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          viewport={{ once: true }}
          className="font-body text-xl md:text-2xl text-white/90 max-w-3xl mx-auto leading-relaxed drop-shadow-lg"
        >
          We believe history shouldn't be studied in isolation. By examining parallel developments across civilizations, 
          we uncover the universal patterns of human innovation, conflict, and creativity that connect us all.
        </motion.p>
      </div>
    </section>
  );
};

export default MissionStatement;
