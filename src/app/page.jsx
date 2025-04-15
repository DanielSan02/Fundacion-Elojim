"use client";
import Header from "@/components/Home/Header";
import Navbar from "@/components/NavBar";
import MisionVision from "@/components/Home/MisionVision";
import AreasImpacto from "@/components/Home/AreasImpacto";
import NewSection from "@/components/Home/NewSection/NewSection";
import Contactanos from "@/components/Home/Contactanos";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div className="scroll-smooth">
      <Navbar />
      <Header />
      <MisionVision />
      <AreasImpacto />
      <NewSection />
      <Contactanos />
      <Footer />
    </div>
  );
}
