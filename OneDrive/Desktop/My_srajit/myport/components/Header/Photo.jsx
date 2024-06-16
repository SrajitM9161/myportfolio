"use client";
import { motion, useMotionValue, useTransform, useAnimationFrame } from "framer-motion";
import Image from 'next/image';
import pic1 from '../../public/Assests/Resume/pic2new.png'; // Correct import for Next.js images
import { useState, useEffect } from 'react';

const Photo = () => {
  const [windowWidth, setWindowWidth] = useState(0);
  const [windowHeight, setWindowHeight] = useState(0);

  useEffect(() => {
    setWindowWidth(window.innerWidth);
    setWindowHeight(window.innerHeight);

    const handleResize = () => {
      setWindowWidth(window.innerWidth);
      setWindowHeight(window.innerHeight);
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const scale = useMotionValue(1);

  useEffect(() => {
    const handleMouseMove = (event) => {
      x.set(event.clientX - windowWidth / 2);
      y.set(event.clientY - windowHeight / 2);
      scale.set(1.05); // Scale up slightly when the mouse moves
    };

    const handleMouseLeave = () => {
      scale.set(1); // Reset scale when the mouse leaves
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseleave", handleMouseLeave);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [x, y, scale, windowWidth, windowHeight]);

  const rotateX = useTransform(y, [-windowHeight / 2, windowHeight / 2], [-30, 30]);
  const rotateY = useTransform(x, [-windowWidth / 2, windowWidth / 2], [-30, 30]);

  const circleX = useMotionValue(0);
  const circleY = useMotionValue(0);

  useAnimationFrame((t) => {
    const angle = t / 300; // Adjust this value to control the speed of the circular motion
    circleX.set(Math.cos(angle) * 10.5 + 50); // Control the radius and position to the right
    circleY.set(Math.sin(angle) * 10 - 460); // Control the radius and offset for y-axis
  });

  return (
    <div className="w-full h-full relative flex justify-center items-center">
      <motion.div style={{ rotateX, rotateY, scale }}>
        <motion.div
          className="w-[298px] h-[298px] xl:w-[498px] xl:h-[498px] mix-blend-lighten relative"
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          transition={{ duration: 2 }}
        >
          <Image 
            src={pic1} 
            alt="A boy typing on Laptop on table cartons" 
            layout="responsive" 
            width={498} 
            height={498} 
            objectFit="cover"
          />
        </motion.div>
        <motion.div
          className="absolute xl:w-[450px] xl:h-[450px] border-4 border-accent rounded-full"
          style={{ x: circleX, y: circleY }}
        />
      </motion.div>
    </div>
  );
};

export default Photo;
