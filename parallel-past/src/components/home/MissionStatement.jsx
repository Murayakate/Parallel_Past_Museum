import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import heroImage from '../../assets/images/hero-image-1.webp';

const MissionStatement = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], ["-20%", "20%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [0.6, 1, 0.6]);

  return (
    <section ref={ref} className="relative py-32 px-4 sm:px-6 lg:px-8 overflow-hidden min-h-[80vh] flex items-center justify-center">
      {/* Parallax Background Image */}
      <div className="absolute inset-0 z-0">
        <motion.div 
          style={{ y, scale: 1.1 }}
          className="w-full h-full"
        >
          <img 
            src={heroImage} 
            alt="Historical artifact detail" 
            className="w-full h-full object-cover opacity-40"
          />
        </motion.div>
        <div className="absolute inset-0 bg-gradient-to-b from-black via-black/80 to-black z-10" />
      </div>

      {/* Vertical Line Connector */}
      <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-px bg-prussian/30 z-20"></div>
      
      <div className="max-w-4xl mx-auto text-center relative z-30 mix-blend-screen">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="font-heading text-5xl md:text-7xl lg:text-8xl font-bold text-white uppercase tracking-tighter mb-8 leading-none">
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
