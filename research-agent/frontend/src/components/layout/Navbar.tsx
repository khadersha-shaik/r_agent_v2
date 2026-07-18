"use client";

import { Bell, Search, Sun, Moon } from "lucide-react";
import Link from "next/link";

export default function Navbar() {
  return (
    <header className="h-16 sticky top-0 z-30 bg-white/80 backdrop-blur-md border-b border-slate-200/80 px-6 flex items-center justify-between select-none">
      {/* Brand logo for mobile only */}
      <div className="flex items-center space-x-2 md:hidden pl-10">
        <span className="font-black text-lg bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
          Research Agent
        </span>
      </div>

      {/* Global Search Bar */}
      <div className="hidden sm:flex items-center flex-1 max-w-md bg-slate-50 border border-slate-200 rounded-xl px-3 py-1.5 focus-within:border-blue-500 focus-within:bg-white focus-within:ring-1 focus-within:ring-blue-500/20 transition-all">
        <Search size={16} className="text-slate-400 mr-2 flex-shrink-0" />
        <input
          type="text"
          placeholder="Global search papers, authors, collections (Press ⌘K)..."
          className="bg-transparent border-none text-sm w-full outline-none text-slate-800 placeholder-slate-400"
          readOnly
        />
        <kbd className="hidden md:inline-flex h-5 items-center gap-1 rounded border border-slate-200 bg-white px-1.5 font-mono text-[10px] font-medium text-slate-400 shadow-sm ml-2">
          ⌘K
        </kbd>
      </div>

      {/* Actions */}
      <div className="flex items-center space-x-4 ml-auto">
        {/* Future Theme Switch Placeholder */}
        <button
          className="p-2 text-slate-400 hover:text-blue-600 hover:bg-slate-50 rounded-xl transition-all"
          title="Theme Toggle (Placeholder)"
        >
          <Sun size={18} className="block dark:hidden" />
          <Moon size={18} className="hidden dark:block" />
        </button>

        {/* Notifications */}
        <button className="p-2 text-slate-400 hover:text-blue-600 hover:bg-slate-50 rounded-xl transition-all relative">
          <Bell size={18} />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-blue-600 rounded-full ring-2 ring-white" />
        </button>

        {/* Profile Avatar */}
        <Link href="/profile" className="flex items-center space-x-2 group">
          <div className="w-8 h-8 rounded-full bg-blue-100 hover:bg-blue-200 text-blue-600 border border-blue-200 flex items-center justify-center font-bold text-sm shadow-sm transition-all">
            SJ
          </div>
          <span className="hidden md:block text-sm font-semibold text-slate-700 group-hover:text-blue-600 transition-colors font-sans">
            Dr. Sarah Jenkins
          </span>
        </Link>
      </div>
    </header>
  );
}
