import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(request, { params }) {
  const { eventoId } = params;
  const id = parseInt(eventoId, 10);
  
  if (isNaN(id)) {
    return NextResponse.json({ message: "ID inválido" }, { status: 400 });
  }

  try {
    const inscripciones = await prisma.inscripcionPorEvento.findMany({
      where: { eventoId: id },
      orderBy: { createdAt: "asc" },
    });

    return NextResponse.json(inscripciones);
  } catch (error) {
    console.error("Error al cargar participantes:", error);
    return NextResponse.json({ message: "Error al cargar participantes" }, { status: 500 });
  }
} 
