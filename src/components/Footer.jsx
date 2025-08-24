import React, { useState } from "react";
import SidebarLayout from "./Sidebar";
import { getApiEndpoint } from "./APIConnect";

const initialMenuItems = [
  { id: 1, name: "Home" },
  { id: 2, name: "About Us" },
  { id: 3, name: "Services" },
  { id: 4, name: "Testimonials" },
  { id: 5, name: "Blog" },
  { id: 6, name: "Contact Us" },
];

const initialHeadings = [
  { id: 1, value: "Explore" },
  { id: 2, value: "Discover" },
];

const initialCopyrights = [
  { id: 1, value: "© 2025 Stylicle" },
];

function IconTrash() {
  return (
    <svg
      className="w-5 h-5 text-blue-500 hover:text-blue-700"
      fill="none"
      viewBox="0 0 20 20"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M6 8v8M10 8v8m4-8v8M4 6h12M9 3h2a1 1 0 011 1v1H8V4a1 1 0 011-1z"
      />
    </svg>
  );
}

function IconEdit() {
  return (
    <svg
      className="w-5 h-5 text-blue-500 hover:text-blue-700"
      fill="none"
      viewBox="0 0 20 20"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M15.232 5.232l3.536 3.536M9 13h3v3M16.364 3.636a2 2 0 00-2.828 0L3 13.172V17h3.828L16.364 6.464A2 2 0 0016.364 3.636z"
      />
    </svg>
  );
}

function ColorPickerCircle({ color, onChange }) {
  const inputId = `color-input-${Math.random()}`;
  return (
    <span className="relative flex items-center">
      <span
        className="w-5 h-5 rounded-full border-2 border-gray-300 cursor-pointer"
        style={{ backgroundColor: color }}
        onClick={() => document.getElementById(inputId)?.click()}
        tabIndex={0}
        title="Pick color"
        aria-label="Open color picker"
      />
      <input
        id={inputId}
        type="color"
        className="absolute top-0 left-0 opacity-0 w-5 h-5 cursor-pointer"
        value={color}
        onChange={(e) => onChange(e.target.value)}
        tabIndex={-1}
        aria-hidden="true"
      />
    </span>
  );
}

// Social media SVG icons
const socialIcons = [
  {
    name: "Facebook",
    svg: (
      <svg className="w-5 h-5 text-blue-600" fill="currentColor" viewBox="0 0 24 24">
        <path d="M22 12.07C22 6.48 17.52 2 12 2S2 6.48 2 12.07c0 5.02 3.66 9.16 8.44 9.93v-7.03H7.9v-2.9h2.54V9.84c0-2.5 1.49-3.89 3.77-3.89 1.09 0 2.23.2 2.23.2v2.45h-1.26c-1.24 0-1.63.77-1.63 1.56v1.87h2.78l-.44 2.9h-2.34v7.03C18.34 21.23 22 17.09 22 12.07z" />
      </svg>
    ),
  },
  {
    name: "Twitter",
    svg: (
      <svg className="w-5 h-5 text-blue-400" fill="currentColor" viewBox="0 0 24 24">
        <path d="M22.46 6c-.77.35-1.6.59-2.47.7a4.3 4.3 0 001.88-2.38 8.59 8.59 0 01-2.72 1.04A4.28 4.28 0 0016.11 4c-2.37 0-4.29 1.92-4.29 4.29 0 .34.04.67.11.99C7.69 9.13 4.07 7.38 1.64 4.7c-.37.64-.58 1.38-.58 2.17 0 1.5.76 2.82 1.92 3.6-.71-.02-1.38-.22-1.97-.54v.05c0 2.1 1.5 3.85 3.5 4.25-.36.1-.74.16-1.13.16-.28 0-.54-.03-.8-.08.54 1.7 2.11 2.94 3.97 2.97A8.6 8.6 0 012 19.54c-.29 0-.58-.02-.86-.05A12.13 12.13 0 006.29 21c7.55 0 11.68-6.26 11.68-11.68 0-.18-.01-.36-.02-.54A8.18 8.18 0 0022.46 6z" />
      </svg>
    ),
  },
  {
    name: "Instagram",
    svg: (
      <svg className="w-5 h-5 text-pink-500" fill="currentColor" viewBox="0 0 24 24">
        <path d="M7.75 2h8.5A5.75 5.75 0 0122 7.75v8.5A5.75 5.75 0 0116.25 22h-8.5A5.75 5.75 0 012 16.25v-8.5A5.75 5.75 0 017.75 2zm0 1.5A4.25 4.25 0 003.5 7.75v8.5A4.25 4.25 0 007.75 20.5h8.5a4.25 4.25 0 004.25-4.25v-8.5A4.25 4.25 0 0016.25 3.5h-8.5zm4.25 2.75a5.75 5.75 0 110 11.5 5.75 5.75 0 010-11.5zm0 1.5a4.25 4.25 0 100 8.5 4.25 4.25 0 000-8.5zm5.25 1.25a1 1 0 110 2 1 1 0 010-2z" />
      </svg>
    ),
  },
];

