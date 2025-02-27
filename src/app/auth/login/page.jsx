"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Icons } from "@/components/ui/icons";
import Footer from "@/components/Footer";

const loginPage = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();
  const router = useRouter();
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = handleSubmit(async (data) => {
    setError(null);
    setIsLoading(true);

    try {
      const res = await signIn("credentials", {
        email: data.email,
        password: data.password,
        redirect: false,
      });

      if (res?.error) {
        setError("Credenciales incorrectas. Verifica tu correo y contraseña.");
      } else {
        router.push("/");
      }
    } catch (error) {
      setError(
        "Ocurrió un error al iniciar sesión. Por favor, intenta de nuevo."
      );
    } finally {
      setIsLoading(false);
    }
  });

  return (
    <>
      {" "}
      <div className="container flex min-h-screen w-screen flex-col items-center justify-center bg-mainBg p-4">
        <Link
          href="/"
          className="absolute left-4 top-4 md:left-8 md:top-8 inline-flex items-center justify-center text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background hover:bg-accent hover:text-accent-foreground h-10 py-2 px-4 rounded-md">
          <>
            <Icons.chevronLeft className="mr-2 h-4 w-4" />
            Volver
          </>
        </Link>

        <Card className="w-full max-w-lg bg-white shadow-lg">
          <CardHeader className="space-y-1">
            <div className="flex items-center justify-center mb-4">
              <div className="relative w-20 h-20">
                <Image
                  src="/images/logoFundación_circular2.png"
                  alt="Fundación Elohim"
                  fill
                  className="rounded-full object-cover"
                  sizes="(max-width: 80px) 100vw, 80px"
                />
              </div>
            </div>
            <CardTitle className="text-2xl font-bold text-center text-[#1B3C8C]">
              Iniciar Sesión
            </CardTitle>
          </CardHeader>
          <CardContent className="grid gap-4">
            {error && (
              <Alert variant="destructive">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            <form onSubmit={onSubmit} className="space-y-4">
              <div className="grid gap-2">
                <Label htmlFor="email">Correo electrónico</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="ejemplo@gmail.com"
                  {...register("email", {
                    required: "El correo es requerido",
                    pattern: {
                      value:
                        /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                      message: "Correo inválido",
                    },
                  })}
                />
                {errors.email && (
                  <p className="text-sm text-red-500">{errors.email.message}</p>
                )}
              </div>

              <div className="grid gap-2">
                <Label htmlFor="password">Contraseña</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="*********"
                  {...register("password", {
                    required: "La contraseña es requerida",
                    minLength: {
                      value: 4,
                      message: "La contraseña debe tener al menos 4 caracteres",
                    },
                  })}
                />
                {errors.password && (
                  <p className="text-sm text-red-500">
                    {errors.password.message}
                  </p>
                )}
              </div>

              <Button
                type="submit"
                className="w-full bg-[#1B3C8C] hover:bg-[#3B82F6] text-white transition-colors"
                disabled={isLoading}>
                {isLoading ? (
                  <>
                    <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                    Iniciando sesión...
                  </>
                ) : (
                  "Iniciar Sesión"
                )}
              </Button>
            </form>
          </CardContent>
          <CardFooter className="flex flex-col space-y-4">
            <div className="text-center text-sm">
              ¿No tienes una cuenta?{" "}
              <Link
                href="/auth/register"
                className="text-[#3B82F6] hover:underline">
                Regístrate aquí
              </Link>
            </div>
          </CardFooter>
        </Card>
      </div>
      <Footer />
    </>
  );
};

export default loginPage;
