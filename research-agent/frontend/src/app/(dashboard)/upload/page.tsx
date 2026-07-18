"use client";

import { useState } from "react";
import {
  UploadCloud,
  FileText,
  Trash2,
  FolderPlus,
  Star,
  Download,
  Eye,
  Edit2,
  Sparkles,
  MessageSquare,
  GitCompare,
  Brain,
  BookOpen,
  CheckCircle2,
  AlertCircle,
  Clock,
  Info,
  Database,
  Cpu,
  RefreshCw,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface UploadedPaper {
  id: number;
  title: string;
  filename: string;
  authors: string;
  journal: string;
  year: number;
  size: string;
  date: string;
  status: "Completed" | "Uploading" | "Failed" | "Waiting";
  progress?: number;
  isFavorite: boolean;
  doi: string;
  keywords: string[];
  pages: number;
  language: string;
}

const INITIAL_MOCK_PAPERS: UploadedPaper[] = [
  {
    id: 1,
    title: "Attention Is All You Need",
    filename: "attention_is_all_you_need.pdf",
    authors: "Ashish Vaswani et al.",
    journal: "Advances in Neural Information Processing Systems (NeurIPS)",
    year: 2017,
    size: "2.1 MB",
    date: "July 17, 2026",
    status: "Completed",
    isFavorite: true,
    doi: "10.48550/arXiv.1706.03762",
    keywords: ["Attention Mechanisms", "Transformers", "NLP"],
    pages: 15,
    language: "English",
  },
  {
    id: 2,
    title: "Direct Preference Optimization: Your Language Model is Secretly a Reward Model",
    filename: "dpo_language_models.pdf",
    authors: "Rafael Rafailov et al.",
    journal: "Advances in Neural Information Processing Systems (NeurIPS)",
    year: 2023,
    size: "1.4 MB",
    date: "July 16, 2026",
    status: "Completed",
    isFavorite: false,
    doi: "10.48550/arXiv.2305.18290",
    keywords: ["RLHF Alternative", "DPO Alignment", "LLMs"],
    pages: 20,
    language: "English",
  },
  {
    id: 3,
    title: "Constitutional AI: Harmlessness from AI Feedback",
    filename: "constitutional_ai_harmless.pdf",
    authors: "Yuntao Bai et al.",
    journal: "arXiv Preprint",
    year: 2022,
    size: "3.8 MB",
    date: "July 15, 2026",
    status: "Uploading",
    progress: 68,
    isFavorite: false,
    doi: "10.48550/arXiv.2212.08073",
    keywords: ["Constitutional Rules", "Safety", "RLAIF"],
    pages: 35,
    language: "English",
  },
  {
    id: 4,
    title: "Draft Physics Research.docx",
    filename: "draft_physics_research.docx",
    authors: "Unknown",
    journal: "N/A",
    year: 0,
    size: "820 KB",
    date: "July 15, 2026",
    status: "Failed",
    isFavorite: false,
    doi: "N/A",
    keywords: [],
    pages: 0,
    language: "Unknown",
  },
];

export default function UploadPapersPage() {
  const [papers, setPapers] = useState<UploadedPaper[]>(INITIAL_MOCK_PAPERS);
  const [selectedPaperId, setSelectedPaperId] = useState<number>(1);

  const selectedPaper = papers.find((p) => p.id === selectedPaperId) || papers[0];

  const handleToggleFavorite = (id: number) => {
    setPapers(
      papers.map((p) => (p.id === id ? { ...p, isFavorite: !p.isFavorite } : p))
    );
  };

  const handleDelete = (id: number) => {
    const updated = papers.filter((p) => p.id !== id);
    setPapers(updated);
    if (selectedPaperId === id && updated.length > 0) {
      setSelectedPaperId(updated[0].id);
    }
  };

  const handleUploadMockFile = () => {
    const newPaper: UploadedPaper = {
      id: Date.now(),
      title: "LoRA: Low-Rank Adaptation of Large Language Models",
      filename: "lora_adaptation_transformer.pdf",
      authors: "Edward J. Hu et al.",
      journal: "International Conference on Learning Representations (ICLR)",
      year: 2022,
      size: "1.8 MB",
      date: "Just now",
      status: "Completed",
      isFavorite: false,
      doi: "10.48550/arXiv.2106.09685",
      keywords: ["PEFT tuning", "Low-Rank Matrices", "Deep Learning"],
      pages: 12,
      language: "English",
    };
    setPapers([newPaper, ...papers]);
    setSelectedPaperId(newPaper.id);
  };

  const handleResetList = () => {
    setPapers(INITIAL_MOCK_PAPERS);
    setSelectedPaperId(1);
  };

  return (
    <div className="space-y-8 pb-12 selection:bg-blue-100 selection:text-blue-900">
      
      {/* PAGE HEADER */}
      <section className="space-y-1.5">
        <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
          Upload Research Papers
        </h1>
        <p className="text-slate-500 text-sm md:text-base font-medium max-w-2xl leading-relaxed">
          Upload research papers to summarize, compare, chat with, and organize them.
        </p>
      </section>

      {/* DYNAMIC VIEW CONTAINER */}
      {papers.length === 0 ? (
        /* ================= EMPTY STATE ================= */
        <div className="text-center space-y-6 py-16 max-w-md mx-auto">
          <div className="h-16 w-16 bg-blue-50 text-blue-600 border border-blue-100 rounded-2xl flex items-center justify-center text-3xl mx-auto shadow-sm">
            📤
          </div>
          <div className="space-y-2">
            <h3 className="font-bold text-slate-800 text-lg">No research papers uploaded yet</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Upload your academic publications to queue them for structural analysis, embeddings, and summary synthesis.
            </p>
          </div>
          <button
            onClick={handleResetList}
            className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl text-sm transition-all shadow-md active:scale-95"
          >
            Upload Your First Paper
          </button>
        </div>
      ) : (
        /* ================= FULL PAGE INTERFACE ================= */
        <div className="grid lg:grid-cols-3 gap-8 items-start">
          
          {/* LEFT CONTAINER: Upload Area + Paper list */}
          <div className="lg:col-span-2 space-y-6">
            
            {/* DRAG AND DROP ZONE */}
            <div
              onClick={handleUploadMockFile}
              className="border-2 border-dashed border-slate-200 hover:border-blue-400 bg-white hover:bg-blue-50/10 rounded-2xl p-8 text-center transition-all cursor-pointer group shadow-sm"
            >
              <UploadCloud size={40} className="text-slate-400 group-hover:text-blue-500 mx-auto transition-colors" />
              <h3 className="font-bold text-slate-800 mt-4 text-sm group-hover:text-blue-600 transition-colors">
                Drag & Drop academic PDFs here, or <span className="underline">Browse Files</span>
              </h3>
              <div className="flex justify-center gap-4 text-slate-400 text-xs mt-3 font-semibold">
                <span>Format: PDF</span>
                <span>•</span>
                <span>Max size: 50MB</span>
                <span>•</span>
                <span>Multi-Upload Enabled</span>
              </div>
            </div>

            {/* LIST OF UPLOADED PAPERS */}
            <div className="space-y-4">
              <div className="flex justify-between items-center px-1">
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  Uploaded Materials ({papers.length})
                </h3>
                <button
                  onClick={() => setPapers([])}
                  className="text-xs text-rose-500 hover:underline font-bold"
                >
                  Clear All
                </button>
              </div>

              <div className="space-y-3">
                {papers.map((paper) => {
                  const isSelected = paper.id === selectedPaperId;
                  return (
                    <div
                      key={paper.id}
                      onClick={() => setSelectedPaperId(paper.id)}
                      className={cn(
                        "p-4 bg-white border rounded-2xl transition-all flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 cursor-pointer relative overflow-hidden",
                        isSelected
                          ? "border-blue-500 ring-2 ring-blue-500/10 shadow-sm"
                          : "border-slate-200 hover:border-slate-300"
                      )}
                    >
                      <div className="flex items-start gap-3 flex-1 min-w-0">
                        {/* File Icon */}
                        <div className={cn(
                          "w-10 h-10 rounded-xl flex items-center justify-center border flex-shrink-0",
                          paper.status === "Failed" 
                            ? "bg-rose-50 text-rose-500 border-rose-100" 
                            : paper.status === "Uploading"
                            ? "bg-amber-50 text-amber-500 border-amber-100"
                            : "bg-blue-50 text-blue-600 border-blue-100"
                        )}>
                          <FileText size={20} />
                        </div>

                        {/* File Details */}
                        <div className="space-y-1 min-w-0">
                          <h4 className="font-bold text-slate-800 text-sm truncate leading-snug">
                            {paper.status === "Failed" ? paper.filename : paper.title}
                          </h4>
                          <div className="flex flex-wrap gap-2 text-[10px] text-slate-400 font-semibold">
                            {paper.status !== "Failed" && (
                              <>
                                <span className="truncate max-w-[120px]">{paper.authors}</span>
                                <span>•</span>
                                <span>{paper.year}</span>
                                <span>•</span>
                              </>
                            )}
                            <span>{paper.size}</span>
                            <span>•</span>
                            <span>{paper.date}</span>
                          </div>

                          {/* Progress bar for uploading */}
                          {paper.status === "Uploading" && (
                            <div className="w-full bg-slate-100 rounded-full h-1.5 mt-2 overflow-hidden">
                              <div
                                className="bg-amber-500 h-1.5 rounded-full transition-all duration-300"
                                style={{ width: `${paper.progress}%` }}
                              />
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Right Panel: Status & Actions */}
                      <div className="flex items-center gap-3 sm:self-center self-end">
                        {/* Status Badge */}
                        {paper.status === "Completed" && (
                          <span className="inline-flex items-center gap-1 text-[9px] font-bold uppercase tracking-wider rounded bg-emerald-50 text-emerald-600 border border-emerald-100 px-2 py-0.5">
                            <CheckCircle2 size={10} />
                            Ready
                          </span>
                        )}
                        {paper.status === "Uploading" && (
                          <span className="inline-flex items-center gap-1 text-[9px] font-bold uppercase tracking-wider rounded bg-amber-50 text-amber-600 border border-amber-100 px-2 py-0.5 animate-pulse">
                            <RefreshCw size={10} className="animate-spin" />
                            {paper.progress}%
                          </span>
                        )}
                        {paper.status === "Failed" && (
                          <span className="inline-flex items-center gap-1 text-[9px] font-bold uppercase tracking-wider rounded bg-rose-50 text-rose-500 border border-rose-100 px-2 py-0.5" title="File format not supported. Only PDFs are allowed.">
                            <AlertCircle size={10} />
                            Failed
                          </span>
                        )}

                        {/* Actions buttons */}
                        <div className="flex items-center space-x-1 border-l border-slate-100 pl-2">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleToggleFavorite(paper.id);
                            }}
                            className={cn(
                              "p-1.5 rounded-lg transition-colors",
                              paper.isFavorite 
                                ? "text-amber-500 hover:bg-amber-50" 
                                : "text-slate-400 hover:text-slate-600 hover:bg-slate-50"
                            )}
                          >
                            <Star size={14} fill={paper.isFavorite ? "currentColor" : "none"} />
                          </button>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleDelete(paper.id);
                            }}
                            className="p-1.5 text-slate-400 hover:text-rose-500 hover:bg-rose-50 rounded-lg transition-colors"
                          >
                            <Trash2 size={14} />
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* RIGHT CONTAINER: File Info Panel + AI Preview */}
          <div className="space-y-6">
            
            {/* SELECTED FILE METADATA */}
            <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm space-y-4">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                <Info size={14} />
                File Information
              </h3>

              {selectedPaper && selectedPaper.status === "Completed" ? (
                <div className="space-y-3 text-xs leading-relaxed">
                  <div>
                    <span className="text-slate-400 block font-medium">Paper Title</span>
                    <span className="font-semibold text-slate-800">{selectedPaper.title}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block font-medium">Authors</span>
                    <span className="font-semibold text-slate-800">{selectedPaper.authors}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block font-medium">Journal</span>
                    <span className="font-semibold text-slate-800">{selectedPaper.journal}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block font-medium">DOI Reference</span>
                    <span className="font-mono text-[10px] text-slate-600 bg-slate-50 px-1.5 py-0.5 rounded border border-slate-100 block mt-0.5 w-fit">
                      {selectedPaper.doi}
                    </span>
                  </div>
                  <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-50">
                    <div>
                      <span className="text-slate-400 block font-medium">Pages</span>
                      <span className="font-semibold text-slate-800">{selectedPaper.pages} pages</span>
                    </div>
                    <div>
                      <span className="text-slate-400 block font-medium">Language</span>
                      <span className="font-semibold text-slate-800">{selectedPaper.language}</span>
                    </div>
                  </div>
                  {selectedPaper.keywords.length > 0 && (
                    <div className="pt-2">
                      <span className="text-slate-400 block font-medium mb-1">Keywords</span>
                      <div className="flex flex-wrap gap-1">
                        {selectedPaper.keywords.map((kw, idx) => (
                          <span
                            key={idx}
                            className="px-2 py-0.5 bg-slate-50 border border-slate-200 text-[9px] text-slate-500 rounded-md font-medium"
                          >
                            {kw}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Actions summary */}
                  <div className="flex gap-2 pt-4 border-t border-slate-100 text-slate-500 font-semibold">
                    <button className="flex-1 py-2 border border-slate-200 hover:border-blue-400 hover:text-blue-600 rounded-xl text-center flex items-center justify-center gap-1.5 transition-all text-xs">
                      <Eye size={12} />
                      View PDF
                    </button>
                    <button className="flex-1 py-2 border border-slate-200 hover:border-blue-400 hover:text-blue-600 rounded-xl text-center flex items-center justify-center gap-1.5 transition-all text-xs">
                      <FolderPlus size={12} />
                      Save
                    </button>
                  </div>
                </div>
              ) : selectedPaper && selectedPaper.status === "Uploading" ? (
                <p className="text-xs text-slate-400 italic">
                  Metadata will be auto-extracted once the file upload is complete...
                </p>
              ) : (
                <p className="text-xs text-slate-400 italic">
                  No valid paper selected or file upload failed.
                </p>
              )}
            </div>

            {/* AI PLACEHOLDER OPTIONS */}
            <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                  <Cpu size={14} />
                  AI Workflows
                </h3>
                <span className="text-[9px] font-bold bg-amber-50 border border-amber-100 text-amber-600 px-1.5 py-0.5 rounded">
                  Queued
                </span>
              </div>

              <div className="space-y-2">
                {[
                  { name: "AI Summary", icon: Sparkles },
                  { name: "Chat with Paper", icon: MessageSquare },
                  { name: "Research Gap Detection", icon: Brain },
                  { name: "Compare Papers", icon: GitCompare },
                  { name: "Literature Review", icon: BookOpen },
                ].map((item, idx) => {
                  const Icon = item.icon;
                  return (
                    <div
                      key={idx}
                      className="p-3 bg-slate-50 border border-slate-100 rounded-xl flex items-center justify-between group cursor-not-allowed opacity-60"
                      title="Available after AI processing"
                    >
                      <div className="flex items-center space-x-2 text-xs font-semibold text-slate-500">
                        <Icon size={14} className="text-slate-400" />
                        <span>{item.name}</span>
                      </div>
                      <span className="text-[9px] font-medium text-slate-400">
                        Locked
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Future Architecture Placeholders */}
            <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm space-y-4">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                <Database size={14} />
                Architecture Stack
              </h3>
              
              <div className="space-y-2 text-[10px] font-medium text-slate-500">
                <div className="flex justify-between items-center py-1 border-b border-slate-50">
                  <span>PDF Parser</span>
                  <span className="font-semibold text-slate-700">PyMuPDF / OCR</span>
                </div>
                <div className="flex justify-between items-center py-1 border-b border-slate-50">
                  <span>Extraction Pipeline</span>
                  <span className="font-semibold text-slate-700">Metadata Extraction</span>
                </div>
                <div className="flex justify-between items-center py-1 border-b border-slate-50">
                  <span>Embeddings / Storage</span>
                  <span className="font-semibold text-slate-700">ChromaDB Vector Store</span>
                </div>
                <div className="flex justify-between items-center py-1">
                  <span>Inference Engines</span>
                  <span className="font-semibold text-slate-700">Ollama Local LLM</span>
                </div>
              </div>
            </div>

          </div>
        </div>
      )}
    </div>
  );
}
