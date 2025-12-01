import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import About from './pages/About';
import Blog from './pages/Blog';
import Course from './pages/Course';
import BlogDetail from './pages/BlogDetail';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import ScrollToTop from './components/ScrollToTop';
import AdminLogin from './pages/Admin/Login';
import ProtectedRoute from './pages/Admin/ProtectedRoute';
import BlogManager from './pages/Admin/Blog';
import CourseManager from './pages/Admin/CourseManager';
import ResearchManager from './pages/Admin/ResearchManager';
// 1. IMPORT THE ARTICLE MANAGER
import ArticleManager from './pages/Admin/ArticleManager'; 
import Gurukul from './pages/Gurukul';
import ResearchPapers from './pages/ResearchPapers';
import ArticlePublications from './pages/ArticlePublications';

const AppContent = ({ isAdminLoggedIn, setIsAdminLoggedIn }) => {
  const location = useLocation();
  const path = location.pathname.toLowerCase();

  // Define routes where the standard Navbar/Footer should be HIDDEN
  const isAdminRoute = path.startsWith('/admin');
  const isGurukulLayout = path.startsWith('/gurukul') || path.startsWith('/courses');

  // Show Global Nav only if not Admin and not Gurukul/Course page
  const showGlobalNav = !isAdminRoute && !isGurukulLayout;

  return (
    <>
      <ScrollToTop />
      
      {showGlobalNav && <Navbar />}

      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/courses" element={<Course />} />
        <Route path="/BlogDetail/:id" element={<BlogDetail />} />
        <Route path="/gurukul" element={<Gurukul />} />
        <Route path="/research" element={<ResearchPapers />} />
        <Route path="/article" element={<ArticlePublications />} />

        {/* Admin Routes */}
        <Route path="/admin" element={<AdminLogin setIsAdminLoggedIn={setIsAdminLoggedIn} />} />
        
        <Route
          path="/admin/blog"
          element={
            <ProtectedRoute isLoggedIn={isAdminLoggedIn}>
              <BlogManager setIsAdminLoggedIn={setIsAdminLoggedIn} />
            </ProtectedRoute>
          }
        />
        
        <Route
          path="/admin/course"
          element={
            <ProtectedRoute isLoggedIn={isAdminLoggedIn}>
              <CourseManager setIsAdminLoggedIn={setIsAdminLoggedIn} />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/research"
          element={
            <ProtectedRoute isLoggedIn={isAdminLoggedIn}>
              <ResearchManager setIsAdminLoggedIn={setIsAdminLoggedIn} />
            </ProtectedRoute>
          }
        />

        {/* 2. ADD THIS ROUTE FOR ARTICLES */}
        <Route
          path="/admin/articles"
          element={
            <ProtectedRoute isLoggedIn={isAdminLoggedIn}>
              <ArticleManager setIsAdminLoggedIn={setIsAdminLoggedIn} />
            </ProtectedRoute>
          }
        />
        
      </Routes>

      {showGlobalNav && <Footer />}
    </>
  )
}

const App = () => {
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(!!localStorage.getItem('adminToken'));

  return (
    <Router>
      <AppContent isAdminLoggedIn={isAdminLoggedIn} setIsAdminLoggedIn={setIsAdminLoggedIn} />
    </Router>
  )
}

export default App;