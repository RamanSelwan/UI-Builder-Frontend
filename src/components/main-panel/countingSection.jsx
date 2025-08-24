import React, { useEffect, useState } from 'react';
import { getApiEndpoint } from '../APIConnect';

const CountingSection = () => {
  const [countingData, setCountingData] = useState(null);

  useEffect(() => {
    fetch(getApiEndpoint('count'))
      .then(res => res.json())
      .then(data => {
        if (data.success && data.data.length > 0) {
          setCountingData(data.data[0]); // Use first section
        }
      });
  }, []);

  return (
    <div>
      <div className='bg-black h-25 flex items-center justify-center p-1 overflow-hidden mt-10 w-screen'>
        <div className='bg-[#ba7894] w-30 h-30 rounded-full -ml-30 mt-20'></div>
        <div className='flex flex-row gap-20'>
          <div className='px-25'>
            <h1 className='text-2xl text-[#FBF2E0] font-bold'>
              {countingData?.columns?.[0]?.number || "502"}
            </h1>
            <p className='font-bond text-[#FBF2E0]'>
              {countingData?.columns?.[0]?.heading || "Projects Done"}
            </p>
          </div>
          <div className='px-25'>
            <h1 className='text-2xl text-[#FBF2E0] font-bold'>
              {countingData?.columns?.[1]?.number || "10+"}
            </h1>
            <p className='font-bond text-[#FBF2E0]'>
              {countingData?.columns?.[1]?.heading || "Years Of Experience"}
            </p>
          </div>
          <div className='px-25'>
            <h1 className='text-2xl text-[#FBF2E0] font-bold'>
              {countingData?.columns?.[2]?.number || "273+"}
            </h1>
            <p className='font-bond text-[#FBF2E0]'>
              {countingData?.columns?.[2]?.heading || "Client Served"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CountingSection;