function ContactSection({ contactHeading, setContactHeading, contactDetails, setContactDetails }) {
  // Handler for editing contact detail fields
  const handleDetailChange = (index, field, value) => {
    const updated = contactDetails.map((item, i) =>
      i === index
        ? field === "label"
          ? [value, item[1]]
          : [item[0], value]
        : item
    );
    setContactDetails(updated);
  };

  // Handler to add a new contact detail row
  const addContactDetail = () => {
    setContactDetails([...contactDetails, ["", ""]]);
  };

  // Handler to delete a contact detail row
  const deleteContactDetail = (index) => {
    setContactDetails(contactDetails.filter((_, i) => i !== index));
  };

  return (
    <div className="mb-6 p-4 bg-blue-50 rounded">
      <div className="mb-4 flex items-center gap-2">
        <input
          className="font-bold text-lg border-b border-gray-300 focus:outline-none bg-blue-50"
          value={contactHeading}
          onChange={e => setContactHeading(e.target.value)}
        />
      </div>
      <div className="mb-3">
        <span className="font-bold">Explore</span>
      </div>
      {contactDetails.map(([label, value], idx) => (
        <div className="flex mb-2 gap-3" key={idx}>
          <div className="w-56">
            <input
              className="border rounded px-2 py-1 w-full"
              value={label}
              placeholder="Label"
              onChange={e => handleDetailChange(idx, "label", e.target.value)}
            />
          </div>
          <div className="flex-1 flex gap-2">
            <input
              className="border rounded px-2 py-1 w-full"
              value={value}
              placeholder="Value"
              onChange={e => handleDetailChange(idx, "value", e.target.value)}
            />
            <button
              className="text-red-400 hover:text-red-600 px-2"
              onClick={() => deleteContactDetail(idx)}
              title="Delete"
              type="button"
            >
              <IconTrash />
            </button>
          </div>
        </div>
      ))}
      <button
        className="mt-2 px-3 py-1 bg-blue-200 rounded text-xs font-semibold hover:bg-blue-300 transition"
        onClick={addContactDetail}
        type="button"
      >
        + Add Contact Detail
      </button>
    </div>
  );
}

