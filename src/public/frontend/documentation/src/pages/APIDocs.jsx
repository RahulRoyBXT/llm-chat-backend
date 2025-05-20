import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Header from "../components/docs/Header";
import Sidebar from "../components/docs/Sidebar";
import SearchModal from "../components/docs/SearchModal";
import Introduction from "../components/docs/sections/Introduction";
import AuthDocs from "../components/docs/sections/AuthDocs";
import MessagingDocs from "../components/docs/sections/MessagingDocs";
import FriendsDocs from "../components/docs/sections/FriendsDocs";
import UsersDocs from "../components/docs/sections/UsersDocs";
import SocketDocs from "../components/docs/sections/SocketDocs";
import ErrorHandling from "../components/docs/sections/ErrorHandling";
import { ThemeProvider } from "../context/ThemeContext";

// Page transition variants
const pageVariants = {
  initial: {
    opacity: 0
  },
  animate: {
    opacity: 1,
    transition: {
      duration: 0.5,
      staggerChildren: 0.1
    }
  },
  exit: {
    opacity: 0
  }
};

const contentVariants = {
  initial: {
    opacity: 0,
    y: 20
  },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4
    }
  }
};

const APIDocs = () => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  // Handle keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e) => {
      // Open search modal with Ctrl+K or Command+K
      if ((e.ctrlKey || e.metaKey) && e.key === "k") {
        e.preventDefault();
        setIsSearchOpen(true);
      }
      // Close search with Escape
      if (e.key === "Escape" && isSearchOpen) {
        setIsSearchOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isSearchOpen]);

  // Sections data for sidebar and navigation
  const sections = [
    { id: "authentication", title: "Authentication", icon: "🔐" },
    { id: "messaging", title: "Messaging", icon: "💬" },
    { id: "friends", title: "Friends", icon: "👥" },
    { id: "users", title: "Users", icon: "👤" },
    { id: "socket", title: "Real-time", icon: "⚡" },
    { id: "error-handling", title: "Error Handling", icon: "⚠️" },
  ];

  return (
    <ThemeProvider>
      <motion.div 
        className="bg-slate-50 dark:bg-gray-900 min-h-screen transition-colors duration-200"
        initial="initial"
        animate="animate"
        exit="exit"
        variants={pageVariants}
      >
        {isSearchOpen && (
          <SearchModal 
            isOpen={isSearchOpen}
            onClose={() => setIsSearchOpen(false)}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            sections={sections}
          />
        )}

        <Header onOpenSearch={() => setIsSearchOpen(true)} />

        <div className="max-w-8xl mx-auto px-4 sm:px-6 md:px-8">
          <div className="lg:flex">
            <Sidebar sections={sections} />

            {/* Main content */}
            <motion.div 
              className="lg:pl-[19.5rem]"
              variants={contentVariants}
            >
              <motion.div 
                className="max-w-3xl mx-auto py-10"
                variants={contentVariants}
              >
                <div className="prose lg:prose-lg dark:prose-invert">
                  <Introduction />
                  <AuthDocs />
                  <MessagingDocs />
                  <FriendsDocs />
                  <UsersDocs />
                  <SocketDocs />
                  <ErrorHandling />
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </ThemeProvider>
  );
};

export default APIDocs;
