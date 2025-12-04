
import { Link } from 'react-router-dom';

const Hero = () => {
  return (
    <section className="max-w-7xl mx-auto mb-12 px-4">
      <div className="bg-sage-dark rounded-2xl overflow-hidden border-4 border-prussian">
        <div className="flex">
          
          {/* LEFT SIDE - Text */}
          <div className="w-2/5 p-16 flex flex-col justify-center">
            <h2 className="text-5xl font-heading text-prussian mb-8">
              Explore History.<br />
              Side by Side.
            </h2>
            <Link 
              to="/dashboard" 
              className="bg-gold hover:bg-gold-hover text-white font-bold text-lg py-4 px-10 rounded-full w-fit"
            >
              START EXPLORING
            </Link>
          </div>

          {/* RIGHT SIDE - Two Images */}
          <div className="w-3/5 flex">
            <div className="flex-1 bg-gray-800 flex items-center justify-center">
             <img src="assets\hero image 1.png" alt="hero image 1" />
            </div>
            <div className="flex-1 bg-gray-700 flex items-center justify-center">
              <p className="text-white">Samurai Image Here</p>
            </div>
          </div>
          
        </div>
      </div>
    </section>
  );
};

export default Hero;