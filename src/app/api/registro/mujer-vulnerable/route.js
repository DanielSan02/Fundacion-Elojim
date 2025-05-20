import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

import {
  EstratoSocial,
  GrupoEtnico,
  NivelEducativo,
  TipoDocumento,
  AreaApoyo,
} from '@prisma/client';

console.log("EstratoSocial enum:", EstratoSocial);
console.log("GrupoEtnico enum:", GrupoEtnico);

const ESTRATOS = Object.values(EstratoSocial);
const GRUPOS_ETNICOS = Object.values(GrupoEtnico);
const NIVELES_EDUCATIVOS = Object.values(NivelEducativo);
const TIPOS_DOCUMENTO = Object.values(TipoDocumento);
const AREAS_APOYO_VALIDAS = Object.values(AreaApoyo);

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
  "esMadreCabeza",
  "numeroHijos",
  "conviveConOtrasPersonas",
  "nivelEducativo",
  "tieneEmpleo",
  "motivacion",
  "tiempoSemanalDisponible",
  "expectativas",
  "aceptaTerminos"
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

  if (data.areasApoyo?.some(area => !AREAS_APOYO_VALIDAS.includes(area))) {
    throw new Error("Una o más áreas de apoyo no son válidas.");
  }

  if (data.conviveConOtrasPersonas === true && !data.conQuienesConvive) {
    throw new Error("Debe especificar con quiénes convive.");
  }

  if (data.tieneEmpleo === false && !data.fuenteIngresos) {
    throw new Error("Debe indicar la fuente de ingresos si no tiene empleo.");
  }

  if (data.tieneApoyoGubernamental === true && !data.tipoApoyoGubernamental) {
    throw new Error("Debe especificar el tipo de apoyo gubernamental.");
  }
}

export async function POST(request) {
  try {
    const data = await request.json();

    validarDatos(data);

    const nuevoRegistro = await prisma.registroMujerVulnerable.create({
      data: {
        nombreCompleto: data.nombreCompleto,
        tipoDocumento: data.tipoDocumento,
        numeroDocumento: data.numeroDocumento,
        fechaNacimiento: new Date(data.fechaNacimiento),
        comuna: data.comuna,
        estratoSocial: data.estratoSocial,
        edad: parseInt(data.edad),
        grupoEtnico: data.grupoEtnico,
        telefonoContacto: data.telefonoContacto,
        correoElectronico: data.correoElectronico || null,
        direccion: data.direccion,

        esMadreCabeza: Boolean(data.esMadreCabeza),
        numeroHijos: parseInt(data.numeroHijos),
        conviveConOtrasPersonas: Boolean(data.conviveConOtrasPersonas),
        conQuienesConvive: data.conQuienesConvive || null,
        nivelEducativo: data.nivelEducativo,
        tieneEmpleo: Boolean(data.tieneEmpleo),
        actividadLaboral: data.actividadLaboral || null,
        fuenteIngresos: data.fuenteIngresos || null,

        areasApoyo: Array.isArray(data.areasApoyo) ? data.areasApoyo : [],
        otrasAreas: data.otrasAreas || null,
        tieneApoyoGubernamental: Boolean(data.tieneApoyoGubernamental),
        tipoApoyoGubernamental: data.tipoApoyoGubernamental || null,

        motivacion: data.motivacion,
        tiempoSemanalDisponible: data.tiempoSemanalDisponible,
        expectativas: data.expectativas,
        aceptaTerminos: Boolean(data.aceptaTerminos),

      },
    });

    return NextResponse.json(nuevoRegistro, { status: 201 });
  } catch (error) {
    console.error("Error al registrar mujer vulnerable:", error);
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
    const registros = await prisma.registroMujerVulnerable.findMany({
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

    const registro = await prisma.registroMujerVulnerable.findUnique({
      where: { id },
    });

    if (!registro) {
      return new Response("Registro no encontrado", { status: 404 });
    }

    await prisma.registroMujerVulnerable.delete({
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