"use client";

import { useState } from "react";
import {
  Plus,
  Send,
  Paperclip,
  Mic,
  Trash2,
  Copy,
  ThumbsUp,
  ThumbsDown,
  RefreshCw,
  Clock,
  Sparkles,
  Search,
  Upload,
  BookOpen,
  FolderKanban,
  History,
  Pin,
  Star,
  FileText,
  Brain,
  Info,
  GitCompare,
  Layers,
  Database,
  Cpu,
} from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface Message {
  id: number;
  sender: "user" | "ai";
  text: string;
  timestamp: string;
}

interface ChatSession {
  id: number;
  title: string;
  isFavorite: boolean;
  isPinned: boolean;
}

const INITIAL_SESSIONS: ChatSession[] = [
  { id: 1, title: "LLM Alignment & DPO", isFavorite: true, isPinned: true },
  { id: 2, title: "Violence Detection CV Models", isFavorite: false, isPinned: true },
  { id: 3, title: "Medical Imaging NLP Summaries", isFavorite: true, isPinned: false },
  { id: 4, title: "Smart Agriculture Satellite Analysis", isFavorite: false, isPinned: false },
  { id: 5, title: "AI Agent Routing Loops", isFavorite: false, isPinned: false },
];

const SUGGESTED_PROMPTS = [
  "Summarize Attention Is All You Need",
  "Compare DPO vs RLHF in alignment",
  "Explain parameter-efficient tuning (LoRA)",
  "Find research gaps in medical diagnostics",
];

const AI_TOOLS = [
  { name: "Paper Summary", icon: Sparkles },
  { name: "Paper Comparison", icon: GitCompare },
  { name: "Research Gap Detection", icon: Brain },
  { name: "Timeline Generation", icon: Clock },
  { name: "Citation Analysis", icon: BookOpen },
  { name: "Literature Review", icon: FileText },
];

