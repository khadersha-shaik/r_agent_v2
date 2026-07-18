"use client";

import {
  Search,
  UploadCloud,
  MessageSquare,
  Sparkles,
  BookOpen,
  ArrowRight,
  TrendingUp,
  TrendingDown,
  FileText,
  FileSpreadsheet,
  GitCompare,
  FolderKanban,
  Bookmark,
  History,
  Clock,
  Newspaper,
  Flame,
  Brain,
  Layers,
  ChevronRight,
  Plus,
} from "lucide-react";
import Link from "next/link";

export default function DashboardPage() {
  // Quick Actions list
  const quickActions = [
    {
      title: "Search Papers",
      desc: "Query academic journals, databases, and local repositories.",
      icon: Search,
      href: "/papers",
      color: "text-blue-600 bg-blue-50 border-blue-100",
    },
    {
      title: "Upload PDF",
      desc: "Import local research publications and auto-extract metadata.",
      icon: UploadCloud,
      href: "/upload",
      color: "text-blue-600 bg-blue-50 border-blue-100",
    },
    {
      title: "AI Chat",
      desc: "Query, discuss, and synthesize research papers interactively.",
      icon: MessageSquare,
      href: "/chat",
      color: "text-blue-600 bg-blue-50 border-blue-100",
    },
    {
      title: "Compare Papers",
      desc: "Map contrasting methodologies, results, and structures.",
      icon: GitCompare,
      href: "#",
      color: "text-blue-600 bg-blue-50 border-blue-100",
    },
    {
      title: "Research Gap Detection",
      desc: "Discover unexplored areas or limitations in current literature.",
      icon: Brain,
      href: "#",
      color: "text-blue-600 bg-blue-50 border-blue-100",
    },
    {
      title: "Literature Review",
      desc: "Compile draft syntheses and reviews across paper lists.",
      icon: BookOpen,
      href: "#",
      color: "text-blue-600 bg-blue-50 border-blue-100",
    },
  ];

  // Stats list
  const statistics = [
    { name: "Saved Papers", val: "148", icon: FileText, change: "+12% this month", up: true },
    { name: "AI Summaries", val: "36", icon: Sparkles, change: "+5 this week", up: true },
    { name: "Comparisons", val: "8", icon: GitCompare, change: "Flat", up: null },
    { name: "Research Projects", val: "4", icon: FolderKanban, change: "+1 new project", up: true },
    { name: "Bookmarks", val: "62", icon: Bookmark, change: "+8 saved", up: true },
    { name: "Recent Searches", val: "18", icon: History, change: "-3% search freq", up: false },
  ];

  // Recent Activities
  const recentActivities = [
    { title: "Uploaded paper", detail: "Attention Is All You Need.pdf", time: "2 hours ago", icon: UploadCloud },
    { title: "Generated summary", detail: "RAG for Knowledge-Intensive NLP", time: "5 hours ago", icon: Sparkles },
    { title: "Compared papers", detail: "GPT-3 vs GPT-4 architecture study", time: "Yesterday", icon: GitCompare },
    { title: "Saved paper", detail: "BERT: Pre-training of Deep Bidirectional Transformers", time: "2 days ago", icon: Bookmark },
    { title: "Started project", detail: "Medical Diagnostics LLM Reviews", time: "3 days ago", icon: FolderKanban },
  ];

  // Recommended Papers
  const recommendedPapers = [
    {
      title: "Direct Preference Optimization: Your Language Model is Secretly a Reward Model",
      authors: "Rafailov et al.",
      journal: "NeurIPS",
      year: 2023,
      abstract: "We introduce Direct Preference Optimization (DPO), a stable, performant, and computationally lightweight algorithm for steering LM behavior to align with human preferences, bypassing RLHF complexity.",
    },
    {
      title: "LoRA: Low-Rank Adaptation of Large Language Models",
      authors: "Hu et al.",
      journal: "ICLR",
      year: 2022,
      abstract: "LoRA proposes freezing the pre-trained model weights and injecting trainable rank decomposition matrices into each layer of the Transformer architecture, reducing downstream parameters.",
    },
  ];

  // Latest Research News
  const researchNews = [
    { headline: "DeepMind launches AlphaFold 3, predicting structures for all life molecules", source: "Nature Biotechnology", date: "July 15, 2026" },
    { headline: "Open-source LLMs narrow the reasoning gap on standard benchmarks", source: "MIT Tech Review", date: "July 12, 2026" },
    { headline: "AI safety frameworks aligned across major research consortiums", source: "Stanford HAI", date: "July 10, 2026" },
    { headline: "New neural rendering architectures achieve real-time 8K reconstruction", source: "SIGGRAPH", date: "July 08, 2026" },
    { headline: "Quantum hardware processors demonstrate coherent logical qubit operations", source: "Science Daily", date: "July 05, 2026" },
  ];

  // Trending Topics
  const trendingTopics = [
    "AI Agents",
    "Computer Vision",
    "Large Language Models",
    "Healthcare AI",
    "Robotics",
    "Edge AI",
    "Cyber Security",
    "Quantum Computing",
    "Multimodal AI",
    "Federated Learning",
  ];

  // AI Future Recommendations
  const aiRecommendations = [
    {
      title: "Recommended Paper",
      subject: "Constitutional AI: Harmlessness from AI Feedback",
      reason: "Based on your active research in preference optimization algorithms.",
    },
    {
      title: "Suggested Research Topic",
      subject: "Sparse Autoencoders for LLM Interpretability",
      reason: "Surging trend in mechanistic interpretability with 45% citation growth.",
    },
    {
      title: "Potential Research Gap",
      subject: "Low-Resource Language Adaptation via MoE Routing",
      reason: "No publication currently addresses DPO on routed MoE architectures.",
    },
  ];

  return (
    <div className="space-y-10 pb-12 selection:bg-blue-100 selection:text-blue-900">
      {/* Header Section */}
      <section className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-white p-6 md:p-8 rounded-2xl border border-slate-200/80 shadow-sm">
        <div className="space-y-1">
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight flex items-center gap-2">
            👋 Welcome back, Researcher
          </h1>
          <p className="text-slate-500 text-sm md:text-base font-medium">
            Accelerate your research with AI-powered tools.
          </p>
        </div>
        <button className="inline-flex items-center gap-2 px-5 py-2.5 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-semibold rounded-xl text-sm transition-all shadow-md shadow-blue-500/10 active:scale-[0.98]">
          <Plus size={16} />
          Start New Research
        </button>
      </section>

      {/* SECTION 1: Quick Actions */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold text-slate-900">Quick Actions</h2>
          <span className="text-xs text-slate-400 font-semibold tracking-wider uppercase">Productivity Shortcuts</span>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {quickActions.map((action, idx) => {
            const Icon = action.icon;
            return (
              <Link
                key={idx}
                href={action.href}
                className="group p-6 bg-white border border-slate-200 hover:border-blue-400 rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between h-40 relative overflow-hidden"
              >
                {/* Visual blue accent highlight */}
                <div className="absolute top-0 right-0 w-24 h-24 bg-blue-500/5 rounded-full blur-2xl group-hover:bg-blue-500/10 transition-colors pointer-events-none" />
                
                <div className="space-y-3">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center border ${action.color}`}>
                    <Icon size={20} />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-slate-800 group-hover:text-blue-600 transition-colors">
                      {action.title}
                    </h3>
                    <p className="text-xs text-slate-500 mt-1 leading-relaxed line-clamp-2">
                      {action.desc}
                    </p>
                  </div>
                </div>

                <div className="flex justify-end pt-2 text-slate-400 group-hover:text-blue-600 transition-colors">
                  <ArrowRight size={16} className="transform group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* SECTION 2: Research Statistics */}
      <section className="space-y-4">
        <h2 className="text-xl font-bold text-slate-900">Research Statistics</h2>
        <div className="grid grid-cols-2 lg:grid-cols-6 gap-4">
          {statistics.map((stat, idx) => {
            const Icon = stat.icon;
            return (
              <div
                key={idx}
                className="p-5 bg-white border border-slate-200 rounded-2xl shadow-sm flex flex-col justify-between space-y-3"
              >
                <div className="flex items-center justify-between text-slate-400">
                  <Icon size={18} />
                  {stat.up === true && <span className="text-[10px] font-bold text-emerald-600 flex items-center gap-0.5"><TrendingUp size={10} /></span>}
                  {stat.up === false && <span className="text-[10px] font-bold text-rose-500 flex items-center gap-0.5"><TrendingDown size={10} /></span>}
                </div>
                <div>
                  <span className="text-2xl font-black text-slate-800">{stat.val}</span>
                  <h4 className="text-xs font-semibold text-slate-500 truncate mt-1">{stat.name}</h4>
                </div>
                <div className="text-[10px] font-medium text-slate-400 truncate">
                  {stat.change}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Left Column (Activities & Recommended Papers) */}
        <div className="lg:col-span-2 space-y-10">
          
          {/* SECTION 3: Recent Activity */}
          <section className="space-y-4">
            <h2 className="text-xl font-bold text-slate-900">Recent Activity</h2>
            <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
              <div className="flow-root">
                <ul className="-mb-8">
                  {recentActivities.map((activity, actIdx) => {
                    const Icon = activity.icon;
                    return (
                      <li key={actIdx}>
                        <div className="relative pb-8">
                          {actIdx !== recentActivities.length - 1 ? (
                            <span
                              className="absolute top-4 left-4 -ml-px h-full w-0.5 bg-slate-100"
                              aria-hidden="true"
                            />
                          ) : null}
                          <div className="relative flex space-x-3">
                            <div>
                              <span className="h-8 w-8 rounded-lg bg-blue-50 border border-blue-100 text-blue-600 flex items-center justify-center">
                                <Icon size={16} />
                              </span>
                            </div>
                            <div className="flex-1 min-w-0 pt-1.5 flex justify-between space-x-4">
                              <div>
                                <p className="text-sm font-semibold text-slate-800">
                                  {activity.title}{" "}
                                  <span className="font-normal text-slate-500 italic">
                                    &ldquo;{activity.detail}&rdquo;
                                  </span>
                                </p>
                              </div>
                              <div className="text-right text-xs whitespace-nowrap text-slate-400 font-medium flex items-center gap-1.5">
                                <Clock size={12} />
                                {activity.time}
                              </div>
                            </div>
                          </div>
                        </div>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </div>
          </section>

          {/* SECTION 4: Recommended Papers */}
          <section className="space-y-4">
            <h2 className="text-xl font-bold text-slate-900">Recommended Papers</h2>
            <div className="space-y-4">
              {recommendedPapers.map((paper, idx) => (
                <div
                  key={idx}
                  className="p-6 bg-white border border-slate-200 rounded-2xl shadow-sm hover:border-blue-300 transition-colors flex flex-col justify-between gap-4"
                >
                  <div className="space-y-2">
                    <div className="flex justify-between items-start gap-4">
                      <h3 className="font-bold text-slate-800 text-base leading-snug hover:text-blue-600 cursor-pointer transition-colors">
                        {paper.title}
                      </h3>
                      <span className="px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider rounded-lg bg-slate-100 text-slate-500 border border-slate-200 flex-shrink-0">
                        {paper.journal} &bull; {paper.year}
                      </span>
                    </div>
                    <p className="text-xs font-semibold text-slate-400">{paper.authors}</p>
                    <p className="text-xs text-slate-500 leading-relaxed line-clamp-3">
                      {paper.abstract}
                    </p>
                  </div>
                  <div className="flex items-center justify-between border-t border-slate-100 pt-4">
                    <button className="text-xs text-slate-500 hover:text-blue-600 font-semibold flex items-center gap-1 transition-colors">
                      <Bookmark size={14} />
                      Save to Library
                    </button>
                    <button className="text-xs text-blue-600 hover:text-blue-700 font-bold flex items-center gap-0.5 transition-colors">
                      View Details
                      <ChevronRight size={14} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* Right Column (News, Topics, Future AI Recommendations) */}
        <div className="space-y-10">
          
          {/* SECTION 5: Latest Research News */}
          <section className="space-y-4">
            <h2 className="text-xl font-bold text-slate-900">Latest Research News</h2>
            <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm divide-y divide-slate-100">
              {researchNews.map((news, idx) => (
                <div key={idx} className="py-4 first:pt-0 last:pb-0 space-y-1">
                  <h4 className="text-xs font-bold text-slate-800 hover:text-blue-600 transition-colors line-clamp-2 cursor-pointer leading-relaxed">
                    {news.headline}
                  </h4>
                  <div className="flex justify-between items-center text-[10px] text-slate-400 font-medium">
                    <span>{news.source}</span>
                    <span>{news.date}</span>
                  </div>
                  <button className="text-[10px] text-blue-600 hover:underline font-bold block pt-1">
                    Read More
                  </button>
                </div>
              ))}
            </div>
          </section>

          {/* SECTION 6: Trending Research Topics */}
          <section className="space-y-4">
            <h2 className="text-xl font-bold text-slate-900">Trending Topics</h2>
            <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm">
              <div className="flex flex-wrap gap-2">
                {trendingTopics.map((topic, idx) => (
                  <span
                    key={idx}
                    className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl bg-slate-50 border border-slate-200/80 text-xs font-semibold text-slate-600 hover:border-blue-300 hover:text-blue-600 cursor-pointer transition-colors"
                  >
                    <Flame size={12} className="text-orange-500" />
                    {topic}
                  </span>
                ))}
              </div>
            </div>
          </section>

          {/* SECTION 7: AI Recommendations (Reserved for Future AI) */}
          <section className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold text-slate-900">AI Recommendations</h2>
              <span className="px-2 py-0.5 text-[9px] font-extrabold uppercase tracking-wider rounded bg-indigo-50 text-indigo-600 border border-indigo-100">
                AI Preview
              </span>
            </div>
            <div className="space-y-4">
              {aiRecommendations.map((rec, idx) => (
                <div
                  key={idx}
                  className="p-5 bg-white border border-indigo-100 rounded-2xl shadow-sm relative overflow-hidden group"
                >
                  {/* Subtle indigo gradient accent */}
                  <div className="absolute top-0 left-0 w-1.5 h-full bg-gradient-to-b from-indigo-500 to-blue-500" />
                  
                  <div className="space-y-2 pl-2">
                    <div className="flex justify-between items-center">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-500 block">
                        {rec.title}
                      </span>
                      <span className="px-2 py-0.5 text-[9px] font-bold bg-slate-100 border border-slate-200 rounded text-slate-400">
                        Coming Soon
                      </span>
                    </div>
                    <h4 className="text-xs font-bold text-slate-800 leading-snug">
                      {rec.subject}
                    </h4>
                    <p className="text-[11px] text-slate-500 leading-relaxed">
                      {rec.reason}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </section>

        </div>
      </div>
    </div>
  );
}
