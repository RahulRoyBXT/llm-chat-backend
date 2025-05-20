import React from 'react';
import { useTheme } from '../context/ThemeContext';

function ThemeDebug() {
  const { darkMode, toggleDarkMode, setTheme } = useTheme();

  return (
    <div className="fixed bottom-4 right-4 bg-white dark:bg-gray-800 p-4 rounded-lg shadow-lg z-50 text-sm">
      <h3 className="font-bold mb-2 text-gray-900 dark:text-white">Theme Debugger</h3>
      <div className="mb-2 text-gray-700 dark:text-gray-300">
        Current theme: <span className="font-mono">{darkMode ? 'dark' : 'light'}</span>
      </div>
      <div className="flex space-x-2">
        <button 
          onClick={() => setTheme(true)} 
          className="px-2 py-1 bg-gray-200 dark:bg-gray-700 rounded text-gray-900 dark:text-white"
        >
          Force Dark
        </button>
        <button 
          onClick={() => setTheme(false)} 
          className="px-2 py-1 bg-gray-200 dark:bg-gray-700 rounded text-gray-900 dark:text-white"
        >
          Force Light
        </button>
        <button 
          onClick={toggleDarkMode} 
          className="px-2 py-1 bg-blue-500 text-white rounded"
        >
          Toggle
        </button>
      </div>
    </div>
  );
}

export default ThemeDebug;