export default function Footer() {
  const [menuItems, setMenuItems] = useState(initialMenuItems);
  const [headings, setHeadings] = useState(initialHeadings);
  const [headings2, setHeadings2] = useState(initialHeadings); // For Heading List 2
  const [copyrights, setCopyrights] = useState(initialCopyrights);
  const [contactHeading, setContactHeading] = useState("Contact Heading");
  const [contactDetailsState, setContactDetails] = useState([
    ["Address Heading", "Address"],
    ["Mail", "example@gmail.com"],
    ["Phone", "+91 7457024841"],
  ]);

  // Logo upload state
  const [logoUrl, setLogoUrl] = useState("https://via.placeholder.com/120x60.png?text=STYLICLE");
  const handleLogoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setLogoUrl(URL.createObjectURL(file));
    }
  };

  // Delete handlers
  const deleteMenuItem = (id) => setMenuItems(menuItems.filter(item => item.id !== id));
  const deleteHeading = (id) => setHeadings(headings.filter(h => h.id !== id));
  const deleteHeading2 = (id) => setHeadings2(headings2.filter(h => h.id !== id));
  const deleteCopyright = (id) => setCopyrights(copyrights.filter(c => c.id !== id));

  // Add handlers
  const addHeading = () => setHeadings([...headings, { id: Date.now(), value: "New Heading" }]);
  const addHeading2 = () => setHeadings2([...headings2, { id: Date.now(), value: "New Heading" }]);
  const addCopyright = () =>
    setCopyrights([...copyrights, { id: Date.now(), value: "© 2025 Stylicle" }]);

  // Social icons state
  const [socialList, setSocialList] = useState([
    { id: 1, icon: socialIcons[0] },
    { id: 2, icon: socialIcons[1] },
    { id: 3, icon: socialIcons[2] },
  ]);
  const deleteSocial = (id) => setSocialList(socialList.filter(s => s.id !== id));
  const addSocial = () => {
    const nextIcon = socialIcons[socialList.length % socialIcons.length];
    setSocialList([...socialList, { id: Date.now(), icon: nextIcon }]);
  };

  const handleSave = async () => {
    const formData = new FormData();

    // Logo image (get the File object from the input)
    const logoInput = document.querySelector('input[type="file"]');
    if (logoInput && logoInput.files[0]) {
      formData.append("logo", logoInput.files[0]);
    }

    // Social icons (convert to array of {name, icon})
    formData.append("socialIcons", JSON.stringify(
      socialList.map(item => ({
        name: item.icon.name,
        icon: item.icon.svg ? "" : item.icon // If you store SVG as string, else leave blank
      }))
    ));

    // Headings
    formData.append("headings1", JSON.stringify(headings.map(h => ({ value: h.value }))));
    formData.append("headings2", JSON.stringify(headings2.map(h => ({ value: h.value }))));

    // Menu items
    formData.append("menuItems", JSON.stringify(menuItems.map(m => ({ name: m.name }))));

    // Contact
    formData.append("contactHeading", contactHeading);
    formData.append("contactDetails", JSON.stringify(
      contactDetailsState.map(([label, value]) => ({ label, value }))
    ));

    // Copyrights
    formData.append("copyrights", JSON.stringify(copyrights.map(c => ({ value: c.value }))));

    try {
      const res = await fetch(getApiEndpoint('footer'), {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      if (data.success) {
        alert("Footer saved!");
      } else {
        alert(data.message || "Failed to save.");
      }
    } catch (err) {
      alert("Error saving footer.");
    }
  };

  return (
    <SidebarLayout>
      <div className="min-h-screen bg-white flex flex-col items-center justify-start py-8">
        <div className="w-[98%] max-w-3xl rounded-xl shadow-md bg-white p-6 border">
          {/* Header */}
          <h2 className="text-2xl font-bold text-blue-700 mb-4">Footer Section</h2>

          {/* Logo Upload */}
          <div className="flex items-center mb-8">
            <div className="w-32 h-32 flex-shrink-0 rounded-md bg-gray-100 border flex items-center justify-center overflow-hidden mr-6">
              <img
                src={logoUrl}
                alt="logo"
                className="object-contain"
              />
            </div>
            <div className="flex-1">
              <label className="block font-bold mb-1 text-sm">
                Footer Logo Upload
              </label>
              <input
                type="file"
                className="block w-full text-xs text-gray-500 border border-gray-300 rounded p-1"
                onChange={handleLogoChange}
                accept="image/*"
              />
            </div>
          </div>

          {/* Social Icons */}
          <div className="mb-4">
            <span className="font-bold block mb-3">Social Icons</span>
            <div className="flex flex-row items-center gap-4">
              {socialList.map((item) => (
                <div
                  key={item.id}
                  className="relative flex items-center justify-center w-10 h-10 rounded-full bg-gray-100 border"
                >
                  {item.icon.svg}
                  <button
                    className="absolute -top-2 -right-2 bg-white border border-gray-300 rounded-full p-1 text-red-500 hover:bg-red-100"
                    aria-label="Delete Social Icon"
                    onClick={() => deleteSocial(item.id)}
                  >
                    <IconTrash />
                  </button>
                </div>
              ))}
              <button
                className="ml-2 px-3 py-2 bg-blue-200 rounded-full text-xs font-semibold hover:bg-blue-300 transition"
                onClick={addSocial}
                type="button"
              >
                + Add
              </button>
            </div>
          </div>

          {/* Heading List 1 */}
          <div className="mb-6">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-lg font-bold">Heading List 1</h3>
              <button
                onClick={addHeading}
                className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 text-sm"
                type="button"
              >
                + Add Heading
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {headings.map((item) => (
                <div key={item.id} className="border border-gray-300 rounded-lg p-3 flex items-center justify-between">
                  <span className="font-medium">{item.value}</span>
                  <button
                    onClick={() => deleteHeading(item.id)}
                    className="text-red-400 hover:text-red-600"
                  >
                    <IconTrash />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Heading List 2 */}
          <div className="mb-6">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-lg font-bold">Heading List 2</h3>
              <button
                onClick={addHeading2}
                className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 text-sm"
                type="button"
              >
                + Add Heading
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {headings2.map((item) => (
                <div key={item.id} className="border border-gray-300 rounded-lg p-3 flex items-center justify-between">
                  <span className="font-medium">{item.value}</span>
                  <button
                    onClick={() => deleteHeading2(item.id)}
                    className="text-red-400 hover:text-red-600"
                  >
                    <IconTrash />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Menu Items */}
          <div className="mb-6">
            <h3 className="text-lg font-bold mb-2">Menu Items</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {menuItems.map((item) => (
                <div key={item.id} className="border border-gray-300 rounded-lg p-3 flex items-center justify-between">
                  <span className="font-medium">{item.name}</span>
                  <button
                    onClick={() => deleteMenuItem(item.id)}
                    className="text-red-400 hover:text-red-600"
                  >
                    <IconTrash />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Contact Section */}
          <ContactSection
            contactHeading={contactHeading}
            setContactHeading={setContactHeading}
            contactDetails={contactDetailsState}
            setContactDetails={setContactDetails}
          />

          {/* Copyright Section */}
          <div className="mb-6">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-lg font-bold">Copyright</h3>
              <button
                onClick={addCopyright}
                className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 text-sm"
                type="button"
              >
                + Add Copyright
              </button>
            </div>
            <div className="grid grid-cols-1 gap-4">
              {copyrights.map((c) => (
                <div key={c.id} className="border border-gray-300 rounded-lg p-3 flex items-center justify-between">
                  <span className="font-medium">{c.value}</span>
                  <button
                    onClick={() => deleteCopyright(c.id)}
                    className="text-red-400 hover:text-red-600"
                  >
                    <IconTrash />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Save Button */}
          <div className="mt-4">
            <button
              className="bg-blue-600 text-white font-semibold py-2 px-8 rounded-lg hover:bg-blue-700 transition-colors"
              onClick={handleSave}
              type="button"
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </SidebarLayout>
  );
}
