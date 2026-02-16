import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Link from "next/link";

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
  manifest: "/manifest.webmanifest",
  themeColor: "#000075",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "DevPath",
  },
  formatDetection: {
    telephone: false,
  },
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/DevPathLogo.png", sizes: "1024x1024", type: "image/png" },
    ],
    apple: [{ url: "/DevPathLogo.png", sizes: "1024x1024", type: "image/png" }],
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <div className="min-h-screen bg-[#000075] relative overflow-hidden">
      {/* Navigation */}
        <nav className="relative z-10 flex flex-wrap justify-between items-center px-6 py-4 md:px-8 md:py-6">
          {/* Logo + Text */}
            <div className="flex items-center space-x-2">
        <Link href="/" className="flex items-center space-x-2">
          <img
            src="/DevPath icon.png"
            alt="DevPath"
            className="h-10 w-10 sm:h-12 sm:w-12 object-contain drop-shadow-2xl transition-transform duration-500 hover:scale-105"
          />
          <span className="text-white font-bold text-xl sm:text-2xl">DevPath</span>
        </Link>
      </div>

      {/* Play Store Button */}
      <div className="flex items-center mt-4 md:mt-0">
        <a
          href="https://play.google.com/store"
          target="_blank"
          rel="noopener noreferrer"
          className="border border-white rounded-lg p-1 sm:p-2 transition-all duration-300 bg-black"
        >
          <img
            src="/google play.png"
            alt="Google Play"
            className="h-10 w-32 sm:h-[60px] sm:w-[200px] object-contain drop-shadow-2xl"
          />
        </a>
      </div>
    </nav>

          {/* ✅ Page Content */}
          <main className="relative z-0">{children}</main>
      <footer className="relative z-10 border-t border-white bg-black/20 backdrop-blur-sm ">
        <div className="max-w-6xl mx-auto px-8 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-2 mb-4 md:mb-0 justify-center text-center flex-1 text-xl">
              <div className="w-8 h-8 rounded-lg flex items-center justify-center">
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
      </body>
    </html>
  );
}
