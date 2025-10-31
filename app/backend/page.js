import React from "react";
import Link from "next/link";
import { FaPython } from "react-icons/fa";
import { IoLogoJavascript } from "react-icons/io5";
import { FaJava } from "react-icons/fa";
import { BiLogoGoLang } from "react-icons/bi";

const items = [
  { name: "Java", path: "/java", icon: <FaJava size={28} /> },
  { name: "Python", path: "/python", icon: <FaPython size={28} /> },
  { name: "Go-Golang", path: "/go", icon: <BiLogoGoLang size={32} /> },
  { name: "JavaScript", path: "/javascript", icon: <IoLogoJavascript size={28} /> },
];

export default function Roadmaps() {
  return (
    <div className="bg-[#0f172a] min-h-screen flex flex-col items-center justify-start px-4 sm:px-6 md:px-8 pt-6 pb-10">
      {/* Title */}
      <h1 className="text-4xl sm:text-5xl font-bold text-white mb-1 text-center px-8 py-4 rounded-xl shadow-2xl mt-10">
        Backend Frameworks
      </h1>

            {/* Cards */}
            <div className="flex justify-center w-full">
                <div
                className="grid 
                grid-cols-1 
                sm:grid-cols-3 
                md:grid-cols-4 
                gap-5 
                max-w-5xl 
                w-full 
                py-10 
                justify-items-center"
              >
        {items.map((item, index) => (
          <Link key={index} href={item.path} passHref>
            <div
            className="cursor-pointer 
                     w-[370px] h-40 
                     sm:w-36 sm:h-36 
                     md:w-40 md:h-40 
                     lg:w-44 lg:h-44
                     flex flex-col items-center justify-center 
                     rounded-2xl shadow-lg
                     text-white text-center 
                     font-semibold text-base sm:text-lg 
                     hover:scale-105 hover:rotate-1 
                     hover:shadow-2xl 
                     transition-all duration-300 
                     bg-gradient-to-br from-emerald-500 to-teal-600"
            >
            <div className="mb-2">{item.icon}</div>
            {item.name}
            </div>
        </Link>
        ))}
      </div>
    </div>
    </div>
  );
}

