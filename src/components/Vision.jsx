import React from 'react';
import { Target, BookOpen } from 'lucide-react';

const Vision = () => {
  return (
    <section id="vision" className="py-20 bg-gradient-to-br from-[#C7B7A3] via-[#E8D8C4] to-[#C7B7A3]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-[#561C24] mb-4">
            Vision & Mission
          </h2>
          <div className="w-24 h-1 bg-[#6D2932] mx-auto"></div>
        </div>
        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-gradient-to-br from-[#561C24] to-[#6D2932] text-[#E8D8C4] p-10 rounded-lg shadow-xl ">
            <Target className="mb-6" size={48} />
            <h3 className="text-3xl font-bold mb-6">Our Vision</h3>
            <p className="text-lg leading-relaxed">
              To be a sanctuary of wisdom that integrates management excellence with inner transformation -nurturing professionals and leaders who lead with purpose, compassion and clarity.
            </p>
          </div>
          <div className="bg-gradient-to-br from-[#6D2932] to-[#561C24] text-[#E8D8C4] p-10 rounded-lg shadow-xl ">
            <BookOpen className="mb-6" size={48} />
            <h3 className="text-3xl font-bold mb-6">Our Mission</h3>

            <ul className="space-y-4 text-lg leading-relaxed">
              <li className="flex items-start">
                <span className="mr-3 mt-3 h-2 w-2 bg-[#E8D8C4] rounded-full flex-shrink-0"></span>
                <span>To deliver value based management programs that combine academic rigor with practical relevance</span>
              </li>

              <li className="flex items-start">
                <span className="mr-3 mt-1.5 h-2 w-2 bg-[#E8D8C4] rounded-full flex-shrink-0"></span>
                <span>To provide professional consulting, coaching and mentoring that enhance leadership capability and organizational growth</span>
              </li>

              <li className="flex items-start">
                <span className="mr-3 mt-1.5 h-2 w-2 bg-[#E8D8C4] rounded-full flex-shrink-0"></span>
                <span>To cultivate individuals who excel in their professions while upholding their integrity, balance and service</span>
              </li>

              <li className="flex items-start">
                <span className="mr-3 mt-1.5 h-2 w-2 bg-[#E8D8C4] rounded-full flex-shrink-0"></span>
                <span>To guide learners in discovering their true potential that aligns success with service and self-awareness</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Vision;
