"use client";

import { useState } from "react";
import {
  Newspaper,
  Calendar,
  DollarSign,
  Bookmark,
  Share2,
  ExternalLink,
  Flame,
  Star,
  Clock,
  ChevronRight,
  Sparkles,
  Info,
  Database,
  ArrowUpRight,
  TrendingUp,
} from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

// Mock Data
const FILTER_CHIPS = [
  "All",
  "Artificial Intelligence",
  "Machine Learning",
  "Computer Vision",
  "Healthcare",
  "Cyber Security",
  "Robotics",
  "IoT",
  "Quantum Computing",
  "LLMs",
  "Data Science",
];

const BREAKING_NEWS = {
  headline: "AlphaFold 3 predicts structures and interactions of all life molecules",
  summary: "Google DeepMind has introduced AlphaFold 3, a revolutionary model capable of predicting the structure and interactions of DNA, RNA, chemical compounds, and proteins with unprecedented accuracy. This represents a paradigm shift in drug discovery and molecular biology, enabling researchers to map biological interactions at atomic resolution.",
  source: "Nature Biotechnology",
  date: "July 16, 2026",
};

const LATEST_NEWS = [
  {
    id: 1,
    headline: "Direct Preference Optimization narrows alignment gaps in edge-device models",
    category: "LLMs",
    summary: "New benchmarks show DPO optimizations drastically reduce parameters required for preference alignment, paving the way for on-device reasoning pipelines.",
    publisher: "MIT Tech Review",
    date: "July 15, 2026",
  },
  {
    id: 2,
    headline: "Vision Transformers achieve state-of-the-art in low-light surveillance detection",
    category: "Computer Vision",
    summary: "A novel routing block in ViTs yields 94% accuracy under high occlusion and minimal ambient light conditions, matching thermal imaging streams.",
    publisher: "IEEE Pattern Analysis",
    date: "July 14, 2026",
  },
  {
    id: 3,
    headline: "Multi-spectral satellite mapping improves smart agriculture yield prediction",
    category: "Data Science",
    summary: "Integrating spatial temporal convolutional nets with local soil humidity indexes increases crop output estimates reliability by 15%.",
    publisher: "MDPI Agronomy",
    date: "July 12, 2026",
  },
];

const CONFERENCES = [
  {
    name: "NeurIPS 2026",
    location: "Vancouver, Canada",
    deadline: "May 15, 2026",
    dates: "Dec 08 - Dec 14, 2026",
    areas: "Deep Learning, Optimization",
  },
  {
    name: "ICLR 2026",
    location: "Vienna, Austria",
    deadline: "Oct 05, 2026",
    dates: "May 04 - May 08, 2026",
    areas: "Representation Learning, LLMs",
  },
];

const CALL_FOR_PAPERS = [
  { name: "Special Issue: Agentic AI Systems", type: "IEEE Intelligent Systems", deadline: "Sept 30, 2026", topics: "Tool loops, Multi-agent scheduling", status: "Open" },
  { name: "Theme: Privacy in Federated Learning", type: "ACM Transactions on Security", deadline: "Oct 15, 2026", topics: "Differential privacy, Encryption", status: "Open" },
];

const GRANTS = [
  { agency: "National Science Foundation (NSF)", amount: "$500,000", eligibility: "Academic Institutions", deadline: "Nov 01, 2026", domain: "Artificial Intelligence" },
  { agency: "European Research Council (ERC)", amount: "€1,500,000", eligibility: "Early Career Researchers", deadline: "Oct 15, 2026", domain: "Quantum Computing" },
];

const TRENDING_PAPERS = [
  { title: "Attention Is All You Need", authors: "Vaswani et al.", journal: "NeurIPS", year: 2017, citations: 120450 },
  { title: "Direct Preference Optimization", authors: "Rafailov et al.", journal: "NeurIPS", year: 2023, citations: 850 },
];

const EDITORS_PICKS = [
  {
    title: "Constitutional AI: Harmlessness from AI Feedback",
    note: "Excellent breakdown of reinforcement learning bypass using targeted constitutional rules feedback pools.",
    authors: "Bai et al. (Anthropic)",
  },
];

