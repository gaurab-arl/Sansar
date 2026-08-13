<<<<<<< HEAD
import { useEffect } from "react";

import Hero from "./components/Hero";
import About from "./components/About";
=======


import Hero from "./components/Hero";
import { useEffect, useRef, useState } from "react";
import About from "./components/About"
>>>>>>> 7cbb7466563614a90fb8dcd4368aac926b57b449
import Navbar from "./components/Navbar";
import Feature from "./components/Feature";
import Story from "./components/Story";
import Footer from "./components/Footer";
import Contact from "./components/Contact";
<<<<<<< HEAD

import Discover from "./pages/Discover";
import Destinations from "./pages/Destinations";
import BudgetPlanner from "./pages/BudgetPlanner";

import { Routes, Route } from "react-router-dom";

import Lenis from "lenis";

export default function App() {
=======
import { Routes, Route } from "react-router-dom";
import Destination from "./pages/destination/Destination";
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

>>>>>>> 7cbb7466563614a90fb8dcd4368aac926b57b449
  useEffect(() => {
    const lenis = new Lenis({
      lerp: 0.001,
      duration: 1,
<<<<<<< HEAD
    });
=======
      smooth: true,
      normalizeWheel: false,
    } as LenisOptions);
>>>>>>> 7cbb7466563614a90fb8dcd4368aac926b57b449

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

<<<<<<< HEAD
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
=======
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
>>>>>>> 7cbb7466563614a90fb8dcd4368aac926b57b449
