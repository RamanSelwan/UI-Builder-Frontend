"use client"

import { Type, Bold } from "lucide-react"

const TextInput = ({ label, value, onChange }) => {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">{label}</label>
      <div className="relative">
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full px-3 py-2 pr-24 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        />
        <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-1">
          <button className="w-6 h-6 bg-black rounded-full"></button>
          <button className="p-1 hover:bg-gray-100 rounded">
            <Type size={16} className="text-blue-500" />
          </button>
          <button className="p-1 hover:bg-gray-100 rounded">
            <Bold size={16} className="text-gray-600" />
          </button>
        </div>
      </div>
    </div>
  )
}

export default TextInput
