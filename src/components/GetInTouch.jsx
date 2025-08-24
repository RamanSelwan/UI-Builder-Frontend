import { useState } from "react"
import { Save, Trash2, Eye, Moon, Sun } from "lucide-react"
import SidebarLayout from "./Sidebar"
import ColorPicker from "./ColorPicker"
import FontSelector from "./FontSelector"
import TextStyler from "./TextStyler"
import { getApiEndpoint } from "./APIConnect"

const ServiceCardView = () => {
  const [formData, setFormData] = useState({
    topTitle: "HAIR SALON, MASSAGES, BEAUTY SALON",
    heading: "Find a service close to you",
    subHeading: "Find a service close to you",
    formBgColor: "#ffffff",
    containerBgColor: "#FBF2E0",
    name: "Name",
    nameIcon: null,
    emailIcon: null,
    phoneIcon: null,
    serviceIcon: null,
    messageIcon: null,
    submitBgColor: "#3B82F6",
  })

  const [isDarkMode, setIsDarkMode] = useState(false)

  // Style states for each field
  const [colorTopTitle, setColorTopTitle] = useState("#000000")
  const [fontTopTitle, setFontTopTitle] = useState("inherit")
  const [styleTopTitle, setStyleTopTitle] = useState({})
  const [showColorTopTitle, setShowColorTopTitle] = useState(false)
  const [showFontTopTitle, setShowFontTopTitle] = useState(false)
  const [showStyleTopTitle, setShowStyleTopTitle] = useState(false)

  const [colorHeading, setColorHeading] = useState("#000000")
  const [fontHeading, setFontHeading] = useState("inherit")
  const [styleHeading, setStyleHeading] = useState({})
  const [showColorHeading, setShowColorHeading] = useState(false)
  const [showFontHeading, setShowFontHeading] = useState(false)
  const [showStyleHeading, setShowStyleHeading] = useState(false)

  const [colorSubHeading, setColorSubHeading] = useState("#000000")
  const [fontSubHeading, setFontSubHeading] = useState("inherit")
  const [styleSubHeading, setStyleSubHeading] = useState({})
  const [showColorSubHeading, setShowColorSubHeading] = useState(false)
  const [showFontSubHeading, setShowFontSubHeading] = useState(false)
  const [showStyleSubHeading, setShowStyleSubHeading] = useState(false)

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const handleFileUpload = (field, event) => {
    const file = event.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        setFormData((prev) => ({
          ...prev,
          [field]: e.target.result,
        }))
      }
      reader.readAsDataURL(file)
    }
  }

  const handleSave = async () => {
    try {
      const res = await fetch(getApiEndpoint('get_in_touch '),{
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          topTitle: {
            text: formData.topTitle,
            color: colorTopTitle,
            font: fontTopTitle,
            style: styleTopTitle,
          },
          heading: {
            text: formData.heading,
            color: colorHeading,
            font: fontHeading,
            style: styleHeading,
          },
          subHeading: {
            text: formData.subHeading,
            color: colorSubHeading,
            font: fontSubHeading,
            style: styleSubHeading,
          },
          formBgColor: formData.formBgColor,
          containerBgColor: formData.containerBgColor,
          name: formData.name,
          nameIcon: formData.nameIcon,
          emailIcon: formData.emailIcon,
          phoneIcon: formData.phoneIcon,
          serviceIcon: formData.serviceIcon,
          messageIcon: formData.messageIcon,
          submitBgColor: formData.submitBgColor,
        }),
      })
      const data = await res.json()
      if (data.success) {
        alert("Form configuration saved!")
      } else {
        alert(data.message || "Failed to save.")
      }
    } catch (err) {
      alert("Error saving form data.")
    }
  }

  // Field with color, font, style buttons
  const FormField = ({
    label,
    value,
    onChange,
    hasIcon = false,
    iconField = null,
    placeholder = "",
    color,
    setColor,
    font,
    setFont,
    style,
    setStyle,
    showColor,
    setShowColor,
    showFont,
    setShowFont,
    showStyle,
    setShowStyle,
  }) => (
    <div className="mb-6">
      <div className="flex items-center justify-between mb-2">
        <label className="text-sm font-medium text-gray-700">{label}</label>
        <div className="flex items-center space-x-2">
          {/* Color Picker Button */}
          <button
            type="button"
            className="w-6 h-6 rounded-full border border-gray-300"
            style={{ backgroundColor: color }}
            title="Color"
            onClick={() => setShowColor(true)}
          />
          {/* Font Selector Button */}
          <button
            type="button"
            className="text-blue-400 text-lg font-bold bg-gray-100 w-6 h-6 rounded flex items-center justify-center"
            title="Font"
            onClick={() => setShowFont(true)}
          >
            A
          </button>
          {/* Text Styler Button */}
          <button
            type="button"
            className="text-gray-600 text-sm font-bold underline bg-gray-100 w-6 h-6 rounded flex items-center justify-center"
            title="Style"
            onClick={() => setShowStyle(true)}
          >
            Aa
          </button>
        </div>
      </div>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        style={{ color, fontFamily: font, ...style }}
        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 mb-3"
      />
      {/* Modals */}
      {showColor && (
        <ColorPicker
          selectedColor={color}
          onColorChange={(c) => {
            setColor(c)
            setShowColor(false)
          }}
          onClose={() => setShowColor(false)}
        />
      )}
      {showFont && (
        <FontSelector
          selectedFont={font}
          onFontChange={(f) => {
            setFont(f)
            setShowFont(false)
          }}
          onClose={() => setShowFont(false)}
        />
      )}
      {showStyle && (
        <TextStyler
          selectedStyle={style}
          onStyleChange={(s) => {
            setStyle(s)
            setShowStyle(false)
          }}
          onClose={() => setShowStyle(false)}
        />
      )}
      {hasIcon && (
        <div className="space-y-3">
          <div className="mb-2">
            <label className="text-sm font-medium text-gray-700">{label} Icon</label>
          </div>
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 border-2 border-dashed border-gray-300 rounded flex items-center justify-center bg-gray-50">
              <img
                src={
                  formData[iconField] ||
                  "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/service-card-asset.jpg-VQ2XDNccH3DdoOar6HxQ3afOnGGVgO.jpeg"
                }
                alt={`${label} icon`}
                className="w-10 h-10 object-cover rounded"
              />
            </div>
            <div className="flex-1">
              <div className="flex items-center space-x-2">
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleFileUpload(iconField, e)}
                  className="hidden"
                  id={`${iconField}-upload`}
                />
                <label
                  htmlFor={`${iconField}-upload`}
                  className="px-4 py-2 text-sm border border-gray-300 rounded cursor-pointer hover:bg-gray-50 bg-white"
                >
                  Choose File
                </label>
                <span className="text-sm text-gray-500">
                  {formData[iconField] ? "Custom image selected" : "No file chosen"}
                </span>
                {formData[iconField] && (
                  <button
                    onClick={() => handleInputChange(iconField, null)}
                    className="text-blue-500 hover:text-blue-700"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                )}
              </div>
              <p className="text-xs text-gray-500 mt-1">{label.toLowerCase().replace(" ", "_")}_icon.jpg</p>
            </div>
          </div>
        </div>
      )}
    </div>
  )

  return (
    <SidebarLayout>
      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <div className="bg-white border-b border-gray-200 px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <h1 className="text-2xl font-bold text-blue-600">Services Card View</h1>
            </div>
            <div className="flex items-center space-x-4">
              <button onClick={() => setIsDarkMode(!isDarkMode)} className="p-2 text-gray-600 hover:text-gray-800">
                {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
              </button>
              <button className="p-2 text-gray-600 hover:text-gray-800">
                <Eye className="w-5 h-5" />
              </button>
              <button
                onClick={handleSave}
                className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
              >
                <Save className="w-4 h-4" />
                <span>Save</span>
              </button>
            </div>
          </div>
        </div>

        <div className="flex">
          {/* Main Content */}
          <div className="flex-1 p-6">
            <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              {/* Top Title */}
              <FormField
                label="Top Title"
                value={formData.topTitle}
                onChange={(value) => handleInputChange("topTitle", value)}
                color={colorTopTitle}
                setColor={setColorTopTitle}
                font={fontTopTitle}
                setFont={setFontTopTitle}
                style={styleTopTitle}
                setStyle={setStyleTopTitle}
                showColor={showColorTopTitle}
                setShowColor={setShowColorTopTitle}
                showFont={showFontTopTitle}
                setShowFont={setShowFontTopTitle}
                showStyle={showStyleTopTitle}
                setShowStyle={setShowStyleTopTitle}
              />

              {/* Heading */}
              <FormField
                label="Heading"
                value={formData.heading}
                onChange={(value) => handleInputChange("heading", value)}
                color={colorHeading}
                setColor={setColorHeading}
                font={fontHeading}
                setFont={setFontHeading}
                style={styleHeading}
                setStyle={setStyleHeading}
                showColor={showColorHeading}
                setShowColor={setShowColorHeading}
                showFont={showFontHeading}
                setShowFont={setShowFontHeading}
                showStyle={showStyleHeading}
                setShowStyle={setShowStyleHeading}
              />

              {/* Sub Heading */}
              <FormField
                label="Sub Heading"
                value={formData.subHeading}
                onChange={(value) => handleInputChange("subHeading", value)}
                color={colorSubHeading}
                setColor={setColorSubHeading}
                font={fontSubHeading}
                setFont={setFontSubHeading}
                style={styleSubHeading}
                setStyle={setStyleSubHeading}
                showColor={showColorSubHeading}
                setShowColor={setShowColorSubHeading}
                showFont={showFontSubHeading}
                setShowFont={setShowFontSubHeading}
                showStyle={showStyleSubHeading}
                setShowStyle={setShowStyleSubHeading}
              />

              {/* Color Controls */}
              <div className="grid grid-cols-2 gap-6 mb-8">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Form BG Color Change</label>
                  <div className="flex items-center space-x-2">
                    <input
                      type="color"
                      value={formData.formBgColor}
                      onChange={(e) => handleInputChange("formBgColor", e.target.value)}
                      className="w-8 h-8 border border-gray-300 rounded"
                    />
                    <input
                      type="text"
                      value={formData.formBgColor}
                      onChange={(e) => handleInputChange("formBgColor", e.target.value)}
                      className="px-3 py-2 border border-gray-300 rounded-md text-sm"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Container Fluid BG Color Change</label>
                  <div className="flex items-center space-x-2">
                    <input
                      type="color"
                      value={formData.containerBgColor}
                      onChange={(e) => handleInputChange("containerBgColor", e.target.value)}
                      className="w-8 h-8 border border-gray-300 rounded"
                    />
                    <input
                      type="text"
                      value={formData.containerBgColor}
                      onChange={(e) => handleInputChange("containerBgColor", e.target.value)}
                      className="px-3 py-2 border border-gray-300 rounded-md text-sm"
                    />
                  </div>
                </div>
              </div>

              {/* Form Section */}
              <div className="mb-8 bg-blue-50 p-6 rounded-lg border border-blue-200">
                <h3 className="text-lg font-semibold text-gray-800 mb-6">Form</h3>

                {/* Name Field */}
                <FormField
                  label="Name"
                  value={formData.name}
                  onChange={(value) => handleInputChange("name", value)}
                  hasIcon={true}
                  iconField="nameIcon"
                  placeholder="Name"
                  color="#000"
                  setColor={() => {}}
                  font="inherit"
                  setFont={() => {}}
                  style={{}}
                  setStyle={() => {}}
                  showColor={false}
                  setShowColor={() => {}}
                  showFont={false}
                  setShowFont={() => {}}
                  showStyle={false}
                  setShowStyle={() => {}}
                />

                {/* Email Field */}
                <FormField
                  label="Email"
                  value="Email"
                  onChange={() => {}}
                  hasIcon={true}
                  iconField="emailIcon"
                  placeholder="Email"
                  color="#000"
                  setColor={() => {}}
                  font="inherit"
                  setFont={() => {}}
                  style={{}}
                  setStyle={() => {}}
                  showColor={false}
                  setShowColor={() => {}}
                  showFont={false}
                  setShowFont={() => {}}
                  showStyle={false}
                  setShowStyle={() => {}}
                />

                {/* Phone Field */}
                <FormField
                  label="Phone"
                  value="Phone"
                  onChange={() => {}}
                  hasIcon={true}
                  iconField="phoneIcon"
                  placeholder="Phone"
                  color="#000"
                  setColor={() => {}}
                  font="inherit"
                  setFont={() => {}}
                  style={{}}
                  setStyle={() => {}}
                  showColor={false}
                  setShowColor={() => {}}
                  showFont={false}
                  setShowFont={() => {}}
                  showStyle={false}
                  setShowStyle={() => {}}
                />

                {/* Service Field */}
                <FormField
                  label="Service"
                  value="Service"
                  onChange={() => {}}
                  hasIcon={true}
                  iconField="serviceIcon"
                  placeholder="Select Service"
                  color="#000"
                  setColor={() => {}}
                  font="inherit"
                  setFont={() => {}}
                  style={{}}
                  setStyle={() => {}}
                  showColor={false}
                  setShowColor={() => {}}
                  showFont={false}
                  setShowFont={() => {}}
                  showStyle={false}
                  setShowStyle={() => {}}
                />

                {/* Message Field */}
                <div className="mb-6">
                  <div className="flex items-center justify-between mb-2">
                    <label className="text-sm font-medium text-gray-700">Message</label>
                    <div className="flex items-center space-x-4">
                      <span className="text-sm font-medium text-gray-700">Submit Button BG Color</span>
                      <input
                        type="color"
                        value={formData.submitBgColor}
                        onChange={(e) => handleInputChange("submitBgColor", e.target.value)}
                        className="w-6 h-6 border border-gray-300 rounded"
                      />
                    </div>
                  </div>
                  <input
                    type="text"
                    value="Message"
                    placeholder="Message"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 mb-3"
                    readOnly
                  />
                  <div className="space-y-3">
                    <div className="mb-2">
                      <label className="text-sm font-medium text-gray-700">Message Icon</label>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="w-12 h-12 border-2 border-dashed border-gray-300 rounded flex items-center justify-center bg-gray-50">
                        <img
                          src={
                            formData.messageIcon ||
                            "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/service-card-asset.jpg-VQ2XDNccH3DdoOar6HxQ3afOnGGVgO.jpeg"
                          }
                          alt="Message icon"
                          className="w-10 h-10 object-cover rounded"
                        />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center space-x-2">
                          <input
                            type="file"
                            accept="image/*"
                            onChange={(e) => handleFileUpload("messageIcon", e)}
                            className="hidden"
                            id="messageIcon-upload"
                          />
                          <label
                            htmlFor="messageIcon-upload"
                            className="px-4 py-2 text-sm border border-gray-300 rounded cursor-pointer hover:bg-gray-50 bg-white"
                          >
                            Choose File
                          </label>
                          <span className="text-sm text-gray-500">
                            {formData.messageIcon ? "Custom image selected" : "No file chosen"}
                          </span>
                          {formData.messageIcon && (
                            <button
                              onClick={() => handleInputChange("messageIcon", null)}
                              className="text-blue-500 hover:text-blue-700"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          )}
                        </div>
                        <p className="text-xs text-gray-500 mt-1">message_icon.jpg</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Button Submit */}
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Button Submit</label>
                  <button
                    style={{ backgroundColor: formData.submitBgColor }}
                    className="px-6 py-2 text-white rounded-md hover:opacity-90 transition-opacity"
                  >
                    Submit
                  </button>
                </div>
              </div>

              {/* Preview Section */}
              <div className="mt-8 p-6 border-t border-gray-200">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Preview</h3>
                <div className="p-6 rounded-lg" style={{ backgroundColor: formData.containerBgColor }}>
                  <div
                    className="max-w-md mx-auto p-6 rounded-lg shadow-lg"
                    style={{ backgroundColor: formData.formBgColor }}
                  >
                    <div className="mb-6">
                      <h2 className="text-xl font-bold text-gray-800 mb-2" style={{ color: colorTopTitle, fontFamily: fontTopTitle, ...styleTopTitle }}>{formData.topTitle}</h2>
                      <h3 className="text-lg text-gray-700 mb-2" style={{ color: colorHeading, fontFamily: fontHeading, ...styleHeading }}>{formData.heading}</h3>
                      <p className="text-gray-600" style={{ color: colorSubHeading, fontFamily: fontSubHeading, ...styleSubHeading }}>{formData.subHeading}</p>
                    </div>

                    <form className="space-y-4">
                      <div className="flex items-center space-x-3">
                        <img
                          src={
                            formData.nameIcon ||
                            "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/service-card-asset.jpg-VQ2XDNccH3DdoOar6HxQ3afOnGGVgO.jpeg"
                          }
                          alt="Name icon"
                          className="w-6 h-6 object-cover rounded"
                        />
                        <input
                          type="text"
                          placeholder={formData.name}
                          className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                      <div className="flex items-center space-x-3">
                        <img
                          src={
                            formData.emailIcon ||
                            "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/service-card-asset.jpg-VQ2XDNccH3DdoOar6HxQ3afOnGGVgO.jpeg"
                          }
                          alt="Email icon"
                          className="w-6 h-6 object-cover rounded"
                        />
                        <input
                          type="email"
                          placeholder="Email"
                          className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                      <div className="flex items-center space-x-3">
                        <img
                          src={
                            formData.phoneIcon ||
                            "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/service-card-asset.jpg-VQ2XDNccH3DdoOar6HxQ3afOnGGVgO.jpeg"
                          }
                          alt="Phone icon"
                          className="w-6 h-6 object-cover rounded"
                        />
                        <input
                          type="tel"
                          placeholder="Phone"
                          className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                      <div className="flex items-center space-x-3">
                        <img
                          src={
                            formData.serviceIcon ||
                            "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/service-card-asset.jpg-VQ2XDNccH3DdoOar6HxQ3afOnGGVgO.jpeg"
                          }
                          alt="Service icon"
                          className="w-6 h-6 object-cover rounded"
                        />
                        <input
                          type="text"
                          placeholder="Service"
                          className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                      <div className="flex items-start space-x-3">
                        <img
                          src={
                            formData.messageIcon ||
                            "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/service-card-asset.jpg-VQ2XDNccH3DdoOar6HxQ3afOnGGVgO.jpeg"
                          }
                          alt="Message icon"
                          className="w-6 h-6 object-cover rounded mt-2"
                        />
                        <textarea
                          placeholder="Message"
                          rows="4"
                          className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        ></textarea>
                      </div>
                      <button
                        type="submit"
                        style={{ backgroundColor: formData.submitBgColor }}
                        className="w-full py-2 text-white rounded-md hover:opacity-90 transition-opacity"
                      >
                        Submit
                      </button>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </SidebarLayout>
  )
}

export default ServiceCardView