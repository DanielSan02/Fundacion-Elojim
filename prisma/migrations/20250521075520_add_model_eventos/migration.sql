/*
  Warnings:

  - You are about to alter the column `direccion` on the `registros_mujer_vulnerable` table. The data in that column could be lost. The data in that column will be cast from `VarChar(100)` to `VarChar(30)`.
  - You are about to drop the column `edad` on the `registros_seguridad_alimentaria` table. All the data in the column will be lost.
  - You are about to alter the column `direccion` on the `registros_semillero_innovacion` table. The data in that column could be lost. The data in that column will be cast from `VarChar(100)` to `VarChar(30)`.

*/
-- CreateEnum
CREATE TYPE "ProgramaId" AS ENUM ('mujer-vulnerable', 'semillero-innovacion', 'seguridad-alimentaria', 'voluntariado', 'economia-plateada', 'cultural', 'taller-steam', 'refuerzo-escolar', 'software-factory');

-- AlterTable
ALTER TABLE "registros_mujer_vulnerable" ALTER COLUMN "direccion" SET DATA TYPE VARCHAR(30);

-- AlterTable
ALTER TABLE "registros_seguridad_alimentaria" DROP COLUMN "edad";

-- AlterTable
ALTER TABLE "registros_semillero_innovacion" ALTER COLUMN "direccion" SET DATA TYPE VARCHAR(30);

-- CreateTable
CREATE TABLE "eventos" (
    "id" SERIAL NOT NULL,
    "programId" "ProgramaId" NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "location" TEXT NOT NULL,
    "duration" TEXT NOT NULL,
    "capacity" INTEGER NOT NULL,
    "registered" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "eventos_pkey" PRIMARY KEY ("id")
);
