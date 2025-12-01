import React, { useState, useRef } from 'react';
import { Award, Users, BookOpen, Globe, ChevronRight, Heart, ChevronLeft } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Achievements from '../components/Achievements';
import Seminars from '../components/Seminars';
import Awards from '../components/Awards';

const About = () => {
    const [hoveredCard, setHoveredCard] = useState(null);
    const pressScrollRef = useRef(null);
    const awardsScrollRef = useRef(null);
    const communityScrollRef = useRef(null);
    const accentGradient = "bg-gradient-to-br from-[#561C24] to-[#6D2932]";


    const scrollCarousel = (ref, direction) => {
        if (ref.current) {
            const scrollAmount = 400;
            if (direction === 'left') {
                ref.current.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
            } else {
                ref.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
            }
        }
    };

    const achievements = [
        {
            icon: <Award size={32} />,
            title: "15+ Awards",
            description: "Excellence in Education & Innovation",
            color: "from-[#C7B7A3] to-[#E8D8C4]"
        },
        {
            icon: <Users size={32} />,
            title: "500+ Students",
            description: "Transforming lives daily",
            color: "from-[#E8D8C4] to-[#C7B7A3]"
        },
        {
            icon: <BookOpen size={32} />,
            title: "Ancient Wisdom",
            description: "Blended with Modern Education",
            color: "from-[#C7B7A3] to-[#E8D8C4]"
        },
        {
            icon: <Globe size={32} />,
            title: "Global Reach",
            description: "Connecting cultures through learning",
            color: "from-[#E8D8C4] to-[#C7B7A3]"
        }
    ];

    const pressItems = [
        { img: "/paper/paper1.jpg", title: "" },
        { img: "/paper/paper2.jpg", title: "" },
        { img: "/paper/paper3.jpg", title: "" },
        { img: "/paper/paper4.jpg", title: "" },
        { img: "/paper/paper17.jpg", title: "" },
        { img: "/paper/paper8.jpg", title: "" },
        { img: "/paper/paper9.jpg", title: "" },
        { img: "/paper/paper10.jpg", title: "" },
        { img: "/paper/paper12.jpg", title: "" },
        { img: "/paper/paper5.jpg", title: "" },
        { img: "/paper/paper6.jpg", title: "" },
        { img: "/paper/paper7.jpg", title: "" },
        { img: "/paper/paper13.jpg", title: "" },
        { img: "/paper/paper14.jpg", title: "" },
        { img: "/paper/paper16.jpg", title: "" },
        { img: "/paper/paper18.jpg", title: "" },
        { img: "/paper/paper11.jpg", title: "" },
        { img: "/paper/paper15.jpg", title: "" },
    ];

    const awardItems = [
        { img: "/award/award2.jpg", title: "" },
        { img: "/award/award3.jpg", title: "" },
        { img: "/award/award13.jpg", title: "" },
        { img: "/award/award5.jpg", title: "" },
        { img: "/award/award6.jpg", title: "" },
        { img: "/award/award7.jpg", title: "" },
        { img: "/award/award16.jpg", title: "" },
        { img: "/award/award17.jpg", title: "" },
        { img: "/award/award18.jpg", title: "" },
        { img: "/award/award4.jpg", title: "" },
        { img: "/award/award8.jpg", title: "" },
        { img: "/award/award9.jpg", title: "" },
        { img: "/award/award10.jpg", title: "" },
        { img: "/award/award11.jpg", title: "" },
        { img: "/award/award12.jpg", title: "" },
        { img: "/award/award14.jpg", title: "" },
        { img: "/award/award15.jpg", title: "" },
        { img: "/award/award19.jpg", title: "" },
        { img: "/award/award20.jpg", title: "" },
        { img: "/award/award21.jpg", title: "" },
        { img: "/award/award23.jpg", title: "" },
        { img: "/award/award24.jpg", title: "" },
        { img: "/award/award25.jpg", title: "" },
        { img: "/award/award26.jpg", title: "" },
        { img: "/award/award22.jpg", title: "" },
    ];

    const communityItems = [
        { img: "/person/award1.jpg", title: "With former Governer of Tamil Nadu- bhishma naren Singh ji" },
        { img: "/person/person1.jpg", title: "With Professor Philip kotler sir- Guru of Marketing" },
        { img: "/person/person2.jpg", title: "With Al Ries and Laura Ries- Gurus of Advertising" },
        { img: "/person/person3.jpg", title: "With Dr.Jagdish Sheth and Dr.Milton kotler" },
        { img: "/person/person5.jpg", title: "With Dr.Parasuraman sir- created the SERQUAL model of service marketing" },
        { img: "/person/person6.jpg", title: "With Dr Dipak C Jain a renound marketing professor" },
    ];

    const renderGallery = (items, scrollRef, badgeText) => (
        <div className="relative group">
            <div
                ref={scrollRef}
                className="flex gap-6 overflow-x-auto scroll-smooth pb-8 no-scrollbar px-2"
            >
                {items.map((item, idx) => {
                    return (
                        <div
                            key={idx}
                            className="flex-shrink-0 w-72 flex flex-col group/card cursor-pointer"
                        >
                            {/* Image Container */}
                            <div className="h-64 w-full rounded-xl overflow-hidden border border-[#C7B7A3] relative shadow-lg bg-white hover:shadow-[#6D2932]/20 transition-all duration-300 p-2">
                                <img
                                    src={item.img}
                                    alt={item.title}
                                    className="w-full h-full object-contain transition-transform duration-500 group-hover/card:scale-105"
                                />
                                <div className="absolute inset-0 bg-[#561C24]/5 opacity-0 group-hover/card:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                            </div>

                            {/* Name/Title Display Below Image */}
                            <div className="mt-4 text-center px-2">
                                <h4 className="text-[#561C24] font-bold text-lg tracking-wide leading-tight group-hover/card:text-[#6D2932] transition-colors">
                                    {item.title}
                                </h4>
                                <div className="h-0.5 w-0 bg-[#6D2932] mx-auto mt-2 transition-all duration-300 group-hover/card:w-1/2"></div>
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Left Button */}
            <button
                onClick={() => scrollCarousel(scrollRef, 'left')}
                className="absolute -left-4 md:-left-12 top-1/3 -translate-y-1/2 z-20 bg-[#561C24] hover:bg-[#6D2932] text-[#E8D8C4] p-3 rounded-full border-2 border-[#561C24] hover:border-[#6D2932] transition-all duration-300 opacity-0 group-hover:opacity-100 shadow-xl"
            >
                <ChevronLeft size={24} />
            </button>

            {/* Right Button */}
            <button
                onClick={() => scrollCarousel(scrollRef, 'right')}
                className="absolute -right-4 md:-right-12 top-1/3 -translate-y-1/2 z-20 bg-[#561C24] hover:bg-[#6D2932] text-[#E8D8C4] p-3 rounded-full border-2 border-[#561C24] hover:border-[#6D2932] transition-all duration-300 opacity-0 group-hover:opacity-100 shadow-xl"
            >
                <ChevronRight size={24} />
            </button>
        </div>
    );

    return (
        <>
            <Navbar />
            <div className="bg-[#E8D8C4] text-[#561C24] overflow-hidden">
                {/* Hero Section */}
                <section className="relative pt-20 pb-12 md:pt-12 md:pb-20 px-4 sm:px-6 lg:px-8">
                    {/* Background Blurs */}
                    <div className="absolute inset-0 opacity-40">
                        <div className="absolute top-20 left-10 w-32 h-32 bg-[#C7B7A3] rounded-full blur-3xl"></div>
                        <div className="absolute bottom-20 right-10 w-40 h-40 bg-[#C7B7A3] rounded-full blur-3xl"></div>
                    </div>

                    <div className="max-w-7xl mx-auto relative z-10">
                        {/* Heading */}
                        <div className="text-center mb-12 md:mb-10">
                            <h1 className="text-4xl md:text-6xl font-bold mb-4 text-[#561C24]">
                                About <span className="text-[#6D2932]">Dr. Sai Sanskrithi</span>
                            </h1>
                            <p className="text-lg md:text-xl text-[#6D2932]">
                                Academic Visionary | Leadership Coach | Spiritual Healer
                            </p>
                        </div>

                        {/* About Content */}
                        <div className="max-w-4xl mx-auto text-center md:text-center space-y-6">
                            <p className="text-[#561C24]/90 leading-relaxed text-lg">
                                Dr.Sai Sanskrithi is well known in the spheres of academia and leadership development. With a comprehensive background that uniquely blends rigorous academic achievement with innovative teaching practices, she is dedicated to shaping the next generation of effective leaders, management professionals and academia.
                            </p>

                            <p className="text-[#561C24]/90 leading-relaxed text-lg">
                                Dr. Sai Sanskrithi embodies a trinity of influence, seamlessly uniting high-level academic expertise, profound spiritual devotion, and dedicated social service in her life and work.

                            </p>

                            {/* Tags */}
                            <div className="flex flex-wrap justify-center  gap-3">
                                <span className="px-4 py-2 rounded-full text-white text-sm font-medium shadow-md bg-gradient-to-br from-[#561C24] to-[#6D2932]">
                                    Double Post Graduate
                                </span>
                                <span className="px-4 py-2 rounded-full text-white text-sm font-medium shadow-md bg-gradient-to-br from-[#561C24] to-[#6D2932]">
                                    PhD in Management
                                </span>
                                <span className="px-4 py-2 rounded-full text-white text-sm font-medium shadow-md bg-gradient-to-br from-[#561C24] to-[#6D2932]">
                                    Reiki Healer
                                </span>
                            </div>
                        </div>
                    </div>
                </section>

                <Achievements />
                <Seminars />
                <Awards />

                {/* Gallery Section with Continuous Scrolling */}
                <section className="py-10 md:py-10 px-4 sm:px-6 lg:px-8">
                    <div className="max-w-7xl mx-auto">
                        <div className="text-center mb-12">
                            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-[#561C24]">
                                In the <span className="text-[#6D2932]">Spotlight</span>
                            </h2>
                            <p className="text-[#6D2932] text-lg">Press coverage, awards, events and achievements that celebrate our journey</p>
                        </div>

                        {/* Press Coverage */}
                        <div className="mb-20">
                            <h3 className="text-2xl font-bold text-[#561C24] mb-8 flex items-center gap-2">
                                Press Coverage
                            </h3>
                            {renderGallery(pressItems, pressScrollRef, "Press")}
                        </div>

                        {/* Awards & Recognition */}
                        <div className="mb-20">
                            <h3 className="text-2xl font-bold text-[#561C24] mb-8 flex items-center gap-2">
                                Awards & Recognition
                            </h3>
                            {renderGallery(awardItems, awardsScrollRef, "Award")}
                        </div>

                        {/* Community & People */}
                        <div>
                            <h3 className="text-2xl font-bold text-[#561C24] mb-8 flex items-center gap-2">
                                Community Moments
                            </h3>
                            {renderGallery(communityItems, communityScrollRef, "People")}
                        </div>
                    </div>
                </section>

                <style jsx>{`
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

        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none; 
          scrollbar-width: none; 
        }
      `}</style>
            </div>
            <Footer />
        </>
    );
};

export default About;