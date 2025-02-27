"use client";

import useRegister from "./useRegister";
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
import { Checkbox } from "@/components/ui/checkbox";
import { Icons } from "@/components/ui/icons";
import Footer from "@/components/Footer";

const registerPage = () => {
  const {
    formData,
    handleChange,
    handleSubmit,
    message,
    passwordError,
    termsError,
    isLoading,
  } = useRegister();

  return (
    <>
      <div className="container flex min-h-screen w-screen max-w-screen overflow-x-hidden flex-col items-center justify-center bg-mainBg p-4">
        {/* Botón Volver */}
        <Link
          href="/"
          className="absolute left-4 top-4 md:left-8 md:top-8 inline-flex items-center justify-center text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background hover:bg-accent hover:text-accent-foreground h-10 py-2 px-4 rounded-md">
          <>
            <Icons.chevronLeft className="mr-2 h-4 w-4" />
            Volver
          </>
        </Link>

        {/* Tarjeta de Registro */}
        <Card className="w-full max-w-lg bg-white shadow-lg mx-4">
          <CardHeader className="space-y-1 pt-6">
            {/* Contenedor del logo */}
            <div className="flex items-center justify-center mb-4">
              <Image
                src="/images/logoFundación_circular2.png"
                alt="Fundación Elohim"
                width={80}
                height={80}
                className="rounded-full w-20 h-20 md:w-24 md:h-24"
              />
            </div>
            <CardTitle className="text-xl sm:text-2xl font-bold text-center text-[#1B3C8C]">
              Crear una cuenta
            </CardTitle>
          </CardHeader>

          <CardContent className="grid gap-4 px-4 sm:px-6">
            {/* Botones de Google y Facebook */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Button
                variant="outline"
                className="w-full flex items-center justify-center">
                <Icons.google className="mr-2 h-4 w-4" />
                Google
              </Button>
              <Button
                variant="outline"
                className="w-full flex items-center justify-center">
                <Icons.facebook className="mr-2 h-4 w-4" />
                Facebook
              </Button>
            </div>

            {/* Separador */}
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-white px-2 text-muted-foreground">
                  O regístrate con email
                </span>
              </div>
            </div>

            {/* Formulario */}
            <form onSubmit={handleSubmit}>
              <div className="grid gap-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="name">Nombre</Label>
                    <Input
                      id="name"
                      name="name"
                      placeholder="Juan"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="min-w-0"
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="lastName">Apellido</Label>
                    <Input
                      id="lastName"
                      name="lastName"
                      placeholder="Pérez"
                      value={formData.lastName}
                      onChange={handleChange}
                      required
                      className="min-w-0"
                    />
                  </div>
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="juan@ejemplo.com"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="min-w-0"
                  />
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="password">Contraseña</Label>
                  <Input
                    id="password"
                    name="password"
                    type="password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                    className="min-w-0"
                  />
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="confirmPassword">Confirmar Contraseña</Label>
                  <Input
                    id="confirmPassword"
                    name="confirmPassword"
                    type="password"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    required
                    className="min-w-0"
                  />
                </div>

                {/* Checkbox de términos */}
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="terms"
                    name="termsAccepted"
                    checked={formData.termsAccepted}
                    onCheckedChange={(checked) =>
                      handleChange({
                        target: {
                          name: "termsAccepted",
                          type: "checkbox",
                          checked,
                        },
                      })
                    }
                  />
                  <label
                    htmlFor="terms"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                    Acepto los{" "}
                    <Link href="#" className="text-[#3B82F6] hover:underline">
                      términos y condiciones
                    </Link>
                  </label>
                </div>

                {/* Mensajes de error */}
                {termsError && (
                  <p className="text-destructive text-sm">{termsError}</p>
                )}
                {passwordError && (
                  <p className="text-destructive text-sm">{passwordError}</p>
                )}
                {message && (
                  <p className="text-destructive text-sm text-center">
                    {message}
                  </p>
                )}

                {/* Botón de Registro */}
                <Button
                  type="submit"
                  className="w-full bg-[#1B3C8C] hover:bg-[#3B82F6] text-white transition-colors"
                  disabled={isLoading}>
                  {isLoading ? (
                    <>
                      <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                      Por favor, espere
                    </>
                  ) : (
                    "Registrarse"
                  )}
                </Button>
              </div>
            </form>
          </CardContent>

          <CardFooter className="flex flex-col space-y-4 px-4 sm:px-6 pb-6">
            <div className="text-center text-sm">
              ¿Ya tienes una cuenta?{" "}
              <Link
                href="/auth/login"
                className="text-[#3B82F6] hover:underline">
                Iniciar sesión
              </Link>
            </div>
          </CardFooter>
        </Card>
      </div>
      <Footer />
    </>
  );
};

export default registerPage;
