
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header className="bg-white border-b-4 border-prussian">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        
        {/* Logo + Title */}
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-full border-4 border-prussian bg-white">
            🧭
          </div>
          <h1 className="text-2xl font-heading text-prussian">
            PARALLEL PAST
          </h1>
        </div>
        
        {/* Nav Links */}
        <nav className="flex items-center gap-6">
          <Link to="/" className="text-prussian hover:text-gold font-body">
            Home
          </Link>
          <Link to="/about" className="text-prussian hover:text-gold font-body">
            About
          </Link>
          <Link to="/collections" className="text-prussian hover:text-gold font-body">
            Collections
          </Link>
          <Link to="/contact" className="text-prussian hover:text-gold font-body">
            Contact
          </Link>
          <Link to="/login" className="text-prussian hover:text-gold font-body">
            Login
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;