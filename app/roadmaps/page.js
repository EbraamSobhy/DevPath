import React from "react";
import Link from "next/link";

const items = [
  { name: "Frontend Development", path: "/frontend" },
  { name: "Backend Development", path: "/backend" },
  { name: "FullStack Development", path: "/fullstack" },
  { name: "Mobile Android Development", path: "/android" },
  { name: "Mobile iOS Development", path: "/ios" },
  { name: "React Native Development", path: "/react-native" },
  { name: "Mobile Flutter Development", path: "/flutter" },
  { name: "Data Analysis", path: "/data-analysis" },
  { name: "Data Engineering", path: "/data-engineering" },
  { name: "Data Science", path: "/data-science" },
  { name: "Artificial Intelligence", path: "/ai" },
  { name: "Machine Learning", path: "/ml" },
  { name: "DevOps Engineering", path: "/devops" },
];

export default function Roadmaps() {
  return (
    <div className="bg-black min-h-screen flex flex-col items-center justify-center p-10">
      {/* Title */}
      <h1
        className="text-5xl font-bold text-black mb-16 text-center 
                   w-[300px] py-4 rounded-xl bg-white shadow-2xl"              
      >
        Roadmaps
      </h1>

      {/* Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6 place-items-center">
        {items.map((item, index) => (
          <Link key={index} href={item.path} passHref>
            <div
              className="cursor-pointer w-[400px] h-32 flex items-center justify-center 
                         rounded-2xl shadow-lg text-white text-center 
                         font-bold text-2xl hover:scale-105 transition-all duration-300"
              style={{ backgroundColor: "#26a269" }}
            >
              {item.name}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
