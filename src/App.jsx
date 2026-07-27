

import Hero from "./components/Hero";
import { useRef, useState } from "react";


export default function App() {
  return (
    <main className="relative min-h-screen w-screen overflow-x-hidden">
      <Hero />
      <section className="w-full h-screen bg-blue-500" >
        hello
        </section>
    </main>

  );
}
