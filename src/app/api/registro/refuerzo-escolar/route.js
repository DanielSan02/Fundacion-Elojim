// app/api/refuerzo-escolar/route.ts
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { EstratoSocial, GrupoEtnico } from "@prisma/client";

const ESTRATOS = Object.values(EstratoSocial);
const GRUPOS_ETNICOS_VALIDOS = Object.values(GrupoEtnico);
const AREAS_AYUDA_VALIDAS = [
  "Matemáticas",
  "Lectura y comprensión",
  "Escritura",
  "Ciencias naturales",
  "Inglés",
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
  "expectativas",
  "dificultadesAcademicas",
  "aceptaTerminos",
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

  if (!ESTRATOS.includes(data.estratoSocial)) {
    throw new Error("El estrato social no es válido.");
  }

  if (!GRUPOS_ETNICOS_VALIDOS.includes(data.grupoEtnico)) {
    throw new Error("El grupo étnico no es válido.");
  }

  if (!Array.isArray(data.areasAyuda)) {
    throw new Error("El campo 'areasAyuda' debe ser una lista.");
  }

  const areasInvalidas = data.areasAyuda.filter(
    (area) => !AREAS_AYUDA_VALIDAS.includes(area)
  );

  if (areasInvalidas.length > 0) {
    throw new Error(
      `Las siguientes áreas de ayuda no son válidas: ${areasInvalidas.join(", ")}`
    );
  }
}

export async function POST(request) {
  try {
    const data = await request.json();

    validarDatos(data);

    const nuevoRegistro = await prisma.registroRefuerzoEscolar.create({
      data: {
        ...data,
        fechaNacimiento: new Date(data.fechaNacimiento),
        areasAyuda: data.areasAyuda || [],
      },
    });

    return NextResponse.json(nuevoRegistro, { status: 201 });
  } catch (error) {
    console.error("Error al registrar Refuerzo Escolar:", error);
    return NextResponse.json(
      {
        error: error.message || "Error interno del servidor",
        stack: process.env.NODE_ENV === "development" ? error.stack : undefined,
      },
      { status: 400 }
    );
  }
}

export async function GET() {
  try {
    const registros = await prisma.registroRefuerzoEscolar.findMany({
      orderBy: { id: "desc" },
    });

    return new Response(JSON.stringify(registros), {
      headers: { "Content-Type": "application/json" },
      status: 200,
    });
  } catch (error) {
    console.error("❌ Error al obtener registros:", error);
    return new Response("Error al obtener registros", { status: 500 });
  }
}


export async function DELETE(req) {
  try {
    const { id } = await req.json();

    const registro = await prisma.registroRefuerzoEscolar.findUnique({
      where: { id },
    });

    if (!registro) {
      return new Response("Registro no encontrado", { status: 404 });
    }

    await prisma.registroRefuerzoEscolar.delete({
      where: { id },
    });

    return new Response("Registro eliminado exitosamente", { status: 200 });
  } catch (error) {
    console.error("❌ Error al eliminar registro:", error);
    return new Response("Error interno al eliminar registro", { status: 500 });
  }
}

export const config = {
  api: {
    bodyParser: {
      sizeLimit: "1mb",
    },
  },
};
