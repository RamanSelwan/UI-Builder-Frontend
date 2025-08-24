import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getApiEndpoint } from "../APIConnect";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [headerData, setHeaderData] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetch(getApiEndpoint('header1'))
      .then((res) => res.json())
      .then((data) => {
        console.log("Header API Response:", data);
        if (data.success && data.data) setHeaderData(data.data);
      });
  }, []);

  const toggleMenu = () => setMenuOpen(!menuOpen);

  return (
    <nav className="bg-white shadow-md px-4 py-3">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <div className="text-3xl font-bold text-[#8D3D8C]">
          {headerData?.siteTitle || "STYLICLE"}
        </div>

        <div className="md:hidden">
          <button onClick={toggleMenu} className="focus:outline-none">
            <svg
              className="w-6 h-6 text-black"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {menuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>
        <div
          className={`flex-col md:flex md:flex-row md:items-center md:space-x-8 space-y-4 md:space-y-0 mt-4 md:mt-0 ${
            menuOpen ? "flex" : "hidden"
          } md:flex`}
        >
          {headerData?.menuItems?.map((item, idx) => (
            <a
              key={idx}
              href={item.url}
              className="text-black hover:text-[#8D3D8C] font-normal"
            >
              {item.name}
            </a>
          ))}

          <button
            onClick={() => navigate("/login")}
            className="bg-black text-white px-3 py-1 rounded hover:bg-gray-800 transition text-center"
          >
            {headerData?.signupLabel || "Signout"}
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
