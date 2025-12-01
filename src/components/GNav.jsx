import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';

const GNav = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Helper function to close menu when a link is clicked
  const handleMobileLinkClick = () => {
    setMobileMenuOpen(false);
  };

  return (
    <nav className="bg-[#561C24] text-[#E8D8C4] sticky top-0 z-50 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="flex justify-between items-center h-20">
          <a href="/gurukul">
            <div className="flex items-center space-x-3">
              <img
                src="logo.jpg"
                alt="SG Logo"
                className="h-12 w-12"
              />
              <div>
                <div className="text-xl font-bold">SAISANSKRITHI GURUKUL</div>
                <div className="text-xs">Education Beyond Boundaries</div>
              </div>
            </div>
          </a>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-8">
            <a href="/" className="hover:text-[#C7B7A3] transition">Home</a>
            {/* <a href="/about" className="hover:text-[#C7B7A3] transition">About</a>
            <a href="/#author" className="hover:text-[#C7B7A3] transition">Author</a> */}
            {/* <a href="/blog" className="hover:text-[#C7B7A3] transition">Blog</a> */}
            <a href="/courses" className="hover:text-[#C7B7A3] transition">Courses</a>
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
        <div className="md:hidden bg-[#6D2932] px-4 pb-4">
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
            href="#author" 
            onClick={handleMobileLinkClick} 
            className="block py-2 hover:text-[#C7B7A3]"
          >
            Author
          </a>
          <a 
            href="/courses" 
            onClick={handleMobileLinkClick} 
            className="block py-2 hover:text-[#C7B7A3]"
          >
            Courses
          </a>
        </div>
      )}
    </nav>
  );
}

export default GNav
