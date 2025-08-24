import React, { useState } from "react";
import { FaEdit, FaTrashAlt, FaPlus } from "react-icons/fa";
import SidebarLayout from "./Sidebar";
import ColorPicker from "./ColorPicker";
import FontSelector from "./FontSelector";
import TextStyler from "./TextStyler";
import { getApiEndpoint } from "./APIConnect";

const SingalSliderSection = () => {
  const [bookNowBgColor, setBookNowBgColor] = useState("#FBF2E0");
  const [bookNowBorderColor, setBookNowBorderColor] = useState("#FBF2E0");
  const [PrevButtonBgColor, setPrevButtonBgColor] = useState("#FBF2E0");
  const [NextButtonBgColor, setNextButtonBgColor] = useState("#FBF2E0");
  const [bgImagePreview, setBgImagePreview] = useState("");
  const [bgImageName, setBgImageName] = useState("No file chosen");

  // Prev/Next icon states
  const [prevIcon, setPrevIcon] = useState("");
  const [prevIconName, setPrevIconName] = useState("No file chosen");
  const [nextIcon, setNextIcon] = useState("");
  const [nextIconName, setNextIconName] = useState("No file chosen");

  // Heading style states
  const [heading, setHeading] = useState("HAIR SALON, MASSAGES, BEAUTY SALON");
  const [headingColor, setHeadingColor] = useState("#000000");
  const [headingFont, setHeadingFont] = useState("inherit");
  const [headingStyle, setHeadingStyle] = useState({});
  const [showHeadingColor, setShowHeadingColor] = useState(false);
  const [showHeadingFont, setShowHeadingFont] = useState(false);
  const [showHeadingStyle, setShowHeadingStyle] = useState(false);

  // Book Now style states
  const [bookNowText, setBookNowText] = useState("Book Now");
  const [bookNowUrl, setBookNowUrl] = useState("/Book");
  const [bookNowColor, setBookNowColor] = useState("#000000");
  const [bookNowFont, setBookNowFont] = useState("inherit");
  const [bookNowStyle, setBookNowStyle] = useState({});
  const [showBookNowColor, setShowBookNowColor] = useState(false);
  const [showBookNowFont, setShowBookNowFont] = useState(false);
  const [showBookNowStyle, setShowBookNowStyle] = useState(false);

  // Add new states to store actual File objects
  const [bgImageFile, setBgImageFile] = useState(null);
  const [prevIconFile, setPrevIconFile] = useState(null);
  const [nextIconFile, setNextIconFile] = useState(null);

  // BG images array state
  const [bgImages, setBgImages] = useState([{ file: null, preview: "", name: "No file chosen" }]);

  // Handle BG image upload
  const handleBgImageChange = (e, idx) => {
    const file = e.target.files[0];
    if (file) {
      const newBgImages = [...bgImages];
      newBgImages[idx] = {
        file,
        preview: URL.createObjectURL(file),
        name: file.name,
      };
      setBgImages(newBgImages);
    }
  };

  // Handle Prev icon upload
  const handlePrevIconChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPrevIconName(file.name);
      setPrevIcon(URL.createObjectURL(file));
      setPrevIconFile(file);
    }
  };

  // Handle Next icon upload
  const handleNextIconChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setNextIconName(file.name);
      setNextIcon(URL.createObjectURL(file));
      setNextIconFile(file);
    }
  };

  // Remove icons
  const removePrevIcon = () => {
    setPrevIcon("");
    setPrevIconName("No file chosen");
  };
  const removeNextIcon = () => {
    setNextIcon("");
    setNextIconName("No file chosen");
  };

  // Add new BG image input
  const addBgImageInput = () => {
    setBgImages([...bgImages, { file: null, preview: "", name: "No file chosen" }]);
  };

  // Remove BG image input
  const removeBgImageInput = (idx) => {
    const newBgImages = bgImages.filter((_, i) => i !== idx);
    setBgImages(newBgImages);
  };

  // 🟢 Add this function inside your component:
  const handleSave = async () => {
    const formData = new FormData();

    // Heading
    formData.append("heading", JSON.stringify({
      text: heading,
      color: headingColor,
      font: headingFont,
      style: headingStyle
    }));

    // Book Now
    formData.append("bookNow", JSON.stringify({
      text: bookNowText,
      url: bookNowUrl,
      color: bookNowColor,
      font: bookNowFont,
      style: bookNowStyle,
      bgColor: bookNowBgColor,
      borderColor: bookNowBorderColor
    }));

    // Button BG Colors
    formData.append("prevButtonBgColor", PrevButtonBgColor);
    formData.append("nextButtonBgColor", NextButtonBgColor);

    // Images
    if (prevIconFile) formData.append("prevIcon", prevIconFile);
    if (nextIconFile) formData.append("nextIcon", nextIconFile);
    if (bgImageFile) formData.append("bgImage", bgImageFile);

    // Append all BG images to formData
    bgImages.forEach(img => {
      formData.append("bgImage", img.file);
    });

    try {
      const res = await fetch(getApiEndpoint('slider'), {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      if (data.success) {
        alert("Slider section saved!");
      } else {
        alert(data.message || "Failed to save.");
      }
    } catch (err) {
      alert("Error saving slider section.");
    }
  };

  return (
    <SidebarLayout>
      <div className="bg-slate-100 min-h-screen p-4 sm:p-8 flex items-center justify-center font-sans">
        {/* The main component card */}
        <div className="bg-white p-6 rounded-xl w-full max-w-3xl shadow-xl">
          {/* Component Header */}
          <header className="flex justify-between items-center pb-4 mb-6">
            <h1 className="text-2xl font-bold text-blue-700">
              Singal Slider Section
            </h1>
            <button
              className="bg-blue-600 text-white font-semibold py-2 px-8 rounded-lg hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
              onClick={handleSave}
              type="button"
            >
              Save
            </button>
          </header>

          {/* Form Body */}
          <form className="space-y-4">
            {/* Heading Section */}
            <div>
              <label className="text-sm font-bold text-gray-700 mb-1 block">
                Heading
              </label>
              <div className="flex items-center gap-3">
                <input
                  type="text"
                  value={heading}
                  onChange={(e) => setHeading(e.target.value)}
                  style={{
                    color: headingColor,
                    fontFamily: headingFont,
                    ...headingStyle,
                  }}
                  className="flex-grow p-2.5 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 h-11"
                />
                <div className="flex items-center gap-3 p-2 border border-gray-300 rounded-md h-11">
                  {/* Color Picker Button */}
                  <button
                    type="button"
                    className="w-6 h-6 rounded-full border border-gray-300"
                    style={{ backgroundColor: headingColor }}
                    title="Color"
                    onClick={() => setShowHeadingColor(true)}
                  />
                  {/* Font Selector Button */}
                  <button
                    type="button"
                    className="text-blue-500 text-lg font-bold bg-gray-100 w-6 h-6 rounded flex items-center justify-center"
                    title="Font"
                    onClick={() => setShowHeadingFont(true)}
                  >
                    A
                  </button>
                  {/* Text Styler Button */}
                  <button
                    type="button"
                    className="text-black text-lg font-bold underline bg-gray-100 w-6 h-6 rounded flex items-center justify-center"
                    title="Style"
                    onClick={() => setShowHeadingStyle(true)}
                  >
                    Aa
                  </button>
                </div>
                {/* Modals */}
                {showHeadingColor && (
                  <ColorPicker
                    selectedColor={headingColor}
                    onColorChange={(c) => {
                      setHeadingColor(c);
                      setShowHeadingColor(false);
                    }}
                    onClose={() => setShowHeadingColor(false)}
                  />
                )}
                {showHeadingFont && (
                  <FontSelector
                    selectedFont={headingFont}
                    onFontChange={(f) => {
                      setHeadingFont(f);
                      setShowHeadingFont(false);
                    }}
                    onClose={() => setShowHeadingFont(false)}
                  />
                )}
                {showHeadingStyle && (
                  <TextStyler
                    selectedStyle={headingStyle}
                    onStyleChange={(s) => {
                      setHeadingStyle(s);
                      setShowHeadingStyle(false);
                    }}
                    onClose={() => setShowHeadingStyle(false)}
                  />
                )}
              </div>
            </div>
            {/* Book Now Button Section */}
            <div>
              <label className="text-sm  text-gray-700 mb-1 block">
                Book Now Button
              </label>
              <div className="flex items-center gap-3">
                <div className="flex-grow flex items-center gap-3">
                  <input
                    type="text"
                    value={bookNowText}
                    onChange={(e) => setBookNowText(e.target.value)}
                    style={{
                      color: bookNowColor,
                      fontFamily: bookNowFont,
                      ...bookNowStyle,
                    }}
                    className="w-1/2 p-2.5 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 h-11"
                  />
                  <input
                    type="text"
                    value={bookNowUrl}
                    onChange={(e) => setBookNowUrl(e.target.value)}
                    className="w-1/2 p-2.5 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 h-11"
                  />
                </div>
                <div className="flex items-center gap-3 p-2 border border-gray-300 rounded-md h-11">
                  {/* Color Picker Button */}
                  <button
                    type="button"
                    className="w-6 h-6 rounded-full border border-gray-300"
                    style={{ backgroundColor: bookNowColor }}
                    title="Color"
                    onClick={() => setShowBookNowColor(true)}
                  />
                  {/* Font Selector Button */}
                  <button
                    type="button"
                    className="text-blue-500 text-lg font-bold bg-gray-100 w-6 h-6 rounded flex items-center justify-center"
                    title="Font"
                    onClick={() => setShowBookNowFont(true)}
                  >
                    A
                  </button>
                  {/* Text Styler Button */}
                  <button
                    type="button"
                    className="text-black text-lg font-bold underline bg-gray-100 w-6 h-6 rounded flex items-center justify-center"
                    title="Style"
                    onClick={() => setShowBookNowStyle(true)}
                  >
                    Aa
                  </button>
                </div>
                {/* Modals */}
                {showBookNowColor && (
                  <ColorPicker
                    selectedColor={bookNowColor}
                    onColorChange={(c) => {
                      setBookNowColor(c);
                      setShowBookNowColor(false);
                    }}
                    onClose={() => setShowBookNowColor(false)}
                  />
                )}
                {showBookNowFont && (
                  <FontSelector
                    selectedFont={bookNowFont}
                    onFontChange={(f) => {
                      setBookNowFont(f);
                      setShowBookNowFont(false);
                    }}
                    onClose={() => setShowBookNowFont(false)}
                  />
                )}
                {showBookNowStyle && (
                  <TextStyler
                    selectedStyle={bookNowStyle}
                    onStyleChange={(s) => {
                      setBookNowStyle(s);
                      setShowBookNowStyle(false);
                    }}
                    onClose={() => setShowBookNowStyle(false)}
                  />
                )}
              </div>
            </div>
            {/* Button Colors Section */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Book Now Button BG Color */}
              <div>
                <label className="text-sm text-gray-700 mb-1 block">
                  Book Now Button BG Color
                </label>
                <div className="flex items-center border border-gray-300 rounded-md p-1 h-11 bg-white">
                  <label className="w-8 h-8 rounded-full border border-gray-200 cursor-pointer relative overflow-hidden">
                    <input
                      type="color"
                      value={bookNowBgColor}
                      onChange={(e) => setBookNowBgColor(e.target.value)}
                      className="absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer"
                    />
                    <div
                      className="w-full h-full"
                      style={{ backgroundColor: bookNowBgColor }}
                    />
                  </label>
                  <input
                    type="text"
                    value={bookNowBgColor}
                    readOnly
                    className="ml-2 w-full bg-transparent border-none focus:ring-0 text-gray-700"
                  />
                </div>
              </div>

              {/* Book Now Button Border Color */}
              <div>
                <label className="text-sm text-gray-700 mb-1 block">
                  Book Now Button Border Color
                </label>
                <div className="flex items-center border border-gray-300 rounded-md p-1 h-11 bg-white">
                  <label className="w-8 h-8 rounded-full border border-gray-200 cursor-pointer relative overflow-hidden">
                    <input
                      type="color"
                      value={bookNowBorderColor}
                      onChange={(e) => setBookNowBorderColor(e.target.value)}
                      className="absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer"
                    />
                    <div
                      className="w-full h-full"
                      style={{ backgroundColor: bookNowBorderColor }}
                    />
                  </label>
                  <input
                    type="text"
                    value={bookNowBorderColor}
                    readOnly
                    className="ml-2 w-full bg-transparent border-none focus:ring-0 text-gray-700"
                  />
                </div>
              </div>
            </div>
            {/* Prev Icon Section */}
            <div>
              <label className="text-sm font-bold text-gray-700 mb-1 block">
                Prev Icon
              </label>
              <div className="flex items-center gap-3">
                {/* Image Preview */}
                <img
                  src={prevIcon || ""}
                  alt="preview"
                  className="w-20 h-14 object-cover rounded-md border border-gray-200"
                  style={{ width: 80, height: 56 }}
                />

                <div className="flex-grow relative">
                  <div className="flex items-center p-2 border border-gray-300 rounded-md bg-white h-14 pr-10">
                    <label
                      htmlFor="prev-icon-file"
                      className="cursor-pointer bg-gray-100 text-gray-800 px-4 py-1.5 rounded-md border border-gray-300 text-sm hover:bg-gray-200"
                    >
                      Choose File
                    </label>
                    <input
                      type="file"
                      id="prev-icon-file"
                      className="hidden"
                      accept="image/*"
                      onChange={handlePrevIconChange}
                    />
                    <span className="ml-4 text-gray-500 text-sm truncate">
                      {prevIconName}
                    </span>
                  </div>

                  <button
                    className="absolute top-1/2 -translate-y-1/2 right-2 text-gray-500 hover:text-red-500"
                    aria-label="Delete Prev Icon"
                    type="button"
                    onClick={removePrevIcon}
                  >
                    <FaTrashAlt size={18} />
                  </button>
                </div>
              </div>
            </div>
            {/* Next Icon Section */}
            <div>
              <label className="text-sm text-gray-700 mb-1 block">
                Next Icon
              </label>
              <div className="flex items-center gap-3">
                {/* Image Preview */}
                <img
                  src={nextIcon || ""}
                  alt="preview"
                  className="w-20 h-14 object-cover rounded-md border border-gray-200"
                  style={{ width: 80, height: 56 }}
                />

                {/* Input Container with Delete Button Inside */}
                <div className="flex-grow relative">
                  <div className="flex items-center p-2 border border-gray-300 rounded-md bg-white h-14 pr-10">
                    <label
                      htmlFor="next-icon-file"
                      className="cursor-pointer bg-gray-100 text-gray-800 px-4 py-1.5 rounded-md border border-gray-300 text-sm hover:bg-gray-200"
                    >
                      Choose File
                    </label>
                    <input
                      type="file"
                      id="next-icon-file"
                      className="hidden"
                      accept="image/*"
                      onChange={handleNextIconChange}
                    />
                    <span className="ml-4 text-gray-500 text-sm truncate">
                      {nextIconName}
                    </span>
                  </div>

                  {/* Delete Button Positioned Inside Input Container */}
                  <button
                    className="absolute top-1/2 -translate-y-1/2 right-2 text-gray-500 hover:text-red-500"
                    aria-label="Delete Next Icon"
                    type="button"
                    onClick={removeNextIcon}
                  >
                    <FaTrashAlt size={18} />
                  </button>
                </div>
              </div>
            </div>
            {/* Prev/Next Button Colors Section */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="text-sm text-gray-700 mb-1 block">
                  Prev Button BG Color
                </label>
                <div className="flex items-center border border-gray-300 rounded-md p-1 h-11 bg-white">
                  <label className="w-8 h-8 rounded-full border border-gray-200 cursor-pointer relative overflow-hidden">
                    <input
                      type="color"
                      value={PrevButtonBgColor}
                      onChange={(e) => setPrevButtonBgColor(e.target.value)}
                      className="absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer"
                    />
                    <div
                      className="w-full h-full"
                      style={{ backgroundColor: PrevButtonBgColor }}
                    />
                  </label>
                  <input
                    type="text"
                    value={PrevButtonBgColor}
                    readOnly
                    className="ml-2 w-full bg-transparent border-none focus:ring-0 text-gray-700"
                  />
                </div>
              </div>

              <div>
                <label className="text-sm text-gray-700 mb-1 block">
                  Next Button BG Color
                </label>
                <div className="flex items-center border border-gray-300 rounded-md p-1 h-11 bg-white">
                  <label className="w-8 h-8 rounded-full border border-gray-200 cursor-pointer relative overflow-hidden">
                    <input
                      type="color"
                      value={NextButtonBgColor}
                      onChange={(e) => setNextButtonBgColor(e.target.value)}
                      className="absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer"
                    />
                    <div
                      className="w-full h-full"
                      style={{ backgroundColor: NextButtonBgColor }}
                    />
                  </label>
                  <input
                    type="text"
                    value={NextButtonBgColor}
                    readOnly
                    className="ml-2 w-full bg-transparent border-none focus:ring-0 text-gray-700"
                  />
                </div>
              </div>
            </div>
            {/* Container Fluid BG Images Section */}
            <div>
              <label className="text-sm font-bold text-gray-700 mb-1 block">
                Container Fluid BG Images
              </label>
              {bgImages.map((img, idx) => (
                <div key={idx} className="flex items-center gap-3 mb-2">
                  <img
                    src={img.preview || ""}
                    alt="background preview"
                    className="w-32 h-20 object-cover rounded-md border border-gray-200"
                    style={{ width: 128, height: 80 }}
                  />
                  <div className="flex-grow flex items-center p-2 border border-gray-300 rounded-md bg-white h-20">
                    <label
                      htmlFor={`bg-image-file-${idx}`}
                      className="cursor-pointer bg-gray-100 text-gray-800 px-4 py-1.5 rounded-md border border-gray-300 text-sm hover:bg-gray-200"
                    >
                      Choose File
                    </label>
                    <input
                      type="file"
                      id={`bg-image-file-${idx}`}
                      accept="image/*"
                      className="hidden"
                      onChange={(e) => handleBgImageChange(e, idx)}
                    />
                    <span className="ml-4 text-gray-500 text-sm truncate">
                      {img.name}
                    </span>
                  </div>
                  {bgImages.length > 1 && (
                    <button
                      className="flex items-center gap-2 bg-gray-100 text-red-600 font-semibold py-2 px-4 rounded-lg hover:bg-red-100 border border-red-300 h-14"
                      type="button"
                      onClick={() => removeBgImageInput(idx)}
                    >
                      Remove
                    </button>
                  )}
                </div>
              ))}
              <button
                className="flex items-center gap-2 bg-gray-100 text-blue-600 font-semibold py-2 px-4 rounded-lg hover:bg-blue-100 border border-blue-300 h-14 mt-2"
                type="button"
                onClick={addBgImageInput}
              >
                <FaPlus />
                Add BG Image
              </button>
            </div>
            {/* Sliders List */}
            <div className="space-y-1">
              {/* {listItems.map((item) => (
              <div
                key={item.id}
                className="flex items-center gap-3 p-2 border border-gray-300 rounded-md bg-white"
              >
                <img
                  src=''
                  alt="thumbnail"
                  className="w-10 h-10 object-cover rounded-md"
                />
                <input
                  type="text"
                  defaultValue={item.title}
                  className="flex-grow p-1 text-gray-800 bg-transparent border-none focus:ring-0"
                />
                <button
                  className="text-blue-500 hover:text-blue-700 p-2"
                  aria-label="Edit Item"
                >
                  <FaEdit size={16} />
                </button>
                <button
                  className="text-gray-500 hover:text-red-500 p-2"
                  aria-label="Delete Item"
                >
                  <FaTrashAlt size={16} />
                </button>
              </div>
            ))} */}
            </div>
          </form>
        </div>
      </div>
    </SidebarLayout>
  );
};

export default SingalSliderSection;
