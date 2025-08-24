"use client"

import { useState } from "react"
import { X, Palette, Pipette } from "lucide-react"

const ColorPicker = ({ selectedColor, onColorChange, onClose }) => {
  const [activeTab, setActiveTab] = useState("Custom")
  const [hexValue, setHexValue] = useState(selectedColor.replace("#", ""))
  const [opacity, setOpacity] = useState(100)

  const predefinedColors = [
    "#000000",
    "#333333",
    "#666666",
    "#999999",
    "#CCCCCC",
    "#FFFFFF",
    "#FF0000",
    "#FF6600",
    "#FFCC00",
    "#FFFF00",
    "#CCFF00",
    "#66FF00",
    "#00FF00",
    "#00FF66",
    "#00FFCC",
    "#00FFFF",
    "#00CCFF",
    "#0066FF",
    "#0000FF",
    "#6600FF",
    "#CC00FF",
    "#FF00FF",
    "#FF00CC",
    "#FF0066",
  ]

  const handleHexChange = (value) => {
    setHexValue(value)
    if (value.length === 6) {
      onColorChange(`#${value}`)
    }
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl w-80 max-w-sm">
        <div className="flex items-center justify-between p-4 border-b">
          <div className="flex space-x-4">
            <button
              onClick={() => setActiveTab("Custom")}
              className={`px-3 py-1 rounded ${
                activeTab === "Custom" ? "bg-gray-800 text-white" : "bg-gray-200 text-gray-700"
              }`}
            >
              Custom
            </button>
            <button
              onClick={() => setActiveTab("Libraries")}
              className={`px-3 py-1 rounded ${
                activeTab === "Libraries" ? "bg-gray-800 text-white" : "bg-gray-200 text-gray-700"
              }`}
            >
              Libraries
            </button>
          </div>
          <div className="flex items-center space-x-2">
            <button className="p-1 hover:bg-gray-100 rounded">
              <Palette className="w-4 h-4" />
            </button>
            <button onClick={onClose} className="p-1 hover:bg-gray-100 rounded">
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div className="p-4">
          {/* Color Preview */}
          <div className="mb-4">
            <div
              className="w-full h-32 rounded-lg border-2 border-gray-300 mb-2"
              style={{
                background: `linear-gradient(135deg, ${selectedColor} 0%, #000000 100%)`,
              }}
            ></div>

            {/* Color Controls */}
            <div className="flex items-center space-x-2 mb-2">
              <Palette className="w-4 h-4 text-gray-500" />
              <div className="flex-1">
                <div className="w-full h-2 bg-gradient-to-r from-red-500 via-yellow-500 via-green-500 via-blue-500 to-purple-500 rounded"></div>
                <div className="w-full h-2 bg-gradient-to-r from-transparent to-black rounded mt-1"></div>
              </div>
              <Pipette className="w-4 h-4 text-gray-500" />
            </div>

            {/* Opacity Slider */}
            <div className="mb-4">
              <div className="flex items-center justify-between mb-1">
                <span className="text-sm text-gray-600">Opacity</span>
                <span className="text-sm text-gray-600">{opacity}%</span>
              </div>
              <input
                type="range"
                min="0"
                max="100"
                value={opacity}
                onChange={(e) => setOpacity(e.target.value)}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
              />
            </div>

            {/* Hex Input */}
            <div className="flex items-center space-x-2 mb-4">
              <span className="text-sm text-gray-600">Hex</span>
              <div className="flex items-center">
                <span className="text-sm text-gray-600 mr-1">#</span>
                <input
                  type="text"
                  value={hexValue}
                  onChange={(e) => handleHexChange(e.target.value)}
                  className="border border-gray-300 rounded px-2 py-1 text-sm w-20"
                  maxLength="6"
                />
              </div>
              <span className="text-sm text-gray-600">{opacity}%</span>
            </div>
          </div>

          {/* On this page section */}
          <div className="mb-4">
            <h4 className="text-sm font-medium text-gray-700 mb-2">On this page</h4>
            <div className="grid grid-cols-8 gap-1">
              {predefinedColors.map((color, index) => (
                <button
                  key={index}
                  onClick={() => onColorChange(color)}
                  className="w-6 h-6 rounded border border-gray-300 hover:scale-110 transition-transform"
                  style={{ backgroundColor: color }}
                ></button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ColorPicker