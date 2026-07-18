"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import {
  LayoutDashboard,
  Search,
  UploadCloud,
  BookOpen,
  MessageSquare,
  BarChart3,
  Newspaper,
  TrendingUp,
  Settings,
  User,
  LogOut,
  ChevronLeft,
  ChevronRight,
  Menu,
  X,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface SidebarProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

export default function Sidebar({ isOpen, setIsOpen }: SidebarProps) {
  const pathname = usePathname();
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const menuItems = [
    { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
    { name: "Paper Search", href: "/papers", icon: Search },
    { name: "Upload Papers", href: "/upload", icon: UploadCloud },
    { name: "Research Library", href: "/library", icon: BookOpen },
    { name: "AI Chat", href: "/chat", icon: MessageSquare },
    { name: "Analytics", href: "/analytics", icon: BarChart3 },
    { name: "Research News", href: "/news", icon: Newspaper },
    { name: "Trending Topics", href: "/trending", icon: TrendingUp },
    { name: "Settings", href: "/settings", icon: Settings },
    { name: "Profile", href: "/profile", icon: User },
  ];

  return (
    <>
      {/* Mobile Toggle Button */}
      <button
        onClick={() => setIsMobileOpen(!isMobileOpen)}
        className="md:hidden fixed top-4 left-4 z-50 p-2 bg-white border border-slate-200 rounded-lg text-slate-600 hover:text-blue-600 transition-colors shadow-sm"
        aria-label="Toggle menu"
      >
        {isMobileOpen ? <X size={20} /> : <Menu size={20} />}
      </button>

      {/* Mobile Backdrop */}
      {isMobileOpen && (
        <div
          onClick={() => setIsMobileOpen(false)}
          className="md:hidden fixed inset-0 z-40 bg-slate-900/40 backdrop-blur-sm"
        />
      )}

      {/* Sidebar Container */}
      <aside
        className={cn(
          "fixed md:sticky top-0 left-0 z-40 h-screen bg-slate-900 text-slate-300 border-r border-slate-800 transition-all duration-300 flex flex-col justify-between select-none shadow-xl",
          isOpen ? "w-64" : "w-20",
          isMobileOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        )}
      >
        <div>
          {/* Header / Brand */}
          <div className="h-16 flex items-center justify-between px-6 border-b border-slate-800">
            <Link
              href="/dashboard"
              className={cn(
                "font-black tracking-tight bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent transition-opacity hover:opacity-95",
                isOpen ? "text-xl" : "text-sm text-center w-full"
              )}
            >
              {isOpen ? "Research Agent" : "RA"}
            </Link>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="hidden md:flex p-1.5 rounded-lg bg-slate-800 text-slate-400 hover:text-white transition-colors"
            >
              {isOpen ? <ChevronLeft size={16} /> : <ChevronRight size={16} />}
            </button>
          </div>

          {/* Navigation Links */}
          <nav className="p-4 space-y-1.5 overflow-y-auto max-h-[calc(100vh-10rem)]">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;

              return (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => setIsMobileOpen(false)}
                  className={cn(
                    "flex items-center space-x-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 group relative",
                    isActive
                      ? "bg-blue-600 text-white shadow-md shadow-blue-600/10"
                      : "text-slate-400 hover:text-slate-200 hover:bg-slate-800"
                  )}
                >
                  <Icon
                    size={20}
                    className={cn(
                      "transition-colors flex-shrink-0",
                      isActive ? "text-white" : "text-slate-400 group-hover:text-slate-200"
                    )}
                  />
                  {isOpen && <span className="truncate">{item.name}</span>}
                  
                  {/* Tooltip when collapsed */}
                  {!isOpen && (
                    <div className="absolute left-16 hidden group-hover:block bg-slate-950 text-slate-100 text-xs px-2.5 py-1.5 rounded-md whitespace-nowrap z-50 shadow-md">
                      {item.name}
                    </div>
                  )}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Footer Area with Logout */}
        <div className="p-4 border-t border-slate-800">
          <Link
            href="/login"
            className={cn(
              "flex items-center space-x-3 px-3 py-2.5 rounded-xl text-sm font-medium text-slate-400 hover:text-rose-400 hover:bg-rose-500/10 transition-all duration-200 group relative"
            )}
          >
            <LogOut size={20} className="flex-shrink-0 text-slate-400 group-hover:text-rose-400" />
            {isOpen && <span>Logout</span>}
            {!isOpen && (
              <div className="absolute left-16 hidden group-hover:block bg-slate-950 text-slate-100 text-xs px-2.5 py-1.5 rounded-md whitespace-nowrap z-50 shadow-md">
                Logout
              </div>
            )}
          </Link>
        </div>
      </aside>
    </>
  );
}
