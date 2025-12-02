import React, { useState, useEffect } from 'react';
import { Calendar, ArrowRight, Loader } from 'lucide-react';
import { collection, onSnapshot, query, orderBy } from 'firebase/firestore';
import { db } from '../firebase'; // Adjust path if firebase.js is in src/

const Blog = () => {
  const [blogPosts, setBlogPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Reference the 'blogs' collection
    const blogsRef = collection(db, 'blogs');
    
    // Create a query to order by date (descending) so newest shows first
    // Note: Ensure your documents have a 'createdAt' or 'date' field to sort by
    const q = query(blogsRef, orderBy('date', 'desc'));

    // Set up the real-time listener
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const posts = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
        // Handle image: Use doc.data().imageUrl. If missing, use fallback.
        image: doc.data().imageUrl || "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?w=800&h=600&fit=crop",
        // Create a plain text description from HTML content for the preview card
        description: doc.data().content 
          ? doc.data().content.replace(/<[^>]*>?/gm, '').substring(0, 100) + '...' 
          : "Click to read more..."
      }));
      
      setBlogPosts(posts);
      setLoading(false);
    }, (error) => {
      console.error("Error fetching blogs: ", error);
      setLoading(false);
    });

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, []);

  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50">
        {/* Hero Section */}
        <section className="container mx-auto px-6 py-10 max-w-7xl md:py-16">
          <div className="grid md:grid-cols-2 gap-12 items-center">

            {/* Left Side - Text Content */}
            <div className="space-y-6 relative z-10">
              <div className="inline-block px-4 py-2 bg-orange-100 rounded-full">
                <span className="text-orange-800 font-semibold text-sm">Explore Ancient Wisdom</span>
              </div>
              <h1 className="text-5xl md:text-6xl font-bold text-gray-900 leading-tight">
                Discover the Wisdom of
                <span className="text-[#561C24]"> Vedic Knowledge</span>
              </h1>
              <p className="text-xl text-gray-600 leading-relaxed pr-8">
                Join us on a journey through timeless teachings that blend ancient wisdom with modern insights. Explore how traditional knowledge can enrich your daily life.
              </p>
              <div className="flex gap-4 pt-4">
                <button className="px-8 py-4 bg-[#561C24] text-white rounded-lg font-semibold hover:bg-orange-700 transition-colors shadow-lg hover:shadow-xl">
                  Start Reading
                </button>
                <button className="px-8 py-4 bg-white text-orange-600 rounded-lg font-semibold hover:bg-orange-50 transition-colors border-2 border-orange-600">
                  Subscribe
                </button>
              </div>
            </div>

            {/* Right Side - Bento Grid Images */}
            <div className="h-[500px] w-full mt-8 md:mt-0 grid grid-cols-12 grid-rows-6 gap-4 p-4 bg-orange-100/50 rounded-[40px]">
              <div className="col-span-7 row-span-6 relative rounded-3xl overflow-hidden group shadow-lg cursor-pointer">
                <img
                  src="https://images.unsplash.com/photo-1532012197267-da84d127e765?w=800&h=1000&fit=crop"
                  alt="Vedic texts main"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#561C24]/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                  <span className="text-white font-semibold">Ancient Manuscripts</span>
                </div>
              </div>
              <div className="col-span-5 row-span-3 relative rounded-3xl overflow-hidden group shadow-lg cursor-pointer">
                <img
                  src="https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=600&h=400&fit=crop"
                  alt="Meditation pose"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
              </div>
              <div className="col-span-5 row-span-3 relative rounded-3xl overflow-hidden group shadow-lg cursor-pointer">
                <img
                  src="https://images.unsplash.com/photo-1512820790803-83ca734da794?w=600&h=400&fit=crop"
                  alt="Ancient manuscripts details"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Blog Section */}
        <section className="container mx-auto px-6 py-10 max-w-7xl">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Latest from Our Blog
            </h2>
            <div className="w-24 h-1 bg-orange-600 mx-auto"></div>
          </div>

          {/* Loading State */}
          {loading && (
            <div className="flex justify-center items-center py-20">
              <Loader className="w-10 h-10 text-[#561C24] animate-spin" />
            </div>
          )}

          {/* Blog Cards Grid */}
          {!loading && (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {blogPosts.length > 0 ? (
                blogPosts.map((post) => (
                  <article key={post.id} className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
                    {/* Image */}
                    <div className="relative h-64 bg-gradient-to-br from-orange-900 to-red-900 overflow-hidden group">
                      <img
                        src={post.image}
                        alt={post.title}
                        className="w-full h-full object-cover opacity-90 group-hover:opacity-100 group-hover:scale-110 transition-all duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                    </div>

                    {/* Content */}
                    <div className="p-6">
                      <div className="flex items-center gap-2 text-orange-600 text-sm font-semibold mb-3">
                        <Calendar className="w-4 h-4" />
                        <span>{post.date}</span>
                      </div>

                      {/* Use ID in link for detail page */}
                      <a href={`/BlogDetail/${post.id}`} className="block">
                        <h3 className="text-xl font-bold text-gray-900 mb-3 hover:text-orange-600 transition-colors line-clamp-2">
                          {post.title}
                        </h3>
                      </a>

                      <p className="text-gray-600 mb-4 leading-relaxed line-clamp-3">
                        {post.description}
                      </p>

                      <a href={`/BlogDetail/${post.id}`}>
                        <button className="flex items-center gap-2 text-orange-600 font-semibold hover:gap-3 transition-all group cursor-pointer">
                          Read More
                          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </button>
                      </a>
                    </div>
                  </article>
                ))
              ) : (
                <div className="col-span-full text-center py-10">
                  <p className="text-xl text-gray-500">No blog posts found.</p>
                </div>
              )}
            </div>
          )}
        </section>

        {/* Bottom Spacer */}
        <div className="h-20"></div>
      </div>
      {/* Navbar and Footer are rendered by App.jsx so they shouldn't be included here */}
    </>
  );
};

export default Blog;