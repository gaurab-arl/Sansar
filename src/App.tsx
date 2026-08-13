

import Hero from "./components/Hero";
import { useEffect, useRef, useState } from "react";
import About from "./components/About"
import Navbar from "./components/Navbar";
import Feature from "./components/Feature";
import Story from "./components/Story";
import Footer from "./components/Footer";
import Contact from "./components/Contact";
import { Routes, Route } from "react-router-dom";
import Destination from "./pages/destination/DestinationsPage";
import Discover from "./pages/discover/Discoverpage";
import Budget from "./pages/budget/BudgetPage";


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
      <Routes>
        <Route path="/" element={
          <>
            <Hero />
            <About />
            <Feature />
            <Story />
            <Contact />
            <Footer />
          </>
        } />
        <Route path="/destination" element={<Destination />} />
        <Route path="/discover" element={<Discover />} />
        <Route path="/budget" element={<Budget />} />
      </Routes>
    </main>

  );
}
