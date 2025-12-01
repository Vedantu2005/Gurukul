import React, { useState, useEffect } from 'react';
import {
    ArrowRight,
    BookOpen,
    Sparkles,
    Calendar,
    MapPin,
    Hash,
    Loader,
    Star
} from 'lucide-react';
import { collection, onSnapshot, query, orderBy } from 'firebase/firestore';
import { db } from '../firebase'; 
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';

const ResearchPapers = () => {
    const [papers, setPapers] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Fetch ALL papers, sorted by creation date
        const papersRef = collection(db, 'researchPapers');
        const q = query(papersRef, orderBy('createdAt', 'desc')); 

        const unsubscribe = onSnapshot(q, (snapshot) => {
            const fetchedPapers = snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));
            setPapers(fetchedPapers);
            setLoading(false);
        }, (error) => {
            console.error("Error fetching papers:", error);
            setLoading(false);
        });

        return () => unsubscribe();
    }, []);

    return (
        <>
            <Navbar />
            <div className="font-sans">
                {/* Hero Section */}
                <section className="relative bg-gradient-to-br from-[#E8D8C4] via-white to-[#F9F5F1] py-20 lg:py-10 overflow-hidden">
                    <div className="absolute top-0 right-0 -translate-y-1/4 translate-x-1/4 bg-[#561C24] w-96 h-96 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob"></div>
                    <div className="absolute bottom-0 left-0 translate-y-1/4 -translate-x-1/4 bg-[#D4AF37] w-96 h-96 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>

                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
                            <div className="space-y-8 text-center lg:text-left">
                                <div className="inline-flex items-center bg-[#561C24]/5 rounded-full px-4 py-2 text-[#561C24] font-bold text-sm tracking-wider uppercase mb-2">
                                    <Sparkles size={16} className="mr-2 text-[#D4AF37]" />
                                    Values • Academics • Leadership
                                </div>
                                <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-[#561C24] leading-tight font-serif">
                                    Bridging <span className="relative whitespace-nowrap text-transparent bg-clip-text bg-gradient-to-r from-[#561C24] to-[#D4AF37]">
                                        Ancient Wisdom
                                    </span> with Modern Excellence.
                                </h1>
                                <p className="text-lg md:text-xl text-[#6D2932] max-w-2xl mx-auto lg:mx-0 leading-relaxed font-medium">
                                    Empowering individuals through a holistic approach that blends academic rigor, spiritual grounding, and global perspectives.
                                </p>
                            </div>
                            <div className="relative hidden lg:block h-[600px] w-full">
                                {/* Decorative images (kept same as your original) */}
                                <div className="absolute top-0 right-0 w-4/5 h-5/6 bg-[#561C24] rounded-3xl overflow-hidden shadow-2xl transform rotate-6 opacity-90">
                                    <div className="absolute inset-0 bg-gradient-to-t from-[#561C24] to-transparent opacity-60"></div>
                                </div>
                                <div className="absolute bottom-0 left-10 w-4/5 h-5/6 bg-white rounded-3xl overflow-hidden shadow-2xl border-[6px] border-white transform -rotate-3 z-20">
                                     <div className="w-full h-full bg-gray-200 flex items-center justify-center text-gray-400">Research Image</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Papers List */}
                <section className="py-20 bg-white">
                    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center mb-16">
                            <h2 className="text-3xl md:text-4xl font-bold text-[#561C24] mb-4">
                                Research Papers & Publications
                            </h2>
                            <div className="w-24 h-1 bg-[#6D2932] mx-auto mb-6"></div>
                            <p className="max-w-2xl mx-auto text-[#6D2932] font-medium">
                                Full archive of academic contributions.
                            </p>
                        </div>

                        {loading ? (
                            <div className="flex justify-center">
                                <Loader className="w-12 h-12 text-[#561C24] animate-spin" />
                            </div>
                        ) : (
                            <div className="relative border-l-4 border-[#E8D8C4] ml-4 md:ml-8 space-y-10">
                                {papers.length === 0 ? (
                                    <p className="pl-8 text-gray-500">No papers found.</p>
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
                                                {/* Header */}
                                                <div className="flex flex-wrap justify-between items-start mb-3">
                                                    <div className="flex items-center gap-2">
                                                        <span className={`
                                                            text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide
                                                            ${paper.highlight ? 'bg-[#E8D8C4] text-[#561C24]' : 'bg-[#E8D8C4] text-[#561C24]'}
                                                        `}>
                                                            {paper.type}
                                                        </span>
                                                        {paper.highlight && (
                                                            <span className="bg-[#D4AF37] text-white text-[10px] font-bold px-2 py-0.5 rounded flex items-center">
                                                                <Star size={10} className="mr-1 fill-current" /> Featured
                                                            </span>
                                                        )}
                                                    </div>
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
            <Footer />
        </>
    );
};

export default ResearchPapers;