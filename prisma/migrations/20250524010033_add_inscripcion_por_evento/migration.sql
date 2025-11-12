-- CreateTable
CREATE TABLE "inscripciones_por_evento" (
    "id" SERIAL NOT NULL,
    "emailUsuario" TEXT NOT NULL,
    "nombreCompleto" TEXT NOT NULL,
    "numeroDocumento" TEXT NOT NULL,
    "programId" TEXT NOT NULL,
    "eventoId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "inscripciones_por_evento_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "inscripciones_por_evento_numeroDocumento_eventoId_key" ON "inscripciones_por_evento"("numeroDocumento", "eventoId");
