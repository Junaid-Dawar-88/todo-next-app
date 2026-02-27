"use client";
import React from "react";
import Link from "next/link";

const Home = () => {
  return (
    <div className="min-h-screen bg-[#0a0a0f] text-gray-200 font-mono flex flex-col">

      <header className="flex-1 flex flex-col items-center justify-center text-center px-6">
        <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 tracking-tight">
          Welcome to <span className="text-green-500">Todo Next App</span>
        </h1>
        <p className="text-gray-400 text-lg md:text-xl max-w-xl mb-8">
          Keep track of your tasks, prioritize efficiently, and stay productive
          with a clean and modern Todo dashboard.
        </p>

        <div className="flex flex-col sm:flex-row gap-4">
          <Link
            href="/todo-table"
            className="px-6 py-3 bg-green-500 text-[#0f0f11] font-semibold rounded-md shadow-md hover:bg-green-600 transition"
          >
            View Todos
          </Link>
          <Link
            href="/todo-table"
            className="px-6 py-3 border border-green-500 text-green-500 font-semibold rounded-md hover:bg-green-600 hover:text-[#0f0f11] transition"
          >
            Add Todo
          </Link>
        </div>
      </header>

      <footer className="text-center py-6 text-gray-500 text-sm">
        &copy; 2026 Todo Next App. All rights reserved.
      </footer>
    </div>
  );
};

export default Home;