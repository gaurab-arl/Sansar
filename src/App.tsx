import { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import Lenis from "lenis";

import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Feature from "./components/Feature";
import Story from "./components/Story";
import Contact from "./components/Contact";
import Footer from "./components/Footer";

import Destination from "./pages/destination/Destination";
import Discover from "./pages/discover/as";
import BudgetPlanner from "./pages/BudgetPlanner1";

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

    return () => {
      lenis.destroy();
    };
  }, []);

  return (
    <main className="relative min-h-screen w-screen overflow-x-hidden">
      <Navbar />
      <Routes>
        {/* HOME */}
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

        {/* DESTINATION */}
        <Route path="/destination" element={<Destination />} />

        {/* DISCOVER */}
        <Route path="/discover" element={<Discover />} />

        {/* BUDGET */}
        <Route path="/budget" element={<BudgetPlanner />} />
      </Routes>
    </main>
  );
}
