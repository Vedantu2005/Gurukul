import React from 'react'
import Hero from '../components/Hero'
import About from '../components/About'
import Vision from '../components/Vision'
import Author from '../components/Author'
import Blog from '../components/Blog'
import Research from '../components/Research'
import GurukulSection from '../components/GurukulSection'
import Memberships from '../components/Memberships'
import ArticlesPreview from '../components/ArticlesPreview'

// NOTE: Navbar and Footer imports are removed because they are in App.jsx

const Home = () => {
  return (
    <div>
      {/* Navbar is handled by App.jsx */}
      <Hero />
      <Author />
      <Memberships />
      <Blog />
      <Research />
      <ArticlesPreview />
      <GurukulSection />
      {/* Footer is handled by App.jsx */}
    </div>
  )
}

export default Home