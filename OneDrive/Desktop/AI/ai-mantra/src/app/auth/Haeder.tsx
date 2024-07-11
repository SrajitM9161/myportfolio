import Image from 'next/image';
import { Dancing_Script } from "next/font/google";
import { cn } from "@/lib/utils";

const cursiveFont = Dancing_Script({
    subsets: ["latin"],
    weight: ["600"]
});

interface HeaderProps {
    label: string;
}

export const Header = ({ label }: HeaderProps) => {
    return (
        <div className="w-full flex flex-col gap-y-4 items-center justify-center">
            <div className="flex items-center gap-x-2">
                <Image src="/Ai-mantra-logo.png" alt="AI-MANTRA Logo" width={50} height={50} />
                <h1 className={cn("text-3xl font-semibold", cursiveFont.className)}>AI-MANTRA</h1>
            </div>
            <p>{label}</p>
        </div>
    );
};
