import React, { useState } from 'react';
import SidebarLayout from './Sidebar';
import ColorPicker from './ColorPicker';
import FontSelector from './FontSelector';
import TextStyler from './TextStyler';
import { getApiEndpoint } from './APIConnect';

const GallerySection = () => {
  // States for color, font, and style for each text block (example for two blocks)
  const [color1, setColor1] = useState("#000000");
  const [font1, setFont1] = useState("inherit");
  const [style1, setStyle1] = useState({});
  const [showColor1, setShowColor1] = useState(false);
  const [showFont1, setShowFont1] = useState(false);
  const [showStyle1, setShowStyle1] = useState(false);

  const [color2, setColor2] = useState("#000000");
  const [font2, setFont2] = useState("inherit");
  const [style2, setStyle2] = useState({});
  const [showColor2, setShowColor2] = useState(false);
  const [showFont2, setShowFont2] = useState(false);
  const [showStyle2, setShowStyle2] = useState(false);

  // States for images and file names for each column
  const [images, setImages] = useState([null, null, null, null, null]);
  const [fileNames, setFileNames] = useState([
    "No file chosen",
    "No file chosen",
    "No file chosen",
    "No file chosen",
    "No file chosen",
  ]);
  const [imageFiles, setImageFiles] = useState([null, null, null, null, null]); // To keep actual File objects

  // Editable heading text state
  const [headingText, setHeadingText] = useState("HAIR SALOON , MASSAGE, BEAUTY SALON");
  const [topTitleText, setTopTitleText] = useState("Find a service close to you"); // <-- Add this

  // Handler for file input change
  const handleFileChange = (e, idx) => {
    const file = e.target.files[0];
    if (file) {
      const newImages = [...images];
      newImages[idx] = URL.createObjectURL(file);
      setImages(newImages);

      const newFileNames = [...fileNames];
      newFileNames[idx] = file.name;
      setFileNames(newFileNames);

      const newImageFiles = [...imageFiles];
      newImageFiles[idx] = file; // Store the actual File object
      setImageFiles(newImageFiles);
    }
  };

  // Helper for rendering each image upload column
  const renderImageColumn = (label, idx) => (
    <div className="w-[946px] h-20 relative" key={label}>
      <div className="w-[798px] h-20 left-[148px] top-0 absolute">
        <div className="w-[798px] h-12 left-0 top-[38px] absolute">
          <div className="w-[798px] h-12 left-0 top-0 absolute bg-white rounded-md border border-neutral-500" />
          <div className="w-[765px] h-9 left-[8px] top-[7px] absolute flex items-center">
            {/* Image preview on the left */}
            {images[idx] ? (
              <img
                className="w-7 h-7 mr-4 rounded object-cover"
                src={images[idx]}
                alt="Preview"
              />
            ) : (
              <div className="w-7 h-7 mr-4 rounded bg-gray-200 flex items-center justify-center text-gray-400">
                <span className="material-icons">image</span>
              </div>
            )}
            <div className="w-72 h-9 relative flex items-center">
              <div className="w-32 h-9 relative">
                <div className="w-32 h-9 absolute bg-gray-200 rounded-md" />
                <label
                  htmlFor={`file-upload-${idx}`}
                  className="w-28 h-7 absolute left-[10px] top-[5px] text-black text-lg font-normal font-['Jost'] cursor-pointer flex items-center"
                  style={{ zIndex: 2 }}
                >
                  Choose File
                  <input
                    id={`file-upload-${idx}`}
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => handleFileChange(e, idx)}
                  />
                </label>
              </div>
              <div className="w-40 h-7 ml-2 flex items-center text-black text-lg font-normal font-['Jost'] truncate">
                {fileNames[idx]}
              </div>
            </div>
          </div>
        </div>
        <div className="w-56 h-7 left-0 top-0 absolute justify-start text-black text-lg font-semibold font-['Jost']">
          {label}
        </div>
      </div>
      <div className="w-32 h-20 left-0 top-[3px] absolute">
        <div className="w-32 h-20 left-0 top-0 absolute bg-white rounded-xl border border-neutral-500" />
        {images[idx] && (
          <img
            className="w-16 h-20 left-[34px] top-[2px] absolute object-cover rounded"
            src={images[idx]}
            alt="Preview"
          />
        )}
      </div>
    </div>
  );

  const handleSave = async () => {
    const formData = new FormData();

    // Use editable heading and top title text
    formData.append("heading", JSON.stringify({
      text: headingText,
      color: color1,
      font: font1,
      style: style1
    }));
    formData.append("topTitle", JSON.stringify({
      text: topTitleText, // <-- Use state here
      color: color2,
      font: font2,
      style: style2
    }));

    // Images: append each file and label
    images.forEach((img, idx) => {
      if (img) {
        // You need to keep the actual File object, not just the preview URL
        // So, store the File object in a separate state (e.g., imageFiles)
        formData.append(`image${idx + 1}`, imageFiles[idx]); // imageFiles: [File, File, ...]
        formData.append(`label${idx + 1}`, fileNames[idx]);
      }
    });

    try {
      const res = await fetch(getApiEndpoint('gallery'), {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      if (data.success) {
        alert("Gallery saved!");
      } else {
        alert(data.message || "Failed to save.");
      }
    } catch (err) {
      alert("Error saving gallery.");
    }
  };

  return (
    <SidebarLayout>
      <div className="px-7 py-4 bg-white rounded-[5px] inline-flex flex-col justify-start items-end gap-4">

        {/* Main Heading with save */}
        <div className="inline-flex justify-start items-center gap-[590px]">
          <div className="justify-start text-sky-700 text-2xl font-bold font-['Jost']">Gallery Section</div>
          <div className="w-44 h-12 relative">
            <div className="w-35 h-10 left-0 top-1 right-1 absolute text-center bg-blue-500  rounded-2xl" />
            <button
              onClick={handleSave}
              className="w-10 h-5 relative  rounded-2xl"
            >
              <span className="absolute left-[50px] top-[5px] p-1 pl-2  text-white text-lg font-bold">
                Save
              </span>
            </button>
          </div>
        </div>

        {/* Editable Heading */}
        <div className="w-[946px] h-24 relative">
          <div className="w-48 h-7 left-0 top-0 absolute justify-start text-black text-lg font-semibold font-['Jost']">
            Heading
          </div>
          <div className="w-[946px] h-12 left-0 top-[43px] absolute">
            <div className="w-[946px] h-12 left-0 top-0 absolute bg-white rounded-md border border-neutral-500" />
            <div className="w-[912px] h-8 left-[17px] top-[10px] absolute flex justify-between items-center">
              {/* Editable Input */}
              <input
                type="text"
                value={headingText}
                onChange={e => setHeadingText(e.target.value)}
                className="text-black text-md font-normal font-['Jost'] bg-transparent border-none outline-none"
                style={{
                  color: color1,
                  fontFamily: font1,
                  ...style1,
                  width: "100%",
                }}
              />
              {/* Buttons */}
              <div className="flex gap-4">
                {/* Color Picker Button */}
                <button
                  onClick={() => setShowColor1(true)}
                  className="w-7 h-7 rounded-full border border-gray-300"
                  style={{ backgroundColor: color1 }}
                  title="Color"
                />
                {/* Font Selector Button */}
                <button
                  onClick={() => setShowFont1(true)}
                  className="w-7 h-7 flex items-center justify-center text-blue-500 text-xl font-bold bg-gray-100 rounded"
                  title="Font"
                >
                  A
                </button>
                {/* Text Styler Button */}
                <button
                  onClick={() => setShowStyle1(true)}
                  className="w-7 h-7 flex items-center justify-center text-black text-xl font-bold underline bg-gray-100 rounded"
                  title="Style"
                >
                  Aa
                </button>
              </div>
              {/* Modals */}
              {showColor1 && (
                <ColorPicker
                  selectedColor={color1}
                  onColorChange={(color) => {
                    setColor1(color);
                    setShowColor1(false);
                  }}
                  onClose={() => setShowColor1(false)}
                />
              )}
              {showFont1 && (
                <FontSelector
                  selectedFont={font1}
                  onFontChange={(font) => {
                    setFont1(font);
                    setShowFont1(false);
                  }}
                  onClose={() => setShowFont1(false)}
                />
              )}
              {showStyle1 && (
                <TextStyler
                  selectedStyle={style1}
                  onStyleChange={(styleObj) => {
                    setStyle1(styleObj);
                    setShowStyle1(false);
                  }}
                  onClose={() => setShowStyle1(false)}
                />
              )}
            </div>
          </div>
        </div>

        {/* Editable Top Title */}
        <div className="w-[946px] h-24 relative">
          <div className="w-48 h-7 left-0 top-0 absolute justify-start text-black text-lg font-semibold font-['Jost']">
            Top Title
          </div>
          {/* Main Box */}
          <div className="w-[946px] h-12 left-0 top-[43px] absolute">
            <div className="w-[946px] h-12 left-0 top-0 absolute bg-white rounded-md border border-neutral-500" />
            <div className="w-[912px] h-8 left-[17px] top-[10px] absolute flex justify-between items-center">
              {/* Editable Input */}
              <input
                type="text"
                value={topTitleText}
                onChange={e => setTopTitleText(e.target.value)}
                className="text-black text-lg font-normal font-['Jost'] bg-transparent border-none outline-none"
                style={{
                  color: color2,
                  fontFamily: font2,
                  ...style2,
                  width: "100%",
                }}
              />
              {/* Buttons */}
              <div className="flex gap-4">
                {/* Color Picker Button */}
                <button
                  onClick={() => setShowColor2(true)}
                  className="w-7 h-7 rounded-full border border-gray-300"
                  style={{ backgroundColor: color2 }}
                  title="Color"
                />
                {/* Font Selector Button */}
                <button
                  onClick={() => setShowFont2(true)}
                  className="w-7 h-7 flex items-center justify-center text-blue-500 text-xl font-bold bg-gray-100 rounded"
                  title="Font"
                >
                  A
                </button>
                {/* Text Styler Button */}
                <button
                  onClick={() => setShowStyle2(true)}
                  className="w-7 h-7 flex items-center justify-center text-black text-xl font-bold underline bg-gray-100 rounded"
                  title="Style"
                >
                  Aa
                </button>
              </div>
              {/* Modals */}
              {showColor2 && (
                <ColorPicker
                  selectedColor={color2}
                  onColorChange={(color) => {
                    setColor2(color);
                    setShowColor2(false);
                  }}
                  onClose={() => setShowColor2(false)}
                />
              )}
              {showFont2 && (
                <FontSelector
                  selectedFont={font2}
                  onFontChange={(font) => {
                    setFont2(font);
                    setShowFont2(false);
                  }}
                  onClose={() => setShowFont2(false)}
                />
              )}
              {showStyle2 && (
                <TextStyler
                  selectedStyle={style2}
                  onStyleChange={(styleObj) => {
                    setStyle2(styleObj);
                    setShowStyle2(false);
                  }}
                  onClose={() => setShowStyle2(false)}
                />
              )}
            </div>
          </div>
        </div>

        {/* Image Upload Columns */}
        {renderImageColumn("First Column Image", 0)}
        {renderImageColumn("Second Column Image", 1)}
        {renderImageColumn("Third Column Image", 2)}
        {renderImageColumn("Fourth Column Image", 3)}
        {renderImageColumn("Fifth Column Image", 4)}
      </div>
    </SidebarLayout>
  );
};

export default GallerySection;
