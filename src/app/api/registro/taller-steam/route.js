import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { EstratoSocial, GrupoEtnico } from "@prisma/client";

const ESTRATOS_VALIDOS = Object.values(EstratoSocial);
const GRUPOS_ETNICOS_VALIDOS = Object.values(GrupoEtnico);

const actividadesTecnologicas = [
  "Programación básica",
  "Robótica educativa",
  "Diseño de videojuegos",
  "Inteligencia Artificial para niños",
  "Ciencia y experimentos",
  "Otras"
];

const CAMPOS_OBLIGATORIOS = [
  "nombreCompleto",
  "fechaNacimiento",
  "comuna",
  "estratoSocial",
  "edad",
  "grupoEtnico",
  "institucionEducativa",
  "cursoGrado",
  "direccion",
  "nombreAcudiente",
  "relacionNino",
  "telefonoContacto",
  "disponibilidad",
  "motivacion",
  "expectativa",
  "aceptaTerminos"
];

function validarDatos(data) {
  for (const campo of CAMPOS_OBLIGATORIOS) {
    if (data[campo] === undefined || data[campo] === null || data[campo] === "") {
      throw new Error(`El campo '${campo}' es obligatorio.`);
    }
  }

  if (!/^\d{10}$/.test(data.telefonoContacto)) {
    throw new Error("El teléfono de contacto debe tener 10 dígitos.");
  }

  if (data.correoElectronico && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.correoElectronico)) {
    throw new Error("El correo electrónico tiene un formato inválido.");
  }

  if (!ESTRATOS_VALIDOS.includes(data.estratoSocial)) {
    throw new Error("El estrato social no es válido.");
  }

  if (!GRUPOS_ETNICOS_VALIDOS.includes(data.grupoEtnico)) {
    throw new Error("El grupo étnico no es válido.");
  }

  // Validación de actividadesInteres
  if (!Array.isArray(data.actividadesInteres)) {
    throw new Error("El campo 'actividadesInteres' debe ser una lista.");
  }

  const actividadesInvalidas = data.actividadesInteres.filter(
    (actividad) => !actividadesTecnologicas.includes(actividad)
  );

  if (actividadesInvalidas.length > 0) {
    throw new Error(
      `Las siguientes actividades de interés no son válidas: ${actividadesInvalidas.join(", ")}`
    );
  }
}

export async function POST(request) {
  try {
    const data = await request.json();

    validarDatos(data);

    const nuevoRegistro = await prisma.RegistroTallerSteam.create({
      data: {
        ...data,
        fechaNacimiento: new Date(data.fechaNacimiento),
        actividadesInteres: data.actividadesInteres || [],
      },
    });

    return NextResponse.json(nuevoRegistro, { status: 201 });
  } catch (error) {
    console.error("Error al registrar taller STEAM:", error);
    return NextResponse.json(
      {
        error: error.message || "Error interno del servidor",
        stack: process.env.NODE_ENV === "development" ? error.stack : undefined,
      },
      { status: 400 }
    );
  }
}

export const config = {
  api: {
    bodyParser: {
      sizeLimit: "1mb",
    },
  },
};
