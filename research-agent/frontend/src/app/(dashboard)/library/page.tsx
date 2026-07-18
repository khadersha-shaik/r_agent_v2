"use client";

import { useState } from "react";
import {
  Plus,
  Upload,
  Search,
  SlidersHorizontal,
  LayoutGrid,
  List,
  Folder,
  FolderOpen,
  Bookmark,
  Star,
  Trash2,
  Share2,
  FileText,
  Clock,
  ExternalLink,
  Sparkles,
  MessageSquare,
  GitCompare,
  ArrowUpRight,
  TrendingUp,
  BookOpen,
  Eye,
  MoreVertical,
  Brain,
  Network,
  Download,
  FolderKanban,
} from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

// Mock Library Papers
const INITIAL_LIBRARY_PAPERS = [
  {
    id: 1,
    title: "Attention Is All You Need",
    authors: "Ashish Vaswani et al.",
    journal: "NeurIPS",
    year: 2017,
    tags: ["Transformers", "NLP", "Deep Learning"],
    collection: "LLMs",
    addedDate: "July 17, 2026",
    isFavorite: true,
  },
  {
    id: 2,
    title: "Direct Preference Optimization: Your Language Model is Secretly a Reward Model",
    authors: "Rafael Rafailov et al.",
    journal: "NeurIPS",
    year: 2023,
    tags: ["Alignment", "DPO", "Fine-tuning"],
    collection: "LLMs",
    addedDate: "July 16, 2026",
    isFavorite: false,
  },
  {
    id: 3,
    title: "LoRA: Low-Rank Adaptation of Large Language Models",
    authors: "Edward J. Hu et al.",
    journal: "ICLR",
    year: 2022,
    tags: ["PEFT", "Adaptation", "Model Tuning"],
    collection: "LLMs",
    addedDate: "July 15, 2026",
    isFavorite: true,
  },
  {
    id: 4,
    title: "Real-time Violence Detection in Surveillance Video",
    authors: "M. J. Hasan et al.",
    journal: "IEEE Access",
    year: 2021,
    tags: ["Computer Vision", "Surveillance", "Detection"],
    collection: "Computer Vision",
    addedDate: "July 10, 2026",
    isFavorite: false,
  },
];

// Mock Collections
const COLLECTIONS = [
  { name: "LLMs", count: 3, date: "July 17, 2026", color: "bg-blue-500" },
  { name: "Computer Vision", count: 1, date: "July 10, 2026", color: "bg-teal-500" },
  { name: "Healthcare AI", count: 0, date: "N/A", color: "bg-emerald-500" },
  { name: "Cyber Security", count: 0, date: "N/A", color: "bg-indigo-500" },
  { name: "Robotics", count: 0, date: "N/A", color: "bg-orange-500" },
  { name: "Quantum Computing", count: 0, date: "N/A", color: "bg-purple-500" },
];

// Mock Projects
const PROJECTS = [
  { name: "Violence Detection", desc: "Developing real-time computer vision classifiers for surveillance streams.", papers: 1, progress: 35 },
  { name: "Research Gap Detector", desc: "Constructing automatic literature analysis and contradiction mapping.", papers: 2, progress: 80 },
  { name: "Medical AI", desc: "Diagnostic support system leveraging clinical fine-tuned LLMs.", papers: 0, progress: 10 },
  { name: "Smart Agriculture", desc: "Crop yield forecasting utilizing satellite multi-spectral bands.", papers: 0, progress: 0 },
  { name: "AI Agents", desc: "Task planning, memory retrieval, and tooling loop research.", papers: 1, progress: 50 },
];

// Mock Notes
const MOCK_NOTES = [
  { id: 1, title: "DPO vs PPO stability", text: "DPO mathematically simplifies the reward model step, optimizing directly on the preference data dataset. It's much more stable than PPO in practice." },
  { id: 2, title: "LoRA rank parameters", text: "Using r=8 with alpha=16 usually gives optimal trade-offs in parameter tuning on Llama architectures without performance decay." },
];

