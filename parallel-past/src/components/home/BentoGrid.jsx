import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import europeArmor from '../../assets/europe-armor.jpg';
import asiaArmor from '../../assets/asia-armor.jpg';

const BentoGrid = () => {
  return (
    <section className="bg-zinc-950 py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-12">
          <h2 className="text-white font-heading text-4xl md:text-5xl mb-4">Current Exhibition</h2>
          <div className="h-1 w-24 bg-white/20"></div>
        </div>

        {/* CSS Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-12 md:grid-rows-2 gap-4 h-auto md:h-[600px]">
          
          {/* BLOCK A: The Hero Shot (Tall Vertical) */}
          <div className="md:col-span-8 md:row-span-2 relative group overflow-hidden rounded-sm bg-zinc-900">
            <motion.div 
              className="w-full h-full"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.7, ease: "easeOut" }}
            >
              <img 
                src={europeArmor}
                alt="Full body armor"
                className="w-full h-full object-cover object-top opacity-80 group-hover:opacity-100 transition-opacity duration-500"
              />
            </motion.div>
            <div className="absolute bottom-0 left-0 p-8 z-10 bg-gradient-to-t from-black/90 to-transparent w-full">
              <span className="text-white/60 font-body text-sm tracking-widest uppercase mb-2 block">Highlight</span>
              <h3 className="text-white font-heading text-3xl md:text-4xl">Armor of Henry II</h3>
            </div>
          </div>

          {/* BLOCK B: The Detail (Wide Short) */}
          <div className="md:col-span-4 md:row-span-1 relative group overflow-hidden rounded-sm bg-zinc-900">
             <motion.div 
              className="w-full h-full"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.7, ease: "easeOut" }}
            >
              <img 
                src={asiaArmor}
                alt="Armor detail"
                className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-500"
              />
            </motion.div>
            <div className="absolute inset-0 p-6 flex flex-col justify-end bg-gradient-to-t from-black/80 to-transparent pointer-events-none">
              <h4 className="text-white font-heading text-xl">Intricate Craftsmanship</h4>
            </div>
          </div>

          {/* BLOCK C: The Call to Action (Solid Dark) */}
          <Link 
            to="/collections" 
            className="md:col-span-4 md:row-span-1 bg-zinc-900 border border-white/10 p-8 flex flex-col justify-center relative overflow-hidden group hover:bg-zinc-800 transition-colors duration-300"
          >
            <div className="relative z-10">
              <span className="text-red-500 font-bold tracking-widest text-xs uppercase mb-4 block">
                ● Now Showing
              </span>
              <h3 className="text-white font-heading text-3xl md:text-4xl leading-tight mb-8">
                THE AGE OF STEEL
              </h3>
              <span className="inline-flex items-center px-5 py-2 bg-white text-zinc-950 font-bold text-xs md:text-sm uppercase tracking-wider rounded-full group-hover:bg-red-600 group-hover:text-white transition-all duration-300 w-fit">
                Enter Exhibition
              </span>
            </div>
            {/* Background decoration */}
            <div className="absolute -right-10 -bottom-10 w-40 h-40 bg-white/5 rounded-full blur-3xl group-hover:bg-white/10 transition-all duration-500"></div>
          </Link>

        </div>
      </div>
    </section>
  );
};

export default BentoGrid;
