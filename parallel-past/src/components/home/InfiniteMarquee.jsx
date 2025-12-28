import React from 'react';
import { motion } from 'framer-motion';

const InfiniteMarquee = () => {
  const content = "COMING SOON • ANCIENT EGYPT • GRECO-ROMAN WORLD • THE VIKINGS • THE INDUSTRIAL AGE • COMING SOON • ANCIENT EGYPT • GRECO-ROMAN WORLD • THE VIKINGS • THE INDUSTRIAL AGE • ";

  return (
    <div className="bg-black py-6 overflow-hidden border-t border-white/10">
      <div className="relative flex whitespace-nowrap overflow-hidden">
        <motion.div
          animate={{ x: [0, -1000] }}
          transition={{
            x: {
              repeat: Infinity,
              repeatType: "loop",
              duration: 20,
              ease: "linear",
            },
          }}
          className="flex whitespace-nowrap"
        >
          <span className="text-4xl md:text-5xl font-heading font-bold text-white/20 uppercase tracking-tight mx-4">
            {content}
          </span>
          {/* Duplicate for seamless loop */}
          <span className="text-4xl md:text-5xl font-heading font-bold text-white/20 uppercase tracking-tight mx-4">
            {content}
          </span>
        </motion.div>
      </div>
    </div>
  );
};

export default InfiniteMarquee;
