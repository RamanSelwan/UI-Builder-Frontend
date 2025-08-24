import React, { useEffect, useState } from 'react';
import cate from '../../assets/Logo/Cate.jpg';
import { getApiEndpoint } from '../APIConnect';

const About = () => {
  const [aboutData, setAboutData] = useState(null);

  const fetchAboutData = () => {
    fetch(getApiEndpoint('about'))
      .then(res => res.json())
      .then(data => {
        if (data.success && data.data) setAboutData(data.data);
        console.log('about API',data)
      });
  };

  useEffect(() => {
    fetchAboutData();
  }, []);

  const replaceData = {
    title: "About Us",
    heading: "It’s the bridge between service companies and consumers.",
    subheading: "ServiceMarket.dk is a Copenhagen-based technology company...",
    bgcolor: "#ffffff",
    image: "default.png"
    // ...baaki fields...
  };

  return (
    <div className='bg-[#fbf2e0] h-90 flex items-center justify-center p-5 w-full'>
      <div className='flex flex-row justify-center items-center h-80 w-195 bg-[#422A3C] -mt-50 cursor-pointer'>
        <div className='ml-20 shadow-2xl'>
          <img
            src={
              aboutData?.image
                ? `http://localhost:5002/uploads/${aboutData.image}`
                : cate
            }
            alt=""
            className='h-100 -mt-10'
          />
        </div>
        <div className='flex flex-col w-90 ml-10 text-white'>
          <h1 className='text-start mt-10 pb-2 '>
            {aboutData?.title || replaceData.title}
          </h1>
          <h1 className='text-start text-lg font-bold p-1'>
            {aboutData?.heading || replaceData.heading}
          </h1>
          <p className='text-start pb-2'>
            {aboutData?.subheading || replaceData.subheading}
          </p>
          {aboutData && (
            <div>
              <h1>{aboutData?.title}</h1>
              <h2>{aboutData?.heading}</h2>
              <p>{aboutData?.subheading}</p>
              {/* ...baaki fields... */}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default About;
