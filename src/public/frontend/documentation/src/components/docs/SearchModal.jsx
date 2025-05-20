import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import gsap from "gsap";

const SearchModal = ({ isOpen, onClose, searchQuery, setSearchQuery, sections }) => {
  const [searchResults, setSearchResults] = useState([]);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const searchInputRef = useRef(null);
  const resultsContainerRef = useRef(null);
  const resultRefs = useRef([]);
  
  // Reset selected index when search query changes
  useEffect(() => {
    setSelectedIndex(-1);
    if (searchResults.length > 0) {
      resultRefs.current = Array(searchResults.length).fill().map(() => React.createRef());
    }
  }, [searchQuery, searchResults.length]);


  useEffect(() => {
    if (!searchQuery.trim()) {
      setSearchResults([]);
      return;
    }
    
    // Mock search results based on sections
    const results = sections
      .filter(section => 
        section.title.toLowerCase().includes(searchQuery.toLowerCase())
      )
      .map(section => ({
        title: section.title,
        description: `${section.title} API endpoints`,
        link: `#${section.id}`
      }));
      
    // Add specific endpoint results
    const endpoints = [
      { title: "Login", description: "User authentication endpoint", link: "#authentication-login", section: "Authentication" },
      { title: "Register", description: "Create new user account", link: "#authentication-register", section: "Authentication" },
      { title: "Logout", description: "End user session", link: "#authentication-logout", section: "Authentication" },
      { title: "Send Message", description: "Send a message to another user", link: "#messaging-send", section: "Messaging" },
      { title: "Get Messages", description: "Retrieve chat messages", link: "#messaging-get", section: "Messaging" },
      { title: "Send Friend Request", description: "Send a friend request to another user", link: "#friends-send", section: "Friends" },
      { title: "Accept Friend Request", description: "Accept incoming friend request", link: "#friends-accept", section: "Friends" },
      { title: "Get All Users", description: "Retrieve all users", link: "#users-all", section: "Users" },
      { title: "Socket.io Events", description: "Real-time messaging events", link: "#socket-events", section: "Real-time" }
    ];
    
    const endpointResults = endpoints
      .filter(endpoint => 
        endpoint.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        endpoint.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
      
    setSearchResults([...results, ...endpointResults]);
  }, [searchQuery, sections]);
  
  // Handle keyboard navigation
  useEffect(() => {
    if (!isOpen) return;
    
    const handleKeyDown = (e) => {
      // Close on Escape
      if (e.key === "Escape") {
        onClose();
        return;
      }
      
      // Navigate through results with arrow keys
      if (e.key === "ArrowDown") {
        e.preventDefault();
        setSelectedIndex(prev => 
          prev < searchResults.length - 1 ? prev + 1 : prev
        );
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setSelectedIndex(prev => 
          prev > 0 ? prev - 1 : 0
        );
      } else if (e.key === "Enter" && selectedIndex >= 0) {
        e.preventDefault();
        // Navigate to the selected result
        const selected = searchResults[selectedIndex];
        if (selected && selected.link) {
          window.location.href = selected.link;
          onClose();
          setSearchQuery('');
        }
      }
    };
    
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose, searchResults, selectedIndex, setSearchQuery]);
  
  // Scroll selected item into view
  useEffect(() => {
    if (selectedIndex >= 0 && resultRefs.current[selectedIndex] && resultRefs.current[selectedIndex].current) {
      resultRefs.current[selectedIndex].current.scrollIntoView({
        behavior: 'smooth',
        block: 'nearest'
      });
    }
  }, [selectedIndex]);
  
  // Focus input when modal opens
  useEffect(() => {
    if (isOpen && searchInputRef.current) {
      setTimeout(() => {
        searchInputRef.current.focus();
      }, 100);
    }
  }, [isOpen]);
  
  // GSAP animation for search highlighting
  useEffect(() => {
    if (selectedIndex >= 0 && resultRefs.current[selectedIndex]?.current) {
      gsap.to(resultRefs.current[selectedIndex].current, {
        backgroundColor: 'rgba(59, 130, 246, 0.1)',
        duration: 0.2,
        ease: 'power2.out'
      });
    }
    

    resultRefs.current.forEach((ref, idx) => {
      if (idx !== selectedIndex && ref?.current) {
        gsap.to(ref.current, {
          backgroundColor: 'transparent',
          duration: 0.2,
          ease: 'power2.out'
        });
      }
    });
  }, [selectedIndex]);

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          <motion.div 
            className="absolute inset-0 bg-black bg-opacity-50" 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />
          
          <motion.div 
            className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl w-full max-w-2xl overflow-hidden transition-colors duration-200 relative z-10"
            initial={{ scale: 0.9, y: 20, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            exit={{ scale: 0.9, y: 20, opacity: 0 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
          >
            <div className="p-4 border-b border-gray-200 dark:border-gray-700">
              <div className="flex items-center">
                <motion.svg 
                  className="w-5 h-5 text-gray-400 dark:text-gray-500"
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24" 
                  xmlns="http://www.w3.org/2000/svg"
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.1 }}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </motion.svg>
                <input
                  ref={searchInputRef}
                  type="text"
                  placeholder="Search documentation..."
                  className="w-full px-4 py-2 outline-none text-lg bg-transparent text-gray-900 dark:text-white"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <div className="bg-gray-100 dark:bg-gray-700 text-xs px-2 py-1 rounded text-gray-600 dark:text-gray-300">ESC</div>
              </div>
            </div>
            
            <div 
              ref={resultsContainerRef}
              className="max-h-96 overflow-y-auto p-2"
            >
              {searchResults.length > 0 ? (
                searchResults.map((result, index) => (
                  <motion.a 
                    key={index}
                    ref={resultRefs.current[index]}
                    href={result.link}
                    onClick={() => {
                      onClose();
                      setSearchQuery('');
                    }}
                    className={`block p-2 rounded-md cursor-pointer transition-colors ${selectedIndex === index ? 'bg-blue-50 dark:bg-blue-900/20' : 'hover:bg-gray-100 dark:hover:bg-gray-700'}`}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.03, duration: 0.2 }}
                  >
                    <div className="font-medium text-blue-600 dark:text-blue-400">{result.title}</div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">{result.description}</div>
                    {result.section && (
                      <div className="text-xs text-gray-500 dark:text-gray-500 mt-1">
                        {result.section}
                      </div>
                    )}
                  </motion.a>
                ))
              ) : searchQuery ? (
                <motion.div 
                  className="p-4 text-center text-gray-500 dark:text-gray-400"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.1 }}
                >
                  No results found for "{searchQuery}"
                </motion.div>
              ) : (
                <>
                  {[
                    { title: "Authentication", description: "Login, register, and authentication endpoints" },
                    { title: "Messaging", description: "Send and receive messages" },
                    { title: "Friends", description: "Friend requests and management" }
                  ].map((item, idx) => (
                    <motion.div 
                      key={idx}
                      className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded cursor-pointer transition-colors"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: idx * 0.1 }}
                    >
                      <div className="font-medium text-blue-600 dark:text-blue-400">{item.title}</div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">{item.description}</div>
                    </motion.div>
                  ))}
                </>
              )}
            </div>
            
            {searchResults.length > 0 && (
              <motion.div 
                className="px-4 py-2 text-xs text-gray-500 border-t border-gray-200 dark:border-gray-700"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                <span>↑↓ to navigate</span>
                <span className="mx-2">·</span>
                <span>enter to select</span>
                <span className="mx-2">·</span>
                <span>esc to close</span>
              </motion.div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default SearchModal;
