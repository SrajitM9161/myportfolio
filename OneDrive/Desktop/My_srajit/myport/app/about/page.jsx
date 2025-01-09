"use client";

import { FaJava, FaCss3, FaReact, FaNode, FaEthereum, FaHtml5 } from 'react-icons/fa';
import { SiTailwindcss, SiNextdotjs, SiSolidity, SiMongodb, SiTypescript, SiMui, SiJavascript } from 'react-icons/si';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { motion } from 'framer-motion';

const abouts = {
  title: "About me",
  description: "",
  info: [
    { fieldName: "Name", fieldValue: "Srajit Mishra" },
    { fieldName: "Phone number", fieldValue: "8604253300" },
    { fieldName: "Email", fieldValue: "srajitmishra99@gmail.com" },
    { fieldName: "Country", fieldValue: "India" },
    { fieldName: "LinkedIn ID", fieldValue: "https://www.linkedin.com/in/srajit-mishra-a40497214/" },
    { fieldName: "Github", fieldValue: "https://github.com/SrajitM9161" }
  ]
};

const Education = {
  icon: "",
  title: "My Education",
  info: [
    { institution: "Shri JNS Inter School Unnao", degree: "10th", year: "2018-19" },
    { institution: "New Era Public School Unnao", degree: "12th", year: "2020-2021" },
    { institution: "Chandigarh University (CU), Punjab", degree: "BE-CSE", year: "2021-2025" }
  ]
};

const Skills = {
  myskills: "",
  description: "",
  skillList: [
    { icon: <FaHtml5 />, name: "HTML" },
    { icon: <FaCss3 />, name: "CSS" },
    { icon: <SiJavascript />, name: "JavaScript" },
    { icon: <FaNode />, name: "Node.js" },
    { icon: <SiTypescript />, name: "TypeScript" },
    { icon: <FaReact />, name: "React" },
    { icon: <SiNextdotjs />, name: "Next.js" },
    { icon: <SiMongodb />, name: "MongoDB" },
    { icon: <FaJava />, name: "Java" },
    { icon: <SiTailwindcss />, name: "Tailwind CSS" },
    { icon: <FaEthereum />, name: "Ethereum" },
    { icon: <SiSolidity />, name: "Solidity" },
    { icon: <SiMui />, name: "Material UI" }
  ]
};

const Achievements = {
  icon: "",
  description: "",
  achiv: [
    { name: " ANGEL HACKS", position: "2nd", org: "HACKATHON", desc: "(HACKATHON BY DELHI TECHNOLOGICAL UNIVERSITY)" },
    { name: "TECHTATVA", position: "3rd", org: "HACKATHON", desc: "(HACKATHON BY MIT MANIPAL)" },
    { name: "Patent", position: "Pre-Term Birth Risk Management System", org: "Field", desc: "202311024295" },
    { name: "BEST PERFORMANCE AWARD", position: "GOLD MEDALIST", org: "Chandigarh University", desc: "CU" }
  ]
};

const About = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1, transition: { delay: 2.4, duration: 0.4, ease: "easeIn" } }}
      className="min-h-[80vh] flex items-center justify-center py-12 xl:py-8"
    >
      <div className="container mx-auto">
        <Tabs defaultValue="Skills" className="flex flex-col xl:flex-row gap-[60px]">
          <TabsList className="flex flex-col w-full max-w-[300px] mx-auto xl:mx-0">
            <TabsTrigger value="abouts">About Me</TabsTrigger>
            <TabsTrigger value="Skills">Skills</TabsTrigger>
            <TabsTrigger value="Achievements">Achievements</TabsTrigger>
            <TabsTrigger value="Education">Education</TabsTrigger>
          </TabsList>
          <div className="min-h-[70vh] w-full">
            <TabsContent value="abouts" className="p-4">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="border p-6 rounded-lg"
              >
                <h2 className="text-2xl font-bold">{abouts.title}</h2>
                <ul>
                  {abouts.info.map((item, index) => (
                    <li key={index} className="py-1 break-words">
                      <strong>{item.fieldName}:</strong>{' '}
                      {item.fieldValue.startsWith('http') ? (
                        <a 
                          href={item.fieldValue}
                          className="break-all"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {item.fieldValue}
                        </a>
                      ) : (
                        item.fieldValue
                      )}
                    </li>
                  ))}
                </ul>
              </motion.div>
            </TabsContent>
            <TabsContent value="Skills" className="p-4">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="border p-6 rounded-lg"
              >
                <h2 className="text-2xl font-bold">Skills</h2>
                <ul className="grid grid-cols-2 gap-4">
                  {Skills.skillList.map((skill, index) => (
                    <li key={index} className="flex items-center gap-2">
                      {skill.icon} <span>{skill.name}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            </TabsContent>
            <TabsContent value="Achievements" className="p-4">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="border p-6 rounded-lg"
              >
                <h2 className="text-2xl font-bold">Achievements</h2>
                <ul>
                  {Achievements.achiv.map((achievement, index) => (
                    <li key={index} className="py-1">
                      <strong>{achievement.name}:</strong> {achievement.position} ({achievement.desc})
                    </li>
                  ))}
                </ul>
              </motion.div>
            </TabsContent>
            <TabsContent value="Education" className="p-4">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="border p-6 rounded-lg"
              >
                <h2 className="text-2xl font-bold">{Education.title}</h2>
                <ul>
                  {Education.info.map((edu, index) => (
                    <li key={index} className="py-1">
                      <strong>{edu.institution}</strong> - {edu.degree} ({edu.year})
                    </li>
                  ))}
                </ul>
              </motion.div>
            </TabsContent>
          </div>
        </Tabs>
      </div>
    </motion.div>
  );
};

export default About;