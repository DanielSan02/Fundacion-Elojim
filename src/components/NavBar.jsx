"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Menu } from "lucide-react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { href: "#inicio", label: "Inicio" },
    { href: "#nosotros", label: "Nosotros" },
    { href: "#noticias", label: "Noticias" },
    { href: "#contacto", label: "Contáctanos" },
  ];

  return (
    <header className="fixed w-full z-50 bg-[#1B3C8C] bg-opacity-95 text-white">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          <Link href="/" className="flex items-center space-x-2">
            <Image
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/WhatsApp%20Image%202025-02-13%20at%2017.34.06_40b979a6.jpg-DJAWfRDBGD3mQ8bzUFl012SW2IPPFV.jpeg"
              alt="Fundación Elojim"
              width={50}
              height={50}
              className="rounded-full"
            />
            <span className="text-2xl font-semibold">Fundación Elojim</span>
          </Link>
          <nav className="hidden md:flex items-center space-x-6">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="hover:text-[#3B82F6] transition-colors">
                {item.label}
              </a>
            ))}
            <Link href="/auth/login">
              <Button
                variant="outline"
                className="text-[#3B82F6] border-white hover:bg-[#3B82F6] hover:text-white transition-colors">
                Iniciar Sesión
              </Button>
            </Link>
          </nav>
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="ghost" className="p-0">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>

            <SheetContent
              side="right"
              className="w-[300px] sm:w-[400px] bg-[#1B3C8C] text-white">
              {/* 🔹 Agregar SheetTitle para accesibilidad */}
              <SheetHeader>
                <SheetTitle className="text-white text-xl font-bold tracking-wide">
                  Menú
                </SheetTitle>
              </SheetHeader>

              <nav className="flex flex-col space-y-4 mt-6">
                {navItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="text-lg hover:text-[#3B82F6] transition-colors"
                    onClick={() => setIsOpen(false)}>
                    {item.label}
                  </Link>
                ))}
                <Link href="/auth/login" onClick={() => setIsOpen(false)}>
                  <Button
                    variant="outline"
                    className="text-[#3B82F6] border-white hover:bg-[#3B82F6] hover:text-white transition-colors">
                    Iniciar Sesión
                  </Button>
                </Link>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
