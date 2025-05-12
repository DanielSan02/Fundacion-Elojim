import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

import {
  EstratoSocial,
  GrupoEtnico,
  NivelEducativo,
  TipoDocumento,
  TipoDisponibilidad,
} from "@prisma/client";

const ESTRATOS = Object.values(EstratoSocial);
const GRUPOS_ETNICOS = Object.values(GrupoEtnico);
const NIVELES_EDUCATIVOS = Object.values(NivelEducativo);
const TIPOS_DOCUMENTO = Object.values(TipoDocumento);
const TIPOS_DISPONIBILIDAD = Object.values(TipoDisponibilidad);


const areasInteresValidas = [
  "Educación",
  "Medio ambiente",
  "Apoyo psicosocial",
  "Gestión administrativa",
  "Comunicación y redes sociales",
  "Actividades recreativas",
  "Logística y eventos",
  "Visitar comunidades para entrega de alimentos",
];

const CAMPOS_OBLIGATORIOS = [
  "nombreCompleto",
  "tipoDocumento",
  "numeroDocumento",
  "fechaNacimiento",
  "telefonoContacto",
  "direccion",
  "comuna",
  "estratoSocial",
  "edad",
  "grupoEtnico",
  "nivelEducativo",
  "profesionOcupacion",
  "disponibilidadTipo",
  "horasDisponibles",
  "habilidades",
  "motivacion",
  "fundacion",      
  "funcion",        
  "tiempo",  
  "aceptaTerminos"
];

function validarDatos(data) {
  for (const campo of CAMPOS_OBLIGATORIOS) {
    if (
      data[campo] === undefined ||
      data[campo] === null ||
      data[campo] === ""
    ) {
      throw new Error(`El campo '${campo}' es obligatorio.`);
    }
  }

  if (!/^\d{8,10}$/.test(data.numeroDocumento)) {
    throw new Error("El número de documento debe tener entre 8 y 10 dígitos.");
  }

  if (!/^\d{10}$/.test(data.telefonoContacto)) {
    throw new Error("El teléfono de contacto debe tener 10 dígitos.");
  }

  if (data.correoElectronico && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.correoElectronico)) {
    throw new Error("El correo electrónico tiene un formato inválido.");
  }

  if (!TIPOS_DOCUMENTO.includes(data.tipoDocumento)) {
    throw new Error("El tipo de documento no es válido.");
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

  if (!TIPOS_DISPONIBILIDAD.includes(data.disponibilidadTipo)) {
    throw new Error("El tipo de disponibilidad no es válido.");
  }

  // Validación de actividadesInteres
  if (!Array.isArray(data.areasInteres)) {
    throw new Error("El campo 'areasInteres' debe ser una lista.");
  }

  const areasInvalidas = data.areasInteres.filter(
    (area) => !areasInteresValidas.includes(area)
  );

  if (areasInvalidas.length > 0) {
    throw new Error(
      `Las siguientes áreas de interés no son válidas: ${areasInvalidas.join(", ")}`
    );
  }

}

export async function POST(request) {
  try {
    const data = await request.json();

    validarDatos(data);

    const nuevoRegistro = await prisma.registroVoluntariado.create({
      data: {
        ...data,
        fechaNacimiento: new Date(data.fechaNacimiento),
        areasInteres: data.areasInteres || [],
        diasEspecificos: data.diasEspecificos || null,
        otrasAreas: data.otrasAreas || null,
        referencia1Nombre: data.referencia1Nombre || null,
        referencia1Telefono: data.referencia1Telefono || null,
        referencia2Nombre: data.referencia2Nombre || null,
        referencia2Telefono: data.referencia2Telefono || null,
      },
    });

    return NextResponse.json(nuevoRegistro, { status: 201 });
  } catch (error) {
    console.error("Error al registrar voluntariado:", error);
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
