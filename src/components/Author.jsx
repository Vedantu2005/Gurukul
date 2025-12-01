import React from 'react';
import { BookOpen, Users, Heart, Award, Globe, Sparkles } from 'lucide-react'; // Assuming you are using lucide-react or similar

const Author = () => {
  // Color variables for cleaner code usage
  const bgMain = "bg-gradient-to-br from-[#E8D8C4] to-[#C7B7A3]";
  const accentGradient = "bg-gradient-to-br from-[#561C24] to-[#6D2932]";
  const textGradient = "bg-gradient-to-br from-[#561C24] to-[#6D2932] bg-clip-text text-transparent";

  return (
    <section id="author" className={`min-h-screen ${bgMain} py-12 px-4 sm:px-6 lg:px-8 font-sans`}>
      <div className="max-w-7xl mx-auto">
        
        {/* --- Hero Section --- */}
        <div className="flex flex-col md:flex-row items-center gap-10 mb-16">
          {/* Image Placeholder */}
          <div className="w-full md:w-1/3 flex justify-center">
            <div className={`p-1 rounded-full ${accentGradient} shadow-2xl`}>
              <div className="bg-[#E8D8C4] rounded-full p-2">
                {/* Replace src with actual image path */}
                <img 
                  src="/user1.jpg" 
                  alt="Dr. Sai Sanskrithi" 
                  className="rounded-full w-64 h-64 object-cover shadow-inner"
                />
              </div>
            </div>
          </div>

          {/* Intro Text */}
          <div className="w-full md:w-2/3 text-center md:text-left">
            <h1 className={`text-4xl md:text-5xl font-extrabold mb-4 ${textGradient}`}>
              Dr. Sai Sanskrithi
            </h1>
            <h2 className="text-xl font-semibold text-[#561C24] mb-6 opacity-90">
              Academic Visionary | Leadership Coach | Spiritual Healer
            </h2>
            <p className="text-gray-800 text-lg leading-relaxed mb-6">
              Dr. Sai Sanskrithi embodies a trinity of influence, seamlessly uniting high-level 
              academic expertise, profound spiritual devotion, and dedicated social service. 
              She is dedicated to shaping the next generation of effective leaders, management 
              professionals, and academia.
            </p>
            <div className="flex flex-wrap gap-3 justify-center md:justify-start">
              <span className={`px-4 py-2 rounded-full text-white text-sm font-medium shadow-md ${accentGradient}`}>
                Double Post Graduate
              </span>
              <span className={`px-4 py-2 rounded-full text-white text-sm font-medium shadow-md ${accentGradient}`}>
                PhD in Management
              </span>
              <span className={`px-4 py-2 rounded-full text-white text-sm font-medium shadow-md ${accentGradient}`}>
                Reiki Healer
              </span>
            </div>
          </div>
        </div>

        {/* --- Main Content Grid --- */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* Card 1: Core Expertise */}
          <div className="bg-white/60 backdrop-blur-md rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-all duration-300 border-t-4 border-[#561C24]">
            <div className="flex items-center gap-3 mb-4">
              <div className={`p-3 rounded-lg ${accentGradient} text-white`}>
                <BookOpen size={24} />
              </div>
              <h3 className={`text-xl font-bold ${textGradient}`}>Core Expertise</h3>
            </div>
            <ul className="space-y-4 text-gray-800">
              <li className="flex gap-2">
                <span className="text-[#561C24] font-bold">•</span>
                <span><strong>Innovative Pedagogy:</strong> Moving beyond traditional methods to engage students through critical thinking.</span>
              </li>
              <li className="flex gap-2">
                <span className="text-[#561C24] font-bold">•</span>
                <span><strong>Global Recognition:</strong> Over 30 research papers in esteemed institutions like Harvard, IIMs, and ISB.</span>
              </li>
              <li className="flex gap-2">
                <span className="text-[#561C24] font-bold">•</span>
                <span><strong>Awards:</strong> Pride of Nation, Karnataka Women Achiever, Savitribai Phule Samman, and more.</span>
              </li>
            </ul>
          </div>

          {/* Card 2: Impact & Influence */}
          <div className="bg-white/60 backdrop-blur-md rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-all duration-300 border-t-4 border-[#6D2932]">
            <div className="flex items-center gap-3 mb-4">
              <div className={`p-3 rounded-lg ${accentGradient} text-white`}>
                <Users size={24} />
              </div>
              <h3 className={`text-xl font-bold ${textGradient}`}>Impact & Influence</h3>
            </div>
            <ul className="space-y-4 text-gray-800">
              <li className="flex gap-2">
                <span className="text-[#561C24] font-bold">•</span>
                <span><strong>Guiding Light:</strong> Mentor to numerous MBA and PhD students navigating career pathways.</span>
              </li>
              <li className="flex gap-2">
                <span className="text-[#561C24] font-bold">•</span>
                <span><strong>Speaker & Judge:</strong> Keynote speaker and judge for events like Wharton’s Re-Imagine Education.</span>
              </li>
              <li className="flex gap-2">
                <span className="text-[#561C24] font-bold">•</span>
                <span><strong>Corporate Trainer:</strong> Conducts impactful sessions for professionals and faculties across India.</span>
              </li>
            </ul>
          </div>

          {/* Card 3: Spirituality & Healing */}
          <div className="bg-white/60 backdrop-blur-md rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-all duration-300 border-t-4 border-[#561C24]">
            <div className="flex items-center gap-3 mb-4">
              <div className={`p-3 rounded-lg ${accentGradient} text-white`}>
                <Heart size={24} />
              </div>
              <h3 className={`text-xl font-bold ${textGradient}`}>Spirituality</h3>
            </div>
            <p className="text-gray-800 mb-4 italic">
              "True leadership is rooted in knowledge, driven by ethics, and realized through selfless action."
            </p>
            <ul className="space-y-4 text-gray-800">
              <li className="flex gap-2">
                <span className="text-[#561C24] font-bold">•</span>
                <span><strong>Devotee of Shirdi Sai Baba:</strong> Guided by the principles of Shraddha (Faith) and Saburi (Patience).</span>
              </li>
              <li className="flex gap-2">
                <span className="text-[#561C24] font-bold">•</span>
                <span><strong>Healer:</strong> Uses Reiki and spiritual empathy to provide comfort and positive transformation.</span>
              </li>
            </ul>
          </div>

        </div>

        {/* --- Footer/Quote Section --- */}
        <div className="mt-16 text-center max-w-3xl mx-auto">
          <div className={`h-1 w-24 mx-auto mb-6 rounded-full ${accentGradient}`}></div>
          <p className="text-xl md:text-2xl font-serif text-[#561C24] leading-relaxed">
            "A catalyst for change inspiring individuals and organizations to pursue excellence rooted in wisdom, simplicity, and humility."
          </p>
        </div>

      </div>
    </section>
  );
};

export default Author;