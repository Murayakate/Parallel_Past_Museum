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
          : 'bg-transparent border-b-4 border-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        
        {/* Logo + Title */}
        <div className="flex items-center gap-3">
          <div className={`w-12 h-12 rounded-full border-4 transition-colors duration-300 ${
            scrolled ? 'border-prussian bg-white' : 'border-white bg-transparent'
          }`}>
            🧭
          </div>
          <h1 className={`flex space-x-3 text-xl sm:text-2xl font-heading transition-colors duration-300 ${
            scrolled ? 'text-prussian' : 'text-white'
          }`}>
            PARALLEL PAST
          </h1>
        </div>
        
        {/* Nav Links */}
        <nav className="flex flex-wrap items-center gap-3 sm:gap-6 text-sm sm:text-base">
          <Link to="/" className={`font-body transition-colors duration-300 ${
            scrolled ? 'text-prussian hover:text-gold' : 'text-white hover:text-sage-light'
          }`}>
            Home
          </Link>
          <Link to="/about" className={`font-body transition-colors duration-300 ${
            scrolled ? 'text-prussian hover:text-gold' : 'text-white hover:text-sage-light'
          }`}>
            About
          </Link>
          <Link to="/dashboard" className={`font-body transition-colors duration-300 ${
            scrolled ? 'text-prussian hover:text-gold' : 'text-white hover:text-sage-light'
          }`}>
            Timelines
          </Link>
          <Link to="/collections" className={`font-body transition-colors duration-300 ${
            scrolled ? 'text-prussian hover:text-gold' : 'text-white hover:text-sage-light'
          }`}>
            Collections
          </Link>
          <Link to="/contact" className={`font-body transition-colors duration-300 ${
            scrolled ? 'text-prussian hover:text-gold' : 'text-white hover:text-sage-light'
          }`}>
            Contact
          </Link>
          <Link to="/login" className={`font-body transition-colors duration-300 ${
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