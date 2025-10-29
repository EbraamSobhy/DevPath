"use client";

import React from "react";
import Link from "next/link";
import { SiUnrealengine } from "react-icons/si";
import { FaUnity } from "react-icons/fa6";

const items = [
  { name: "Unreal (C++)", path: "/unreal", icon: <SiUnrealengine size={28} /> },
  { name: "Unity (C#)", path: "/unity", icon: <FaUnity size={28} /> },
];

export default function Roadmaps() {
  return (
    <div className="bg-[#0f172a] min-h-screen flex flex-col items-center justify-start px-4 sm:px-6 md:px-8 pt-6 pb-10">
      {/* Title */}
      <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-12 text-center px-6 py-3 rounded-xl shadow-2xl bg-[#1e293b] mt-[150px]">
        Game Engines
      </h1>

      {/* Cards */}
      <div className="flex justify-center items-center w-full">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-10 sm:gap-14 md:gap-20">
          {items.map((item, index) => (
            <Link key={index} href={item.path} passHref>
              <div
                className="cursor-pointer w-56 sm:w-64 md:w-72 h-36 sm:h-40 md:h-44 
                          flex flex-col items-center justify-center 
                          rounded-2xl shadow-lg text-white text-center 
                          font-semibold text-base sm:text-lg md:text-xl 
                          hover:scale-105 hover:rotate-1 
                          hover:shadow-2xl transition-all duration-300
                          bg-gradient-to-br from-emerald-500 to-teal-600"
              >
                <div className="mb-3">{item.icon}</div>
                {item.name}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

