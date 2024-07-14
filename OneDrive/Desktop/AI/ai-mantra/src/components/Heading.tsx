// src/components/Heading.tsx
import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";

interface HeadingProps {
    title: string;
    description: string;
    icon: LucideIcon;
    iconColour?: string;
    bgColour?: string;
}

export const Heading = ({
    title,
    description,
    icon: Icon,
    iconColour = "text-gray-500",
    bgColour = "bg-gray-100"
}: HeadingProps) => {
    return (
        <div className="px-4 lg:px-8 flex flex-col items-center mb-8 text-center">
            <div className="flex items-center gap-x-3">
                <div className={cn("p-2 rounded-md", bgColour)}>
                    <Icon className={cn("w-6 h-6", iconColour)} />
                </div>
                <h2 className="text-3xl font-bold">
                    {title}
                </h2>
            </div>
            <p>{description}</p>
        </div>
    );
};
