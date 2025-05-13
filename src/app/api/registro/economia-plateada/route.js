import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { EstratoSocial, GrupoEtnico, TipoDocumento, Genero } from "@prisma/client";

// Enums válidos
const ESTRATOS_VALIDOS = Object.values(EstratoSocial);
const GRUPOS_ETNICOS_VALIDOS = Object.values(GrupoEtnico);
const DOCUMENTOS_VALIDOS = Object.values(TipoDocumento);
const GENEROS_VALIDOS = Object.values(Genero);


const areasInteresValidas = [
    "Emprendimiento y negocios",
    "Educación financiera",
    "Tecnología y digitalización",
    "Salud y bienestar",
    "Voluntariado y apoyo comunitario",
    "Otras"
  ];

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
  "tipoDocumento",
  "numeroDocumento",
  "genero",
  "esPensionado",
  "trabajoAnterior",
  "ingresosAdicionales",
  "tiempoSemanal",
  "motivacion",
  "expectativas",
  "aceptaTerminos"
];

// Campos booleanos obligatorios
const CAMPOS_BOOLEANOS = [
  "esPensionado",
  "trabajoAnterior",
  "ingresosAdicionales",
  "aceptaTerminos"
];

// Validación
function validarDatos(data) {
  for (const campo of CAMPOS_OBLIGATORIOS) {
    const esBoolean = CAMPOS_BOOLEANOS.includes(campo);

    if (esBoolean) {
      if (typeof data[campo] !== "boolean") {
        throw new Error(`El campo '${campo}' debe ser booleano (true o false).`);
      }
    } else {
      if (data[campo] === undefined || data[campo] === null || data[campo] === "") {
        throw new Error(`El campo '${campo}' es obligatorio.`);
      }
    }
  }

  if (!/^\d{7,10}$/.test(data.telefonoContacto)) {
    throw new Error("El teléfono de contacto debe tener entre 7 y 10 dígitos.");
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

  if (!DOCUMENTOS_VALIDOS.includes(data.tipoDocumento)) {
    throw new Error("El tipo de documento no es válido.");
  }

  if (!GENEROS_VALIDOS.includes(data.genero)) {
    throw new Error("El género no es válido.");
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

    const nuevoRegistro = await prisma.registroEconomiaPlateada.create({
      data: {
        ...data,
        fechaNacimiento: new Date(data.fechaNacimiento),
        areasInteres: data.areasInteres || [],
      },
    });

    return NextResponse.json(nuevoRegistro, { status: 201 });
  } catch (error) {
    console.error("Error al registrar economía plateada:", error);
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
