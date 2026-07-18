"use client";

import { useState } from "react";
import {
  User,
  Settings,
  Bell,
  Cpu,
  Link2,
  Lock,
  Eye,
  Info,
  Layers,
  FileText,
  Bookmark,
  Star,
  MessageSquare,
  Folder,
  Upload,
  Globe,
  Clock,
  HelpCircle,
  BookOpen,
  Bug,
  PlusCircle,
  ExternalLink,
  CheckCircle,
  ArrowUpRight,
} from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

// List of available research tags
const AVAILABLE_TAGS = [
  "Artificial Intelligence",
  "Machine Learning",
  "Computer Vision",
  "Healthcare AI",
  "Robotics",
  "Cyber Security",
  "IoT",
  "Quantum Computing",
  "LLMs",
  "Natural Language Processing",
];

export default function ProfileSettingsPage() {
  const [activeSettingsTab, setActiveSettingsTab] = useState<
    "general" | "interests" | "notifications" | "ai" | "connected" | "privacy" | "appearance" | "about"
  >("general");

  // Profile General Info State
  const [profileName, setProfileName] = useState("Dr. Sarah Jenkins");
  const [profileEmail, setProfileEmail] = useState("s.jenkins@stanford.edu");
  const [profileInstitution, setProfileInstitution] = useState("Stanford University");
  const [profileDepartment, setProfileDepartment] = useState("Computer Science");
  const [profileCountry, setProfileCountry] = useState("United States");
  const [profileTimezone, setProfileTimezone] = useState("GMT-8 (Pacific Time)");
  const [profileLanguage, setProfileLanguage] = useState("English (US)");

  // Selected Interests tags
  const [selectedInterests, setSelectedInterests] = useState<string[]>([
    "Artificial Intelligence",
    "Machine Learning",
    "LLMs",
    "Natural Language Processing",
  ]);

  // Notifications Toggles
  const [notifications, setNotifications] = useState({
    news: true,
    deadlines: true,
    journals: false,
    trends: true,
    digest: true,
    updates: false,
  });

  // Connected Accounts Mock
  const [connections, setConnections] = useState<Record<string, boolean>>({
    google: true,
    github: true,
    orcid: false,
    scholar: false,
    openalex: false,
    semantic: false,
  });

  const handleToggleInterest = (tag: string) => {
    setSelectedInterests(
      selectedInterests.includes(tag)
        ? selectedInterests.filter((t) => t !== tag)
        : [...selectedInterests, tag]
    );
  };

  const handleToggleNotification = (key: keyof typeof notifications) => {
    setNotifications({
      ...notifications,
      [key]: !notifications[key],
    });
  };

  const handleToggleConnection = (key: string) => {
    setConnections({
      ...connections,
      [key]: !connections[key],
    });
  };

  return (
    <div className="space-y-8 pb-12 selection:bg-blue-100 selection:text-blue-900">
      
      {/* PAGE HEADER */}
      <section className="space-y-1.5">
        <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
          Profile & Settings
        </h1>
        <p className="text-slate-500 text-sm font-medium">
          Manage your researcher profile, subscription details, notification alerts, and AI modeling preferences.
        </p>
      </section>

      {/* TWO-COLUMN RESPONSIVE LAYOUT */}
      <div className="grid lg:grid-cols-3 gap-8 items-start">
        
        {/* ================= LEFT COLUMN: Profile Summary & Stats ================= */}
        <aside className="lg:col-span-1 space-y-6">
          
          {/* PROFILE HEADER CARD */}
          <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm text-center space-y-4">
            {/* Avatar placeholder */}
            <div className="w-24 h-24 rounded-full bg-blue-100 border-2 border-blue-200 text-blue-600 flex items-center justify-center font-bold text-3xl mx-auto shadow-inner relative">
              SJ
              <span className="absolute bottom-0 right-0 w-6 h-6 rounded-full bg-emerald-500 border-4 border-white" />
            </div>
            
            <div className="space-y-1">
              <h2 className="font-extrabold text-slate-800 text-lg leading-snug">{profileName}</h2>
              <span className="text-[11px] font-bold uppercase tracking-wider text-blue-600 block">
                Lead AI Researcher
              </span>
              <p className="text-xs text-slate-400 font-semibold">{profileInstitution} &bull; {profileDepartment}</p>
            </div>

            <p className="text-xs text-slate-500 leading-relaxed max-w-xs mx-auto italic font-normal">
              &ldquo;Focusing on parameter-efficient tuning, DPO alignment strategies, and multimodal vision models.&rdquo;
            </p>

            <div className="text-[10px] text-slate-400 font-semibold space-y-1 pt-2 border-t border-slate-50">
              <div className="flex justify-between"><span>Email:</span> <span className="text-slate-700">{profileEmail}</span></div>
              <div className="flex justify-between"><span>Location:</span> <span className="text-slate-700">Palo Alto, CA</span></div>
            </div>

            <button
              onClick={() => setActiveSettingsTab("general")}
              className="w-full py-2 border border-slate-200 hover:border-blue-400 hover:text-blue-600 rounded-xl text-center text-xs font-bold transition-all shadow-sm bg-white"
            >
              Edit Profile
            </button>
          </div>

          {/* PROFILE STATISTICS */}
          <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">Library Summary</h3>
            <div className="grid grid-cols-3 gap-3 text-center">
              {[
                { name: "Projects", count: 5, icon: Layers },
                { name: "Saved", count: 148, icon: FileText },
                { name: "Uploaded", count: 84, icon: Upload },
                { name: "Bookmarks", count: 62, icon: Bookmark },
                { name: "AI Chats", count: 420, icon: MessageSquare },
                { name: "Folders", count: 6, icon: Folder },
              ].map((stat, idx) => {
                const Icon = stat.icon;
                return (
                  <div key={idx} className="p-2.5 bg-slate-50 border border-slate-100 rounded-xl space-y-1">
                    <span className="text-base font-black text-slate-800 block">{stat.count}</span>
                    <span className="text-[9px] font-bold text-slate-400 block truncate uppercase">{stat.name}</span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* RIGHT SIDEBAR QUICK LINKS (Placed here to preserve 2-column core layout) */}
          <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm space-y-3 text-xs font-semibold text-slate-600 leading-normal">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">Quick Links</h3>
            <div className="space-y-2">
              <a href="#" className="flex justify-between items-center hover:text-blue-600 transition-colors">
                <span>Help Center</span>
                <HelpCircle size={14} className="text-slate-400" />
              </a>
              <a href="#" className="flex justify-between items-center hover:text-blue-600 transition-colors">
                <span>Documentation</span>
                <BookOpen size={14} className="text-slate-400" />
              </a>
              <a href="#" className="flex justify-between items-center hover:text-blue-600 transition-colors">
                <span>Contact Support</span>
                <ArrowUpRight size={14} className="text-slate-400" />
              </a>
              <a href="#" className="flex justify-between items-center hover:text-blue-600 transition-colors">
                <span>Report Bug</span>
                <Bug size={14} className="text-slate-400" />
              </a>
            </div>
          </div>
        </aside>

        {/* ================= RIGHT COLUMN: Settings Content Panel ================= */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* TAB BAR */}
          <div className="flex border-b border-slate-200 pb-px overflow-x-auto scrollbar-none">
            {[
              { id: "general", name: "General", icon: User },
              { id: "interests", name: "Interests", icon: Star },
              { id: "notifications", name: "Notifications", icon: Bell },
              { id: "ai", name: "AI Settings", icon: Cpu },
              { id: "connected", name: "Integrations", icon: Link2 },
              { id: "privacy", name: "Privacy", icon: Lock },
              { id: "appearance", name: "Appearance", icon: Eye },
              { id: "about", name: "About", icon: Info },
            ].map((tab) => {
              const Icon = tab.icon;
              const isActive = activeSettingsTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveSettingsTab(tab.id as any)}
                  className={cn(
                    "flex items-center space-x-1.5 px-4 py-3 border-b-2 font-bold text-xs tracking-wide transition-all uppercase outline-none whitespace-nowrap",
                    isActive
                      ? "border-blue-600 text-blue-600"
                      : "border-transparent text-slate-400 hover:text-slate-600"
                  )}
                >
                  <Icon size={12} />
                  <span>{tab.name}</span>
                </button>
              );
            })}
          </div>

          {/* TAB 1: GENERAL SETTINGS */}
          {activeSettingsTab === "general" && (
            <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-6 animate-in fade-in duration-200">
              <h3 className="text-sm font-bold text-slate-800">General Information</h3>
              <div className="grid sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-500 mb-2">Full Name</label>
                  <input
                    type="text"
                    value={profileName}
                    onChange={(e) => setProfileName(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-800 focus:outline-none focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-500 mb-2">Email Address</label>
                  <input
                    type="email"
                    value={profileEmail}
                    onChange={(e) => setProfileEmail(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-800 focus:outline-none focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-500 mb-2">Institution</label>
                  <input
                    type="text"
                    value={profileInstitution}
                    onChange={(e) => setProfileInstitution(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-800 focus:outline-none focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-500 mb-2">Department</label>
                  <input
                    type="text"
                    value={profileDepartment}
                    onChange={(e) => setProfileDepartment(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-800 focus:outline-none focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-500 mb-2">Country</label>
                  <input
                    type="text"
                    value={profileCountry}
                    onChange={(e) => setProfileCountry(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-800 focus:outline-none focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-500 mb-2">Time Zone</label>
                  <input
                    type="text"
                    value={profileTimezone}
                    onChange={(e) => setProfileTimezone(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-800 focus:outline-none focus:border-blue-500"
                  />
                </div>
              </div>
              <div className="pt-4 border-t border-slate-100 flex justify-end">
                <button
                  onClick={() => alert("Mock settings saved successfully!")}
                  className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl text-xs transition-colors shadow-md"
                >
                  Save Changes
                </button>
              </div>
            </div>
          )}

          {/* TAB 2: RESEARCH INTERESTS */}
          {activeSettingsTab === "interests" && (
            <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-4 animate-in fade-in duration-200">
              <div className="space-y-1">
                <h3 className="text-sm font-bold text-slate-800">Research Interests</h3>
                <p className="text-xs text-slate-400">Select topics to personalize recommended articles and timeline updates.</p>
              </div>

              <div className="flex flex-wrap gap-2.5 pt-2">
                {AVAILABLE_TAGS.map((tag) => {
                  const isSelected = selectedInterests.includes(tag);
                  return (
                    <button
                      key={tag}
                      onClick={() => handleToggleInterest(tag)}
                      className={cn(
                        "px-3 py-1.5 rounded-full text-xs font-semibold border transition-colors flex items-center gap-1",
                        isSelected
                          ? "bg-blue-50 text-blue-600 border-blue-200"
                          : "bg-white text-slate-650 border-slate-200 hover:border-slate-350"
                      )}
                    >
                      {tag}
                      {isSelected && <span className="text-[10px]">✓</span>}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* TAB 3: NOTIFICATIONS */}
          {activeSettingsTab === "notifications" && (
            <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-4 animate-in fade-in duration-200">
              <h3 className="text-sm font-bold text-slate-800">Notification Alerts</h3>

              <div className="space-y-4 divide-y divide-slate-50">
                {[
                  { key: "news" as const, name: "Research News", desc: "Receive immediate updates on breaking preprints." },
                  { key: "deadlines" as const, name: "Conference Deadlines", desc: "Get submission deadline reminders." },
                  { key: "journals" as const, name: "Journal Recommendations", desc: "Recommendations tailored to your library." },
                  { key: "trends" as const, name: "Trending Topics", desc: "Weekly summaries of surging keywords." },
                  { key: "digest" as const, name: "Weekly Digest", desc: "Consolidated summaries of your library stats." },
                ].map((item) => (
                  <div key={item.key} className="flex justify-between items-center py-3 first:pt-0">
                    <div className="space-y-0.5">
                      <span className="text-xs font-bold text-slate-800 block">{item.name}</span>
                      <span className="text-[10px] text-slate-400 block leading-relaxed">{item.desc}</span>
                    </div>
                    <button
                      onClick={() => handleToggleNotification(item.key)}
                      className={cn(
                        "w-10 h-6 rounded-full p-0.5 transition-colors duration-200 outline-none flex-shrink-0",
                        notifications[item.key] ? "bg-blue-600" : "bg-slate-200"
                      )}
                    >
                      <div
                        className={cn(
                          "w-5 h-5 rounded-full bg-white transition-transform duration-200 shadow-sm",
                          notifications[item.key] ? "translate-x-4" : "translate-x-0"
                        )}
                      />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 4: AI PREFERENCES */}
          {activeSettingsTab === "ai" && (
            <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-6 animate-in fade-in duration-200">
              <h3 className="text-sm font-bold text-slate-800 font-semibold">AI Assistant Preferences</h3>

              <div className="grid sm:grid-cols-2 gap-6 text-xs">
                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-500 mb-2">Preferred AI Model</label>
                  <select className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-700 focus:outline-none focus:border-blue-500">
                    <option>Gemini 1.5 Pro</option>
                    <option>Gemini 1.5 Flash</option>
                    <option>Claude 3.5 Sonnet</option>
                    <option>GPT-4o</option>
                  </select>
                </div>
                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-500 mb-2">Summary Length</label>
                  <select className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-700 focus:outline-none focus:border-blue-500">
                    <option>Standard Executive Brief</option>
                    <option>One-Paragraph Abstract</option>
                    <option>Comprehensive Review (Multi-Page)</option>
                  </select>
                </div>
                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-500 mb-2">Response Style</label>
                  <select className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-700 focus:outline-none focus:border-blue-500">
                    <option>Academic & Rigorous</option>
                    <option>Simplified & Conversational</option>
                    <option>Skeptical & Contradictory Mapping</option>
                  </select>
                </div>
                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-500 mb-2">Citation Style</label>
                  <select className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-700 focus:outline-none focus:border-blue-500">
                    <option>APA (7th Edition)</option>
                    <option>MLA (9th Edition)</option>
                    <option>IEEE Format</option>
                    <option>BibTeX Key Format</option>
                  </select>
                </div>
              </div>
            </div>
          )}

          {/* TAB 5: CONNECTED ACCOUNTS */}
          {activeSettingsTab === "connected" && (
            <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-4 animate-in fade-in duration-200">
              <h3 className="text-sm font-bold text-slate-800">Connected Accounts</h3>

              <div className="grid sm:grid-cols-2 gap-4">
                {[
                  { id: "google", name: "Google Identity", detail: "Single sign-on & Drive sync" },
                  { id: "github", name: "GitHub Integration", detail: "Code repository & stars check" },
                  { id: "orcid", name: "ORCID Profile", detail: "Academic publications verification" },
                  { id: "scholar", name: "Google Scholar", detail: "Citations mapping" },
                  { id: "openalex", name: "OpenAlex Index", detail: "Publications search resolution" },
                  { id: "semantic", name: "Semantic Scholar", detail: "AI recommendations lookup" },
                ].map((account) => {
                  const isConnected = connections[account.id];
                  return (
                    <div
                      key={account.id}
                      className="p-4 bg-slate-50 border border-slate-100 rounded-xl flex flex-col justify-between h-28"
                    >
                      <div className="space-y-1">
                        <span className="text-xs font-bold text-slate-800 block">{account.name}</span>
                        <span className="text-[10px] text-slate-400 block leading-normal">{account.detail}</span>
                      </div>
                      <div className="flex justify-between items-center pt-2">
                        <span className={cn(
                          "text-[9px] font-bold uppercase tracking-wider rounded px-1.5 py-0.5",
                          isConnected 
                            ? "bg-emerald-50 text-emerald-600 border border-emerald-100" 
                            : "bg-slate-100 text-slate-400 border border-slate-200"
                        )}>
                          {isConnected ? "Connected" : "Disconnected"}
                        </span>
                        <button
                          onClick={() => handleToggleConnection(account.id)}
                          className={cn(
                            "px-3 py-1.5 text-[10px] font-bold rounded-lg transition-colors border",
                            isConnected
                              ? "bg-white text-slate-500 border-slate-200 hover:border-rose-450 hover:text-rose-500"
                              : "bg-blue-600 text-white border-blue-600 hover:bg-blue-700"
                          )}
                        >
                          {isConnected ? "Disconnect" : "Connect"}
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* TAB 6: PRIVACY */}
          {activeSettingsTab === "privacy" && (
            <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-4 animate-in fade-in duration-200">
              <h3 className="text-sm font-bold text-slate-800">Privacy & Security</h3>

              <div className="grid sm:grid-cols-2 gap-4 text-xs font-semibold text-slate-600">
                <div className="p-4 bg-slate-50 border border-slate-100 rounded-xl space-y-2 flex flex-col justify-between h-28">
                  <div>
                    <span className="font-bold text-slate-800 block">Download Data</span>
                    <p className="text-[10px] text-slate-450 mt-0.5 font-medium">Download a complete backup of your saved PDF documents, reviews, and library tags.</p>
                  </div>
                  <button className="text-[10px] text-blue-600 hover:underline font-bold self-start inline-flex items-center gap-0.5">
                    Request Archive &rarr;
                  </button>
                </div>

                <div className="p-4 bg-slate-50 border border-slate-100 rounded-xl space-y-2 flex flex-col justify-between h-28">
                  <div>
                    <span className="font-bold text-slate-850 block">Manage Active Sessions</span>
                    <p className="text-[10px] text-slate-450 mt-0.5 font-medium">Log out of active client sessions on other browsers or device endpoints.</p>
                  </div>
                  <button className="text-[10px] text-blue-600 hover:underline font-bold self-start">
                    View 2 Sessions &rarr;
                  </button>
                </div>

                <div className="p-4 bg-slate-50 border border-slate-100 rounded-xl space-y-2 flex flex-col justify-between h-28 border-rose-100/50">
                  <div>
                    <span className="font-bold text-rose-600 block">Delete Account</span>
                    <p className="text-[10px] text-slate-450 mt-0.5 font-medium">Permanently purge your account, collections, papers, and AI conversation logs.</p>
                  </div>
                  <button className="text-[10px] text-rose-500 hover:underline font-bold self-start">
                    Purge Account &rarr;
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* TAB 7: APPEARANCE */}
          {activeSettingsTab === "appearance" && (
            <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-4 animate-in fade-in duration-200">
              <h3 className="text-sm font-bold text-slate-800">Appearance Settings</h3>

              <div className="space-y-4 text-xs font-semibold text-slate-650">
                <div className="flex justify-between items-center py-2 border-b border-slate-50">
                  <div className="space-y-0.5">
                    <span>Dark Mode / Theme</span>
                    <span className="text-[10px] text-slate-400 block font-normal">Switch between light, dark, or system preferences.</span>
                  </div>
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wide bg-slate-50 border border-slate-200 px-2 py-0.5 rounded">
                    Coming Soon
                  </span>
                </div>

                <div className="flex justify-between items-center py-2 border-b border-slate-50">
                  <div className="space-y-0.5">
                    <span>Font Size</span>
                    <span className="text-[10px] text-slate-400 block font-normal">Configure the body text scale.</span>
                  </div>
                  <select className="bg-slate-50 border border-slate-200 rounded-lg px-2 py-1 text-[11px] text-slate-700">
                    <option>Standard (14px)</option>
                    <option>Comfortable (16px)</option>
                    <option>Compact (12px)</option>
                  </select>
                </div>

                <div className="flex justify-between items-center py-2 border-b border-slate-50">
                  <div className="space-y-0.5">
                    <span>Compact Mode</span>
                    <span className="text-[10px] text-slate-400 block font-normal">Reduces margins and paddings across pages.</span>
                  </div>
                  <button className="w-10 h-6 bg-slate-200 rounded-full p-0.5 outline-none flex-shrink-0">
                    <div className="w-5 h-5 rounded-full bg-white shadow-sm" />
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* TAB 8: ABOUT */}
          {activeSettingsTab === "about" && (
            <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-4 animate-in fade-in duration-200 text-xs">
              <h3 className="text-sm font-bold text-slate-800">About Research Agent</h3>

              <div className="p-4 bg-slate-50 border border-slate-100 rounded-xl space-y-3 leading-relaxed text-slate-600">
                <div className="flex justify-between items-center border-b border-slate-200/50 pb-2">
                  <span className="font-semibold">Application Version</span>
                  <span className="font-mono text-slate-800 bg-slate-200 px-1.5 py-0.5 rounded">v0.1.0-alpha</span>
                </div>
                <div className="flex justify-between items-center border-b border-slate-200/50 pb-2">
                  <span className="font-semibold">Developer</span>
                  <span className="text-slate-850">Full Stack & UI Team</span>
                </div>
                <div className="flex justify-between items-center border-b border-slate-200/50 pb-2">
                  <span className="font-semibold">License</span>
                  <span className="text-slate-850">MIT Open Source</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="font-semibold">GitHub Repository</span>
                  <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline flex items-center gap-0.5">
                    Open Repository
                    <ExternalLink size={10} />
                  </a>
                </div>
              </div>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
