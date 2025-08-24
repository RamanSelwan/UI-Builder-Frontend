import { useState } from "react"
import { Upload, Trash2 } from "lucide-react"
import SidebarLayout from "./Sidebar"
import ColorPicker from "./ColorPicker"
import FontSelector from "./FontSelector"
import TextStyler from "./TextStyler"
import { getApiEndpoint } from "./APIConnect";



export default function CallToAction() {
  // Color/font/style states for Heading
  const [heading, setHeading] = useState("HAIR SALON, MASSAGES, BEAUTY SALON")
  const [headingColor, setHeadingColor] = useState("#000000")
  const [headingFont, setHeadingFont] = useState("inherit")
  const [headingStyle, setHeadingStyle] = useState({})
  const [showHeadingColor, setShowHeadingColor] = useState(false)
  const [showHeadingFont, setShowHeadingFont] = useState(false)
  const [showHeadingStyle, setShowHeadingStyle] = useState(false)

  // Color/font/style states for Sub Heading
  const [subHeading, setSubHeading] = useState("HAIR SALON, MASSAGES, BEAUTY SALON")
  const [subHeadingColor, setSubHeadingColor] = useState("#000000")
  const [subHeadingFont, setSubHeadingFont] = useState("inherit")
  const [subHeadingStyle, setSubHeadingStyle] = useState({})
  const [showSubHeadingColor, setShowSubHeadingColor] = useState(false)
  const [showSubHeadingFont, setShowSubHeadingFont] = useState(false)
  const [showSubHeadingStyle, setShowSubHeadingStyle] = useState(false)

  // Color/font/style states for Placeholder Content
  const [placeholderContent, setPlaceholderContent] = useState("HAIR SALON, MASSAGES, BEAUTY SALON")
  const [placeholderColor, setPlaceholderColor] = useState("#000000")
  const [placeholderFont, setPlaceholderFont] = useState("inherit")
  const [placeholderStyle, setPlaceholderStyle] = useState({})
  const [showPlaceholderColor, setShowPlaceholderColor] = useState(false)
  const [showPlaceholderFont, setShowPlaceholderFont] = useState(false)
  const [showPlaceholderStyle, setShowPlaceholderStyle] = useState(false)

  // Color/font/style states for Subscribe Button
  const [subscribeBtn, setSubscribeBtn] = useState("Book Now")
  const [subscribeBtnColor, setSubscribeBtnColor] = useState("#000000")
  const [subscribeBtnFont, setSubscribeBtnFont] = useState("inherit")
  const [subscribeBtnStyle, setSubscribeBtnStyle] = useState({})
  const [showSubscribeBtnColor, setShowSubscribeBtnColor] = useState(false)
  const [showSubscribeBtnFont, setShowSubscribeBtnFont] = useState(false)
  const [showSubscribeBtnStyle, setShowSubscribeBtnStyle] = useState(false)

  // Subscribe BG Color
  const [subscribeBgColor, setSubscribeBgColor] = useState("#000000")

  // Box Shadow, Container BG, Container Fluid BG
  const [boxShadowColor, setBoxShadowColor] = useState("#000000")
  const [containerBgColor, setContainerBgColor] = useState("#FBF2E0")
  const [containerFluidBgColor, setContainerFluidBgColor] = useState("#FBF2E0")

  // Email Icon Upload
  const [emailIcon, setEmailIcon] = useState(null)
  const [emailIconUrl, setEmailIconUrl] = useState("")
  const handleEmailIconChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      setEmailIcon(file)
      setEmailIconUrl(URL.createObjectURL(file))
    }
  }
  const handleDeleteEmailIcon = () => {
    setEmailIcon(null)
    setEmailIconUrl("")
  }

  // Add this function inside your component:
  const handleSave = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("heading", heading);
    formData.append("headingColor", headingColor);
    formData.append("headingFont", headingFont);
    formData.append("headingStyle", JSON.stringify(headingStyle));
    formData.append("subHeading", subHeading);
    formData.append("subHeadingColor", subHeadingColor);
    formData.append("subHeadingFont", subHeadingFont);
    formData.append("subHeadingStyle", JSON.stringify(subHeadingStyle));
    formData.append("placeholderContent", placeholderContent);
    formData.append("placeholderColor", placeholderColor);
    formData.append("placeholderFont", placeholderFont);
    formData.append("placeholderStyle", JSON.stringify(placeholderStyle));
    formData.append("subscribeBtn", subscribeBtn);
    formData.append("subscribeBtnColor", subscribeBtnColor);
    formData.append("subscribeBtnFont", subscribeBtnFont);
    formData.append("subscribeBtnStyle", JSON.stringify(subscribeBtnStyle));
    formData.append("subscribeBgColor", subscribeBgColor);
    formData.append("boxShadowColor", boxShadowColor);
    formData.append("containerBgColor", containerBgColor);
    formData.append("containerFluidBgColor", containerFluidBgColor);
    if (emailIcon) {
      formData.append("emailIcon", emailIcon);
    }

    try {
      const res = await fetch ( getApiEndpoint('call_action'), {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      if (data.success) {
        alert("Call To Action section saved!");
      } else {
        alert(data.message || "Failed to save.");
      }
    } catch (err) {
      alert("Error saving Call To Action section.");
    }
  };

  return (
    <SidebarLayout>
      <div className="bg-white p-6 rounded-lg">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-blue-600">Call To Action Section</h1>
          <button
            className="bg-blue-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors"
            onClick={handleSave}
            type="button"
          >
            Save
          </button>
        </div>

        <div className="space-y-6">
          {/* Left Column Image */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Email Icon</label>
            <div className="flex items-center space-x-4">
              <div className="w-24 h-24 bg-gray-100 rounded-lg border-2 border-dashed border-gray-300 flex items-center justify-center overflow-hidden">
                {emailIconUrl ? (
                  <img src={emailIconUrl} alt="Email Icon" className="object-cover w-full h-full rounded-lg" />
                ) : (
                  <Upload className="w-6 h-6 text-gray-400" />
                )}
              </div>
              <div className="flex-1">
                <div className="flex items-center space-x-2">
                  <input
                    type="file"
                    accept="image/*"
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm"
                    placeholder="Choose File"
                    onChange={handleEmailIconChange}
                  />
                  <button
                    className="p-2 text-red-500 hover:bg-red-50 rounded-lg"
                    type="button"
                    onClick={handleDeleteEmailIcon}
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Color Settings Row */}
          <div className="grid grid-cols-3 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Box Shadow</label>
              <div className="flex items-center space-x-2">
                <input
                  type="color"
                  value={boxShadowColor}
                  onChange={e => setBoxShadowColor(e.target.value)}
                  className="w-8 h-8 rounded border"
                  title="Pick Box Shadow Color"
                />
                <input
                  type="text"
                  value={boxShadowColor}
                  onChange={e => setBoxShadowColor(e.target.value)}
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Container BG Color</label>
              <div className="flex items-center space-x-2">
                <input
                  type="color"
                  value={containerBgColor}
                  onChange={e => setContainerBgColor(e.target.value)}
                  className="w-8 h-8 rounded border"
                  title="Pick Container BG Color"
                />
                <input
                  type="text"
                  value={containerBgColor}
                  onChange={e => setContainerBgColor(e.target.value)}
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Container Fluid BG Color</label>
              <div className="flex items-center space-x-2">
                <input
                  type="color"
                  value={containerFluidBgColor}
                  onChange={e => setContainerFluidBgColor(e.target.value)}
                  className="w-8 h-8 rounded border"
                  title="Pick Container Fluid BG Color"
                />
                <input
                  type="text"
                  value={containerFluidBgColor}
                  onChange={e => setContainerFluidBgColor(e.target.value)}
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm"
                />
              </div>
            </div>
          </div>

          {/* Text Fields */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Heading</label>
            <div className="flex items-center space-x-2">
              <input
                type="text"
                value={heading}
                onChange={e => setHeading(e.target.value)}
                style={{ color: headingColor, fontFamily: headingFont, ...headingStyle }}
                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg"
              />
              <div className="flex items-center space-x-1">
                {/* Color Picker Button */}
                <button
                  className="w-8 h-8 rounded-full border border-gray-300"
                  style={{ backgroundColor: headingColor }}
                  title="Color"
                  type="button"
                  onClick={() => setShowHeadingColor(true)}
                />
                {/* Font Selector Button */}
                <button
                  className="text-blue-500 font-bold text-lg w-8 h-8 rounded flex items-center justify-center bg-gray-100"
                  title="Font"
                  type="button"
                  onClick={() => setShowHeadingFont(true)}
                >
                  A
                </button>
                {/* Text Styler Button */}
                <button
                  className="text-gray-700 font-bold text-lg w-8 h-8 rounded flex items-center justify-center underline bg-gray-100"
                  title="Style"
                  type="button"
                  onClick={() => setShowHeadingStyle(true)}
                >
                  Aa
                </button>
              </div>
              {/* Modals */}
              {showHeadingColor && (
                <ColorPicker
                  selectedColor={headingColor}
                  onColorChange={c => { setHeadingColor(c); setShowHeadingColor(false); }}
                  onClose={() => setShowHeadingColor(false)}
                />
              )}
              {showHeadingFont && (
                <FontSelector
                  selectedFont={headingFont}
                  onFontChange={f => { setHeadingFont(f); setShowHeadingFont(false); }}
                  onClose={() => setShowHeadingFont(false)}
                />
              )}
              {showHeadingStyle && (
                <TextStyler
                  selectedStyle={headingStyle}
                  onStyleChange={s => { setHeadingStyle(s); setShowHeadingStyle(false); }}
                  onClose={() => setShowHeadingStyle(false)}
                />
              )}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Sub Heading</label>
            <div className="flex items-center space-x-2">
              <input
                type="text"
                value={subHeading}
                onChange={e => setSubHeading(e.target.value)}
                style={{ color: subHeadingColor, fontFamily: subHeadingFont, ...subHeadingStyle }}
                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg"
              />
              <div className="flex items-center space-x-1">
                {/* Color Picker Button */}
                <button
                  className="w-8 h-8 rounded-full border border-gray-300"
                  style={{ backgroundColor: subHeadingColor }}
                  title="Color"
                  type="button"
                  onClick={() => setShowSubHeadingColor(true)}
                />
                {/* Font Selector Button */}
                <button
                  className="text-blue-500 font-bold text-lg w-8 h-8 rounded flex items-center justify-center bg-gray-100"
                  title="Font"
                  type="button"
                  onClick={() => setShowSubHeadingFont(true)}
                >
                  A
                </button>
                {/* Text Styler Button */}
                <button
                  className="text-gray-700 font-bold text-lg w-8 h-8 rounded flex items-center justify-center underline bg-gray-100"
                  title="Style"
                  type="button"
                  onClick={() => setShowSubHeadingStyle(true)}
                >
                  Aa
                </button>
              </div>
              {/* Modals */}
              {showSubHeadingColor && (
                <ColorPicker
                  selectedColor={subHeadingColor}
                  onColorChange={c => { setSubHeadingColor(c); setShowSubHeadingColor(false); }}
                  onClose={() => setShowSubHeadingColor(false)}
                />
              )}
              {showSubHeadingFont && (
                <FontSelector
                  selectedFont={subHeadingFont}
                  onFontChange={f => { setSubHeadingFont(f); setShowSubHeadingFont(false); }}
                  onClose={() => setShowSubHeadingFont(false)}
                />
              )}
              {showSubHeadingStyle && (
                <TextStyler
                  selectedStyle={subHeadingStyle}
                  onStyleChange={s => { setSubHeadingStyle(s); setShowSubHeadingStyle(false); }}
                  onClose={() => setShowSubHeadingStyle(false)}
                />
              )}
            </div>
          </div>

          {/* Placeholder Content */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Placeholder Content</label>
            <div className="flex items-center space-x-2">
              <input
                type="text"
                value={placeholderContent}
                onChange={e => setPlaceholderContent(e.target.value)}
                style={{ color: placeholderColor, fontFamily: placeholderFont, ...placeholderStyle }}
                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg"
              />
              <div className="flex items-center space-x-1">
                {/* Color Picker Button */}
                <button
                  className="w-8 h-8 rounded-full border border-gray-300"
                  style={{ backgroundColor: placeholderColor }}
                  title="Color"
                  type="button"
                  onClick={() => setShowPlaceholderColor(true)}
                />
                {/* Font Selector Button */}
                <button
                  className="text-blue-500 font-bold text-lg w-8 h-8 rounded flex items-center justify-center bg-gray-100"
                  title="Font"
                  type="button"
                  onClick={() => setShowPlaceholderFont(true)}
                >
                  A
                </button>
                {/* Text Styler Button */}
                <button
                  className="text-gray-700 font-bold text-lg w-8 h-8 rounded flex items-center justify-center underline bg-gray-100"
                  title="Style"
                  type="button"
                  onClick={() => setShowPlaceholderStyle(true)}
                >
                  Aa
                </button>
              </div>
              {/* Modals */}
              {showPlaceholderColor && (
                <ColorPicker
                  selectedColor={placeholderColor}
                  onColorChange={c => { setPlaceholderColor(c); setShowPlaceholderColor(false); }}
                  onClose={() => setShowPlaceholderColor(false)}
                />
              )}
              {showPlaceholderFont && (
                <FontSelector
                  selectedFont={placeholderFont}
                  onFontChange={f => { setPlaceholderFont(f); setShowPlaceholderFont(false); }}
                  onClose={() => setShowPlaceholderFont(false)}
                />
              )}
              {showPlaceholderStyle && (
                <TextStyler
                  selectedStyle={placeholderStyle}
                  onStyleChange={s => { setPlaceholderStyle(s); setShowPlaceholderStyle(false); }}
                  onClose={() => setShowPlaceholderStyle(false)}
                />
              )}
            </div>
          </div>

          {/* Bottom Row */}
          <div className="grid grid-cols-3 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Email Input Shadow</label>
              <div className="flex items-center space-x-2">
                <input
                  type="color"
                  value={boxShadowColor}
                  onChange={e => setBoxShadowColor(e.target.value)}
                  className="w-8 h-8 rounded border"
                  title="Pick Box Shadow Color"
                />
                <input
                  type="text"
                  value={boxShadowColor}
                  onChange={e => setBoxShadowColor(e.target.value)}
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Subscribe Button</label>
              <div className="flex items-center space-x-2">
                <input
                  type="text"
                  value={subscribeBtn}
                  onChange={e => setSubscribeBtn(e.target.value)}
                  style={{ color: subscribeBtnColor, fontFamily: subscribeBtnFont, ...subscribeBtnStyle }}
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-lg"
                />
                <div className="flex items-center space-x-1">
                  {/* Color Picker Button */}
                  <button
                    className="w-8 h-8 rounded-full border border-gray-300"
                    style={{ backgroundColor: subscribeBtnColor }}
                    title="Color"
                    type="button"
                    onClick={() => setShowSubscribeBtnColor(true)}
                  />
                  {/* Font Selector Button */}
                  <button
                    className="text-blue-500 font-bold text-lg w-8 h-8 rounded flex items-center justify-center bg-gray-100"
                    title="Font"
                    type="button"
                    onClick={() => setShowSubscribeBtnFont(true)}
                  >
                    A
                  </button>
                  {/* Text Styler Button */}
                  <button
                    className="text-gray-700 font-bold text-lg w-8 h-8 rounded flex items-center justify-center underline bg-gray-100"
                    title="Style"
                    type="button"
                    onClick={() => setShowSubscribeBtnStyle(true)}
                  >
                    Aa
                  </button>
                </div>
                {/* Modals */}
                {showSubscribeBtnColor && (
                  <ColorPicker
                    selectedColor={subscribeBtnColor}
                    onColorChange={c => { setSubscribeBtnColor(c); setShowSubscribeBtnColor(false); }}
                    onClose={() => setShowSubscribeBtnColor(false)}
                  />
                )}
                {showSubscribeBtnFont && (
                  <FontSelector
                    selectedFont={subscribeBtnFont}
                    onFontChange={f => { setSubscribeBtnFont(f); setShowSubscribeBtnFont(false); }}
                    onClose={() => setShowSubscribeBtnFont(false)}
                  />
                )}
                {showSubscribeBtnStyle && (
                  <TextStyler
                    selectedStyle={subscribeBtnStyle}
                    onStyleChange={s => { setSubscribeBtnStyle(s); setShowSubscribeBtnStyle(false); }}
                    onClose={() => setShowSubscribeBtnStyle(false)}
                  />
                )}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Subscribe BG Color</label>
              <div className="flex items-center space-x-2">
                <input
                  type="color"
                  value={subscribeBgColor}
                  onChange={e => setSubscribeBgColor(e.target.value)}
                  className="w-8 h-8 rounded border"
                  title="Pick Subscribe BG Color"
                />
                <input
                  type="text"
                  value={subscribeBgColor}
                  onChange={e => setSubscribeBgColor(e.target.value)}
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </SidebarLayout>
  )
}

