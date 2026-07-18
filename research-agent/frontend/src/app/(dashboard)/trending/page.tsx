export default function TrendingTopicsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-extrabold tracking-tight text-slate-900">Trending Topics</h1>
        <p className="text-sm text-slate-500 mt-1">
          Explore surging keywords, popular fields, and highly cited preprints this week.
        </p>
      </div>

      <div className="p-8 border border-blue-100 bg-white rounded-2xl shadow-sm space-y-4">
        <div className="h-12 w-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold">
          🔥
        </div>
        <h3 className="text-lg font-bold text-slate-800">Popular Fields & Keyword Shifts</h3>
        <p className="text-sm text-slate-500 max-w-lg leading-relaxed">
          This is a placeholder for trending analytics. Real-time extraction of keyword clusters and citations will show here in future updates.
        </p>
        <div className="flex flex-wrap gap-2 pt-2">
          <span className="px-3 py-1.5 bg-slate-50 border border-slate-200 text-xs font-semibold text-slate-600 rounded-full">#RetrievalAugmentedGeneration</span>
          <span className="px-3 py-1.5 bg-slate-50 border border-slate-200 text-xs font-semibold text-slate-600 rounded-full">#Superconductivity</span>
          <span className="px-3 py-1.5 bg-slate-50 border border-slate-200 text-xs font-semibold text-slate-600 rounded-full">#AgenticWorkflows</span>
        </div>
      </div>
    </div>
  );
}
