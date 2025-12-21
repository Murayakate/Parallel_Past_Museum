import { motion } from 'framer-motion';
import Header from '../components/Header';
import Footer from '../components/Footer';
import AnimatedSection from '../components/AnimatedSection';
import AnimatedText from '../components/AnimatedText';
import { Shield, Swords, Globe2, Zap } from 'lucide-react';

const AboutPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-sage via-white to-sage-light">
      <Header />
      
      {/* Hero Section with Parallax */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Animated Background Pattern */}
        <motion.div 
          className="absolute inset-0 opacity-20"
          initial={{ scale: 1.2 }}
          animate={{ scale: 1 }}
          transition={{ duration: 20, repeat: Infinity, repeatType: "reverse" }}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-prussian/10 via-transparent to-gold/10" />
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,rgba(145,0,41,0.05),transparent_50%)]" />
        </motion.div>

        {/* Hero Content */}
        <div className="relative z-10 max-w-6xl mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, type: "spring", stiffness: 100 }}
          >
            <h1 className="text-7xl md:text-9xl font-heading text-prussian mb-6 tracking-tight">
              <AnimatedText text="Three Worlds." delay={0.2} />
            </h1>
            <h1 className="text-7xl md:text-9xl font-heading text-gold mb-8 tracking-tight">
              <AnimatedText text="One Timeline." delay={0.8} />
            </h1>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.4, duration: 0.8 }}
            className="text-2xl md:text-3xl text-prussian/70 font-light tracking-widest uppercase"
          >
            Parallel Past
          </motion.p>

          {/* Scroll Indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2, duration: 1 }}
            className="absolute bottom-12 left-1/2 transform -translate-x-1/2"
          >
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="w-6 h-10 border-2 border-prussian/30 rounded-full flex items-start justify-center p-2"
            >
              <motion.div className="w-1.5 h-1.5 bg-prussian rounded-full" />
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* The Mission Section */}
      <AnimatedSection className="py-32 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            {/* Text Content */}
            <div>
              <h2 className="text-5xl md:text-6xl font-heading text-prussian mb-8">
                History, Aligned.
              </h2>
              <div className="space-y-6 text-lg text-gold/90 font-body leading-relaxed">
                <p>
                  History is often taught in silos—Europe in one chapter, Asia in another, 
                  the Middle East somewhere else entirely. We learn about the Renaissance, 
                  the Edo Period, and the Ottoman Empire as if they existed in separate universes.
                </p>
                <p>
                  But they didn't. They were happening <span className="text-prussian font-semibold">simultaneously</span>.
                </p>
                <p className="text-prussian font-medium text-xl">
                  Parallel Past visualizes history horizontally, not vertically. 
                  See what a French knight, a Japanese samurai, and a Persian warrior 
                  were wearing at the exact same moment in time.
                </p>
              </div>
            </div>

            {/* Interactive UI Mockup */}
            <motion.div
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300 }}
              className="relative"
            >
              <div className="bg-white/80 backdrop-blur-xl border-4 border-prussian/20 rounded-3xl p-8 shadow-2xl">
                <div className="space-y-4">
                  {/* Mock Timeline */}
                  <div className="flex items-center justify-between mb-6">
                    <div className="text-sm text-gold font-mono">1450 AD</div>
                    <div className="h-1 flex-1 mx-4 bg-gradient-to-r from-prussian via-gold to-prussian rounded-full" />
                    <div className="text-sm text-gold font-mono">1600 AD</div>
                  </div>
                  
                  {/* Mock Cards */}
                  {['Europe', 'Asia', 'Middle East'].map((region, idx) => (
                    <motion.div
                      key={region}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.1 }}
                      className="bg-sage-light border-2 border-prussian/20 rounded-xl p-4 hover:border-prussian/60 transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-gradient-to-br from-prussian/20 to-gold/20 rounded-lg flex items-center justify-center">
                          <Shield className="w-6 h-6 text-prussian" />
                        </div>
                        <div>
                          <div className="text-prussian font-heading text-sm">{region}</div>
                          <div className="text-gold text-xs">Armor • {1450 + idx * 20}</div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </AnimatedSection>

      {/* Current Focus Section */}
      <AnimatedSection className="py-32 px-4 bg-gradient-to-b from-transparent via-sage-dark/30 to-transparent">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-5xl md:text-6xl font-heading text-prussian mb-12">
            Beta Focus: Arms & Armor
          </h2>
          
          <div className="bg-white/80 backdrop-blur-xl border-4 border-prussian/20 rounded-3xl p-12 shadow-2xl">
            <div className="flex items-center justify-center mb-8">
              <Swords className="w-16 h-16 text-prussian" />
            </div>
            
            <div className="space-y-6 text-lg text-gold/90 font-body leading-relaxed">
              <p className="text-xl text-prussian font-medium">
                Why Arms & Armor?
              </p>
              <p>
                Weaponry drives technology. The need to protect and attack has shaped 
                metallurgy, engineering, and art across every civilization.
              </p>
              <p>
                Comparing a Knight's sallet to a Samurai's kabuto reveals the priorities 
                of civilizations—mobility vs. protection, intimidation vs. elegance, 
                individual combat vs. formation warfare.
              </p>
              
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="mt-8 inline-block bg-gradient-to-r from-prussian/10 to-gold/10 border-2 border-prussian/30 rounded-full px-8 py-3"
              >
                <p className="text-sm text-prussian font-mono flex items-center gap-2">
                  <Zap className="w-4 h-4" />
                  Powered by the Metropolitan Museum of Art Open Access API
                </p>
              </motion.div>
            </div>
          </div>
        </div>
      </AnimatedSection>

      {/* Tech Stack - Bento Grid */}
      <AnimatedSection className="py-32 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-5xl md:text-6xl font-heading text-prussian mb-16 text-center">
            The Tech Stack
          </h2>

          {/* Bento Grid Layout */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-fr">
            {/* React - Large Box */}
            <motion.div
              whileHover={{ scale: 1.02, rotateZ: 0.5 }}
              transition={{ type: "spring", stiffness: 300 }}
              className="md:col-span-2 bg-white/80 backdrop-blur-xl border-4 border-prussian/20 rounded-3xl p-8 hover:border-prussian/50 transition-all group"
            >
              <div className="flex items-start gap-4 mb-4">
                <div className="w-14 h-14 bg-gradient-to-br from-prussian/30 to-prussian/10 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Globe2 className="w-7 h-7 text-prussian" />
                </div>
                <div>
                  <h3 className="text-3xl font-heading text-prussian mb-2">React</h3>
                  <p className="text-gold text-sm font-mono">Component Library</p>
                </div>
              </div>
              <p className="text-gold/90 font-body text-lg leading-relaxed">
                Modular component architecture enables reusable UI elements across 
                the tri-region dashboard. Each artifact card, timeline slider, and 
                region column is an isolated, testable component.
              </p>
            </motion.div>

            {/* Zustand - Medium Box */}
            <motion.div
              whileHover={{ scale: 1.02, rotateZ: -0.5 }}
              transition={{ type: "spring", stiffness: 300 }}
              className="bg-white/80 backdrop-blur-xl border-4 border-gold/30 rounded-3xl p-8 hover:border-gold/60 transition-all group"
            >
              <div className="flex items-start gap-4 mb-4">
                <div className="w-14 h-14 bg-gradient-to-br from-gold/30 to-gold/10 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Zap className="w-7 h-7 text-gold" />
                </div>
                <div>
                  <h3 className="text-2xl font-heading text-prussian mb-2">Zustand</h3>
                  <p className="text-gold text-xs font-mono">State Management</p>
                </div>
              </div>
              <p className="text-gold/90 font-body leading-relaxed">
                Global state management for synchronizing three parallel timelines. 
                When you change the era, all three regions update simultaneously.
              </p>
            </motion.div>

            {/* Tailwind - Medium Box */}
            <motion.div
              whileHover={{ scale: 1.02, rotateZ: 0.5 }}
              transition={{ type: "spring", stiffness: 300 }}
              className="bg-white/80 backdrop-blur-xl border-4 border-prussian/20 rounded-3xl p-8 hover:border-prussian/50 transition-all group"
            >
              <div className="flex items-start gap-4 mb-4">
                <div className="w-14 h-14 bg-gradient-to-br from-prussian/20 to-gold/10 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Shield className="w-7 h-7 text-prussian" />
                </div>
                <div>
                  <h3 className="text-2xl font-heading text-prussian mb-2">Tailwind CSS</h3>
                  <p className="text-gold text-xs font-mono">Styling Framework</p>
                </div>
              </div>
              <p className="text-gold/90 font-body leading-relaxed">
                Responsive, mobile-first design system. From phone screens to 
                ultrawide monitors, the layout adapts fluidly.
              </p>
            </motion.div>

            {/* API Challenges - Large Box */}
            <motion.div
              whileHover={{ scale: 1.02, rotateZ: -0.5 }}
              transition={{ type: "spring", stiffness: 300 }}
              className="md:col-span-2 bg-white/80 backdrop-blur-xl border-4 border-prussian/20 rounded-3xl p-8 hover:border-prussian/50 transition-all group"
            >
              <div className="flex items-start gap-4 mb-4">
                <div className="w-14 h-14 bg-gradient-to-br from-prussian/30 to-gold/20 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Globe2 className="w-7 h-7 text-prussian" />
                </div>
                <div>
                  <h3 className="text-3xl font-heading text-prussian mb-2">API Challenges</h3>
                  <p className="text-gold text-sm font-mono">Data Engineering</p>
                </div>
              </div>
              <p className="text-gold/90 font-body text-lg leading-relaxed">
                Normalizing geolocated data from the Met Museum's 470,000+ object 
                collection. Filtering by department, date range, and geographic origin 
                while handling missing images and inconsistent metadata.
              </p>
            </motion.div>
          </div>
        </div>
      </AnimatedSection>

      {/* Closing CTA */}
      <AnimatedSection className="py-32 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="bg-white/80 backdrop-blur-xl border-4 border-prussian/30 rounded-3xl p-16 shadow-2xl"
          >
            <h2 className="text-4xl md:text-5xl font-heading text-prussian mb-6">
              Ready to Explore?
            </h2>
            <p className="text-xl text-gold/90 font-body mb-8">
              Step into the dashboard and see history unfold across three continents.
            </p>
            <motion.a
              href="/dashboard"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="inline-block bg-prussian hover:bg-prussian/90 text-white font-heading text-lg px-12 py-4 rounded-full shadow-lg transition-colors"
            >
              Launch Dashboard
            </motion.a>
          </motion.div>
        </div>
      </AnimatedSection>

      <Footer />
    </div>
  );
};

export default AboutPage;
