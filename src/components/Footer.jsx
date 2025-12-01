import React from 'react';
import { Mail, Phone, MapPin, Facebook, Instagram, Linkedin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gradient-to-br from-[#561C24] to-[#6D2932] text-[#E8D8C4] py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          
          {/* Logo + Description */}
          <div>
            <h4 className="text-xl font-bold mb-4">DR. SAI SANSKRITHI</h4>
            <p className="text-[#C7B7A3] text-sm">
              Education Beyond Boundaries - Empowering minds through wisdom and knowledge.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-bold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#about" className="hover:text-[#C7B7A3] transition">About Us</a></li>
              <li><a href="/blog" className="hover:text-[#C7B7A3] transition">Blog</a></li>
              <li><a href="/research" className="hover:text-[#C7B7A3] transition">Research</a></li>
              <li><a href="/article" className="hover:text-[#C7B7A3] transition">Article</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-lg font-bold mb-4">Contact Info</h4>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start">
                <Mail className="mr-2 mt-1" size={16} />
                <span>info@saisanskrithi.edu</span>
              </li>
              <li className="flex items-start">
                <Phone className="mr-2 mt-1" size={16} />
                <span>+91 98765 43210</span>
              </li>
              <li className="flex items-start">
                <MapPin className="mr-2 mt-1" size={16} />
                <span>Ashta, Madhya Pradesh, India</span>
              </li>
            </ul>
          </div>

          {/* Social Media */}
          <div>
            <h4 className="text-lg font-bold mb-4">Follow Us</h4>
            <div className="flex space-x-4">

              {/* Facebook */}
              <a 
                href="https://www.facebook.com/share/1BrYh1fsvo/"
                className="w-10 h-10 bg-[#C7B7A3] rounded-full flex items-center justify-center hover:bg-[#E8D8C4] transition text-[#561C24]"
              >
                <Facebook size={20} />
              </a>

              {/* Instagram */}
              <a 
                href="https://www.instagram.com/sanskrithi.sai?igsh=bjR6aTFwcGw4YXpx"
                className="w-10 h-10 bg-[#C7B7A3] rounded-full flex items-center justify-center hover:bg-[#E8D8C4] transition text-[#561C24]"
              >
                <Instagram size={20} />
              </a>

              {/* LinkedIn */}
              <a 
                href="https://www.linkedin.com/in/dr-sai-sanskrithi-57870661?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app"
                className="w-10 h-10 bg-[#C7B7A3] rounded-full flex items-center justify-center hover:bg-[#E8D8C4] transition text-[#561C24]"
              >
                <Linkedin size={20} />
              </a>

            </div>
          </div>

        </div>

        {/* Footer Bottom */}
        <div className="border-t border-[#C7B7A3] pt-8 text-center text-sm text-[#C7B7A3]">
          <p>&copy; 2025 DR. SAI SANSKRITHI. All rights reserved.</p>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
