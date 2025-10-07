import React from "react";
import Link from "next/link";
import { SiUnrealengine } from "react-icons/si";
import { FaJava } from "react-icons/fa";
import { FaUnity } from "react-icons/fa6";

const items = [
  { name: "Unreal (C++)", path: "/unreal", icon: <SiUnrealengine size={32} /> },
  { name: "Unity (C#)", path: "/unity", icon: <FaUnity size={32} /> },
];

export default function Roadmaps() {
  return (
    <div className="bg-[#0f172a] min-h-screen flex flex-col items-center justify-center">
      {/* Title */}
      <h1 className="text-5xl font-bold text-white mb-20 text-center px-8 py-4 rounded-xl shadow-2xl">
        Backend Frameworks
      </h1>

      {/* Cards */}
      <div className="flex justify-center items-center w-full mb-[500px]">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-20">
          {items.slice(0, 2).map((item, index) => (
            <Link key={index} href={item.path} passHref>
              <div
                className="cursor-pointer w-64 h-40 flex flex-col items-center justify-center 
                          rounded-2xl shadow-lg text-white text-center 
                          font-semibold text-xl hover:scale-105 hover:rotate-1 
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
