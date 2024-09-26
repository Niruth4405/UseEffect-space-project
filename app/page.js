"use client";
import { useEffect, useState } from "react";

export default function Home() {
  const [scrollPosition, setScrollPosition] = useState(0);
  const [windowHeight, setWindowHeight] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const position = window.scrollY;
      setScrollPosition(position);
    };

    // Set the window height after the component mounts
    const updateWindowHeight = () => {
      setWindowHeight(window.innerHeight);
    };

    window.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", updateWindowHeight);
    
    // Initial height setup
    updateWindowHeight();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", updateWindowHeight);
    };
  }, []);

  const planets = [
    { name: "Earth", emoji: "🌍" },
    { name: "Saturn", emoji: "🪐" },
    { name: "Moon", emoji: "🌕" },
    { name: "Sun", emoji: "☀️" },
  ];

  const calculatePlanetStyle = (index) => {
    if (windowHeight === 0) return {}; // Return empty style if height is not set yet
    const scrollProgress = scrollPosition / windowHeight; // Use windowHeight instead of window.innerHeight
    const scale = Math.max(0.1, 1 - Math.max(0, scrollProgress - index) * 0.5);
    const opacity = Math.max(0, Math.min(1, 2 - Math.abs(scrollProgress - index) * 2));
    const zIndex = planets.length - index;

    return {
      transform: `scale(${scale})`,
      opacity,
      zIndex,
    };
  };

  return (
    <div className="h-[400vh] relative bg-black">
      <div className="h-screen sticky top-0 overflow-hidden">
        {planets.map((planet, index) => (
          <div
            key={planet.name}
            className="absolute inset-0 flex justify-center items-center transition-all duration-300 ease-out"
            style={calculatePlanetStyle(index)}
          >
            <div className="text-white text-6xl sm:text-4xl">
              <span>{planet.emoji} {planet.name}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
