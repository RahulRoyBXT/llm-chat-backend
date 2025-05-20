import React, { useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { useTheme } from "../../context/ThemeContext";
import gsap from "gsap";

const Header = ({ onOpenSearch }) => {
  const { darkMode, toggleDarkMode } = useTheme();
  const themeButtonRef = useRef(null);
  
  // GSAP animation for theme toggle
  useEffect(() => {
    if (themeButtonRef.current) {
      gsap.fromTo(
        themeButtonRef.current,
        { rotation: -20, scale: 0.9 },
        { 
          rotation: 0, 
          scale: 1, 
          duration: 0.5, 
          ease: "elastic.out(1, 0.3)" 
        }
      );
    }
  }, [darkMode]);
  
  return (
    <motion.header 
      className="sticky top-0 z-40 w-full backdrop-blur flex-none bg-white/75 dark:bg-gray-900/75 border-b border-gray-200 dark:border-gray-700 transition-colors duration-200"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", damping: 20, stiffness: 100 }}
    >
      <div className="max-w-8xl mx-auto">
        <div className="py-4 px-4 lg:px-8 flex items-center justify-between">
          <motion.h1 
            className="text-2xl font-bold text-blue-600 dark:text-blue-400"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            Chat App API
          </motion.h1>
          
          <div className="flex items-center space-x-4">
            {/* Dark Mode Toggle */}
            <motion.button 
              ref={themeButtonRef}
              onClick={toggleDarkMode}
              className="p-2 rounded-md bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
              aria-label={darkMode ? "Switch to light mode" : "Switch to dark mode"}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              {darkMode ? (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clipRule="evenodd" />
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
                </svg>
              )}
            </motion.button>
            
            {/* Search Trigger */}
            <motion.button 
              className="group flex items-center bg-white/75 dark:bg-gray-800 rounded-md ring-1 ring-gray-200 dark:ring-gray-700 px-3 py-2 text-sm text-gray-500 dark:text-gray-400 hover:ring-gray-300 dark:hover:ring-gray-600 transition-colors"
              onClick={onOpenSearch}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
            >
              <svg width="24" height="24" fill="none" className="mr-2 text-gray-400 dark:text-gray-500 group-hover:text-gray-500 dark:group-hover:text-gray-400">
                <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <span>Quick search...</span>
              <span className="ml-auto pl-3 text-xs flex items-center gap-1 text-gray-400 dark:text-gray-500">
                <kbd className="font-sans">
                  <abbr title="Control" className="no-underline">Ctrl</abbr>
                </kbd>
                <span>K</span>
              </span>
            </motion.button>
          </div>
        </div>
      </div>
    </motion.header>
  );
};

export default Header;
