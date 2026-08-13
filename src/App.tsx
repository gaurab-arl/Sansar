import { useEffect } from "react";

import Hero from "./components/Hero";
import About from "./components/About";
import Navbar from "./components/Navbar";
import Feature from "./components/Feature";
import Story from "./components/Story";
import Footer from "./components/Footer";
import Contact from "./components/Contact";

import Discover from "./pages/Discover";
import Destinations from "./pages/Destinations";
import BudgetPlanner from "./pages/BudgetPlanner";

import { Routes, Route } from "react-router-dom";

import Lenis from "lenis";

export default function App() {
  useEffect(() => {
    const lenis = new Lenis({
      lerp: 0.001,
      duration: 1,
    });

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
    <>
      <Navbar />

      <Routes>

        {/* HOME */}
        <Route
          path="/"
          element={
            <main className="relative min-h-screen w-screen overflow-x-hidden">
              <Hero />
              <About />
              <Feature />
              <Story />
              <Contact />
              <Footer />
            </main>
          }
        />

        {/* DISCOVER */}
        <Route
          path="/discover"
          element={<Discover />}
        />

        {/* DESTINATIONS */}
        <Route
          path="/destinations"
          element={<Destinations />}
        />

        {/* BUDGET */}
        <Route
          path="/budget-planner"
          element={<BudgetPlanner />}
        />

      </Routes>
    </>
  );
}