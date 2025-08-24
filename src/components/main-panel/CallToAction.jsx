import React, { useEffect, useState } from 'react';
import { FiMail } from 'react-icons/fi';
import { getApiEndpoint } from '../APIConnect';

const CallToAction = () => {
  const [callData, setCallData] = useState(null);

  useEffect(() => {
    fetch(getApiEndpoint('call_action'))
      .then(res => res.json())
      .then(data => {
        if (data.success && data.data) setCallData(data.data);
        console.log('call Action API',data);
        
      });
  }, []);

  return (
    <div className="flex justify-center mt-20 mb-10 px-4" style={{
      background: callData?.containerFluidBgColor || undefined
    }}>
      <div
        className="flex flex-col md:flex-row bg-white shadow-2xl rounded-4xl overflow-hidden max-w-5xl w-full"
        style={{
          background: callData?.containerBgColor || undefined,
          boxShadow: callData?.boxShadowColor ? `0 4px 24px ${callData.boxShadowColor}` : undefined
        }}
      >
        <div className="md:w-1/4 w-full flex items-center justify-center">
          {callData?.emailIcon ? (
            <img
              src={`http://localhost:5002/uploads/${callData.emailIcon}`}
              alt="Email Icon"
              className="object-cover w-16 h-16 rounded-4xl p-5"
            />
          ) : (
            <FiMail className="text-blue-600 text-4xl" />
          )}
        </div>
        <div className="md:w-1/2 w-full p-8 flex flex-col justify-center">
          <h2
            className="text-2xl md:text-xl font-bold mb-2"
            style={{
              color: callData?.headingColor,
              fontFamily: callData?.headingFont,
              ...(callData?.headingStyle && typeof callData.headingStyle === "object" && !Array.isArray(callData.headingStyle) ? callData.headingStyle : {})
            }}
          >
            {callData?.heading || "Subscribe to newsletter"}
          </h2>
          <p
            className="text-gray-600 text-sm mb-6"
            style={{
              color: callData?.subHeadingColor,
              fontFamily: callData?.subHeadingFont,
              ...(callData?.subHeadingStyle && typeof callData.subHeadingStyle === "object" && !Array.isArray(callData.subHeadingStyle) ? callData.subHeadingStyle : {})
            }}
          >
            {callData?.subHeading ||
              "Sign up for our newsletter to stay up-to-date on the latest promotions, discounts, and new feature releases."}
          </p>
          <form className="flex items-center border rounded-full px-4 py-2 gap-3 w-full h-13 max-w-md shadow-sm">
            {callData?.emailIcon ? (
              <img
                src={`http://localhost:5002/uploads/${callData.emailIcon}`}
                alt="Email Icon"
                className="w-6 h-6"
              />
            ) : (
              <FiMail className="text-blue-600 text-xl" />
            )}
            <input
              type="email"
              placeholder={callData?.placeholderContent || "Enter your mail"}
              className="flex-grow outline-none text-sm text-gray-700"
              style={{
                color: callData?.placeholderColor,
                fontFamily: callData?.placeholderFont,
                ...(callData?.placeholderStyle && typeof callData.placeholderStyle === "object" && !Array.isArray(callData.placeholderStyle) ? callData.placeholderStyle : {})
              }}
            />
            <button
              type="submit"
              className="bg-black text-white text-sm px-5 py-2 rounded-full hover:bg-gray-800 transition"
              style={{
                background: callData?.subscribeBtnColor,
                fontFamily: callData?.subscribeBtnFont,
                ...(callData?.subscribeBtnStyle && typeof callData.subscribeBtnStyle === "object" && !Array.isArray(callData.subscribeBtnStyle) ? callData.subscribeBtnStyle : {})
              }}
            >
              {callData?.subscribeBtn || "Subscribe"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CallToAction;
