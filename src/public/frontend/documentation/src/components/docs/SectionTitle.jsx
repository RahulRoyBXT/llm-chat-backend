import React, { useRef, useEffect } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";

const SectionTitle = ({ title, anchor }) => {
  const titleRef = useRef(null);
  
  // GSAP animation for title highlight on scroll
  useEffect(() => {
    if (!titleRef.current) return;
    
    gsap.fromTo(
      titleRef.current,
      { backgroundSize: "0% 6px" },
      { 
        backgroundSize: "100% 6px", 
        duration: 0.7, 
        ease: "power2.out",
        scrollTrigger: {
          trigger: titleRef.current,
          start: "top bottom-=100",
          toggleActions: "play none none reverse"
        } 
      }
    );
  }, []);
  
  return (
    <motion.div 
      className="flex items-center"
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.5 }}
    >
      <h2 
        ref={titleRef}
        className="text-2xl font-bold text-gray-900 dark:text-white bg-gradient-to-r from-blue-500 to-blue-700 bg-no-repeat bg-bottom"
        style={{ 
          backgroundSize: "0% 6px",
          backgroundPosition: "0 88%",
          display: "inline" 
        }}
      >
        {title}
      </h2>
      <motion.a 
        href={`#${anchor}`} 
        className="ml-2 text-gray-400 dark:text-gray-600 hover:text-gray-700 dark:hover:text-gray-400"
        whileHover={{ scale: 1.2, rotate: 15 }}
        whileTap={{ scale: 0.9 }}
      >
        <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M12.586 4.586a2 2 0 112.828 2.828l-3 3a2 2 0 01-2.828 0 1 1 0 00-1.414 1.414 4 4 0 005.656 0l3-3a4 4 0 00-5.656-5.656l-1.5 1.5a1 1 0 101.414 1.414l1.5-1.5zm-5 5a2 2 0 012.828 0 1 1 0 101.414-1.414 4 4 0 00-5.656 0l-3 3a4 4 0 105.656 5.656l1.5-1.5a1 1 0 10-1.414-1.414l-1.5 1.5a2 2 0 11-2.828-2.828l3-3z" clipRule="evenodd" />
        </svg>
      </motion.a>
    </motion.div>
  );
};

export default SectionTitle;
