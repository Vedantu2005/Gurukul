import React, { useState } from 'react';
import { BookOpen, ArrowRight } from 'lucide-react';

const GHero = () => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <section id="hero" className="relative bg-gradient-to-br from-[#561C24] via-[#6D2932] to-[#561C24] text-[#E8D8C4] py-16 md:py-10 overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-10 md:top-20 left-5 md:left-10 w-24 md:w-32 h-24 md:h-32 bg-[#C7B7A3] rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-10 md:bottom-20 right-5 md:right-10 w-32 md:w-40 h-32 md:h-40 bg-[#E8D8C4] rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Desktop Layout - Side by side */}
        <div className="hidden md:grid md:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-6 animate-fadeInLeft">
            <div className="inline-flex items-center gap-2 bg-[#E8D8C4]/10 px-4 py-2 rounded-full border border-[#C7B7A3]/30 w-fit">
              <BookOpen size={18} className="text-[#E8D8C4]" />
              <span className="text-sm text-[#C7B7A3]">Ancient Wisdom Meets Modern Learning</span>
            </div>
            
            <h1 className="text-4xl md:text-5xl font-bold text-[#E8D8C4] leading-tight">
              SAISANSKRITHI <span className="text-[#C7B7A3]">GURUKUL</span>
            </h1>
            
            <p className="text-2xl text-[#C7B7A3] font-semibold">
              Education Beyond Boundaries
            </p>
            
            <p className="text-lg text-[#E8D8C4]/90 leading-relaxed">
              Empowering minds through ancient wisdom and modern pedagogy, creating a harmonious blend of tradition and innovation. Join us on a transformative educational journey.
            </p>
            
            <button 
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
              className="group bg-[#E8D8C4] text-[#561C24] cursor-pointer px-8 py-4 rounded-full text-lg font-semibold hover:bg-[#C7B7A3] transition-all duration-300 transform hover:scale-110 shadow-xl hover:shadow-2xl inline-flex items-center gap-2"
            >
              Begin Your Journey
              <ArrowRight 
                size={20} 
                className={`transition-transform duration-300 ${isHovered ? 'translate-x-1' : ''}`}
              />
            </button>
          </div>

          {/* Right Image */}
          <div className="relative h-96 group">
            <div className="absolute inset-0 bg-gradient-to-br from-[#C7B7A3]/20 to-[#E8D8C4]/10 rounded-2xl transform group-hover:scale-105 transition-transform duration-500"></div>
            <div className="absolute inset-0 bg-gradient-to-t from-[#561C24] to-transparent rounded-2xl opacity-30"></div>
            
            <div className="relative w-full h-full rounded-2xl overflow-hidden border border-[#C7B7A3]/30">
              <img 
                src="https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?w=600&h=500&fit=crop" 
                alt="Ancient Learning" 
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#561C24] via-transparent to-transparent opacity-40 group-hover:opacity-20 transition-opacity duration-500"></div>
            </div>
          </div>
        </div>

        {/* Mobile Layout - Stacked */}
        <div className="md:hidden space-y-8 text-center">
          {/* Mobile Image */}
          <div className="relative h-64 group mx-auto max-w-xs">
            <div className="absolute inset-0 bg-gradient-to-br from-[#C7B7A3]/20 to-[#E8D8C4]/10 rounded-2xl transform group-active:scale-105 transition-transform duration-300"></div>
            
            <div className="relative w-full h-full rounded-2xl overflow-hidden border border-[#C7B7A3]/30">
              <img 
                src="https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?w=400&h=350&fit=crop" 
                alt="Ancient Learning" 
                className="w-full h-full object-cover group-active:scale-110 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#561C24] via-transparent to-transparent opacity-40 group-active:opacity-20 transition-opacity duration-300"></div>
            </div>
          </div>

          {/* Mobile Content */}
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 bg-[#E8D8C4]/10 px-4 py-2 rounded-full border border-[#C7B7A3]/30">
              <BookOpen size={16} className="text-[#E8D8C4]" />
              <span className="text-xs text-[#C7B7A3]">Ancient Wisdom Meets Modern Learning</span>
            </div>
            
            <h1 className="text-4xl font-bold text-[#E8D8C4]">
              SAISANSKRITHI<br /><span className="text-[#C7B7A3]">GURUKUL</span>
            </h1>
            
            <p className="text-xl text-[#C7B7A3] font-semibold">
              Education Beyond Boundaries
            </p>
            
            <p className="text-base text-[#E8D8C4]/90 leading-relaxed">
              Empowering minds through ancient wisdom and modern pedagogy, creating a harmonious blend of tradition and innovation.
            </p>
            
            <button 
              className="w-full bg-[#E8D8C4] text-[#561C24] px-6 py-3 rounded-full text-lg font-semibold active:scale-95 transition-all duration-200 shadow-lg inline-flex items-center justify-center gap-2"
            >
              Begin Your Journey
              <ArrowRight size={20} />
            </button>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes fadeInLeft {
          from {
            opacity: 0;
            transform: translateX(-20px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        
        .animate-fadeInLeft {
          animation: fadeInLeft 0.8s ease-out;
        }
      `}</style>
    </section>
  );
}

export default GHero
