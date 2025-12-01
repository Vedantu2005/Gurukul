import React, { useState, useEffect } from 'react';
import { FileText, BookOpen, ArrowRight, Star, Library, Newspaper, Loader } from 'lucide-react';
import { collection, query, orderBy, limit, onSnapshot } from 'firebase/firestore';
import { db } from '../firebase'; // Ensure this path is correct

const ArticlesPreview = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const articlesRef = collection(db, 'articles');
    
    // SIMPLIFIED QUERY: Just get the latest 3 articles ordered by year.
    // This avoids "Missing Index" errors from Firebase.
    const q = query(articlesRef, orderBy('year', 'desc'), limit(3));

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const fetchedArticles = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      
      // Optional: Filter out 'Ergo' articles in Javascript instead of Firestore
      // const filtered = fetchedArticles.filter(a => a.category !== 'Ergo');
      
      setArticles(fetchedArticles); 
      setLoading(false);
    }, (error) => {
      console.error("Error fetching articles:", error);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  // Helper to pick icon
  const getIcon = (type) => {
    if (type === 'Book Chapter') return BookOpen;
    if (type === 'International') return Library;
    if (type === 'Article') return Newspaper;
    return FileText; // Default for Journals
  };

  return (
    <section className="py-10 bg-[#F9F5F1]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* --- Header Section --- */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-[#561C24] mb-4 font-serif">
            Published Articles
          </h2>
          <div className="w-24 h-1 bg-[#6D2932] mx-auto mb-4"></div>
          <p className="text-[#6D2932] max-w-2xl mx-auto text-lg leading-relaxed">
            A selection of scholarly work exploring the intersections of Retail Marketing, Social Media Strategy, and Economics.
          </p>
        </div>

        {/* --- Loading State --- */}
        {loading ? (
           <div className="flex justify-center py-12">
             <Loader className="w-10 h-10 text-[#561C24] animate-spin"/>
           </div>
        ) : (
          /* --- Cards Grid (Top 3) --- */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {articles.length === 0 ? (
              <div className="col-span-full text-center text-gray-500 italic py-8">
                No articles found. Please add articles from the Admin Panel.
              </div>
            ) : (
              articles.map((item) => {
                const Icon = getIcon(item.type);
                return (
                  <div 
                    key={item.id}
                    className="bg-white rounded-xl p-6 shadow-md hover:shadow-xl transition-all duration-300 border-t-4 border-[#561C24] hover:-translate-y-2 flex flex-col h-full group"
                  >
                    {/* Card Header */}
                    <div className="flex justify-between items-start mb-4">
                      <div className="bg-[#F9F5F1] p-3 rounded-lg text-[#561C24] group-hover:bg-[#561C24] group-hover:text-[#E8D8C4] transition-colors">
                        <Icon size={24} />
                      </div>
                      <span className="text-sm font-bold text-[#D4AF37] border border-[#E8D8C4] px-3 py-1 rounded-full">
                        {item.year}
                      </span>
                    </div>

                    {/* Content */}
                    <div className="mb-4 flex-grow">
                      <span className="text-xs font-bold text-[#6D2932] uppercase tracking-wider mb-2 block">
                        {item.type}
                      </span>
                      <h3 className="text-lg font-bold text-[#2C2621] leading-snug mb-3 group-hover:text-[#561C24] transition-colors line-clamp-3">
                        {item.title}
                      </h3>
                      {item.publication && (
                        <p className="text-sm text-[#5C5144] italic border-l-2 border-[#E8D8C4] pl-3 line-clamp-2">
                          {item.publication}
                        </p>
                      )}
                    </div>

                    {/* Footer (Impact Factor or ISBN) */}
                    <div className="pt-4 border-t border-gray-100 flex items-center text-xs font-medium text-[#561C24]">
                      {item.impactFactor ? (
                        <>
                          <Star size={12} className="mr-1 fill-[#D4AF37] text-[#D4AF37]" />
                          Impact Factor: {item.impactFactor}
                        </>
                      ) : (
                        item.isbn && <span className="text-gray-500 font-mono">ISBN: {item.isbn}</span>
                      )}
                    </div>
                  </div>
                );
              })
            )}
          </div>
        )}

        {/* --- View All Button --- */}
        <div className="text-center">
          <a 
            href="/article" 
            className="inline-flex items-center px-8 py-4 bg-[#561C24] text-[#E8D8C4] font-bold rounded-full shadow-lg hover:bg-[#6D2932] hover:scale-105 transition-all duration-300 group"
          >
            View All Publications
            <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={20} />
          </a>
        </div>

      </div>
    </section>
  );
};

export default ArticlesPreview;