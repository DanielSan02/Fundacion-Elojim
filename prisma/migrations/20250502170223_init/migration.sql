-- CreateTable
CREATE TABLE "users" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(20) NOT NULL,
    "lastName" VARCHAR(20) NOT NULL,
    "email" TEXT NOT NULL,
    "password" VARCHAR(100) NOT NULL,
    "rolId" INTEGER NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "roles" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(50) NOT NULL,

    CONSTRAINT "roles_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "posts" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "content" TEXT,
    "authorId" INTEGER NOT NULL,
    "images" TEXT[],

    CONSTRAINT "posts_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "registros_mujer_vulnerable" (
    "id" SERIAL NOT NULL,
    "nombreCompleto" VARCHAR(100) NOT NULL,
    "tipoDocumento" VARCHAR(15) NOT NULL,
    "numeroDocumento" VARCHAR(20) NOT NULL,
    "fechaNacimiento" TIMESTAMP(3) NOT NULL,
    "comuna" VARCHAR(50) NOT NULL,
    "estratoSocial" VARCHAR(1) NOT NULL,
    "edad" INTEGER NOT NULL,
    "grupoEtnico" VARCHAR(20) NOT NULL,
    "telefonoContacto" VARCHAR(15) NOT NULL,
    "correoElectronico" VARCHAR(100),
    "direccion" VARCHAR(200) NOT NULL,
    "esMadreCabeza" BOOLEAN NOT NULL DEFAULT false,
    "numeroHijos" INTEGER NOT NULL DEFAULT 0,
    "conviveConOtrasPersonas" BOOLEAN NOT NULL DEFAULT false,
    "conQuienesConvive" VARCHAR(100),
    "nivelEducativo" VARCHAR(30) NOT NULL,
    "tieneEmpleo" BOOLEAN NOT NULL DEFAULT false,
    "actividadLaboral" VARCHAR(100),
    "fuenteIngresos" VARCHAR(100),
    "areasApoyo" TEXT[],
    "otrasAreas" VARCHAR(100),
    "tieneApoyoGubernamental" BOOLEAN NOT NULL DEFAULT false,
    "tipoApoyoGubernamental" VARCHAR(100),
    "motivacion" TEXT NOT NULL,
    "tiempoSemanalDisponible" VARCHAR(50) NOT NULL,
    "expectativas" TEXT NOT NULL,
    "aceptaTerminos" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "registros_mujer_vulnerable_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "registros_mujer_vulnerable_numeroDocumento_key" ON "registros_mujer_vulnerable"("numeroDocumento");

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_rolId_fkey" FOREIGN KEY ("rolId") REFERENCES "roles"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "posts" ADD CONSTRAINT "posts_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
