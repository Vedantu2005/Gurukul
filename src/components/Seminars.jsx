import React from 'react';
import { Plane, MapPin, GraduationCap, Users, Calendar, Globe2 } from 'lucide-react';

const Seminars = () => {
  const internationalEvents = [
    {
      title: "World Marketing Summit",
      location: "Tokyo, Japan",
      date: "September 2014",
      desc: "Conference featuring renowned personalities like Prof. Philip Kotler, Al Ries, Laura Ries, Milton Kotler, Prof. Deepak Jain, Prof. Jagdish Sheth, and Prof. Nirmalaya Kumar."
    },
    {
      title: "Future Business Leaders of Asia",
      location: "Nanyang Technological University, Singapore",
      desc: "Leadership development program focused on Asian market dynamics."
    },
    {
      title: "Organizational Behaviour",
      location: "Latrobe University, Australia",
      desc: "Advanced seminar on behavioral psychology in organizations."
    },
    {
      title: "London Business Environment",
      location: "Cass Business School, United Kingdom",
      desc: "Study of the European business landscape and financial markets."
    }
  ];

  const nationalEvents = [
    {
      title: "7th National Brand Summit",
      organizer: "AIMA (All India Management Association)",
      type: "Summit"
    },
    {
      title: "International Business Team Leadership & Group Dynamics",
      organizer: "Professional Workshop",
      type: "Workshop"
    },
    {
      title: "Culture and Ethics",
      organizer: "Professional Seminar",
      type: "Seminar"
    },
    {
      title: "Skill Development Program",
      organizer: "Jain University, Bangalore",
      type: "FDP"
    },
    {
      title: "Faculty Development Program",
      organizer: "Jain University, Bangalore",
      type: "FDP"
    },
    {
      title: "Faculty Development Program",
      organizer: "M P Birla Institute of Management, Bangalore",
      type: "FDP"
    },
    {
      title: "Faculty Development Program titled “Energy”",
      organizer: "Jyoti Nivas College - PG Center, Bangalore",
      type: "FDP"
    }
  ];

  return (
    <section className="py-16 bg-[#E8D8C4]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="bg-[#561C24] text-[#E8D8C4] px-4 py-1 rounded-full text-sm font-bold tracking-wider uppercase shadow-md">
            Global Exposure
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-[#561C24] mt-4 mb-4">
            Seminars & Certifications
          </h2>
          <div className="w-24 h-1 bg-[#6D2932] mx-auto"></div>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          
          {/* Column 1: International Seminars */}
          <div>
            <div className="flex items-center mb-8 w-full">
              <Globe2 className="text-[#561C24] mr-3" size={28} />
              <h3 className="text-2xl font-bold text-[#6D2932]">International Forums</h3>
            </div>
            
            <div className="space-y-6">
              {internationalEvents.map((event, index) => (
                <div 
                  key={index} 
                  className="relative pl-8 border-l-2 border-[#561C24]/30 pb-2 group"
                >
                  {/* Timeline Dot */}
                  <div className="absolute -left-[9px] top-0 bg-[#561C24] w-4 h-4 rounded-full border-2 border-[#E8D8C4] group-hover:scale-125 transition-transform duration-300"></div>
                  
                  <h4 className="text-xl font-bold text-[#561C24] leading-tight mb-1">
                    {event.title}
                  </h4>
                  
                  <div className="flex items-center text-[#6D2932] text-sm font-semibold mb-2">
                    <MapPin size={14} className="mr-1" />
                    {event.location}
                    {event.date && (
                      <>
                        <span className="mx-2">•</span>
                        <Calendar size={14} className="mr-1" />
                        {event.date}
                      </>
                    )}
                  </div>
                  
                  <p className="text-[#4A4A4A] text-sm leading-relaxed font-medium">
                    {event.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Column 2: National & FDPs */}
          <div>
            <div className="flex items-center mb-8  rounded-lg">
              <GraduationCap className="text-[#561C24] mr-3" size={28} />
              <h3 className="text-2xl font-bold text-[#6D2932]">National & Faculty Development</h3>
            </div>

            <div className="grid gap-4">
              {nationalEvents.map((event, index) => (
                <div 
                  key={index}
                  className="bg-white/80 backdrop-blur-sm p-5 rounded-lg border-l-4 border-[#561C24] hover:bg-white transition-colors duration-300 flex items-start shadow-sm"
                >
                  <div className="bg-[#E8D8C4] p-2 rounded-full mr-4 shadow-inner">
                    <Users size={20} className="text-[#561C24]" />
                  </div>
                  <div>
                    <h4 className="text-lg font-bold text-[#561C24]">
                      {event.title}
                    </h4>
                    <p className="text-[#6D2932] text-sm font-medium">
                      {event.organizer}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Seminars;