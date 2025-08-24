import React, { useState } from 'react';
import SidebarLayout from './Sidebar';
import ColorPicker from './ColorPicker';
import FontSelector from './FontSelector';
import TextStyler from './TextStyler';
import { getApiEndpoint } from './APIConnect';

const InputWithIcon = ({
  label, value, onValueChange, fontColor, onColorChange, font, onFontChange, style, onStyleChange
}) => {
  const [showColor, setShowColor] = useState(false);
  const [showFont, setShowFont] = useState(false);
  const [showStyle, setShowStyle] = useState(false);

  return (
    <div className="mb-4">
      <label className="block font-semibold mb-1">{label}</label>
      <div className="flex items-center border rounded px-2 py-1 bg-white">
        <input
          className="flex-1 outline-none bg-white"
          type="text"
          value={value}
          style={{ color: fontColor, fontFamily: font, ...style }}
          onChange={e => onValueChange(e.target.value)} // <-- Make editable
        />
        {/* Color Picker Button */}
        <button
          className="w-8 h-8 rounded-full border border-gray-300 ml-2"
          style={{ backgroundColor: fontColor }}
          title="Color"
          type="button"
          onClick={() => setShowColor(true)}
        />
        {/* Font Selector Button */}
        <button
          className="text-blue-500 font-bold text-lg w-8 h-8 rounded flex items-center justify-center bg-gray-100 ml-2"
          title="Font"
          type="button"
          onClick={() => setShowFont(true)}
        >
          A
        </button>
        {/* Text Styler Button */}
        <button
          className="text-black font-bold text-lg w-8 h-8 rounded flex items-center justify-center underline bg-gray-100 ml-2"
          title="Style"
          type="button"
          onClick={() => setShowStyle(true)}
        >
          Aa
        </button>
        {/* Modals */}
        {showColor && (
          <ColorPicker
            selectedColor={fontColor}
            onColorChange={c => {
              onColorChange(c);
              setShowColor(false);
            }}
            onClose={() => setShowColor(false)}
          />
        )}
        {showFont && (
          <FontSelector
            selectedFont={font}
            onFontChange={f => {
              onFontChange(f);
              setShowFont(false);
            }}
            onClose={() => setShowFont(false)}
          />
        )}
        {showStyle && (
          <TextStyler
            selectedStyle={style}
            onStyleChange={s => {
              onStyleChange(s);
              setShowStyle(false);
            }}
            onClose={() => setShowStyle(false)}
          />
        )}
      </div>
    </div>
  );
};

const ColorInput = ({ label, color, code, onColorChange }) => {
  const [showColor, setShowColor] = useState(false);

  return (
    <div className="flex flex-col items-center">
      <label className="mb-2 font-semibold">{label}</label>
      <div className="flex items-center space-x-2">
        <button
          className="inline-block border rounded-full w-9 h-9"
          style={{ backgroundColor: color, borderColor: "#ddd" }}
          onClick={() => setShowColor(true)}
          title="Change color"
          type="button"
        />
        <input
          className="border rounded px-2 py-1 w-28 text-center"
          value={code}
          readOnly
        />
        {showColor && (
          <ColorPicker
            selectedColor={color}
            onColorChange={c => {
              onColorChange(c);
              setShowColor(false);
            }}
            onClose={() => setShowColor(false)}
          />
        )}
      </div>
    </div>
  );
};

export default function Dash() {
  // State for each font color, font, and style
  const [headingColor, setHeadingColor] = useState("#000000");
  const [subHeadingColor, setSubHeadingColor] = useState("#000000");
  const [titleColor, setTitleColor] = useState("#000000");

  const [headingFont, setHeadingFont] = useState("inherit");
  const [subHeadingFont, setSubHeadingFont] = useState("inherit");
  const [titleFont, setTitleFont] = useState("inherit");

  const [headingStyle, setHeadingStyle] = useState({});
  const [subHeadingStyle, setSubHeadingStyle] = useState({});
  const [titleStyle, setTitleStyle] = useState({});

  // Button color states
  const [buttonBgColor, setButtonBgColor] = useState("#422A3C");
  const [buttonColor, setButtonColor] = useState("#FBF2E0");
  const [buttonBorderColor, setButtonBorderColor] = useState("#FBF2E0");


  // Add this function inside your Dash component:
  const handleSave = async () => {
    const payload = {
      headingColor,
      headingFont,
      headingStyle,
      subHeadingColor,
      subHeadingFont,
      subHeadingStyle,
      titleColor,
      titleFont,
      titleStyle,
      buttonBgColor,
      buttonColor,
      buttonBorderColor,
    };

    try {
      const res = await fetch(getApiEndpoint('header'), {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (data.success) {
        alert("Header styles saved!");
      } else {
        alert(data.message || "Failed to save.");
      }
    } catch (err) {
      alert("Error saving header styles.");
    }
  };

  return (
    <SidebarLayout>
      <div className="max-w-2xl mx-auto mt-8 bg-white rounded-lg shadow p-8 relative">
        <div className="flex justify-between items-start mb-6">
          <h1 className="text-3xl font-bold text-blue-700">
            Dashbord Global Styles
          </h1>
          <button
            className="bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-lg px-8 py-2 text-lg shadow"
            onClick={handleSave}
            type="button"
          >
            Save
          </button>
        </div>
        <InputWithIcon
          label="Heading Font Family"
          value={headingFont}
          onValueChange={setHeadingFont}
          fontColor={headingColor}
          onColorChange={setHeadingColor}
          font={headingFont}
          onFontChange={setHeadingFont}
          style={headingStyle}
          onStyleChange={setHeadingStyle}
        />
        <InputWithIcon
          label="Sub Heading Font Family"
          value={subHeadingFont}
          onValueChange={setSubHeadingFont}
          fontColor={subHeadingColor}
          onColorChange={setSubHeadingColor}
          font={subHeadingFont}
          onFontChange={setSubHeadingFont}
          style={subHeadingStyle}
          onStyleChange={setSubHeadingStyle}
        />
        <InputWithIcon
          label="Title"
          value={titleFont}
          onValueChange={setTitleFont}
          fontColor={titleColor}
          onColorChange={setTitleColor}
          font={titleFont}
          onFontChange={setTitleFont}
          style={titleStyle}
          onStyleChange={setTitleStyle}
        />

        <div className="flex space-x-8 mt-8">
          <ColorInput
            label="Button Bg Color"
            color={buttonBgColor}
            code={buttonBgColor}
            onColorChange={setButtonBgColor}
          />
          <ColorInput
            label="Button Color"
            color={buttonColor}
            code={buttonColor}
            onColorChange={setButtonColor}
          />
          <ColorInput
            label="Button Border Color"
            color={buttonBorderColor}
            code={buttonBorderColor}
            onColorChange={setButtonBorderColor}
          />
        </div>

        {/* Example button to preview the color changes */}
        <div className="mt-8 flex justify-center">
          <button
            className="px-8 py-3 rounded-lg font-semibold text-lg border"
            style={{
              backgroundColor: buttonBgColor,
              color: buttonColor,
              borderColor: buttonBorderColor,
              borderWidth: 2,
              borderStyle: "solid",
            }}
          >
            Button Preview
          </button>
        </div>

        
      </div>
    </SidebarLayout>
  );
}