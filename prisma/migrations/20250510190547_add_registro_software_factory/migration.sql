-- CreateTable
CREATE TABLE "registros_software_factory" (
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
    "modalidadVinculacion" VARCHAR(50) NOT NULL,
    "institucionEducativa" VARCHAR(100) NOT NULL,
    "programaAcademico" VARCHAR(100) NOT NULL,
    "semestreNivel" VARCHAR(50) NOT NULL,
    "tiempoDisponible" VARCHAR(100) NOT NULL,
    "tecnologias" TEXT[],
    "proyectosRealizados" TEXT,
    "areasInteres" TEXT[],
    "otrasAreas" VARCHAR(100),
    "experienciaAgile" TEXT,
    "motivacion" TEXT NOT NULL,
    "aceptaTerminos" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "registros_software_factory_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "registros_software_factory_numeroDocumento_key" ON "registros_software_factory"("numeroDocumento");
