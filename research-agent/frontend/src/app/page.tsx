import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col justify-between p-8 md:p-24 selection:bg-teal-500 selection:text-slate-950 relative overflow-hidden">
      {/* Decorative background glows */}
      <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] rounded-full bg-teal-500/5 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] rounded-full bg-indigo-500/5 blur-[120px] pointer-events-none" />

      <div className="max-w-6xl w-full mx-auto space-y-20 relative z-10">
        {/* Navigation */}
        <header className="flex justify-between items-center border-b border-slate-900 pb-6">
          <div className="text-2xl font-black bg-gradient-to-r from-teal-400 to-emerald-400 bg-clip-text text-transparent">
            Research Agent
          </div>
          <nav className="flex items-center space-x-6 text-sm text-slate-400">
            <Link href="/about" className="hover:text-slate-200 transition-colors">About</Link>
            <Link href="/contact" className="hover:text-slate-200 transition-colors">Contact</Link>
            <Link href="/login" className="hover:text-slate-200 transition-colors">Login</Link>
            <Link href="/signup" className="px-4 py-2 bg-gradient-to-r from-teal-500 to-emerald-500 hover:from-teal-400 hover:to-emerald-400 text-slate-950 font-bold rounded-xl transition-all duration-300">
              Sign Up
            </Link>
          </nav>
        </header>

        {/* Hero Section */}
        <main className="space-y-16 text-center max-w-4xl mx-auto">
          <div className="space-y-6">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-teal-500/10 text-teal-400 border border-teal-500/20">
              ⚡ Powered by Gemini 3.5
            </span>
            <h1 className="text-5xl md:text-7xl font-black tracking-tight leading-none bg-gradient-to-br from-white via-slate-100 to-slate-500 bg-clip-text text-transparent">
              Supercharge Your Academic Research
            </h1>
            <p className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto leading-relaxed">
              Synthesize scientific literature, discover deep connections, and track latest breakthroughs using autonomous AI research agents.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link href="/dashboard" className="px-8 py-4 bg-gradient-to-r from-teal-500 to-emerald-500 hover:from-teal-400 hover:to-emerald-400 text-slate-950 font-bold rounded-xl text-md transition-all duration-300 transform active:scale-95 shadow-lg shadow-teal-500/10">
              Enter Dashboard
            </Link>
            <Link href="/about" className="px-8 py-4 bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-200 font-bold rounded-xl text-md transition-all">
              Learn More
            </Link>
          </div>

          {/* Features Grid */}
          <div className="grid md:grid-cols-3 gap-6 pt-8 text-left">
            <div className="p-6 rounded-2xl bg-slate-900/50 border border-slate-900 hover:border-slate-850 hover:bg-slate-900 transition-all">
              <span className="text-2xl">🔍</span>
              <h3 className="text-lg font-bold text-white mt-4 mb-2">Smart Discovery</h3>
              <p className="text-sm text-slate-400 leading-relaxed">
                Search journals and databases with semantically enriched query understanding.
              </p>
            </div>
            <div className="p-6 rounded-2xl bg-slate-900/50 border border-slate-900 hover:border-slate-850 hover:bg-slate-900 transition-all">
              <span className="text-2xl">📊</span>
              <h3 className="text-lg font-bold text-white mt-4 mb-2">Instant Summaries</h3>
              <p className="text-sm text-slate-400 leading-relaxed">
                Generate highly accurate scientific abstracts and executive brief summaries in one click.
              </p>
            </div>
            <div className="p-6 rounded-2xl bg-slate-900/50 border border-slate-900 hover:border-slate-850 hover:bg-slate-900 transition-all">
              <span className="text-2xl">🤖</span>
              <h3 className="text-lg font-bold text-white mt-4 mb-2">Agentic Synthesizer</h3>
              <p className="text-sm text-slate-400 leading-relaxed">
                Allow AI agents to read, map connections, and construct draft reviews across papers.
              </p>
            </div>
          </div>
        </main>

        {/* Footer */}
        <footer className="border-t border-slate-900 pt-8 text-center text-xs text-slate-600">
          &copy; {new Date().getFullYear()} Research Agent. All rights reserved.
        </footer>
      </div>
    </div>
  );
}
