import { Link, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';

const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

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

  // Close menu on route change
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location]);

  const navLinks = [
    { path: '/', label: 'Home' },
    { path: '/about', label: 'About' },
    { path: '/dashboard', label: 'Timelines' },
    { path: '/collections', label: 'Collections' },
    { path: '/contact', label: 'Contact' },
    { path: '/login', label: 'Login' }
  ];

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
        <Link to="/" className="flex items-center gap-2 sm:gap-3 group">
          <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-full border-4 flex items-center justify-center transition-colors duration-300 ${
            scrolled ? 'border-prussian bg-white' : 'border-white bg-transparent'
          }`}>
            <span className="text-lg sm:text-xl group-hover:scale-110 transition-transform duration-300">🧭</span>
          </div>
          <h1 className={`text-lg sm:text-xl md:text-2xl font-heading whitespace-nowrap transition-colors duration-300 ${
            scrolled ? 'text-prussian' : 'text-white'
          }`}>
            PARALLEL PAST
          </h1>
        </Link>
        
        {/* Desktop Nav Links */}
        <nav className="hidden md:flex items-center gap-6 text-sm md:text-base">
          {navLinks.map((link) => (
            <Link 
              key={link.path}
              to={link.path} 
              className="relative py-1"
            >
              <span className={`relative z-10 font-body whitespace-nowrap transition-colors duration-300 ${
                scrolled 
                  ? location.pathname === link.path ? 'text-prussian font-bold' : 'text-prussian/70 hover:text-gold' 
                  : location.pathname === link.path ? 'text-white font-bold' : 'text-white/80 hover:text-sage-light'
              }`}>
                {link.label}
              </span>
              
              {location.pathname === link.path && (
                <motion.div
                  layoutId="activeTab"
                  className={`absolute left-0 right-0 bottom-0 h-0.5 ${
                    scrolled ? 'bg-prussian' : 'bg-gold'
                  }`}
                  initial={false}
                  transition={{ type: "spring", stiffness: 500, damping: 30 }}
                />
              )}
            </Link>
          ))}
        </nav>

        {/* Mobile Menu Button */}
        <button 
          className="md:hidden p-2 z-50 relative"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? (
            <X className={`w-6 h-6 ${scrolled ? 'text-prussian' : 'text-white'}`} />
          ) : (
            <Menu className={`w-6 h-6 ${scrolled ? 'text-prussian' : 'text-white'}`} />
          )}
        </button>

        {/* Mobile Menu Panel */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: '-100%' }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: '-100%' }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className={`absolute top-full left-0 right-0 z-40 md:hidden shadow-lg ${
                scrolled ? 'bg-white' : 'bg-prussian'
              }`}
            >
              <nav className="flex flex-col py-4 px-4 sm:px-6">
                {navLinks.map((link) => (
                  <Link 
                    key={link.path}
                    to={link.path} 
                    className={`py-3 text-base font-body border-b ${
                      scrolled 
                        ? 'border-prussian/10 text-prussian hover:text-gold' 
                        : 'border-white/10 text-white/90 hover:text-sage-light'
                    } ${location.pathname === link.path ? 'font-bold' : ''}`}
                  >
                    {link.label}
                  </Link>
                ))}
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
};

export default Header;