import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import SidebarLayout from "../Sidebar";
import ColorPicker from "../ColorPicker";
import FontSelector from "../FontSelector";
import TextStyler from "../TextStyler";
import { getApiEndpoint } from "../APIConnect";

const ServicesSection = () => {
  const navigate = useNavigate();

  const [topTitle, setTopTitle] = useState("");
  const [heading, setHeading] = useState("");
  const [subHeading, setSubHeading] = useState("");
  const [cardData, setCardData] = useState({
    reviewNumber: "",
    totalReviews: "",
    cardHeading: "",
    cardHeadingLink: "",
    location: "",
    bookButton: "",
    bookUrl: "",
  });
  const [cardImages, setCardImages] = useState({
    main: null,
    review: null,
    location: null,
  });

  const handleSave = async () => {
    const formData = new FormData();

    // Add text fields (with styling if needed)
    formData.append("topTitle", JSON.stringify({ text: topTitle }));
    formData.append("heading", JSON.stringify({ text: heading }));
    formData.append("subHeading", JSON.stringify({ text: subHeading }));

    // Add card data
    const cards = [
      {
        mainImage: cardImages.main,
        reviewIcon: cardImages.review,
        locationIcon: cardImages.location,
        reviewNumber: cardData.reviewNumber,
        totalReviews: cardData.totalReviews,
        heading: cardData.cardHeading,
        headingLink: cardData.cardHeadingLink,
        location: cardData.location,
        bookButton: cardData.bookButton,
        bookUrl: cardData.bookUrl,
      },
    ];
    formData.append("cards", JSON.stringify(cards));

    // Attach images (if you want to upload files)
    if (cardImages.main instanceof File)
      formData.append("mainImage", cardImages.main);
    if (cardImages.review instanceof File)
      formData.append("reviewIcon", cardImages.review);
    if (cardImages.location instanceof File)
      formData.append("locationIcon", cardImages.location);

    try {
      const res = await fetch(getApiEndpoint('service'), {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      if (data.success) {
        alert("Services section saved!");
      } else {
        alert(data.message || "Failed to save.");
      }
    } catch (err) {
      alert("Error saving services section.");
    }
  };

  return (
    <SidebarLayout>
      <div className="p-6 space-y-4 bg-white min-h-screen max-w-4xl mx-auto">
        <div className="flex justify-between items-center">
          <h2 className="text-3xl font-bold text-blue-600">Services Section</h2>
          <div className="flex gap-2">
            <button
              className="bg-blue-600 text-white px-4 py-1 rounded"
              onClick={() => navigate("/cards")}
            >
              All Card View
            </button>
            <button
              className="bg-blue-600 text-white px-4 py-1 rounded"
              onClick={handleSave}
            >
              Save
            </button>
          </div>
        </div>

        <div className="space-y-4">
          <InputWithIcons
            label="Top Title"
            placeholder="HAIR SALON, MASSAGES, BEAUTY SALON"
            value={topTitle}
            onChange={(val) => setTopTitle(val)}
          />
          <InputWithIcons
            label="Heading"
            placeholder="Find a service close to you"
            value={heading}
            onChange={(val) => setHeading(val)}
          />
          <InputWithIcons
            label="Sub Heading"
            placeholder="Find a service close to you"
            value={subHeading}
            onChange={(val) => setSubHeading(val)}
          />
          <CardCreate
            cardImages={cardImages}
            setCardImages={setCardImages}
            setCardData={setCardData}
          />
          <div className="grid grid-cols-2 gap-4">
            <InputWithIcons
              label="Review Number"
              placeholder="4.4"
              value={cardData.reviewNumber}
              onChange={(val) =>
                setCardData((prev) => ({ ...prev, reviewNumber: val }))
              }
            />
            <InputWithIcons
              label="Total Reviews"
              placeholder="104 Reviews"
              value={cardData.totalReviews}
              onChange={(val) =>
                setCardData((prev) => ({ ...prev, totalReviews: val }))
              }
            />
          </div>
          <InputWithIcons
            label="Heading"
            placeholder="Find a service close to you"
            showLinkIcon
            value={cardData.cardHeading}
            onChange={(val) =>
              setCardData((prev) => ({ ...prev, cardHeading: val }))
            }
          />
          <InputWithIcons
            label="Location"
            placeholder="Find a service close to you"
            value={cardData.location}
            onChange={(val) =>
              setCardData((prev) => ({ ...prev, location: val }))
            }
          />
          <div className="grid grid-cols-2 gap-4">
            <InputWithIcons
              label="Book Button"
              placeholder="Book"
              value={cardData.bookButton}
              onChange={(val) =>
                setCardData((prev) => ({ ...prev, bookButton: val }))
              }
            />
            <InputWithIcons
              label="Book URL"
              placeholder="/Book"
              value={cardData.bookUrl}
              onChange={(val) =>
                setCardData((prev) => ({ ...prev, bookUrl: val }))
              }
            />
          </div>
        </div>
      </div>
    </SidebarLayout>
  );
};

// 🧩 Updated Input with color, font, and style buttons (not images)
const InputWithIcons = ({
  label,
  placeholder,
  showLinkIcon = false,
  value,
  onChange,
}) => {
  const [showColorPicker, setShowColorPicker] = useState(false);
  const [showFontSelector, setShowFontSelector] = useState(false);
  const [showTextStyler, setShowTextStyler] = useState(false);

  const [inputColor, setInputColor] = useState("#000000");
  const [inputFont, setInputFont] = useState("inherit");
  const [inputStyle, setInputStyle] = useState({});

  return (
    <div>
      <label className="block font-medium text-sm mb-1">{label}</label>
      <div className="flex items-center border border-black border-2 rounded px-2 py-1">
        <input
          type="text"
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          style={{
            color: inputColor,
            fontFamily: inputFont,
            ...inputStyle,
          }}
          className="flex-1 outline-none text-sm"
        />

        <div className="flex items-center gap-3 ml-2">
          {showLinkIcon && (
            <img
              src="./public/link.png"
              alt="link"
              className="w-4 h-4 object-contain"
            />
          )}
          {/* Color Picker Button */}
          <button
            type="button"
            className="w-5 h-5 rounded-full border border-gray-300"
            style={{ backgroundColor: inputColor }}
            title="Color"
            onClick={() => setShowColorPicker(true)}
          />
          {/* Font Selector Button */}
          <button
            type="button"
            className="text-blue-500 text-base font-bold bg-gray-100 w-5 h-5 rounded flex items-center justify-center"
            title="Font"
            onClick={() => setShowFontSelector(true)}
          >
            A
          </button>
          {/* Text Styler Button */}
          <button
            type="button"
            className="text-black text-base font-bold underline bg-gray-100 w-5 h-5 rounded flex items-center justify-center"
            title="Style"
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

// 🧩 Card image upload
const CardCreate = ({ cardImages, setCardImages, setCardData }) => {
  const [fileNames, setFileNames] = useState({
    main: "No file chosen",
    review: "No file chosen",
    location: "No file chosen",
  });

  const handleImageChange = (e, key) => {
    const file = e.target.files[0];
    if (file) {
      setCardImages((prev) => ({
        ...prev,
        [key]: URL.createObjectURL(file),
      }));
      setFileNames((prev) => ({
        ...prev,
        [key]: file.name,
      }));
    }
  };

  const renderUpload = (label, key) => (
    <div className="flex items-center border border-black border-2 rounded p-2 mb-2">
      {/* Image Preview as left icon */}
      <label className="w-10 h-10 rounded overflow-hidden border mr-2 cursor-pointer flex-shrink-0 flex items-center justify-center bg-gray-100">
        <input
          type="file"
          accept="image/*"
          className="hidden"
          onChange={(e) => handleImageChange(e, key)}
        />
        {cardImages[key] ? (
          <img
            src={cardImages[key]}
            alt="preview"
            className="w-full h-full object-cover"
          />
        ) : (
          <span className="text-gray-400">Upload</span>
        )}
      </label>
      <div className="flex-1">
        <p className="text-sm font-medium">{label}</p>
        <p className="text-xs text-gray-500">{fileNames[key]}</p>
      </div>
      <button
        type="button"
        className="text-red-500 text-sm font-semibold"
        onClick={() => {
          setCardImages((prev) => ({ ...prev, [key]: null }));
          setFileNames((prev) => ({ ...prev, [key]: "No file chosen" }));
        }}
      >
        Remove
      </button>
    </div>
  );

  return (
    <div className="grid grid-cols-3 gap-4">
      {renderUpload("Main Image", "main")}
      {renderUpload("Review Image", "review")}
      {renderUpload("Location Image", "location")}
    </div>
  );
};

export default ServicesSection;