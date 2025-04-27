// app/access-denied/page.jsx
"use client"

import { useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function AccessDenied() {
  const { data: session } = useSession();
  const router = useRouter();
  
  useEffect(() => {
    // Si no hay sesión, redirigir al login
    if (!session) {
      router.push("/auth/login");
    }
  }, [session, router]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="p-8 bg-white rounded-lg shadow-md max-w-md w-full">
        <h1 className="text-2xl font-bold text-red-600 mb-4">Acceso Denegado</h1>
        <p className="text-gray-700 mb-6">
          No tienes los permisos necesarios para acceder a esta sección.
          Esta área está reservada para usuarios con roles específicos.
        </p>
        <div className="flex justify-center">
          <Link href="/" className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors">
            Volver al inicio
          </Link>
        </div>
      </div>
    </div>
  );
}