import React, { useEffect, useState } from 'react';
import { getApiEndpoint } from '../APIConnect';

const Gallery = () => {
  const [galleryData, setGalleryData] = useState([]);
  const [header, setHeader] = useState("");
  const [title, setTitle] = useState("");

  useEffect(() => {
    fetch(getApiEndpoint('gallery'))
      .then(res => res.json())
      .then(data => {
        if (data.success && data.data) {
          setGalleryData(data.data.images || []);
          setHeader(data.data.heading || "");
          setTitle(data.data.topTitle || "");
        }
        console.log('gallery API',data)
      });
  }, []);

  return (
    <div className="bg-gray-100 py-10 px-4">
      <div className="flex flex-col items-center justify-center text-center mb-5">
        <h1 className="text-xl sm:text-2xl md:text-3xl font-bold mb-3">
          {header?.text} <br className="hidden sm:block" /> 
        </h1>
        <p className="text-sm sm:text-base max-w-lg">
          {title?.text}
        </p>
      </div>
      <div className="flex flex-col lg:flex-row lg:justify-center lg:items-start gap-2 max-w-6xl mx-auto">
        {galleryData.length > 0 ? (
          <>
            <div className="flex justify-center">
              <img
                src={`http://localhost:5002/uploads/${galleryData[0]?.fileName}`}
                alt={galleryData[0]?.label || "img12"}
                className="w-full sm:w-96 h-64 sm:h-80 object-cover rounded-2xl lg:rounded-l-2xl"
              />
            </div>
            <div className="flex flex-col gap-2 items-center">
              <img
                src={`http://localhost:5002/uploads/${galleryData[1]?.fileName}`}
                alt={galleryData[1]?.label || "img22"}
                className="w-72 sm:w-80 h-40 sm:h-48 object-cover rounded-xl"
              />
              <img
                src={`http://localhost:5002/uploads/${galleryData[2]?.fileName}`}
                alt={galleryData[2]?.label || "img32"}
                className="w-72 sm:w-80 h-40 sm:h-48 object-cover rounded-xl"
              />
            </div>
            <div className="flex flex-col gap-2 items-center">
              <img
                src={`http://localhost:5002/uploads/${galleryData[3]?.fileName}`}
                alt={galleryData[3]?.label || "img42"}
                className="w-72 sm:w-80 h-40 sm:h-48 object-cover rounded-xl lg:rounded-r-2xl"
              />
              <img
                src={`http://localhost:5002/uploads/${galleryData[4]?.fileName}`}
                alt={galleryData[4]?.label || "img52"}
                className="w-72 sm:w-80 h-40 sm:h-48 object-cover rounded-xl lg:rounded-r-2xl"
              />
             
            </div>
          </>
        ) : (
          <div className="text-center text-gray-500 w-full">No gallery images found.</div>
        )}
      </div>
    </div>
  );
};

export default Gallery;
