import React, { useState } from "react";
import SidebarLayout from "./Sidebar";
import ColorPicker from "./ColorPicker";
import FontSelector from "./FontSelector";
import TextStyler from "./TextStyler";
import { getApiEndpoint } from "./APIConnect";

// A reusable component for the text input sections to keep the main component cleaner.
const SectionInput = ({
  label,
  value,
  onChange,
  placeholder,
  isTextarea = false,
}) => {
  // States for color, font, and style pickers
  const [showColorPicker, setShowColorPicker] = useState(false);
  const [showFontSelector, setShowFontSelector] = useState(false);
  const [showTextStyler, setShowTextStyler] = useState(false);

  // Style states
  const [inputColor, setInputColor] = useState("#000000");
  const [inputFont, setInputFont] = useState("inherit");
  const [inputStyle, setInputStyle] = useState({});

  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">
        {label}
      </label>
      <div className="flex items-stretch border border-gray-300 rounded-lg overflow-hidden focus-within:ring-2 focus-within:ring-blue-500 transition-shadow duration-200">
        {isTextarea ? (
          <textarea
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            style={{
              color: inputColor,
              fontFamily: inputFont,
              ...inputStyle,
            }}
            className="w-full p-3 outline-none resize-none"
            rows="3"
          />
        ) : (
          <input
            type="text"
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            style={{
              color: inputColor,
              fontFamily: inputFont,
              ...inputStyle,
            }}
            className="w-full p-3 outline-none"
          />
        )}
        <div className="flex items-center space-x-2 px-3 bg-gray-50 border-l border-gray-300">
          {/* Color Picker Button */}
          <button
            className="w-6 h-6 rounded-full border-2 border-white ring-1 ring-gray-300"
            style={{ backgroundColor: inputColor }}
            title="Change color"
            type="button"
            onClick={() => setShowColorPicker(true)}
          ></button>
          {/* Font Selector Button */}
          <button
            className="text-blue-500 text-xl font-serif p-1 rounded-md hover:bg-gray-200"
            title="Format Font"
            type="button"
            onClick={() => setShowFontSelector(true)}
          >
            A
          </button>
          {/* Text Styler Button */}
          <button
            className="text-sm font-sans p-1 rounded-md hover:bg-gray-200"
            title="Change Font Style"
            type="button"
            onClick={() => setShowTextStyler(true)}
          >
            Aa
          </button>
        </div>
      </div>
      {/* Modals for pickers */}
      {showColorPicker && (
        <ColorPicker
          selectedColor={inputColor}
          onColorChange={(color) => {
            setInputColor(color);
            setShowColorPicker(false);
          }}
          onClose={() => setShowColorPicker(false)}
        />
      )}
      {showFontSelector && (
        <FontSelector
          selectedFont={inputFont}
          onFontChange={(font) => {
            setInputFont(font);
            setShowFontSelector(false);
          }}
          onClose={() => setShowFontSelector(false)}
        />
      )}
      {showTextStyler && (
        <TextStyler
          selectedStyle={inputStyle}
          onStyleChange={(styleObj) => {
            setInputStyle(styleObj);
            setShowTextStyler(false);
          }}
          onClose={() => setShowTextStyler(false)}
        />
      )}
    </div>
  );
};

