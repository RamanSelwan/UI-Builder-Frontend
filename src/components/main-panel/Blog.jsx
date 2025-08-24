import React, { useEffect, useState } from 'react'
import { getApiEndpoint } from '../APIConnect';

const Blog = () => {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    fetch(getApiEndpoint('blog'))
      .then((res) => res.json())
      .then((data) => {
        if (data.success && data.data) setBlogs(data.data.cards || []);
        
        console.log('blog data ',data);
        
      });
  }, []);

  return (
    <div>
      <div className="flex flex-col items-center justify-center bg-[#422A3C] w-full h-130">
        <h1 className="text-white text-lg font-bold">BLOG</h1>
        <div className="flex flex-row gap-3 mt-3">
          {Array.isArray(blogs) && blogs.map((item, idx) => (
            <div key={idx} className="bg-white w-70 h-80 mt-5">
              <img
                src={`http://localhost:5002/uploads/${item.image}`}
                alt="image"
                className="object-cover w-70 h-35"
              />
              <div className="p-5">
                <h1 className="font-bold text-lg text-[#b21858]">
                  {item.heading}
                </h1>
                <p className="text-md">
                  {item.service} | {item.name} | {item.date}
                </p>
                <p className="text-sm">{item.subHeading}</p>
              </div>
            </div>
          ))}
        </div>
        <button className="text-white text-md mt-5 justify-center items-center">
          View All
        </button>
      </div>
    </div>
  );
};

export default Blog;