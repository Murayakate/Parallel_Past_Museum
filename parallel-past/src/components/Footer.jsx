import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-white border-t-4 border-prussian mt-16">
      <div className="max-w-7xl mx-auto px-6 py-6 flex items-center justify-between">
        
        {/* Links */}
        <div className="flex gap-6 text-sm font-body text-prussian">
          <Link to="/privacy">Privacy Policy</Link>
          <Link to="/terms">Terms of Use</Link>
          <Link to="/contact">Contact Us</Link>
          <span>© 2025 Parallel Past Historical Institute</span>
        </div>

        {/* Social Icons */}
        <div className="flex gap-4">
          <a href="#" className="w-10 h-10 rounded-full bg-prussian text-white flex items-center justify-center">
            f
          </a>
          <a href="#" className="w-10 h-10 rounded-full bg-prussian text-white flex items-center justify-center">
            𝕏
          </a>
          <a href="#" className="w-10 h-10 rounded-full bg-prussian text-white flex items-center justify-center">
            📷
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;