import React, { useEffect, useState } from 'react';
import { IoIosArrowDropleftCircle, IoIosArrowDroprightCircle } from "react-icons/io";
import { getApiEndpoint } from '../APIConnect';

const Testimonial = () => {
  const [testimonialsData, setTestimonialsData] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    fetch(getApiEndpoint('test'))
      .then(res => res.json())
      .then(data => {
        if (data.success && data.data) setTestimonialsData(data.data);

        console.log('test API',data);
        
      });
  }, []);

  const users = testimonialsData?.users || [];

  const handlePrev = () => {
    setCurrentIndex(prev => prev === 0 ? users.length - 1 : prev - 1);
  };

  const handleNext = () => {
    setCurrentIndex(prev => prev === users.length - 1 ? 0 : prev + 1);
  };

  const t = users[currentIndex];

  return (
    <div>
      <div className='flex flex-col items-center justify-center '>
        <p
          className='text-[#ba7894] text-md'
          style={{
            color: testimonialsData?.topTitle?.color,
            fontFamily: testimonialsData?.topTitle?.font,
            ...testimonialsData?.topTitle?.style
          }}
        >
          {testimonialsData?.topTitle?.text || "TESTIMONIALS"}
        </p>
        <h1
          className='text-xl font-bold mt-2'
          style={{
            color: testimonialsData?.heading?.color,
            fontFamily: testimonialsData?.heading?.font,
            ...testimonialsData?.heading?.style
          }}
        >
          {testimonialsData?.heading?.text || "What Our Customers Say"}
        </h1>
      </div>
      <div className='bg-[#422A3C] w-220 h-90 m-5 ml-45 rounded-4xl '>
        {t && (
          <>
            <div className='flex flex-row items-center justify-between pt-15'>
              <img
                src={`http://localhost:5002/uploads/${t.image}`}
                alt="User"
                className='w-40 h-45 ml-40 object-content'
              />
            </div>
            <div className='ml-90 -mt-40'>
              <div className='flex flex-col p-3 '>
                <p
                  className='text-white text-md'
                  style={{
                    color: t.nameColor,
                    fontFamily: t.nameFont,
                    ...t.nameStyle
                  }}
                >
                  {t.name}
                </p>
                <p
                  className='text-white text-sm p-1'
                  style={{
                    color: t.locationColor,
                    fontFamily: t.locationFont,
                    ...t.locationStyle
                  }}
                >
                  {t.location}
                </p>
                <h1
                  className='text-white font-bold text-xl p-1'
                  style={{
                    color: t.headingColor,
                    fontFamily: t.headingFont,
                    ...t.headingStyle
                  }}
                >
                  {t.heading}
                </h1>
                <p
                  className='text-white text-sm p-2'
                  style={{
                    color: t.subHeadingColor,
                    fontFamily: t.subHeadingFont,
                    ...t.subHeadingStyle
                  }}
                >
                  {t.subHeading}
                </p>
              </div>
            </div>
          </>
        )}
      </div>
      <div className='flex flex-row items-center justify-center mt-5 gap-4'>
        <IoIosArrowDropleftCircle
          className='text-3xl cursor-pointer text-black-400 hover:text-blue-500 transition-colors duration-200'
          onClick={handlePrev}
        />
        <IoIosArrowDroprightCircle
          className='text-3xl cursor-pointer hover:text-blue-500 transition-colors duration-200'
          onClick={handleNext}
        />
      </div>
    </div>
  );
};

export default Testimonial;