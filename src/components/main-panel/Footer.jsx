import React, { useEffect, useState } from 'react';
import { getApiEndpoint } from '../APIConnect';

const Footer = () => {
  const [footerData, setFooterData] = useState(null);

  useEffect(() => {
    fetch(getApiEndpoint('footer'))
      .then(res => res.json())
      .then(data => {
        if (data.success && data.data) setFooterData(data.data);
        console.log('footer api',data);
        
      });
  }, []);

  return (
    <div className="bg-[#241520] text-white px-15 pt-7 pb-5">
      <div className="flex flex-col md:flex-row justify-between items-center border-b border-gray-600 pb-6">
        <div className="flex items-center gap-3">
          {footerData?.logo && (
            <img src={`http://localhost:5002/uploads/${footerData.logo}`} alt="Logo" className="w-7 h-7" />
          )}
          <h2 className="text-lg font-semibold">SERVICEMARKET</h2>
        </div>
        <div className="flex gap-2 mt-4 md:mt-0">
          {footerData?.socialIcons?.map((icon, idx) => (
            <img
              key={idx}
              src={`http://localhost:5002/uploads/${icon.icon}`}
              alt={icon.name}
              className="w-6 h-6 p-1 border hover:text-pink-400"
            />
          ))}
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8 text-md">
        
        <div className='p-1'>
          <h3 className="font-bold  text-md">Explore</h3>
          <ul className="space-y-1 text-sm">
            {footerData?.headings1?.map((item, idx) => (
              <li key={idx}>{item.value}</li>
            ))}
          </ul>
            <h3 className="font-bold text-md mt-4">Menu</h3>
    <ul className="space-y-1 text-sm">
      {footerData?.menuItems?.map((item, idx) => (
        <li key={idx}>{item.name}</li>
      ))}
    </ul>   
        </div>
      
        
        <div className='p-1'>
          <h3 className="font-bold  text-md ">Utility Pages</h3>
          <ul className="space-y-1 text-sm">
            {footerData?.headings2?.map((item, idx) => (
              <li key={idx}>{item.value}</li>
            ))}
          </ul>
        
        </div>
        <div className='p-1'>
          <h3 className="font-bold text-md ">{footerData?.contactHeading || "Keep in Touch"}</h3>
          {footerData?.contactDetails?.map((detail, idx) => (
            <div key={idx} className='flex flex-row gap-2 p-1'>
              <p><span className="font-bold text-md ">{detail.label}:</span></p>
              <p className='mt-2 ml-5'>{detail.value}</p>
            </div>
          ))}
          {/* Menu Items */}
        
        </div>
      </div>
      <div className='bg-[#160813] -ml-20  -mb-10 w-347 h-12'>
        <div className="text-center text-sm mt-10 bg-[#160813] w-screen h-8 pt-4">
          {footerData?.copyrights?.[0]?.value ||
            "© 2025,  Created Pawan Gangwar | All rights reserved."}
        </div>
      </div>
    </div>
  );
};

export default Footer;
