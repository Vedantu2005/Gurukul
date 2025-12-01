import React, { useState, useEffect } from 'react';
import {
  ArrowRight,
  BookOpen,
  Calendar,
  MapPin,
  Hash,
  Loader,
  Star
} from 'lucide-react';
import { collection, query, orderBy, limit, onSnapshot } from 'firebase/firestore';
import { db } from '../firebase'; // Adjust path if needed

const Research = () => {
  const [papers, setPapers] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch only the latest 3 papers for the Home Page preview
  useEffect(() => {
    const papersRef = collection(db, 'researchPapers');
    // Sort by 'createdAt' to show newest entries first, limit to 3
    const q = query(papersRef, orderBy('createdAt', 'desc'), limit(3));

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

  if (loading) {
    return (
      <div className="py-20 bg-white text-center">
        <div className="flex justify-center items-center">
          <Loader className="w-10 h-10 text-[#561C24] animate-spin" />
        </div>
      </div>
    );
  }

  return (
    <div className="font-sans">
      <section className="py-10 bg-white">
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

          {/* Timeline Layout */}
          <div className="relative border-l-4 border-[#E8D8C4] ml-4 md:ml-8 space-y-10">
            {papers.length === 0 ? (
              <div className="pl-8 text-gray-500">No research papers added yet.</div>
            ) : (
              papers.map((paper) => (
                <div key={paper.id} className="relative pl-8 md:pl-12 group">

                  {/* Timeline Dot */}
                  <div className={`absolute -left-[11px] top-6 w-5 h-5 rounded-full border-4 border-white transition-colors duration-300 ${paper.highlight ? 'bg-[#D4AF37] scale-125' : 'bg-[#561C24]'}`}></div>

                  {/* Content Card */}
                  <div className={`
                    p-6 rounded-lg border shadow-sm transition-all duration-300 hover:shadow-xl hover:-translate-y-1
                    ${paper.highlight ? 'bg-gradient-to-r from-[#561C24] to-[#6D2932] text-white border-transparent' : 'bg-[#F9F5F1] border-[#E8D8C4]'}
                  `}>

                    {/* Header: Type & Date */}
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

          <div className="text-center mt-12">
            <a
              href="/research"
              className="inline-flex items-center px-8 py-4 bg-[#561C24] text-[#E8D8C4] font-bold rounded-full shadow-lg hover:bg-[#6D2932] hover:scale-105 transition-all duration-300 group"
            >
              View All Research
              <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={20} />
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Research;