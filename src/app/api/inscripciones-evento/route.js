import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth"; // si usas next-auth
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

// Mapa de tablas por programa

const registroProgramasMap = {
  "mujer-vulnerable": {
    table: "registroMujerVulnerable",
    emailField: "correoElectronico",
    nombreField: "nombreCompleto",
    documentoField: "numeroDocumento",
  },
  "semillero-innovacion": {
    table: "registroSemilleroInnovacion",
    emailField: "correoElectronico",
    nombreField: "nombreCompleto",
    documentoField: "numeroDocumento",
  },
  "seguridad-alimentaria": {
    table: "registroSeguridadAlimentaria",
    emailField: "correoElectronico",
    nombreField: "nombreResponsable",
    documentoField: "numeroDocumento",
  },
  "cultural": {
    table: "registroCultural",
    emailField: "correoElectronico",
    nombreField: "nombreCompleto",
    documentoField: "documentoIdentidad",
  },
  "voluntariado": {
    table: "registroVoluntariado",
    emailField: "correoElectronico",
    nombreField: "nombreCompleto",
    documentoField: "numeroDocumento",
  },
  "economia-plateada": {
    table: "registroEconomiaPlateada",
    emailField: "correoElectronico",
    nombreField: "nombreCompleto",
    documentoField: "numeroDocumento",
  },
  "taller-steam": {
  table: "registroTallerSteam",
  emailField: "correoElectronico",
  nombreField: "nombreCompleto",
  documentoField: null,
},
  "refuerzo-escolar": {
    table: "registroRefuerzoEscolar",
    emailField: "correoElectronico",
    nombreField: "nombreCompleto",
    documentoField: null, // No definido
  },
  "software-factory": {
    table: "registroSoftwareFactory",
    emailField: "correoElectronico",
    nombreField: "nombreCompleto",
    documentoField: "numeroDocumento",
  },
};

async function getDatosDelRegistro(programId, userId) {
  const config = registroProgramasMap[programId];
  if (!config) throw new Error("Programa no reconocido");

  const registro = await prisma[config.table].findFirst({
    where: { userId },
  });

  if (!registro) throw new Error("Registro no encontrado para este usuario");

  const datos = {
    nombreCompleto: registro[config.nombreField],
  };

  if (config.documentoField) {
    datos.numeroDocumento = registro[config.documentoField];
  }

  return datos;
}

export async function POST(req) {
  try {
    const { programId, eventoId } = await req.json();

    const session = await getServerSession(authOptions);
    const userId = Number(session?.user?.id);

    if (!userId || !programId || !eventoId) {
      return NextResponse.json({ message: "Faltan datos" }, { status: 400 });
    }

    const evento = await prisma.evento.findUnique({ where: { id: eventoId } });
    if (!evento) {
      return NextResponse.json({ message: "Evento no encontrado" }, { status: 404 });
    }

    const count = await prisma.inscripcionPorEvento.count({ where: { eventoId } });
    if (count >= evento.capacity) {
      return NextResponse.json({ message: "Cupo lleno" }, { status: 400 });
    }

    const { nombreCompleto, numeroDocumento } = await getDatosDelRegistro(programId, userId);

    await prisma.$transaction([
      prisma.inscripcionPorEvento.create({
        data: {
          nombreCompleto,
          numeroDocumento,
          programId,
          eventoId,
        },
      }),
      prisma.evento.update({
        where: { id: eventoId },
        data: { registered: { increment: 1 } },
      }),
    ]);

    return NextResponse.json({ message: "Inscripción realizada con éxito" }, { status: 201 });
  } catch (err) {
    console.error("Error en inscripción:", err);
    return NextResponse.json({ message: err.message || "Error interno" }, { status: 500 });
  }
}

