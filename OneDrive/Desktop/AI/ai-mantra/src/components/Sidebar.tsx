"use client"

import Link from "next/link";
import Image from "next/image";
import { Montserrat } from "next/font/google";
import { cn } from "@/lib/utils";
import { LayoutDashboard } from "lucide-react";
import { FaRegComments, FaImage, FaMusic, FaVideo, FaMicrophone, FaUserAlt, FaCode, FaMagic } from "react-icons/fa";
import { usePathname } from "next/navigation";


const montserrat = Montserrat({
  weight: "600",
  subsets: ["latin"]
});

const routes = [
  {
    label: "Dashboard",
    icon: LayoutDashboard,
    href: "/dashboard",
    color: "text-sky-500"
  },
  {
    label: "Conversation",
    icon: FaRegComments,
    href: "/Conversation",
    color: "text-green-500"
  },
  {
    label: "Image Generation",
    icon: FaImage,
    href: "/Image",
    color: "text-blue-500"
  },
  {
    label: "Music Generation",
    icon: FaMusic,
    href: "/Music",
    color: "text-purple-500"
  },
  {
    label: "Video Generation",
    icon: FaVideo,
    href: "/Video",
    color: "text-red-500"
  },
  {
    label: "Audio Generation",
    icon: FaMicrophone,
    href: "/Audio",
    color: "text-teal-500"
  },
  {
    label: "Speech To Text ",
    icon: FaUserAlt,
    href: "/avatar-generation",
    color: "text-orange-500"
  },
  {
    label: "Code Generation",
    icon: FaCode,
    href: "/Code",
    color: "text-indigo-500"
  },
 
];

const Sidebar = () => {
const Pathname= usePathname();
  return (
    <div className="space-y-4 flex flex-col h-full bg-[#111827] text-black">
      <div className="px-3 py-3 flex-1">
        <Link href="/dashboard" className="flex items-center pl-3 mb-14">
          <div className="relative w-8 h-8">
            <Image
              fill
              alt="Logo"
              src="/Ai-mantra-logo.png"
            />
          </div>
          <div className={cn("text-2xl font-bold", montserrat.className)}>
            AI-MANTRA
          </div>
        </Link>
        <div className="space-y-1">
          {routes.map((route) => (
            <Link key={route.href} href={route.href} className={cn("text-sm group flex p-3 w-full justify-start font-medium cursor-pointer hover:text-white hover:bg-white/10 rounded-lg transition",Pathname===route.href ? "text-white bg-[#f56c42]/100":"text-zinc-400")} >
              <div className=" flex items-center flex-1">
              <route.icon className={cn(" h5 w-5 mr-3 ",route.color)}/>
              {route.label}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
