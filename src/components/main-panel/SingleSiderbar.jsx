import React, { useState, useEffect } from 'react';
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { getApiEndpoint } from '../APIConnect';

const SingleSidebar = () => {
  const [sliderData, setSliderData] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    fetch(getApiEndpoint('slider'))
      .then(res => res.json())
      .then(data => {
        if (data.success && data.data) setSliderData(data.data);
        console.log('slider API',data);
        
      });
  }, []);

  const handlePrev = () => {
    if (!sliderData?.bgImage) return;
    setCurrentIndex((prev) =>
      prev === 0 ? sliderData.bgImage.length - 1 : prev - 1
    );
  };

  const handleNext = () => {
    if (!sliderData?.bgImage) return;
    setCurrentIndex((prev) =>
      prev === sliderData.bgImage.length - 1 ? 0 : prev + 1
    );
  };

  return (
    <div>
      <section
        className="h-screen bg-cover bg-center flex flex-col items-start lg:items-center mt-10 py-20"
        style={{
          backgroundImage: sliderData?.bgImage?.[currentIndex]
            ? `url(http://localhost:5002/uploads/${sliderData.bgImage[currentIndex]})`
            : undefined
        }}
      >
        <div>
          <p
            className='text-white font-bold justify-center items-center text-4xl mt-70'
            style={{
              color: sliderData?.heading?.color,
              fontFamily: sliderData?.heading?.font,
              ...sliderData?.heading?.style
            }}
          >
            {sliderData?.heading?.text || "Letting your true beauty shine"}
          </p>
        </div>
        <a
          href={sliderData?.bookNow?.url || "#"}
          className='border w-20 h-7 text-white hover:bg-[#b31898] transition-100 -ml-107 mt-4 flex items-center justify-center'
          style={{
            background: sliderData?.bookNow?.bgColor,
            color: sliderData?.bookNow?.color,
            fontFamily: sliderData?.bookNow?.font,
            borderColor: sliderData?.bookNow?.borderColor,
            ...sliderData?.bookNow?.style
          }}
        >
          {sliderData?.bookNow?.text || "Book now"}
        </a>
        <div className="flex flex-row justify-between w-full px-10 mt-10">
          {/* Prev Button */}
          <button
            onClick={handlePrev}
            style={{
              background: sliderData?.prevButtonBgColor,
              borderRadius: 9999,
              padding: 8,
              border: "none"
            }}
          >
            {sliderData?.prevIcon ? (
              <img
                src={`http://localhost:5002/uploads/${sliderData.prevIcon}`}
                alt="Prev"
                className="w-6 h-6"
              />
            ) : (
              <IoIosArrowBack className='text-black hover:text-[#b21858] cursor-pointer text-xl' />
            )}
          </button>
          {/* Next Button */}
          <button
            onClick={handleNext}
            style={{
              background: sliderData?.nextButtonBgColor,
              borderRadius: 9999,
              padding: 8,
              border: "none"
            }}
          >
            {sliderData?.nextIcon ? (
              <img
                src={`http://localhost:5002/uploads/${sliderData.nextIcon}`}
                alt="Next"
                className="w-6 h-6"
              />
            ) : (
              <IoIosArrowForward className='text-black hover:text-[#b21858] cursor-pointer text-xl' />
            )}
          </button>
        </div>
      </section>
    </div>
  );
};

export default SingleSidebar;