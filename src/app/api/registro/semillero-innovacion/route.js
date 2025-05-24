import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { authOptions } from "@/app/api/auth/[...nextauth]/route"
import { getServerSession } from "next-auth";


import {
  EstratoSocial,
  GrupoEtnico,
  NivelEducativo,
  TipoDocumento,
  TipoVinculacion,
} from "@prisma/client";

const areasInteresValidas = [
  "EMPRENDIMIENTO_SOCIAL",
  "TECNOLOGIA_E_INNOVACION",
  "MEDIO_AMBIENTE_Y_SOSTENIBILIDAD",
  "TRANSFORMACION_DIGITAL",
  "DESARROLLO_DE_PRODUCTOS_O_SERVICIOS",
  "OTRAS"
];

const ESTRATOS = Object.values(EstratoSocial);
const GRUPOS_ETNICOS = Object.values(GrupoEtnico);
const NIVELES_EDUCATIVOS = Object.values(NivelEducativo);
const TIPOS_DOCUMENTO = Object.values(TipoDocumento);
const TIPOS_VINCULACION = Object.values(TipoVinculacion);

const CAMPOS_OBLIGATORIOS = [
  "nombreCompleto",
  "tipoDocumento",
  "numeroDocumento",
  "fechaNacimiento",
  "comuna",
  "estratoSocial",
  "edad",
  "grupoEtnico",
  "telefonoContacto",
  "direccion",
  "tipoVinculacion",
  "nombreEntidadVinculacion",
  "nivelEducativo",
  "habilidades",
  "disponibilidad",
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

  if (!TIPOS_VINCULACION.includes(data.tipoVinculacion)) {
    throw new Error("El tipo de vinculación no es válido.");
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

  if (data.tieneProyecto === true && !data.descripcionProyecto) {
    throw new Error("Debe especificar la descripción del proyecto.");
  }
}

export async function POST(request) {
  try {
    const session = await getServerSession(authOptions);
    const userId = Number(session?.user?.id);

    if (!userId) {
      return NextResponse.json({ error: "Usuario no autenticado" }, { status: 401 });
    }

    const data = await request.json();
    validarDatos(data);

    const nuevoRegistro = await prisma.registroSemilleroInnovacion.create({
      data: {
        ...data,
        fechaNacimiento: new Date(data.fechaNacimiento),
        usuario: {
          connect: { id: userId },
        },
      },
    });

    return NextResponse.json(nuevoRegistro, { status: 201 });
  } catch (error) {
    console.error("Error al registrar en semillero de innovación:", error);
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
    const registros = await prisma.registroSemilleroInnovacion.findMany({
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

    const registro = await prisma.registroSemilleroInnovacion.findUnique({
      where: { id },
    });

    if (!registro) {
      return new Response("Registro no encontrado", { status: 404 });
    }

    await prisma.registroSemilleroInnovacion.delete({
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
