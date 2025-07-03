import { useState } from "react";
import Logo from "./Logo";
import LogIn from "./LogIn";
import MENU from '../assets/menu.svg'

const Navbar = ({ user, handleLogOut, onTabClick }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleTabClick = (tab) => {
    onTabClick(tab);
    setIsMenuOpen(false); // Close menu after clicking a tab
  };

  return (
    <nav className="fixed top-0 left-1/2 -translate-x-1/2 w-2/3 z-50 rounded-lg shadow-md shadow-gray-300 bg-white flex justify-between items-center p-4">
      <Logo onTabClick={onTabClick} />

      {/* Desktop Menu */}
      <div className="hidden md:flex justify-center items-center gap-16">
        {/* Stats tab */}
        <div
          onClick={() => onTabClick('stats')}
          className="bg-neutral-900 text-white hover:bg-neutral-500 hover:border-neutral-500 hover:cursor-pointer font-bold py-2 px-8 border-b-4 mt-2 border-neutral-700 rounded-3xl"
        >
          <p className="hover:cursor-pointer">Stats</p>
        </div>

        {/* Playlist tab */}
        <div 
          onClick={() => onTabClick('playlists')}
          className="bg-neutral-900 text-white hover:bg-neutral-500 hover:border-neutral-500 hover:cursor-pointer font-bold py-2 px-8 border-b-4 mt-2 border-neutral-700 rounded-3xl"
        >
          <p className="hover:cursor-pointer">Playlist</p>
        </div>
        <LogIn user={user} handleLogOut={handleLogOut} />
      </div>

      {/* Mobile Menu Button */}
      <div className="md:hidden relative">
        <button
          onClick={toggleMenu}
          className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <img src={MENU} alt="Menu" className="w-6 h-6" />
        </button>

        {/* Mobile Dropdown Menu */}
        {isMenuOpen && (
          <div className="absolute right-0 top-full mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-2">
            {/* Stats tab */}
            <div
              onClick={() => handleTabClick('stats')}
              className="px-4 py-3 hover:bg-gray-100 cursor-pointer border-b border-gray-100"
            >
              <p className="text-neutral-900 font-semibold">Stats</p>
            </div>

            {/* Playlist tab */}
            <div
              onClick={() => handleTabClick('playlists')}
              className="px-4 py-3 hover:bg-gray-100 cursor-pointer border-b border-gray-100"
            >
              <p className="text-neutral-900 font-semibold">Playlist</p>
            </div>

            {/* Login section */}
            <div className="px-4 py-3">
              <LogIn user={user} handleLogOut={handleLogOut} />
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;