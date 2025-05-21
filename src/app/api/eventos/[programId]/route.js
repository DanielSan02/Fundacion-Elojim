import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { Prisma } from "@prisma/client";

const programIdMap = {
  "mujer-vulnerable": "MUJER_VULNERABLE",
  "semillero-innovacion": "SEMILLERO_INNOVACION",
  "seguridad-alimentaria": "SEGURIDAD_ALIMENTARIA",
  "voluntariado": "VOLUNTARIADO",
  "economia-plateada": "ECONOMIA_PLATEADA",
  "cultural": "CULTURAL",
  "taller-steam": "TALLER_STEAM",
  "refuerzo-escolar": "REFUERZO_ESCOLAR",
  "software-factory": "SOFTWARE_FACTORY",
};

function validateProgramId(rawProgramId) {
  return programIdMap[rawProgramId] || null;
}

function validateEventoData(data) {
  const { title, description, date, location, duration, capacity } = data;

  if (
    !title?.trim() ||
    !description?.trim() ||
    !date ||
    !location?.trim() ||
    !duration?.trim() ||
    !capacity ||
    typeof capacity !== "number" ||
    capacity <= 0
  ) {
    return "Faltan datos obligatorios o datos inválidos.";
  }

  const parsedDate = new Date(date);
  if (isNaN(parsedDate.getTime())) {
    return "Fecha inválida.";
  }

  if (location.length > 255 || duration.length > 100) {
    return "Los campos de ubicación o duración son demasiado largos.";
  }

  return null;
}

export async function GET(request, { params }) {
  try {
    const { programId: rawProgramId } = params;
    const programId = validateProgramId(rawProgramId);

    if (!programId) {
      return NextResponse.json(
        { message: `programId inválido: ${rawProgramId}` },
        { status: 400 }
      );
    }

    const eventos = await prisma.evento.findMany({
      where: { programId },
      orderBy: { date: "asc" },
    });

    return NextResponse.json(eventos, { status: 200 });
  } catch (error) {
    console.error("Error al obtener eventos:", error);
    return NextResponse.json(
      { message: "Error interno del servidor" },
      { status: 500 }
    );
  }
}

export async function POST(request, { params }) {
  try {
    const { programId: rawProgramId } = params;
    const programId = validateProgramId(rawProgramId);

    if (!programId) {
      return NextResponse.json(
        { message: `programId inválido: ${rawProgramId}` },
        { status: 400 }
      );
    }

    const body = await request.json();
    const validationError = validateEventoData(body);

    if (validationError) {
      return NextResponse.json({ message: validationError }, { status: 400 });
    }

    const { title, description, date, location, duration, capacity } = body;
    const parsedDate = new Date(date);

    const eventoCreado = await prisma.evento.create({
      data: {
        title: title.trim(),
        description: description.trim(),
        date: parsedDate,
        location: location.trim(),
        duration: duration.trim(),
        capacity,
        programId,
      },
    });

    return NextResponse.json(eventoCreado, { status: 201 });
  } catch (error) {
    console.error("Error al crear evento:", error);

    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      return NextResponse.json(
        { message: `Error de base de datos: ${error.message}` },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { message: "Error interno del servidor" },
      { status: 500 }
    );
  }
}

export async function DELETE(request, { params }) {
  try {
    const { programId: rawProgramId } = params;
    const programId = validateProgramId(rawProgramId);

    if (!programId) {
      return NextResponse.json(
        { message: `programId inválido: ${rawProgramId}` },
        { status: 400 }
      );
    }

    const { searchParams } = new URL(request.url);
    const eventId = searchParams.get("eventId");

    if (!eventId) {
      return NextResponse.json(
        { message: "Falta el parámetro eventId para eliminar el evento." },
        { status: 400 }
      );
    }

    const id = parseInt(eventId, 10);
    if (isNaN(id)) {
      return NextResponse.json(
        { message: "eventId debe ser un número válido." },
        { status: 400 }
      );
    }

    const evento = await prisma.evento.findUnique({
      where: { id },
    });

    if (!evento) {
      return NextResponse.json(
        { message: "Evento no encontrado." },
        { status: 404 }
      );
    }

    if (evento.programId !== programId) {
      return NextResponse.json(
        { message: "El evento no pertenece al programa indicado." },
        { status: 400 }
      );
    }

    await prisma.evento.delete({
      where: { id },
    });

    return NextResponse.json(
      { message: "Evento eliminado correctamente." },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error al eliminar evento:", error);

    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      return NextResponse.json(
        { message: `Error de base de datos: ${error.message}` },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { message: "Error interno del servidor" },
      { status: 500 }
    );
  }
}

export async function PUT(request, { params }) {
  try {
    const { programId: rawProgramId } = params;
    const programId = validateProgramId(rawProgramId);

    if (!programId) {
      return NextResponse.json(
        { message: `programId inválido: ${rawProgramId}` },
        { status: 400 }
      );
    }

    // Obtener eventId del cuerpo en lugar de los query params
    const body = await request.json();
    const { id: eventId, ...updateData } = body;

    if (!eventId) {
      return NextResponse.json(
        { message: "Falta el ID del evento en el cuerpo de la solicitud." },
        { status: 400 }
      );
    }

    const id = parseInt(eventId, 10);
    if (isNaN(id)) {
      return NextResponse.json(
        { message: "eventId debe ser un número válido." },
        { status: 400 }
      );
    }

    // Verificar que el evento exista y pertenezca al programa
    const eventoExistente = await prisma.evento.findUnique({
      where: { id },
    });

    if (!eventoExistente) {
      return NextResponse.json(
        { message: "Evento no encontrado." },
        { status: 404 }
      );
    }

    if (eventoExistente.programId !== programId) {
      return NextResponse.json(
        { message: "El evento no pertenece al programa indicado." },
        { status: 400 }
      );
    }

    // Preparar datos para actualización
    const dataToUpdate = {};

    if (updateData.title) {
      if (!updateData.title.trim()) {
        return NextResponse.json(
          { message: "El título no puede estar vacío." },
          { status: 400 }
        );
      }
      dataToUpdate.title = updateData.title.trim();
    }

    if (updateData.description) {
      if (!updateData.description.trim()) {
        return NextResponse.json(
          { message: "La descripción no puede estar vacía." },
          { status: 400 }
        );
      }
      dataToUpdate.description = updateData.description.trim();
    }

    if (updateData.date) {
      const parsedDate = new Date(updateData.date);
      if (isNaN(parsedDate.getTime())) {
        return NextResponse.json(
          { message: "Fecha inválida." },
          { status: 400 }
        );
      }
      dataToUpdate.date = parsedDate;
    }

    if (updateData.location) {
      if (!updateData.location.trim()) {
        return NextResponse.json(
          { message: "La ubicación no puede estar vacía." },
          { status: 400 }
        );
      }
      if (updateData.location.length > 255) {
        return NextResponse.json(
          { message: "La ubicación es demasiado larga." },
          { status: 400 }
        );
      }
      dataToUpdate.location = updateData.location.trim();
    }

    if (updateData.duration) {
      if (!updateData.duration.trim()) {
        return NextResponse.json(
          { message: "La duración no puede estar vacía." },
          { status: 400 }
        );
      }
      if (updateData.duration.length > 100) {
        return NextResponse.json(
          { message: "La duración es demasiado larga." },
          { status: 400 }
        );
      }
      dataToUpdate.duration = updateData.duration.trim();
    }

    if (updateData.capacity) {
      if (typeof updateData.capacity !== 'number' || updateData.capacity <= 0) {
        return NextResponse.json(
          { message: "La capacidad debe ser un número positivo." },
          { status: 400 }
        );
      }
      dataToUpdate.capacity = updateData.capacity;
    }

    // Si no hay nada que actualizar
    if (Object.keys(dataToUpdate).length === 0) {
      return NextResponse.json(
        { message: "No se proporcionaron datos para actualizar." },
        { status: 400 }
      );
    }

    // Actualizar el evento
    const eventoActualizado = await prisma.evento.update({
      where: { id },
      data: dataToUpdate,
    });

    return NextResponse.json(eventoActualizado, { status: 200 });
  } catch (error) {
    console.error("Error al actualizar evento:", error);

    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      return NextResponse.json(
        { message: `Error de base de datos: ${error.message}` },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { message: "Error interno del servidor" },
      { status: 500 }
    );
  }
}
