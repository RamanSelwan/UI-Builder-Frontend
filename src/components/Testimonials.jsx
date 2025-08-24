import React, { useState } from "react";
import SidebarLayout from "./Sidebar";
import ColorPicker from "./ColorPicker";
import FontSelector from "./FontSelector";
import TextStyler from "./TextStyler";
import { getApiEndpoint } from "./APIConnect";

export default function TestimonialsSection() {
  const fileFields = [
    { label: "Upload First User", key: "user1", defaultImg: "https://randomuser.me/api/portraits/men/45.jpg" },
    { label: "Upload Second User", key: "user2", defaultImg: "https://randomuser.me/api/portraits/women/46.jpg" },
    { label: "Upload Third User", key: "user3", defaultImg: "https://randomuser.me/api/portraits/men/47.jpg" }
  ];

  // Inputs state
  const [topTitle, setTopTitle] = useState("HAIR SALON, MASSAGES, BEAUTY SALON");
  const [heading, setHeading] = useState("Find a service close to you");
  const [colName, setColName] = useState("HAIR SALON, MASSAGES, BEAUTY SALON");
  const [colLocation, setColLocation] = useState("Find a service close to you");
  const [colHeading, setColHeading] = useState("HAIR SALON, MASSAGES, BEAUTY SALON");
  const [colSubHeading, setColSubHeading] = useState("Find a service close to you");

  // Color/font/style states
  const [topTitleColor, setTopTitleColor] = useState("#000000");
  const [topTitleFont, setTopTitleFont] = useState("inherit");
  const [topTitleStyle, setTopTitleStyle] = useState({});
  const [showTopTitleColor, setShowTopTitleColor] = useState(false);
  const [showTopTitleFont, setShowTopTitleFont] = useState(false);
  const [showTopTitleStyle, setShowTopTitleStyle] = useState(false);

  const [headingColor, setHeadingColor] = useState("#000000");
  const [headingFont, setHeadingFont] = useState("inherit");
  const [headingStyle, setHeadingStyle] = useState({});
  const [showHeadingColor, setShowHeadingColor] = useState(false);
  const [showHeadingFont, setShowHeadingFont] = useState(false);
  const [showHeadingStyle, setShowHeadingStyle] = useState(false);

  const [colNameColor, setColNameColor] = useState("#000000");
  const [colNameFont, setColNameFont] = useState("inherit");
  const [colNameStyle, setColNameStyle] = useState({});
  const [showColNameColor, setShowColNameColor] = useState(false);
  const [showColNameFont, setShowColNameFont] = useState(false);
  const [showColNameStyle, setShowColNameStyle] = useState(false);

  const [colLocationColor, setColLocationColor] = useState("#000000");
  const [colLocationFont, setColLocationFont] = useState("inherit");
  const [colLocationStyle, setColLocationStyle] = useState({});
  const [showColLocationColor, setShowColLocationColor] = useState(false);
  const [showColLocationFont, setShowColLocationFont] = useState(false);
  const [showColLocationStyle, setShowColLocationStyle] = useState(false);

  const [colHeadingColor, setColHeadingColor] = useState("#000000");
  const [colHeadingFont, setColHeadingFont] = useState("inherit");
  const [colHeadingStyle, setColHeadingStyle] = useState({});
  const [showColHeadingColor, setShowColHeadingColor] = useState(false);
  const [showColHeadingFont, setShowColHeadingFont] = useState(false);
  const [showColHeadingStyle, setShowColHeadingStyle] = useState(false);

  const [colSubHeadingColor, setColSubHeadingColor] = useState("#000000");
  const [colSubHeadingFont, setColSubHeadingFont] = useState("inherit");
  const [colSubHeadingStyle, setColSubHeadingStyle] = useState({});
  const [showColSubHeadingColor, setShowColSubHeadingColor] = useState(false);
  const [showColSubHeadingFont, setShowColSubHeadingFont] = useState(false);
  const [showColSubHeadingStyle, setShowColSubHeadingStyle] = useState(false);

  // File upload state
  const [userImages, setUserImages] = useState({
    user1: fileFields[0].defaultImg,
    user2: fileFields[1].defaultImg,
    user3: fileFields[2].defaultImg,
  });
  const [userFileNames, setUserFileNames] = useState({
    user1: "No file chosen",
    user2: "No file chosen",
    user3: "No file chosen",
  });
  const [userFiles, setUserFiles] = useState({ user1: null, user2: null, user3: null });

  const handleFileChange = (e, key) => {
    const file = e.target.files[0];
    if (file) {
      setUserFiles(prev => ({ ...prev, [key]: file }));
      setUserImages(prev => ({ ...prev, [key]: URL.createObjectURL(file) }));
      setUserFileNames(prev => ({ ...prev, [key]: file.name }));
    }
  };

  const handleRemoveImage = (key, defaultImg) => {
    setUserImages((prev) => ({
      ...prev,
      [key]: defaultImg,
    }));
    setUserFileNames((prev) => ({
      ...prev,
      [key]: "No file chosen",
    }));
    setUserFiles((prev) => ({
      ...prev,
      [key]: null,
    }));
  };

  const inputClasses = "w-full border border-gray-400 px-3 py-3 rounded text-sm bg-white font-bold placeholder-black pr-24";
  const iconGroup = "absolute top-0 right-0 h-full flex items-center space-x-2 pr-2";

  // Helper for styled input with color/font/style pickers
  const StyledInput = ({
    value, onChange, color, setColor, font, setFont, style, setStyle,
    showColor, setShowColor, showFont, setShowFont, showStyle, setShowStyle,
    placeholder = ""
  }) => (
    <div className="relative">
      <input
        type="text"
        value={value}
        onChange={e => onChange(e.target.value)}
        style={{ color, fontFamily: font, ...style }}
        className={inputClasses}
        placeholder={placeholder}
      />
      <div className={iconGroup}>
        {/* Font Button */}
        <button
          type="button"
          className="font-bold text-blue-700 text-base w-7 h-7 rounded bg-gray-100 flex items-center justify-center"
          title="Font"
          onClick={() => setShowFont(true)}
        >
          A
        </button>
        {/* Style Button */}
        <button
          type="button"
          className="font-bold text-base w-7 h-7 rounded bg-gray-100 flex items-center justify-center underline"
          title="Style"
          onClick={() => setShowStyle(true)}
        >
          Ag
        </button>
        {/* Color Picker Button */}
        <button
          type="button"
          className="w-7 h-7 rounded-full border border-gray-300"
          style={{ backgroundColor: color }}
          title="Color"
          onClick={() => setShowColor(true)}
        />
      </div>
      {/* Modals */}
      {showColor && (
        <ColorPicker
          selectedColor={color}
          onColorChange={c => { setColor(c); setShowColor(false); }}
          onClose={() => setShowColor(false)}
        />
      )}
      {showFont && (
        <FontSelector
          selectedFont={font}
          onFontChange={f => { setFont(f); setShowFont(false); }}
          onClose={() => setShowFont(false)}
        />
      )}
      {showStyle && (
        <TextStyler
          selectedStyle={style}
          onStyleChange={s => { setStyle(s); setShowStyle(false); }}
          onClose={() => setShowStyle(false)}
        />
      )}
    </div>
  );

  const handleSave = async () => {
    const formData = new FormData();

    // Add topTitle and heading with styling
    formData.append("topTitle", JSON.stringify({
      text: topTitle,
      color: topTitleColor,
      font: topTitleFont,
      style: topTitleStyle
    }));
    formData.append("heading", JSON.stringify({
      text: heading,
      color: headingColor,
      font: headingFont,
      style: headingStyle
    }));

    // Prepare users array
    const users = [
      {
        name: colName,
        location: colLocation,
        heading: colHeading,
        subHeading: colSubHeading,
        nameColor: colNameColor,
        nameFont: colNameFont,
        nameStyle: colNameStyle,
        locationColor: colLocationColor,
        locationFont: colLocationFont,
        locationStyle: colLocationStyle,
        headingColor: colHeadingColor,
        headingFont: colHeadingFont,
        headingStyle: colHeadingStyle,
        subHeadingColor: colSubHeadingColor,
        subHeadingFont: colSubHeadingFont,
        subHeadingStyle: colSubHeadingStyle,
      },
      {
        name: colName, // yahan second user ka name state rakhein
        location: colLocation, // yahan second user ka location state rakhein
        heading: colHeading, // yahan second user ka heading state rakhein
        subHeading: colSubHeading, // yahan second user ka subHeading state rakhein
        // ...colors/fonts/styles for user2
      },
      {
        name: colName, // yahan third user ka name state rakhein
        location: colLocation, // yahan third user ka location state rakhein
        heading: colHeading, // yahan third user ka heading state rakhein
        subHeading: colSubHeading, // yahan third user ka subHeading state rakhein
        // ...colors/fonts/styles for user3
      }
    ];

    // Append user images
    if (userFiles.user1) formData.append('image0', userFiles.user1);
    if (userFiles.user2) formData.append('image1', userFiles.user2);
    if (userFiles.user3) formData.append('image2', userFiles.user3);

    formData.append("users", JSON.stringify(users));

    try {
      const res = await fetch(getApiEndpoint('test'), {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      if (data.success) {
        alert("Testimonials section saved!");
      } else {
        alert(data.message || "Failed to save.");
      }
    } catch (err) {
      alert("Error saving testimonials section.");
    }
  };

  return (
    <SidebarLayout>
      <div className="w-screen h-screen bg-white flex  p-2">
        <div className="w-full max-w-3xl max-h-[600px] overflow-auto shadow-lg font-sans  bg-white text-black font-bold">
          {/* Top header with Save button */}
          <div className="border-b border-gray-300 p-6 pb-4 flex justify-between items-center">
            <h2 className="text-xl font-bold text-blue-900 bg-white px-2 py-1 rounded inline-block">
              Testimonials Section
            </h2>
            <button
              type="button"
              className="bg-blue-600 text-white font-bold px-6 py-2 rounded-2xl transition-all hover:bg-blue-900  text-base"
              onClick={handleSave}
            >
              Save
            </button>
          </div>

          <form className="p-6 pt-5 space-y-6">

            {/* Top Title */}
            <div>
              <label className="block text-xs font-bold mb-1 ml-1 text-black">Top Title</label>
              <StyledInput
                value={topTitle}
                onChange={setTopTitle}
                color={topTitleColor}
                setColor={setTopTitleColor}
                font={topTitleFont}
                setFont={setTopTitleFont}
                style={topTitleStyle}
                setStyle={setTopTitleStyle}
                showColor={showTopTitleColor}
                setShowColor={setShowTopTitleColor}
                showFont={showTopTitleFont}
                setShowFont={setShowTopTitleFont}
                showStyle={showTopTitleStyle}
                setShowStyle={setShowTopTitleStyle}
                placeholder="Top Title"
              />
            </div>

            {/* Heading */}
            <div>
              <label className="block text-xs font-bold mb-1 ml-1 text-black">Heading</label>
              <StyledInput
                value={heading}
                onChange={setHeading}
                color={headingColor}
                setColor={setHeadingColor}
                font={headingFont}
                setFont={setHeadingFont}
                style={headingStyle}
                setStyle={setHeadingStyle}
                showColor={showHeadingColor}
                setShowColor={setShowHeadingColor}
                showFont={showHeadingFont}
                setShowFont={setShowHeadingFont}
                showStyle={showHeadingStyle}
                setShowStyle={setShowHeadingStyle}
                placeholder="Heading"
              />
            </div>

            {/* BG Color Pickers */}
            <div className="flex flex-wrap gap-8">
              <div>
                <label className="block text-xs font-bold mb-1 text-black">Container BG Color Change</label>
                <div className="flex items-center gap-2">
                  <input type="color" value="#422A3C" readOnly className="w-8 h-8 border-gray-400 border rounded p-0 bg-transparent" />
                  <span className="text-xs font-bold text-black">#422A3C</span>
                </div>
              </div>
              <div>
                <label className="block text-xs font-bold mb-1 text-black">Container Fluid BG Color Change</label>
                <div className="flex items-center gap-2">
                  <input type="color" value="#FBF2E0" readOnly className="w-8 h-8 border-gray-400 border rounded p-0 bg-transparent" />
                  <span className="text-xs font-bold text-black">#FBF2E0</span>
                </div>
              </div>
            </div>

            {/* File Upload Fields */}
            <div className="space-y-4">
              {fileFields.map((row, idx) => (
                <div key={row.key}>
                  <label className="block text-xs font-bold mb-1 ml-1 text-black">{row.label}</label>
                  <div className="flex items-center justify-between border border-gray-400 rounded px-2 py-3 bg-gray-100">
                    <div className="flex items-center gap-2">
                      <img src={userImages[row.key]} alt={row.label} className="w-8 h-8 rounded-full border border-gray-400" />
                      <label className="border border-gray-400 px-3 py-1 rounded bg-white text-xs font-bold text-black relative cursor-pointer">
                        Choose File
                        <input
                          type="file"
                          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                          tabIndex={-1}
                          style={{ left: 0, top: 0, position: "absolute", zIndex: 2 }}
                          onChange={e => handleFileChange(e, row.key)}
                        />
                      </label>
                      <span className="text-xs text-black font-bold ml-2 opacity-70">{userFileNames[row.key]}</span>
                    </div>
                    <button
                      className="text-xs text-black font-bold opacity-70"
                      title="Delete"
                      type="button"
                      onClick={() => handleRemoveImage(row.key, row.defaultImg)}
                    >
                      <svg viewBox="0 0 16 16" fill="none" className="w-3.5 h-3.5" aria-hidden="true">
                        <path
                          d="M6 6v5m4-5v5M7 2.5h2a2 2 0 0 1 2 2v.5H5v-.5a2 2 0 0 1 2-2zM2 5h12m-2 0v7a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V5"
                          stroke="currentColor"
                          strokeWidth="1.2"
                          strokeLinecap="round"
                        />
                      </svg>
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Second Column Name */}
            <div>
              <label className="block text-xs font-bold mb-1 ml-1 text-black">Second Column Name</label>
              <StyledInput
                value={colName}
                onChange={setColName}
                color={colNameColor}
                setColor={setColNameColor}
                font={colNameFont}
                setFont={setColNameFont}
                style={colNameStyle}
                setStyle={setColNameStyle}
                showColor={showColNameColor}
                setShowColor={setShowColNameColor}
                showFont={showColNameFont}
                setShowFont={setShowColNameFont}
                showStyle={showColNameStyle}
                setShowStyle={setShowColNameStyle}
                placeholder="Second Column Name"
              />
            </div>

            {/* Second Column Location */}
            <div>
              <label className="block text-xs font-bold mb-1 ml-1 text-black">Second Column Location</label>
              <StyledInput
                value={colLocation}
                onChange={setColLocation}
                color={colLocationColor}
                setColor={setColLocationColor}
                font={colLocationFont}
                setFont={setColLocationFont}
                style={colLocationStyle}
                setStyle={setColLocationStyle}
                showColor={showColLocationColor}
                setShowColor={setShowColLocationColor}
                showFont={showColLocationFont}
                setShowFont={setShowColLocationFont}
                showStyle={showColLocationStyle}
                setShowStyle={setShowColLocationStyle}
                placeholder="Second Column Location"
              />
            </div>

            {/* Second Column Heading */}
            <div>
              <label className="block text-xs font-bold mb-1 ml-1 text-black">Second Column Heading</label>
              <StyledInput
                value={colHeading}
                onChange={setColHeading}
                color={colHeadingColor}
                setColor={setColHeadingColor}
                font={colHeadingFont}
                setFont={setColHeadingFont}
                style={colHeadingStyle}
                setStyle={setColHeadingStyle}
                showColor={showColHeadingColor}
                setShowColor={setShowColHeadingColor}
                showFont={showColHeadingFont}
                setShowFont={setShowColHeadingFont}
                showStyle={showColHeadingStyle}
                setShowStyle={setShowColHeadingStyle}
                placeholder="Second Column Heading"
              />
            </div>

            {/* Second Column Sub heading */}
            <div className="mb-6">
              <label className="block text-xs font-bold mb-1 ml-1 text-black">Second Column Sub heading</label>
              <StyledInput
                value={colSubHeading}
                onChange={setColSubHeading}
                color={colSubHeadingColor}
                setColor={setColSubHeadingColor}
                font={colSubHeadingFont}
                setFont={setColSubHeadingFont}
                style={colSubHeadingStyle}
                setStyle={setColSubHeadingStyle}
                showColor={showColSubHeadingColor}
                setShowColor={setShowColSubHeadingColor}
                showFont={showColSubHeadingFont}
                setShowFont={setShowColSubHeadingFont}
                showStyle={showColSubHeadingStyle}
                setShowStyle={setShowColSubHeadingStyle}
                placeholder="Second Column Sub heading"
              />
            </div>
          </form>
        </div>
      </div>
    </SidebarLayout>
  );
}
