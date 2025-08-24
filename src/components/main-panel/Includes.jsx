import React, { useEffect, useState } from 'react';
import { IoMdCheckmarkCircleOutline } from "react-icons/io";
import { getApiEndpoint } from '../APIConnect';

const Includes = () => {
  const [includesData, setIncludesData] = useState(null);

  useEffect(() => {
    fetch(getApiEndpoint('includes'))
      .then(res => res.json())
      .then(data => {
        if (data.success && data.data) setIncludesData(data.data);
        console.log('include data',data);
        
      });
  }, []);

  return (
    <div>
      <div className='flex flex-row items-center justify-center '>
        <div className='flex flex-col items-start justify-start  pl-15 pb-5 '>
          <p
            className='text-[#ba7894]  text-lg p-1'
            style={{
              color: includesData?.topTitle?.color,
              fontFamily: includesData?.topTitle?.font,
              ...includesData?.topTitle?.style
            }}
          >
            {includesData?.topTitle?.text || "WHAT INCLUDES"}
          </p>
          <h1
            className='font-bold text-2xl text-black p-1'
            style={{
              color: includesData?.heading?.color,
              fontFamily: includesData?.heading?.font,
              ...includesData?.heading?.style
            }}
          >
            {includesData?.heading?.text || "The start of the journey"}
          </h1>
          <p className='text-sm p-2'>
            {includesData?.subHeading?.text ||
              "ServiceMarket.dk was founded in 2021 by two young entrepreneurs who saw a problem ..."}
          </p>
          <h1
            className='font-bold text-lg text-black p-1'
            style={{
              color: includesData?.mainHeading?.color,
              fontFamily: includesData?.mainHeading?.font,
              ...includesData?.mainHeading?.style
            }}
          >
            {includesData?.mainHeading?.text || "our Methodology :"}
          </h1>
          {includesData?.ourListSections?.map((item, idx) => (
            <div key={idx} className='flex flex-row'>
              {item.icon ? (
                <img
                  src={`http://localhost:5002/uploads/${item.icon}`}
                  alt="icon"
                  className='w-8 h-8 mr-2'
                />
              ) : (
                <IoMdCheckmarkCircleOutline className='text-[#ba7894] text-3xl p-1' />
              )}
              <div className='flex flex-col'>
                <h1 className='font-bold text-md text-black p-1'>{item.heading}</h1>
                <p className='text-sm p-1 flex flex-col'>{item.subHeading}</p>
              </div>
            </div>
          ))}
        </div>
        {/* ------------------------image------- */}
        <div className=' -mr-4  ml-15 mb-4'>
          {includesData?.bgImage ? (
            <img
              src={`http://localhost:5002/uploads/${includesData.bgImage}`}
              alt="Includes"
              className='w-170 h-160  object-cover '
            />
          ) : null}
          {includesData?.videoUrl && (
            <video
              src={`http://localhost:5002/uploads/${includesData.videoUrl}`}
              controls
              className="w-170 h-80 mt-4 rounded-lg object-cover"
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Includes;