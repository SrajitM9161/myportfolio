"use client";
import { BsArrowDownRight } from "react-icons/bs";
import Link from "next/link";
import { motion } from "framer-motion";

const experience = () => {
  const services = [
    {
      num: '1',
      title: "Software Engineer",
      company: "Eshopstride",
      description: "I developed a new Dashboard System for the Eshopstride website, automating 90% of data management and analytics tasks. Collaborating closely with the main developer team, I optimized website performance, improving reliability and the end-user experience by 80%. My contributions significantly reduced site loading times and enhanced overall site stability. Additionally, I optimized data retrieval processes, which led to a 30% increase in average API response speed and improved overall system efficiency. This project strengthened my understanding of client needs and refined my technical skills in system development through hands-on work.",
      href: ""
    },
    {
      num: '2',
      title: " Newton School",
      company: " Data Anotator Team Lead ",
      description: " As a Data Annotator and Junior Lead, I managed a team of over 50 members, overseeing the assignment of tasks and ensuring the efficient flow of data to the company. My responsibilities included coordinating team activities, assigning work to all members, and providing comprehensive status reports on our progress. This role involved both leadership and operational duties, ensuring that our team met deadlines and maintained high-quality data standards. ",
      href: ""
    },
   
  ];
 

  return (
    <section className="min-h-[80vh] flex flex-col justify-center py-12 xl:py-0">
      <div className="container mx-auto">
        <motion.div 
          initial={{ opacity: 0 }} 
          animate={{ opacity: 1, transition: { delay: 2.4, duration: 0.4, ease: "easeIn" } }} 
          className="grid grid-cols-1 md:grid-cols-2 gap-8"
        >
          {services.map((service, index) => (
            <div key={index} className="mb-8 group">
              <div className="w-full flex justify-between items-center">
                <span className="text-5xl font-extrabold text-outline text-transparent group-hover:text-outline-hover transition-all duration-500">{service.num}</span>
                <Link href={service.href} className=" w-[70px] h-[70px] rounded-full bg-white  group-hover:bg-accent  transition-all duration-500 flex justify-center items-center hue-rotate-45">
                  <BsArrowDownRight  className=" text-primary text-3xl"/>
                </Link>
              </div>
              <h2 className=" text-[42px] font-bold leading-none text-white group-hover:text-accent transition-all duration-500">{service.company}</h2>
              <h3 className="text-lg">{service.title}</h3>
              <p className=" text-white/60">{service. description}</p>
              <div className="border-b border-white/20 w-full mt-4"></div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default experience;
