"use client";

import { useState } from "react";
import Link from "next/link";

export default function ContactPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!name.trim()) {
      setError("Name is required.");
      return;
    }
    if (!email.trim()) {
      setError("Email address is required.");
      return;
    }
    if (!message.trim()) {
      setError("Message content is required.");
      return;
    }

    setIsLoading(true);
    // Simulate successful message submission
    setTimeout(() => {
      setIsLoading(false);
      setSuccess("Thank you! Your message has been sent successfully.");
      setName("");
      setEmail("");
      setMessage("");
    }, 800);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col items-center justify-between p-8 md:p-24 selection:bg-teal-500 selection:text-slate-950">
      <div className="max-w-4xl w-full space-y-12">
        <header className="flex justify-between items-center border-b border-slate-800 pb-6">
          <Link href="/" className="text-2xl font-bold bg-gradient-to-r from-teal-400 to-emerald-400 bg-clip-text text-transparent hover:opacity-80 transition-opacity">
            Research Agent
          </Link>
          <nav className="flex space-x-6 text-sm text-slate-400">
            <Link href="/about" className="hover:text-slate-200 transition-colors">About</Link>
            <Link href="/contact" className="text-teal-400 hover:text-teal-300 transition-colors">Contact</Link>
            <Link href="/login" className="hover:text-slate-200 transition-colors">Login</Link>
          </nav>
        </header>

        <main className="grid md:grid-cols-2 gap-12 items-start">
          <div className="space-y-6">
            <h1 className="text-5xl font-black tracking-tight leading-none bg-gradient-to-br from-white via-slate-100 to-slate-400 bg-clip-text text-transparent">
              Get in Touch
            </h1>
            <p className="text-slate-400 leading-relaxed">
              Have questions about our AI models, integration plans, or looking for enterprise solutions? Leave us a message.
            </p>
            <div className="space-y-2 text-sm text-slate-400">
              <p>📍 San Francisco, CA</p>
              <p>✉️ support@researchagent.ai</p>
            </div>
          </div>

          <div className="space-y-4">
            {error && (
              <div className="p-3.5 bg-rose-500/10 border border-rose-500/20 text-rose-400 text-xs font-semibold rounded-xl text-center">
                ⚠️ {error}
              </div>
            )}
            {success && (
              <div className="p-3.5 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold rounded-xl text-center">
                ✨ {success}
              </div>
            )}

            <form onSubmit={handleSubmit} className="bg-slate-900 border border-slate-800/80 p-8 rounded-2xl space-y-4 shadow-2xl">
              <div>
                <label htmlFor="contact-name" className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">Name</label>
                <input
                  id="contact-name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-teal-500 transition-colors placeholder:text-slate-700 text-slate-100"
                  placeholder="Ada Lovelace"
                  required
                />
              </div>
              <div>
                <label htmlFor="contact-email" className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">Email</label>
                <input
                  id="contact-email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-teal-500 transition-colors placeholder:text-slate-700 text-slate-100"
                  placeholder="ada@lovelace.org"
                  required
                />
              </div>
              <div>
                <label htmlFor="contact-message" className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">Message</label>
                <textarea
                  id="contact-message"
                  rows={4}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-teal-500 transition-colors resize-none placeholder:text-slate-700 text-slate-100"
                  placeholder="Tell us how we can help..."
                  required
                />
              </div>
              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-3 bg-gradient-to-r from-teal-500 to-emerald-500 hover:from-teal-400 hover:to-emerald-400 text-slate-950 font-bold rounded-xl text-sm transition-all duration-300 transform active:scale-95 flex items-center justify-center gap-2"
              >
                {isLoading ? "Sending..." : "Send Message"}
              </button>
            </form>
          </div>
        </main>

        <footer className="border-t border-slate-900 pt-8 text-center text-xs text-slate-600">
          &copy; {new Date().getFullYear()} Research Agent. All rights reserved.
        </footer>
      </div>
    </div>
  );
}
