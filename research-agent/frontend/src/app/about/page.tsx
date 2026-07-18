import Link from "next/link";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col items-center justify-between p-8 md:p-24 selection:bg-teal-500 selection:text-slate-950">
      <div className="max-w-4xl w-full space-y-12">
        <header className="flex justify-between items-center border-b border-slate-800 pb-6">
          <Link href="/" className="text-2xl font-bold bg-gradient-to-r from-teal-400 to-emerald-400 bg-clip-text text-transparent hover:opacity-80 transition-opacity">
            Research Agent
          </Link>
          <nav className="flex space-x-6 text-sm text-slate-400">
            <Link href="/about" className="text-teal-400 hover:text-teal-300 transition-colors">About</Link>
            <Link href="/contact" className="hover:text-slate-200 transition-colors">Contact</Link>
            <Link href="/login" className="hover:text-slate-200 transition-colors">Login</Link>
          </nav>
        </header>

        <main className="space-y-8">
          <div className="space-y-4">
            <h1 className="text-5xl font-black tracking-tight leading-none bg-gradient-to-br from-white via-slate-100 to-slate-400 bg-clip-text text-transparent">
              About Our Agent
            </h1>
            <p className="text-lg text-slate-400 leading-relaxed max-w-2xl">
              Empowering researchers, scientists, and students with state-of-the-art AI agents to browse, summarize, analyze, and synthesize scientific literature and news.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 pt-6">
            <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800/80 hover:border-slate-700/80 transition-all duration-300">
              <h3 className="text-xl font-bold text-teal-400 mb-2">Automated Synthesis</h3>
              <p className="text-sm text-slate-400 leading-relaxed">
                Connect multiple papers and generate comprehensive summaries and literature reviews in minutes.
              </p>
            </div>
            <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800/80 hover:border-slate-700/80 transition-all duration-300">
              <h3 className="text-xl font-bold text-teal-400 mb-2">Real-Time News Monitoring</h3>
              <p className="text-sm text-slate-400 leading-relaxed">
                Stay updated with the latest breakthroughs in your scientific fields with customizable alerts.
              </p>
            </div>
          </div>
        </main>

        <footer className="border-t border-slate-900 pt-8 text-center text-xs text-slate-600">
          &copy; {new Date().getFullYear()} Research Agent. All rights reserved.
        </footer>
      </div>
    </div>
  );
}
