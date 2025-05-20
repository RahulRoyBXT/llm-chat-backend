import React, { useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useTheme } from "../context/ThemeContext";

// Register ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

const Navbar = () => {
  const { darkMode, toggleDarkMode } = useTheme();
  const navbarRef = useRef(null);

  // Navbar animation
  useEffect(() => {
    gsap.to(navbarRef.current, {
      scrollTrigger: {
        trigger: document.documentElement,
        start: "top",
        end: "+=50px",
        scrub: true,
      },
      height: "64px",
      backgroundColor: darkMode ? "rgba(17, 24, 39, 0.8)" : "rgba(255, 255, 255, 0.8)",
      backdropFilter: "blur(12px)",
      borderBottomWidth: "1px",
      borderBottomColor: darkMode ? "rgba(75, 85, 99, 0.3)" : "rgba(229, 231, 235, 0.8)",
    });

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, [darkMode]);

  return (
    <header 
      ref={navbarRef}
      className="fixed top-0 left-0 right-0 z-50 h-20 transition-all duration-200"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center justify-between">
        <div className="flex items-center h-full">
          <motion.div 
            className="flex items-center justify-center text-2xl font-bold text-blue-600 dark:text-blue-400 h-full gap-2"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <img className='max-h-[1.5em]' src="/no_bg_logo.png" alt="application logo" />
            <p >Llama Chat</p>
          </motion.div>
        </div>
        
        <div className="flex items-center space-x-6">
          <motion.nav 
            className="hidden md:flex space-x-6 text-sm font-medium"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.5 }}
          >
            <a href="#features" className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white px-3 py-2 rounded-md transition duration-150">Features</a>
            <a href="#about" className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white px-3 py-2 rounded-md transition duration-150">About</a>
            <Link to="/docs" className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white px-3 py-2 rounded-md transition duration-150">Documentation</Link>
            <a href="https://github.com/RahulRoyBXT/llm-chat-backend" target="_blank" rel="noopener noreferrer" className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white px-3 py-2 rounded-md transition duration-150">
              <span className="flex items-center">
                <svg className="h-5 w-5 mr-1" fill="currentColor" viewBox="0 0 24 24">
                  <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.165 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.342-3.369-1.342-.454-1.155-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.564 9.564 0 0112 6.836c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.934.359.31.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.16 22 16.416 22 12c0-5.523-4.477-10-10-10z" />
                </svg>
                GitHub
              </span>
            </a>
            <span className="text-gray-400 dark:text-gray-500">v1.0.0</span>
          </motion.nav>
          
          <motion.button 
            onClick={toggleDarkMode}
            className="p-2 rounded-md bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
            aria-label={darkMode ? "Switch to light mode" : "Switch to dark mode"}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
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
        </div>
      </div>
    </header>
  );
};

export default Navbar;
