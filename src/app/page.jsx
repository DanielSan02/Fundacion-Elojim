'use client'; // Marca este componente como de cliente
//import { SessionProvider } from "next-auth/react";
import NavBar from "@/components/NavBar";


export default function Home({ session }) {
  return (
    <SessionProvider session={session}>
      <div className="">
        <NavBar />
      </div>
    </SessionProvider>
  );
}
