'use client';

import Link from "next/link";

export default function CmdkLandingPage() {
    return (
        <div className="relative flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 overflow-hidden">
            {/* Animated background elements */}
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse"></div>
                <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
            </div>

            {/* Content */}
            <div className="relative z-10 flex flex-col items-center justify-center px-4 max-w-5xl mx-auto">
                {/* Badge */}
                <div className="mb-8 px-4 py-2 rounded-full bg-gradient-to-r from-purple-500/10 to-blue-500/10 border border-purple-500/20 backdrop-blur-sm">
                    <span className="text-sm font-medium bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                        ⌘K Command Palette
                    </span>
                </div>

                {/* Main heading */}
                <h1 className="text-6xl md:text-8xl font-bold text-center mb-6 tracking-tight">
                    <span className="bg-gradient-to-r from-white via-slate-200 to-slate-400 bg-clip-text text-transparent">
                        Command your
                    </span>
                    <br />
                    <span className="bg-gradient-to-r from-purple-400 via-blue-400 to-cyan-400 bg-clip-text text-transparent animate-gradient">
                        workflow
                    </span>
                </h1>

                {/* Description */}
                <p className="text-xl md:text-2xl text-slate-400 text-center max-w-2xl mb-12 leading-relaxed">
                    Lightning-fast command palette that puts everything you need at your fingertips.
                    One keyboard shortcut to rule them all.
                </p>

                {/* CTA Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 mb-16">
                    <button className="group relative px-8 py-4 bg-gradient-to-r from-purple-500 to-blue-500 rounded-lg font-semibold text-white shadow-lg shadow-purple-500/50 hover:shadow-purple-500/70 transition-all duration-300 hover:scale-105">
                        <span className="relative z-10">Get Started</span>
                        <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-purple-600 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                    </button>
                    <Link href="/">
                        <button className="px-8 py-4 border border-slate-700 rounded-lg font-semibold text-slate-300 hover:border-slate-600 hover:bg-slate-800/50 transition-all duration-300">
                            ← Back Home
                        </button>
                    </Link>
                </div>

                {/* Feature cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-4xl">
                    <div className="group p-6 rounded-xl bg-slate-900/50 border border-slate-800 backdrop-blur-sm hover:border-purple-500/50 transition-all duration-300 hover:scale-105">
                        <div className="text-3xl mb-4">⚡</div>
                        <h3 className="text-lg font-semibold text-white mb-2">Blazing Fast</h3>
                        <p className="text-slate-400 text-sm">Instant search and navigation with zero latency</p>
                    </div>
                    <div className="group p-6 rounded-xl bg-slate-900/50 border border-slate-800 backdrop-blur-sm hover:border-blue-500/50 transition-all duration-300 hover:scale-105">
                        <div className="text-3xl mb-4">⌨️</div>
                        <h3 className="text-lg font-semibold text-white mb-2">Keyboard First</h3>
                        <p className="text-slate-400 text-sm">Navigate your entire app without touching the mouse</p>
                    </div>
                    <div className="group p-6 rounded-xl bg-slate-900/50 border border-slate-800 backdrop-blur-sm hover:border-cyan-500/50 transition-all duration-300 hover:scale-105">
                        <div className="text-3xl mb-4">🎨</div>
                        <h3 className="text-lg font-semibold text-white mb-2">Customizable</h3>
                        <p className="text-slate-400 text-sm">Adapt the palette to match your unique workflow</p>
                    </div>
                </div>

                {/* Keyboard hint */}
                <div className="mt-16 flex items-center gap-2 text-slate-500 text-sm">
                    <span>Press</span>
                    <kbd className="px-3 py-1.5 bg-slate-800 border border-slate-700 rounded-md font-mono text-slate-300">⌘</kbd>
                    <span>+</span>
                    <kbd className="px-3 py-1.5 bg-slate-800 border border-slate-700 rounded-md font-mono text-slate-300">K</kbd>
                    <span>to open</span>
                </div>
            </div>
        </div>
    );
}