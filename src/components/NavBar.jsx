"use client";

import { useState, useEffect } from "react";
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
import { Menu, User, LogOut } from "lucide-react";
import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { data: session, status } = useSession();
  const router = useRouter();
  const [isAdmin, setIsAdmin] = useState(false);
  const [isVoluntario, setIsVoluntario] = useState(false);

  useEffect(() => {
    
    if (session && session.user) {
      // Verifica si rolId existe, de lo contrario intenta obtenerlo a través de una API
      if (session.user.rolId !== undefined) {
        setIsAdmin(session.user.rolId === 2);
        // setIsVoluntario(session.user.rolId === 2);
      }
    } else {
      setIsAdmin(false);
      setIsVoluntario(false);
    }
  }, [session]);

  const navItems = [
    { href: "/", label: "Inicio" },
    { href: "/#nosotros", label: "Nosotros" },
    { href: "/news", label: "Noticias" },
    { href: "/#contacto", label: "Contáctanos" },
    { href: "/programas", label: "Programas" },
  ];

  // Agregar elementos de navegación condicionales basados en el rol
  const getConditionalNavItems = () => {
    let items = [...navItems];
    
    if (isAdmin) {
      items.push({ href: "/admin", label: "Panel Administrativo" });
    }
    
    return items;
  };

  const handleSignOut = async () => {
    await signOut({ redirect: false });
    router.push("/");
  };

  // Lista de navegación final con elementos condicionales
  const finalNavItems = getConditionalNavItems();

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
          
          {/* Navegación de escritorio */}
          <nav className="hidden md:flex items-center space-x-6">
            {finalNavItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="hover:text-[#3B82F6] transition-colors">
                {item.label}
              </a>
            ))}

            {/* Opciones de autenticación */}
            {status === "authenticated" ? (
              <div className="flex items-center space-x-4">
                <span className="text-sm">Hola, {session.user.name}</span>
                <Button 
                  variant="ghost" 
                  className="hover:text-[#3B82F6] transition-colors p-0"
                  onClick={handleSignOut}>
                  <LogOut className="h-5 w-5 mr-1" />
                  <span>Salir</span>
                </Button>
              </div>
            ) : (
              <Link href="/auth/login" className="hover:text-[#3B82F6] transition-colors flex items-center">
                <User className="h-5 w-5 mr-1" />
                <span>Iniciar sesión</span>
              </Link>
            )}
          </nav>
          
          {/* Menú móvil */}
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
              <SheetHeader>
                <SheetTitle className="text-white text-xl font-bold tracking-wide">
                  Menú
                </SheetTitle>
              </SheetHeader>

              <nav className="flex flex-col space-y-4 mt-6">
                {finalNavItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="text-lg hover:text-[#3B82F6] transition-colors"
                    onClick={() => setIsOpen(false)}>
                    {item.label}
                  </Link>
                ))}
                
                {/* Opciones de autenticación móvil */}
                <div className="pt-4 border-t border-blue-700">
                  {status === "authenticated" ? (
                    <div className="space-y-4">
                      <div className="text-sm text-blue-300">
                        Sesión iniciada como <span className="font-semibold">{session.user.name}</span>
                      </div>
                      <Button 
                        variant="ghost" 
                        className="w-full justify-start text-lg hover:text-[#3B82F6] transition-colors p-0"
                        onClick={() => {
                          handleSignOut();
                          setIsOpen(false);
                        }}>
                        <LogOut className="h-5 w-5 mr-2" />
                        <span>Cerrar sesión</span>
                      </Button>
                    </div>
                  ) : (
                    <Link
                      href="/auth/login"
                      className="flex items-center text-lg hover:text-[#3B82F6] transition-colors"
                      onClick={() => setIsOpen(false)}>
                      <User className="h-5 w-5 mr-2" />
                      <span>Iniciar sesión</span>
                    </Link>
                  )}
                </div>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
};

export default Navbar;