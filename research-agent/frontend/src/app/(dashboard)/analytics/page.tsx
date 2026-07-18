"use client";

import { useState } from "react";
import {
  BarChart3,
  Brain,
  FileText,
  Clock,
  TrendingUp,
  Award,
  BookOpen,
  Database,
  Github,
  Upload,
  Sparkles,
  Download,
  Share2,
  Plus,
  FileSpreadsheet,
  Info,
  Calendar,
  Layers,
  ArrowUpRight,
  Star,
  Bookmark,
  Hourglass,
  CheckCircle,
  HelpCircle,
  GitCompare,
  TrendingDown,
  ChevronRight,
  Target,
  Trophy,
} from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

// ================= MOCK DATA FOR TAB 1 (ANALYTICS & INSIGHTS) =================
const OVERVIEW_STATS = [
  { name: "Total Papers", val: "148", icon: FileText, change: "+12% this month", up: true },
  { name: "Uploaded Papers", val: "84", icon: Upload, change: "+8% this week", up: true },
  { name: "Saved Papers", val: "64", icon: Bookmark, change: "+4% this month", up: true },
  { name: "AI Summaries", val: "36", icon: Sparkles, change: "+5 this week", up: true },
  { name: "Research Projects", val: "5", icon: Layers, change: "+1 new project", up: true },
  { name: "Bookmarks", val: "62", icon: Bookmark, change: "+8 saved", up: true },
  { name: "Notes", val: "27", icon: FileText, change: "+3 this week", up: true },
  { name: "Hours Saved", val: "48h", icon: Hourglass, change: "+12h this month", up: true },
];

const DOMAINS = [
  { name: "Artificial Intelligence", count: 48, growth: "+24%" },
  { name: "Computer Vision", count: 26, growth: "+18%" },
  { name: "Healthcare AI", count: 18, growth: "+12%" },
  { name: "Cyber Security", count: 14, growth: "+5%" },
  { name: "Robotics", count: 12, growth: "+8%" },
  { name: "IoT", count: 8, growth: "Flat" },
  { name: "Machine Learning", count: 35, growth: "+15%" },
  { name: "Quantum Computing", count: 6, growth: "+35%" },
];

const AI_USAGE_CARDS = [
  { name: "Summaries Generated", count: 112, color: "text-blue-600 bg-blue-50 border-blue-100" },
  { name: "Paper Comparisons", count: 24, color: "text-blue-600 bg-blue-50 border-blue-100" },
  { name: "Gap Detection Runs", count: 16, color: "text-blue-600 bg-blue-50 border-blue-100" },
  { name: "Literature Reviews", count: 8, color: "text-blue-600 bg-blue-50 border-blue-100" },
  { name: "AI Chats", count: 420, color: "text-blue-600 bg-blue-50 border-blue-100" },
  { name: "Recommendations", count: 85, color: "text-blue-600 bg-blue-50 border-blue-100" },
];

const PROJECT_PROGRESS = [
  { name: "Violence Detection", progress: 35, activity: "Annotated 5 CV papers", updated: "2d ago" },
  { name: "Research Agent", progress: 90, activity: "Created architecture schema", updated: "1h ago" },
  { name: "Medical AI", progress: 10, activity: "Created project repository", updated: "1w ago" },
  { name: "Smart Agriculture", progress: 50, activity: "Synced satellite datasets", updated: "3d ago" },
  { name: "Computer Vision", progress: 75, activity: "Finished literature summary", updated: "Yesterday" },
];

const GOALS = [
  { title: "Weekly Goal", desc: "Read 3 papers & summarize", progress: 66, unit: "2/3 papers" },
  { title: "Monthly Goal", desc: "Upload 15 papers to library", progress: 80, unit: "12/15 papers" },
  { title: "Publication Goal", desc: "Finish Draft Lit Review", progress: 40, unit: "40% done" },
  { title: "Reading Goal", desc: "Complete deep learning study", progress: 100, unit: "Completed" },
];

