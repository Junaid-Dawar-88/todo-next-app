"use client";

import Link from "next/link";
import React from "react";

interface SidebarProps {
  sidebarOpen: boolean;
  setSidebarOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const Sidebar: React.FC<SidebarProps> = ({ sidebarOpen, setSidebarOpen }) => {
  return (
    <>
      {/* Overlay for mobile */}
      <div
        className={`fixed inset-0 bg-black bg-opacity-50 z-20 md:hidden transition-opacity ${
          sidebarOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
        onClick={() => setSidebarOpen(false)}
      ></div>

      {/* Sidebar */}
      <div
        className={`
          fixed top-16 left-0 z-30 w-64 h-full bg-[#0f0f11] border-r border-[#2a2a30] p-6 flex flex-col
          transform transition-transform duration-300
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} 
          md:translate-x-0 md:static md:h-screen
        `}
      >
        <h2 className="text-gray-400 text-xs tracking-widest uppercase mb-6">
          Menu
        </h2>
        <ul className="flex flex-col gap-3">
          <li>
            <Link
              href="/"
              className="block px-4 py-2 rounded-sm text-gray-300 hover:bg-gray-800 hover:text-white transition"
              onClick={() => setSidebarOpen(false)}
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              href="/todo-table"
              className="block px-4 py-2 rounded-sm text-gray-300 hover:bg-gray-800 hover:text-white transition"
              onClick={() => setSidebarOpen(false)}
            >
              Create Todo
            </Link>
          </li>
        </ul>
        <div className="mt-auto text-gray-500 text-xs">
          &copy; 2026 My App
        </div>
      </div>
    </>
  );
};

export default Sidebar;