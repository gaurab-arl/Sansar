

import Hero from "./components/Hero";
import { useRef, useState } from "react";
import About from "./components/About"

export default function App() {
  return (
    <main className="relative min-h-screen w-screen overflow-x-hidden">
      <Hero />
      <About />
    </main>

  );
}
