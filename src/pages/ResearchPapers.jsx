import React, { useState, useEffect } from 'react';
import {
    ArrowRight,
    BookOpen,
    Sparkles,
    Calendar,
    MapPin,
    Hash,
    Loader
} from 'lucide-react';
import { collection, onSnapshot, query, orderBy } from 'firebase/firestore';
import { db } from '../firebase';

// NOTE: Navbar and Footer imports are removed to prevent duplicates 
// since App.jsx handles them globally.

const ResearchPapers = () => {
    const [papers, setPapers] = useState([]);
    const [loading, setLoading] = useState(true);

    // --- Fetch Real-time Data from Firestore ---
    useEffect(() => {
        // Fetch papers from 'researchPapers' collection
        // Ordered by 'createdAt' desc (newest added first)
        // If you want to sort by the manually entered date string, you might need client-side sorting
        const q = query(collection(db, 'researchPapers'), orderBy('createdAt', 'desc'));

        const unsubscribe = onSnapshot(q, (snapshot) => {
            const fetchedPapers = snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));
            setPapers(fetchedPapers);
            setLoading(false);
        }, (error) => {
            console.error("Error fetching research papers:", error);
            setLoading(false);
        });

        return () => unsubscribe();
    }, []);

    return (
        <div className="font-sans">
            <section className="relative bg-gradient-to-br from-[#E8D8C4] via-white to-[#F9F5F1] py-20 lg:py-10 overflow-hidden">

                {/* Decorative Background Elements */}
                <div className="absolute top-0 right-0 -translate-y-1/4 translate-x-1/4 bg-[#561C24] w-96 h-96 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob"></div>
                <div className="absolute bottom-0 left-0 translate-y-1/4 -translate-x-1/4 bg-[#D4AF37] w-96 h-96 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">

                        {/* --- Left Side: Content --- */}
                        <div className="space-y-8 text-center lg:text-left">
                            {/* Subtle Tagline */}
                            <div className="inline-flex items-center bg-[#561C24]/5 rounded-full px-4 py-2 text-[#561C24] font-bold text-sm tracking-wider uppercase mb-2">
                                <Sparkles size={16} className="mr-2 text-[#D4AF37]" />
                                Values • Academics • Leadership
                            </div>

                            {/* Main Headline */}
                            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-[#561C24] leading-tight font-serif">
                                Bridging <span className="relative whitespace-nowrap text-transparent bg-clip-text bg-gradient-to-r from-[#561C24] to-[#D4AF37]">
                                    Ancient Wisdom
                                    {/* SVG Underline */}
                                    <svg aria-hidden="true" viewBox="0 0 418 42" className="absolute top-2/3 left-0 h-[0.58em] w-full fill-[#D4AF37]/20 pointer-events-none" preserveAspectRatio="none">
                                        <path d="M203.371.916c-26.013-2.078-76.686 1.963-124.73 9.987-77.478 12.93-132.333 35.416-159.558 56.662-8.822 6.913-19.157 17.833-18.152 22.903 1.375 6.95 17.625 3.385 22.488 2.18 98.573-24.535 180.627-45.612 219.305-52.203 46.185-7.869 106.507-11.44 150.368-11.087 22.009.177 39.543 2.536 44.994 4.582 8.323 3.118 16.452 11.218 16.679 16.96.256 6.497-11.017 12.492-17.928 14.297-14.783 3.859-45.007 4.047-59.623 2.693-24.41-2.261-61.438-10.58-89.042-19.567C250.15 36.677 192.42 28.465 161.898 26.137c-25.21-1.923-41.451-2.676-45.826-1.844-8.302 1.586-27.833 8.823-17.379 18.403 5.045 4.616 16.183 6.12 26.72 5.792 24.03-.752 59.001-10.677 83.406-18.74 35.554-11.755 83.14-27.95 119.41-30.605 33.287-2.435 61.426 1.567 70.898 3.986 15.37 3.919 26.361 16.143 23.837 25.286-2.88 10.422-23.588 12.98-38.519 14.327-46.023 4.158-91.368 2.248-133.242-4.587-20.859-3.399-48.527-10.72-71.426-17.026-21.049-5.795-38.627-10.62-49.622-12.596-32.635-5.863-62.248-5.568-77.995-3.304C27.299 62.06 7.678 74.217.738 84.079c-4.47 6.36-6.152 16.023-2.436 20.612 4.03 4.971 17.717 5.832 31.82 1.102 48.015-16.131 108.45-55.719 184.706-68.48 80.547-13.469 161.348-11.536 211.835-4.945 23.565 3.073 49.76 10.162 65.763 17.902 15.869 7.68 25.05 24.226 18.625 34.833-7.899 13.04-37.703 17.094-58.361 17.81-58.482 2.023-125.913-9.056-182.628-25.804-24.832-7.333-56.628-18.377-82.529-27.123-16.31-5.51-31.559-10.33-42.347-13.102-31.553-8.094-59.662-8.986-78.306-7.163-38.846 3.799-69.082 18.827-85.18 29.044-10.688 6.78-18.246 19.526-13.975 28.494 5.645 11.833 26.236 14.147 49.138 8.98 43.099-9.715 92.24-34.016 155.659-53.33 80.683-24.572 166.134-31.738 238.986-18.979 24.195 4.237 52.042 12.521 68.008 21.817 14.747 8.577 21.882 24.997 16.136 35.073-6.624 11.615-34.104 17.106-55.885 19.232-55.287 5.39-126.43-5.114-191.137-24.86-30.194-9.212-70.887-23.731-102.235-33.788-13.171-4.225-24.449-7.504-32.265-9.392-32.86-7.947-61.824-9.205-81.531-6.421-27.541 3.89-48.358 15.428-58.922 25.09-12.169 11.124-16.731 26.628-7.153 35.983 12.732 12.432 44.453 15.65 84.726 8.714C300.565 114.443 430.983 49.427 510.887 7.775 532.31-3.34 545.83-13.078 542.352-23.617c-3.184-9.65-19.103-16.14-42.358-18.414-24.407-2.387-57.631 3.138-96.629 11.911z" />
                                    </svg>
                                </span> with Modern Excellence.
                            </h1>

                            {/* Subtitle Paragraph */}
                            <p className="text-lg md:text-xl text-[#6D2932] max-w-2xl mx-auto lg:mx-0 leading-relaxed font-medium">
                                Empowering individuals through a holistic approach that blends academic rigor, spiritual grounding, and global perspectives for a transformative leadership journey.
                            </p>

                            {/* Buttons */}
                            <div className="flex flex-wrap justify-center lg:justify-start gap-4 mt-8">
                                <button className="bg-[#561C24] text-[#E8D8C4] px-8 py-4 rounded-full font-bold text-lg hover:bg-[#6D2932] transition-all duration-300 flex items-center shadow-lg hover:shadow-[#561C24]/40 hover:-translate-y-1">
                                    Explore Our Vision <ArrowRight size={22} className="ml-2" />
                                </button>
                                <button className="bg-white text-[#561C24] px-8 py-4 rounded-full font-bold text-lg border-2 border-[#561C24] hover:bg-[#E8D8C4]/50 transition-all duration-300 flex items-center hover:-translate-y-1">
                                    View Achievements
                                </button>
                            </div>
                        </div>

                        <div className="relative hidden lg:block h-[600px] w-full">

                            {/* IMAGE 1 (Back/Traditional Layer) - Tilted Right */}
                            <div className="absolute top-0 right-0 w-4/5 h-5/6 bg-[#561C24] rounded-3xl overflow-hidden shadow-2xl transform rotate-6 opacity-90 transition-transform group-hover:rotate-12">
                                <img
                                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQJQIBQjoX5KzmW877bzwlFf6cgyCma7JOMJTH2I_EyX7HBbkin-0iHx6oQ2rxGBKgSbGM&usqp=CAU"
                                    alt="Traditional Values Foundation"
                                    className="w-full h-full object-cover mix-blend-overlay opacity-60"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-[#561C24] via-transparent to-transparent opacity-60"></div>
                            </div>

                            {/* IMAGE 2 (Front/Modern Layer) - Tilted Left & Overlapping */}
                            <div className="absolute bottom-0 left-10 w-4/5 h-5/6 bg-white rounded-3xl overflow-hidden shadow-[0_35px_60px_-15px_rgba(0,0,0,0.3)] border-[6px] border-white transform -rotate-3 hover:rotate-0 transition-all duration-500 z-20">
                                <img
                                    src="https://img.freepik.com/free-photo/aerial-view-novel-white-marble-table_53876-30250.jpg?semt=ais_hybrid&w=740&q=80"
                                    alt="Modern Achievement and Success"
                                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                                />
                            </div>

                            {/* Floating Badge */}
                            <div className="absolute bottom-10 right-10 z-30 bg-[#D4AF37] text-[#561C24] p-4 rounded-xl shadow-lg flex items-center font-bold animate-bounce-slow">
                                <BookOpen size={24} className="mr-2" />
                                <span>Holistic Education</span>
                            </div>

                        </div>

                        {/* Mobile View Image */}
                        <div className="lg:hidden mt-8">
                            <div className="rounded-2xl overflow-hidden shadow-xl border-4 border-white transform -rotate-2">
                                <img
                                    src="https://img.freepik.com/free-photo/aerial-view-novel-white-marble-table_53876-30250.jpg?semt=ais_hybrid&w=740&q=80"
                                    alt="SaiSanskrithi Gurukul"
                                    className="w-full h-auto object-cover"
                                />
                            </div>
                        </div>

                    </div>
                </div>
            </section>

            <section className="py-20 bg-white">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

                    {/* Research Header */}
                    <div className="text-center mb-16">

                        <h2 className="text-3xl md:text-4xl font-bold text-[#561C24] mb-4">
                            Research Papers & Publications
                        </h2>
                        <div className="w-24 h-1 bg-[#6D2932] mx-auto mb-6"></div>
                        <p className="max-w-2xl mx-auto text-[#6D2932] font-medium">
                            A chronicle of academic contributions to International Business, Marketing, and Education.
                        </p>
                    </div>

                    {/* Loading State */}
                    {loading ? (
                        <div className="flex justify-center items-center py-20">
                            <Loader className="w-12 h-12 text-[#561C24] animate-spin" />
                        </div>
                    ) : (
                        /* Timeline Layout */
                        <div className="relative border-l-4 border-[#E8D8C4] ml-4 md:ml-8 space-y-10">
                            {papers.length === 0 ? (
                                <div className="pl-8 text-gray-500 italic text-lg">No research papers found. Add some from the Admin Panel.</div>
                            ) : (
                                papers.map((paper, index) => (
                                    <div key={index} className="relative pl-8 md:pl-12 group">

                                        {/* Timeline Dot */}
                                        <div className={`absolute -left-[11px] top-6 w-5 h-5 rounded-full border-4 border-white transition-colors duration-300 ${paper.highlight ? 'bg-[#D4AF37] scale-125' : 'bg-[#561C24]'}`}></div>

                                        {/* Content Card */}
                                        <div className={`
                                            p-6 rounded-lg border shadow-sm transition-all duration-300 hover:shadow-xl hover:-translate-y-1
                                            ${paper.highlight ? 'bg-gradient-to-r from-[#561C24] to-[#6D2932] text-white border-transparent' : 'bg-[#F9F5F1] border-[#E8D8C4]'}
                                        `}>

                                            {/* Header: Type & Date */}
                                            <div className="flex flex-wrap justify-between items-start mb-3">
                                                <span className={`
                                                    text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide
                                                    ${paper.highlight ? 'bg-[#E8D8C4] text-[#561C24]' : 'bg-[#E8D8C4] text-[#561C24]'}
                                                `}>
                                                    {paper.type}
                                                </span>
                                                <div className={`flex items-center text-sm font-semibold ${paper.highlight ? 'text-[#E8D8C4]' : 'text-[#6D2932]'}`}>
                                                    <Calendar size={14} className="mr-2" />
                                                    {paper.date}
                                                </div>
                                            </div>

                                            {/* Title */}
                                            <h3 className={`text-xl font-bold mb-3 leading-snug whitespace-pre-line ${paper.highlight ? 'text-white' : 'text-[#561C24]'}`}>
                                                {paper.title}
                                            </h3>

                                            {/* Details */}
                                            <div className="space-y-2">
                                                <div className={`flex items-start ${paper.highlight ? 'text-gray-200' : 'text-gray-700'}`}>
                                                    <BookOpen size={16} className="mt-1 mr-2 flex-shrink-0" />
                                                    <span className="font-medium text-sm md:text-base">{paper.conf}</span>
                                                </div>

                                                <div className={`flex items-start ${paper.highlight ? 'text-gray-200' : 'text-gray-700'}`}>
                                                    <MapPin size={16} className="mt-1 mr-2 flex-shrink-0" />
                                                    <span className="text-sm md:text-base">{paper.loc}</span>
                                                </div>

                                                {/* ISBN Tag */}
                                                {paper.isbn && (
                                                    <div className={`flex items-center mt-3 text-xs font-mono ${paper.highlight ? 'text-[#E8D8C4]' : 'text-[#6D2932]'}`}>
                                                        <Hash size={12} className="mr-1" />
                                                        ISBN: {paper.isbn}
                                                    </div>
                                                )}
                                            </div>

                                        </div>
                                    </div>
                                ))
                            )}
                        </div>
                    )}
                </div>
            </section>
        </div>
    );
};

export default ResearchPapers;