export default function AIChatPage() {
  const [sessions, setSessions] = useState<ChatSession[]>(INITIAL_SESSIONS);
  const [activeSessionId, setActiveSessionId] = useState<number>(1);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  const handleSend = (textToSend: string) => {
    if (!textToSend.trim()) return;

    const userMsg: Message = {
      id: Date.now(),
      sender: "user",
      text: textToSend,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      const responses = [
        "Based on the loaded literature context, that methodology represents a key shift. Let me index related preprints to construct a summary map.",
        "I've analyzed the parameters mentioned. Comparing this model shows a 15% efficiency gain in low-rank adaptation constraints. Let me know if you would like a citations list.",
        "That research direction is highly active. There are currently 4 active preprints on arXiv discussing DPO adaptation under those parameters.",
        "Let me outline the comparison. While PPO relies on reward model fitting, DPO optimizes directly on log-ratios. I can draft a literature summary for your project."
      ];
      const randomResponse = responses[Math.floor(Math.random() * responses.length)];

      const aiMsg: Message = {
        id: Date.now() + 1,
        sender: "ai",
        text: randomResponse,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };

      setMessages((prev) => [...prev, aiMsg]);
      setIsTyping(false);
    }, 1000);
  };

  const handleNewChat = () => {
    setMessages([]);
    const newSession: ChatSession = {
      id: Date.now(),
      title: `New Research Chat ${sessions.length + 1}`,
      isFavorite: false,
      isPinned: false,
    };
    setSessions([newSession, ...sessions]);
    setActiveSessionId(newSession.id);
  };

  const handleClearChat = () => {
    setMessages([]);
  };

  const handleTogglePin = (id: number, e: React.MouseEvent) => {
    e.stopPropagation();
    setSessions(
      sessions.map((s) => (s.id === id ? { ...s, isPinned: !s.isPinned } : s))
    );
  };

  const handleToggleFavorite = (id: number, e: React.MouseEvent) => {
    e.stopPropagation();
    setSessions(
      sessions.map((s) => (s.id === id ? { ...s, isFavorite: !s.isFavorite } : s))
    );
  };

  const handleDeleteSession = (id: number, e: React.MouseEvent) => {
    e.stopPropagation();
    setSessions(sessions.filter((s) => s.id !== id));
  };

  return (
    <div className="space-y-6 pb-12 selection:bg-blue-100 selection:text-blue-900">
      
      {/* PAGE HEADER */}
      <section className="space-y-1.5">
        <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
          AI Research Assistant
        </h1>
        <p className="text-slate-500 text-sm md:text-base font-medium max-w-2xl leading-relaxed">
          Ask research questions, analyze papers, generate summaries, compare studies, and accelerate your research.
        </p>
      </section>

      {/* 3-COLUMN RESPONSIVE LAYOUT */}
      <div className="grid lg:grid-cols-5 gap-6 items-start">
        
        {/* ================= COLUMN 1: LEFT PANEL (Chat History) ================= */}
        <aside className="lg:col-span-1 bg-white border border-slate-200 rounded-2xl p-4 shadow-sm space-y-4">
          <button
            onClick={handleNewChat}
            className="w-full flex items-center justify-center gap-1.5 px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl text-xs transition-colors shadow-md active:scale-95"
          >
            <Plus size={14} />
            New Research Chat
          </button>

          {/* History Lists */}
          <div className="space-y-4">
            {/* Pinned Chats */}
            {sessions.some((s) => s.isPinned) && (
              <div className="space-y-1">
                <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider px-2 block">Pinned</span>
                <div className="space-y-1">
                  {sessions
                    .filter((s) => s.isPinned)
                    .map((session) => (
                      <div
                        key={session.id}
                        onClick={() => {
                          setActiveSessionId(session.id);
                          setMessages([]);
                        }}
                        className={cn(
                          "flex items-center justify-between px-2 py-2 rounded-xl text-xs font-semibold cursor-pointer group transition-all",
                          session.id === activeSessionId
                            ? "bg-blue-50 text-blue-600 border border-blue-100/50"
                            : "text-slate-600 hover:text-slate-800 hover:bg-slate-50"
                        )}
                      >
                        <span className="truncate max-w-[120px]">{session.title}</span>
                        <div className="flex items-center space-x-1 opacity-0 group-hover:opacity-100 transition-opacity">
                          <button onClick={(e) => handleTogglePin(session.id, e)} className="p-0.5 text-slate-400 hover:text-blue-600">
                            <Pin size={10} fill="currentColor" />
                          </button>
                          <button onClick={(e) => handleToggleFavorite(session.id, e)} className="p-0.5 text-slate-400 hover:text-amber-500">
                            <Star size={10} fill={session.isFavorite ? "currentColor" : "none"} />
                          </button>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            )}

            {/* Recent Conversations */}
            <div className="space-y-1">
              <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider px-2 block">Recent Conversations</span>
              <div className="space-y-1 max-h-48 overflow-y-auto">
                {sessions
                  .filter((s) => !s.isPinned)
                  .map((session) => (
                    <div
                      key={session.id}
                      onClick={() => {
                        setActiveSessionId(session.id);
                        setMessages([]);
                      }}
                      className={cn(
                        "flex items-center justify-between px-2 py-2 rounded-xl text-xs font-semibold cursor-pointer group transition-all",
                        session.id === activeSessionId
                          ? "bg-blue-50 text-blue-600 border border-blue-100/50"
                          : "text-slate-600 hover:text-slate-800 hover:bg-slate-50"
                      )}
                    >
                      <span className="truncate max-w-[120px]">{session.title}</span>
                      <div className="flex items-center space-x-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button onClick={(e) => handleTogglePin(session.id, e)} className="p-0.5 text-slate-400 hover:text-blue-600">
                          <Pin size={10} />
                        </button>
                        <button onClick={(e) => handleToggleFavorite(session.id, e)} className="p-0.5 text-slate-400 hover:text-amber-500">
                          <Star size={10} fill={session.isFavorite ? "currentColor" : "none"} />
                        </button>
                        <button onClick={(e) => handleDeleteSession(session.id, e)} className="p-0.5 text-slate-400 hover:text-rose-500">
                          <Trash2 size={10} />
                        </button>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </aside>

        {/* ================= COLUMN 2: CENTER PANEL (Chat Window) ================= */}
        <div className="lg:col-span-3 bg-white border border-slate-200 rounded-2xl shadow-sm flex flex-col h-[600px] overflow-hidden">
          
          {/* Header area */}
          <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
            <div className="flex items-center space-x-2">
              <span className="h-2.5 w-2.5 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-xs font-bold text-slate-700">
                {sessions.find((s) => s.id === activeSessionId)?.title || "Active Workspace"}
              </span>
            </div>
            <button
              onClick={handleClearChat}
              className="text-xs text-slate-400 hover:text-slate-600 font-semibold flex items-center gap-1 transition-colors"
            >
              <Trash2 size={12} />
              Clear Conversation
            </button>
          </div>

          {/* Conversation stream */}
          <div className="flex-1 p-6 overflow-y-auto space-y-6">
            {messages.length === 0 ? (
              /* WELCOME / EMPTY STATE SCREEN */
              <div className="h-full flex flex-col justify-center items-center text-center space-y-6 max-w-lg mx-auto">
                <div className="space-y-2">
                  <h3 className="font-extrabold text-slate-800 text-xl">
                    What would you like to research today?
                  </h3>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    Select a suggested prompt below or type your query to start analyzing preprints and database papers.
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-3 w-full">
                  {SUGGESTED_PROMPTS.map((prompt, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleSend(prompt)}
                      className="p-3 text-left bg-slate-50 border border-slate-100 hover:border-blue-300 hover:bg-blue-50/10 rounded-xl transition-all duration-300 text-xs font-semibold text-slate-700 block active:scale-98"
                    >
                      {prompt}
                    </button>
                  ))}
                </div>
              </div>
            ) : (
              /* CONVERSATION BUBBLES */
              <div className="space-y-6">
                {messages.map((msg) => {
                  const isAI = msg.sender === "ai";
                  return (
                    <div
                      key={msg.id}
                      className={cn(
                        "flex flex-col space-y-1.5 max-w-[85%]",
                        isAI ? "self-start items-start" : "self-end items-end ml-auto"
                      )}
                    >
                      <div
                        className={cn(
                          "px-4 py-3 rounded-2xl text-xs leading-relaxed font-medium shadow-sm",
                          isAI
                            ? "bg-slate-50 border border-slate-100 text-slate-700"
                            : "bg-blue-600 text-white"
                        )}
                      >
                        {msg.text}
                      </div>

                      {/* Bubble Action Bar */}
                      <div className="flex items-center space-x-3 text-[10px] text-slate-400 font-semibold px-2">
                        <span>{msg.timestamp}</span>
                        {isAI && (
                          <div className="flex items-center space-x-1.5 border-l border-slate-100 pl-2">
                            <button className="hover:text-blue-600 transition-colors" title="Copy text">
                              <Copy size={10} />
                            </button>
                            <button className="hover:text-blue-600 transition-colors" title="Regenerate">
                              <RefreshCw size={10} />
                            </button>
                            <button className="hover:text-blue-600 transition-colors" title="Like">
                              <ThumbsUp size={10} />
                            </button>
                            <button className="hover:text-blue-600 transition-colors" title="Dislike">
                              <ThumbsDown size={10} />
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}

                {/* Loading indicator */}
                {isTyping && (
                  <div className="flex items-center space-x-2 text-slate-400 text-xs font-medium pl-2">
                    <RefreshCw size={12} className="animate-spin" />
                    <span>Research Agent is synthesizing context...</span>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Chat text input */}
          <div className="p-4 border-t border-slate-100 bg-slate-50/30">
            <div className="flex gap-2 bg-white border border-slate-200 rounded-xl p-1.5 focus-within:border-blue-500 transition-all items-center">
              {/* Attach PDF placeholder */}
              <button className="p-2 text-slate-400 hover:text-blue-600 hover:bg-slate-50 rounded-lg transition-colors">
                <Paperclip size={16} />
              </button>

              <input
                type="text"
                className="w-full bg-transparent border-none outline-none text-xs text-slate-800 placeholder-slate-400 px-2"
                placeholder="Ask anything about your research..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSend(input)}
              />

              {/* Voice input placeholder */}
              <button className="p-2 text-slate-400 hover:text-blue-600 hover:bg-slate-50 rounded-lg transition-colors">
                <Mic size={16} />
              </button>

              <button
                onClick={() => handleSend(input)}
                className="p-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-all active:scale-95 flex items-center justify-center"
              >
                <Send size={14} />
              </button>
            </div>
          </div>

        </div>

        {/* ================= COLUMN 3: RIGHT PANEL (Context & Tools) ================= */}
        <aside className="lg:col-span-1 space-y-6">
          
          {/* RESEARCH CONTEXT */}
          <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
              <Info size={14} />
              Research Context
            </h3>

            <div className="space-y-3 text-xs leading-normal font-medium">
              <div>
                <span className="text-slate-400 block font-normal">Active Project</span>
                <span className="text-slate-800">None Selected</span>
              </div>
              <div className="border-t border-slate-100 pt-3">
                <span className="text-slate-400 block font-normal">Uploaded Papers</span>
                <span className="text-slate-800">3 PDFs in memory</span>
              </div>
              <div className="border-t border-slate-100 pt-3">
                <span className="text-slate-400 block font-normal">Selected Paper</span>
                <span className="text-slate-800 truncate block">attention_is_all_you_need.pdf</span>
              </div>
            </div>
          </div>

          {/* AI TOOLS WORKSPACE (Coming Soon) */}
          <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                <Cpu size={14} />
                AI Tools
              </h3>
              <span className="text-[9px] font-bold bg-indigo-50 border border-indigo-100 text-indigo-600 px-1.5 py-0.5 rounded">
                Queued
              </span>
            </div>

            <div className="space-y-2">
              {AI_TOOLS.map((tool, idx) => {
                const Icon = tool.icon;
                return (
                  <div
                    key={idx}
                    className="flex justify-between items-center py-1.5 border-b border-slate-50 last:border-0 text-[10px] font-semibold text-slate-600"
                  >
                    <div className="flex items-center space-x-1.5 text-slate-500">
                      <Icon size={12} />
                      <span>{tool.name}</span>
                    </div>
                    <span className="text-[8px] font-bold text-slate-400 bg-slate-50 border border-slate-200 px-1 rounded">
                      Soon
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* QUICK ACTIONS */}
          <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">Quick Actions</h3>
            <div className="space-y-1.5">
              <Link href="/upload" className="w-full py-2 bg-slate-50 hover:bg-slate-100 text-slate-600 hover:text-slate-800 border border-slate-200 rounded-xl text-center text-[10px] font-bold block transition-all">
                Upload PDF
              </Link>
              <Link href="/papers" className="w-full py-2 bg-slate-50 hover:bg-slate-100 text-slate-600 hover:text-slate-800 border border-slate-200 rounded-xl text-center text-[10px] font-bold block transition-all">
                Search Papers
              </Link>
              <Link href="/library" className="w-full py-2 bg-slate-50 hover:bg-slate-100 text-slate-600 hover:text-slate-800 border border-slate-200 rounded-xl text-center text-[10px] font-bold block transition-all">
                Open Library
              </Link>
            </div>
          </div>

          {/* INTEGRATIONS PREVIEW */}
          <div className="bg-white border border-indigo-50 rounded-2xl p-5 shadow-sm space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                <Database size={14} className="text-indigo-400" />
                Orchestrations
              </h3>
              <span className="text-[8px] font-bold bg-indigo-50 border border-indigo-100 text-indigo-600 px-1.5 py-0.5 rounded uppercase">
                AI Preview
              </span>
            </div>

            <div className="space-y-2 text-[10px] font-medium text-slate-500">
              <div className="flex justify-between items-center py-1 border-b border-slate-50">
                <span>Orchestrator</span>
                <span className="text-indigo-500 font-semibold">LangGraph / MCP</span>
              </div>
              <div className="flex justify-between items-center py-1 border-b border-slate-50">
                <span>Vector Memory</span>
                <span className="text-indigo-500 font-semibold">ChromaDB Store</span>
              </div>
              <div className="flex justify-between items-center py-1">
                <span>LLM Providers</span>
                <span className="text-indigo-500 font-semibold">Ollama / Gemini</span>
              </div>
            </div>
          </div>

        </aside>

      </div>
    </div>
  );
}
