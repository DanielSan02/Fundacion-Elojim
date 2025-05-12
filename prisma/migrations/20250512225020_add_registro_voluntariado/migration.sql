-- CreateEnum
CREATE TYPE "TipoDisponibilidad" AS ENUM ('TIEMPO_COMPLETO', 'TIEMPO_PARCIAL', 'FINES_DE_SEMANA', 'DIAS_ESPECIFICOS');

-- CreateTable
CREATE TABLE "registros_voluntariado" (
    "id" SERIAL NOT NULL,
    "nombreCompleto" VARCHAR(100) NOT NULL,
    "tipoDocumento" "TipoDocumento" NOT NULL,
    "numeroDocumento" VARCHAR(20) NOT NULL,
    "fechaNacimiento" TIMESTAMP(3) NOT NULL,
    "telefonoContacto" VARCHAR(15) NOT NULL,
    "correoElectronico" VARCHAR(100),
    "direccion" VARCHAR(100) NOT NULL,
    "comuna" VARCHAR(50) NOT NULL,
    "estratoSocial" "EstratoSocial" NOT NULL,
    "edad" INTEGER NOT NULL,
    "grupoEtnico" "GrupoEtnico" NOT NULL,
    "nivelEducativo" "NivelEducativo" NOT NULL,
    "profesionOcupacion" VARCHAR(20) NOT NULL,
    "disponibilidadTipo" "TipoDisponibilidad" NOT NULL,
    "diasEspecificos" TEXT,
    "horasDisponibles" INTEGER NOT NULL,
    "areasInteres" TEXT[],
    "otrasAreas" VARCHAR(100),
    "habilidades" TEXT NOT NULL,
    "fundacion" VARCHAR(25) NOT NULL,
    "funcion" VARCHAR(25) NOT NULL,
    "tiempo" VARCHAR(25) NOT NULL,
    "motivacion" TEXT NOT NULL,
    "referencia1Nombre" VARCHAR(25),
    "referencia1Telefono" VARCHAR(25),
    "referencia2Nombre" VARCHAR(25),
    "referencia2Telefono" VARCHAR(25),
    "aceptaTerminos" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "registros_voluntariado_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "registros_voluntariado_numeroDocumento_key" ON "registros_voluntariado"("numeroDocumento");
