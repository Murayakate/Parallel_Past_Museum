
import Header from '../components/Header';
import Hero from '../components/Hero';
import RegionCards from '../components/RegionCards';
import Footer from '../components/Footer';

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-sage">
      <Header />
      <main className="py-8">
        <Hero />
        <RegionCards />
      </main>
      <Footer />
    </div>
  );
};

export default LandingPage;