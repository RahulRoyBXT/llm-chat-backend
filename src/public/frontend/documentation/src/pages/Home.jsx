import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useTheme } from "../context/ThemeContext";

import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Features from "../components/Features";
import {About} from "../components/About";
import Footer from "../components/Footer";

// Register ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

const Home = () => {
  const { darkMode } = useTheme();
  const sectionsRef = useRef([]);


  useEffect(() => {
    const sections = sectionsRef.current;
    
    // stacked scrolling effect
    sections.forEach((section, i) => {
      const nextSection = sections[i + 1];
      
      if (nextSection) {
        ScrollTrigger.create({
          trigger: section,
          start: "top top",
          end: "bottom bottom",
          pin: true,
          pinSpacing: false,
        });
      }
    });

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, [darkMode]);

  return (
    <div className="bg-white dark:bg-gray-900 min-h-screen text-gray-900 dark:text-white overflow-hidden">
      {/* Navbar */}
      <Navbar />

      {/* Hero Section */}
      <Hero sectionRef={el => sectionsRef.current[0] = el} />

      {/* Features Section */}
      <Features sectionRef={el => sectionsRef.current[1] = el} />

      {/* About Me Section */}
      <About sectionRef={el => sectionsRef.current[2] = el} />

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Home;
