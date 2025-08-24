import React, { useState, useRef, useEffect } from "react";
import SidebarLayout from "../Sidebar"; // Make sure the filename matches your component
import FontSelector from "../FontSelector";       // Make sure the filename matches your component
import TextStyler from "../TextStyler";    
 import ColorPicker from "../ColorPicker";// Make sure the filename matches your component
import { getApiEndpoint } from "../APIConnect";

const colors = [
  "#000000", "#1d3557", "#3284ff", "#009969", "#ffb703",
  "#ffd700", "#ff69b4", "#e63946", "#e2e2e2", "#ffffff",
];

export default function HeroSection() {
  const [paletteOpen, setPaletteOpen] = useState(null);
  const [selectedColors, setSelectedColors] = useState({
    topTitle: "#000000",
    heading1: "#000000",
    heading2: "#000000",
    button: "#000000",
  });
  const [selectedFonts, setSelectedFonts] = useState({
    topTitle: "inherit",
    heading1: "inherit",
    heading2: "inherit",
    button: "inherit",
  });
  const [textStyles, setTextStyles] = useState({
    topTitle: {},
    heading1: {},
    heading2: {},
    button: {},
  });

  // For showing pickers
  const [showColorPicker, setShowColorPicker] = useState(null); // section or null
  const [showFontSelector, setShowFontSelector] = useState(null);
  const [showTextStyler, setShowTextStyler] = useState(null);

  // New state variables for text inputs
  const [topTitle, setTopTitle] = useState("HAIR SALON, MASSAGES, BEAUTY SALON");
  const [heading1, setHeading1] = useState("Find a service close to you");
  const [heading2, setHeading2] = useState("There are many variations of passages of Lorem Ipsum available, majority have suffered alteration in some form.");
  const [buttonText, setButtonText] = useState("Button");
  const [buttonUrl, setButtonUrl] = useState("/examl");
  const [heroImg, setHeroImg] = useState(null);

  // Handler functions
  const handleColorChange = (section, color) => {
    setSelectedColors((prev) => ({ ...prev, [section]: color }));
    setShowColorPicker(null);
  };

  const handleFontChange = (section, font) => {
    setSelectedFonts((prev) => ({ ...prev, [section]: font }));
    setShowFontSelector(null);
  };

  const handleTextStyleChange = (section, styleObj) => {
    setTextStyles((prev) => ({ ...prev, [section]: styleObj }));
    setShowTextStyler(null);
  };

  const handleHeroImgChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setHeroImg(e.target.files[0]);
    }
  };

  const handleSave = async () => {
    const formData = new FormData();
    formData.append("topTitle", JSON.stringify({
      text: topTitle,
      color: selectedColors.topTitle,
      font: selectedFonts.topTitle,
      style: textStyles.topTitle
    }));
    formData.append("heading1", JSON.stringify({
      text: heading1,
      color: selectedColors.heading1,
      font: selectedFonts.heading1,
      style: textStyles.heading1
    }));
    formData.append("heading2", JSON.stringify({
      text: heading2,
      color: selectedColors.heading2,
      font: selectedFonts.heading2,
      style: textStyles.heading2
    }));
    formData.append("button", JSON.stringify({
      text: buttonText,
      url: buttonUrl,
      color: selectedColors.button,
      font: selectedFonts.button,
      style: textStyles.button
    }));
    if (heroImg) {
      formData.append("heroImg", heroImg);
    }

    try {
      const res = await fetch(getApiEndpoint('hero'), {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      if (data.success) {
        alert("Hero section saved!");
      } else {
        alert(data.message || "Failed to save.");
      }
    } catch (err) {
      alert("Error saving hero section.");
    }
  };

  return (
    <SidebarLayout>
      <div className="min-h-screen bg-gradient-to-br from-blue-100 to-white flex flex-col">
        <div className="flex-1 flex flex-col items-center justify-center">
          <div className="w-full max-w-2xl bg-white rounded-xl shadow-lg p-8 mt-8">
            <div className="flex items-center justify-between mb-6">
              <span className="text-xl font-bold text-gray-800">Hero Section</span>
              <button
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
                onClick={handleSave}
                type="button"
              >
                Save
              </button>
            </div>

            <form className="space-y-6" autoComplete="off">
              {/* Top Title */}
              <label htmlFor="topTitle" className="block text-sm font-medium text-gray-700">Top Title</label>
              <div className="relative flex items-center">
                <input
                  id="topTitle"
                  type="text"
                  value={topTitle}
                  onChange={(e) => setTopTitle(e.target.value)}
                  style={{
                    color: selectedColors.topTitle,
                    fontFamily: selectedFonts.topTitle,
                    ...textStyles.topTitle,
                  }}
                  className="w-full border border-gray-300 rounded px-3 py-2 pr-24 focus:outline-none focus:ring-2 focus:ring-blue-300"
                />
                <div className="absolute right-2 top-1/2 -translate-y-1/2 flex space-x-2">
                  {/* Color Picker Button */}
                  <button
                    type="button"
                    className="w-6 h-6 rounded-full border border-gray-300"
                    style={{ backgroundColor: selectedColors.topTitle }}
                    onClick={() => setShowColorPicker("topTitle")}
                  />
                  {/* Font Selector Button */}
                  <button
                    type="button"
                    className="w-6 h-6 flex items-center justify-center font-bold text-gray-700 bg-gray-100 rounded"
                    onClick={() => setShowFontSelector("topTitle")}
                  >
                    A
                  </button>
                  {/* Text Styler Button */}
                  <button
                    type="button"
                    className="w-8 h-6 flex items-center justify-center font-bold text-gray-700 bg-gray-100 rounded"
                    onClick={() => setShowTextStyler("topTitle")}
                  >
                    Aa
                  </button>
                </div>
              </div>
              {showColorPicker === "topTitle" && (
                <ColorPicker
                  selectedColor={selectedColors.topTitle}
                  onColorChange={(color) => handleColorChange("topTitle", color)}
                  onClose={() => setShowColorPicker(null)}
                />
              )}
              {showFontSelector === "topTitle" && (
                <FontSelector
                  selectedFont={selectedFonts.topTitle}
                  onFontChange={(font) => handleFontChange("topTitle", font)}
                  onClose={() => setShowFontSelector(null)}
                />
              )}
              {showTextStyler === "topTitle" && (
                <TextStyler
                  selectedStyle={textStyles.topTitle}
                  onStyleChange={(styleObj) => handleTextStyleChange("topTitle", styleObj)}
                  onClose={() => setShowTextStyler(null)}
                />
              )}

              {/* Heading 1 */}
              <label htmlFor="heading1" className="block text-sm font-medium text-gray-700">Heading</label>
              <div className="relative flex items-center">
                <input
                  id="heading1"
                  type="text"
                  value={heading1}
                  onChange={(e) => setHeading1(e.target.value)}
                  style={{
                    color: selectedColors.heading1,
                    fontFamily: selectedFonts.heading1,
                    ...textStyles.heading1,
                  }}
                  className="w-full border border-gray-300 rounded px-3 py-2 pr-24 focus:outline-none focus:ring-2 focus:ring-blue-300"
                />
                <div className="absolute right-2 top-1/2 -translate-y-1/2 flex space-x-2">
                  <button
                    type="button"
                    className="w-6 h-6 rounded-full border border-gray-300"
                    style={{ backgroundColor: selectedColors.heading1 }}
                    onClick={() => setShowColorPicker("heading1")}
                  />
                  <button
                    type="button"
                    className="w-6 h-6 flex items-center justify-center font-bold text-gray-700 bg-gray-100 rounded"
                    onClick={() => setShowFontSelector("heading1")}
                  >
                    A
                  </button>
                  <button
                    type="button"
                    className="w-8 h-6 flex items-center justify-center font-bold text-gray-700 bg-gray-100 rounded"
                    onClick={() => setShowTextStyler("heading1")}
                  >
                    Aa
                  </button>
                </div>
              </div>
              {showColorPicker === "heading1" && (
                <ColorPicker
                  selectedColor={selectedColors.heading1}
                  onColorChange={(color) => handleColorChange("heading1", color)}
                  onClose={() => setShowColorPicker(null)}
                />
              )}
              {showFontSelector === "heading1" && (
                <FontSelector
                  selectedFont={selectedFonts.heading1}
                  onFontChange={(font) => handleFontChange("heading1", font)}
                  onClose={() => setShowFontSelector(null)}
                />
              )}
              {showTextStyler === "heading1" && (
                <TextStyler
                  selectedStyle={textStyles.heading1}
                  onStyleChange={(styleObj) => handleTextStyleChange("heading1", styleObj)}
                  onClose={() => setShowTextStyler(null)}
                />
              )}

              {/* Heading 2 */}
              <label htmlFor="heading2" className="block text-sm font-medium text-gray-700">Heading</label>
              <div className="relative flex items-center">
                <textarea
                  id="heading2"
                  value={heading2}
                  onChange={(e) => setHeading2(e.target.value)}
                  style={{
                    color: selectedColors.heading2,
                    fontFamily: selectedFonts.heading2,
                    ...textStyles.heading2,
                  }}
                  className="w-full border border-gray-300 rounded px-3 py-2 pr-24 focus:outline-none focus:ring-2 focus:ring-blue-300"
                />
                <div className="absolute right-2 top-1/2 -translate-y-1/2 flex space-x-2">
                  <button
                    type="button"
                    className="w-6 h-6 rounded-full border border-gray-300"
                    style={{ backgroundColor: selectedColors.heading2 }}
                    onClick={() => setShowColorPicker("heading2")}
                  />
                  <button
                    type="button"
                    className="w-6 h-6 flex items-center justify-center font-bold text-gray-700 bg-gray-100 rounded"
                    onClick={() => setShowFontSelector("heading2")}
                  >
                    A
                  </button>
                  <button
                    type="button"
                    className="w-8 h-6 flex items-center justify-center font-bold text-gray-700 bg-gray-100 rounded"
                    onClick={() => setShowTextStyler("heading2")}
                  >
                    Aa
                  </button>
                </div>
              </div>
              {showColorPicker === "heading2" && (
                <ColorPicker
                  selectedColor={selectedColors.heading2}
                  onColorChange={(color) => handleColorChange("heading2", color)}
                  onClose={() => setShowColorPicker(null)}
                />
              )}
              {showFontSelector === "heading2" && (
                <FontSelector
                  selectedFont={selectedFonts.heading2}
                  onFontChange={(font) => handleFontChange("heading2", font)}
                  onClose={() => setShowFontSelector(null)}
                />
              )}
              {showTextStyler === "heading2" && (
                <TextStyler
                  selectedStyle={textStyles.heading2}
                  onStyleChange={(styleObj) => handleTextStyleChange("heading2", styleObj)}
                  onClose={() => setShowTextStyler(null)}
                />
              )}

              {/* Hero Image Upload */}
              <label htmlFor="heroImg" className="block text-sm font-medium text-gray-700">Hero Img Upload</label>
              <div className="relative flex items-center">
                <input 
                  type="file"
                  id="heroImg"
                  onChange={handleHeroImgChange}
                  className="w-full border border-gray-300 rounded px-3 py-2 pr-24 focus:outline-none focus:ring-2 focus:ring-blue-300"
                />
                <div className="absolute right-2 top-1/2 -translate-y-1/2 flex space-x-2">
                  <input type="file" style={{ display: "none" }} id="heroFileInput" />
                  <label
                    htmlFor="heroFileInput"
                    className="w-6 h-6 flex items-center justify-center rounded bg-blue-500 text-white cursor-pointer"
                    style={{ fontSize: "1.25rem" }}
                  >
                    📁
                  </label>
                </div>
              </div>

              {/* Button field */}
              <div className="relative flex items-center space-x-2">
                <input
                  type="text"
                  placeholder="Button"
                  value={buttonText}
                  onChange={(e) => setButtonText(e.target.value)}
                  style={{
                    color: selectedColors.button,
                    fontFamily: selectedFonts.button,
                    ...textStyles.button,
                  }}
                  className="w-1/2 border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-300"
                />
                <input
                  type="text"
                  placeholder="Button URL"
                  value={buttonUrl}
                  onChange={(e) => setButtonUrl(e.target.value)}
                  className="w-1/2 border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-300"
                />
                <div className="flex space-x-2">
                  <button
                    type="button"
                    className="w-6 h-6 rounded-full border border-gray-300"
                    style={{ backgroundColor: selectedColors.button }}
                    onClick={() => setShowColorPicker("button")}
                  />
                  <button
                    type="button"
                    className="w-6 h-6 flex items-center justify-center font-bold text-gray-700 bg-gray-100 rounded"
                    onClick={() => setShowFontSelector("button")}
                  >
                    A
                  </button>
                  <button
                    type="button"
                    className="w-8 h-6 flex items-center justify-center font-bold text-gray-700 bg-gray-100 rounded"
                    onClick={() => setShowTextStyler("button")}
                  >
                    Aa
                  </button>
                </div>
              </div>
              {showColorPicker === "button" && (
                <ColorPicker
                  selectedColor={selectedColors.button}
                  onColorChange={(color) => handleColorChange("button", color)}
                  onClose={() => setShowColorPicker(null)}
                />
              )}
              {showFontSelector === "button" && (
                <FontSelector
                  selectedFont={selectedFonts.button}
                  onFontChange={(font) => handleFontChange("button", font)}
                  onClose={() => setShowFontSelector(null)}
                />
              )}
              {showTextStyler === "button" && (
                <TextStyler
                  selectedStyle={textStyles.button}
                  onStyleChange={(styleObj) => handleTextStyleChange("button", styleObj)}
                  onClose={() => setShowTextStyler(null)}
                />
              )}
            </form>
          </div>
        </div>
      </div>
    </SidebarLayout>
  );
}