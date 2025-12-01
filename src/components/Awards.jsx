import React from 'react';
import { Award, Star, Trophy, Crown } from 'lucide-react';

const Awards = () => {
  const awardsList = [
    { year: '2025', title: 'Women’s Excellence Awards 2025' },
    { year: '2025', title: 'Excellence in Education Awards 2025' },
    { year: '2025', title: 'EduHer Excellence Award in Education' },
    { year: '2025', title: 'Universal Peace & Rights Award', org: 'World Human Rights Organization' },
    { year: '2025', title: 'India’s Education Excellence Awards 2025' },
    { year: '2024', title: 'IWDIAA Award', org: 'Outstanding women in the field of teaching' },
    { year: '2023', title: 'Savithri Bhai Phule Award', org: 'Field of Education' },
    { year: '2023', title: 'Acharya Devo Bhava Award', org: 'Received on Teacher’s Day' },
    { year: '2022', title: 'Vishwa Ratna Samman', org: 'For Social Service' },
    { year: '2021', title: 'Karnataka Women Achievers Award', org: 'Field of Education' },
    { year: '2017', title: 'Distinguished Alumni Award', org: 'Jain University' },
    { year: '2016', title: 'Outstanding Young Woman Management Teacher Award', org: 'AIMS International' },
    { year: '2016', title: 'Outstanding Contribution Education Excellence in Karnataka', org: 'Prime Time Media' },
    { year: '2015', title: 'Outstanding Academic Scholar', org: 'Alliance University Alumni Association' },
    { year: '2014', title: 'Indian Achievers Award', org: 'Education and Research' },
    { year: '2014', title: 'Global Achievers Awards for Excellence in Education', org: 'Dubai' },
    { year: '2014', title: 'Pride of India Award In Education' },
    { year: '2014', title: 'MTC Global Award of Excellence', org: 'Innovative Teaching Pedagogy' },
    { year: '2014', title: 'Young Educator and Researcher Award' }
  ];

  return (
    <section className="py-10 bg-gradient-to-br from-[#C7B7A3] to-[#E8D8C4]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-[#561C24] mb-4">Awards & Recognition</h2>
          <div className="w-24 h-1 bg-[#6D2932] mx-auto mb-6"></div>
          <p className="max-w-2xl mx-auto text-[#6D2932] font-medium">
            Celebrating over a decade of excellence in education, leadership, and social service.
          </p>
        </div>

        {/* Awards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {awardsList.map((item, index) => (
            <div 
              key={index} 
              className="group relative bg-[#F9F5F1] p-6 rounded-xl border border-[#E8D8C4] hover:shadow-xl hover:border-[#561C24] transition-all duration-300 transform hover:-translate-y-1"
            >
              {/* Year Badge */}
              <div className="absolute -top-3 -right-3 bg-[#561C24] text-[#E8D8C4] text-xs font-bold px-3 py-1 rounded-full shadow-md group-hover:scale-110 transition-transform">
                {item.year}
              </div>

              <div className="flex items-start">
                <div className="mr-4 mt-1 text-[#561C24] group-hover:text-[#D4AF37] transition-colors">
                  {index === 0 ? <Crown size={24} /> : <Award size={24} />}
                </div>
                <div>
                  <h3 className="font-bold text-lg text-[#561C24] leading-tight mb-2">
                    {item.title}
                  </h3>
                  {item.org && (
                    <p className="text-sm text-[#6D2932]/80 font-medium">
                      {item.org}
                    </p>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default Awards;