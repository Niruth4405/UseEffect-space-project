"use client"
import { useEffect, useState } from "react";

export default function Home() {
  const [scrollPosition, setScrollPosition] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const position = window.scrollY;
      setScrollPosition(position);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const scalePlanet = (index) => {
    const offset = scrollPosition - index * window.innerHeight;
    // Limit scale to avoid excessive zoom
    const scale = Math.min(1.5, 1 + offset / 1000);
    const opacity = 1 - Math.abs(offset) / window.innerHeight;
    return { transform: `scale(${scale})`, opacity: opacity };
  };

  return (
    <div className="min-h-screen relative">
      <section className="h-screen flex justify-center items-center bg-black">
        <div
          className="text-white text-6xl sm:text-4xl"
          style={scalePlanet(0)}
        >
          🌍 Earth
        </div>
      </section>

      <section className="h-screen flex justify-center items-center bg-black">
        <div
          className="text-white text-6xl sm:text-4xl"
          style={scalePlanet(1)}
        >
          🪐 Saturn
        </div>
      </section>

      <section className="h-screen flex justify-center items-center bg-black">
        <div
          className="text-white text-6xl sm:text-4xl"
          style={scalePlanet(2)}
        >
          🌕 Moon
        </div>
      </section>

      <section className="h-screen flex justify-center items-center bg-black">
        <div
          className="text-white text-6xl sm:text-4xl"
          style={scalePlanet(3)}
        >
          ☀️ Sun
        </div>
      </section>
    </div>
  );
}
