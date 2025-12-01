import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Helper function to close menu when a link is clicked
  const handleMobileLinkClick = () => {
    setMobileMenuOpen(false);
  };

  return (
    <nav className="bg-[#561C24] text-[#E8D8C4] sticky top-0 z-50 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="flex justify-between items-center h-20">
          <a href="/">
            <div className="flex items-center space-x-3">
              <div>
                <div className="text-xl font-bold">DR. SAI SANSKRITHI</div>
              </div>
            </div>
          </a>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-8">
            <a href="/" className="hover:text-[#C7B7A3] transition">Home</a>
            <a href="/about" className="hover:text-[#C7B7A3] transition">About</a>
            <a href="/blog" className="hover:text-[#C7B7A3] transition">Blog</a>
            <a href="/research" className="hover:text-[#C7B7A3] transition">Research</a>
            <a href="/article" className="hover:text-[#C7B7A3] transition">Article</a>
          </div>

          {/* Mobile Toggle Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#561C24] px-4 pb-4">
          <a 
            href="/" 
            onClick={handleMobileLinkClick} 
            className="block py-2 hover:text-[#C7B7A3]"
          >
            Home
          </a>
          <a 
            href="/about" 
            onClick={handleMobileLinkClick} 
            className="block py-2 hover:text-[#C7B7A3]"
          >
            About
          </a>
          <a 
            href="/blog" 
            onClick={handleMobileLinkClick} 
            className="block py-2 hover:text-[#C7B7A3]"
          >
            Blog
          </a>
          <a 
            href="/research" 
            onClick={handleMobileLinkClick} 
            className="block py-2 hover:text-[#C7B7A3]"
          >
            Research
          </a>
          <a 
            href="/article" 
            onClick={handleMobileLinkClick} 
            className="block py-2 hover:text-[#C7B7A3]"
          >
            Article
          </a>
        </div>
      )}
    </nav>
  );
};

export default Navbar;