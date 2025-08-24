"use client"

import { useState } from "react"
import { X, Type, AlignLeft, AlignCenter, AlignRight } from "lucide-react"

const TextStyler = ({ onClose }) => {
  const [fontSize, setFontSize] = useState(16)
  const [fontWeight, setFontWeight] = useState("Regular")
  const [textAlign, setTextAlign] = useState("left")
  const [letterSpacing, setLetterSpacing] = useState(0)

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl w-80 max-w-sm">
        <div className="flex items-center justify-between p-4 border-b">
          <div className="flex items-center space-x-2">
            <Type className="w-4 h-4" />
            <h3 className="font-medium">Text</h3>
          </div>
          <button onClick={onClose} className="p-1 hover:bg-gray-100 rounded">
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="p-4 space-y-4">
          {/* Font Family */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Raleway</label>
          </div>

          {/* Font Weight and Size */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Weight</label>
              <select
                value={fontWeight}
                onChange={(e) => setFontWeight(e.target.value)}
                className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option>Regular</option>
                <option>Bold</option>
                <option>Light</option>
                <option>Medium</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Size</label>
              <input
                type="number"
                value={fontSize}
                onChange={(e) => setFontSize(e.target.value)}
                className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          {/* Opacity Sliders */}
          <div className="space-y-3">
            <div>
              <div className="flex items-center justify-between mb-1">
                <span className="text-sm text-gray-600">Fill</span>
                <span className="text-sm text-gray-600">100%</span>
              </div>
              <input
                type="range"
                min="0"
                max="100"
                defaultValue="100"
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
              />
            </div>

            <div>
              <div className="flex items-center justify-between mb-1">
                <span className="text-sm text-gray-600">Stroke</span>
                <span className="text-sm text-gray-600">0%</span>
              </div>
              <input
                type="range"
                min="0"
                max="100"
                defaultValue="0"
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
              />
            </div>
          </div>

          {/* Text Alignment */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Alignment</label>
            <div className="flex space-x-1">
              <button
                onClick={() => setTextAlign("left")}
                className={`p-2 rounded ${textAlign === "left" ? "bg-blue-100 text-blue-600" : "hover:bg-gray-100"}`}
              >
                <AlignLeft className="w-4 h-4" />
              </button>
              <button
                onClick={() => setTextAlign("center")}
                className={`p-2 rounded ${textAlign === "center" ? "bg-blue-100 text-blue-600" : "hover:bg-gray-100"}`}
              >
                <AlignCenter className="w-4 h-4" />
              </button>
              <button
                onClick={() => setTextAlign("right")}
                className={`p-2 rounded ${textAlign === "right" ? "bg-blue-100 text-blue-600" : "hover:bg-gray-100"}`}
              >
                <AlignRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Letter Spacing */}
          <div>
            <div className="flex items-center justify-between mb-1">
              <span className="text-sm text-gray-600">Letter Spacing</span>
              <span className="text-sm text-gray-600">{letterSpacing}</span>
            </div>
            <input
              type="range"
              min="-5"
              max="10"
              value={letterSpacing}
              onChange={(e) => setLetterSpacing(e.target.value)}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default TextStyler
