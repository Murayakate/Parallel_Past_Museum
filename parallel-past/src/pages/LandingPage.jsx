import Header from '../components/general/Header';
import Footer from '../components/general/Footer';
import HeroSplit from '../components/home/HeroSplit';
import MissionStatement from '../components/home/MissionStatement';
import Mechanics from '../components/home/Mechanics';
import BentoGrid from '../components/home/BentoGrid';
import DataVisualizer from '../components/home/DataVisualizer';
import InfiniteMarquee from '../components/home/InfiniteMarquee';

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header needs to be transparent or overlay for the cinematic effect */}
      <div className="fixed top-0 left-0 right-0 z-50">
        <Header />
      </div>
      
      <main className="relative">
        {/* Hero Section */}
        <HeroSplit />
        
        {/* New Section 1: Mission Statement */}
        <MissionStatement />
        
        {/* New Section 2: The Mechanics */}
        <Mechanics />
        
        {/* Current Exhibition */}
        <BentoGrid />
        
        {/* New Section 3: Data Visualizer */}
        <DataVisualizer />
        
        {/* Infinite Marquee */}
        <InfiniteMarquee />
      </main>
      
      <Footer />
    </div>
  );
};

export default LandingPage;