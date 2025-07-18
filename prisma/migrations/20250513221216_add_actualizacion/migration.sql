/*
  Warnings:

  - The values [Musica] on the enum `AreaInteresCultural` will be removed. If these variants are still used in the database, this will fail.
  - The values [Indigena] on the enum `GrupoEtnico` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "AreaInteresCultural_new" AS ENUM ('Música', 'Danza', 'Manualidades', 'Maquillaje', 'Dibujo', 'Otro');
ALTER TABLE "registros_cultural" ALTER COLUMN "areaInteresPrincipal" TYPE "AreaInteresCultural_new" USING ("areaInteresPrincipal"::text::"AreaInteresCultural_new");
ALTER TYPE "AreaInteresCultural" RENAME TO "AreaInteresCultural_old";
ALTER TYPE "AreaInteresCultural_new" RENAME TO "AreaInteresCultural";
DROP TYPE "AreaInteresCultural_old";
COMMIT;

-- AlterEnum
BEGIN;
CREATE TYPE "GrupoEtnico_new" AS ENUM ('Ninguno', 'Afrodescendiente', 'Indígena', 'Raizal', 'Rom_Gitano', 'Palenquero', 'Otro');
ALTER TABLE "registros_mujer_vulnerable" ALTER COLUMN "grupoEtnico" TYPE "GrupoEtnico_new" USING ("grupoEtnico"::text::"GrupoEtnico_new");
ALTER TABLE "registros_semillero_innovacion" ALTER COLUMN "grupoEtnico" TYPE "GrupoEtnico_new" USING ("grupoEtnico"::text::"GrupoEtnico_new");
ALTER TABLE "registros_taller_steam" ALTER COLUMN "grupoEtnico" TYPE "GrupoEtnico_new" USING ("grupoEtnico"::text::"GrupoEtnico_new");
ALTER TABLE "registros_seguridad_alimentaria" ALTER COLUMN "grupoEtnico" TYPE "GrupoEtnico_new" USING ("grupoEtnico"::text::"GrupoEtnico_new");
ALTER TABLE "registros_refuerzo_escolar" ALTER COLUMN "grupoEtnico" TYPE "GrupoEtnico_new" USING ("grupoEtnico"::text::"GrupoEtnico_new");
ALTER TABLE "registros_software_factory" ALTER COLUMN "grupoEtnico" TYPE "GrupoEtnico_new" USING ("grupoEtnico"::text::"GrupoEtnico_new");
ALTER TABLE "registros_voluntariado" ALTER COLUMN "grupoEtnico" TYPE "GrupoEtnico_new" USING ("grupoEtnico"::text::"GrupoEtnico_new");
ALTER TABLE "registros_cultural" ALTER COLUMN "grupoEtnico" TYPE "GrupoEtnico_new" USING ("grupoEtnico"::text::"GrupoEtnico_new");
ALTER TYPE "GrupoEtnico" RENAME TO "GrupoEtnico_old";
ALTER TYPE "GrupoEtnico_new" RENAME TO "GrupoEtnico";
DROP TYPE "GrupoEtnico_old";
COMMIT;
