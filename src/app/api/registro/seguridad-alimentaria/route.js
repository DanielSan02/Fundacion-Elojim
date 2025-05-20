import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { EstratoSocial, GrupoEtnico, TipoDocumento } from "@prisma/client";

const CAMPOS_OBLIGATORIOS = [
  "nombreCompleto",
  "tipoDocumento",
  "numeroDocumento",
  "fechaNacimiento",
  "telefonoContacto",
  "direccion",
  "comuna",
  "estratoSocial",
  "grupoEtnico",
  "motivacion",
  "tiempoSemanal",
  "expectativas",
  "aceptaTerminos"
];

const ESTRATOS = Object.values(EstratoSocial);
const GRUPOS_ETNICOS = Object.values(GrupoEtnico);
const TIPOS_DOCUMENTO = Object.values(TipoDocumento);

function validarDatos(data) {
  for (const campo of CAMPOS_OBLIGATORIOS) {
    if (data[campo] === undefined || data[campo] === null || data[campo] === "") {
      throw new Error(`El campo '${campo}' es obligatorio.`);
    }
  }

  if (!/^\d{8,10}$/.test(data.numeroDocumento)) {
    throw new Error("El número de documento debe tener entre 8 y 10 dígitos.");
  }

  if (!/^\d{10}$/.test(data.telefono)) {
    throw new Error("El teléfono debe tener 10 dígitos.");
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

  if (data.tieneTierras && (data.hectareas === null || data.pisoTermico === "")) {
    throw new Error("Debe especificar hectáreas y piso térmico si tiene tierras.");
  }

  if (data.tieneCultivo && !data.tiposCultivo) {
    throw new Error("Debe especificar los tipos de cultivo si tiene cultivo.");
  }

  if (data.tieneHerramientas && !data.tiposHerramientas) {
    throw new Error("Debe especificar los tipos de herramientas si tiene herramientas.");
  }

  if (data.participacionPrevia && !data.proyectosAnteriores) {
    throw new Error("Debe especificar los proyectos anteriores si hubo participación previa.");
  }
}

export async function POST(request) {
  try {
    const data = await request.json();

    validarDatos(data);

    const nuevoRegistro = await prisma.registroSeguridadAlimentaria.create({
      data: {
        ...data,
        fechaNacimiento: new Date(data.fechaNacimiento),
      },
    });

    return NextResponse.json(nuevoRegistro, { status: 201 });
  } catch (error) {
    console.error("Error al registrar seguridad alimentaria:", error);
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
    const registros = await prisma.registroSeguridadAlimentaria.findMany({
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

    const registro = await prisma.registroSeguridadAlimentaria.findUnique({
      where: { id },
    });

    if (!registro) {
      return new Response("Registro no encontrado", { status: 404 });
    }

    await prisma.registroSeguridadAlimentaria.delete({
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