const RECENT_REPORTS = [
  { name: "Literature Review", type: "Synthesis Report", date: "July 15, 2026" },
  { name: "Gap Analysis", type: "Research Gap Report", date: "July 12, 2026" },
  { name: "Paper Comparison", type: "DPO vs RLHF Matrix", date: "July 10, 2026" },
  { name: "Trend Analysis", type: "Annual Citations study", date: "July 08, 2026" },
  { name: "Citation Report", type: "Source Mapping Matrix", date: "July 05, 2026" },
];

const ACHIEVEMENTS = [
  { name: "First Upload", desc: "Uploaded your first academic PDF.", date: "July 01, 2026" },
  { name: "10 Papers Read", desc: "Deep read 10 papers in library.", date: "July 05, 2026" },
  { name: "100 AI Chats", desc: "Discussed research with AI 100 times.", date: "July 10, 2026" },
  { name: "Research Explorer", desc: "Created 5 custom collections.", date: "July 12, 2026" },
  { name: "Publication Ready", desc: "Completed your first literature draft.", date: "July 15, 2026" },
  { name: "AI Power User", desc: "Used all AI tools at least once.", date: "July 16, 2026" },
];

// ================= MOCK DATA FOR TAB 2 (RESEARCH INTELLIGENCE) =================
const GAP_REPORTS = [
  { topic: "Few-shot DPO under extreme low-rank matrix constraints", date: "July 16, 2026", status: "Completed" },
  { topic: "Vision-Language sequence mapping for medical diagnostics", date: "July 12, 2026", status: "Completed" },
];

const COMPARISON_ROWS = [
  { metric: "Methodology", paperA: "DPO: Optimizes directly on preference pairs", paperB: "RLHF: Fits reward model, optimizes policy via PPO" },
  { metric: "Datasets", paperA: "DPO preference data pairs", paperB: "Human feedback scores + prompt buffers" },
  { metric: "Models", paperA: "Reference policy + Active policy", paperB: "Reward model + Actor + Critic + Reference" },
  { metric: "Results", paperA: "Stable, lightweight, matches PPO benchmarks", paperB: "High performance, prone to mode collapse" },
  { metric: "Advantages", paperA: "Computational simplicity, stable optimization", paperB: "Flexible feedback weighting across criteria" },
  { metric: "Limitations", paperA: "Overfitting on small preference ratios", paperB: "High hyperparameter training complexity" },
];

const RECOMMENDED_TOPICS = [
  { name: "Vision Language Models", difficulty: "Hard", novelty: 8.5, trend: "+42% citations" },
  { name: "Healthcare AI", difficulty: "Medium", novelty: 7.8, trend: "+35% citations" },
  { name: "AI Agents", difficulty: "Hard", novelty: 9.2, trend: "+85% citations" },
  { name: "Quantum Machine Learning", difficulty: "Expert", novelty: 9.8, trend: "+12% citations" },
  { name: "Smart Agriculture", difficulty: "Easy", novelty: 6.5, trend: "+18% citations" },
  { name: "Cyber Security", difficulty: "Medium", novelty: 7.2, trend: "+24% citations" },
];

const JOURNALS = [
  { name: "IEEE Transactions on Pattern Analysis", pub: "IEEE", impact: "24.3", accept: "12%", time: "8 m", oa: "Yes" },
  { name: "Journal of Machine Learning Research", pub: "JMLR", impact: "8.5", accept: "15%", time: "6 m", oa: "Yes" },
  { name: "Nature Machine Intelligence", pub: "Nature Portfolio", impact: "18.8", accept: "8%", time: "10 m", oa: "No" },
];

const CONFERENCES = [
  { name: "NeurIPS", rank: "A*", accept: "20%", deadline: "May 15, 2026", areas: "Deep Learning, Algorithms" },
  { name: "ICLR", rank: "A*", accept: "25%", deadline: "Oct 05, 2026", areas: "Representation Learning, LLMs" },
  { name: "CVPR", rank: "A*", accept: "22%", deadline: "Nov 12, 2026", areas: "Computer Vision, Multimodal" },
];