export default function ResearchLibraryPage() {
  const [papers, setPapers] = useState(INITIAL_LIBRARY_PAPERS);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [activeSubSection, setActiveSubSection] = useState<"all" | "favorites" | "bookmarks">("all");
  const [activeTab, setActiveTab] = useState<"papers" | "collections" | "projects">("papers");
  const [searchQuery, setSearchQuery] = useState("");

  const handleToggleFavorite = (id: number) => {
    setPapers(
      papers.map((p) => (p.id === id ? { ...p, isFavorite: !p.isFavorite } : p))
    );
  };

  const handleDeletePaper = (id: number) => {
    setPapers(papers.filter((p) => p.id !== id));
  };

  const handleResetList = () => {
    setPapers(INITIAL_LIBRARY_PAPERS);
  };

  // Filter criteria
  const filteredPapers = papers.filter((paper) => {
    const matchesSearch =
      paper.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      paper.authors.toLowerCase().includes(searchQuery.toLowerCase()) ||
      paper.collection.toLowerCase().includes(searchQuery.toLowerCase());
    
    if (activeSubSection === "favorites") {
      return matchesSearch && paper.isFavorite;
    }
    return matchesSearch;
  });

  return (
    <div className="space-y-8 pb-12 selection:bg-blue-100 selection:text-blue-900">
      
      {/* PAGE HEADER */}
      <section className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm">
        <div className="space-y-1">
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
            Research Library
          </h1>
          <p className="text-slate-500 text-sm font-medium">
            Organize your research papers, collections, projects, notes, and bookmarks in one place.
          </p>
        </div>
        <div className="flex gap-2">
          <Link
            href="/upload"
            className="inline-flex items-center gap-1.5 px-4 py-2.5 border border-slate-200 hover:border-blue-400 text-slate-700 hover:text-blue-600 font-semibold rounded-xl text-xs transition-colors bg-white shadow-sm"
          >
            <Upload size={14} />
            Upload Paper
          </Link>
          <button
            onClick={() => alert("Creating Collection mockup...")}
            className="inline-flex items-center gap-1.5 px-4 py-2.5 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-semibold rounded-xl text-xs transition-all shadow-md active:scale-95"
          >
            <Plus size={14} />
            Create Collection
          </button>
        </div>
      </section>

      {/* OVERVIEW STATS CARDS */}
      <section className="grid grid-cols-2 md:grid-cols-6 gap-4">
        {[
          { name: "Saved Papers", val: papers.length },
          { name: "Collections", val: COLLECTIONS.length },
          { name: "Bookmarks", val: 12 },
          { name: "Projects", val: PROJECTS.length },
          { name: "Notes", val: MOCK_NOTES.length },
          { name: "Recently Viewed", val: 5 },
        ].map((stat, idx) => (
          <div key={idx} className="bg-white border border-slate-200 rounded-2xl p-4 shadow-sm space-y-1">
            <span className="text-2xl font-black text-slate-800">{stat.val}</span>
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block truncate">
              {stat.name}
            </span>
          </div>
        ))}
      </section>

      {/* 3-COLUMN LAYOUT */}
      <div className="grid lg:grid-cols-5 gap-8 items-start">
        
        {/* COLUMN 1: LEFT SIDEBAR Navigation */}
        <aside className="lg:col-span-1 space-y-4">
          <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-sm space-y-1.5">
            <h3 className="text-[10px] font-bold uppercase tracking-wider text-slate-400 px-3 mb-2">Quick Navigation</h3>
            <button
              onClick={() => {
                setActiveSubSection("all");
                setActiveTab("papers");
              }}
              className={cn(
                "w-full flex items-center space-x-2.5 px-3 py-2 rounded-xl text-xs font-semibold transition-all",
                activeTab === "papers" && activeSubSection === "all"
                  ? "bg-blue-50 text-blue-600 border border-blue-100"
                  : "text-slate-500 hover:text-slate-800 hover:bg-slate-50"
              )}
            >
              <FileText size={14} />
              <span>All Papers</span>
            </button>
            <button
              onClick={() => {
                setActiveTab("collections");
              }}
              className={cn(
                "w-full flex items-center space-x-2.5 px-3 py-2 rounded-xl text-xs font-semibold transition-all",
                activeTab === "collections"
                  ? "bg-blue-50 text-blue-600 border border-blue-100"
                  : "text-slate-500 hover:text-slate-800 hover:bg-slate-50"
              )}
            >
              <Folder size={14} />
              <span>Collections</span>
            </button>
            <button
              onClick={() => {
                setActiveTab("projects");
              }}
              className={cn(
                "w-full flex items-center space-x-2.5 px-3 py-2 rounded-xl text-xs font-semibold transition-all",
                activeTab === "projects"
                  ? "bg-blue-50 text-blue-600 border border-blue-100"
                  : "text-slate-500 hover:text-slate-800 hover:bg-slate-50"
              )}
            >
              <FolderKanban size={14} />
              <span>Projects</span>
            </button>
            <button
              onClick={() => {
                setActiveSubSection("favorites");
                setActiveTab("papers");
              }}
              className={cn(
                "w-full flex items-center space-x-2.5 px-3 py-2 rounded-xl text-xs font-semibold transition-all",
                activeTab === "papers" && activeSubSection === "favorites"
                  ? "bg-blue-50 text-blue-600 border border-blue-100"
                  : "text-slate-500 hover:text-slate-800 hover:bg-slate-50"
              )}
            >
              <Star size={14} />
              <span>Favorites</span>
            </button>
            <button className="w-full flex items-center space-x-2.5 px-3 py-2 rounded-xl text-xs font-semibold text-slate-400 cursor-not-allowed">
              <Bookmark size={14} />
              <span>Bookmarks</span>
            </button>
            <button className="w-full flex items-center space-x-2.5 px-3 py-2 rounded-xl text-xs font-semibold text-slate-400 cursor-not-allowed">
              <Share2 size={14} />
              <span>Shared</span>
            </button>
            <button className="w-full flex items-center space-x-2.5 px-3 py-2 rounded-xl text-xs font-semibold text-slate-400 cursor-not-allowed">
              <Trash2 size={14} />
              <span>Trash</span>
            </button>
          </div>
        </aside>

        {/* COLUMN 2: CENTER PANEL (Tabbed Navigation + Content lists) */}
        <div className="lg:col-span-3 space-y-6">
          
          {/* SEARCH & FILTER CONTROLS */}
          <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-sm flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center flex-1 bg-slate-50 border border-slate-200 rounded-xl px-3 py-1.5 focus-within:border-blue-500 focus-within:bg-white transition-all w-full">
              <Search size={16} className="text-slate-400 mr-2 flex-shrink-0" />
              <input
                type="text"
                className="bg-transparent border-none outline-none text-xs w-full text-slate-800"
                placeholder="Search within library..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            
            <div className="flex items-center justify-between gap-4 w-full md:w-auto">
              {/* Sort/Filter options placeholder */}
              <button className="p-2 border border-slate-200 hover:border-blue-400 rounded-xl text-slate-500 hover:text-blue-600 transition-all text-xs font-semibold inline-flex items-center gap-1.5 bg-white">
                <SlidersHorizontal size={14} />
                Filters
              </button>

              {/* Grid / List toggle */}
              <div className="flex items-center space-x-1 border border-slate-200 rounded-xl p-1 bg-white">
                <button
                  onClick={() => setViewMode("grid")}
                  className={cn(
                    "p-1.5 rounded-lg transition-colors",
                    viewMode === "grid" ? "bg-slate-100 text-slate-800" : "text-slate-400 hover:text-slate-600"
                  )}
                >
                  <LayoutGrid size={14} />
                </button>
                <button
                  onClick={() => setViewMode("list")}
                  className={cn(
                    "p-1.5 rounded-lg transition-colors",
                    viewMode === "list" ? "bg-slate-100 text-slate-800" : "text-slate-400 hover:text-slate-600"
                  )}
                >
                  <List size={14} />
                </button>
              </div>
            </div>
          </div>

          {/* MAIN DYNAMIC CONTENT */}
          {activeTab === "papers" && (
            <div className="space-y-4">
              <div className="flex justify-between items-center text-xs text-slate-400 font-semibold px-1">
                <span>Showing {filteredPapers.length} papers</span>
                {filteredPapers.length === 0 && papers.length > 0 && (
                  <button onClick={handleResetList} className="text-blue-600 hover:underline">
                    Reset Filter
                  </button>
                )}
              </div>

              {filteredPapers.length === 0 ? (
                /* Empty state inside filter list */
                <div className="text-center p-12 bg-white border border-slate-200 rounded-2xl shadow-sm space-y-4">
                  <span className="text-4xl">📚</span>
                  <div>
                    <h4 className="font-bold text-slate-800 text-sm">Your Research Library is empty</h4>
                    <p className="text-xs text-slate-400 max-w-xs mx-auto mt-1 leading-relaxed">
                      Start by searching for papers or importing local research PDFs.
                    </p>
                  </div>
                  <div className="flex justify-center gap-3 pt-2">
                    <Link href="/papers" className="px-4 py-2 border border-slate-200 hover:border-blue-400 text-slate-700 hover:text-blue-600 text-xs font-semibold rounded-xl">
                      Search Papers
                    </Link>
                    <Link href="/upload" className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold rounded-xl">
                      Upload PDF
                    </Link>
                  </div>
                </div>
              ) : (
                /* Grid vs List View output */
                <div className={cn(
                  viewMode === "grid" ? "grid sm:grid-cols-2 gap-6" : "space-y-3"
                )}>
                  {filteredPapers.map((paper) => (
                    <div
                      key={paper.id}
                      className="p-5 bg-white border border-slate-200 rounded-2xl shadow-sm hover:border-blue-400 hover:shadow-md transition-all duration-300 flex flex-col justify-between gap-4"
                    >
                      <div className="space-y-2">
                        <div className="flex justify-between items-start gap-4">
                          <span className="px-2 py-0.5 rounded bg-blue-50 text-blue-600 text-[9px] font-bold uppercase tracking-wider">
                            {paper.collection}
                          </span>
                          <button
                            onClick={() => handleToggleFavorite(paper.id)}
                            className={cn(
                              "p-1 hover:bg-slate-50 rounded transition-colors",
                              paper.isFavorite ? "text-amber-500" : "text-slate-400 hover:text-slate-600"
                            )}
                          >
                            <Star size={14} fill={paper.isFavorite ? "currentColor" : "none"} />
                          </button>
                        </div>
                        <h4 className="font-bold text-slate-800 text-sm leading-snug hover:text-blue-600 cursor-pointer">
                          {paper.title}
                        </h4>
                        <p className="text-[11px] text-slate-400 font-semibold">{paper.authors}</p>
                        <p className="text-[10px] text-slate-400 italic">{paper.journal} &bull; {paper.year}</p>
                        
                        <div className="flex flex-wrap gap-1 pt-1">
                          {paper.tags.map((tg, idx) => (
                            <span key={idx} className="px-1.5 py-0.5 bg-slate-50 border border-slate-100 rounded text-[9px] text-slate-500 font-medium">
                              {tg}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Card Actions Footer */}
                      <div className="flex items-center justify-between border-t border-slate-100 pt-3 text-[10px] text-slate-500 font-bold">
                        <span className="text-slate-400 font-medium">Added {paper.addedDate}</span>
                        <div className="flex items-center space-x-2.5">
                          <button className="hover:text-blue-600 transition-colors" title="Open Document">
                            <Eye size={12} />
                          </button>
                          <button className="hover:text-blue-600 transition-colors" title="AI Summary">
                            <Sparkles size={12} />
                          </button>
                          <button className="hover:text-blue-600 transition-colors" title="Chat with Paper">
                            <MessageSquare size={12} />
                          </button>
                          <button
                            onClick={() => handleDeletePaper(paper.id)}
                            className="hover:text-rose-500 transition-colors"
                            title="Delete"
                          >
                            <Trash2 size={12} />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {activeTab === "collections" && (
            <div className="grid sm:grid-cols-2 gap-6">
              {COLLECTIONS.map((col, idx) => (
                <div key={idx} className="p-5 bg-white border border-slate-200 rounded-2xl shadow-sm hover:border-blue-400 hover:shadow-md transition-all duration-300 relative overflow-hidden group cursor-pointer">
                  {/* Color band */}
                  <div className={cn("absolute top-0 left-0 w-full h-1.5", col.color)} />
                  <div className="pt-2 space-y-3">
                    <div>
                      <h4 className="font-bold text-slate-800 text-sm group-hover:text-blue-600 transition-colors">
                        {col.name}
                      </h4>
                      <p className="text-[10px] text-slate-400 mt-0.5">Last updated: {col.date}</p>
                    </div>
                    <div className="flex items-center justify-between text-xs text-slate-500 font-semibold">
                      <span>{col.count} papers</span>
                      <ArrowUpRight size={14} className="transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === "projects" && (
            <div className="space-y-4">
              {PROJECTS.map((proj, idx) => (
                <div key={idx} className="p-5 bg-white border border-slate-200 rounded-2xl shadow-sm hover:border-blue-400 transition-all space-y-3">
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-bold text-slate-800 text-sm">{proj.name}</h4>
                      <p className="text-[11px] text-slate-500 mt-1 max-w-md leading-relaxed">{proj.desc}</p>
                    </div>
                    <span className="px-2 py-0.5 rounded bg-slate-100 text-slate-500 border border-slate-200 text-[10px] font-bold">
                      {proj.papers} Papers
                    </span>
                  </div>
                  
                  {/* Progress Indicator */}
                  <div className="space-y-1.5 pt-1">
                    <div className="flex justify-between items-center text-[10px] text-slate-400 font-semibold">
                      <span>Task Progress</span>
                      <span>{proj.progress}%</span>
                    </div>
                    <div className="w-full bg-slate-100 rounded-full h-1.5 overflow-hidden">
                      <div className="bg-blue-600 h-1.5 rounded-full transition-all duration-300" style={{ width: `${proj.progress}%` }} />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* COLUMN 3: RIGHT PANEL (Research Notes, Timeline, Future AI Suggests) */}
        <aside className="lg:col-span-1 space-y-6">
          
          {/* RESEARCH NOTES PANEL */}
          <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
              <FileText size={14} />
              Research Notes
            </h3>
            
            <div className="space-y-3">
              {MOCK_NOTES.map((note) => (
                <div key={note.id} className="p-3 bg-slate-50 border border-slate-100 rounded-xl space-y-1.5">
                  <h4 className="text-[11px] font-bold text-slate-800 truncate">{note.title}</h4>
                  <p className="text-[10px] text-slate-500 leading-normal line-clamp-3">{note.text}</p>
                </div>
              ))}
            </div>
            
            <button className="w-full py-2 bg-slate-50 hover:bg-slate-100 text-slate-600 hover:text-slate-800 border border-slate-200 rounded-xl text-center text-[10px] font-semibold transition-all">
              + Add New Note
            </button>
          </div>

          {/* RECENT ACTIVITY TIMELINE */}
          <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
              <Clock size={14} />
              Recent Activity
            </h3>

            <div className="flow-root">
              <ul className="-mb-6">
                {[
                  { text: "Saved Paper", detail: "Attention Is All You Need", time: "1h ago" },
                  { text: "Created Collection", detail: "LLMs", time: "3h ago" },
                  { text: "Added Notes", detail: "DPO vs PPO stability studies", time: "1d ago" },
                  { text: "Opened Paper", detail: "LoRA adaptation methodologies", time: "2d ago" },
                ].map((act, actIdx) => (
                  <li key={actIdx}>
                    <div className="relative pb-6">
                      {actIdx !== 3 ? (
                        <span className="absolute top-2 left-2 -ml-px h-full w-0.5 bg-slate-100" aria-hidden="true" />
                      ) : null}
                      <div className="relative flex space-x-2 items-start">
                        <span className="h-4 w-4 rounded-full bg-blue-50 border border-blue-200 flex items-center justify-center flex-shrink-0 mt-0.5" />
                        <div className="flex-1 min-w-0 text-[10px]">
                          <p className="font-semibold text-slate-700">
                            {act.text}: <span className="font-normal text-slate-500 italic">&ldquo;{act.detail}&rdquo;</span>
                          </p>
                          <span className="text-[9px] text-slate-400 font-medium block mt-0.5">{act.time}</span>
                        </div>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* FUTURE AI PLACEHOLDERS */}
          <div className="bg-white border border-indigo-50 rounded-2xl p-5 shadow-sm space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                <Brain size={14} className="text-indigo-400" />
                AI Enhancer
              </h3>
              <span className="text-[8px] font-bold bg-indigo-50 border border-indigo-100 text-indigo-600 px-1.5 py-0.5 rounded uppercase">
                AI Preview
              </span>
            </div>

            <div className="space-y-2 text-[10px] font-medium text-slate-500">
              <div className="flex justify-between items-center py-1 border-b border-slate-50" title="Auto clustering of documents based on semantic content">
                <span>Smart Collections</span>
                <span className="text-indigo-500 font-semibold">Ready</span>
              </div>
              <div className="flex justify-between items-center py-1 border-b border-slate-50" title="Automatic keyphrase tagging extraction">
                <span>AI Tags & Category</span>
                <span className="text-indigo-500 font-semibold">Ready</span>
              </div>
              <div className="flex justify-between items-center py-1 border-b border-slate-50" title="Interactive visual maps of citations and themes">
                <span>Knowledge Graphs</span>
                <span className="text-indigo-500 font-semibold">Ready</span>
              </div>
              <div className="flex justify-between items-center py-1" title="Duplicate tracking and merging algorithms">
                <span>Duplicate Detection</span>
                <span className="text-indigo-500 font-semibold">Ready</span>
              </div>
            </div>
          </div>

        </aside>

      </div>
    </div>
  );
}
