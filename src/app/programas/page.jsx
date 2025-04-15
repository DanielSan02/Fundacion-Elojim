"use client";

import { ProgramProvider } from "@/context/ProgramContext";
import ProgramasPage from "@/components/Eventos/ProgramasPage";
import Navbar from "@/components/NavBar";
import Footer from "@/components/Footer";

export default function Programas() {
  return (
    <ProgramProvider>
      <div className="min-h-screen bg-mainBg flex flex-col">
        <Navbar />
        <main className="flex-grow pt-20">
          <ProgramasPage />
        </main>
        <Footer />
      </div>
    </ProgramProvider>
  );
}
