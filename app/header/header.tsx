"use client";

import React from "react";

interface HeaderProps {
  sidebarOpen: boolean;
  setSidebarOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const Header: React.FC<HeaderProps> = ({ sidebarOpen, setSidebarOpen }) => {
  return (
    <header className="w-full bg-[#1a1a1f] h-16 flex items-center justify-between px-4 shadow-md z-40">
      <div className="text-white font-bold text-lg">Todo Next App</div>

      {/* Mobile Hamburger */}
      <button
        className="md:hidden text-white p-2 rounded-md bg-gray-800 hover:bg-gray-700 transition"
        onClick={() => setSidebarOpen(!sidebarOpen)}
      >
        {sidebarOpen ? "✕" : "☰"}
      </button>
    </header>
  );
};

export default Header;