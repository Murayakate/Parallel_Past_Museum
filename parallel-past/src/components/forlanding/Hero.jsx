import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import heroImage1 from '../../assets/hero-image-1.webp';
import heroImage2 from '../../assets/hero-image-2.webp';

const Hero = () => {
  return (
    <section className="max-w-7xl mx-auto mb-12 px-4">
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, type: "spring", stiffness: 100 }}
        className="bg-sage-dark rounded-2xl overflow-hidden border-4 border-prussian"
      >
        <div className="flex flex-col md:flex-row">

          {/* LEFT SIDE - Text */}
          <div className="w-full md:w-2/5 px-6 py-10 md:p-16 flex flex-col justify-center text-center md:text-left">
            <motion.h2 
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3, duration: 0.8, type: "spring" }}
              className="text-3xl sm:text-4xl md:text-5xl font-heading text-prussian mb-6 md:mb-8"
            >
              Explore History.<br />
              Side by Side.
            </motion.h2>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.8 }}
            >
              <Link 
                to="/dashboard" 
                className="bg-gold hover:bg-gold-hover text-white font-bold text-base sm:text-lg py-3 sm:py-4 px-8 sm:px-10 rounded-full w-full sm:w-fit inline-flex items-center justify-center transition-all hover:scale-105 active:scale-95"
              >
                START EXPLORING
              </Link>
            </motion.div>
          </div>

          {/* RIGHT SIDE - Two Images */}
          <div className="w-full md:w-3/5 flex flex-col md:flex-row">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="flex-1 bg-gray-800 flex items-center justify-center overflow-hidden"
            >
              <motion.img 
                src={heroImage1} 
                alt="hero image 1" 
                className="w-full h-auto object-cover"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
              />
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="flex-1 bg-gray-700 flex items-center justify-center overflow-hidden"
            >
              <motion.img 
                src={heroImage2} 
                alt="hero image 2" 
                className="w-full h-auto object-cover"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
              />
            </motion.div>
          </div>

        </div>
      </motion.div>
    </section>
  );
};

export default Hero;