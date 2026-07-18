import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-white border-t border-slate-200 py-6 px-8 select-none">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
        <div>
          Research Agent &copy; {new Date().getFullYear()}
        </div>
        <div className="flex space-x-6">
          <Link href="/privacy" className="hover:text-blue-600 transition-colors">Privacy</Link>
          <Link href="/terms" className="hover:text-blue-600 transition-colors">Terms</Link>
          <Link href="/contact" className="hover:text-blue-600 transition-colors">Contact</Link>
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-blue-600 transition-colors"
          >
            GitHub
          </a>
        </div>
      </div>
    </footer>
  );
}
