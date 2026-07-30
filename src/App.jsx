

import Hero from "./components/Hero";
import { useRef, useState } from "react";
import About from "./components/About"
import Navbar from "./components/Navbar";
import Feature from "./components/Feature";
import Footer from "./components/Footer";


export default function App() {
  return (
    <main className="relative min-h-screen w-screen overflow-x-hidden">
      <Navbar />
      <Hero />
      <About />
      <Feature />
      <Footer />
    </main>

  );
}
