import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import VenomBackground from "./VenomBackground";

const Hero = ({ sectionRef }) => {
  const [displayText, setDisplayText] = useState("");
  const [isPaused, setIsPaused] = useState(false);
  const fullText = "Llama Chat provides a robust backend API for building real-time messaging applications with Socket.io, Redis, and Express.";
  const typingSpeedMs = 50;
  const typewriterRef = useRef(null);
  const currentIndexRef = useRef(0);
  const [colorIndex, setColorIndex] = useState(0);
  
  // Color palette for the typing effect
  const colors = ['text-blue-500', 'text-indigo-500', 'text-purple-500', 'text-pink-500', 'text-red-500'];

  // Typewriter effect
  useEffect(() => {
    if (isPaused) return;

    const typeNextChar = () => {
      if (currentIndexRef.current < fullText.length) {
        setDisplayText(fullText.substring(0, currentIndexRef.current + 1));
        currentIndexRef.current += 1;
        
        // Change color every few characters
        if (currentIndexRef.current % 4 === 0) {
          setColorIndex((prevIndex) => (prevIndex + 1) % colors.length);
        }
        
        typewriterRef.current = setTimeout(typeNextChar, typingSpeedMs);
      }
    };

    typewriterRef.current = setTimeout(typeNextChar, typingSpeedMs);

    return () => {
      if (typewriterRef.current) clearTimeout(typewriterRef.current);
    };
  }, [isPaused, colors]);

  // Pause on hover, resume on mouse leave
  const handleMouseEnter = () => setIsPaused(true);
  const handleMouseLeave = () => setIsPaused(false);

  // Generate highlighted text with colorful typing effect
  const renderHighlightedText = () => {
    if (!displayText) return null;
    
    // Get the words that are fully typed
    const words = displayText.split(' ');
    const completedWords = words.slice(0, -1).join(' ');
    
    // The current word being typed
    const currentWord = words[words.length - 1];
    
    return (
      <>
        {completedWords.length > 0 && (
          <span className="bg-blue-100 dark:bg-blue-900/30 px-1 py-0.5 rounded mr-1">
            {completedWords}
          </span>
        )}
        <span className={`${colors[colorIndex]} font-medium`}>
          {currentWord}
        </span>
        <span className={`inline-block w-1 h-5 ml-1 bg-blue-500 ${isPaused ? 'opacity-0' : 'animate-pulse'}`}></span>
      </>
    );
  };

  return (
    <section 
      ref={sectionRef}
      className="relative flex flex-col items-center justify-center min-h-screen pt-20 overflow-hidden"
    >
      
      <VenomBackground />
      
      {/* Fallback gradient background in case the canvas fails */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 z-0" />
      
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-32 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400">
              Real-time Messaging
            </span>
            <br />
            <span className="text-gray-900 dark:text-white">
              Built for Modern Apps
            </span>
          </h1>

          <p 
            className="mt-6 text-xl text-gray-800 dark:text-gray-200 max-w-3xl mx-auto min-h-[4rem] leading-relaxed backdrop-blur-sm bg-white/10 dark:bg-black/10 rounded-lg p-4"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            {renderHighlightedText()}
          </p>

          <div className="mt-10 flex flex-col sm:flex-row justify-center gap-4">
            <motion.a
              href="#features"
              className="px-8 py-3 rounded-lg bg-blue-600 text-white font-medium shadow-lg shadow-blue-500/30 hover:bg-blue-700 transition duration-200"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              See Features
            </motion.a>
            <motion.a
              href="https://github.com/RahulRoyBXT/llm-chat-backend"
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-3 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white font-medium shadow-lg shadow-gray-200/50 dark:shadow-gray-900/30 hover:bg-gray-50 dark:hover:bg-gray-700 border border-gray-200 dark:border-gray-700 transition duration-200"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              View on GitHub
            </motion.a>
          </div>
        </motion.div>

        <motion.div
          className="mt-20"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
        >
          <div className="relative bg-white dark:bg-gray-800 rounded-xl shadow-2xl overflow-hidden p-2 border border-gray-100 dark:border-gray-700 backdrop-blur-md bg-white/70 dark:bg-gray-800/70">
            <div className="bg-gray-800 rounded-lg p-4 overflow-x-auto">
              <pre className="text-xs sm:text-sm text-left text-gray-300">
                <code>{`const io = require('socket.io')(server);
const redisClient = createClient();

io.on('connection', (socket) => {
  // Store user connection
  socket.on('user_connected', async (userId) => {
    await redisClient.set(\`user:\${userId}\`, socket.id);
    console.log(\`User \${userId} is online\`);
  });

  // Handle real-time messaging
  socket.on('send_message', async ({ 
    uniqueId, sender, receiver, content, timestamp 
  }) => {
    const receiverSocketId = await redisClient.get(\`user:\${receiver}\`);
    
    // Cache message and notify receiver
    if (receiverSocketId) {
      io.to(receiverSocketId).emit('receive_message', {
        uniqueId, sender, receiver, content, timestamp
      });
    }
  });
});`}</code>
              </pre>
            </div>
          </div>
        </motion.div>
      </div>
      
      <div className="absolute bottom-10 left-0 right-0 flex justify-center">
        <motion.div 
          animate={{ 
            y: [0, 10, 0],
          }}
          transition={{ 
            repeat: Infinity,
            duration: 1.5
          }}
        >
          <svg className="w-6 h-6 text-gray-500 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
