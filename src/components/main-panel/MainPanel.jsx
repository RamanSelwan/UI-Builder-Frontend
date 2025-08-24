import React from 'react';
import Navbar from '../main-panel/Navbar'
import HeroSection from '../main-panel/HeroSection'
import Icon from '../main-panel/Icon'
import About from '../main-panel/About'
import Gallery from '../main-panel/gallery'
import OurServices from '../main-panel/OurServices'
import CountingSection from '../main-panel/countingSection'
import  Includes from '../main-panel/Includes'
import Contact from '../main-panel/Contact'
import Testimonial from '../main-panel/Testimonial'
import SingleSidebar from '../main-panel/SingleSiderbar'
import CallToAction from '../main-panel/CallToAction'
import  Blog from '../main-panel/Blog'
import Footer from '../main-panel/Footer'



function MainPanel() {
  return (
    <div className="font-sans w-screen">
      <Navbar/>
      <HeroSection/>
      <Icon/>
      <About/>
      <Gallery/>
      <OurServices/>
      <CountingSection/>
      <Includes/>
      <Contact/>
      <Testimonial/>
      <SingleSidebar/>
      <CallToAction/>
      <Blog/>
      <Footer/>
    
    </div>
  );
}

export default MainPanel;