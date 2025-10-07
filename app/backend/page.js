import React from "react";
import Link from "next/link";
import { FaPython } from "react-icons/fa";
import { IoLogoJavascript } from "react-icons/io5";
import { FaJava } from "react-icons/fa";
import { BiLogoGoLang } from "react-icons/bi";

const items = [
  { name: "Java", path: "/java", icon: <FaJava size={32} /> },
  { name: "Python", path: "/python", icon: <FaPython size={32} /> },
  { name: "Go-Golang", path: "/go", icon: <BiLogoGoLang size={40} /> },
  { name: "JavaScript", path: "/javaScript", icon: <IoLogoJavascript size={32} /> },
];

export default function Roadmaps() {
  return (
    <div className="bg-[#0f172a] min-h-screen flex flex-col items-center justify-center">
      {/* Title */}
      <h1 className="text-5xl font-bold text-white mb-20 text-center px-8 py-4 rounded-xl shadow-2xl">
        Backend Frameworks
      </h1>

      {/* Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 w-full max-w-7xl lex justify-center items-center mb-[500px]">
        {items.map((item, index) => (
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
  );
}
