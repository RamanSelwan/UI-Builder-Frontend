import { Routes, Route } from 'react-router-dom';

import HeaderSettings from './components/HeaderSetting/HeaderSettings';
import SidebarLayout from './components/Sidebar'
import HeroSection from './components/HeaderSetting/HeroSection';
import Catagories from './components/Catagoeries';
import AboutUs from './components/AboutUs';
import Count from './components/Counting';
import GallerySection from './components/GallerySection';
import IncludesSection from './components/IncludeSection/IncluesSection';
import CallToAction from './components/CallAction';
import Footer from './components/Footer';
import TestimonialsSection from './components/Testimonials';
import SingalSliderSection from './components/SingleSlider';
import ServicesSection from './components/OurServices/ServicesSection';
import ServiceCardView from './components/GetInTouch';
import Dash from './components/Dash';
import Blog from './components/Blog';
import MainPanel from './components/main-panel/mainPanel';
import Sign from './components/userdetail/Sign';
import Login from './components/userdetail/Login';


function App() {
  return (
    <Routes>
      <Route path="/dash" element={< Dash/>} />
    
        <Route path="/Sidebar" element={< SidebarLayout/>} />
        <Route path="/header" element={<HeaderSettings/>}/>
          <Route path="/Hero-Section" element={<HeroSection/>}/>
            <Route path="/Category" element={<Catagories/>}/>
        <Route path="/About-Us" element={<AboutUs />} />
        <Route path='/Get-In-Touch' element={<ServiceCardView />} />
        <Route path="/Gallery" element={<GallerySection/>} />
        <Route path="/Our-Services" element={<ServicesSection/>} />
        <Route path="/Counting-Section" element={<Count/>} />
         <Route path="/Includes-Section" element={<IncludesSection />} />
        <Route path="/Call-To-Action" element={<CallToAction/>} />
        <Route path="/Blog" element={<Blog/>} />
        <Route path="/Footer" element={<Footer/>} />
        <Route path="/Testimonials" element={<TestimonialsSection/>} />
        <Route path="/Single-Slider" element={<SingalSliderSection/>} />
        <Route path="/Main_Panel" element={<MainPanel />}  /> 
        <Route path="/" element={<Sign/>}  /> 
        <Route path="/login" element={<Login/>}  /> 

        
      </Routes> 
      
  )
}
export default App