"use client"

import { useState } from "react"
import { Plus, Trash2 } from "lucide-react"
import TextInput from "./TextInput"
import FileUpload from "./Fileupload"
import SidebarLayout from "../Sidebar"
import ColorPicker from "../ColorPicker"
import FontSelector from "../FontSelector"
import TextStyler from "../TextStyler"
import { getApiEndpoint } from "../APIConnect"

const StyledTextInput = ({
  label,
  value,
  onChange,
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
  <div>
    <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
    <div className="flex items-center gap-2">
      <input
        type="text"
        value={value}
        onChange={e => onChange(e.target.value)}
        style={{ color, fontFamily: font, ...style }}
        className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
      />
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
        className="text-blue-500 text-lg font-bold bg-gray-100 w-6 h-6 rounded flex items-center justify-center"
        title="Font"
        onClick={() => setShowFont(true)}
      >
        A
      </button>
      {/* Text Styler Button */}
      <button
        type="button"
        className="text-black text-lg font-bold underline bg-gray-100 w-6 h-6 rounded flex items-center justify-center"
        title="Style"
        onClick={() => setShowStyle(true)}
      >
        Aa
      </button>
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
  </div>
);

const IncludesSection = () => {
  const [formData, setFormData] = useState({
    topTitle: "HAIR SALON, MASSAGES, BEAUTY SALON",
    heading: "Find a service close to you",
    subHeading: "Find a service close to you",
    mainHeading: "Our Methodology:",
    videoUrl: "/your_video",
  })

  const [ourListSections, setOurListSections] = useState([])
  const [bgImage, setBgImage] = useState(null)

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

  const [colorMainHeading, setColorMainHeading] = useState("#000000")
  const [fontMainHeading, setFontMainHeading] = useState("inherit")
  const [styleMainHeading, setStyleMainHeading] = useState({})
  const [showColorMainHeading, setShowColorMainHeading] = useState(false)
  const [showFontMainHeading, setShowFontMainHeading] = useState(false)
  const [showStyleMainHeading, setShowStyleMainHeading] = useState(false)

  const addOurListSection = () => {
    const newSection = {
      id: Date.now(),
      icon: null,
      heading: formData.heading,
      subHeading: formData.subHeading,
    }
    setOurListSections([...ourListSections, newSection])
  }

  const deleteOurListSection = (id) => {
    setOurListSections(ourListSections.filter((section) => section.id !== id))
  }

  const updateOurListSection = (id, field, value) => {
    setOurListSections(ourListSections.map((section) => (section.id === id ? { ...section, [field]: value } : section)))
  }

  const handleSave = async () => {
    const form = new FormData()

    // Add styled text fields
    form.append("topTitle", JSON.stringify({
      text: formData.topTitle,
      color: colorTopTitle,
      font: fontTopTitle,
      style: styleTopTitle
    }))
    form.append("heading", JSON.stringify({
      text: formData.heading,
      color: colorHeading,
      font: fontHeading,
      style: styleHeading
    }))
    form.append("subHeading", JSON.stringify({
      text: formData.subHeading,
      color: colorSubHeading,
      font: fontSubHeading,
      style: styleSubHeading
    }))
    form.append("mainHeading", JSON.stringify({
      text: formData.mainHeading,
      color: colorMainHeading,
      font: fontMainHeading,
      style: styleMainHeading
    }))

    // Add dynamic ourListSections (handle icons as files)
    const ourListArr = []
    ourListSections.forEach((section, idx) => {
      // If icon is a File, append it
      if (section.icon instanceof File) {
        form.append(`icon${idx}`, section.icon)
        ourListArr.push({
          heading: section.heading,
          subHeading: section.subHeading,
          icon: `icon${idx}` // backend will map this to the uploaded file
        })
      } else {
        ourListArr.push({
          heading: section.heading,
          subHeading: section.subHeading,
          icon: section.icon // string or null
        })
      }
    })
    form.append("ourListSections", JSON.stringify(ourListArr))

    // Add BG image
    if (bgImage instanceof File) {
      form.append("bgImage", bgImage)
    }

    // Add video URL
    form.append("videoUrl", formData.videoUrl)

    try {
      const res = await fetch(getApiEndpoint('includes'), {
        method: "POST",
        body: form,
      })
      const data = await res.json()
      if (data.success) {
        alert("Includes section saved!")
      } else {
        alert(data.message || "Failed to save.")
      }
    } catch (err) {
      alert("Error saving includes section.")
    }
  }

  return (
    <SidebarLayout>
    <div className="p-6">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Includes Section</h1>
        <button
          className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg font-medium"
          onClick={handleSave}
        >
          Save
        </button>
      </div>

      <div className="space-y-6">
        <StyledTextInput
          label="Top Title"
          value={formData.topTitle}
          onChange={(value) => setFormData({ ...formData, topTitle: value })}
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

        <StyledTextInput
          label="Heading"
          value={formData.heading}
          onChange={(value) => setFormData({ ...formData, heading: value })}
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

        <StyledTextInput
          label="Sub Heading"
          value={formData.subHeading}
          onChange={(value) => setFormData({ ...formData, subHeading: value })}
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

        <StyledTextInput
          label="Our List Main Heading"
          value={formData.mainHeading}
          onChange={(value) => setFormData({ ...formData, mainHeading: value })}
          color={colorMainHeading}
          setColor={setColorMainHeading}
          font={fontMainHeading}
          setFont={setFontMainHeading}
          style={styleMainHeading}
          setStyle={setStyleMainHeading}
          showColor={showColorMainHeading}
          setShowColor={setShowColorMainHeading}
          showFont={showFontMainHeading}
          setShowFont={setShowFontMainHeading}
          showStyle={showStyleMainHeading}
          setShowStyle={setShowStyleMainHeading}
        />

        {/* Dynamic Our List Sections */}
        {ourListSections.map((section, index) => (
          <div key={section.id} className="space-y-4 p-4 border border-gray-200 rounded-lg relative">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-900">{formData.topTitle}</h3>
              <button
                onClick={() => deleteOurListSection(section.id)}
                className="p-2 text-red-500 hover:bg-red-50 rounded-lg">
                <Trash2 size={20} />
              </button>
            </div>

            <FileUpload
              label={`Icon ${index + 1}`}
              placeholder="No file chosen"
              file={section.icon}
              onFileChange={(file) => updateOurListSection(section.id, "icon", file)}
            />

            <TextInput
              label={`Our List Heading ${index + 1}`}
              value={section.heading}
              onChange={(value) => updateOurListSection(section.id, "heading", value)}
            />

            <TextInput
              label={`Our List Sub Heading ${index + 1}`}
              value={section.subHeading}
              onChange={(value) => updateOurListSection(section.id, "subHeading", value)}
            />
          </div>
        ))}

        <button
          className="flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg font-medium"
          onClick={addOurListSection}
        >
          <Plus size={18} /> Add Our List Section
        </button>

        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-900">Our List Second Column</h3>

          <FileUpload label="Add BG Image" placeholder="No file chosen" file={bgImage} onFileChange={setBgImage} />

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Video Url</label>
            <input
              type="text"
              value={formData.videoUrl}
              onChange={(e) => setFormData({ ...formData, videoUrl: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        </div>
      </div>
    </div>
    </SidebarLayout>
  )
}

export default IncludesSection
