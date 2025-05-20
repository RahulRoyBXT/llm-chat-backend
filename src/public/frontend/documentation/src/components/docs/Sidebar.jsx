import React from "react";
import { motion } from "framer-motion";

const Sidebar = ({ sections }) => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 10
      }
    }
  };

  return (
    <div className="hidden lg:block fixed z-20 inset-0 top-[4.5rem] left-[max(0px,calc(50%-45rem))] right-auto w-[19rem] py-10 px-8 overflow-y-auto bg-slate-50 dark:bg-gray-900 transition-colors duration-200">
      <motion.nav 
        className="lg:text-sm lg:leading-6"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div className="mb-8" variants={itemVariants}>
          <h5 className="text-gray-500 dark:text-gray-400 uppercase tracking-wide font-semibold text-sm">Getting Started</h5>
          <ul className="mt-3 space-y-2">
            <motion.li whileHover={{ x: 3 }} transition={{ type: "spring", stiffness: 300 }}>
              <a href="#introduction" className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300">Introduction</a>
            </motion.li>
            <motion.li whileHover={{ x: 3 }} transition={{ type: "spring", stiffness: 300 }}>
              <a href="#authentication" className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-300">Authentication</a>
            </motion.li>
            <motion.li whileHover={{ x: 3 }} transition={{ type: "spring", stiffness: 300 }}>
              <a href="#error-handling" className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-300">Error Handling</a>
            </motion.li>
          </ul>
        </motion.div>
        
        <motion.div className="mb-8" variants={itemVariants}>
          <h5 className="text-gray-500 dark:text-gray-400 uppercase tracking-wide font-semibold text-sm">API References</h5>
          <ul className="mt-3 space-y-2">
            {sections.map((section, index) => (
              <motion.li 
                key={section.id}
                variants={itemVariants}
                whileHover={{ x: 3 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <a href={`#${section.id}`} className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-300 flex items-center">
                  <motion.span 
                    className="mr-2"
                    whileHover={{ scale: 1.2 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    {section.icon}
                  </motion.span> 
                  {section.title}
                </a>
              </motion.li>
            ))}
          </ul>
        </motion.div>
      </motion.nav>
    </div>
  );
};

export default Sidebar;
