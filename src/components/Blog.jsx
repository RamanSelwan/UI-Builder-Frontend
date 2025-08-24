import { useState } from 'react';
import SidebarLayout from './Sidebar';
import ColorPicker from './ColorPicker';
import FontSelector from './FontSelector';
import TextStyler from './TextStyler';

function BlogSection() {
  const [cards, setCards] = useState([{ 
    id: 1, 
    image: null, 
    heading: '', 
    service: '', 
    name: '', 
    date: '', 
    subHeading: '' 
  }]);
  const [formData, setFormData] = useState({
    heading: '',
    bgColor: '#ffffff',
    cardOverlay: '#ffffff',
    headingColor: '#000000',
    headingFont: 'inherit',
    headingStyle: {},
  });

  // Font/Color/Style pickers for main heading
  const [showHeadingColor, setShowHeadingColor] = useState(false);
  const [showHeadingFont, setShowHeadingFont] = useState(false);
  const [showHeadingStyle, setShowHeadingStyle] = useState(false);

  const handleAddCard = () => {
    setCards([...cards, { 
      id: Date.now(), 
      image: null, 
      heading: '', 
      service: '', 
      name: '', 
      date: '', 
      subHeading: '' 
    }]);
  };

  // Delete card by id
  const handleDeleteCard = (id) => {
    setCards(cards.filter(card => card.id !== id));
  };

  // Handle card field changes
  const handleCardChange = (index, field, value) => {
    const updatedCards = [...cards];
    updatedCards[index][field] = value;
    setCards(updatedCards);
  };

  // Handle image file change
  const handleCardImageChange = (index, file) => {
    const updatedCards = [...cards];
    updatedCards[index].image = file;
    setCards(updatedCards);
  };

  // Submit handler
  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append('heading', formData.heading);
    data.append('bgColor', formData.bgColor);
    data.append('cardOverlay', formData.cardOverlay);
    data.append('headingColor', formData.headingColor);
    data.append('headingFont', formData.headingFont);
    data.append('headingStyle', JSON.stringify(formData.headingStyle));
    // Prepare cards array without images
    data.append('cards', JSON.stringify(cards.map((card, idx) => ({
      heading: card.heading,
      service: card.service,
      name: card.name,
      date: card.date,
      subHeading: card.subHeading
      // image will be handled separately
    }))));
    // Append images with unique field names (image0, image1, ...)
    cards.forEach((card, idx) => {
      if (card.image) {
        data.append(`image${idx}`, card.image);
      }
    });

    try {
      const res = await fetch('http://localhost:5002/api/auth/blog', {
        method: 'POST',
        body: data,
      });
      const result = await res.json();
      if (result.success) {
        alert('Blog section saved!');
      } else {
        alert(result.message || 'Failed to save.');
      }
    } catch (err) {
      alert('Error saving blog section.');
    }
  };

  return (
    <SidebarLayout>
      <form onSubmit={handleSubmit}>
        <div
          className="max-w-3xl mx-auto p-6 rounded-xl shadow-lg"
          style={{ backgroundColor: formData.bgColor }}
        >
          <h2 className="text-2xl font-bold mb-6 text-center text-blue-600">Blog Section</h2>
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-semibold mb-1 text-gray-800">Heading</label>
              <div className="flex items-center gap-2">
                <input
                  placeholder="HAIR SALON, MASSAGES, BEAUTY SALON"
                  className="w-full px-2 py-1 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                  value={formData.heading}
                  onChange={e => setFormData({ ...formData, heading: e.target.value })}
                  style={{
                    color: formData.headingColor,
                    fontFamily: formData.headingFont,
                    ...formData.headingStyle,
                  }}
                />
                <div className="flex items-center gap-1">
                  {/* Color Picker Button */}
                  <button
                    className="w-7 h-7 rounded-full border border-gray-300"
                    style={{ backgroundColor: formData.headingColor }}
                    title="Color"
                    type="button"
                    onClick={() => setShowHeadingColor(true)}
                  />
                  {/* Font Selector Button */}
                  <button
                    className="text-blue-500 font-bold text-base w-7 h-7 rounded flex items-center justify-center bg-gray-100"
                    title="Font"
                    type="button"
                    onClick={() => setShowHeadingFont(true)}
                  >
                    A
                  </button>
                  {/* Text Styler Button */}
                  <button
                    className="text-gray-700 font-bold text-base w-7 h-7 rounded flex items-center justify-center underline bg-gray-100"
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
                    selectedColor={formData.headingColor}
                    onColorChange={c => {
                      setFormData({ ...formData, headingColor: c });
                      setShowHeadingColor(false);
                    }}
                    onClose={() => setShowHeadingColor(false)}
                  />
                )}
                {showHeadingFont && (
                  <FontSelector
                    selectedFont={formData.headingFont}
                    onFontChange={f => {
                      setFormData({ ...formData, headingFont: f });
                      setShowHeadingFont(false);
                    }}
                    onClose={() => setShowHeadingFont(false)}
                  />
                )}
                {showHeadingStyle && (
                  <TextStyler
                    selectedStyle={formData.headingStyle}
                    onStyleChange={s => {
                      setFormData({ ...formData, headingStyle: s });
                      setShowHeadingStyle(false);
                    }}
                    onClose={() => setShowHeadingStyle(false)}
                  />
                )}
              </div>
            </div>
            <div className="flex items-center gap-5">
              <div className='flex  flex-row gap-12'>
                <div>
                  <label className="block text-sm font-semibold mb-1 text-gray-700">Container Fluid BG Color</label>
                  <div className='border h-10 w-50 p-1 border-gray-400 rounded flex items-center gap-2'>
                    <input
                      type="color"
                      value={formData.bgColor}
                      className="w-5 h-5 p-2 border rounded-full cursor-pointer bg-black"
                      onChange={e => setFormData({ ...formData, bgColor: e.target.value })}
                    />
                    <input
                      type="text"
                      value={formData.bgColor}
                      onChange={e => setFormData({ ...formData, bgColor: e.target.value })}
                      className="w-24 px-2 py-1 border rounded"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-1 text-gray-700">Card Overlay</label>
                  <div className='border h-10 w-50 p-1 border-gray-400 rounded flex items-center gap-2'>
                    <input
                      type="color"
                      value={formData.cardOverlay}
                      className="w-5 h-5 p-2 rounded-full cursor-pointer bg-black"
                      onChange={e => setFormData({ ...formData, cardOverlay: e.target.value })}
                    />
                    <input
                      type="text"
                      value={formData.cardOverlay}
                      onChange={e => setFormData({ ...formData, cardOverlay: e.target.value })}
                      className="w-24 px-2 py-1 border rounded"
                    />
                  </div>
                </div>
              </div>
            </div>

            {cards.map((card, index) => (
              <div
                key={card.id}
                className="bg-white p-6 rounded-lg shadow border border-gray-200 space-y-4 relative"
                style={{ backgroundColor: formData.cardOverlay }}
              >
                {/* Delete Card Button */}
                <button
                  type="button"
                  className="absolute top-2 right-2 text-red-500 hover:bg-red-100 rounded-full p-1"
                  onClick={() => handleDeleteCard(card.id)}
                  title="Delete Card"
                >
                  &#10005;
                </button>
                <div>
                  <label className="block text-sm font-semibold mb-1 text-gray-700">Card Image</label>
                  <input 
                    type="file" 
                    className="w-full" 
                    onChange={e => handleCardImageChange(index, e.target.files[0])}
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-1 text-gray-700">Heading</label>
                  <input
                    placeholder="HAIR SALON, MASSAGES, BEAUTY SALON"
                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                    value={card.heading}
                    onChange={e => handleCardChange(index, 'heading', e.target.value)}
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-1 text-gray-700">Service</label>
                  <input
                    placeholder="HAIR SALON, MASSAGES, BEAUTY SALON"
                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                    value={card.service}
                    onChange={e => handleCardChange(index, 'service', e.target.value)}
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-1 text-gray-700">Name</label>
                  <input
                    placeholder="HAIR SALON, MASSAGES, BEAUTY SALON"
                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                    value={card.name}
                    onChange={e => handleCardChange(index, 'name', e.target.value)}
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-1 text-gray-700">Date</label>
                  <input
                    type="date"
                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                    value={card.date}
                    onChange={e => handleCardChange(index, 'date', e.target.value)}
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-1 text-gray-700">Sub Heading</label>
                  <input
                    placeholder="HAIR SALON, MASSAGES, BEAUTY SALON"
                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                    value={card.subHeading}
                    onChange={e => handleCardChange(index, 'subHeading', e.target.value)}
                  />
                </div>
              </div>
            ))}
            <button
              onClick={handleAddCard}
              className="mt-2 px-4 py-2 border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 transition"
              type="button"
            >
              + Add Card
            </button>
            <button
              className="mt-4 w-full px-4 py-2 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition"
              type="submit"
            >
              Save
            </button>
          </div>
        </div>
      </form>
    </SidebarLayout>
  );
}

export default BlogSection;
