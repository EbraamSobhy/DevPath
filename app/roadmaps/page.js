import React from "react";
import Link from "next/link";
import { Server, Database, Workflow } from "lucide-react";
import { LuCodeXml } from "react-icons/lu";
import { SiAndroid } from "react-icons/si";
import { FaAppStoreIos, FaReact, FaPython } from "react-icons/fa";
import { MdAnalytics } from "react-icons/md";
import { GiArtificialIntelligence } from "react-icons/gi";
import { IoLogoGameControllerB } from "react-icons/io";
import { RiRobot2Fill } from "react-icons/ri";

const items = [
  { name: "Frontend Development", path: "/frontend", icon: <LuCodeXml size={28} /> },
  { name: "Backend Development", path: "/backend", icon: <Server size={28} /> },
  { name: "Mobile Android Development", path: "/android", icon: <SiAndroid size={28} /> },
  { name: "Mobile iOS Development", path: "/ios", icon: <FaAppStoreIos size={28} /> },
  { name: "React Native Development", path: "/react-native", icon: <FaReact size={28} /> },
  { name: "Data Analysis", path: "/data-analysis", icon: <MdAnalytics size={28} /> },
  { name: "Data Engineering", path: "/data-engineering", icon: <Database size={28} /> },
  { name: "Data Science", path: "/data-science", icon: <FaPython size={28} /> },
  { name: "Artificial Intelligence", path: "/ai", icon: <GiArtificialIntelligence size={28} /> },
  { name: "Machine Learning", path: "/ml", icon: <RiRobot2Fill size={28} /> },
  { name: "DevOps Engineering", path: "/devops", icon: <Workflow size={28} /> },
  { name: "Game Development", path: "/game-roadmap", icon: <IoLogoGameControllerB size={28} /> },
];

export default function Roadmaps() {
  return (
    <div className="bg-[#0f172a] min-h-screen flex flex-col items-center justify-start px-4 sm:px-8 py-10">
      {/* Title */}
      <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-10 sm:mb-16 text-center px-4 py-3 rounded-xl shadow-lg bg-gradient-to-r">
        Roadmaps
      </h1>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-1 xl:grid-cols-4 gap-6 sm:gap-8 w-full max-w-7xl">
        {items.map((item, index) => (
          <Link key={index} href={item.path} passHref>
            <div
              className="cursor-pointer w-full sm:w-60 h-36 sm:h-40 flex flex-col items-center justify-center 
                         rounded-2xl shadow-md text-white text-center font-semibold text-lg sm:text-xl
                         hover:scale-105 hover:rotate-1 hover:shadow-2xl transition-all duration-300
                         bg-gradient-to-br from-emerald-500 to-teal-600"
            >
              <div className="mb-3 text-3xl">{item.icon}</div>
              <p className="px-2">{item.name}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
