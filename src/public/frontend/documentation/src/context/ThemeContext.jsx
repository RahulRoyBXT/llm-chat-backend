import React, { createContext, useState, useEffect, useContext } from "react";

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  // Check for saved theme preference or user preference
  const [darkMode, setDarkMode] = useState(() => {
    // Check localStorage first
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) {
      return savedTheme === "dark";
    }
    // Otherwise check for OS preference
    return window.matchMedia("(prefers-color-scheme: dark)").matches;
  });

  // Update the class on the html element
  useEffect(() => {

    if (darkMode) {
      document.documentElement.classList.add("dark");
      document.documentElement.style.colorScheme = "dark";
    } else {
      document.documentElement.classList.remove("dark");
      document.documentElement.style.colorScheme = "light";
    }
    
    localStorage.setItem("theme", darkMode ? "dark" : "light");
  }, [darkMode]);

  // Watch for OS theme changes
  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const handleChange = (e) => {
      const savedTheme = localStorage.getItem("theme");
      if (!savedTheme) {
        setDarkMode(e.matches);
      }
    };

    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  const toggleDarkMode = () => {
    setDarkMode(prev => !prev);
  };
  
  // Force set to a specific mode (for debugging)
  const setTheme = (isDark) => {
    setDarkMode(isDark);
  };

  return (
    <ThemeContext.Provider value={{ darkMode, toggleDarkMode, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
