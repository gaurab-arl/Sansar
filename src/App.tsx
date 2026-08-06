

import Hero from "./components/Hero";
import { useEffect, useRef, useState } from "react";
import About from "./components/About"
import Navbar from "./components/Navbar";
import Feature from "./components/Feature";
import Story from "./components/Story";
import Footer from "./components/Footer";
import Contact from "./components/Contact";

import Lenis from "lenis";

interface LenisOptions {
  lerp: number;
  duration: number;
  smooth: boolean;
  normalizeWheel: boolean;
}

export default function App() {

  useEffect(() => {
    const lenis = new Lenis({
      lerp: 0.001,
      duration: 1,
      smooth: true,
      normalizeWheel: false,
    } as LenisOptions);

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => lenis.destroy();
  }, []);

  return (
    <main className="relative min-h-screen w-screen overflow-x-hidden">
      <Navbar />
      <Hero />
      <About />
      <Feature />
      <Story />
      <Contact />
      <Footer />
    </main>

  );
}
