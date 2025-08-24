import React, { useEffect, useState } from 'react';
import { FaRegStar } from "react-icons/fa";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";
import { getApiEndpoint } from '../APIConnect';

const Recommanded = () => {
  const [servicesData, setServicesData] = useState(null);

  useEffect(() => {
    fetch(getApiEndpoint('service'))
      .then(res => res.json())
      .then(data => {
        if (data.success && data.data) setServicesData(data.data);
 console.log(data);
      });
     
      
  }, []);

  return (
    <div className='flex flex-col w-full'>
      <div className='text-center'>
        <h2
          className='text-md mt-7'
          style={{
            color: servicesData?.topTitle?.color,
            fontFamily: servicesData?.topTitle?.font,
            ...servicesData?.topTitle?.style
          }}
        >
          {servicesData?.topTitle?.text || "OUR SERVICES"}
        </h2>
        <h1
          className='text-xl font-bold pb-3'
          style={{
            color: servicesData?.heading?.color,
            fontFamily: servicesData?.heading?.font,
            ...servicesData?.heading?.style
          }}
        >
          {servicesData?.heading?.text || "Recommended"}
        </h1>
        <p
          className='text-sm text-gray-400'
          style={{
            color: servicesData?.subHeading?.color,
            fontFamily: servicesData?.subHeading?.font,
            ...servicesData?.subHeading?.style
          }}
        >
          {servicesData?.subHeading?.text || "Lorem ipsum dolor sit amet consectetur. Eu quis enim tempor et proin neque."}
        </p>
      </div>
      <div className='flex flex-row items-center justify-center mt-4'>
        <MdKeyboardArrowLeft className='text-4xl cursor-pointer -ml-30 text-gray-400' />
        <div className='flex '>
          {servicesData?.cards?.map((service, idx) => (
            <div key={idx} className='rounded-xl w-60 shadow flex flex-col items-start h-85 mx-5'>
              <img
                src={`http://localhost:5002/uploads/${service.mainImage}`}
                alt={service.heading}
                className='w-60 h-30 rounded-t-xl mb-1 object-cover'
              />
              <div className='flex flex-row gap-1 pb-2 mt-3 ml-5'>
                {service.reviewIcon ? (
                  <img
                    src={`http://localhost:5002/uploads/${service.reviewIcon}`}
                    alt="review"
                    className="w-5 h-5"
                  />
                ) : (
                  <FaRegStar className='text-[#ba7894]' />
                )}
                <p className='text-[#ba7894]'>{service.reviewNumber}</p>
                <h1 className='ml-25 font-bold'>{service.totalReviews}</h1>
              </div>
              <h3 className='font-bold mb-2 ml-3'>
                {service.headingLink ? (
                  <a href={service.headingLink} className="text-[#ba7894] underline">{service.heading}</a>
                ) : (
                  service.heading
                )}
              </h3>
              <div className='flex items-center ml-3'>
                {service.locationIcon && (
                  <img
                    src={`http://localhost:5002/uploads/${service.locationIcon}`}
                    alt="location"
                    className="w-4 h-4 mr-1"
                  />
                )}
                <p className='text-sm'>{service.location}</p>
              </div>
              <div className='ml-10 mt-5'>
                <a
                  href={service.bookUrl || "#"}
                  className='border border-[#ba7894] text-[#ba7894] w-37 h-10 rounded-sm cursor-pointer hover:bg-[#ba7894] hover:text-white transition-all flex items-center justify-center'
                >
                  {service.bookButton || "Book now"}
                </a>
              </div>
            </div>
          ))}
        </div>
        <MdKeyboardArrowRight className='text-4xl cursor-pointer -mr-30 text-gray-400' />
      </div>
    </div>
  );
};

export default Recommanded;