"use client"

import { useState } from "react"
import { Plus, Link, Edit, Trash2 } from "lucide-react"
import ColorPicker from "../ColorPicker"
import FontSelector from "../FontSelector"
import TextStyler from "../TextStyler"
import SidebarLayout from '../Sidebar';
import { getApiEndpoint } from "../APIConnect"

const HeaderSettings = () => {
  const [menuItems, setMenuItems] = useState([
    { id: 1, name: "Home", url: "#" },
    { id: 2, name: "About Us", url: "#" },
    { id: 3, name: "Services", url: "#" },
    { id: 4, name: "Testimonials", url: "#" },
    { id: 5, name: "Blog", url: "#" },
    { id: 6, name: "Contact Us", url: "#" },
  ])

  const [newMenuItem, setNewMenuItem] = useState("")
  const [showColorPicker, setShowColorPicker] = useState(false)
  const [showFontSelector, setShowFontSelector] = useState(false)
  const [showTextStyler, setShowTextStyler] = useState(false)
  const [selectedColor, setSelectedColor] = useState("#000000")
  const [selectedFont, setSelectedFont] = useState("Raleway")
  const [mobileMenuEnabled, setMobileMenuEnabled] = useState(false)
  const [logoFile, setLogoFile] = useState(null)
  const [logoPreview, setLogoPreview] = useState(null)

  const addMenuItem = () => {
    if (newMenuItem.trim()) {
      const newItem = {
        id: Date.now(),
        name: newMenuItem,
        url: "#",
      }
      setMenuItems([...menuItems, newItem])
      setNewMenuItem("")
    }
  }

  const deleteMenuItem = (id) => {
    setMenuItems(menuItems.filter((item) => item.id !== id))
  }

  const handleSave = async () => {
    const formData = new FormData();
    const menuItemsToSend = menuItems.map(({ name, url }) => ({ name, url }));
    formData.append("menuItems", JSON.stringify(menuItemsToSend));
    formData.append("selectedColor", selectedColor);
    formData.append("selectedFont", selectedFont);
    formData.append("mobileMenuEnabled", mobileMenuEnabled);
    if (logoFile) {
      formData.append("logoFile", logoFile);
    }

    try {
      const res = await fetch(getApiEndpoint('header1'), {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      if (data.success) {
        alert("Settings saved successfully!");
      } else {
        alert(data.message || "Failed to save.");
      }
    } catch (err) {
      alert("Error saving settings.");
    }
  }

  // Handle logo file change
  const handleLogoChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      setLogoFile(file)
      setLogoPreview(URL.createObjectURL(file))
    }
  }

  return (
    <SidebarLayout>
      <div className="max-w-6xl mx-auto " >
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-blue-600">Header Settings</h1>
          <button
            onClick={handleSave}
            className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
          >
            Save
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Logo Upload Section */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <div className="w-full h-32 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center mb-4 overflow-hidden">
                <div className="text-center w-full h-full flex items-center justify-center">
                  {logoPreview ? (
                    <img
                      src={logoPreview}
                      alt="Logo Preview"
                      className="object-contain w-full h-full"
                    />
                  ) : (
                    <div>
                      <div className="flex items-center justify-center mb-2">
                        <div className="w-8 h-8 bg-gray-800 rounded mr-2"></div>
                        <span className="text-pink-400 font-bold text-lg">STYLICLE</span>
                      </div>
                    </div>
                  )}
                </div>
              </div>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Logo Upload</label>
                  <div className="flex">
                    <label className="bg-gray-100 border border-gray-300 px-4 py-2 rounded-l-lg text-sm cursor-pointer hover:bg-gray-200 transition-colors">
                      Choose File
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleLogoChange}
                        className="hidden"
                      />
                    </label>
                    <div className="flex-1 border border-l-0 border-gray-300 px-3 py-2 rounded-r-lg text-sm text-gray-500 truncate">
                      {logoFile ? logoFile.name : "No file chosen"}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Menu Items Section */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold">Menu Items</h3>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => setShowColorPicker(true)}
                    className="w-8 h-8 rounded-full border-2 border-gray-300"
                    style={{ backgroundColor: selectedColor }}
                  ></button>
                  <button onClick={() => setShowFontSelector(true)} className="text-blue-400 text-xl font-bold">
                    A
                  </button>
                  <button onClick={() => setShowTextStyler(true)} className="text-gray-600">
                    <div className="flex flex-col space-y-1">
                      <div className="w-4 h-0.5 bg-gray-600"></div>
                      <div className="w-4 h-0.5 bg-gray-600"></div>
                      <div className="w-4 h-0.5 bg-gray-600"></div>
                    </div>
                  </button>
                </div>
              </div>

              <div className="flex mb-4">
                <input
                  type="text"
                  value={newMenuItem}
                  onChange={(e) => setNewMenuItem(e.target.value)}
                  placeholder="Home"
                  className="flex-1 border border-gray-300 rounded-l-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                  onClick={addMenuItem}
                  className="bg-blue-100 text-blue-600 px-4 py-2 rounded-r-lg border border-l-0 border-gray-300 hover:bg-blue-200 transition-colors"
                >
                  <Plus className="w-4 h-4 mr-1 inline" />
                  Add Menu Items
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
                {menuItems.map((item) => (
                  <div key={item.id} className="border border-gray-300 rounded-lg p-3 flex items-center justify-between">
                    <span className="font-medium">{item.name}</span>
                    <div className="flex items-center space-x-2">
                      <button className="text-gray-400 hover:text-gray-600">
                        <Link className="w-4 h-4" />
                      </button>
                      <button className="text-gray-400 hover:text-gray-600">
                        <Edit className="w-4 h-4" />
                      </button>
                      <button onClick={() => deleteMenuItem(item.id)} className="text-red-400 hover:text-red-600">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Login/Signup Section */}
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-center space-x-2">
                    <input
                      type="text"
                      placeholder="Login"
                      className="flex-1 border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <input
                      type="text"
                      placeholder="/login"
                      className="flex-1 border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <button
                      onClick={() => setShowColorPicker(true)}
                      className="w-8 h-8 rounded-full border-2 border-gray-300"
                      style={{ backgroundColor: selectedColor }}
                    ></button>
                    <button onClick={() => setShowFontSelector(true)} className="text-blue-400 text-xl font-bold">
                      A
                    </button>
                    <button onClick={() => setShowTextStyler(true)} className="text-gray-600">
                      <div className="flex flex-col space-y-1">
                        <div className="w-4 h-0.5 bg-gray-600"></div>
                        <div className="w-4 h-0.5 bg-gray-600"></div>
                        <div className="w-4 h-0.5 bg-gray-600"></div>
                      </div>
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-center space-x-2">
                    <input
                      type="text"
                      placeholder="Sign Up"
                      className="flex-1 border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <input
                      type="text"
                      placeholder="/signup"
                      className="flex-1 border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <button
                      onClick={() => setShowColorPicker(true)}
                      className="w-8 h-8 rounded-full border-2 border-gray-300"
                      style={{ backgroundColor: selectedColor }}
                    ></button>
                    <button onClick={() => setShowFontSelector(true)} className="text-blue-400 text-xl font-bold">
                      A
                    </button>
                    <button onClick={() => setShowTextStyler(true)} className="text-gray-600">
                      <div className="flex flex-col space-y-1">
                        <div className="w-4 h-0.5 bg-gray-600"></div>
                        <div className="w-4 h-0.5 bg-gray-600"></div>
                        <div className="w-4 h-0.5 bg-gray-600"></div>
                      </div>
                    </button>
                  </div>
                </div>
              </div>

              {/* Mobile Menu Toggle */}
              <div className="mt-6 flex items-center">
                <input
                  type="checkbox"
                  id="mobileMenu"
                  checked={mobileMenuEnabled}
                  onChange={(e) => setMobileMenuEnabled(e.target.checked)}
                  className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                />
                <label htmlFor="mobileMenu" className="ml-2 text-sm font-medium text-gray-700">
                  Enable Mobile Menu Toggle
                </label>
              </div>
            </div>
          </div>
        </div>

        {/* Modals */}
        {showColorPicker && (
          <ColorPicker
            selectedColor={selectedColor}
            onColorChange={setSelectedColor}
            onClose={() => setShowColorPicker(false)}
          />
        )}

        {showFontSelector && (
          <FontSelector
            selectedFont={selectedFont}
            onFontChange={setSelectedFont}
            onClose={() => setShowFontSelector(false)}
          />
        )}

        {showTextStyler && <TextStyler onClose={() => setShowTextStyler(false)} />}
      </div>
    </SidebarLayout>
  )
}

export default HeaderSettings
