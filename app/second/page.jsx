"use client";
import { useEffect, useState } from "react";

export default function Home() {
  const [scrollPosition, setScrollPosition] = useState(0);
  const [windowHeight, setWindowHeight] = useState(0); // State for window height

  useEffect(() => {
    const handleScroll = () => {
      const position = window.scrollY;
      setScrollPosition(position);
    };

    const updateWindowHeight = () => {
      setWindowHeight(window.innerHeight); // Set window height
    };

    window.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", updateWindowHeight); // Update height on resize
    updateWindowHeight(); // Set initial height on mount

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
    if (windowHeight === 0) return {}; // Ensure height is set before calculations
    const scrollProgress = scrollPosition / windowHeight; // Use the state variable instead of window.innerHeight
    const planetProgress = scrollProgress - index;

    // Orbital motion parameters
    const orbitRadius = 50; // Adjust this value to change the size of the orbit
    const orbitSpeed = Math.PI / 2; // Quarter circle for exit

    let scale = 1;
    let opacity = 1;
    let x = 0;
    let y = 0;

    if (planetProgress > 0) {
      // Planet is scrolling out
      scale = Math.max(0.5, 1 - planetProgress * 0.5);
      opacity = Math.max(0, 1 - planetProgress);

      // Calculate orbital position only when scrolling out
      const angle = Math.min(planetProgress * orbitSpeed, Math.PI / 2);
      x = Math.sin(angle) * orbitRadius;
      y = -Math.cos(angle) * orbitRadius + orbitRadius; // Adjust to start from center
    } else if (planetProgress > -1) {
      // Planet is fully visible or becoming visible
      scale = 1;
      opacity = Math.min(1, 1 + planetProgress);
    } else {
      // Planet is not yet visible
      opacity = 0;
    }

    return {
      transform: `translate(${x}vw, ${y}vh) scale(${scale})`, // Corrected syntax for template literals
      opacity,
      zIndex: planets.length - index,
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
