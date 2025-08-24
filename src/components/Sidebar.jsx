import { useState } from 'react'; // Add this import
import { Outlet, NavLink, useNavigate } from 'react-router-dom';
import { RiHome2Line } from "react-icons/ri";
import { PiSignOutBold } from "react-icons/pi";

function SidebarLayout({ children }) {
  const [darkMode, setDarkMode] = useState(false); // State for dark mode
  const navigate = useNavigate();

  return (
    <div className={`flex flex-col h-screen -ml-7 w-screen ${darkMode ? 'bg-gray-900 text-white' : 'bg-white text-black'}`}>
      {/* Top Navbar */}
      <nav className={`flex items-center justify-end h-10 shadow p-6 ${darkMode ? 'bg-gray-800 text-white' : 'bg-white text-black'}`}>
        {/* Light/Dark Toggle */}
        <div className="flex items-center space-x-2">
          <span>🌞</span>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              className="sr-only peer"
              checked={darkMode}
              onChange={() => setDarkMode(!darkMode)}
            />
            <div className={`w-11 h-6 rounded-full transition-colors duration-300 ${darkMode ? 'bg-blue-600' : 'bg-gray-300'}`}>
              <div
                className={`absolute top-[2px] left-[2px] bg-white border rounded-full h-5 w-5 transition-all ${darkMode ? 'translate-x-5 border-white' : ''}`}
              ></div>
            </div>
          </label>
          <span>🌚</span>
        </div>
        {/* Notifications */}
        <div className="relative text-xl">
          🔔
          <span className="absolute top-0 right-0 block h-2 w-2 rounded-full ring-2 ring-white bg-red-500"></span>
        </div>
        {/* Settings */}
        <span className="text-xl">⚙️</span>
        {/* Profile */}
        <img
          src="https://randomuser.me/api/portraits/men/32.jpg"
          alt="Profile"
          className="w-8 h-8 rounded-full border-2 border-blue-500"
        />
      </nav>

      {/* Body */}
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <aside className={`w-64 ${darkMode ? 'bg-[#002b5c] text-white' : 'bg-[#0054B2] text-white'} h-screen p-5 text-center overflow-auto`}>
          <h2 className="text-lg font-bold mb-4 flex items-center justify-center gap-2">
            LzyCrazy UI Builder
          </h2>
          {[
            "Header",
            "Hero-Section",
            "Category",
            "About-Us",
            "Gallery",
            "Our-Services",
            "Counting-Section",
            "Includes-Section",
            "Get-In-Touch",
            "Testimonials",
            "Single-Slider",
            "Call-To-Action",
            "Blog",
            "Footer",
            "Main_Panel"
          ].map((item) => (
            <NavLink
              key={item}
              to={`/${item.toLowerCase().replace(/\s+/g, '-')}`}
              className={`hover:bg-blue-800 px-6 py-1 rounded flex items-center gap-2 ${darkMode ? 'hover:bg-blue-900' : ''}`}
            >
              <RiHome2Line className="text-lg" />
              {item}
            </NavLink>
          ))}

          <button
            onClick={() => navigate("/login")}
            className="hover:bg-blue-800 -ml-5 text-[#FF9924] font-bold-250 rounded flex items-center gap-1 mt-2 justify-center w-full text-left"
            style={{ background: "", border: "" }}
          >
            <PiSignOutBold className="text-xl " />
            Sign Out
          </button>
          <Outlet />
        </aside>

        <main className={`flex-1 p-6 overflow-auto ml-0 ${darkMode ? 'bg-gray-900 text-white' : 'bg-gray-100 text-black'}`}>
          {children /* your Header Settings component here */}
        </main>
      </div>
    </div>
  );
}
export default SidebarLayout;