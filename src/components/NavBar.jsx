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

            {/* Header Gobernacion */}

            <div className="px-12 flex  text-white justify-center sm:justify-between py-2 bg-[#3266CC]">
                <div>
                    <img src="/images/gov.png" className="h-5" alt="Gob Logo" />
                </div>
                <div className="hidden sm:flex items-center gap-6">
                    <h1 className="text-lg font-normal">Ventanilla Unica</h1>
                    <h1 className="text-lg font-light">Atencion al ciudadano</h1>
                    <div className=" bg-black p-2 bg-opacity-30 rounded-sm">
                        <FaWheelchair />
                    </div>
                </div>
            </div>

            {/* Header Noticias */}
            {/* <div className="px-12 flex justify-center text-white bg-black sm:flex sm:justify-between py-2 items-center">
                <div className="flex text-lg">
                    <span className="hidden sm:block">

                        <b className="pr-2 text-sm sm:text-lg lg:text-xl ">Últimas noticias:</b>
                        <p className="text-xs sm:text-sm lg:text-lg">Gran participación en el 1er Intercolegiado de Robótica 'Neiva Te Ama'</p>
                    </span>
                </div>
                <div>
                    <input type="text" className="px-5 py-2 bg-black border border-gray-500 rounded-xl" placeholder="Buscar..." />
                </div>
            </div> */}

            {/* Main Navbar */}
            <nav className="bg-white text-black px-12 py-1 sm:px-12  md:px-12 md:py-0">
                <div className="mx-auto flex justify-between items-center">
                    <div className="flex items-center">
                        <Link href={'https://www.alcaldianeiva.gov.co/Paginas/index.aspx'}>
                            <img src="/images/alcaldia-logo.png" className="object-scale-down w-24 sm:w-32 h-12" alt="Alcaldía de Neiva" />
                        </Link>
                        <Link href={'/'}>
                            <img src="/images/sec.svg" className="object-fit h-10 sm:h-11 md:h-12" alt="Alcaldía de Neiva" />
                        </Link>
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
                            <li className="py-2 px-4 md:px-2 hover:text-gray-500 lg:py-0">Inicio</li>
                        </Link>
                        <Link href={'/requestEscenary'} >
                            <li className="py-2 px-4 md:px-2 hover:text-gray-500 lg:py-0">Solicitar Escenario</li>
                        </Link>
                        <Link href={'/'} >
                            <li className="py-2 px-4 md:px-2 hover:text-gray-500 lg:py-0">Oferta Institucional</li>
                        </Link>
                        <Link href={'/news'} >
                            <li className="py-2 px-4 md:px-2  hover:text-gray-500 lg:py-0">Notas de actualidad</li>
                        </Link>
                    </ul>

                    {/* Session Buttons */}
                    <div className="hidden md:flex justify-center items-center px-12 py-6 bg-[#F8E81F]">
                        {session=1 ? (
                            <Link href={'/auth/login'}>
                                <button className="text-black font-semibold">Iniciar sesión</button>
                            </Link>
                        ):(
                            <button className="text-black text-center font-semibold" onClick={() => signOut()}>Cerrar sesión</button>
                        )}
                    </div>
                </div>

                {/* Menu Responsive */}
                {menuOpen && (
  <div className="flex flex-col text-center md:hidden pb-2" data-testid="responsive-menu">
    <ul>
      <Link href={'/'}>
        <li className="py-2 px-4 hover:text-gray-500">Inicio</li>
      </Link>
      <Link href={'/requestEscenary'}>
        <li className="py-2 px-4 hover:text-gray-500">Solicitar Escenario</li>
      </Link>
      <Link href={'/'}>
        <li className="py-2 px-4 hover:text-gray-500">Oferta Institucional</li>
      </Link>
      <Link href={'/news'}>
        <li className="py-2 px-4 hover:text-gray-500">Notas de actualidad</li>
      </Link>
    </ul>
    {session ? (
      <>
        <p className="text-black font-semibold py-2">Bienvenido</p>
        <button className="text-black font-semibold py-2 px-4 bg-[#F8E81F]" onClick={() => signOut()}>Cerrar sesión</button>
      </>
    ) : (
      <Link href={'/auth/login'}>
        <button className="text-black font-semibold py-2 px-4 bg-[#F8E81F]">Iniciar sesión</button>
      </Link>
    )}
  </div>
)}
            </nav>
        </header>
    );
}

export default NavBar;
