import React from 'react'
import GHero from '../components/GHero'
import GNav from '../components/GNav'
import Author from '../components/Author'
import Courses from '../components/Courses'
import About from '../components/About'
import Vision from '../components/Vision'
import GFooter from '../components/GFooter'

const Gurukul = () => {
  return (
    <div>
        <GNav />
        <GHero />
        <About />
        <Vision />
        <Author />
        <Courses />
        <GFooter />
    </div>
  )
}

export default Gurukul

