import React from 'react';
import { 
  BookOpen, 
  FileText, 
  Newspaper, 
  Star, 
  Quote, 
  ArrowRight, 
  Library,
  Bookmark
} from 'lucide-react';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';

const ArticlePublications = () => {
  
  // --- DATA: Publications List ---
  const publications = [
    {
      year: "2017",
      title: "Facebook E-Commerce Integration: A case study on Shopify",
      publication: "Research in Management and Information Technology in Social Mobility Analytics and Cloud",
      type: "Book Chapter",
      isbn: "978-1-5136-1658-2",
      icon: BookOpen
    },
    {
      year: "2016",
      title: "The New Dialogue: Taking social media from talk to action in developing countries",
      publication: "International Journal of Multidisciplinary Research and Development",
      details: "Vol 2, Issue 10, pp 492–497",
      impactFactor: "5.742",
      issn: "e-ISSN: 2349-4182",
      type: "Journal",
      icon: FileText
    },
    {
      year: "2015",
      title: "Tweet to Sales - Focus on the Gen Y In the Indian Retail Industry",
      publication: "ACADEMICIA: An International Multidisciplinary Research Journal",
      impactFactor: "5.099",
      issn: "2249-7137",
      type: "Journal",
      icon: FileText
    },
    {
      year: "2015",
      title: "An Insight on Using Social Media as a Strategy to Facilitate Growth in the Indian Retail Industry",
      publication: "GE- International Journal of Management Research",
      impactFactor: "4.316",
      type: "Journal",
      icon: FileText
    },
    {
      year: "2015",
      title: "Retailing in the New Market Landscape: An Insight into Consumer Adaptive Retail",
      publication: "International Journal of Marketing, Financial Services & Management Research",
      details: "Vol.4(5), pp-140-150",
      impactFactor: "3.454",
      issn: "2277-3622",
      type: "Journal",
      icon: FileText
    },
    {
      year: "2015",
      title: "Marketing Innovation to meet Market Complexity in the 21st Century",
      publication: "Global Journal of Commerce and Management Perspective",
      details: "Vol 4, Issue 2",
      type: "Journal",
      icon: FileText
    },
    {
      year: "2015",
      title: "From Plan to Generating Revenue: How is Social Media Strategy Used to Generate Business",
      publication: "International Journal of Marketing and Technology",
      impactFactor: "4.077",
      issn: "2249-0558",
      type: "Journal",
      icon: FileText
    },
    {
      year: "2015",
      title: "Consumer to Consumer Conversation: Mechanism for Incentivizing social interactions",
      publication: "Book: New Paradigms of Management",
      isbn: "978-93-84144-25-8",
      type: "Book Chapter",
      icon: BookOpen
    },
    {
      year: "2014",
      title: "From High Street to Social Street - Has Facebook Shaped Luxury Brands",
      publication: "Journal of Business Management and Social Science Research",
      details: "Vol 3, No.12",
      impactFactor: "3.828",
      issn: "2319-5614",
      type: "Journal",
      icon: FileText
    },
    {
      year: "2014",
      title: "“Likes”, “Shares” and “Tweets” To Becoming a Prime Minister - “Ab Ki Baar, Modi Sarkar”",
      publication: "Book: Selected Caselets in Management",
      isbn: "978-81-921148-5-9",
      type: "Book Chapter",
      icon: BookOpen,
      highlight: true
    },
    {
      year: "2013",
      title: "Logitech and the Mouse that Roared",
      publication: "The Indian Economist",
      type: "Article",
      icon: Newspaper
    },
    {
      year: "2013",
      title: "21st Century in Retail: An Insight into Consumer Adaptive Retail",
      publication: "Abhinav Monthly Referred International Journal of Research- Management and Technology",
      impactFactor: "0.0812",
      issn: "2320-0073",
      type: "Journal",
      icon: FileText
    },
    {
      year: "2011",
      title: "Information Visualization",
      publication: "International Journal of Arts and Sciences at Harvard University, Boston, USA",
      type: "International",
      icon: Library,
      highlight: true
    },
    {
      year: "2010",
      title: "Knowledge Management",
      publication: "SCOOP HR (Online HR Magazine)",
      type: "Article",
      icon: Newspaper
    },
    {
      year: "2010",
      title: "The Myth of CHINDIA – Assessing the interdependence between India and China",
      publication: "Symbiosis University Journal “Myths and Realities – India Advantage – 2010”",
      type: "Journal",
      icon: FileText
    }
  ];

  const ergoArticles = [
    { year: "2013", title: "Indian Modern Retail – Vision 2020" },
    { year: "2010", title: "Marketing Strategies to Refrain India from Global Recession" },
    { year: "2009", title: "Blue Ocean Strategy" },
    { year: "2008", title: "Marketing Warfare" },
    { year: "2007", title: "Knowledge Management" }
  ];

  return (
    <>
    <Navbar />
    <div className="font-sans bg-white">
      
      <section className="relative bg-[#F9F5F1] py-10 lg:py-10 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            
            {/* Left Content */}
            <div className="z-10">
              <div className="inline-flex items-center bg-[#E8D8C4] text-[#561C24] px-4 py-2 rounded-full text-xs font-bold tracking-widest uppercase mb-6 shadow-sm">
                <Quote size={14} className="mr-2" />
                Academic Portfolio
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-[#561C24] leading-tight mb-6 font-serif">
                Published Works & <br/>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#561C24] to-[#D4AF37]">Scholarly Contributions</span>
              </h1>
              <p className="text-lg text-[#6D2932] leading-relaxed mb-8 max-w-lg">
                Exploring the intersections of Retail Marketing, Social Media Strategy, and Global Economics through rigorous research and impactful case studies.
              </p>
              <button className="bg-[#561C24] text-[#E8D8C4] px-8 py-3 rounded-lg font-semibold hover:bg-[#6D2932] transition-all hover:shadow-lg flex items-center group">
                View Latest Research
                <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={20} />
              </button>
            </div>

            {/* Right Side: 3-Image Collage */}
            <div className="relative h-[500px] w-full hidden lg:block">
              {/* IMAGE 1: Main Portrait (Back Right) */}
              <div className="absolute top-0 right-0 w-64 h-80 bg-white p-2 rounded-xl shadow-xl transform rotate-3 z-10 hover:z-30 hover:scale-105 transition-all duration-500">
                 <img src="https://media.licdn.com/dms/image/v2/C4E12AQFuw9rCKIKX4A/article-cover_image-shrink_600_2000/article-cover_image-shrink_600_2000/0/1551992107032?e=2147483647&v=beta&t=Pvq5L8E0-Q6stEUcbVEWS1phU2Mq_hkTSoJAJOsSQT4" alt="Conference" className="w-full h-full object-cover rounded-lg" />
              </div>

              {/* IMAGE 2: Landscape (Bottom Left) */}
              <div className="absolute bottom-10 left-10 w-72 h-48 bg-white p-2 rounded-xl shadow-xl transform -rotate-3 z-20 hover:z-30 hover:scale-105 transition-all duration-500">
                 <img src="https://img.freepik.com/free-photo/close-up-still-life-hard-exams_23-2149314038.jpg?semt=ais_hybrid&w=740&q=80" alt="Writing" className="w-full h-full object-cover rounded-lg" />
              </div>

              {/* IMAGE 3: Detail Shot (Center Overlap) */}
              <div className="absolute top-1/4 left-1/3 w-56 h-56 bg-[#561C24] p-2 rounded-full shadow-2xl z-30 border-4 border-[#E8D8C4] hover:scale-110 transition-transform duration-500 overflow-hidden">
                 <img src="https://images.template.net/wp-content/uploads/2017/06/Research-Papers.jpg" alt="Books" className="w-full h-full object-cover rounded-full opacity-90" />
              </div>
              
              {/* Decorative Elements */}
              <div className="absolute top-10 left-20 text-[#D4AF37] opacity-20 animate-pulse">
                <Star size={48} fill="currentColor" />
              </div>
            </div>

            {/* Mobile Image Fallback */}
            <div className="lg:hidden w-full h-64 rounded-xl overflow-hidden shadow-lg">
               <img src="https://img.freepik.com/free-photo/close-up-still-life-hard-exams_23-2149314038.jpg?semt=ais_hybrid&w=740&q=80" alt="Research" className="w-full h-full object-cover" />
            </div>

          </div>
        </div>
      </section>

      {/* =========================================
          PUBLICATIONS LIST
      ========================================= */}
      <section className="py-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 border-b border-[#E8D8C4] pb-6">
          <div>
            <h2 className="text-3xl font-bold text-[#561C24] mb-2">Publications Archive</h2>
            <p className="text-[#6D2932]">A comprehensive list of journals, book chapters, and articles.</p>
          </div>
          <div className="mt-4 md:mt-0 bg-[#F9F5F1] px-4 py-2 rounded-lg text-[#561C24] text-sm font-semibold">
            Total Publications: {publications.length + ergoArticles.length}
          </div>
        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {publications.map((item, index) => {
            const Icon = item.icon;
            return (
              <div 
                key={index}
                className={`
                  relative bg-white p-6 rounded-xl border transition-all duration-300 hover:shadow-xl group
                  ${item.highlight ? 'border-[#561C24] ring-1 ring-[#561C24]/10 bg-[#fffdfa]' : 'border-[#E8D8C4] hover:border-[#561C24]'}
                `}
              >
                {/* Highlight Badge */}
                {item.highlight && (
                  <div className="absolute -top-3 right-4 bg-[#561C24] text-[#E8D8C4] text-[10px] font-bold px-2 py-1 rounded shadow-sm uppercase tracking-wider">
                    Featured
                  </div>
                )}

                <div className="flex items-start gap-4">
                  {/* Icon Box */}
                  <div className={`
                    p-3 rounded-lg flex-shrink-0
                    ${item.highlight ? 'bg-[#561C24] text-[#E8D8C4]' : 'bg-[#F9F5F1] text-[#561C24]'}
                  `}>
                    <Icon size={24} />
                  </div>

                  {/* Content */}
                  <div className="flex-1">
                    <div className="flex justify-between items-start">
                      <span className="text-xs font-bold text-[#6D2932] bg-[#E8D8C4]/30 px-2 py-0.5 rounded mb-2 inline-block">
                        {item.type}
                      </span>
                      <span className="text-sm font-bold text-[#D4AF37]">{item.year}</span>
                    </div>

                    <h3 className="text-lg font-bold text-[#2C2621] leading-tight mb-2 group-hover:text-[#561C24] transition-colors">
                      {item.title}
                    </h3>

                    <p className="text-sm text-[#5C5144] italic mb-3">
                      {item.publication} {item.details && <span>, {item.details}</span>}
                    </p>

                    {/* Meta Details (Impact Factor / ISBN) */}
                    <div className="flex flex-wrap gap-3 mt-auto pt-3 border-t border-gray-100">
                      {item.impactFactor && (
                        <span className="flex items-center text-xs font-medium text-[#561C24]">
                          <Star size={12} className="mr-1 fill-[#D4AF37] text-[#D4AF37]" />
                          Impact Factor: {item.impactFactor}
                        </span>
                      )}
                      {item.isbn && (
                        <span className="text-xs text-gray-500 font-mono">
                          ISBN: {item.isbn}
                        </span>
                      )}
                      {item.issn && (
                        <span className="text-xs text-gray-500 font-mono">
                          ISSN: {item.issn}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* ERGO Magazine Section */}
        <div className="mt-16 bg-[#561C24] text-[#E8D8C4] rounded-2xl p-8 md:p-12 relative overflow-hidden">
          {/* Decorative Background Icon */}
          <Newspaper className="absolute top-1/2 right-10 -translate-y-1/2 text-white/5 rotate-12" size={300} />
          
          <div className="relative z-10">
            <h3 className="text-2xl font-bold mb-6 flex items-center">
              <Bookmark className="mr-3" />
              Contributions to ERGO Magazine (Jain University)
            </h3>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {ergoArticles.map((article, idx) => (
                <div key={idx} className="bg-white/10 backdrop-blur-sm p-4 rounded-lg border border-white/10 hover:bg-white/20 transition-colors">
                  <span className="block text-xs font-bold text-[#D4AF37] mb-1">{article.year}</span>
                  <p className="font-medium text-white leading-snug">
                    {article.title}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

      </section>
    </div>
    <Footer />
    </>
  );
};

export default ArticlePublications;