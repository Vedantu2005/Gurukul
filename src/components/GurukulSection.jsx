import React from 'react';
import { ExternalLink } from 'lucide-react';

const GurukulSection = () => {
  return (
    <div className="font-sans">
      <section className="w-full py-10 px-4 md:px-8 bg-[#3E362E] flex items-center justify-center text-center">
        
        <div className="max-w-5xl mx-auto space-y-8">
          
          {/* Main Heading */}
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#F5F1EB] tracking-tight">
            Saisanskrithi <span className="text-[#C7B7A3]">Gurukul</span>
          </h2>

          {/* Sub Heading / Short Intro */}
          <p className="text-[#DBCBB9] text-lg md:text-xl leading-relaxed">
            A sanctuary where ancient Vedic wisdom meets modern academic excellence. 
            We are dedicated to holistic development, fostering character, intellect, 
            and spiritual growth in a serene environment.
          </p>

          {/* Single Action Button */}
          <div className="pt-4">
            <a 
              href="/gurukul" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center px-8 py-4 bg-[#C7B7A3] text-[#3E362E] text-lg font-bold rounded-full shadow-lg hover:bg-[#E8D8C4] hover:scale-105 transition-all duration-300"
            >
              Visit Website
              <ExternalLink className="w-5 h-5 ml-2" />
            </a>
          </div>

        </div>
      </section>
    </div>
  );
}

export default GurukulSection
