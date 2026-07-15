import React from "react";
import Link from "next/link";

export default function NotFound() {
  return (
    <div id="not-found-page" className="min-h-screen bg-[#050508] text-[#e0e0e0] font-sans pt-6 pb-16 flex flex-col justify-center">
      <div className="max-w-md w-full mx-auto px-4 text-center space-y-6">
        <div className="w-20 h-20 bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 rounded-full flex items-center justify-center mx-auto mb-2 animate-pulse">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-10 h-10">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z" />
          </svg>
        </div>
        
        <div className="space-y-2">
          <h1 className="text-5xl font-display font-extrabold text-white tracking-tight">404</h1>
          <h2 className="text-xl font-bold text-white/90">Page Not Found</h2>
          <p className="text-sm text-white/50 max-w-sm mx-auto leading-relaxed">
            The Model Context Protocol guide or directory path you are trying to access does not exist or has moved.
          </p>
        </div>

        <div className="pt-4">
          <Link
            id="not-found-home-btn"
            href="/"
            className="w-full inline-flex items-center justify-center px-5 py-2.5 text-sm font-semibold text-black bg-cyan-500 hover:bg-cyan-400 active:bg-cyan-600 rounded-lg transition-all shadow-lg shadow-cyan-500/10 cursor-pointer"
          >
            Return to Homepage
          </Link>
        </div>
      </div>
    </div>
  );
}

