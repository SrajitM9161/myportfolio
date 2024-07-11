"use client";
import { Menu } from "lucide-react";
import { Button } from './ui/button';
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";
import Sidebar from "./Sidebar";
import { useEffect, useState } from "react";

const Mobilebar = () => {
    const [ismounted,setmounted]=useState(false);
  useEffect(() =>{
     setmounted(true);
  },[])
  if(!ismounted){
    return null;
  }
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="md:hidden">
          <Menu />
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="p-0">
        <Sidebar />
      </SheetContent>
    </Sheet>
  );
};

export default Mobilebar;
