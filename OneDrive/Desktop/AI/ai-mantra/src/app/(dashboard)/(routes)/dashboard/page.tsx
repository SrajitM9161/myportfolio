import Link from 'next/link';
import { FaRegComments, FaImage, FaMusic, FaVideo, FaMicrophone, FaUserAlt, FaCode, FaMagic } from 'react-icons/fa';
import { LayoutDashboard } from "lucide-react";

export default function Dashboard() {
  const tools = [
    {
      label: "Dashboard",
      icon: LayoutDashboard,
      href: "/dashboard",
      color: "text-sky-500",
      bgColour: "bg-sky-500/10"
    },
    {
      label: "Conversation",
      icon: FaRegComments,
      href: "/Conversation",
      color: "text-green-500",
      bgColour: "bg-green-500/10"
    },
    {
      label: "Image Generation",
      icon: FaImage,
      href: "/Image",
      color: "text-blue-500",
      bgColour: "bg-blue-500/10"
    },
    {
      label: "Music Generation",
      icon: FaMusic,
      href: "/music-generation",
      color: "text-purple-500",
      bgColour: "bg-purple-500/10"
    },
    {
      label: "Video Generation",
      icon: FaVideo,
      href: "/video-generation",
      color: "text-red-500",
      bgColour: "bg-red-500/10"
    },
    {
      label: "Audio Generation",
      icon: FaMicrophone,
      href: "/Audio",
      color: "text-teal-500",
      bgColour: "bg-teal-500/10"
    },
    {
      label: "Avatar Generation",
      icon: FaUserAlt,
      href: "/avatar-generation",
      color: "text-orange-500",
      bgColour: "bg-orange-500/10"
    },
    {
      label: "Code Generation",
      icon: FaCode,
      href: "/Code",
      color: "text-indigo-500",
      bgColour: "bg-indigo-500/10"
    },
    {
      label: "Voice Inhancer",
      icon: FaMagic,
      href: "/Voice",
      color: "text-yellow-500",
      bgColour: "bg-yellow-500/10"
    }
  ];

  return (
    <div>
      <div className="mb-8 space-y-4">
        <h2 className="text-2xl md:text-4xl font-bold text-center">Explore the power of AI</h2>
        <p className="text-muted-foreground font-light text-sm md:text-lg text-center">
          Unleash your creativity with mind-blowing AI for writing, art & music - Let's go!
        </p>
      </div>
      <div className="flex flex-wrap justify-center gap-4">
        {tools.map((tool, index) => (
          <Link key={index} href={tool.href}>
            <div className={`w-48 h-48 p-4 rounded-lg shadow-lg ${tool.bgColour} flex flex-col items-center justify-center cursor-pointer`}>
              <tool.icon className={`w-12 h-12 ${tool.color}`} />
              <span className={`mt-4 font-semibold ${tool.color}`}>{tool.label}</span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
