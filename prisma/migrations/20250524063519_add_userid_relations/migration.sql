/*
  Warnings:

  - Added the required column `userId` to the `registros_cultural` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `registros_economia_plateada` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `registros_mujer_vulnerable` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `registros_refuerzo_escolar` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `registros_seguridad_alimentaria` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `registros_semillero_innovacion` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `registros_software_factory` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `registros_taller_steam` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `registros_voluntariado` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "registros_cultural" ADD COLUMN     "userId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "registros_economia_plateada" ADD COLUMN     "userId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "registros_mujer_vulnerable" ADD COLUMN     "userId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "registros_refuerzo_escolar" ADD COLUMN     "userId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "registros_seguridad_alimentaria" ADD COLUMN     "userId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "registros_semillero_innovacion" ADD COLUMN     "userId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "registros_software_factory" ADD COLUMN     "userId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "registros_taller_steam" ADD COLUMN     "userId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "registros_voluntariado" ADD COLUMN     "userId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "registros_mujer_vulnerable" ADD CONSTRAINT "registros_mujer_vulnerable_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "registros_semillero_innovacion" ADD CONSTRAINT "registros_semillero_innovacion_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "registros_taller_steam" ADD CONSTRAINT "registros_taller_steam_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "registros_seguridad_alimentaria" ADD CONSTRAINT "registros_seguridad_alimentaria_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "registros_refuerzo_escolar" ADD CONSTRAINT "registros_refuerzo_escolar_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "registros_software_factory" ADD CONSTRAINT "registros_software_factory_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "registros_voluntariado" ADD CONSTRAINT "registros_voluntariado_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "registros_cultural" ADD CONSTRAINT "registros_cultural_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "registros_economia_plateada" ADD CONSTRAINT "registros_economia_plateada_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
