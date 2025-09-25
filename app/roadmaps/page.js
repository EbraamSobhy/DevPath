import React from "react";
import Link from "next/link";
import { Code, Server, Smartphone, Database, Cpu, Brain, Wrench, Workflow } from "lucide-react"; 
import { LuCodeXml } from "react-icons/lu";
import { SiAndroid } from "react-icons/si";
import { FaAppStoreIos, FaReact } from "react-icons/fa";
import { FaFlutter } from "react-icons/fa6";
import { MdAnalytics } from "react-icons/md";
import { GiArtificialIntelligence } from "react-icons/gi";

const items = [
  { name: "Frontend Development", path: "/frontend", icon: <LuCodeXml size={32} /> },
  { name: "Backend Development", path: "/backend", icon: <Server size={32} /> },
  { name: "FullStack Development", path: "/fullstack", icon: <Code size={32} /> },
  { name: "Mobile Android Development", path: "/android", icon: <SiAndroid size={32} /> },
  { name: "Mobile iOS Development", path: "/ios", icon: <FaAppStoreIos size={32} /> },
  { name: "React Native Mobile Development", path: "/react-native", icon: <FaReact size={32} /> },
  { name: "Flutter Mobile Development", path: "/flutter", icon: <FaFlutter size={32} /> },
  { name: "Data Analysis", path: "/data-analysis", icon: <MdAnalytics size={32} /> },
  { name: "Data Engineering", path: "/data-engineering", icon: <Database size={32} /> },
  { name: "Data Science", path: "/data-science", icon: <Brain size={32} /> },
  { name: "Artificial Intelligence", path: "/ai", icon: <GiArtificialIntelligence size={32} /> },
  { name: "Machine Learning", path: "/ml", icon: <Cpu size={32} /> },
  { name: "DevOps Engineering", path: "/devops", icon: <Workflow size={32} /> },
];

export default function Roadmaps() {
  return (
    <div className="bg-black min-h-screen flex flex-col items-center justify-center p-10">
      {/* Title */}
      <h1 className="text-5xl font-bold text-black mb-16 text-center w-[300px] py-4 rounded-xl bg-white shadow-2xl">
        Roadmaps
      </h1>

      {/* Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 place-items-center w-full max-w-7xl">
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
