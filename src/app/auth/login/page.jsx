"use client";
import { useState } from 'react';
import { useForm } from "react-hook-form";
import { signIn } from "next-auth/react";
import { useRouter } from 'next/navigation';
import Link from 'next/link';

const LoginTest = () => {
  const { register, formState: { errors }, handleSubmit } = useForm();
  const router = useRouter();
  const [error, setError] = useState(null);

  const onSubmit = handleSubmit(async (data) => {
    setError(null);
    
    const res = await signIn('credentials', {
      email: data.email,
      password: data.password,
      redirect: false,
    });

    if (res?.error) {
      setError("Credenciales incorrectas. Verifica tu correo y contraseña.");
    } else {
      router.push('/');
    }
  });

  return (
    <div className="flex items-center justify-center min-h-screen bg-[#3B82F6] bg-opacity-20 py-2">
      <div className="bg-white p-6 rounded shadow-md w-80 flex flex-col items-center">
        <img src="/images/logoFundación_circular2.png" className="w-18 h-18 object-cover border-solid align-middle text-center items-center" alt="Fundación Elojim" />
        <h2 className="text-xl font-semibold mb-4 text-center text-[#1B3C8C]">Iniciar Sesión</h2>
        <form onSubmit={onSubmit} className="w-full">
          {error && <p className="text-red-500 text-sm mb-4 text-center">{error}</p>}
          <div className="mb-4">
            <label className="block text-sm font-medium">Correo electrónico:</label>
            <input 
              type="email" 
              {...register("email", {
                required: "El correo es requerido",
                pattern: {
                  value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                  message: "Correo inválido",
                },
              })}
              placeholder='ejemplo@gmail.com'
              className="w-full p-2 border rounded mt-1" 
            />
            {errors.email && <span className="text-red-500 text-sm">{errors.email.message}</span>}
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium">Contraseña:</label>
            <input 
              type="password" 
              {...register("password", {
                required: "La contraseña es requerida",
                minLength: {
                  value: 4,
                  message: "La contraseña debe tener al menos 4 caracteres",
                },
              })}
              placeholder='*********'
              className="w-full p-2 border rounded mt-1" 
            />
            {errors.password && <span className="text-red-500 text-sm">{errors.password.message}</span>}
          </div>
          <button type="submit" className="w-full bg-[#1B3C8C] text-white p-2 rounded hover:bg-blue-600">
            Iniciar Sesión
          </button>
        </form>
        <p className="mt-4 text-sm">¿No tienes una cuenta? <Link href="/auth/register" className='text-blue-400'>Regístrate aquí</Link></p>
      </div>
    </div>
  );
};

export default LoginTest;
