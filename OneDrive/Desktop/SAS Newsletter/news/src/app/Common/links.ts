import { atom } from "jotai";
export interface NavLink {
    title: string;
    href: string;
  }
  
  export const navLinks: NavLink[] = [
    { title: "Home", href: "/" },
    { title: "About", href: "/about" },
    { title: "Services", href: "/services" },
    { title: "Contact", href: "/contact" },
  ];

  export const sideBarActiveItem = atom<string>("/dashboard");

  type DashboardSideBarTypes = {
    title: string;
    url: string;
    icon: any;
  };
  
  
  