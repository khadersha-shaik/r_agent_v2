"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function SignupPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!name.trim()) {
      setError("Full name is required.");
      return;
    }
    if (!email.trim()) {
      setError("Email address is required.");
      return;
    }
    if (!password) {
      setError("Password is required.");
      return;
    }
    if (password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }

    setIsLoading(true);
    // Simulate successful sign-up
    setTimeout(() => {
      setIsLoading(false);
      router.push("/dashboard");
    }, 800);
  };

  const handleGoogleSignup = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      router.push("/dashboard");
    }, 800);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col items-center justify-center p-6 selection:bg-teal-500 selection:text-slate-950">
      <div className="w-full max-w-md space-y-8 animate-in fade-in duration-300">
        <div className="text-center space-y-2">
          <Link href="/" className="text-3xl font-black bg-gradient-to-r from-teal-400 to-emerald-400 bg-clip-text text-transparent">
            Research Agent
          </Link>
          <h2 className="text-xl font-semibold text-slate-300">Create your account</h2>
          <p className="text-sm text-slate-500">Get started with automated academic research</p>
        </div>

        <div className="bg-slate-900 border border-slate-800/80 p-8 rounded-3xl space-y-6 shadow-2xl">
          {error && (
            <div className="p-3.5 bg-rose-500/10 border border-rose-500/20 text-rose-455 text-xs font-semibold rounded-xl text-center">
              ⚠️ {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-4">
              <div>
                <label htmlFor="signup-name" className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">Name</label>
                <input
                  id="signup-name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-slate-955 border border-slate-800 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-teal-500 transition-colors placeholder:text-slate-600"
                  placeholder="Marie Curie"
                  required
                />
              </div>
              <div>
                <label htmlFor="signup-email" className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">Email Address</label>
                <input
                  id="signup-email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-slate-955 border border-slate-800 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-teal-500 transition-colors placeholder:text-slate-600"
                  placeholder="marie@curie.org"
                  required
                />
              </div>
              <div>
                <label htmlFor="signup-password" className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">Password</label>
                <input
                  id="signup-password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-slate-955 border border-slate-800 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-teal-500 transition-colors placeholder:text-slate-600"
                  placeholder="••••••••"
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 bg-gradient-to-r from-teal-500 to-emerald-500 hover:from-teal-400 hover:to-emerald-400 text-slate-955 font-bold rounded-xl text-sm transition-all duration-300 transform active:scale-95 flex items-center justify-center gap-2"
            >
              {isLoading ? "Creating Account..." : "Create Account"}
            </button>
          </form>

          <div className="relative flex py-2 items-center">
            <div className="flex-grow border-t border-slate-800"></div>
            <span className="flex-shrink mx-4 text-slate-500 text-xs uppercase tracking-wider">Or</span>
            <div className="flex-grow border-t border-slate-800"></div>
          </div>

          <button
            onClick={handleGoogleSignup}
            disabled={isLoading}
            className="w-full py-3 border border-slate-800 hover:border-slate-700 bg-slate-900 text-slate-305 font-bold rounded-xl text-sm transition-all duration-300 flex items-center justify-center space-x-2 active:scale-95"
          >
            <span>Sign up with Google</span>
          </button>
        </div>

        <p className="text-center text-sm text-slate-500">
          Already have an account?{" "}
          <Link href="/login" className="text-teal-555 hover:text-teal-400 font-semibold transition-colors">Log In</Link>
        </p>
      </div>
    </div>
  );
}
