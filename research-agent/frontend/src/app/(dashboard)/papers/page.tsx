"use client";

import { useState } from "react";
import {
  Search,
  Mic,
  SlidersHorizontal,
  Bookmark,
  GitCompare,
  MessageSquare,
  Sparkles,
  ExternalLink,
  History,
  TrendingUp,
  FileText,
  Filter,
  BarChart3,
  BookOpen,
  ArrowRight,
  Database,
  Grid,
  ChevronDown,
  ChevronUp,
  RotateCcw,
  Check,
} from "lucide-react";
import { cn } from "@/lib/utils";

// Mock database of papers
const MOCK_PAPERS = [
  {
    id: 1,
    title: "Attention Is All You Need",
    authors: "Ashish Vaswani, Noam Shazeer, Niki Parmar, Jakob Uszkoreit, Llion Jones, Aidan N. Gomez, Łukasz Kaiser, Illia Polosukhin",
    journal: "Advances in Neural Information Processing Systems (NeurIPS)",
    year: 2017,
    citations: 120450,
    doi: "10.48550/arXiv.1706.03762",
    abstract: "The dominant sequence transduction models are based on complex recurrent or convolutional neural networks in an encoder-decoder configuration. We propose a new simple network architecture, the Transformer, based solely on attention mechanisms, dispensing with recurrence and convolutions entirely.",
    keywords: ["Transformer", "Attention", "Deep Learning", "NLP"],
  },
  {
    id: 2,
    title: "Direct Preference Optimization: Your Language Model is Secretly a Reward Model",
    authors: "Rafael Rafailov, Archit Sharma, Eric Mitchell, Stefano Ermon, Christopher D. Manning, Chelsea Finn",
    journal: "Advances in Neural Information Processing Systems (NeurIPS)",
    year: 2023,
    citations: 850,
    doi: "10.48550/arXiv.2305.18290",
    abstract: "While reinforcement learning from human feedback (RLHF) is the standard method for aligning LLMs, it is complex and unstable. We introduce Direct Preference Optimization (DPO), a stable, performant, and computationally lightweight algorithm that optimizes policy directly on preference pairs.",
    keywords: ["DPO", "LLM Alignment", "RLHF", "Human Preferences"],
  },
  {
    id: 3,
    title: "LoRA: Low-Rank Adaptation of Large Language Models",
    authors: "Edward J. Hu, Yelong Shen, Phillip Wallis, Zeyuan Allen-Zhu, Yuanzhi Li, Shean Wang, Lu Wang, Weizhu Chen",
    journal: "International Conference on Learning Representations (ICLR)",
    year: 2022,
    citations: 4200,
    doi: "10.48550/arXiv.2106.09685",
    abstract: "LoRA proposes freezing pre-trained model weights and injecting trainable rank decomposition matrices into each layer of the Transformer architecture. This greatly reduces the number of trainable parameters for downstream tasks while maintaining model performance.",
    keywords: ["PEFT", "Adaptation", "Parameter-Efficient", "Transformers"],
  },
  {
    id: 4,
    title: "Constitutional AI: Harmlessness from AI Feedback",
    authors: "Yuntao Bai, Saurav Kadavath, Sandipan Kundu, Amanda Askell, Jackson Kernion, Andy Jones, Anna Chen, Anna Goldie",
    journal: "arXiv Preprint",
    year: 2022,
    citations: 1120,
    doi: "10.48550/arXiv.2212.08073",
    abstract: "As language models scale, aligning their behavior with human values becomes crucial. We investigate Constitutional AI (CAI), a method to train harmless AI assistants using feedback from AI models configured with a small set of constitutional principles, bypassing human labels.",
    keywords: ["RLAIF", "AI Safety", "Constitutional Principles", "Alignment"],
  },
];

const POPULAR_SEARCHES = [
  "LLMs",
  "Computer Vision",
  "Healthcare AI",
  "Quantum AI",
  "Edge AI",
  "Robotics",
  "Federated Learning",
  "Cyber Security",
  "AI Agents",
];

