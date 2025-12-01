import React, { useState } from 'react';
import { Calendar, User, Clock, ArrowLeft, Share2, Bookmark, Facebook, Twitter, Linkedin, Link2, Heart, MessageCircle, Eye } from 'lucide-react';

const BlogDetail = () => {
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [likes, setLikes] = useState(342);
  const [isLiked, setIsLiked] = useState(false);

  const handleLike = () => {
    if (isLiked) {
      setLikes(likes - 1);
    } else {
      setLikes(likes + 1);
    }
    setIsLiked(!isLiked);
  };

  const blogPost = {
    id: 1,
    date: "October 15, 2024",
    title: "The Importance of Sanskrit in Modern Education",
    author: "Dr. Ramesh Kumar",
    authorImage: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop",
    authorBio: "Ph.D. in Sanskrit Studies with over 20 years of teaching experience. Passionate about preserving and promoting ancient Indian wisdom.",
    readTime: "8 min read",
    views: "2.4K",
    comments: 45,
    image: "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?w=1200&h=600&fit=crop",
    category: "Education",
    tags: ["Sanskrit", "Education", "Culture", "Language Learning", "Ancient Wisdom"],
    content: `
      <p class="text-xl text-gray-700 leading-relaxed mb-6">Sanskrit, often referred to as the "language of the gods," holds a unique position in the pantheon of world languages. Despite being ancient, its relevance in modern education continues to grow, offering students not just linguistic skills but also cognitive and cultural benefits.</p>

      <h2 class="text-3xl font-bold text-[#561C24] mt-8 mb-4">The Historical Significance</h2>
      <p class="text-lg text-gray-700 leading-relaxed mb-6">Sanskrit is one of the oldest languages known to humanity, with a rich literary tradition spanning over 3,500 years. It served as the medium for some of humanity's most profound philosophical, scientific, and literary works. The Vedas, Upanishads, and epics like the Mahabharata and Ramayana were all composed in Sanskrit.</p>

      <blockquote class="border-l-4 border-[#561C24] pl-6 py-2 my-8 bg-[#E8D8C4] italic text-lg text-gray-800">
        "Sanskrit is the most systematic and perfect language in the world. It is more perfect than Greek, more copious than Latin, and more exquisitely refined than either."
        <span class="block mt-2 text-base not-italic text-gray-600">- Sir William Jones, Orientalist</span>
      </blockquote>

      <h2 class="text-3xl font-bold text-[#561C24] mt-8 mb-4">Cognitive Benefits of Learning Sanskrit</h2>
      <p class="text-lg text-gray-700 leading-relaxed mb-6">Recent studies have shown that learning Sanskrit enhances memory, cognitive function, and even mathematical abilities. The structured nature of Sanskrit grammar, with its systematic rules and patterns, helps develop logical thinking and analytical skills.</p>

      <img src="https://images.unsplash.com/photo-1532012197267-da84d127e765?w=1000&h=600&fit=crop" alt="Sanskrit manuscripts" class="w-full rounded-2xl shadow-lg my-8" />

      <p class="text-lg text-gray-700 leading-relaxed mb-6">Neuroscientists have discovered that memorizing Sanskrit verses activates multiple areas of the brain simultaneously, leading to improved memory retention and recall. This is particularly beneficial for students in their formative years, as it strengthens neural pathways associated with learning and problem-solving.</p>

      <h2 class="text-3xl font-bold text-[#561C24] mt-8 mb-4">Sanskrit and Modern Technology</h2>
      <p class="text-lg text-gray-700 leading-relaxed mb-6">Interestingly, Sanskrit's logical structure has caught the attention of computer scientists and AI researchers. NASA scientist Rick Briggs famously wrote a paper titled "Knowledge Representation in Sanskrit and Artificial Intelligence," highlighting how Sanskrit's grammar could be ideal for natural language processing.</p>

      <div class="bg-gradient-to-br from-[#E8D8C4] to-[#C7B7A3] rounded-2xl p-8 my-8">
        <h3 class="text-2xl font-bold text-[#561C24] mb-4">Key Findings:</h3>
        <ul class="space-y-3 text-gray-800">
          <li class="flex items-start gap-3">
            <span class="text-[#561C24] font-bold text-xl">•</span>
            <span>Sanskrit has 70 cases compared to Latin's 6, making it incredibly precise</span>
          </li>
          <li class="flex items-start gap-3">
            <span class="text-[#561C24] font-bold text-xl">•</span>
            <span>The language follows a completely phonetic structure</span>
          </li>
          <li class="flex items-start gap-3">
            <span class="text-[#561C24] font-bold text-xl">•</span>
            <span>Its grammar is so systematic it can be represented in algorithmic form</span>
          </li>
        </ul>
      </div>

      <h2 class="text-3xl font-bold text-[#561C24] mt-8 mb-4">Cultural Connection and Identity</h2>
      <p class="text-lg text-gray-700 leading-relaxed mb-6">Beyond its practical benefits, Sanskrit serves as a bridge to India's rich cultural heritage. Understanding Sanskrit allows students to access original texts and philosophical concepts that have been lost in translation over the centuries. It provides a direct connection to the wisdom of ancient sages and scholars.</p>

      <img src="https://images.unsplash.com/photo-1512820790803-83ca734da794?w=1000&h=600&fit=crop" alt="Learning Sanskrit" class="w-full rounded-2xl shadow-lg my-8" />

      <h2 class="text-3xl font-bold text-[#561C24] mt-8 mb-4">Integration in Modern Curriculum</h2>
      <p class="text-lg text-gray-700 leading-relaxed mb-6">Many progressive educational institutions are now incorporating Sanskrit into their curriculum, not as a religious or cultural imposition, but as a valuable academic discipline. Students learn not just the language, but also the scientific, mathematical, and philosophical knowledge embedded in ancient texts.</p>

      <p class="text-lg text-gray-700 leading-relaxed mb-6">Schools across the world have reported that students studying Sanskrit show improved performance in mathematics and science, better memory retention, and enhanced concentration abilities. The discipline required to master Sanskrit grammar translates into better study habits across all subjects.</p>

      <h2 class="text-3xl font-bold text-[#561C24] mt-8 mb-4">Conclusion</h2>
      <p class="text-lg text-gray-700 leading-relaxed mb-6">The importance of Sanskrit in modern education extends far beyond preserving an ancient language. It offers cognitive benefits, connects students with cultural heritage, and provides insights that are surprisingly relevant to contemporary fields like technology and neuroscience. As we move forward in the 21st century, Sanskrit's role in education may prove more vital than ever before.</p>

      <p class="text-lg text-gray-700 leading-relaxed mb-6">By embracing Sanskrit in our educational systems, we're not looking backward but rather drawing from timeless wisdom to build a more thoughtful, connected, and intellectually robust future for our students.</p>
    `
  };

  const relatedPosts = [
    {
      id: 2,
      title: "Building Character Through Traditional Values",
      image: "https://images.unsplash.com/photo-1532012197267-da84d127e765?w=400&h=300&fit=crop",
      date: "September 2024",
      category: "Philosophy"
    },
    {
      id: 3,
      title: "Integrating Vedic Knowledge in Daily Life",
      image: "https://images.unsplash.com/photo-1507842217343-583bb7270b66?w=400&h=300&fit=crop",
      date: "August 2024",
      category: "Lifestyle"
    },
    {
      id: 4,
      title: "The Science Behind Ancient Meditation Practices",
      image: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=400&h=300&fit=crop",
      date: "July 2024",
      category: "Wellness"
    }
  ];

  const handleGoBack = () => {
    window.history.back();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#E8D8C4] via-[#C7B7A3] to-[#6D2932]">
      {/* Back Button */}
      <div className="container mx-auto px-6 py-6">
        <button 
          onClick={handleGoBack}
          className="flex items-center gap-2 text-[#561C24] font-semibold hover:text-[#6D2932] transition-colors bg-white px-4 py-2 rounded-lg shadow-md"
        >
          <ArrowLeft className="w-5 h-5" />
          Back to Blogs
        </button>
      </div>

      {/* Hero Image */}
      <div className="container mx-auto px-6">
        <div className="relative h-96 md:h-[500px] rounded-3xl overflow-hidden shadow-2xl">
          <img 
            src={blogPost.image}
            alt={blogPost.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#561C24]/90 via-[#561C24]/40 to-transparent"></div>
          
          {/* Title Overlay */}
          <div className="absolute bottom-0 left-0 right-0 p-8 md:p-12">
            <div className="inline-block px-4 py-2 bg-[#E8D8C4] text-[#561C24] rounded-full text-sm font-semibold mb-4">
              {blogPost.category}
            </div>
            <h1 className="text-3xl md:text-5xl font-bold text-white mb-4 leading-tight">
              {blogPost.title}
            </h1>
          </div>
        </div>
      </div>

      {/* Article Content */}
      <div className="container mx-auto px-6 py-12">
        <div className="max-w-5xl mx-auto">
          {/* Meta Information & Engagement */}
          <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div className="flex flex-wrap items-center gap-6">
                <div className="flex items-center gap-3">
                  <img 
                    src={blogPost.authorImage}
                    alt={blogPost.author}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div>
                    <p className="font-semibold text-gray-900">{blogPost.author}</p>
                    <p className="text-sm text-gray-500">Author</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                  <Calendar className="w-5 h-5 text-[#561C24]" />
                  <span>{blogPost.date}</span>
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                  <Clock className="w-5 h-5 text-[#561C24]" />
                  <span>{blogPost.readTime}</span>
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                  <Eye className="w-5 h-5 text-[#561C24]" />
                  <span>{blogPost.views} views</span>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <button 
                  onClick={handleLike}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                    isLiked 
                      ? 'bg-[#561C24] text-white' 
                      : 'bg-[#E8D8C4] text-[#561C24] hover:bg-[#C7B7A3]'
                  }`}
                >
                  <Heart className={`w-5 h-5 ${isLiked ? 'fill-current' : ''}`} />
                  <span className="font-semibold">{likes}</span>
                </button>
                <button 
                  onClick={() => setIsBookmarked(!isBookmarked)}
                  className={`p-2 rounded-lg transition-colors ${
                    isBookmarked 
                      ? 'bg-[#561C24] text-white' 
                      : 'bg-[#E8D8C4] text-[#561C24] hover:bg-[#C7B7A3]'
                  }`}
                >
                  <Bookmark className={`w-5 h-5 ${isBookmarked ? 'fill-current' : ''}`} />
                </button>
                <div className="flex items-center gap-2 px-4 py-2 bg-[#E8D8C4] text-[#561C24] rounded-lg">
                  <MessageCircle className="w-5 h-5" />
                  <span className="font-semibold">{blogPost.comments}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Article Body */}
          <article className="bg-white rounded-2xl shadow-lg p-8 md:p-12">
            <div 
              className="prose prose-lg max-w-none"
              dangerouslySetInnerHTML={{ __html: blogPost.content }}
            />
          </article>

          

          

          

          {/* Related Posts */}
          <div className="mt-16">
            <h2 className="text-3xl font-bold text-[#561C24] mb-8">Related Articles</h2>
            <div className="grid md:grid-cols-3 gap-6">
              {relatedPosts.map((post) => (
                <article key={post.id} className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 cursor-pointer">
                  <div className="relative h-48 overflow-hidden">
                    <img 
                      src={post.image}
                      alt={post.title}
                      className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute top-4 left-4 px-3 py-1 bg-[#561C24] text-white rounded-full text-xs font-semibold">
                      {post.category}
                    </div>
                  </div>
                  <div className="p-5">
                    <div className="flex items-center gap-2 text-[#561C24] text-sm font-semibold mb-2">
                      <Calendar className="w-4 h-4" />
                      <span>{post.date}</span>
                    </div>
                    <a href="/BlogDetail">
                    <h3 className="text-lg font-bold text-gray-900 hover:text-[#561C24] transition-colors">
                      {post.title}
                    </h3>
                    </a>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogDetail;