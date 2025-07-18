// lib/getDatosDelRegistro.js
import { prisma } from "@/lib/prisma";

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
    documentoField: null,
  },
  "software-factory": {
    table: "registroSoftwareFactory",
    emailField: "correoElectronico",
    nombreField: "nombreCompleto",
    documentoField: "numeroDocumento",
  },
};

export async function getDatosDelRegistro(programId, userId) {
  const config = registroProgramasMap[programId];
  if (!config) throw new Error("Programa no reconocido");

  const registro = await prisma[config.table].findFirst({
    where: {
      userId: userId,
    },
  });

  if (!registro) throw new Error("No se encontró el registro del usuario para este programa");

  if (!config.documentoField) {
    throw new Error(`El programa '${programId}' no tiene definido campo de documento`);
  }

  return {
    nombreCompleto: registro[config.nombreField],
    numeroDocumento: registro[config.documentoField],
  };
}