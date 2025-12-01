import React, { useState, useEffect } from 'react';
import { Search, Filter, Clock, Users, Star, BookOpen, TrendingUp, Award, PlayCircle, X, Loader } from 'lucide-react';
import { collection, onSnapshot } from 'firebase/firestore';
import { db } from '../firebase'; // Ensure this path points to your firebase config file

const Courses = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedLevel, setSelectedLevel] = useState('All');

  const categories = ['All', 'Sanskrit', 'Vedic Studies', 'Yoga', 'Ayurveda', 'Philosophy', 'Meditation'];
  const levels = ['All', 'Beginner', 'Intermediate', 'Advanced'];

  // Fetch courses from Firestore
  useEffect(() => {
    const coursesRef = collection(db, 'courses');

    const unsubscribe = onSnapshot(coursesRef, (snapshot) => {
      const fetchedCourses = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
        // Ensure fallback for image if missing in DB
        image: doc.data().imageUrl || "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?w=800&h=600&fit=crop"
      }));
      setCourses(fetchedCourses);
      setLoading(false);
    }, (error) => {
      console.error("Error fetching courses:", error);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  // Filter logic applied to the fetched data
  const filteredCourses = courses.filter(course => {
    const matchesSearch = (course.title?.toLowerCase() || '').includes(searchTerm.toLowerCase()) ||
      (course.description?.toLowerCase() || '').includes(searchTerm.toLowerCase());
    
    const matchesCategory = selectedCategory === 'All' || course.category === selectedCategory;
    const matchesLevel = selectedLevel === 'All' || course.level === selectedLevel;

    return matchesSearch && matchesCategory && matchesLevel;
  });

  return (
    <section id="courses" className="py-20 bg-gradient-to-br from-[#E8D8C4] to-[#C7B7A3] min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-[#561C24] mb-4">Our Courses</h2>
          <div className="w-24 h-1 bg-[#6D2932] mx-auto"></div>
        </div>

        {/* Search and Filter Section */}
        <section className="container mx-auto px-6 mb-10">
          <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl p-6 mb-12">
            <div className="flex flex-col md:flex-row gap-4 items-center">
              
              {/* Search */}
              <div className="relative w-full md:flex-1">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-[#561C24] w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search courses..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 bg-white border-2 border-[#C7B7A3] rounded-xl focus:border-[#561C24] focus:outline-none transition-colors text-lg placeholder-gray-500"
                />
              </div>

              {/* Category Filter */}
              <div className="relative w-full md:w-64">
                <Filter className="absolute left-4 top-1/2 transform -translate-y-1/2 text-[#561C24] w-5 h-5" />
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-full pl-12 pr-10 py-3 bg-white border-2 border-[#C7B7A3] rounded-xl focus:border-[#561C24] focus:outline-none transition-colors appearance-none cursor-pointer text-lg"
                >
                  {categories.map(category => (
                    <option key={category} value={category}>
                      {category === 'All' ? 'All Categories' : category}
                    </option>
                  ))}
                </select>
              </div>

              {/* Level Filter */}
              <div className="relative w-full md:w-56">
                <TrendingUp className="absolute left-4 top-1/2 transform -translate-y-1/2 text-[#561C24] w-5 h-5" />
                <select
                  value={selectedLevel}
                  onChange={(e) => setSelectedLevel(e.target.value)}
                  className="w-full pl-12 pr-10 py-3 bg-white border-2 border-[#C7B7A3] rounded-xl focus:border-[#561C24] focus:outline-none transition-colors appearance-none cursor-pointer text-lg"
                >
                  {levels.map(level => (
                    <option key={level} value={level}>
                      {level === 'All' ? 'All Levels' : level}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Clear Filters Button */}
            {(searchTerm || selectedCategory !== 'All' || selectedLevel !== 'All') && (
              <div className="mt-4 flex justify-end">
                <button 
                  onClick={() => {
                    setSearchTerm('');
                    setSelectedCategory('All');
                    setSelectedLevel('All');
                  }}
                  className="flex items-center gap-2 text-[#561C24] hover:text-[#6D2932] transition-colors font-semibold group"
                >
                  <span>Clear filters</span>
                  <X className="w-4 h-4 group-hover:scale-110 transition-transform" />
                </button>
              </div>
            )}
          </div>
        </section>

        <section className="container mx-auto px-6 -mt-5">
          {/* Loading State */}
          {loading ? (
            <div className="flex justify-center items-center py-20">
              <Loader className="w-12 h-12 text-[#561C24] animate-spin" />
            </div>
          ) : (
            <>
              {/* Courses Grid */}
              {filteredCourses.length === 0 ? (
                <div className="text-center py-16 bg-white rounded-2xl shadow-lg">
                  <p className="text-2xl text-gray-500 mb-4">No courses found matching your criteria</p>
                  <button
                    onClick={() => {
                      setSearchTerm('');
                      setSelectedCategory('All');
                      setSelectedLevel('All');
                    }}
                    className="px-6 py-3 bg-[#561C24] text-white rounded-lg font-semibold hover:bg-[#6D2932] transition-colors"
                  >
                    Clear Filters
                  </button>
                </div>
              ) : (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {filteredCourses.map((course) => (
                    <article
                      key={course.id}
                      className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 cursor-pointer flex flex-col h-full"
                    >
                      {/* Course Image */}
                      <div className="relative h-64 overflow-hidden shrink-0">
                        <img
                          src={course.image}
                          alt={course.title}
                          className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                        />
                        <div className="absolute top-4 right-4 bg-[#561C24] text-white px-3 py-1 rounded-full text-sm font-semibold shadow-md">
                          {course.level}
                        </div>
                        <div className="absolute top-4 left-4 bg-white text-[#561C24] px-3 py-1 rounded-full text-sm font-bold shadow-md">
                          {course.price}
                        </div>
                      </div>

                      {/* Course Content */}
                      <div className="p-6 flex flex-col flex-1">
                        {/* Category Badge */}
                        <div className="mb-3">
                            <span className="inline-block px-3 py-1 bg-[#E8D8C4] text-[#561C24] rounded-full text-xs font-semibold">
                                {course.category}
                            </span>
                        </div>

                        {/* Course Title */}
                        <h3 className="text-xl font-bold text-gray-900 mb-3 hover:text-[#561C24] transition-colors line-clamp-2">
                          {course.title}
                        </h3>

                        {/* Course Description */}
                        <div 
                            className="text-gray-600 mb-4 leading-relaxed line-clamp-2 text-sm"
                            dangerouslySetInnerHTML={{ __html: course.description }}
                        />

                        {/* Course Stats */}
                        <div className="grid grid-cols-3 gap-2 mb-4 pb-4 border-b border-gray-100 mt-auto">
                          <div className="flex items-center gap-1 text-xs text-gray-600">
                            <Clock className="w-3 h-3 text-[#561C24]" />
                            <span className="truncate">{course.duration}</span>
                          </div>
                          <div className="flex items-center gap-1 text-xs text-gray-600">
                            <BookOpen className="w-3 h-3 text-[#561C24]" />
                            <span className="truncate">{course.lessons} lessons</span>
                          </div>
                          <div className="flex items-center gap-1 text-xs text-gray-600">
                            <Users className="w-3 h-3 text-[#561C24]" />
                            <span className="truncate">{course.students}</span>
                          </div>
                        </div>

                        {/* Rating and Enroll Button */}
                        <div className="flex items-center justify-between mt-2">
                          <div className="flex items-center gap-1">
                            <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                            <span className="font-bold text-gray-900">{course.rating}</span>
                            <span className="text-sm text-gray-500">({course.students})</span>
                          </div>
                          <button className="px-5 py-2 bg-[#561C24] text-white rounded-lg font-semibold hover:bg-[#6D2932] transition-colors text-sm">
                            Enroll Now
                          </button>
                        </div>
                      </div>
                    </article>
                  ))}
                </div>
              )}
            </>
          )}
        </section>
      </div>
    </section>
  );
};

export default Courses;