"use client"
import { motion } from 'framer-motion';
const resume = () => {
  return (
        <div className="flex justify-center items-center h-screen">
      <motion.iframe
        src="https://drive.google.com/file/d/1VdxbOdTOHhZde3y8xWZsXpnRDOyvxGeG/preview"
        className="border-4 border-blue-500 rounded-lg"
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        width="800"
        height="600"
      />
    
    </div>
  )
}

export default resume
