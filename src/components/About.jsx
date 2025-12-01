import React from 'react';
import { 
  GraduationCap, 
  BookMarked, 
  User, 
  Target, 
  CheckCircle2, 
  Flower2, 
  Users2, 
  BookOpenCheck, 
  Rocket 
} from 'lucide-react';

const About = () => {
  // --- Data for Stats ---
  const stats = [
    { icon: GraduationCap, value: '500+', label: 'Students Enrolled' },
    { icon: BookMarked, value: '25+', label: 'Courses Offered' },
    { icon: User, value: '30+', label: 'Expert Teachers' },
    { icon: Target, value: '10+', label: 'Years Experience' }
  ];

  // --- Data for Philosophy ---
  const philosophies = [
    "Holistic Development",
    "Progressive Learning",
    "Combines traditional and modern learning"
  ];

  // --- Data for "Who is it For?" ---
  const audience = [
    {
      title: "Spiritual Seekers",
      icon: Flower2,
      desc: "Offers a structured path to merge inner growth with outer life. Holistic practices are taught creating a spiritual discipline while engaging in daily activities."
    },
    {
      title: "Leaders & Organizations",
      icon: Users2,
      desc: "Aims to move leadership from a transaction based model to a transformational model where emphasis is on righteous conduct and selfless service. Leaders will learn to lead through stillness, balance and clarity rather than fear and command."
    },
    {
      title: "Academicians",
      icon: BookOpenCheck,
      desc: "Encourages the Guru Shishya Parampara fostering mentorship, personalized guidance and curriculum integration. Offering a framework to be inspiring mentors who go beyond academics and create excellence among the student community."
    },
    {
      title: "Entrepreneurs",
      icon: Rocket,
      desc: "Create purpose driven entrepreneurs rather than merely for wealth creation. It is essential to teach entrepreneurs to take success and failure with equanimity in a fast moving marketplace."
    },
    {
      title: "Students",
      subtitle: "(UG, PG & Doctoral)",
      icon: GraduationCap,
      desc: "Students will learn value based management, grounding decision making through moral principles. For doctoral students, this philosophy encourages integrity in research, developing brain thinkers who are analytically contributing and ethically responsible."
    }
  ];

  return (
    <section id="about" className="py-16 bg-gradient-to-br from-[#E8D8C4] to-[#C7B7A3]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* --- SECTION 1: ABOUT HEADER & STATS --- */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-[#561C24] mb-4">About Us</h2>
          <div className="w-24 h-1 bg-[#6D2932] mx-auto"></div>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center mb-24">
          {/* Text Content */}
          <div className="bg-white p-8 rounded-lg shadow-xl border-l-4 border-[#561C24]">
            <h3 className="text-2xl font-bold text-[#561C24] mb-4">Our Foundation</h3>
            <p className="text-[#6D2932] leading-relaxed mb-6 font-medium">
              SaiSanskrithi Gurukul fosters a combination of modern academic learning with traditional values and holistic development. It seeks to bridge the gap between contemporary education and value-based learning.
            </p>
            
            <div className="bg-[#F9F5F1] p-5 rounded-md border border-[#E8D8C4]">
              <h4 className="text-lg font-bold text-[#561C24] mb-3 border-b border-[#E8D8C4] pb-2">
                Core Philosophy
              </h4>
              <ul className="space-y-3">
                {philosophies.map((item, index) => (
                  <li key={index} className="flex items-start text-[#6D2932]">
                    <CheckCircle2 className="w-5 h-5 mr-3 mt-1 text-[#561C24] flex-shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 gap-6">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <div 
                  key={index}
                  className="bg-gradient-to-br from-[#561C24] to-[#6D2932] text-[#E8D8C4] p-6 rounded-lg text-center hover:scale-105 transition shadow-lg"
                >
                  <Icon className="mx-auto mb-3" size={40} />
                  <h4 className="font-bold text-2xl mb-2">{stat.value}</h4>
                  <p className="text-sm">{stat.label}</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* --- SECTION 2: WHO IS IT FOR? --- */}
        <div className="relative">
            {/* Visual Separator */}
            <div className="text-center mb-12">
                <span className="bg-[#561C24] text-[#E8D8C4] px-4 py-1 rounded-full text-sm font-semibold uppercase tracking-wider">Target Audience</span>
                <h3 className="text-3xl md:text-4xl font-bold text-[#561C24] mt-4">Who is SaiSanskrithi Gurukul For?</h3>
            </div>

            {/* Flex Wrap Layout to center the cards nicely */}
            <div className="flex flex-wrap justify-center gap-6">
                {audience.map((item, index) => {
                    const Icon = item.icon;
                    return (
                        <div 
                            key={index} 
                            className="w-full md:w-[48%] lg:w-[31%] bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 overflow-hidden flex flex-col"
                        >
                            <div className="bg-[#561C24] p-4 flex items-center justify-between">
                                <h4 className="text-xl font-bold text-[#E8D8C4]">
                                    {item.title}
                                    {item.subtitle && <span className="block text-sm font-normal opacity-80">{item.subtitle}</span>}
                                </h4>
                                <Icon className="text-[#E8D8C4]" size={28} />
                            </div>
                            <div className="p-6 flex-grow border-x border-b border-[#E8D8C4] rounded-b-xl">
                                <p className="text-[#6D2932] leading-relaxed text-sm md:text-base">
                                    {item.desc}
                                </p>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>

      </div>
    </section>
  );
};

export default About;