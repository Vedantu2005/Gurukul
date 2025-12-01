import React, { useState, useEffect } from 'react';
import { Calendar, ArrowRight, Loader } from 'lucide-react';
import { collection, query, orderBy, limit, onSnapshot } from 'firebase/firestore';
import { db } from '../firebase'; // Ensure path is correct

const Blog = () => {
  const [blogPosts, setBlogPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Reference the 'blogs' collection
    const blogsRef = collection(db, 'blogs');
    
    // Query: Order by date descending (newest first), limit to 3 posts for the preview
    const q = query(blogsRef, orderBy('date', 'desc'), limit(3));

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const posts = snapshot.docs.map(doc => {
        const data = doc.data();
        return {
          id: doc.id,
          ...data,
          // Fallback image if not present
          image: data.imageUrl || "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?w=800&h=600&fit=crop",
          // Create a short plain-text description from the HTML content
          description: data.content 
            ? data.content.replace(/<[^>]*>?/gm, '').substring(0, 100) + '...' 
            : "Click to read more..."
        };
      });
      
      setBlogPosts(posts);
      setLoading(false);
    }, (error) => {
      console.error("Error fetching blog posts:", error);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  return (
    <section id="blog" className="py-10 bg-gradient-to-br from-[#C7B7A3] to-[#E8D8C4]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-[#561C24] mb-4">
            Latest from Our Blog
          </h2>
          <div className="w-24 h-1 bg-[#6D2932] mx-auto"></div>
        </div>

        {/* Loading State */}
        {loading ? (
          <div className="flex justify-center items-center py-10">
            <Loader className="w-10 h-10 text-[#561C24] animate-spin" />
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogPosts.length > 0 ? (
              blogPosts.map((post) => (
                <article key={post.id} className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 flex flex-col h-full">
                  {/* Image */}
                  <div className="relative h-64 bg-gradient-to-br from-orange-900 to-red-900 overflow-hidden shrink-0">
                    <img
                      src={post.image}
                      alt={post.title}
                      className="w-full h-full object-cover opacity-90 hover:opacity-100 hover:scale-110 transition-all duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                  </div>

                  {/* Content */}
                  <div className="p-6 flex flex-col flex-1">
                    <div className="flex items-center gap-2 text-orange-600 text-sm font-semibold mb-3">
                      <Calendar className="w-4 h-4" />
                      <span>{post.date}</span>
                    </div>

                    <a href={`/BlogDetail/${post.id}`}>
                      <h3 className="text-xl font-bold text-gray-900 mb-3 hover:text-orange-600 transition-colors line-clamp-2">
                        {post.title}
                      </h3>
                    </a>

                    <p className="text-gray-600 mb-4 leading-relaxed line-clamp-3">
                      {post.description}
                    </p>
                    
                    <div className="mt-auto">
                      <a href={`/BlogDetail/${post.id}`}>
                        <button className="flex items-center gap-2 text-orange-600 font-semibold hover:gap-3 transition-all group cursor-pointer">
                          Read More
                          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </button>
                      </a>
                    </div>
                  </div>
                </article>
              ))
            ) : (
              <div className="col-span-full text-center text-gray-600 italic">
                No blog posts available.
              </div>
            )}
          </div>
        )}

        <div className="text-center mt-8">
          <a
            href="/blog"
            className="inline-flex items-center px-8 py-4 bg-[#561C24] text-[#E8D8C4] font-bold rounded-full shadow-lg hover:bg-[#6D2932] hover:scale-105 transition-all duration-300 group"
          >
            View All Blogs
            <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={20} />
          </a>
        </div>
      </div>
    </section>
  );
};

export default Blog;