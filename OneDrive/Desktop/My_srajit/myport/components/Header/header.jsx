"use client"
import Link from "next/link";
import { Button } from "../ui/button";
import Nav from "./Nav";
import Mobilenav from "./Mobilenav";
import toast from "react-hot-toast";
import Image from "next/image";
import pic from "../../public/Profile_img.jpg";

const Header = () => {
  const showToast = () => {
    toast.custom((t) => (
      <div
        className={`${
          t.visible ? "animate-enter" : "animate-leave"
        } max-w-md w-full bg-white shadow-lg rounded-lg pointer-events-auto flex ring-1 ring-black ring-opacity-5`}
      >
        <div className="flex-1 w-0 p-4">
          <div className="flex items-start">
            <div className="flex-shrink-0 pt-0.5">
              <Image
                src={pic}
                alt="Srajit Mishra"
                width={40}
                height={40}
                className="h-10 w-10 rounded-full"
              />
            </div>
            <div className="ml-3 flex-1">
              <p className="text-sm font-medium text-accent">
                Srajit Mishra
              </p>
              <p className="mt-1 text-sm text-gray-500">
                Thanks for your Intreset <br />
                My Email:srajitmishra99@gmail.com
                My Phone Number :8604253300
              </p>
            </div>
          </div>
        </div>
        <div className="flex border-l border-gray-200">
          <button
            onClick={() => toast.dismiss(t.id)}
            className="w-full border border-transparent rounded-none rounded-r-lg p-4 flex items-center justify-center text-sm font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            Close
          </button>
        </div>
      </div>
    ));
  };

  return (
    <header className="py-8 xl:py-12 text-white">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/">
          <h1>
            Srajit <span className="text-accent">Mishra</span>
          </h1>
        </Link>
        <div className="hidden xl:flex items-center gap-8">
          <Nav />
          <Button onClick={showToast}>Hire me</Button>
        </div>
        <div className="xl:hidden">
          <Mobilenav />
        </div>
      </div>
    </header>
  );
};

export default Header;
