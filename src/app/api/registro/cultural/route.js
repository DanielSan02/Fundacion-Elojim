import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

import {
  EstratoSocial,
  GrupoEtnico,
  NivelEducativo,
  AreaInteresCultural,
} from "@prisma/client";

// Enums válidos
const ESTRATOS = Object.values(EstratoSocial);
const GRUPOS_ETNICOS = Object.values(GrupoEtnico);
const NIVELES_EDUCATIVOS = Object.values(NivelEducativo);
const AREAS_INTERES = Object.values(AreaInteresCultural);

// Campos obligatorios
const CAMPOS_OBLIGATORIOS = [
  "nombreCompleto",
  "fechaNacimiento",
  "comuna",
  "estratoSocial",
  "edad",
  "grupoEtnico",
  "telefonoContacto",
  "direccion",
  "documentoIdentidad",
  "municipioDepartamento",
  "nivelEducativo",
  "ocupacion",
  "areaInteresPrincipal",
  "formacionPrevia",
  "perteneceGrupo",
  "diasDisponibles",
  "motivacion",
  "expectativas",
  "aceptaTerminos",
];

function validarDatos(data) {
  for (const campo of CAMPOS_OBLIGATORIOS) {
    if (data[campo] === undefined || data[campo] === null || data[campo] === "") {
      throw new Error(`El campo '${campo}' es obligatorio.`);
    }
  }

  if (!/^\d{8,10}$/.test(data.documentoIdentidad)) {
    throw new Error("El documento de identidad debe tener entre 8 y 10 dígitos.");
  }

  if (!/^\d{10}$/.test(data.telefonoContacto)) {
    throw new Error("El teléfono de contacto debe tener 10 dígitos.");
  }

  if (data.correoElectronico && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.correoElectronico)) {
    throw new Error("El correo electrónico tiene un formato inválido.");
  }

  if (!ESTRATOS.includes(data.estratoSocial)) {
    throw new Error("El estrato social no es válido.");
  }

  if (!GRUPOS_ETNICOS.includes(data.grupoEtnico)) {
    throw new Error("El grupo étnico no es válido.");
  }

  if (!NIVELES_EDUCATIVOS.includes(data.nivelEducativo)) {
    throw new Error("El nivel educativo no es válido.");
  }

  if (!AREAS_INTERES.includes(data.areaInteresPrincipal)) {
    throw new Error("El área de interés principal no es válida.");
  }

  if (data.formacionPrevia === true && !data.detalleFormacion) {
    throw new Error("Debe detallar la formación previa.");
  }

  if (data.perteneceGrupo === true && !data.detalleGrupo) {
    throw new Error("Debe detallar el grupo cultural al que pertenece.");
  }
}

export async function POST(request) {
  try {
    const data = await request.json();

    validarDatos(data);

    const nuevoRegistro = await prisma.registroCultural.create({
      data: {
        ...data,
        fechaNacimiento: new Date(data.fechaNacimiento),
      },
    });

    return NextResponse.json(nuevoRegistro, { status: 201 });
  } catch (error) {
    console.error("Error al registrar participante cultural:", error);
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