const DATASETS = [
  { name: "ImageNet-1K", domain: "Computer Vision", size: "150 GB", license: "Non-commercial" },
  { name: "MS-COCO", domain: "Object Detection", size: "25 GB", license: "CC BY 4.0" },
  { name: "Llama-Instruction-FineTuning", domain: "LLM Alignment", size: "1.2 GB", license: "Apache 2.0" },
];

const REPOS = [
  { name: "huggingface/transformers", stars: "124k", lang: "Python", updated: "2h ago" },
  { name: "meta-llama/llama", stars: "52k", lang: "Python", updated: "1d ago" },
  { name: "google-deepmind/alphageometry", stars: "8k", lang: "Python/Lean", updated: "3d ago" },
];

export default function ResearchAnalyticsPage() {
  const [activeTab, setActiveTab] = useState<"analytics" | "intelligence">("analytics");

  return (
    <div className="space-y-8 pb-12 selection:bg-blue-100 selection:text-blue-900">
      
      {/* PAGE HEADER */}
      <section className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm">
        <div className="space-y-1">
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
            {activeTab === "analytics" ? "Research Analytics" : "Research Intelligence Hub"}
          </h1>
          <p className="text-slate-500 text-sm font-medium">
            {activeTab === "analytics" 
              ? "Track your research journey, productivity, and AI-powered insights." 
              : "Discover insights, compare papers, identify research gaps, explore trends, and accelerate your research journey."}
          </p>
        </div>
        <div className="flex gap-2">
          {activeTab === "analytics" ? (
            <>
              <button
                onClick={() => alert("Exporting mock analytics data...")}
                className="inline-flex items-center gap-1.5 px-4 py-2.5 border border-slate-200 hover:border-blue-400 text-slate-700 hover:text-blue-600 font-semibold rounded-xl text-xs transition-colors bg-white shadow-sm"
              >
                Export Analytics
              </button>
              <button
                onClick={() => alert("Generating custom research activity report...")}
                className="inline-flex items-center gap-1.5 px-4 py-2.5 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-semibold rounded-xl text-xs transition-all shadow-md active:scale-95"
              >
                Generate Report
              </button>
            </>
          ) : (
            <>
              <Link
                href="/upload"
                className="inline-flex items-center gap-1.5 px-4 py-2.5 border border-slate-200 hover:border-blue-400 text-slate-700 hover:text-blue-600 font-semibold rounded-xl text-xs transition-colors bg-white shadow-sm"
              >
                <Upload size={14} />
                Upload Papers
              </Link>
              <button
                onClick={() => alert("Initializing mock analysis pipeline...")}
                className="inline-flex items-center gap-1.5 px-4 py-2.5 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-semibold rounded-xl text-xs transition-all shadow-md active:scale-95"
              >
                <Sparkles size={14} />
                Analyze Research
              </button>
            </>
          )}
        </div>
      </section>

      {/* CORE NAVIGATION TABS */}
      <div className="flex border-b border-slate-200 pb-px">
        <button
          onClick={() => setActiveTab("analytics")}
          className={cn(
            "flex items-center space-x-2 px-6 py-3 border-b-2 font-bold text-xs tracking-wide transition-all uppercase outline-none",
            activeTab === "analytics"
              ? "border-blue-600 text-blue-600"
              : "border-transparent text-slate-400 hover:text-slate-600"
          )}
        >
          <BarChart3 size={14} />
          <span>Analytics & Insights</span>
        </button>
        <button
          onClick={() => setActiveTab("intelligence")}
          className={cn(
            "flex items-center space-x-2 px-6 py-3 border-b-2 font-bold text-xs tracking-wide transition-all uppercase outline-none",
            activeTab === "intelligence"
              ? "border-blue-600 text-blue-600"
              : "border-transparent text-slate-400 hover:text-slate-600"
          )}
        >
          <Brain size={14} />
          <span>Research Intelligence</span>
        </button>
      </div>

      {/* DYNAMIC SCREEN VIEWPORT */}
      <div className="grid lg:grid-cols-4 gap-8 items-start">
        
        {/* LEFT COLUMN: Main tab view content */}
        <div className="lg:col-span-3 space-y-8">
          
          {/* ======================= TAB 1: RESEARCH ANALYTICS ======================= */}
          {activeTab === "analytics" && (
            <>
              {/* Overview Stats Grid */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {OVERVIEW_STATS.map((stat, idx) => {
                  const Icon = stat.icon;
                  return (
                    <div key={idx} className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm space-y-2">
                      <div className="flex justify-between items-center text-slate-400">
                        <Icon size={18} />
                        <span className="text-[10px] font-bold text-emerald-600 flex items-center gap-0.5"><TrendingUp size={10} /></span>
                      </div>
                      <div>
                        <span className="text-2xl font-black text-slate-800">{stat.val}</span>
                        <h4 className="text-xs font-semibold text-slate-500 truncate mt-1">{stat.name}</h4>
                      </div>
                      <div className="text-[10px] font-medium text-slate-400 truncate">{stat.change}</div>
                    </div>
                  );
                })}
              </div>

              {/* Research Activity Chart Placeholder */}
              <div className="p-6 bg-white border border-slate-200 rounded-2xl shadow-sm space-y-4">
                <div className="flex justify-between items-center">
                  <h3 className="text-sm font-bold text-slate-800">Research Activity</h3>
                  <div className="flex items-center space-x-1.5 text-[10px] font-bold text-slate-400 bg-slate-50 p-1 border border-slate-200 rounded-lg">
                    <span className="px-2 py-1 hover:text-slate-800 cursor-pointer">Daily</span>
                    <span className="px-2 py-1 bg-white border border-slate-200/50 text-slate-800 rounded shadow-sm">Weekly</span>
                    <span className="px-2 py-1 hover:text-slate-800 cursor-pointer">Monthly</span>
                  </div>
                </div>

                <div className="h-44 flex items-end justify-between border-b border-slate-200 pb-2 font-mono text-[9px] text-slate-400 pt-4">
                  <div className="flex flex-col items-center"><div className="w-10 bg-blue-600/10 h-16 rounded-t" /><span className="mt-1">Mon</span></div>
                  <div className="flex flex-col items-center"><div className="w-10 bg-blue-600/10 h-28 rounded-t" /><span className="mt-1">Tue</span></div>
                  <div className="flex flex-col items-center"><div className="w-10 bg-blue-600/10 h-20 rounded-t" /><span className="mt-1">Wed</span></div>
                  <div className="flex flex-col items-center"><div className="w-10 bg-blue-600 h-36 rounded-t" /><span className="mt-1">Thu</span></div>
                  <div className="flex flex-col items-center"><div className="w-10 bg-blue-600/10 h-14 rounded-t" /><span className="mt-1">Fri</span></div>
                  <div className="flex flex-col items-center"><div className="w-10 bg-blue-600/10 h-24 rounded-t" /><span className="mt-1">Sat</span></div>
                  <div className="flex flex-col items-center"><div className="w-10 bg-blue-600/10 h-8 rounded-t" /><span className="mt-1">Sun</span></div>
                </div>
              </div>

              {/* Research Domains Grid */}
              <div className="space-y-3">
                <h3 className="text-sm font-bold text-slate-800">Research Domains</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {DOMAINS.map((domain, idx) => (
                    <div key={idx} className="p-4 bg-white border border-slate-200 rounded-2xl shadow-sm space-y-1">
                      <h4 className="text-xs font-bold text-slate-800 truncate">{domain.name}</h4>
                      <div className="flex justify-between items-center pt-2">
                        <span className="text-sm font-black text-slate-800">{domain.count} papers</span>
                        {domain.growth !== "Flat" && (
                          <span className="text-[9px] font-bold text-emerald-600">{domain.growth}</span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* AI Usage */}
              <div className="space-y-3">
                <h3 className="text-sm font-bold text-slate-800">AI Usage</h3>
                <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
                  {AI_USAGE_CARDS.map((card, idx) => (
                    <div key={idx} className="p-4 bg-white border border-slate-200 rounded-2xl shadow-sm text-center space-y-1">
                      <span className="text-2xl font-black text-slate-800 block">{card.count}</span>
                      <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider block truncate">
                        {card.name}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Project Progress */}
              <div className="space-y-3">
                <h3 className="text-sm font-bold text-slate-800">Project Progress</h3>
                <div className="grid sm:grid-cols-2 gap-4">
                  {PROJECT_PROGRESS.map((proj, idx) => (
                    <div key={idx} className="p-5 bg-white border border-slate-200 rounded-2xl shadow-sm space-y-3">
                      <div className="flex justify-between items-start">
                        <div>
                          <h4 className="text-xs font-bold text-slate-800">{proj.name}</h4>
                          <span className="text-[10px] text-slate-400 block mt-1">Act: {proj.activity}</span>
                        </div>
                        <span className="text-[9px] text-slate-400 font-semibold">{proj.updated}</span>
                      </div>
                      
                      {/* Bar progress */}
                      <div className="space-y-1">
                        <div className="flex justify-between items-center text-[10px] text-slate-400 font-bold">
                          <span>Progress</span>
                          <span>{proj.progress}%</span>
                        </div>
                        <div className="w-full bg-slate-100 rounded-full h-1 overflow-hidden">
                          <div className="bg-blue-600 h-1 rounded-full" style={{ width: `${proj.progress}%` }} />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Productivity Stats (Mock charts for papers read, uploaded, notes, bookmarks, sessions) */}
              <div className="p-6 bg-white border border-slate-200 rounded-2xl shadow-sm space-y-4">
                <h3 className="text-sm font-bold text-slate-800">Productivity Metrics</h3>
                <div className="grid sm:grid-cols-5 gap-4 font-mono text-[9px] text-slate-500">
                  <div className="p-3 bg-slate-50 border border-slate-100 rounded-xl space-y-2 text-center">
                    <span className="text-slate-400 block">Papers Read</span>
                    <span className="text-base font-black text-slate-800 block">42</span>
                    <div className="w-full bg-slate-200 h-1 rounded overflow-hidden"><div className="bg-blue-600 h-1 w-4/5" /></div>
                  </div>
                  <div className="p-3 bg-slate-50 border border-slate-100 rounded-xl space-y-2 text-center">
                    <span className="text-slate-400 block">Papers Uploaded</span>
                    <span className="text-base font-black text-slate-800 block">84</span>
                    <div className="w-full bg-slate-200 h-1 rounded overflow-hidden"><div className="bg-blue-600 h-1 w-[90%]" /></div>
                  </div>
                  <div className="p-3 bg-slate-50 border border-slate-100 rounded-xl space-y-2 text-center">
                    <span className="text-slate-400 block">Notes Created</span>
                    <span className="text-base font-black text-slate-800 block">27</span>
                    <div className="w-full bg-slate-200 h-1 rounded overflow-hidden"><div className="bg-blue-600 h-1 w-2/3" /></div>
                  </div>
                  <div className="p-3 bg-slate-50 border border-slate-100 rounded-xl space-y-2 text-center">
                    <span className="text-slate-400 block">Bookmarks</span>
                    <span className="text-base font-black text-slate-800 block">62</span>
                    <div className="w-full bg-slate-200 h-1 rounded overflow-hidden"><div className="bg-blue-600 h-1 w-[75%]" /></div>
                  </div>
                  <div className="p-3 bg-slate-50 border border-slate-100 rounded-xl space-y-2 text-center">
                    <span className="text-slate-400 block">Sessions</span>
                    <span className="text-base font-black text-slate-800 block">18</span>
                    <div className="w-full bg-slate-200 h-1 rounded overflow-hidden"><div className="bg-blue-600 h-1 w-1/2" /></div>
                  </div>
                </div>
              </div>

              {/* Goals Progress */}
              <div className="space-y-3">
                <h3 className="text-sm font-bold text-slate-800">Goals & Targets</h3>
                <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-4">
                  {GOALS.map((goal, idx) => (
                    <div key={idx} className="p-4 bg-white border border-slate-200 rounded-2xl shadow-sm space-y-3 flex flex-col justify-between">
                      <div className="space-y-1">
                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">{goal.title}</span>
                        <h4 className="text-xs font-bold text-slate-800 leading-snug">{goal.desc}</h4>
                      </div>
                      <div className="space-y-1 pt-2">
                        <div className="flex justify-between items-center text-[9px] text-slate-400 font-semibold">
                          <span>{goal.unit}</span>
                          <span>{goal.progress}%</span>
                        </div>
                        <div className="w-full bg-slate-100 rounded-full h-1 overflow-hidden">
                          <div className="bg-blue-600 h-1 rounded-full" style={{ width: `${goal.progress}%` }} />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Recent Reports & Achievements Grid */}
              <div className="grid sm:grid-cols-2 gap-6">
                
                {/* Recent Reports */}
                <div className="p-6 bg-white border border-slate-200 rounded-2xl shadow-sm space-y-4">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">Recent Generated Reports</h3>
                  <div className="space-y-2 text-xs font-semibold text-slate-600 leading-normal">
                    {RECENT_REPORTS.map((rep, idx) => (
                      <div key={idx} className="p-2.5 bg-slate-50 border border-slate-100 rounded-xl flex justify-between items-center">
                        <div>
                          <span className="font-bold text-slate-800 block">{rep.name}</span>
                          <span className="text-[10px] text-slate-400 font-semibold block mt-0.5">{rep.type}</span>
                        </div>
                        <span className="text-[10px] text-slate-400">{rep.date}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Achievements Badges */}
                <div className="p-6 bg-white border border-slate-200 rounded-2xl shadow-sm space-y-4">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1">
                    <Trophy size={12} className="text-amber-500" />
                    Milestones & Achievements
                  </h3>
                  <div className="grid grid-cols-2 gap-2 text-[10px] font-semibold text-slate-600">
                    {ACHIEVEMENTS.map((ach, idx) => (
                      <div key={idx} className="p-2.5 bg-slate-50 border border-slate-100 rounded-xl space-y-1 relative group cursor-help">
                        <span className="font-bold text-slate-800 truncate block">{ach.name}</span>
                        <span className="text-[8px] text-slate-400 font-semibold block">{ach.date}</span>
                        {/* Hover Tooltip */}
                        <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 hidden group-hover:block bg-slate-950 text-slate-100 text-[9px] p-2 rounded-lg whitespace-nowrap z-50 shadow-md">
                          {ach.desc}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

              </div>
            </>
          )}

          {/* ======================= TAB 2: RESEARCH INTELLIGENCE (Previous tab layout context) ======================= */}
          {activeTab === "intelligence" && (
            <>
              {/* Feature 1: Research Gap Detection */}
              <div className="p-6 bg-white border border-slate-200 rounded-2xl shadow-sm space-y-4 relative overflow-hidden">
                <div className="absolute top-0 right-0 p-4">
                  <span className="px-2 py-0.5 text-[9px] font-bold bg-indigo-50 border border-indigo-100 text-indigo-600 rounded">
                    AI Preview
                  </span>
                </div>

                <div className="space-y-1 max-w-xl">
                  <h3 className="text-base font-bold text-slate-800 flex items-center gap-1.5">
                    <Brain size={16} className="text-blue-600" />
                    Research Gap Detection
                  </h3>
                  <p className="text-xs text-slate-500 leading-relaxed">
                    Identify contradictions, limitations, or unexplored topics in literature arrays. Our models analyze methodology descriptions and highlight key structural gaps.
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-50 grid sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Recent Gap Reports</span>
                    <div className="space-y-1.5">
                      {GAP_REPORTS.map((rep, idx) => (
                        <div key={idx} className="p-2.5 bg-slate-50 border border-slate-100 rounded-xl flex justify-between items-center text-xs">
                          <span className="font-semibold text-slate-700 truncate max-w-[200px]">{rep.topic}</span>
                          <span className="text-[9px] text-slate-400 font-medium">{rep.date}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="flex flex-col justify-between items-end">
                    <div className="text-right text-xs">
                      <span className="text-slate-400 block">Gap Pipeline status</span>
                      <span className="font-bold text-emerald-600 flex items-center justify-end gap-1 mt-0.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                        Ready
                      </span>
                    </div>
                    <button className="px-4 py-2 border border-slate-200 hover:border-blue-400 hover:text-blue-600 text-xs font-semibold rounded-xl bg-white shadow-sm mt-4">
                      Run Gap Analysis
                    </button>
                  </div>
                </div>
              </div>

              {/* Feature 2: Multi-Paper Comparison */}
              <div className="p-6 bg-white border border-slate-200 rounded-2xl shadow-sm space-y-4">
                <h3 className="text-base font-bold text-slate-800 flex items-center gap-1.5">
                  <GitCompare size={16} className="text-blue-600" />
                  Multi-Paper Comparison Table
                </h3>
                
                <div className="border border-slate-200 rounded-xl overflow-hidden">
                  <table className="w-full text-left border-collapse text-xs">
                    <thead>
                      <tr className="border-b border-slate-200 bg-slate-50/50 font-bold text-slate-500 uppercase tracking-wider text-[10px]">
                        <th className="p-3 w-1/4">Metric</th>
                        <th className="p-3 w-3/8 border-l border-slate-200">Attention Is All You Need</th>
                        <th className="p-3 w-3/8 border-l border-slate-200">Direct Preference Optimization</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 font-medium text-slate-600">
                      {COMPARISON_ROWS.map((row, idx) => (
                        <tr key={idx} className="hover:bg-slate-50/30">
                          <td className="p-3 font-bold text-slate-700">{row.metric}</td>
                          <td className="p-3 border-l border-slate-200 leading-relaxed">{row.paperA}</td>
                          <td className="p-3 border-l border-slate-200 leading-relaxed">{row.paperB}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Timeline & Trends */}
              <div className="grid sm:grid-cols-2 gap-6">
                
                {/* Timeline */}
                <div className="p-6 bg-white border border-slate-200 rounded-2xl shadow-sm space-y-4">
                  <h3 className="text-sm font-bold text-slate-800 flex items-center gap-1.5">
                    <Clock size={16} className="text-blue-600" />
                    Research Timeline
                  </h3>
                  <div className="relative border-l border-slate-200 pl-6 space-y-4 text-xs leading-relaxed ml-2 pt-2">
                    {[
                      { year: 2017, title: "Transformer Architecture Launch", detail: "Vaswani et al. introduce attention models." },
                      { year: 2020, title: "Scaling Laws & Few-shot Learning", detail: "GPT-3 shows general few-shot learning." },
                      { year: 2023, title: "Direct Preference Optimization", detail: "Rafailov et al. propose DPO preference alternative." },
                    ].map((item, idx) => (
                      <div key={idx} className="relative">
                        <span className="absolute -left-[31px] top-1 h-3 w-3 rounded-full bg-blue-600 ring-4 ring-white" />
                        <div className="space-y-0.5">
                          <span className="font-black text-blue-600 text-xs">{item.year}</span>
                          <h4 className="font-bold text-slate-800">{item.title}</h4>
                          <p className="text-slate-400">{item.detail}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Trending Recommendation Topics */}
                <div className="p-6 bg-white border border-slate-200 rounded-2xl shadow-sm space-y-4">
                  <h3 className="text-sm font-bold text-slate-800 flex items-center gap-1.5">
                    <Award size={16} className="text-blue-600" />
                    Topic Recommendations
                  </h3>
                  <div className="grid grid-cols-2 gap-2 text-[10px] font-semibold text-slate-600">
                    {RECOMMENDED_TOPICS.map((topic, idx) => (
                      <div key={idx} className="p-2.5 bg-slate-50 border border-slate-100 rounded-xl space-y-1">
                        <h4 className="font-bold text-slate-800 truncate">{topic.name}</h4>
                        <span className="text-[8px] text-slate-400 block uppercase font-bold">{topic.difficulty} &bull; {topic.trend}</span>
                      </div>
                    ))}
                  </div>
                </div>

              </div>
            </>
          )}

        </div>

        {/* ======================= COLUMN 3: RIGHT PANEL (Insights & Exports) ======================= */}
        <aside className="lg:col-span-1 space-y-6">
          
          {/* QUICK INSIGHTS */}
          <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
              <Info size={14} />
              Quick Insights
            </h3>

            <div className="space-y-3 text-xs leading-relaxed font-semibold">
              <div className="p-2.5 bg-slate-50 border border-slate-100 rounded-xl">
                <span className="text-blue-600 block text-[9px] uppercase font-bold">Research Velocity</span>
                <p className="text-slate-700 mt-0.5">Your library size grew by 15% this week.</p>
              </div>
              <div className="p-2.5 bg-slate-50 border border-slate-100 rounded-xl">
                <span className="text-blue-600 block text-[9px] uppercase font-bold">AI Time Savings</span>
                <p className="text-slate-700 mt-0.5">AI summaries saved you approximately 48 hours this month.</p>
              </div>
            </div>
          </div>

          {/* EXPORT OPTIONS */}
          <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">Export Report</h3>
            <div className="space-y-1.5">
              <button onClick={() => alert("Exporting PDF Report...")} className="w-full py-2 bg-slate-50 hover:bg-slate-100 text-slate-600 hover:text-slate-800 border border-slate-200 rounded-xl text-center text-[10px] font-bold flex items-center justify-center gap-1.5 transition-all">
                <FileText size={12} />
                Export PDF
              </button>
              <button onClick={() => alert("Exporting Excel Matrix...")} className="w-full py-2 bg-slate-50 hover:bg-slate-100 text-slate-600 hover:text-slate-800 border border-slate-200 rounded-xl text-center text-[10px] font-bold flex items-center justify-center gap-1.5 transition-all">
                <FileSpreadsheet size={12} />
                Export Excel
              </button>
              <button onClick={() => alert("Exporting CSV Matrix...")} className="w-full py-2 bg-slate-50 hover:bg-slate-100 text-slate-600 hover:text-slate-800 border border-slate-200 rounded-xl text-center text-[10px] font-bold flex items-center justify-center gap-1.5 transition-all">
                <FileSpreadsheet size={12} />
                Export CSV
              </button>
            </div>
          </div>

          {/* FUTURE INTEGRATIONS (Google Scholar, ORCID, Scopus, Web of Science) */}
          <div className="bg-white border border-indigo-50 rounded-2xl p-5 shadow-sm space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                <Target size={14} className="text-indigo-400" />
                Impact Mappings
              </h3>
              <span className="text-[8px] font-bold bg-indigo-50 border border-indigo-100 text-indigo-600 px-1.5 py-0.5 rounded uppercase">
                AI Preview
              </span>
            </div>

            <div className="space-y-2 text-[10px] font-medium text-slate-500">
              <div className="flex justify-between items-center py-1 border-b border-slate-50">
                <span>Citation Indexes</span>
                <span className="text-indigo-500 font-semibold">Google Scholar & Scopus</span>
              </div>
              <div className="flex justify-between items-center py-1 border-b border-slate-50">
                <span>Researcher Profile</span>
                <span className="text-indigo-500 font-semibold">ORCID Sync</span>
              </div>
              <div className="flex justify-between items-center py-1">
                <span>AI Research Score</span>
                <span className="text-indigo-500 font-semibold">Impact Score (Coming)</span>
              </div>
            </div>
          </div>

        </aside>

      </div>
    </div>
  );
}
