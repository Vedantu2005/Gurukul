import React, { useState, useEffect } from 'react';
import { Search, Filter, Clock, Users, Star, BookOpen, TrendingUp, Award, PlayCircle, X, Loader } from 'lucide-react';
import { db } from '../firebase';
import { collection, getDocs } from 'firebase/firestore';
// 1. Import the Navigation and Footer components
import GNav from '../components/GNav';
import GFooter from '../components/GFooter';

const Course = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedLevel, setSelectedLevel] = useState('All');

  const categories = ['All', 'Sanskrit', 'Vedic Studies', 'Yoga', 'Ayurveda', 'Philosophy', 'Meditation'];
  const levels = ['All', 'Beginner', 'Intermediate', 'Advanced'];

  // Helper to strip HTML tags for preview text
  const stripHtml = (html) => {
    if (!html) return "";
    const tmp = document.createElement("DIV");
    tmp.innerHTML = html;
    return tmp.textContent || tmp.innerText || "";
  };

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "courses"));
        const coursesData = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setCourses(coursesData);
      } catch (error) {
        console.error("Error fetching courses:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  const filteredCourses = courses.filter(course => {
    const title = course.title || '';
    const description = stripHtml(course.description || '').toLowerCase();
    const searchLower = searchTerm.toLowerCase();

    const matchesSearch = title.toLowerCase().includes(searchLower) ||
                          description.includes(searchLower);
    const matchesCategory = selectedCategory === 'All' || course.category === selectedCategory;
    const matchesLevel = selectedLevel === 'All' || course.level === selectedLevel;
    
    return matchesSearch && matchesCategory && matchesLevel;
  });

  return (
    <>
    {/* 2. Add GNav at the top */}
    <GNav />
    
    <div className=" bg-gradient-to-br from-[#E8D8C4] via-[#C7B7A3] to-[#6D2932] min-h-screen">
      {/* Hero Section */}
      <section className="container mx-auto px-6 py-10 max-w-7xl ">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left Side - Text Content */}
          <div className="space-y-6">
            <div className="inline-block px-4 py-2 bg-[#561C24]/20 rounded-full">
              <span className="text-[#561C24] font-semibold text-sm">Transform Your Life</span>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold text-[#561C24] leading-tight">
              Master Ancient Wisdom Through
              <span className="block text-[#6D2932]">Modern Learning</span>
            </h1>
            <p className="text-xl text-gray-700 leading-relaxed">
              Embark on a transformative journey with expert-led courses in Sanskrit, Vedic philosophy, Yoga, and Ayurveda. Learn from the comfort of your home at your own pace.
            </p>
            <div className="flex flex-wrap gap-6 pt-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-[#561C24] rounded-full flex items-center justify-center">
                  <Award className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="font-bold text-2xl text-[#561C24]">50+</p>
                  <p className="text-sm text-gray-600">Expert Courses</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-[#561C24] rounded-full flex items-center justify-center">
                  <Users className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="font-bold text-2xl text-[#561C24]">10K+</p>
                  <p className="text-sm text-gray-600">Active Students</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-[#561C24] rounded-full flex items-center justify-center">
                  <PlayCircle className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="font-bold text-2xl text-[#561C24]">500+</p>
                  <p className="text-sm text-gray-600">Video Lessons</p>
                </div>
              </div>
            </div>
            <button className="px-8 py-4 bg-[#561C24] text-white rounded-lg font-semibold hover:bg-[#6D2932] transition-colors shadow-lg hover:shadow-xl cursor-pointer">
              Browse All Courses
            </button>
          </div>

          {/* Right Side - Images Grid */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-4">
              <img 
                src="https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=600&h=400&fit=crop"
                alt="Yoga practice"
                className="w-full h-64 object-cover rounded-2xl shadow-xl"
              />
              <img 
                src="https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=600&h=300&fit=crop"
                alt="Meditation"
                className="w-full h-48 object-cover rounded-2xl shadow-xl"
              />
            </div>
            <div className="space-y-4 pt-8">
              <img 
                src="https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?w=600&h=300&fit=crop"
                alt="Sanskrit learning"
                className="w-full h-48 object-cover rounded-2xl shadow-xl"
              />
              <img 
                src="https://images.unsplash.com/photo-1532012197267-da84d127e765?w=600&h=400&fit=crop"
                alt="Vedic texts"
                className="w-full h-64 object-cover rounded-2xl shadow-xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Explore Courses Section */}
      <section className="container mx-auto px-6 py-12">
        <div className="text-center mb-8">
          <h2 className="text-4xl md:text-5xl font-bold text-[#561C24] mb-4">
            Explore Our Courses
          </h2>
          <p className="text-lg text-gray-700 max-w-2xl mx-auto">
            Discover the perfect course to begin your journey into ancient wisdom and spiritual growth
          </p>
        </div>

        {/* ---------------------------------------------------- */}
        {/* MODIFIED SECTION: Single Line Search and Filters     */}
        {/* ---------------------------------------------------- */}
        <div className="bg-gradient-to-br from-[#E8D8C4] to-[#C7B7A3] rounded-2xl shadow-2xl p-6 mb-12">
          
          <div className="flex flex-col md:flex-row gap-4 items-center">
            
            {/* Search Input (Flex-Grow to take available space) */}
            <div className="relative w-full md:flex-1">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-[#561C24] w-5 h-5" />
              <input
                type="text"
                placeholder="Search courses..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-4 bg-white border-2 border-[#C7B7A3] rounded-xl focus:border-[#561C24] focus:outline-none transition-colors text-lg placeholder-gray-500"
              />
            </div>

            {/* Category Filter */}
            <div className="relative w-full md:w-64">
              <Filter className="absolute left-4 top-1/2 transform -translate-y-1/2 text-[#561C24] w-5 h-5" />
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full pl-12 pr-10 py-4 bg-white border-2 border-[#C7B7A3] rounded-xl focus:border-[#561C24] focus:outline-none transition-colors appearance-none cursor-pointer text-lg truncate"
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
                className="w-full pl-12 pr-10 py-4 bg-white border-2 border-[#C7B7A3] rounded-xl focus:border-[#561C24] focus:outline-none transition-colors appearance-none cursor-pointer text-lg truncate"
              >
                {levels.map(level => (
                  <option key={level} value={level}>
                    {level === 'All' ? 'All Levels' : level}
                  </option>
                ))}
              </select>
            </div>
            
          </div>

          {/* Results Count & Clear (Full width row below inputs) */}
          <div className="mt-4 flex flex-col sm:flex-row items-center justify-between text-gray-800 font-medium px-1">
            
            {(searchTerm || selectedCategory !== 'All' || selectedLevel !== 'All') && (
              <button 
                onClick={() => {
                  setSearchTerm('');
                  setSelectedCategory('All');
                  setSelectedLevel('All');
                }}
                className="mt-2 sm:mt-0 flex items-center gap-2 text-[#561C24] hover:text-[#6D2932] transition-colors font-semibold group cursor-pointer"
              >
                <span>Clear filters</span>
                <X className="w-4 h-4 group-hover:scale-110 transition-transform" />
              </button>
            )}
          </div>
        </div>
        {/* ---------------------------------------------------- */}

        {/* Loading State */}
        {loading && (
           <div className="flex justify-center items-center py-20">
             <Loader className="w-12 h-12 text-[#561C24] animate-spin" />
           </div>
        )}

        {/* Courses Grid */}
        {!loading && filteredCourses.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-2xl shadow-lg">
            <p className="text-2xl text-gray-500 mb-4">No courses found matching your criteria</p>
            <button 
              onClick={() => {
                setSearchTerm('');
                setSelectedCategory('All');
                setSelectedLevel('All');
              }}
              className="px-6 py-3 bg-[#561C24] text-white rounded-lg font-semibold hover:bg-[#6D2932] transition-colors cursor-pointer"
            >
              Clear Filters
            </button>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {!loading && filteredCourses.map((course) => (
              <article 
                key={course.id} 
                className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 cursor-pointer"
              >
                {/* Course Image */}
                <div className="relative h-64 overflow-hidden bg-slate-200">
                  {course.imageUrl ? (
                    <img 
                      src={course.imageUrl}
                      alt={course.title}
                      className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-slate-400">
                        <BookOpen size={48} opacity={0.5} />
                    </div>
                  )}
                  <div className="absolute top-4 right-4 bg-[#561C24] text-white px-3 py-1 rounded-full text-sm font-semibold">
                    {course.level}
                  </div>
                  <div className="absolute top-4 left-4 bg-white text-[#561C24] px-3 py-1 rounded-full text-sm font-bold shadow-md">
                    {course.price}
                  </div>
                </div>

                {/* Course Content */}
                <div className="p-6">
                  {/* Category Badge */}
                  <div className="inline-block px-3 py-1 bg-[#E8D8C4] text-[#561C24] rounded-full text-xs font-semibold mb-3">
                    {course.category}
                  </div>

                  {/* Course Title */}
                  <h3 className="text-xl font-bold text-gray-900 mb-3 hover:text-[#561C24] transition-colors line-clamp-1">
                    {course.title}
                  </h3>

                  {/* Course Description */}
                  <p className="text-gray-600 mb-4 leading-relaxed line-clamp-2 min-h-[3rem]">
                    {stripHtml(course.description)}
                  </p>

                  {/* Course Stats */}
                  <div className="grid grid-cols-3 gap-3 mb-4 pb-4 border-b border-gray-100">
                    <div className="flex items-center gap-1 text-sm text-gray-600">
                      <Clock className="w-4 h-4 text-[#561C24]" />
                      <span>{course.duration}</span>
                    </div>
                    <div className="flex items-center gap-1 text-sm text-gray-600">
                      <BookOpen className="w-4 h-4 text-[#561C24]" />
                      <span>{course.lessons} lessons</span>
                    </div>
                    <div className="flex items-center gap-1 text-sm text-gray-600">
                      <Users className="w-4 h-4 text-[#561C24]" />
                      <span>{course.students}</span>
                    </div>
                  </div>

                  {/* Rating and Enroll Button */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1">
                      <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                      <span className="font-bold text-gray-900">{course.rating}</span>
                      <span className="text-sm text-gray-500">({course.students})</span>
                    </div>
                    <button className="px-6 py-2 bg-[#561C24] text-white rounded-lg font-semibold hover:bg-[#6D2932] transition-colors cursor-pointer">
                      Enroll Now
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>
    </div>
    
    {/* 3. Add GFooter at the bottom */}
    <GFooter />
    </>
  );
};

export default Course;