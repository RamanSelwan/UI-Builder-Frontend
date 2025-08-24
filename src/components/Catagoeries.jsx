"use client"

import { useState } from "react"
import {
  Sun,
  Moon,
  Bell,
  Settings,
  Home,
  User,
  Grid3X3,
  Info,
  ImageIcon,
  Wrench,
  Hash,
  Layers,
  Phone,
  Star,
  Sliders,
  Zap,
  FileText,
  Mail,
  LogOut,
  Edit,
  Trash2,
  Plus,
  X,
  Check,
} from "lucide-react"
import SidebarLayout from "./Sidebar"
import ColorPicker from "./ColorPicker"
import FontSelector from "./FontSelector"
import TextStyler from "./TextStyler"
import { getApiEndpoint } from "./APIConnect"

function Catagories() {
  // Cards array state
  const [cards, setCards] = useState([
    {
      categoryItems: ["Makeup Artist", "Makeup Artist"],
      newItemText: "Home",
      editingIndex: null,
      editingText: "",
      categoryImage: null,
      categoryImagePreview: null,
      color: "#000000",
      showColor: false,
      font: "inherit",
      showFont: false,
      style: {},
      showStyle: false,
    }
  ]);

  // Add new card
  const addCard = () => {
    setCards([
      ...cards,
      {
        categoryItems: [],
        newItemText: "",
        editingIndex: null,
        editingText: "",
        categoryImage: null,
        categoryImagePreview: null,
        color: "#000000",
        showColor: false,
        font: "inherit",
        showFont: false,
        style: {},
        showStyle: false,
      }
    ]);
  };

  // Card-specific handlers (index-based)
  const handleImageUpload = (event, idx) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        updateCard(idx, {
          categoryImage: file,
          categoryImagePreview: e.target.result,
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const updateCard = (idx, changes) => {
    setCards(prev =>
      prev.map((card, i) => (i === idx ? { ...card, ...changes } : card))
    );
  };

  const addCategoryItem = (idx) => {
    const card = cards[idx];
    if (card.newItemText.trim()) {
      updateCard(idx, {
        categoryItems: [...card.categoryItems, card.newItemText.trim()],
        newItemText: "",
      });
    }
  };

  const deleteCategoryItem = (cardIdx, itemIdx) => {
    const card = cards[cardIdx];
    const updatedItems = card.categoryItems.filter((_, i) => i !== itemIdx);
    updateCard(cardIdx, { categoryItems: updatedItems });
  };

  const startEditing = (cardIdx, itemIdx) => {
    const card = cards[cardIdx];
    updateCard(cardIdx, {
      editingIndex: itemIdx,
      editingText: card.categoryItems[itemIdx],
    });
  };

  const saveEdit = (cardIdx) => {
    const card = cards[cardIdx];
    if (card.editingText.trim()) {
      const updatedItems = [...card.categoryItems];
      updatedItems[card.editingIndex] = card.editingText.trim();
      updateCard(cardIdx, {
        categoryItems: updatedItems,
        editingIndex: null,
        editingText: "",
      });
    } else {
      updateCard(cardIdx, { editingIndex: null, editingText: "" });
    }
  };

  const cancelEdit = (cardIdx) => {
    updateCard(cardIdx, { editingIndex: null, editingText: "" });
  };

  // Handle save button
  const handleSave = async () => {
    const formData = new FormData();

    cards.forEach((card, idx) => {
      if (card.categoryImage) {
        formData.append(`categoryImg${idx}`, card.categoryImage);
      }
      formData.append(`categoryItems${idx}`, JSON.stringify(card.categoryItems));
      formData.append(`color${idx}`, card.color);
      formData.append(`font${idx}`, card.font);
      formData.append(`style${idx}`, JSON.stringify(card.style));
    });
    formData.append("timestamp", new Date().toISOString());
    formData.append("cardsCount", cards.length);

    try {
      const res = await fetch(getApiEndpoint('cout'), {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      if (data.success) {
        alert("Category data saved successfully!");
      } else {
        alert(data.message || "Failed to save.");
      }
    } catch (err) {
      alert("Error saving category data.");
    }
  }

  // Handle key press for editing
  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      saveEdit()
    } else if (e.key === "Escape") {
      cancelEdit()
    }
  }

  // Handle key press for new item
  const handleNewItemKeyPress = (e) => {
    if (e.key === "Enter") {
      addCategoryItem()
    }
  }

  return (
    <SidebarLayout>
      <div className="bg-gray-50 min-h-screen">
        {/* Main Content */}
        <main className="max-w-6xl mx-auto p-6">
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-3xl font-bold text-blue-600">Category Section</h1>
            <button
              onClick={addCard}
              className="bg-green-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors"
            >
              Add Card
            </button>
          </div>
          {/* Render all cards */}
          {cards.map((card, idx) => (
            <div key={idx} className="mb-10 border-b pb-8">
              {/* Image Upload */}
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center bg-white relative overflow-hidden">
                {card.categoryImagePreview ? (
                  <div className="relative">
                    <img
                      src={card.categoryImagePreview || "/placeholder.svg"}
                      alt="Category preview"
                      className="w-full h-32 object-cover rounded-lg"
                    />
                    <button
                      onClick={() =>
                        updateCard(idx, {
                          categoryImage: null,
                          categoryImagePreview: null,
                        })
                      }
                      className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ) : (
                  <div className="w-20 h-20 mx-auto mb-4 bg-pink-100 rounded-full flex items-center justify-center">
                    <User className="w-10 h-10 text-pink-400" />
                  </div>
                )}
                <div className="flex mt-2">
                  <label className="bg-gray-200 text-gray-700 px-4 py-2 rounded-l-lg border border-gray-300 cursor-pointer hover:bg-gray-300 transition-colors">
                    Choose File
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleImageUpload(e, idx)}
                      className="hidden"
                    />
                  </label>
                  <div className="flex-1 px-4 py-2 bg-white border-t border-b border-r border-gray-300 rounded-r-lg text-gray-500">
                    {card.categoryImage ? card.categoryImage.name : "No file chosen"}
                  </div>
                </div>
              </div>
              {/* Category Items */}
              <div className="mt-4">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Category Items
                </label>
                <div className="flex space-x-4 items-center">
                  <input
                    type="text"
                    value={card.newItemText}
                    onChange={(e) => updateCard(idx, { newItemText: e.target.value })}
                    onKeyPress={(e) => {
                      if (e.key === "Enter") addCategoryItem(idx);
                    }}
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter category item name"
                    style={{ color: card.color, fontFamily: card.font, ...card.style }}
                  />
                  <button
                    onClick={() => addCategoryItem(idx)}
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center"
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Add Category Items
                  </button>
                  {/* Color Picker Button */}
                  <button
                    className="w-8 h-8 rounded-full border border-gray-300"
                    style={{ backgroundColor: card.color }}
                    title="Color"
                    type="button"
                    onClick={() => updateCard(idx, { showColor: true })}
                  />
                  {card.showColor && (
                    <ColorPicker
                      selectedColor={card.color}
                      onColorChange={(c) => {
                        updateCard(idx, { color: c, showColor: false });
                      }}
                      onClose={() => updateCard(idx, { showColor: false })}
                    />
                  )}
                  {/* Font Selector Button */}
                  <button
                    className="text-blue-500 font-bold text-2xl w-8 h-8 rounded flex items-center justify-center bg-gray-100"
                    title="Font"
                    type="button"
                    onClick={() => updateCard(idx, { showFont: true })}
                  >
                    A
                  </button>
                  {/* Font Selector Modal */}
                  {card.showFont && (
                    <FontSelector
                      selectedFont={card.font}
                      onFontChange={(f) => {
                        updateCard(idx, { font: f, showFont: false });
                      }}
                      onClose={() => updateCard(idx, { showFont: false })}
                    />
                  )}

                  {/* Text Styler Button */}
                  <button
                    className="text-black font-bold text-2xl w-8 h-8 rounded flex items-center justify-center underline bg-gray-100"
                    title="Style"
                    type="button"
                    onClick={() => updateCard(idx, { showStyle: true })}
                  >
                    Aa
                  </button>
                  {/* Text Styler Modal */}
                  {card.showStyle && (
                    <TextStyler
                      selectedStyle={card.style}
                      onStyleChange={(s) => {
                        updateCard(idx, { style: s, showStyle: false });
                      }}
                      onClose={() => updateCard(idx, { showStyle: false })}
                    />
                  )}
                </div>
                {/* Category Items Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
                  {card.categoryItems.map((item, itemIdx) => (
                    <div
                      key={itemIdx}
                      className="bg-white border border-gray-200 rounded-lg p-4 flex items-center justify-between hover:shadow-md transition-shadow"
                    >
                      <div className="flex items-center flex-1">
                        <div className="w-8 h-8 bg-pink-100 rounded-full flex items-center justify-center mr-3">
                          <User className="w-4 h-4 text-pink-400" />
                        </div>
                        {card.editingIndex === itemIdx ? (
                          <input
                            type="text"
                            value={card.editingText}
                            onChange={(e) => updateCard(idx, { editingText: e.target.value })}
                            onKeyPress={(e) => {
                              if (e.key === "Enter") saveEdit(idx);
                              else if (e.key === "Escape") cancelEdit(idx);
                            }}
                            onBlur={() => saveEdit(idx)}
                            className="flex-1 px-2 py-1 border border-blue-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                            autoFocus
                          />
                        ) : (
                          <span className="font-medium text-gray-700 flex-1">
                            {item}
                          </span>
                        )}
                      </div>
                      <div className="flex items-center space-x-2 ml-2">
                        {card.editingIndex === itemIdx ? (
                          <>
                            <button
                              onClick={() => saveEdit(idx)}
                              className="p-1 text-green-500 hover:bg-green-50 rounded"
                            >
                              <Check className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => cancelEdit(idx)}
                              className="p-1 text-red-500 hover:bg-red-50 rounded"
                            >
                              <X className="w-4 h-4" />
                            </button>
                          </>
                        ) : (
                          <>
                            <button
                              onClick={() => startEditing(idx, itemIdx)}
                              className="p-1 text-blue-500 hover:bg-blue-50 rounded transition-colors"
                            >
                              <Edit className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => deleteCategoryItem(idx, itemIdx)}
                              className="p-1 text-red-500 hover:bg-red-50 rounded transition-colors"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
                {card.categoryItems.length === 0 && (
                  <div className="text-center py-12 text-gray-500">
                    <Grid3X3 className="w-12 h-12 mx-auto mb-4 opacity-50" />
                    <p>No category items yet. Add some items to get started!</p>
                  </div>
                )}
              </div>
            </div>
          ))}
          {/* Save Button */}
          <div className="flex justify-end mt-8">
            <button
              onClick={handleSave}
              className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
            >
              Save
            </button>
          </div>
        </main>
      </div>
    </SidebarLayout>
  )
}

export default Catagories
