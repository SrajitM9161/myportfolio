"use client"
import { motion } from 'framer-motion';

const Resume = () => {
  return (
    <div className="flex justify-center items-center h-screen">
      <motion.iframe
        src="https://drive.google.com/file/d/1XtX9GU-Y5RF83W26Z76oT8n0o7up8sy8/view?usp=sharing"
        className="border-4 border-blue-500 rounded-lg"
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        width="800"
        height="600"
        allowFullScreen
      />
    </div>
  )
}

export default Resume;
