import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';

const Header = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 50;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [scrolled]);

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled 
          ? 'bg-white border-b-4 border-prussian shadow-lg' 
          : 'bg-prussian border-b-4 border-prussian shadow-md'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-2 sm:py-3 flex items-center justify-between">
        
        {/* Logo + Title */}
        <div className="flex items-center gap-2 sm:gap-3">
          <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-full border-4 flex items-center justify-center transition-colors duration-300 ${
            scrolled ? 'border-prussian bg-white' : 'border-white bg-transparent'
          }`}>
            <span className="text-lg sm:text-xl">🧭</span>
          </div>
          <h1 className={`text-lg sm:text-xl md:text-2xl font-heading whitespace-nowrap transition-colors duration-300 ${
            scrolled ? 'text-prussian' : 'text-white'
          }`}>
            PARALLEL PAST
          </h1>
        </div>
        
        {/* Nav Links */}
        <nav className="flex items-center gap-2 sm:gap-4 md:gap-6 text-xs sm:text-sm md:text-base">
          <Link to="/" className={`font-body whitespace-nowrap transition-colors duration-300 ${
            scrolled ? 'text-prussian hover:text-gold' : 'text-white hover:text-sage-light'
          }`}>
            Home
          </Link>
          <Link to="/about" className={`font-body whitespace-nowrap transition-colors duration-300 ${
            scrolled ? 'text-prussian hover:text-gold' : 'text-white hover:text-sage-light'
          }`}>
            About
          </Link>
          <Link to="/dashboard" className={`font-body whitespace-nowrap transition-colors duration-300 ${
            scrolled ? 'text-prussian hover:text-gold' : 'text-white hover:text-sage-light'
          }`}>
            Timelines
          </Link>
          <Link to="/collections" className={`font-body whitespace-nowrap transition-colors duration-300 ${
            scrolled ? 'text-prussian hover:text-gold' : 'text-white hover:text-sage-light'
          }`}>
            Collections
          </Link>
          <Link to="/contact" className={`font-body whitespace-nowrap transition-colors duration-300 ${
            scrolled ? 'text-prussian hover:text-gold' : 'text-white hover:text-sage-light'
          }`}>
            Contact
          </Link>
          <Link to="/login" className={`font-body whitespace-nowrap transition-colors duration-300 ${
            scrolled ? 'text-prussian hover:text-gold' : 'text-white hover:text-sage-light'
          }`}>
            Login
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;