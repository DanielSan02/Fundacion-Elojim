import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/route";

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
  "Otros"
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

    const session = await getServerSession(authOptions);
    const userId = Number(session?.user?.id);

    if (!userId) {
      return NextResponse.json({ error: "Usuario no autenticado" }, { status: 401 });
    }

    const data = await request.json();
    

    validarDatos(data);

    const {
      otrasAreasInteres, // ❌ no existe en el modelo
      ...restData
    } = data;
    

    const nuevoRegistro = await prisma.registroVoluntariado.create({
      data: {
        ...restData,
        fechaNacimiento: new Date(data.fechaNacimiento),
        areasInteres: data.areasInteres || [],
        diasEspecificos: data.diasEspecificos || null,
        otrasAreas: data.otrasAreas || null,
        referencia1Nombre: data.referencia1Nombre || null,
        referencia1Telefono: data.referencia1Telefono || null,
        referencia2Nombre: data.referencia2Nombre || null,
        referencia2Telefono: data.referencia2Telefono || null,
        usuario: {
          connect: { id: userId },
        },
      },
    });

    
    return NextResponse.json(nuevoRegistro, { status: 201 });
  } catch (error) {
    
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
    const registros = await prisma.registroVoluntariado.findMany({
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

    const registro = await prisma.registroVoluntariado.findUnique({
      where: { id },
    });

    if (!registro) {
      return new Response("Registro no encontrado", { status: 404 });
    }

    await prisma.registroVoluntariado.delete({
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
