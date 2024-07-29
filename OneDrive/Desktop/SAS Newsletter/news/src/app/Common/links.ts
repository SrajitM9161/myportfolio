import { atom } from "jotai";
export interface NavLink {
    title: string;
    href: string;
  }
  
  export const navLinks: NavLink[] = [
    { title: "Home", href: "/" },
    { title: "About", href: "/about" },
    { title: "Docs", href: "/Docs" },
    { title: "Blog", href: "/Blog" },
  ];

  export const sideBarActiveItem = atom<string>("/dashboard");

  
  
  