const EVENTS = [
  { title: "Webinar: Mechanical Interpretability of MoEs", type: "Webinar", date: "July 20, 2026", time: "10:00 AM EST" },
  { title: "Hackathon: Ollama Local Agent Ingestion", type: "Hackathon", date: "Aug 02, 2026", time: "Virtual" },
];

const FUTURE_INTEGRATION_PARTNERS = [
  { name: "Nature Portfolio", type: "Journal Index" },
  { name: "IEEE Xplore", type: "Publications" },
  { name: "Springer Link", type: "Science Index" },
  { name: "arXiv API", type: "Preprint Feed" },
  { name: "Google News", type: "Global News API" },
];

export default function ResearchNewsPage() {
  const [selectedChip, setSelectedChip] = useState("All");
  const [activeTab, setActiveTab] = useState<"news" | "events" | "funding">("news");
  const [savedNewsIds, setSavedNewsIds] = useState<number[]>([]);

  const handleToggleSaveNews = (id: number) => {
    setSavedNewsIds(
      savedNewsIds.includes(id) 
        ? savedNewsIds.filter(item => item !== id) 
        : [...savedNewsIds, id]
    );
  };

  return (
    <div className="space-y-8 pb-12 selection:bg-blue-100 selection:text-blue-900">
      
      {/* PAGE HEADER */}
      <section className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm">
        <div className="space-y-1">
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
            Research News & Discover
          </h1>
          <p className="text-slate-500 text-sm font-medium">
            Stay updated with the latest breakthroughs, publications, conferences, and funding opportunities.
          </p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => alert("Customizing mock research feed preferences...")}
            className="inline-flex items-center gap-1.5 px-4 py-2.5 border border-slate-200 hover:border-blue-400 text-slate-700 hover:text-blue-600 font-semibold rounded-xl text-xs transition-colors bg-white shadow-sm"
          >
            Customize Feed
          </button>
          <Link
            href="/papers"
            className="inline-flex items-center gap-1.5 px-4 py-2.5 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-semibold rounded-xl text-xs transition-all shadow-md active:scale-95"
          >
            Explore Papers
          </Link>
        </div>
      </section>

      {/* FILTER CHIPS BAR */}
      <div className="flex items-center space-x-2 overflow-x-auto pb-2 scrollbar-none">
        {FILTER_CHIPS.map((chip) => (
          <button
            key={chip}
            onClick={() => setSelectedChip(chip)}
            className={cn(
              "px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-colors border",
              selectedChip === chip
                ? "bg-blue-600 text-white border-blue-600 shadow-sm"
                : "bg-white text-slate-600 border-slate-200 hover:border-slate-350"
            )}
          >
            {chip}
          </button>
        ))}
      </div>

      {/* DYNAMIC TWO-COLUMN FEED LAYOUT */}
      <div className="grid lg:grid-cols-4 gap-8 items-start">
        
        {/* LEFT COLUMN: Main Discovery Feed */}
        <div className="lg:col-span-3 space-y-8">
          
          {/* BREAKING NEWS SPOTLIGHT */}
          <section className="p-6 bg-white border border-slate-200 rounded-2xl shadow-sm space-y-4 relative overflow-hidden">
            {/* Visual Accent */}
            <div className="absolute top-0 left-0 w-1.5 h-full bg-gradient-to-b from-blue-600 to-indigo-600" />
            
            <div className="space-y-2 pl-2">
              <div className="flex justify-between items-center text-[10px] text-slate-400 font-bold uppercase tracking-wider">
                <span className="text-blue-650 flex items-center gap-1">
                  <Flame size={12} className="text-orange-500" />
                  Breaking Research
                </span>
                <span>{BREAKING_NEWS.date}</span>
              </div>
              <h2 className="text-xl font-extrabold text-slate-900 leading-snug hover:text-blue-600 cursor-pointer">
                {BREAKING_NEWS.headline}
              </h2>
              <p className="text-xs text-slate-500 leading-relaxed font-normal">
                {BREAKING_NEWS.summary}
              </p>
              <div className="flex justify-between items-center pt-4 border-t border-slate-50 text-xs font-semibold">
                <span className="text-slate-400">Source: {BREAKING_NEWS.source}</span>
                <div className="flex space-x-3">
                  <button className="text-slate-400 hover:text-slate-600">
                    <Bookmark size={14} />
                  </button>
                  <button className="text-blue-600 hover:text-blue-700 inline-flex items-center gap-0.5">
                    Read More
                    <ChevronRight size={14} />
                  </button>
                </div>
              </div>
            </div>
          </section>

          {/* SUB-TABS NAVIGATION FOR DEEPER DISCOVERY */}
          <div className="flex border-b border-slate-200 pb-px">
            {[
              { id: "news", name: "Latest Breakthroughs", icon: Newspaper },
              { id: "events", name: "Conferences & Events", icon: Calendar },
              { id: "funding", name: "Funding & Grants", icon: DollarSign },
            ].map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={cn(
                    "flex items-center space-x-2 px-6 py-3 border-b-2 font-bold text-xs tracking-wide transition-all uppercase outline-none",
                    isActive
                      ? "border-blue-600 text-blue-600"
                      : "border-transparent text-slate-400 hover:text-slate-600"
                  )}
                >
                  <Icon size={14} />
                  <span>{tab.name}</span>
                </button>
              );
            })}
          </div>

          {/* TAB 1: LATEST BREAKTHROUGHS */}
          {activeTab === "news" && (
            <div className="space-y-6">
              {/* Latest News Items list */}
              <div className="space-y-4">
                {LATEST_NEWS.map((news) => {
                  const isSaved = savedNewsIds.includes(news.id);
                  return (
                    <div
                      key={news.id}
                      className="p-5 bg-white border border-slate-200 rounded-2xl shadow-sm hover:border-blue-400 transition-colors flex flex-col justify-between gap-3"
                    >
                      <div className="space-y-2">
                        <div className="flex justify-between items-start gap-4">
                          <span className="px-2 py-0.5 rounded bg-blue-50 text-blue-600 text-[9px] font-bold uppercase tracking-wider">
                            {news.category}
                          </span>
                          <button
                            onClick={() => handleToggleSaveNews(news.id)}
                            className={cn(
                              "p-1 rounded hover:bg-slate-50 transition-colors",
                              isSaved ? "text-amber-500" : "text-slate-400"
                            )}
                          >
                            <Star size={14} fill={isSaved ? "currentColor" : "none"} />
                          </button>
                        </div>
                        <h3 className="font-bold text-slate-800 text-sm leading-snug hover:text-blue-600 cursor-pointer">
                          {news.headline}
                        </h3>
                        <p className="text-xs text-slate-500 leading-relaxed font-normal">
                          {news.summary}
                        </p>
                      </div>
                      <div className="flex justify-between items-center pt-2 border-t border-slate-50 text-[10px] text-slate-400 font-bold">
                        <span>{news.publisher} &bull; {news.date}</span>
                        <div className="flex items-center space-x-3">
                          <button className="hover:text-blue-600 transition-colors flex items-center gap-1">
                            <Share2 size={12} />
                            Share
                          </button>
                          <button className="text-blue-600 hover:text-blue-700 transition-colors">
                            Read Article &rarr;
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Editor's Picks & Trending Papers */}
              <div className="grid sm:grid-cols-2 gap-6">
                
                {/* Editor's Picks */}
                <div className="p-5 bg-white border border-slate-200 rounded-2xl shadow-sm space-y-4">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                    <Sparkles size={14} className="text-blue-600" />
                    Editor&apos;s Picks
                  </h3>
                  {EDITORS_PICKS.map((pick, idx) => (
                    <div key={idx} className="p-3.5 bg-slate-50 border border-slate-100 rounded-xl space-y-2">
                      <h4 className="text-xs font-bold text-slate-800 leading-snug">{pick.title}</h4>
                      <p className="text-[10px] text-slate-500 leading-relaxed italic">
                        &ldquo;{pick.note}&rdquo;
                      </p>
                      <span className="text-[9px] text-slate-400 font-semibold block">{pick.authors}</span>
                    </div>
                  ))}
                </div>

                {/* Trending Papers list */}
                <div className="p-5 bg-white border border-slate-200 rounded-2xl shadow-sm space-y-4">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                    <TrendingUp size={14} className="text-blue-600" />
                    Trending Papers
                  </h3>
                  <div className="space-y-3">
                    {TRENDING_PAPERS.map((paper, idx) => (
                      <div key={idx} className="p-3 bg-slate-50 border border-slate-100 rounded-xl flex justify-between items-center text-xs">
                        <div className="truncate max-w-[180px]">
                          <span className="font-bold text-slate-800 block truncate">{paper.title}</span>
                          <span className="text-[10px] text-slate-400 font-semibold">{paper.authors} ({paper.year})</span>
                        </div>
                        <span className="text-[10px] font-bold text-blue-600 flex-shrink-0">{paper.citations.toLocaleString()} cite</span>
                      </div>
                    ))}
                  </div>
                </div>

              </div>
            </div>
          )}

          {/* TAB 2: CONFERENCES & EVENTS */}
          {activeTab === "events" && (
            <div className="space-y-6">
              
              {/* Conferences announcements */}
              <div className="grid sm:grid-cols-2 gap-6">
                {CONFERENCES.map((conf, idx) => (
                  <div key={idx} className="p-5 bg-white border border-slate-200 rounded-2xl shadow-sm space-y-3 flex flex-col justify-between">
                    <div className="space-y-1.5">
                      <h4 className="font-bold text-slate-800 text-sm">{conf.name}</h4>
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wide block">{conf.location}</span>
                      <p className="text-[10px] text-slate-500 font-medium pt-1">Research Areas: {conf.areas}</p>
                    </div>
                    <div className="pt-2 border-t border-slate-100 text-[10px] text-slate-400 font-semibold space-y-1">
                      <div className="flex justify-between"><span>Deadline:</span> <span className="font-bold text-slate-700">{conf.deadline}</span></div>
                      <div className="flex justify-between"><span>Dates:</span> <span className="font-bold text-slate-700">{conf.dates}</span></div>
                    </div>
                    <button className="w-full py-2 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-xl text-center text-[10px] font-bold flex items-center justify-center gap-1 mt-2">
                      <ExternalLink size={12} />
                      Official Website
                    </button>
                  </div>
                ))}
              </div>

              {/* Call for Papers and Events timeline */}
              <div className="grid sm:grid-cols-2 gap-6">
                
                {/* Call For Papers */}
                <div className="p-5 bg-white border border-slate-200 rounded-2xl shadow-sm space-y-4">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">Call for Papers</h3>
                  <div className="space-y-3">
                    {CALL_FOR_PAPERS.map((cfp, idx) => (
                      <div key={idx} className="p-3 bg-slate-50 border border-slate-100 rounded-xl space-y-1.5 text-xs">
                        <div className="flex justify-between items-center">
                          <span className="font-bold text-slate-800">{cfp.name}</span>
                          <span className="px-1.5 py-0.5 rounded bg-emerald-50 text-emerald-600 text-[9px] font-bold uppercase">
                            {cfp.status}
                          </span>
                        </div>
                        <p className="text-[10px] text-slate-400 font-semibold">{cfp.type}</p>
                        <div className="flex justify-between items-center text-[9px] text-slate-400 pt-1 border-t border-slate-200/50">
                          <span>Topics: {cfp.topics}</span>
                          <span className="font-bold text-rose-500">DL: {cfp.deadline}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Research Events timeline */}
                <div className="p-5 bg-white border border-slate-200 rounded-2xl shadow-sm space-y-4">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">Upcoming Events</h3>
                  <div className="relative border-l border-slate-200 pl-4 space-y-4 text-[11px] ml-2">
                    {EVENTS.map((event, idx) => (
                      <div key={idx} className="relative">
                        <span className="absolute -left-[21px] top-1 h-2 w-2 rounded-full bg-blue-600 ring-4 ring-white" />
                        <div>
                          <span className="text-[9px] font-bold text-blue-600 uppercase tracking-wide block">{event.type}</span>
                          <h4 className="font-bold text-slate-800">{event.title}</h4>
                          <p className="text-slate-400 text-[10px] font-semibold">{event.date} &bull; {event.time}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

              </div>
            </div>
          )}

          {/* TAB 3: FUNDING & GRANTS */}
          {activeTab === "funding" && (
            <div className="grid sm:grid-cols-2 gap-6">
              {GRANTS.map((grant, idx) => (
                <div key={idx} className="p-5 bg-white border border-slate-200 rounded-2xl shadow-sm space-y-4 flex flex-col justify-between">
                  <div className="space-y-1">
                    <h4 className="font-bold text-slate-800 text-sm leading-snug">{grant.agency}</h4>
                    <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wide block pt-1">Field: {grant.domain}</span>
                    <p className="text-[11px] text-slate-500 font-semibold pt-2">Eligibility: {grant.eligibility}</p>
                  </div>
                  <div className="pt-2 border-t border-slate-100 flex justify-between items-center text-xs font-semibold">
                    <div>
                      <span className="text-slate-400 block text-[10px]">Funding Amount</span>
                      <span className="font-black text-slate-800 text-sm">{grant.amount}</span>
                    </div>
                    <div className="text-right">
                      <span className="text-slate-400 block text-[10px]">Deadline</span>
                      <span className="font-bold text-rose-500">{grant.deadline}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

        </div>

        {/* RIGHT COLUMN: Sidebar (Quick Links, Bookmarks, and Integrations) */}
        <aside className="lg:col-span-1 space-y-6">
          
          {/* Saved Articles */}
          <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
              <Bookmark size={14} />
              Bookmarked Articles
            </h3>
            <div className="space-y-3">
              {savedNewsIds.length === 0 ? (
                <p className="text-xs text-slate-400 italic">No bookmarked articles yet. Click stars to save them.</p>
              ) : (
                LATEST_NEWS
                  .filter(n => savedNewsIds.includes(n.id))
                  .map((news, idx) => (
                    <div key={idx} className="p-2.5 bg-slate-50 border border-slate-100 rounded-xl space-y-1">
                      <h4 className="text-[11px] font-bold text-slate-800 truncate leading-snug">{news.headline}</h4>
                      <span className="text-[9px] text-slate-400 block">{news.publisher}</span>
                    </div>
                  ))
              )}
            </div>
          </div>

          {/* Upcoming Deadlines */}
          <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">Upcoming Deadlines</h3>
            <div className="space-y-2 text-xs font-semibold text-slate-600">
              <div className="flex justify-between items-center">
                <span className="truncate max-w-[120px]">NeurIPS paper submit</span>
                <span className="text-[9px] font-bold text-rose-500">Expired</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="truncate max-w-[120px]">ERC grant deadline</span>
                <span className="text-[10px] text-slate-500">Oct 15, 2026</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="truncate max-w-[120px]">ICLR CFP deadline</span>
                <span className="text-[10px] text-slate-500">Oct 05, 2026</span>
              </div>
            </div>
          </div>

          {/* FUTURE INTEGRATIONS PLACEHOLDERS */}
          <div className="bg-white border border-indigo-50 rounded-2xl p-5 shadow-sm space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                <Database size={14} className="text-indigo-400" />
                Discovery Sources
              </h3>
              <span className="text-[8px] font-bold bg-indigo-50 border border-indigo-100 text-indigo-600 px-1.5 py-0.5 rounded uppercase">
                AI Preview
              </span>
            </div>

            <div className="space-y-2">
              {FUTURE_INTEGRATION_PARTNERS.map((partner, idx) => (
                <div
                  key={idx}
                  className="flex justify-between items-center text-[10px] py-1.5 border-b border-slate-50 last:border-0 font-medium"
                >
                  <span className="font-semibold text-slate-700">{partner.name}</span>
                  <span className="text-indigo-500 font-semibold">{partner.type}</span>
                </div>
              ))}
            </div>
          </div>

        </aside>

      </div>
    </div>
  );
}
