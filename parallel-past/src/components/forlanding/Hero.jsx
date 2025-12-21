import { Link } from 'react-router-dom';
import heroImage1 from '../../assets/hero-image-1.png';
import heroImage2 from '../../assets/hero-image-2.png';


const Hero = () => {
  return (
    <section className="max-w-7xl mx-auto mb-12 px-4">
      <div className="bg-sage-dark rounded-2xl overflow-hidden border-4 border-prussian">
        <div className="flex flex-col md:flex-row">

          {/* LEFT SIDE - Text */}
          <div className="w-full md:w-2/5 px-6 py-10 md:p-16 flex flex-col justify-center text-center md:text-left">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-heading text-prussian mb-6 md:mb-8">
              Explore History.<br />
              Side by Side.
            </h2>
            <Link 
              to="/dashboard" 
              className="bg-gold hover:bg-gold-hover text-white font-bold text-base sm:text-lg py-3 sm:py-4 px-8 sm:px-10 rounded-full w-full sm:w-fit inline-flex items-center justify-center"
            >
              START EXPLORING
            </Link>
          </div>

          {/* RIGHT SIDE - Two Images */}
          <div className="w-full md:w-3/5 flex flex-col md:flex-row">
            <div className="flex-1 bg-gray-800 flex items-center justify-center">
             <img src={heroImage1} alt="hero image 1" className="w-full h-auto object-cover" />
            </div>
            <div className="flex-1 bg-gray-700 flex items-center justify-center">
              <img src={heroImage2} alt="hero image 2" className="w-full h-auto object-cover" />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Hero;