"use client"
import { useState, useEffect } from "react";
import { FiDownload } from "react-icons/fi";
import { Button } from "@/components/ui/button";
import Socials from "@/components/Header/Socials";
import Photo from "@/components/Header/Photo";
import Link from "next/link";
import { motion } from "framer-motion";

const rotatingTexts = [
  "Software Developer",
  "Frontend Development",
  "Full Stack",
  "Next.js",
  "Blockchain"
];

export default function Home() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % rotatingTexts.length);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="h-full">
      <div className="container mx-auto">
        <div className="flex flex-col xl:flex-row items-center justify-between xl:pt-0 xl:pb-24">
          <div className="text-center xl:text-left">
            <motion.span
              key={currentIndex}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.5 }}
              className="text-2xl md:text-4xl font-bold"
            >
              {rotatingTexts[currentIndex]}
            </motion.span>
            <h1 className="h1 mt-4">
              Hello it&apos;s <br />
              <motion.span
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
              >
                Srajit 
              </motion.span>
              <motion.span
                className="text-accent"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                Mishra
              </motion.span>
            </h1>
            <p className="mt-4">
              With expertise in full-stack development and blockchain technologies,
              <br />I excel at crafting high-performing websites. Let&apos;s create an
              <br />outstanding digital experience together.
            </p>
            <div className="flex flex-col xl:flex-row items-center gap-8 mt-8">
              <Link href="/resume">
                <Button
                  variant="outline"
                  size="lg"
                  className="uppercase flex items-center gap-2"
                >
                  <span>Resume</span>
                  <FiDownload className="text-xl" />
                </Button>
              </Link>
              <div className="flex flex-col xl:flex-row items-center gap-8">
                <Socials
                  containerStyle="flex gap-6"
                  iconStyles="w-9 h-9 border border-accent rounded-full flex justify-center items-center text-accent text-base hover:bg-accent hover:text-primary hover:transition-all duration-500"
                />
              </div>
            </div>
          </div>
          <div>
            <Photo />
          </div>
        </div>
      </div>
    </section>
  );
}
