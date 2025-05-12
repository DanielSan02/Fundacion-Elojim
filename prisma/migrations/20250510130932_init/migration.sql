/*
  Warnings:

  - You are about to alter the column `direccion` on the `registros_mujer_vulnerable` table. The data in that column could be lost. The data in that column will be cast from `VarChar(200)` to `VarChar(30)`.
  - The `areasApoyo` column on the `registros_mujer_vulnerable` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Changed the type of `tipoDocumento` on the `registros_mujer_vulnerable` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `estratoSocial` on the `registros_mujer_vulnerable` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `grupoEtnico` on the `registros_mujer_vulnerable` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `nivelEducativo` on the `registros_mujer_vulnerable` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "TipoVinculacion" AS ENUM ('INSTITUCION_EDUCATIVA', 'COMUNIDAD');

-- CreateEnum
CREATE TYPE "NivelEducativo" AS ENUM ('Primaria', 'Secundaria', 'Tecnica_Tecnologica', 'Universitaria', 'Especializacion', 'Maestria', 'Doctorado', 'Ninguno');

-- CreateEnum
CREATE TYPE "EstratoSocial" AS ENUM ('E1', 'E2', 'E3', 'E4', 'E5', 'E6');

-- CreateEnum
CREATE TYPE "GrupoEtnico" AS ENUM ('Ninguno', 'Afrodescendiente', 'Indigena', 'Raizal', 'Rom_Gitano', 'Palenquero', 'Otro');

-- CreateEnum
CREATE TYPE "TipoDocumento" AS ENUM ('CC', 'TI', 'CE', 'Pasaporte');

-- CreateEnum
CREATE TYPE "AreaApoyo" AS ENUM ('CAPACITACION_Y_EMPLEO', 'EMPRENDIMIENTO', 'EDUCACION', 'SALUD_Y_BIENESTAR', 'APOYO_PSICOLOGICO_Y_SOCIAL', 'VIVIENDA_Y_SUBSIDIOS', 'OTRAS');

-- AlterTable
ALTER TABLE "registros_mujer_vulnerable" DROP COLUMN "tipoDocumento",
ADD COLUMN     "tipoDocumento" "TipoDocumento" NOT NULL,
DROP COLUMN "estratoSocial",
ADD COLUMN     "estratoSocial" "EstratoSocial" NOT NULL,
DROP COLUMN "grupoEtnico",
ADD COLUMN     "grupoEtnico" "GrupoEtnico" NOT NULL,
ALTER COLUMN "direccion" SET DATA TYPE VARCHAR(30),
DROP COLUMN "nivelEducativo",
ADD COLUMN     "nivelEducativo" "NivelEducativo" NOT NULL,
DROP COLUMN "areasApoyo",
ADD COLUMN     "areasApoyo" "AreaApoyo"[];

-- CreateTable
CREATE TABLE "registros_semillero_innovacion" (
    "id" SERIAL NOT NULL,
    "nombreCompleto" VARCHAR(100) NOT NULL,
    "tipoDocumento" "TipoDocumento" NOT NULL,
    "numeroDocumento" VARCHAR(20) NOT NULL,
    "fechaNacimiento" TIMESTAMP(3) NOT NULL,
    "comuna" VARCHAR(50) NOT NULL,
    "estratoSocial" "EstratoSocial" NOT NULL,
    "edad" INTEGER NOT NULL,
    "grupoEtnico" "GrupoEtnico" NOT NULL,
    "telefonoContacto" VARCHAR(15) NOT NULL,
    "correoElectronico" VARCHAR(100),
    "direccion" VARCHAR(30) NOT NULL,
    "tipoVinculacion" "TipoVinculacion" NOT NULL,
    "nombreEntidadVinculacion" TEXT NOT NULL,
    "nivelEducativo" "NivelEducativo" NOT NULL,
    "participacionPrevia" BOOLEAN NOT NULL DEFAULT false,
    "areasInteres" TEXT[],
    "otrasAreas" TEXT,
    "tieneProyecto" BOOLEAN NOT NULL DEFAULT false,
    "descripcionProyecto" VARCHAR(100),
    "habilidades" VARCHAR(100) NOT NULL,
    "disponibilidad" VARCHAR(100) NOT NULL,
    "motivacion" VARCHAR(100) NOT NULL,
    "expectativas" VARCHAR(100) NOT NULL,
    "aceptaTerminos" BOOLEAN NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "registros_semillero_innovacion_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "registros_semillero_innovacion_numeroDocumento_key" ON "registros_semillero_innovacion"("numeroDocumento");
