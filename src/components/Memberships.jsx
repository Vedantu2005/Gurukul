import React from 'react';
import { Globe, Users, TrendingUp, CheckCircle2 } from 'lucide-react';

const Memberships = () => {
  const members = [
    {
      title: "The Academy of International Business",
      subtitle: "Michigan State University",
      icon: Globe
    },
    {
      title: "Management Teachers Consortium",
      subtitle: "Professional Network",
      icon: Users
    },
    {
      title: "American Marketing Association",
      subtitle: "Global Marketing Community",
      icon: TrendingUp
    }
  ];

  return (
    <section className="py-16 bg-[#E8D8C4]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-[#561C24] mb-4">
            Professional Memberships
          </h2>
          <div className="w-24 h-1 bg-[#6D2932] mx-auto"></div>
        </div>

        {/* Memberships Cards */}
        <div className="grid md:grid-cols-3 gap-8">
          {members.map((item, index) => {
            const Icon = item.icon;
            return (
              <div 
                key={index}
                className="bg-white rounded-xl shadow-lg p-8 text-center hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 relative overflow-hidden group"
              >
                {/* Decorative top border */}
                <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-[#561C24] to-[#6D2932]"></div>
                
                <div className="bg-[#F9F5F1] w-20 h-20 mx-auto rounded-full flex items-center justify-center mb-6 group-hover:bg-[#561C24] transition-colors duration-300">
                  <Icon className="text-[#561C24] group-hover:text-[#E8D8C4] transition-colors duration-300" size={36} />
                </div>

                <h3 className="text-xl font-bold text-[#561C24] mb-2">
                  {item.title}
                </h3>
                
                <p className="text-[#6D2932] font-medium text-sm">
                  {item.subtitle}
                </p>

                {/* Verified Badge */}
                <div className="mt-6 flex justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                   <span className="flex items-center text-xs font-bold text-[#561C24] bg-[#E8D8C4]/30 px-3 py-1 rounded-full">
                     <CheckCircle2 size={14} className="mr-1" /> Active Member
                   </span>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

export default Memberships;