const INTEGRATION_PARTNERS = [
  { name: "OpenAlex", type: "Global Index" },
  { name: "Semantic Scholar", type: "AI Recommendations" },
  { name: "Crossref", type: "Metadata Lookup" },
  { name: "arXiv", type: "Preprint Index" },
  { name: "PubMed", type: "Biomedical Database" },
  { name: "DOI Lookup", type: "Direct Resolution" },
];

export default function PaperSearchPage() {
  const [query, setQuery] = useState("");
  const [hasSearched, setHasSearched] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [results, setResults] = useState<typeof MOCK_PAPERS>([]);
  const [recentSearches, setRecentSearches] = useState<string[]>([
    "DPO preference alignment",
    "Transformer architecture Vaswani",
  ]);

  // Filters State
  const [yearFilter, setYearFilter] = useState("all");
  const [citationsFilter, setCitationsFilter] = useState("0");
  const [openAccessFilter, setOpenAccessFilter] = useState(false);
  const [sortBy, setSortBy] = useState("relevance");

  const filteredResults = results
    .filter((paper) => {
      if (yearFilter !== "all" && paper.year < parseInt(yearFilter)) {
        return false;
      }
      if (citationsFilter !== "0" && paper.citations < parseInt(citationsFilter)) {
        return false;
      }
      return true;
    })
    .sort((a, b) => {
      if (sortBy === "cited") {
        return b.citations - a.citations;
      }
      if (sortBy === "newest") {
        return b.year - a.year;
      }
      return 0;
    });

  const handleSearch = (searchQuery: string) => {
    if (!searchQuery.trim()) return;

    // Simulate search logic
    const matched = MOCK_PAPERS.filter((paper) => {
      const matchText = `${paper.title} ${paper.authors} ${paper.keywords.join(" ")} ${paper.doi}`.toLowerCase();
      return matchText.includes(searchQuery.toLowerCase());
    });

    setResults(matched);
    setHasSearched(true);
    setQuery(searchQuery);

    // Save to history
    if (!recentSearches.includes(searchQuery)) {
      setRecentSearches([searchQuery, ...recentSearches.slice(0, 4)]);
    }
  };

  const handleResetFilters = () => {
    setYearFilter("all");
    setCitationsFilter("0");
    setOpenAccessFilter(false);
    setSortBy("relevance");
  };

  return (
    <div className="space-y-8 pb-12 selection:bg-blue-100 selection:text-blue-900">
      
      {/* PAGE HEADER */}
      <section className="space-y-1.5">
        <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
          Research Paper Search
        </h1>
        <p className="text-slate-500 text-sm md:text-base font-medium max-w-2xl leading-relaxed">
          Search millions of research papers using keywords, authors, DOI, journals, or research domains.
        </p>
      </section>

      {/* SEARCH BAR SECTION */}
      <section className="w-full max-w-3xl mx-auto space-y-4">
        <div className="flex gap-2 p-1.5 bg-white border border-slate-200 shadow-sm rounded-2xl focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-500/10 transition-all items-center">
          <Search className="text-slate-400 ml-3 flex-shrink-0" size={20} />
          <input
            type="text"
            className="w-full bg-transparent border-none outline-none text-sm text-slate-800 placeholder-slate-400 px-2 py-2"
            placeholder="Search papers by title, keyword, DOI, author, journal..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSearch(query)}
          />
          {/* Voice Search Mockup */}
          <button 
            className="p-2 text-slate-400 hover:text-blue-600 hover:bg-slate-50 rounded-xl transition-all"
            title="Voice Search (Placeholder)"
          >
            <Mic size={18} />
          </button>
          
          <button
            onClick={() => handleSearch(query)}
            className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-semibold rounded-xl text-sm transition-all shadow-md shadow-blue-500/10 active:scale-[0.98]"
          >
            Search
          </button>
        </div>

        <div className="flex items-center justify-between text-xs px-2">
          {/* Advanced Filters Trigger */}
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="inline-flex items-center gap-1.5 text-slate-500 hover:text-blue-600 font-semibold transition-colors"
          >
            <SlidersHorizontal size={14} />
            Advanced Filters
            {showFilters ? <ChevronUp size={12} /> : <ChevronDown size={12} />}
          </button>
          
          {/* Reset Action */}
          {hasSearched && (
            <button
              onClick={() => {
                setHasSearched(false);
                setQuery("");
                setResults([]);
                handleResetFilters();
              }}
              className="text-slate-400 hover:text-blue-600 font-semibold inline-flex items-center gap-1 transition-colors"
            >
              <RotateCcw size={12} />
              Reset Search
            </button>
          )}
        </div>

        {/* ADVANCED FILTERS PANEL */}
        {showFilters && (
          <div className="p-6 bg-white border border-slate-200 rounded-2xl shadow-sm grid md:grid-cols-3 gap-6 animate-in fade-in slide-in-from-top-2 duration-200">
            {/* Year & Citations */}
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">Publication Year</label>
                <select
                  value={yearFilter}
                  onChange={(e) => setYearFilter(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-700 focus:outline-none focus:border-blue-500"
                >
                  <option value="all">Anytime</option>
                  <option value="2026">Since 2026</option>
                  <option value="2025">Since 2025</option>
                  <option value="2020">Since 2020</option>
                  <option value="2015">Since 2015</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">Min Citations</label>
                <select
                  value={citationsFilter}
                  onChange={(e) => setCitationsFilter(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-700 focus:outline-none focus:border-blue-500"
                >
                  <option value="0">Any citations</option>
                  <option value="10">10+ citations</option>
                  <option value="100">100+ citations</option>
                  <option value="1000">1,000+ citations</option>
                </select>
              </div>
            </div>

            {/* Sorting & Publishing details */}
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">Sort By</label>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-700 focus:outline-none focus:border-blue-500"
                >
                  <option value="relevance">Most Relevant</option>
                  <option value="cited">Most Cited</option>
                  <option value="newest">Newest First</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">Research Domain</label>
                <select
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-700 focus:outline-none focus:border-blue-500"
                  disabled
                >
                  <option>All Domains</option>
                  <option>Computer Science</option>
                  <option>Biology & Medicine</option>
                  <option>Physics & Mathematics</option>
                </select>
              </div>
            </div>

            {/* Checkbox fields & Mock parameters */}
            <div className="space-y-4 flex flex-col justify-between">
              <div className="space-y-3">
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-500">Filters</label>
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id="openAccess"
                    checked={openAccessFilter}
                    onChange={(e) => setOpenAccessFilter(e.target.checked)}
                    className="rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                  />
                  <label htmlFor="openAccess" className="text-xs font-medium text-slate-600 cursor-pointer">
                    Open Access Only
                  </label>
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-4">
                <button
                  onClick={handleResetFilters}
                  className="px-3 py-1.5 border border-slate-200 text-slate-500 hover:text-blue-600 font-semibold rounded-lg text-xs transition-colors"
                >
                  Reset Filters
                </button>
              </div>
            </div>
          </div>
        )}
      </section>

      {/* DYNAMIC CONTENT LAYOUT */}
      {!hasSearched ? (
        /* ================= EMPTY STATE / INITIAL VIEW ================= */
        <div className="space-y-10 py-8">
          <div className="text-center space-y-4 max-w-md mx-auto">
            <div className="h-16 w-16 bg-blue-50 text-blue-600 border border-blue-100 rounded-2xl flex items-center justify-center text-3xl mx-auto shadow-sm">
              🔍
            </div>
            <div className="space-y-1">
              <h3 className="font-bold text-slate-800 text-lg">Start searching to discover research papers</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Connect peer preprints, citation mappings, and metadata libraries with AI synthesis.
              </p>
            </div>
          </div>

          {/* Popular searches chips */}
          <div className="max-w-2xl mx-auto space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 text-center">Popular Topics</h4>
            <div className="flex flex-wrap justify-center gap-2">
              {POPULAR_SEARCHES.map((chip) => (
                <button
                  key={chip}
                  onClick={() => {
                    setQuery(chip);
                    handleSearch(chip);
                  }}
                  className="px-3 py-1.5 bg-white border border-slate-200 hover:border-blue-400 text-xs font-semibold text-slate-600 hover:text-blue-600 rounded-full transition-colors"
                >
                  {chip}
                </button>
              ))}
            </div>
          </div>

          {/* Recent Searches */}
          <div className="max-w-md mx-auto space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 text-center">Recent Searches</h4>
            <div className="space-y-2">
              {recentSearches.map((hist, idx) => (
                <div
                  key={idx}
                  onClick={() => {
                    setQuery(hist);
                    handleSearch(hist);
                  }}
                  className="flex items-center space-x-3 p-3 bg-white hover:bg-slate-50 border border-slate-200/80 rounded-xl cursor-pointer transition-colors text-xs font-semibold text-slate-700"
                >
                  <History size={14} className="text-slate-400" />
                  <span className="truncate">{hist}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : results.length === 0 ? (
        /* ================= NO RESULTS STATE ================= */
        <div className="text-center space-y-6 py-12 max-w-md mx-auto">
          <div className="h-16 w-16 bg-rose-50 text-rose-500 border border-rose-100 rounded-2xl flex items-center justify-center text-3xl mx-auto">
            💡
          </div>
          <div className="space-y-2">
            <h3 className="font-bold text-slate-800 text-lg">No Results Found</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              We couldn&apos;t find any papers matching &ldquo;{query}&rdquo; in our mock database.
            </p>
          </div>
          <div className="p-5 bg-slate-50 border border-slate-100 rounded-xl text-left space-y-2">
            <span className="text-xs font-bold text-slate-700">Search Suggestions:</span>
            <ul className="list-disc list-inside text-xs text-slate-500 space-y-1">
              <li>Try search keywords like &ldquo;Attention&rdquo;, &ldquo;DPO&rdquo;, or &ldquo;LoRA&rdquo;.</li>
              <li>Remove advanced filters or broaden publication years.</li>
              <li>Search broader topics instead of specific formulas.</li>
            </ul>
          </div>
        </div>
      ) : (
        /* ================= 3-COLUMN SEARCH RESULTS LAYOUT ================= */
        <div className="grid lg:grid-cols-4 gap-8 items-start">
          
          {/* LEFT SIDEBAR: Selected Filters Summary & History */}
          <aside className="lg:col-span-1 space-y-6 hidden lg:block">
            <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm space-y-4">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                <Filter size={12} />
                Selected Filters
              </h3>
              <div className="space-y-2">
                <div className="flex justify-between items-center text-xs p-2 bg-slate-50 rounded-lg border border-slate-100">
                  <span className="text-slate-400">Query:</span>
                  <span className="font-bold text-slate-700 truncate max-w-[120px]">{query}</span>
                </div>
                <div className="flex justify-between items-center text-xs p-2 bg-slate-50 rounded-lg border border-slate-100">
                  <span className="text-slate-400">Sort:</span>
                  <span className="font-bold text-slate-700 uppercase">{sortBy}</span>
                </div>
                {yearFilter !== "all" && (
                  <div className="flex justify-between items-center text-xs p-2 bg-slate-50 rounded-lg border border-slate-100">
                    <span className="text-slate-400">Year:</span>
                    <span className="font-bold text-slate-700">&gt;= {yearFilter}</span>
                  </div>
                )}
              </div>
            </div>

            {/* Saved Searches */}
            <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm space-y-3">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">Saved Searches</h3>
              <div className="text-center py-4 text-xs text-slate-400">
                No saved searches yet.
              </div>
            </div>
          </aside>

          {/* MIDDLE COLUMN: Paper Results List */}
          <div className="lg:col-span-2 space-y-6">
            <div className="flex justify-between items-center text-xs text-slate-400 font-medium">
              <span>Showing {filteredResults.length} papers matching &ldquo;{query}&rdquo;</span>
              <span>Mock Index Database</span>
            </div>

            <div className="space-y-4">
              {filteredResults.map((paper) => (
                <div
                  key={paper.id}
                  className="p-6 bg-white border border-slate-200 rounded-2xl shadow-sm hover:border-blue-400 hover:shadow-md transition-all duration-300 flex flex-col justify-between gap-4"
                >
                  <div className="space-y-3">
                    <div className="flex justify-between items-start gap-4">
                      <h3 className="font-extrabold text-slate-800 text-lg leading-snug hover:text-blue-600 cursor-pointer transition-colors">
                        {paper.title}
                      </h3>
                      <span className="px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider rounded-lg bg-slate-100 text-slate-500 border border-slate-200 flex-shrink-0">
                        Citations: {paper.citations.toLocaleString()}
                      </span>
                    </div>

                    <p className="text-xs font-semibold text-slate-400 leading-relaxed">
                      {paper.authors}
                    </p>

                    <p className="text-xs text-slate-400 italic">
                      {paper.journal} &bull; {paper.year}
                    </p>

                    <p className="text-xs text-slate-500 leading-relaxed font-normal">
                      {paper.abstract}
                    </p>

                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {paper.keywords.map((kw, kwIdx) => (
                        <span
                          key={kwIdx}
                          className="px-2 py-0.5 rounded-md bg-slate-50 border border-slate-200 text-[10px] text-slate-500 font-medium"
                        >
                          {kw}
                        </span>
                      ))}
                    </div>

                    <div className="text-[10px] text-slate-400 font-semibold font-mono bg-slate-50/50 p-2 rounded-lg inline-block border border-slate-100">
                      DOI: {paper.doi}
                    </div>
                  </div>

                  {/* Actions bar */}
                  <div className="flex flex-wrap items-center gap-3 border-t border-slate-100 pt-4 text-xs text-slate-500 font-semibold">
                    <button className="inline-flex items-center gap-1 hover:text-blue-600 transition-colors">
                      <ExternalLink size={14} />
                      View Paper
                    </button>
                    <span className="text-slate-200">|</span>
                    <button className="inline-flex items-center gap-1 hover:text-blue-600 transition-colors">
                      <Bookmark size={14} />
                      Save
                    </button>
                    <span className="text-slate-200">|</span>
                    <button className="inline-flex items-center gap-1 hover:text-blue-600 transition-colors">
                      <GitCompare size={14} />
                      Compare
                    </button>
                    <span className="text-slate-200">|</span>
                    <button className="inline-flex items-center gap-1 hover:text-blue-600 transition-colors">
                      <Sparkles size={14} />
                      Summarize
                    </button>
                    <span className="text-slate-200">|</span>
                    <button className="inline-flex items-center gap-1 hover:text-blue-600 transition-colors">
                      <MessageSquare size={14} />
                      Chat
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT COLUMN: Quick Stats & Future Integrations */}
          <aside className="lg:col-span-1 space-y-6">
            
            {/* Quick Stats Panel */}
            <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm space-y-4">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                <BarChart3 size={14} />
                Quick Statistics
              </h3>
              
              <div className="space-y-3 text-xs">
                <div>
                  <span className="text-slate-400 block">Total Citation count</span>
                  <span className="text-lg font-black text-slate-800">
                    {filteredResults.reduce((acc, curr) => acc + curr.citations, 0).toLocaleString()}
                  </span>
                </div>
                <div className="border-t border-slate-100 pt-3">
                  <span className="text-slate-400 block mb-2">Publication Distribution</span>
                  <div className="bg-slate-50 p-3 rounded-lg text-slate-500 font-mono text-[10px] space-y-1">
                    <div>NeurIPS: {filteredResults.filter(p => p.journal.includes("NeurIPS")).length}</div>
                    <div>ICLR: {filteredResults.filter(p => p.journal.includes("ICLR")).length}</div>
                    <div>Preprint: {filteredResults.filter(p => p.journal.includes("arXiv")).length}</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Future Integrations Placeholders */}
            <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                  <Database size={14} />
                  Integrations
                </h3>
                <span className="text-[9px] font-bold bg-indigo-50 border border-indigo-100 text-indigo-600 px-1.5 py-0.5 rounded">
                  Upcoming
                </span>
              </div>

              <div className="space-y-2">
                {INTEGRATION_PARTNERS.map((partner, idx) => (
                  <div
                    key={idx}
                    className="flex justify-between items-center text-[10px] py-1.5 border-b border-slate-50 last:border-0"
                  >
                    <span className="font-semibold text-slate-700">{partner.name}</span>
                    <span className="text-slate-400">{partner.type}</span>
                  </div>
                ))}
              </div>
            </div>
          </aside>
        </div>
      )}
    </div>
  );
}
