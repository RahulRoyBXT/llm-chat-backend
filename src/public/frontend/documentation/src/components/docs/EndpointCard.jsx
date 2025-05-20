import React, { useRef, useEffect } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";


if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const EndpointCard = ({ 
  method, 
  endpoint, 
  title, 
  description, 
  statusCode, 
  requestBody,
  responseBody
}) => {


  const methodColor = method === 'GET' 
    ? 'text-green-600 dark:text-green-400' 
    : 'text-blue-600 dark:text-blue-400';
  
  const cardRef = useRef(null);
  
  // GSAP animation with ScrollTrigger
  useEffect(() => {
    if (!cardRef.current) return;
    
    const anim = gsap.fromTo(
      cardRef.current,
      { 
        y: 50, 
        opacity: 0 
      },
      { 
        y: 0, 
        opacity: 1, 
        duration: 0.6,
        ease: "power2.out",
        scrollTrigger: {
          trigger: cardRef.current,
          start: "top bottom-=100",
          toggleActions: "play none none none"
        }
      }
    );
    
    return () => {
      if (anim.scrollTrigger) {
        anim.scrollTrigger.kill();
      }
      anim.kill();
    };
  }, []);
  
  return (
    <motion.div 
      ref={cardRef}
      className="mt-6 bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden border border-gray-200 dark:border-gray-700 transition-colors duration-200"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.5 }}
    >
      <div className="border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800">
          <div className="flex items-center">
            <motion.span 
              className={`font-mono text-sm font-bold ${methodColor}`}
              whileHover={{ scale: 1.05 }}
            >
              {method}
            </motion.span>
            <motion.code 
              className="ml-3 text-sm font-mono bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded text-gray-800 dark:text-gray-300"
              whileHover={{ scale: 1.02 }}
            >
              {endpoint}
            </motion.code>
          </div>
          <motion.span 
            className="px-2 py-1 text-xs rounded-full bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-300"
            whileHover={{ scale: 1.1 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
          >
            {statusCode}
          </motion.span>
        </div>
      </div>
      
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{title}</h3>
        <p className="mt-1 text-gray-600 dark:text-gray-400">{description}</p>
        
        {requestBody && (
          <motion.div 
            className="mt-4"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            transition={{ duration: 0.3, delay: 0.1 }}
          >
            <h4 className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase">Request Body</h4>
            <motion.pre 
              className="mt-2 bg-gray-800 dark:bg-black text-white p-4 rounded-md text-sm overflow-x-auto"
              whileHover={{ scale: 1.01 }}
              transition={{ duration: 0.2 }}
            >
              {requestBody}
            </motion.pre>
          </motion.div>
        )}
        
        {responseBody && (
          <motion.div 
            className="mt-4"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            transition={{ duration: 0.3, delay: 0.2 }}
          >
            <h4 className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase">Response</h4>
            <motion.pre 
              className="mt-2 bg-gray-800 dark:bg-black text-white p-4 rounded-md text-sm overflow-x-auto"
              whileHover={{ scale: 1.01 }}
              transition={{ duration: 0.2 }}
            >
              {responseBody}
            </motion.pre>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};

export default EndpointCard;
