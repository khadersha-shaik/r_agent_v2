"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

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
    // Simulate successful sign-in
    setTimeout(() => {
      setIsLoading(false);
      router.push("/dashboard");
    }, 800);
  };

  const handleGoogleLogin = () => {
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
          <h2 className="text-xl font-semibold text-slate-300">Welcome Back</h2>
          <p className="text-sm text-slate-500">Sign in to access your library and dashboard</p>
        </div>

        <div className="bg-slate-900 border border-slate-800/80 p-8 rounded-3xl space-y-6 shadow-2xl">
          {error && (
            <div className="p-3.5 bg-rose-500/10 border border-rose-500/20 text-rose-450 text-xs font-semibold rounded-xl text-center">
              ⚠️ {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-4">
              <div>
                <label htmlFor="login-email" className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">Email Address</label>
                <input
                  id="login-email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-slate-955 border border-slate-800 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-teal-500 transition-colors placeholder:text-slate-600"
                  placeholder="you@domain.com"
                  required
                />
              </div>
              <div>
                <div className="flex justify-between items-center mb-2">
                  <label htmlFor="login-password" className="block text-xs font-bold uppercase tracking-wider text-slate-400">Password</label>
                  <Link href="#" className="text-xs text-teal-555 hover:text-teal-400 transition-colors">Forgot Password?</Link>
                </div>
                <input
                  id="login-password"
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
              {isLoading ? "Signing In..." : "Sign In"}
            </button>
          </form>

          <div className="relative flex py-2 items-center">
            <div className="flex-grow border-t border-slate-800"></div>
            <span className="flex-shrink mx-4 text-slate-500 text-xs uppercase tracking-wider">Or</span>
            <div className="flex-grow border-t border-slate-800"></div>
          </div>

          <button
            onClick={handleGoogleLogin}
            disabled={isLoading}
            className="w-full py-3 border border-slate-800 hover:border-slate-700 bg-slate-900 text-slate-300 font-bold rounded-xl text-sm transition-all duration-300 flex items-center justify-center space-x-2 active:scale-95"
          >
            <span>Continue with Google</span>
          </button>
        </div>

        <p className="text-center text-sm text-slate-500">
          Don&apos;t have an account?{" "}
          <Link href="/signup" className="text-teal-555 hover:text-teal-400 font-semibold transition-colors">Sign Up</Link>
        </p>
      </div>
    </div>
  );
}