const AboutUs = () => {
  // State for all form fields, initialized with values from the image
  const [imagePreview, setImagePreview] = useState(
    "https://i.imgur.com/3FNrS2S.png"
  ); // Placeholder image similar to the one in UI
  const [fileName, setFileName] = useState("No file chosen");
  const [containerBg, setContainerBg] = useState("#422A3C");
  const [fluidBg, setFluidBg] = useState("#FBF2E0");
  const [topTitle, setTopTitle] = useState(
    "HAIR SALON, MASSAGES, BEAUTY SALON"
  );
  const [heading, setHeading] = useState("Find a service close to you");
  const [subHeading, setSubHeading] = useState(
    "There are many variations of passages of Lorem Ipsum available, majority have suffered alteration in some form."
  );

  // New states for background colors
  const [topTitleBg, setTopTitleBg] = useState("#ffffff");
  const [headingBg, setHeadingBg] = useState("#ffffff");
  const [subHeadingBg, setSubHeadingBg] = useState("#ffffff");

  // Add a ref to store the file object
  const [imageFile, setImageFile] = useState(null);

  // Update handleFileChange to store the file
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setImagePreview(URL.createObjectURL(file));
      setFileName(file.name);
      setImageFile(file);
    }
  };

  // Submit handler
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", topTitle);
    formData.append("heading", heading);
    formData.append("subheading", subHeading);
    formData.append("bgcolor", containerBg);
    formData.append("topTitleBg", topTitleBg);
    formData.append("headingBg", headingBg);
    formData.append("subHeadingBg", subHeadingBg);
    if (imageFile) {
      formData.append("image", imageFile);
    }

    try {
      const res = await fetch(getApiEndpoint('about'), {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      if (data.success) {
        alert("About section saved successfully!");
      } else {
        alert(data.message || "Failed to save.");
      }
    } catch (err) {
      alert("Error saving About section.");
    }
  };

  return (
    <SidebarLayout>
      <div className="bg-slate-100 min-h-screen flex items-center justify-center p-4">
        <div className="w-full max-w-4xl bg-white rounded-2xl shadow-lg p-8">
          {/* Header */}
          <div className="flex justify-between items-center mb-8">
            <h1 className=" text-2xl font-bold text-blue-700">About Us Section</h1>
            <button
              className="bg-blue-600 text-white font-semibold py-2 px-7 rounded-lg hover:bg-blue-700 transition-colors"
              onClick={handleSubmit}
            >
              Save
            </button>
          </div>

          {/* Form Content */}
          <div className="space-y-6">
            {/* This wrapper now just stacks its children vertically */}
            <div className="space-y-6">
              {/* Left Column Image Upload */}
              <div className="space-y-1">
                <label className="text-m font-medium text-gray-700">
                  Left Column Image
                </label>
                <div className="flex items-center space-x-4">
                  <img
                    src={imagePreview || undefined}
                    alt="Preview"
                    className="w-16 h-16 rounded-lg object-cover border"
                  />
                  <div className="flex items-center border border-gray-300 rounded-lg w-full">
                    <label
                      htmlFor="file-upload"
                      className="cursor-pointer bg-white text-sm font-medium text-gray-700 py-2 px-3 rounded-l-md border-r border-gray-300 hover:bg-gray-50 whitespace-nowrap"
                    >
                      Choose File
                    </label>
                    <input
                      id="file-upload"
                      name="file-upload"
                      type="file"
                      className="hidden"
                      onChange={handleFileChange}
                    />
                    <span className="text-sm text-gray-500 px-3 truncate">
                      {fileName}
                    </span>
                  </div>
                </div>
              </div>

              {/* Color Pickers (now appear below the image uploader) */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-sm font-bold  text-gray-700">
                    Container BG Color Change
                  </label>
                  <div className="flex items-center border border-gray-300 rounded-lg p-1">
                    <div
                      className="w-8 h-8 rounded-md mr-2 flex-shrink-0"
                      style={{ backgroundColor: containerBg }}
                    ></div>
                    <input
                      type="text"
                      value={containerBg}
                      onChange={(e) => setContainerBg(e.target.value)}
                      className="w-full outline-none bg-transparent text-gray-700 font-mono text-sm"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-sm font-bold  text-gray-700">
                    Container Fluid BG Color Change
                  </label>
                  <div className="flex items-center border border-gray-300 rounded-lg p-1">
                    <div
                      className="w-8 h-8 rounded-md mr-2 flex-shrink-0"
                      style={{ backgroundColor: fluidBg }}
                    ></div>
                    <input
                      type="text"
                      value={fluidBg}
                      onChange={(e) => setFluidBg(e.target.value)}
                      className="w-full outline-none bg-transparent text-gray-700 font-mono text-sm"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Text Sections */}
            <div className="space-y-4 pt-4">
              <div>
                <SectionInput
                  label={<span className="font-bold text-black">Top Title</span>}
                  value={topTitle}
                  onChange={(e) => setTopTitle(e.target.value)}
                />
                <div className="flex items-center mt-1">
                  <span className="mr-2 text-xs">BG Color:</span>
                  <input
                    type="color"
                    value={topTitleBg}
                    onChange={(e) => setTopTitleBg(e.target.value)}
                    className="w-8 h-8 border rounded"
                  />
                  <span className="ml-2 text-xs">{topTitleBg}</span>
                </div>
              </div>
              <div>
                <SectionInput
                  label={<span className="font-bold text-black">heading</span>}
                  value={heading}
                  onChange={(e) => setHeading(e.target.value)}
                />
                <div className="flex items-center mt-1">
                  <span className="mr-2 text-xs">BG Color:</span>
                  <input
                    type="color"
                    value={headingBg}
                    onChange={(e) => setHeadingBg(e.target.value)}
                    className="w-8 h-8 border rounded"
                  />
                  <span className="ml-2 text-xs">{headingBg}</span>
                </div>
              </div>
              <div>
                <SectionInput
                  label={<span className="font-bold text-black">subHeading</span>}
                  value={subHeading}
                  onChange={(e) => setSubHeading(e.target.value)}
                  isTextarea={true}
                />
                <div className="flex items-center mt-1">
                  <span className="mr-2 text-xs">BG Color:</span>
                  <input
                    type="color"
                    value={subHeadingBg}
                    onChange={(e) => setSubHeadingBg(e.target.value)}
                    className="w-8 h-8 border rounded"
                  />
                  <span className="ml-2 text-xs">{subHeadingBg}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </SidebarLayout>
  );
};

export default AboutUs;
