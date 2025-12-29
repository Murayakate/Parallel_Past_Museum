import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import westLoopMp4 from '../../assets/videos/west-loop.mp4';
import eastLoopMp4 from '../../assets/videos/east-loop.mp4';
import westPoster from '../../assets/images/west-poster.jpg';
import eastPoster from '../../assets/images/east-poster.jpg';

const HeroSplit = () => {
  // State for the split position (percentage)
  const [splitPosition, setSplitPosition] = useState(50);
  const containerRef = useRef(null);

  // Handle mouse move to adjust split
  const handleMouseMove = (e) => {
    if (!containerRef.current) return;
    
    const { left, width } = containerRef.current.getBoundingClientRect();
    const x = e.clientX - left;
    
    // Calculate percentage (clamped between 20% and 80%)
    const percentage = (x / width) * 100;
    const clampedPercentage = Math.min(Math.max(percentage, 20), 80);
    
    setSplitPosition(clampedPercentage);
  };

  // Reset to 50/50 on mouse leave
  const handleMouseLeave = () => {
    setSplitPosition(50);
  };

  return (
    <section 
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative w-full h-screen overflow-hidden flex bg-black"
    >
      {/* LEFT VIDEO PANE (West) */}
      <div 
        className="relative h-full overflow-hidden transition-all duration-300 ease-out border-r border-white/10"
        style={{ width: `${splitPosition}%` }}
      >
        <div className="absolute inset-0 bg-black/40 z-10" /> {/* Overlay for text contrast */}
        <video
          className="object-cover w-full h-full absolute inset-0"
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          poster={westPoster}
        >
          {/* Primary source: WebM (Modern browsers) */}
          <source src="/videos/west-loop.webm" type="video/webm" />
          {/* Backup source: MP4 (Safari/Compatible) */}
          <source src={westLoopMp4} type="video/mp4" />
        </video>
        
        {/* Label for West/Left */}
        <div className="absolute bottom-10 left-10 z-20">
          <h3 className="text-white font-heading text-xl md:text-2xl tracking-widest uppercase opacity-80">
            The West
          </h3>
          <p className="text-white/60 font-body text-sm mt-1">Medieval Europe</p>
        </div>
      </div>

      {/* RIGHT VIDEO PANE (East) */}
      <div 
        className="relative h-full overflow-hidden transition-all duration-300 ease-out"
        style={{ width: `${100 - splitPosition}%` }}
      >
        <div className="absolute inset-0 bg-black/40 z-10" />
        <video
          className="object-cover w-full h-full absolute inset-0"
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          poster={eastPoster}
        >
          {/* Primary source: WebM (Modern browsers) */}
          <source src="/videos/east-loop.webm" type="video/webm" />
          {/* Backup source: MP4 (Safari/Compatible) */}
          <source src={eastLoopMp4} type="video/mp4" />
        </video>
        
        {/* Label for East/Right */}
        <div className="absolute bottom-10 right-10 z-20 text-right">
          <h3 className="text-white font-heading text-xl md:text-2xl tracking-widest uppercase opacity-80">
            The East
          </h3>
          <p className="text-white/60 font-body text-sm mt-1">Feudal Japan</p>
        </div>
      </div>

      {/* CENTER TITLE OVERLAY */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-30 mix-blend-difference">
        <h1 className="text-white font-heading text-4xl md:text-6xl lg:text-7xl tracking-tighter text-center leading-none">
          EXPLORE HISTORY<br />SIDE BY SIDE
        </h1>
      </div>

      {/* Scroll Indicator */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-30 pointer-events-none"
      >
        <div className="w-[1px] h-16 bg-white/50" />
      </motion.div>
    </section>
  );
};

export default HeroSplit;
