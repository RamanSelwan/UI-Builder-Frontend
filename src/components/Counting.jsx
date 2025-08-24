import { Sidebar } from 'lucide-react'
import React, { useState } from 'react'
import SidebarLayout from './Sidebar'
import ColorPicker from './ColorPicker'
import FontSelector from './FontSelector'
import TextStyler from './TextStyler'
import { getApiEndpoint } from './APIConnect'

const Count = () => {
  // Individual color/font/style states for each input
  const [colorNum1, setColorNum1] = useState("#000000")
  const [fontNum1, setFontNum1] = useState("inherit")
  const [styleNum1, setStyleNum1] = useState({})
  const [showColorNum1, setShowColorNum1] = useState(false)
  const [showFontNum1, setShowFontNum1] = useState(false)
  const [showStyleNum1, setShowStyleNum1] = useState(false)

  const [colorHead1, setColorHead1] = useState("#000000")
  const [fontHead1, setFontHead1] = useState("inherit")
  const [styleHead1, setStyleHead1] = useState({})
  const [showColorHead1, setShowColorHead1] = useState(false)
  const [showFontHead1, setShowFontHead1] = useState(false)
  const [showStyleHead1, setShowStyleHead1] = useState(false)

  const [colorNum2, setColorNum2] = useState("#000000")
  const [fontNum2, setFontNum2] = useState("inherit")
  const [styleNum2, setStyleNum2] = useState({})
  const [showColorNum2, setShowColorNum2] = useState(false)
  const [showFontNum2, setShowFontNum2] = useState(false)
  const [showStyleNum2, setShowStyleNum2] = useState(false)

  const [colorHead2, setColorHead2] = useState("#000000")
  const [fontHead2, setFontHead2] = useState("inherit")
  const [styleHead2, setStyleHead2] = useState({})
  const [showColorHead2, setShowColorHead2] = useState(false)
  const [showFontHead2, setShowFontHead2] = useState(false)
  const [showStyleHead2, setShowStyleHead2] = useState(false)

  const [colorNum3, setColorNum3] = useState("#000000")
  const [fontNum3, setFontNum3] = useState("inherit")
  const [styleNum3, setStyleNum3] = useState({})
  const [showColorNum3, setShowColorNum3] = useState(false)
  const [showFontNum3, setShowFontNum3] = useState(false)
  const [showStyleNum3, setShowStyleNum3] = useState(false)

  const [colorHead3, setColorHead3] = useState("#000000")
  const [fontHead3, setFontHead3] = useState("inherit")
  const [styleHead3, setStyleHead3] = useState({})
  const [showColorHead3, setShowColorHead3] = useState(false)
  const [showFontHead3, setShowFontHead3] = useState(false)
  const [showStyleHead3, setShowStyleHead3] = useState(false)

  const [image, setImage] = useState(null)
  const [num1, setNum1] = useState("")
  const [head1, setHead1] = useState("")
  const [num2, setNum2] = useState("")
  const [head2, setHead2] = useState("")
  const [num3, setNum3] = useState("")
  const [head3, setHead3] = useState("")

  const handleImageChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (ev) => {
        setImage(ev.target.result)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleSave = async () => {
    if (!num1 || !head1 || !num2 || !head2 || !num3 || !head3) {
      window.alert("❌ Please fill all fields!");
      return;
    }

    // Prepare columns array
    const columns = [
      {
        number: num1,
        numberColor: colorNum1,
        numberFont: fontNum1,
        numberStyle: styleNum1,
        heading: head1,
        headingColor: colorHead1,
        headingFont: fontHead1,
        headingStyle: styleHead1,
      },
      {
        number: num2,
        numberColor: colorNum2,
        numberFont: fontNum2,
        numberStyle: styleNum2,
        heading: head2,
        headingColor: colorHead2,
        headingFont: fontHead2,
        headingStyle: styleHead2,
      },
      {
        number: num3,
        numberColor: colorNum3,
        numberFont: fontNum3,
        numberStyle: styleNum3,
        heading: head3,
        headingColor: colorHead3,
        headingFont: fontHead3,
        headingStyle: styleHead3,
      },
    ];

    const formData = new FormData();
    formData.append("columns", JSON.stringify(columns));
    // If you want to send the actual file, use the file object, not the base64 string
    if (document.getElementById("file").files[0]) {
      formData.append("bgImage", document.getElementById("file").files[0]);
    }

    try {
      const res = await fetch(getApiEndpoint('count'), {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      if (data.success) {
        window.alert("✅ Data saved successfully!");
      } else {
        window.alert(data.message || "Failed to save.");
      }
    } catch (err) {
      window.alert("Error saving data.");
    }
  };

  // Helper for styled input with pickers
  const StyledInput = ({
    value, onChange, color, setColor, font, setFont, style, setStyle,
    showColor, setShowColor, showFont, setShowFont, showStyle, setShowStyle,
    placeholder = "", className = ""
  }) => (
    <div className='flex gap-2 items-center'>
      <input
        type="text"
        value={value}
        onChange={onChange}
        className={className}
        style={{ color, fontFamily: font, ...style }}
        placeholder={placeholder}
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
  );

  return (
    <SidebarLayout>
      <div className='shadow-xl max-w-180 h-100% '>
        <div className='flex flex-row gap-100 p-5'>
          <h1 className='text-2xl font-bold text-blue-500'>Counting Section</h1>
          <button
            className='bg-blue-500 hover:bg-blue-600 transition text-amber-50 w-20 text-md font-bold rounded-lg shadow-md active:scale-95'
            onClick={handleSave}
          >
            Save
          </button>
        </div>

        <div className='flex flex-row p-5'>
          <div className='border border-gray-500 w-25 h-20 p-5 rounded-lg flex items-center justify-center'>
            <img src={image || ""} alt="Preview" style={{ width: "100%", height: "100%", objectFit: "contain" }} />
          </div>
          <div className='ml-5 flex flex-col '>
            <h1 className='font-bold pb-1'>Container Fluid Bg Image</h1>
            <input
              type="file"
              name="file"
              id="file"
              className='border w-130 h-10 rounded-sm p-1.5'
              accept="image/*"
              onChange={handleImageChange}
            />
          </div>
        </div>
        {/* Column 1 */}
        <div className='flex flex-col p-2'>
          <div>
            <h1 className='text-lg font-bold'>Column 1</h1>
          </div>
          <div className='p-3 bg-blue-50 rounded-lg'>
            <h1 className='font-bold pb-1'>Number</h1>
            <StyledInput
              value={num1}
              onChange={e => setNum1(e.target.value)}
              color={colorNum1}
              setColor={setColorNum1}
              font={fontNum1}
              setFont={setFontNum1}
              style={styleNum1}
              setStyle={setStyleNum1}
              showColor={showColorNum1}
              setShowColor={setShowColorNum1}
              showFont={showFontNum1}
              setShowFont={setShowFontNum1}
              showStyle={showStyleNum1}
              setShowStyle={setShowStyleNum1}
              className='border w-130 h-10 rounded-sm bg-white'
            />
            <h1 className='font-bold p-1'>heading</h1>
            <StyledInput
              value={head1}
              onChange={e => setHead1(e.target.value)}
              color={colorHead1}
              setColor={setColorHead1}
              font={fontHead1}
              setFont={setFontHead1}
              style={styleHead1}
              setStyle={setStyleHead1}
              showColor={showColorHead1}
              setShowColor={setShowColorHead1}
              showFont={showFontHead1}
              setShowFont={setShowFontHead1}
              showStyle={showStyleHead1}
              setShowStyle={setShowStyleHead1}
              className='border w-130 h-10 p-2 rounded-sm bg-white'
            />
          </div>
        </div>
        {/* Column 2 */}
        <div className='flex flex-col p-2'>
          <div>
            <h1 className='text-lg font-bold'>Column 2</h1>
          </div>
          <div className='p-3 bg-blue-50 rounded-lg'>
            <h1 className='font-bold pb-1'>Number</h1>
            <StyledInput
              value={num2}
              onChange={e => setNum2(e.target.value)}
              color={colorNum2}
              setColor={setColorNum2}
              font={fontNum2}
              setFont={setFontNum2}
              style={styleNum2}
              setStyle={setStyleNum2}
              showColor={showColorNum2}
              setShowColor={setShowColorNum2}
              showFont={showFontNum2}
              setShowFont={setShowFontNum2}
              showStyle={showStyleNum2}
              setShowStyle={setShowStyleNum2}
              className='border w-130 h-10 p-2 rounded-sm bg-white'
            />
            <h1 className='font-bold p-1'>heading</h1>
            <StyledInput
              value={head2}
              onChange={e => setHead2(e.target.value)}
              color={colorHead2}
              setColor={setColorHead2}
              font={fontHead2}
              setFont={setFontHead2}
              style={styleHead2}
              setStyle={setStyleHead2}
              showColor={showColorHead2}
              setShowColor={setShowColorHead2}
              showFont={showFontHead2}
              setShowFont={setShowFontHead2}
              showStyle={showStyleHead2}
              setShowStyle={setShowStyleHead2}
              className='border w-130 h-10 p-2 rounded-sm bg-white'
            />
          </div>
        </div>
        {/* Column 3 */}
        <div className='flex flex-col p-2'>
          <div>
            <h1 className='text-lg font-bold'>Column 3</h1>
          </div>
          <div className='p-3 bg-blue-50 rounded-lg'>
            <h1 className='font-bold pb-1'>Number</h1>
            <StyledInput
              value={num3}
              onChange={e => setNum3(e.target.value)}
              color={colorNum3}
              setColor={setColorNum3}
              font={fontNum3}
              setFont={setFontNum3}
              style={styleNum3}
              setStyle={setStyleNum3}
              showColor={showColorNum3}
              setShowColor={setShowColorNum3}
              showFont={showFontNum3}
              setShowFont={setShowFontNum3}
              showStyle={showStyleNum3}
              setShowStyle={setShowStyleNum3}
              className='border w-130 h-10 p-2 rounded-sm bg-white'
            />
            <h1 className='font-bold p-1'>heading</h1>
            <StyledInput
              value={head3}
              onChange={e => setHead3(e.target.value)}
              color={colorHead3}
              setColor={setColorHead3}
              font={fontHead3}
              setFont={setFontHead3}
              style={styleHead3}
              setStyle={setStyleHead3}
              showColor={showColorHead3}
              setShowColor={setShowColorHead3}
              showFont={showFontHead3}
              setShowFont={setShowFontHead3}
              showStyle={showStyleHead3}
              setShowStyle={setShowStyleHead3}
              className='border w-130 h-10 p-2 rounded-sm bg-white'
            />
          </div>
        </div>
      </div>
    </SidebarLayout>
  )
}

export default Count