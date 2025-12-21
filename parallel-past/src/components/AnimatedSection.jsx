import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';

/**
 * Reusable AnimatedSection component with scroll-reveal animations
 * Handles fade-up and float-in effects as elements enter viewport
 */
const AnimatedSection = ({ 
  children, 
  className = "", 
  delay = 0,
  duration = 0.8,
  once = true 
}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { 
    once, 
    margin: "-100px" // Trigger animation slightly before element is visible
  });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{
        duration,
        delay,
        type: "spring",
        stiffness: 100,
        damping: 20
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export default AnimatedSection;
