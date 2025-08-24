"use client"

import { useState } from "react"
import { X, Search } from "lucide-react"

const FontSelector = ({ selectedFont, onFontChange, onClose }) => {
  const [searchTerm, setSearchTerm] = useState("")

  const fonts = [
    "Ramabhadra",
    "Ramaraja",
    "Raleway",
    "Rammetto One",
    "Rangart Dua",
    "Radio Canada",
    "Radley",
    "Righthand",
    "Roblas",
    "Roboto",
    "Roboto Condensed",
    "Roboto Mono",
    "Roboto Slab",
  ]

  const filteredFonts = fonts.filter((font) => font.toLowerCase().includes(searchTerm.toLowerCase()))

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl w-80 max-w-sm max-h-96">
        <div className="flex items-center justify-between p-4 border-b">
          <h3 className="font-medium">All fonts</h3>
          <button onClick={onClose} className="p-1 hover:bg-gray-100 rounded">
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="p-4">
          <div className="relative mb-4">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search fonts"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="max-h-64 overflow-y-auto">
            {filteredFonts.map((font) => (
              <button
                key={font}
                onClick={() => {
                  onFontChange(font)
                  onClose()
                }}
                className={`w-full text-left px-3 py-2 hover:bg-gray-100 rounded transition-colors ${
                  selectedFont === font ? "bg-blue-100 text-blue-600" : ""
                }`}
                style={{ fontFamily: font }}
              >
                {font}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default FontSelector
