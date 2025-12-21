import { motion } from 'framer-motion';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { ArrowRight } from 'lucide-react';
import aboutHeroBg from '../assets/about-page.jpg';
import europeArmor from '../assets/europe-armor.jpg';
import asiaArmor from '../assets/asia-armor.jpg';
import middleEastArmor from '../assets/middleeast-armor.jpg';

const AboutPage = () => {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      {/* SECTION 1 - HERO: Full-width image with text overlay */}
      <section className="relative h-screen w-full overflow-hidden">
        {/* Full-bleed background image */}
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${aboutHeroBg})` }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/60" />
        </div>

        {/* Text overlays - NO background boxes */}
        <div className="relative z-10 h-full flex flex-col justify-between px-8 md:px-16 py-12">
          {/* Top tagline */}
          <motion.div
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3 }}
            className="text-center"
          >
            <p className="text-white text-xl md:text-2xl font-light tracking-[0.3em] uppercase">
              Parallel Past
            </p>
          </motion.div>

          {/* Bottom headline - lower third */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.6 }}
            className="pb-16"
          >
            <h1 className="text-white text-6xl md:text-8xl lg:text-9xl font-heading leading-none tracking-tight">
              Three Worlds.<br />
              One Timeline.
            </h1>
            <p className="text-white/90 text-xl md:text-2xl font-light mt-6 max-w-2xl">
              History doesn't happen in isolation. See what warriors across Europe, Asia, 
              and the Middle East were wearing at the exact same moment in time.
            </p>
          </motion.div>
        </div>
      </section>

      {/* SECTION 2 - TIMELINE: 4-column horizontal layout */}
      <section className="w-full bg-sage-light py-20 md:py-32">
        <div className="max-w-7xl mx-auto px-8 md:px-16">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
            {[
              { number: '1500', text: 'Golden Age begins' },
              { number: '1750', text: 'Age of Empires' },
              { number: '1900', text: 'Modern era dawns' },
              { number: '470K+', text: 'Museum artifacts' }
            ].map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1, duration: 0.6 }}
                className="text-center"
              >
                <div className="text-5xl md:text-7xl font-heading text-prussian mb-4">
                  {item.number}
                </div>
                <p className="text-sm md:text-base text-gold uppercase tracking-wider font-light">
                  {item.text}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 3 - BRAND STORY: 50/50 split with text + full-bleed image */}
      <section className="w-full">
        <div className="grid md:grid-cols-2">
          {/* Left: Solid background with large headline */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="bg-prussian flex items-center justify-center px-8 md:px-16 py-24 md:py-32"
          >
            <div className="max-w-xl">
              <h2 className="text-5xl md:text-7xl lg:text-8xl font-heading text-white leading-none mb-8">
                History.<br />
                Aligned.
              </h2>
              <p className="text-white/80 text-lg md:text-xl font-light leading-relaxed">
                Weaponry drives technology. Arms and armor reveal the priorities of civilizations—
                mobility vs. protection, intimidation vs. elegance, individual combat vs. formation warfare.
              </p>
            </div>
          </motion.div>

          {/* Right: Full-bleed image with corner accent */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="relative h-[500px] md:h-auto"
          >
            <img
              src={europeArmor}
              alt="European armor"
              className="w-full h-full object-cover"
            />
            {/* Decorative corner ribbon */}
            <div className="absolute top-0 right-0 bg-gold text-white px-6 py-3 text-sm font-heading tracking-wider">
              EUROPE
            </div>
          </motion.div>
        </div>
      </section>

      {/* SECTION 4 - FEATURE HIGHLIGHTS: Modular alternating image-text blocks */}
      <section className="w-full bg-white py-20 md:py-32">
        <div className="max-w-7xl mx-auto px-8 md:px-16">
          {/* Feature 1: Image Left, Text Right */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="grid md:grid-cols-2 gap-12 md:gap-16 items-center mb-24 md:mb-32"
          >
            <div className="relative h-[400px] md:h-[500px]">
              <img
                src={asiaArmor}
                alt="Asian armor"
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-0 left-0 bg-prussian text-white px-6 py-3 text-sm font-heading tracking-wider">
                ASIA
              </div>
            </div>
            <div>
              <h3 className="text-4xl md:text-6xl font-heading text-prussian mb-6 leading-tight">
                Samurai Warriors
              </h3>
              <p className="text-lg md:text-xl text-gold/80 font-light leading-relaxed mb-4">
                Japanese armor emphasized mobility and intimidation. The kabuto helmet's dramatic crests 
                signaled rank and clan affiliation on the battlefield.
              </p>
              <p className="text-base text-gold/70 font-light">
                Explore artifacts from the Edo Period and see how samurai culture shaped warfare aesthetics.
              </p>
            </div>
          </motion.div>

          {/* Decorative accent symbol */}
          <div className="flex justify-center mb-24 md:mb-32">
            <div className="w-12 h-1 bg-prussian"></div>
          </div>

          {/* Feature 2: Text Left, Image Right */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="grid md:grid-cols-2 gap-12 md:gap-16 items-center"
          >
            <div className="order-2 md:order-1">
              <h3 className="text-4xl md:text-6xl font-heading text-prussian mb-6 leading-tight">
                Ottoman Empire
              </h3>
              <p className="text-lg md:text-xl text-gold/80 font-light leading-relaxed mb-4">
                Middle Eastern armor balanced protection with desert climate demands. Intricate metalwork 
                showcased the empire's artistic mastery.
              </p>
              <p className="text-base text-gold/70 font-light">
                Discover how Ottoman soldiers combined functionality with elaborate decoration.
              </p>
            </div>
            <div className="relative h-[400px] md:h-[500px] order-1 md:order-2">
              <img
                src={middleEastArmor}
                alt="Middle Eastern armor"
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-0 right-0 bg-gold text-white px-6 py-3 text-sm font-heading tracking-wider">
                MIDDLE EAST
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* CLOSING CTA - Full-width editorial banner */}
      <section className="w-full bg-prussian py-24 md:py-40">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-5xl mx-auto px-8 md:px-16 text-center"
        >
          <h2 className="text-5xl md:text-7xl lg:text-8xl font-heading text-white mb-8 leading-none">
            Ready to<br />
            Explore?
          </h2>
          <p className="text-xl md:text-2xl text-white/70 font-light mb-12 max-w-2xl mx-auto">
            Step into the parallel timelines and see history unfold across three continents
          </p>
          <motion.a
            href="/dashboard"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
            className="inline-flex items-center gap-3 bg-white text-prussian font-heading text-lg md:text-xl px-12 md:px-16 py-5 md:py-6 transition-all hover:bg-sage-light"
          >
            Launch Dashboard
            <ArrowRight className="w-5 h-5" />
          </motion.a>
        </motion.div>
      </section>

      <Footer />
    </div>
  );
};

export default AboutPage;
