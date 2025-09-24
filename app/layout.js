import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "DevPath",
  description: "Roadmap Web App for CS Students and Beginners",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <div className="min-h-screen bg-black relative overflow-hidden">
      {/* Navigation */}
      <nav className="relative z-10 flex justify-between items-center px-8 py-6">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-[#26a269] rounded-lg flex items-center justify-center">
            <img 
              src="/DevPath icon.png" 
              className="relative h-[300px] w-[500px] mx-auto object-contain drop-shadow-2xl group-hover:scale-105 transition-transform duration-500" 
              alt="DevPath" 
            />
          </div>
          <span className="text-white font-bold text-xl">DevPath</span>
        </div>
        <div className="flex items-center space-x-6">
          <a href="#" className="text-gray-300 hover:text-white transition-colors">Features</a>
          <a href="#" className="text-gray-300 hover:text-white transition-colors">Docs</a>
          <a href="#" className="text-gray-300 hover:text-white transition-colors">Pricing</a>
        </div>
      </nav>
          {/* ✅ Page Content */}
          <main className="relative z-0">{children}</main>
        </div>
      </body>
    </html>
  );
}