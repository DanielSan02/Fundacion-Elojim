'use client'
import React, { useState } from 'react'
import { GiHamburgerMenu } from "react-icons/gi";
import { FaWheelchair } from "react-icons/fa6";
import Link from 'next/link';
//import { useSession } from 'next-auth/react';  // Importamos useSession
//import {signOut} from 'next-auth/react'

function NavBar() {
    //const { data: session } = useSession();  // Usamos useSession para obtener la sesión
    const [menuOpen, setMenuOpen] = useState(false);
    let session = 1
    return (
        <header className="w-full">
            {/* Main Navbar */}
            <nav className="bg-[#1B3C8C] text-black px-12 py-1 sm:px-12  md:px-12 md:py-0">
                <div className=" flex justify-between items-center">
                        <Link href='' className='flex'>
                            <img src="/images/logoFundación.jpg" className="object-left w-24 sm:w-32 h-12 rounded" alt="Fundación Elojim" />
                        </Link>
                        
                        
                    <div className="flex items-center">
                        
                    </div>

                    {/* Hamburger Menu */}
                    <button
                        aria-label='hamburgerMenu'
                        className="md:hidden text-black focus:outline-none"
                        onClick={() => setMenuOpen(!menuOpen)}
                    >
                        <GiHamburgerMenu />
                    </button>

                    {/* Menu */}
                    <ul
                        className={`${menuOpen ? 'block' : 'hidden'} md:flex gap-2 md:gap-0 text-center items-center md:text-sm lg:text-base absolute md:static bg-white w-full md:w-auto top-full left-0 md:top-auto md:left-auto md:bg-transparent shadow md:shadow-none`}
                    >
                        <Link href={'/'} >
                            <li className="py-2 px-4 md:px-2 hover:text-gray-500 text-white lg:py-0">Inicio</li>
                        </Link>
                        <Link href={'/Nosotros'} >
                            <li className="py-2 px-4 md:px-2 hover:text-gray-500 lg:py-0 text-white">Nosotros</li>
                        </Link>
                        <Link href={'/'} >
                            <li className="py-2 px-4 md:px-2 hover:text-gray-500 lg:py-0 text-white">Programas</li>
                        </Link>
                        <Link href={'/news'} >
                            <li className="py-2 px-4 md:px-2  hover:text-gray-500 lg:py-0 text-white">Contacto</li>
                        </Link>
                    </ul>

                    {/* Session Buttons */}
                    <div className="hidden md:flex justify-center items-center px-12 py-6 bg-[#3B82F6]">
                        {session=1 ? (
                            <Link href={'/auth/login'}>
                                <button className="text-white font-semibold">Iniciar sesión</button>
                            </Link>
                        ):(
                            <button className="text-white text-center font-semibold" onClick={() => signOut()}>Cerrar sesión</button>
                        )}
                    </div>
                </div>

                {/* Menu Responsive */}
                {menuOpen && (
  <div className="flex flex-col text-center md:hidden pb-2" data-testid="responsive-menu">
    <ul>
      <Link href={'/'}>
        <li className="py-2 px-4 hover:text-gray-500 text-white">Inicio</li>
      </Link>
      <Link href={'/requestEscenary'}>
        <li className="py-2 px-4 hover:text-gray-500 text-white">Nosotros</li>
      </Link>
      <Link href={'/'}>
        <li className="py-2 px-4 hover:text-gray-500 text-white">Programas</li>
      </Link>
      <Link href={'/news'}>
        <li className="py-2 px-4 hover:text-gray-500 text-white">Contacto</li>
      </Link>
    </ul>
    {session ? (
      <>
        <p className="text-black font-semibold py-2">Bienvenido</p>
        <button className="text-white font-semibold py-2 px-4 bg-[#3B82F6]" onClick={() => signOut()}>Cerrar sesión</button>
      </>
    ) : (
      <Link href={'/auth/login'}>
        <button className="text-white font-semibold py-2 px-4 bg-[#3B82F6]">Iniciar sesión</button>
      </Link>
    )}
  </div>
)}
            </nav>
        </header>
    );
}

export default NavBar;
