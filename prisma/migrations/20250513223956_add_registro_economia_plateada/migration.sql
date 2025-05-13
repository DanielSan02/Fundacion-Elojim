-- CreateEnum
CREATE TYPE "Genero" AS ENUM ('FEMENINO', 'MASCULINO');

-- CreateTable
CREATE TABLE "registros_economia_plateada" (
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
    "tipoDocumento" "TipoDocumento" NOT NULL,
    "numeroDocumento" VARCHAR(20) NOT NULL,
    "genero" "Genero" NOT NULL,
    "esPensionado" BOOLEAN NOT NULL DEFAULT false,
    "actividadEconomica" VARCHAR(100),
    "trabajoAnterior" BOOLEAN NOT NULL DEFAULT false,
    "sectorTrabajo" VARCHAR(100),
    "ingresosAdicionales" BOOLEAN NOT NULL DEFAULT false,
    "fuenteIngresos" VARCHAR(100),
    "areasInteres" TEXT[],
    "otrasAreas" VARCHAR(100),
    "habilidades" TEXT NOT NULL,
    "tiempoSemanal" VARCHAR(100) NOT NULL,
    "motivacion" TEXT NOT NULL,
    "expectativas" TEXT NOT NULL,
    "aceptaTerminos" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "registros_economia_plateada_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "registros_economia_plateada_numeroDocumento_key" ON "registros_economia_plateada"("numeroDocumento");
