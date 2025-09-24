import React from 'react';
import { ArrowRight, Map, Sparkles, Star } from 'lucide-react';
import Link from 'next/link'

export default function Home() {
  return (
    <div className="min-h-screen bg-black relative overflow-hidden">
      {/* Navigation layout.js */}

      {/* Main content */}
      <div className="relative z-10 flex flex-col items-center justify-center px-8 pt-16 pb-24">
        {/* Hero badge */}
        <div className="flex items-center space-x-2 px-4 py-2 rounded-full bg-gradient-to-r from-black to-[#26a269] backdrop-blur-sm border border-white mb-8 group hover:scale-105 transition-transform">
          <Sparkles className="w-4 h-4 text-[#26a269]" />
          <span className="text-sm text-white">Built for modern development roadmaps</span>
        </div>

        {/* Main logo area */}
        <div className="group">
          <div className="relative">
            <img 
              src="/DevPathLogo.png" 
              className="relative h-[300px] w-[500px] mx-auto object-contain drop-shadow-2xl group-hover:scale-105 transition-transform duration-500" 
              alt="DevPath" 
            />
          </div>
        </div>

        {/* Enhanced tagline */}
        <div className="text-center mb-12 max-w-4xl">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-white via-blue-100 to-purple-100 bg-clip-text text-transparent leading-tight">
            <span className="text-[#26a269]">Dev</span>Path
            <br />
            <span className="text-white">Explore Tech Roadmaps</span>
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed">
            Start your journey in Computer Science and Software Development with interactive roadmaps, clear milestones, and guided paths designed for beginners and students.
          </p>
        </div>

        {/* Feature highlights */}
        <div className="flex flex-wrap justify-center gap-6 mb-12">
          <div className="flex items-center space-x-2 px-4 py-2 rounded-full bg-white/5 backdrop-blur-sm border border-white/10">
            <Map className="w-5 h-5 text-[#26a269]" />
            <span className="text-gray-200">Visual Roadmaps</span>
          </div>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 mb-16">
          <Link
            href="/roadmaps"
            className="group flex items-center space-x-2 px-8 py-4 rounded-xl bg-[#26a269] text-white font-semibold shadow-2xl hover:shadow-green-500/25 hover:scale-105 transition-all duration-300"
          >
            <span>Get Started</span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>        
      </div>

      {/* Enhanced footer */}
      <footer className="relative z-10 border-t border-white bg-black/20 backdrop-blur-sm ">
        <div className="max-w-6xl mx-auto px-8 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-2 mb-4 md:mb-0 justify-center text-center flex-1 text-xl">
              <div className="w-8 h-8 bg-[#26a269] rounded-lg flex items-center justify-center">
                <img 
                  src="/DevPath icon.png" 
                  className="relative h-[300px] w-[500px] mx-auto object-contain drop-shadow-2xl group-hover:scale-105 transition-transform duration-500" 
                  alt="DevPath" 
                />
              </div>
              <span className="text-gray-300">© {new Date().getFullYear()} DevPath</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}