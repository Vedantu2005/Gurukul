import React from 'react';
import { Trophy, Globe2, Mic2, BookOpen, Star, Award, GraduationCap } from 'lucide-react';

const Achievements = () => {
  const achievements = [
    {
      icon: Globe2,
      text: "Presented research papers at reputed institutes like Harvard University, IIM-Bangalore, IIM-Calcutta, ISB-Hyderabad, and IIT Delhi."
    },
    {
      icon: Star,
      text: "Chaired a session at 10th AIMS International Conference on Management held at IIM-Bangalore."
    },
    {
      icon: BookOpen,
      text: "Member of Editorial Board for International Journal of Management and Social Sciences, a Harvard University initiative."
    },
    {
      icon: Star,
      text: "Appointed Member of Reviewing Committee for AIB India Conference on International Business at IIM-B and IIT Delhi."
    },
    {
      icon: BookOpen,
      text: "Reviewer for Academy of International Business (AIB) conferences across the globe."
    },
    {
      icon: GraduationCap,
      text: "Founder member of Special Interest Group (SIG) titled 'Research Methods in International Business'."
    },
    {
      icon: Globe2,
      text: "Guided international students of Millikan University, Illinois, USA, on International Business."
    },
    {
      icon: Trophy,
      text: "Judged a competition on Innovative Teaching Pedagogy titled “Reimagine Education 2017” held by WHARTON UNIVERSITY, USA."
    },
    {
      icon: Mic2,
      text: "Invited Speaker at a Research Clinic on Research Methodology conducted by Academia of International Business, Dubai."
    },
    {
      icon: Mic2,
      text: "Guest of Honor for 'Dubai Conclave' at Curtin University, Dubai (Feb 2018)."
    },
    {
      icon: Mic2,
      text: "Invited Guest Speaker to conduct a workshop at Middlesex University, Dubai (Oct 2016)."
    },
    {
      icon: BookOpen,
      text: "Selected as Editorial Advisory Board Review Member for International Journal of Social Sciences managed by HARVARD UNIVERSITY, USA."
    },
    {
      icon: BookOpen,
      text: "Selected as Marketing Consultant Review Board Member for PEARSON PUBLICATIONS."
    },
    {
      icon: Star,
      text: "Chaired a session and reviewed research papers in Business Strategy in Emerging Markets for the Annual AIB India 2013 Conference at IIM-Bangalore."
    },
    {
      icon: Mic2,
      text: "Invited Keynote Speaker for the World Education Summit, Delhi (2014)."
    },
    {
      icon: Award,
      text: "Received 1st prize in case study competition “From likes, shares and tweets to becoming a Prime Minister” held by IMS, Noida (2014)."
    },
    {
      icon: BookOpen,
      text: "Editorial Board Member of ELK Asia Pacific International Journal."
    },
    {
      icon: Globe2,
      text: "Reviewer for the International Conference conducted by International Management Research Academy, London (2015) at IIM-Bangalore."
    }
  ];

  return (
    <section className="py-10 bg-gradient-to-br from-[#C7B7A3] to-[#E8D8C4]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-[#561C24] mb-4">Achievements & Accolades</h2>
          <div className="w-24 h-1 bg-[#6D2932] mx-auto mb-6"></div>
          <p className="max-w-2xl mx-auto text-[#6D2932] text-lg">
            Recognized globally for contributions to research, academia, and international business leadership.
          </p>
        </div>

        {/* Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {achievements.map((item, index) => {
            const Icon = item.icon;
            return (
              <div 
                key={index} 
                className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-all duration-300 border-l-4 border-[#561C24] hover:-translate-y-1 group"
              >
                <div className="flex items-start">
                  <div className="bg-[#E8D8C4]/30 p-2 rounded-lg mr-4 group-hover:bg-[#561C24] transition-colors duration-300">
                    <Icon className="text-[#561C24] group-hover:text-[#E8D8C4] transition-colors duration-300" size={24} />
                  </div>
                  <p className="text-[#4A4A4A] text-sm md:text-base leading-relaxed font-medium">
                    {item.text}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

export default Achievements;