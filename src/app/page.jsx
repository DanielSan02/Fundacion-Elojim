'use client'; // Marca este componente como de cliente
import MainCard from "@/components/Home/MainCard";
//import { SessionProvider } from "next-auth/react";
import NavBar from "@/components/NavBar";


export default function Home() {
  return (
    
      <div className="">
        <NavBar />
        <MainCard/>
      </div>
    
  );
}
