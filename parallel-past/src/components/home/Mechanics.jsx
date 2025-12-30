import React from 'react';
import { motion } from 'framer-motion';

const Mechanics = () => {
  const steps = [
    {
      number: "01",
      title: "EXPLORE",
      description: "The Unified Archive. Instant access to the 490,000+ item collection."
    },
    {
      number: "02", 
      title: "COMPARE",
      description: "Side-by-Side View. Juxtapose distinct cultures in the same era."
    },
    {
      number: "03",
      title: "CURATE", 
      description: "Guided Exhibitions. Experience hand-picked thematic journeys."
    }
  ];

  return (
    <section className="bg-[#F9F8F4] py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-16 md:gap-12">
          {steps.map((step, index) => (
            <motion.div 
              key={index} 
              className="relative text-center group"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              viewport={{ once: true }}
            >
              {/* Background Number */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <span className="text-[8rem] md:text-[10rem] font-bold text-prussian/5 font-heading leading-none select-none">
                  {step.number}
                </span>
              </div>
              
              {/* Content */}
              <div className="relative z-10">
                <h3 className="font-heading text-2xl md:text-3xl text-prussian font-bold mb-4 tracking-tight">
                  {step.title}
                </h3>
                <p className="font-body text-gray-600 leading-relaxed max-w-xs mx-auto">
                  {step.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Mechanics;
