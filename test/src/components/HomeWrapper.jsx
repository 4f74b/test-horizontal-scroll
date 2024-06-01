import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './HomeWrapper.css'; // Import the CSS file for styling

// Register ScrollTrigger with GSAP
gsap.registerPlugin(ScrollTrigger);

const HomeWrapper = () => {
  const containerRef = useRef(null); // Create a ref for the container

  useEffect(() => {
    const container = containerRef.current;
    const sections = container.querySelectorAll('section'); // Select all section elements within the container

    // Function to create the ScrollTrigger for horizontal scrolling
    const createScrollTrigger = () => {
      gsap.to(container, {
        x: () => -(container.scrollWidth - document.documentElement.clientWidth) + "px", // Calculate the horizontal scroll distance
        ease: "none",
        scrollTrigger: {
          trigger: container,
          invalidateOnRefresh: true, // Recalculate on refresh
          pin: true, // Pin the container
          scrub: 0.1, // Smooth scrubbing
          snap: 1 / (sections.length - 1), // Snap to each section
          end: () => "+=" + container.offsetWidth // End after scrolling through the entire container
        }
      });
    };

    // Function to handle resizing of the window
    const handleResize = () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill()); // Kill all existing ScrollTriggers
      if (window.innerWidth >= 1024) { // Check if the screen width is 1024px or greater
        createScrollTrigger(); // Create the horizontal ScrollTrigger
      }
    };

    handleResize(); // Initial setup

    window.addEventListener('resize', handleResize); // Add resize event listener

    return () => {
      window.removeEventListener('resize', handleResize); // Clean up the resize event listener
      ScrollTrigger.getAll().forEach(trigger => trigger.kill()); // Clean up ScrollTriggers
    };
  }, []); // Empty dependency array to run only once

  return (
    <div id="home-wrapper" ref={containerRef} className="h-lg-screen">
      <section style={{ border: '2px solid red' }}></section>
      <section style={{ border: '2px solid red' }}></section>
      <section style={{ border: '2px solid red' }}></section>
    </div>
  );
};

export default HomeWrapper;
