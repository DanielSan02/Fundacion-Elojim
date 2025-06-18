-- CreateEnum
CREATE TYPE "AreaInteresCultural" AS ENUM ('Musica', 'Danza', 'Manualidades', 'Maquillaje', 'Dibujo', 'Otro');

-- CreateTable
CREATE TABLE "registros_cultural" (
    "id" SERIAL NOT NULL,
    "nombreCompleto" VARCHAR(100) NOT NULL,
    "fechaNacimiento" TIMESTAMP(3) NOT NULL,
    "comuna" VARCHAR(50) NOT NULL,
    "estratoSocial" "EstratoSocial" NOT NULL,
    "edad" INTEGER NOT NULL,
    "grupoEtnico" "GrupoEtnico" NOT NULL,
    "telefonoContacto" VARCHAR(15) NOT NULL,
    "correoElectronico" VARCHAR(100),
    "direccion" VARCHAR(100) NOT NULL,
    "documentoIdentidad" VARCHAR(20) NOT NULL,
    "municipioDepartamento" VARCHAR(20) NOT NULL,
    "nivelEducativo" "NivelEducativo" NOT NULL,
    "ocupacion" VARCHAR(20) NOT NULL,
    "areaInteresPrincipal" "AreaInteresCultural" NOT NULL,
    "otraAreaInteres" VARCHAR(100),
    "formacionPrevia" BOOLEAN NOT NULL DEFAULT false,
    "detalleFormacion" VARCHAR(100),
    "perteneceGrupo" BOOLEAN NOT NULL DEFAULT false,
    "detalleGrupo" VARCHAR(100),
    "diasDisponibles" TEXT NOT NULL,
    "motivacion" TEXT NOT NULL,
    "expectativas" TEXT NOT NULL,
    "aceptaTerminos" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "registros_cultural_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "registros_cultural_documentoIdentidad_key" ON "registros_cultural"("documentoIdentidad");
