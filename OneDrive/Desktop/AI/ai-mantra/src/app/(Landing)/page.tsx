"use client";

import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Montserrat } from "next/font/google";
import SpaceBackground from "@/components/ThreeDModel";

const font = Montserrat({
  weight: "600",
  subsets: ["latin"],
});

const Home = () => {
  return (
    <main className="relative p-4 bg-gray-900 min-h-screen overflow-hidden">
      {/* Background Component */}
      <div className="absolute inset-0 overflow-hidden z-0">
        <SpaceBackground />
      </div>

      {/* Logo and Title */}
      <div className="relative flex mb-8 z-10">
        <Link href="/" className="flex items-center">
          <div className="relative h-12 w-12 mr-4">
            <Image
              src="/Ai-mantra-logo.png"
              alt="AI Mantra Logo"
              layout="fill"
              objectFit="contain"
            />
          </div>
          <h1 className={cn("text-3xl font-bold text-white", font.className)}>
            AI Mantra
          </h1>
        </Link>
      </div>

      {/* Main Content */}
      <div className="relative z-10 items-center justify-center md:2xl">
        <div className="container mx-auto overflow-hidden">
          <div className="text-center text-white text-lg mb-8">
            <p>Welcome to AI Mantra, where innovation meets AI-powered solutions.</p>
            <p className="mt-4">Explore our features and discover the future of technology.</p>
          </div>

          <div className="flex justify-center space-x-4 mb-4">
            <Link href="/auth/Login">
              <button className={cn("text-white font-bold py-2 px-4 rounded bg-black hover:bg-gray-800")}>
                Login
              </button>
            </Link>
            <Link href="/auth/Register">
              <button className={cn("text-white font-bold py-2 px-4 rounded bg-black hover:bg-gray-800")}>
                Signup
              </button>
            </Link>
          </div>

          {/* Get Started Link */}
          <div className="flex justify-center">
            <Link href="/dashboard">
              <span className="text-white font-medium hover:underline">Get Started</span>
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Home;
