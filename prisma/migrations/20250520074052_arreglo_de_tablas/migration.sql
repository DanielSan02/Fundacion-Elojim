/*
  Warnings:

  - Added the required column `edad` to the `registros_seguridad_alimentaria` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "registros_mujer_vulnerable" ALTER COLUMN "direccion" SET DATA TYPE VARCHAR(100);

-- AlterTable
ALTER TABLE "registros_seguridad_alimentaria" ADD COLUMN     "edad" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "registros_semillero_innovacion" ALTER COLUMN "direccion" SET DATA TYPE VARCHAR(100);
