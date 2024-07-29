"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import {  BsGithub, BsLink, BsArrowLeft, BsArrowRight } from "react-icons/bs";
import Link from "next/link";
import Image from "next/image";
import img1 from "@/public/img/Agri_img_1.png";
import img2 from "@/public/img/project2.png";
import img3 from "@/public/img/project3.png";
import img4 from "@/public/img/project4.png";
import img5 from "@/public/img/pro5.png";
import img6 from "@/public/img/project6.png";
import img7 from "@/public/img/img7.png"
const projectsData = [
  {
    num: "01",
    title: "News Wave",
    TecStack: ["Next.js", "MongoDb", "Shadcn", "Tailwind","Prisma","Unlayer","AWS","Stripe"],
    Descri: "News Wave is a dynamic website that enables businesses to create and manage custom newsletter templates tailored to their branding needs. It offers a comprehensive platform for designing, sending, and tracking the performance of newsletters.",
    Gitlink: "https://github.com/SrajitM9161/Newsletter-SAAS",
    LiveLink: "https://newsletter-saas-sepia.vercel.app/",
    ImageSrc: img7 ,
  },
  
  {
    num: "02",
    title: "Agrismart",
    TecStack: ["FullStack", "MERN", "AI/ML", "Flask","FireBase","Data.gov Api"],
    Descri: "We've developed a platform that streamlines crop transactions and market connections for farmers, integrating features like remote delivery and real-time price updates with 100% accuracy, including MSP data. Our Crop Recommendation system achieves a remarkable 98% accuracy in advising optimal crops for fields, leveraging advanced algorithms. Currently, our platform serves a community of 20-30 users, with 10-15 regular users, and we are focused on expanding our reach and enhancing our capabilities to better support the agricultural industry.",
    Gitlink: "https://github.com/SrajitM9161/Asmart",
    LiveLink: "https://asmart-n4tm-srajitm9161s-projects.vercel.app/",
    ImageSrc: img1,
  },
  {
    num: "03",
    title: "AgriSmartAdmin",
    TecStack: ["FullStack", "MERN", "AI/ML", "Flask","FireBase","Data.gov Api","Email.js"],
    Descri: "From an admin perspective, managing crop transactions involves overseeing various aspects of user interactions on the platform. This includes receiving requests from users for buying and selling crops, ensuring smooth transactions, and resolving any issues that may arise during the process. Admins monitor the platform to facilitate efficient communication between buyers and sellers, verify listings for accuracy and compliance with platform guidelines, and manage payment processing and delivery logistics for remote transactions. Additionally, admins analyze transaction data to track trends, optimize user experience, and make informed decisions to improve platform performance and user satisfaction.",
    Gitlink: "https://github.com/SrajitM9161/Agrismart_Admin",
    LiveLink: "https://agri-smart-admin.vercel.app/",
    ImageSrc: img2,
  },
  
  {
    num: "04",
    title: "D Drive",
    TecStack: ["Blockchain,", "Solidity", "React.js","Javascript","Etherum","Web3.js","IPFS"],
    Descri: "In February 2024, we successfully launched a live project with a published research paper. Our platform utilizes IPFS and blockchain for secure, immutable storage. We seamlessly integrated with Pinata for efficient handling of media content on IPFS, ensuring reliable access and data integrity for our users.",
    Gitlink: "https://github.com/SrajitM9161/DcentralizedDrive",
    LiveLink: "https://64f1729a45401d26edaede5d--curious-cucurucho-9ed7a8.netlify.app/",
    ImageSrc: img3,
  },

  {
    num: "05",
    title: "Srajit Portfolio",
    TecStack: ["Next.js","Tailwind.css","Framer","Shadcn/ui"],
    Descri: "My Portfoilio ",
    Gitlink: "https://github.com/SrajitM9161/myportfolio",
    LiveLink: "https://myportfolio-flax-two.vercel.app/",
    ImageSrc: img6,
  },
  {
    num: "06",
    title: "RodeMap Finder",
    TecStack: ["React.js","Auth0"],
    Descri: "A roadmap finder website enables users to create and manage project, product, or strategy roadmaps with customizable templates and collaborative tools, facilitating clear goal-setting and progress tracking.",
    Gitlink: "https://github.com/SrajitM9161/project3",
    LiveLink: "https://64f70c31db727200941b3455--incredible-rugelach-f28bfa.netlify.app/",
    ImageSrc: img4,
  },
  {
    num: "07",
    title: "Ecommerce website",
    TecStack: [],
    Descri: "Ecommerce Clone",
    Gitlink: "https://github.com/SrajitM9161/ecommerce_website",
    LiveLink: "https://github.com/SrajitM9161/ecommerce_website",
    ImageSrc: img5,
  },
 
];

const Projects = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const handlePrev = () => {
    setActiveIndex((prevIndex) => (prevIndex === 0 ? projectsData.length - 1 : prevIndex - 1));
  };

  const handleNext = () => {
    setActiveIndex((prevIndex) => (prevIndex === projectsData.length - 1 ? 0 : prevIndex + 1));
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="w-full max-w-2xl px-4 pt-0"> {/* Reduced top padding */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, transition: { delay: 0.4, duration: 0.8, ease: "easeInOut" } }}
          className="relative text-center"
        >
          <button onClick={handlePrev} className="absolute left-0 top-1/2 transform -translate-y-1/2 p-2 bg-white rounded-full shadow-md hover:bg-accent transition">
            <BsArrowLeft className="text-primary text-3xl hover:text-4xl transition-all duration-300" /> {/* Increased icon size and added hover size change */}
          </button>
          <button onClick={handleNext} className="absolute right-0 top-1/2 transform -translate-y-1/2 p-2 bg-white rounded-full shadow-md hover:bg-accent transition">
            <BsArrowRight className="text-primary text-3xl hover:text-4xl transition-all duration-300" /> {/* Increased icon size and added hover size change */}
          </button>
          <div className="w-full flex justify-between items-center mb-4">
            <span className="text-5xl font-extrabold text-outline text-transparent group-hover:text-outline-hover transition-all duration-500">
              {projectsData[activeIndex].num}
            </span>
          </div>
          <Image src={projectsData[activeIndex].ImageSrc} alt={projectsData[activeIndex].title} width={500} height={300} className="w-full h-auto mb-4 rounded-md" />
          <h2 className="text-[32px] font-bold leading-none group-hover:text-accent transition-all duration-500">
            {projectsData[activeIndex].title}
          </h2>
          <h3 className="text-lg text-gray-700 pt-8">{projectsData[activeIndex].TecStack.join(", ")}</h3>
          <p className="text-gray-600">{projectsData[activeIndex].Descri}</p>
          <div className="flex gap-4 mt-4 justify-center">
            <Link href={projectsData[activeIndex].Gitlink} className="text-gray-600 hover:text-accent">
              <BsGithub className="text-2xl" />
            </Link>
            <Link href={projectsData[activeIndex].LiveLink} className="text-gray-600 hover:text-accent">
              <BsLink className="text-2xl" />
            </Link>
          </div>
          <div className="border-b border-gray-300 w-full mt-4"></div>
        </motion.div>
      </div>
    </div>
  );
};

export default Projects;
