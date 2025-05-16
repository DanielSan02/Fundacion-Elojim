"use client"

import { useState } from "react"
import { useToast } from "@/hooks/use-toast"
import { usePrograms } from "@/context/ProgramContext"

// Función para transformar los datos del formulario de voluntariado
function transformVoluntariadoDataForApi(formData) {
  return {
    nombreCompleto: formData.nombreCompleto,
    tipoDocumento: formData.tipoDocumento,
    numeroDocumento: formData.numeroDocumento,
    fechaNacimiento: formData.fechaNacimiento,
    direccion: formData.direccion,
    telefonoContacto: formData.telefonoContacto,
    correoElectronico: formData.correoElectronico,
    comuna: formData.comuna,
    estratoSocial: formData.estratoSocial,
    edad: parseInt(formData.edad, 10),
    grupoEtnico: formData.grupoEtnico,
    nivelEducativo: formData.nivelEducativo,
    profesionOcupacion: formData.profesionOcupacion,
    disponibilidadTipo: formData.disponibilidad,
    diasEspecificos: formData.diasEspecificos,
    horasDisponibles: parseInt(formData.horasDisponibles, 10),
    areasInteres: formData.areasInteres,
    otrasAreas: formData.otrasAreas,
    habilidades: formData.habilidades,
    motivacion: formData.motivacion,
    fundacion: formData.experienciaPrevia?.fundacion,
    funcion: formData.experienciaPrevia?.funcion,
    tiempo: formData.experienciaPrevia?.tiempo,
    referencia1Nombre: formData.referencias?.[0]?.nombre,
    referencia1Telefono: formData.referencias?.[0]?.telefono,
    referencia2Nombre: formData.referencias?.[1]?.nombre,
    referencia2Telefono: formData.referencias?.[1]?.telefono,
    aceptaTerminos: formData.aceptaTerminos,
  };
}

// Función para transformar los datos del formulario cultural
function transformCulturalDataForApi(formData) {
  return {
    nombreCompleto: formData.nombreCompleto,
    fechaNacimiento: formData.fechaNacimiento,
    comuna: formData.comuna,
    estratoSocial: formData.estratoSocial,
    edad: parseInt(formData.edad, 10),
    grupoEtnico: formData.grupoEtnico,
    telefonoContacto: formData.telefonoContacto,
    direccion: formData.direccion,
    documentoIdentidad: formData.documentoIdentidad,
    municipioDepartamento: formData.municipioDepartamento,
    nivelEducativo: formData.nivelEducativo,
    ocupacion: formData.ocupacion,
    areaInteresPrincipal: formData.areaInteres === 'Otro' ? formData.otraArea : formData.areaInteres,
    formacionPrevia: formData.formacionPrevia === 'si',
    detalleFormacion: formData.detalleFormacion,
    perteneceGrupo: formData.perteneceGrupo === 'si',
    detalleGrupo: formData.detalleGrupo,
    diasDisponibles: formData.diasDisponibles,
    motivacion: formData.motivacion,
    expectativas: formData.expectativas,
    aceptaTerminos: formData.aceptaTerminos,
  };
}

function transformEconomiaPDataForApi(formData) {
  return {
    nombreCompleto: formData.nombreCompleto,
    tipoDocumento: formData.tipoDocumento,
    numeroDocumento: formData.numeroDocumento,
    fechaNacimiento: formData.fechaNacimiento,
    comuna: formData.comuna,
    estratoSocial: formData.estratoSocial,
    edad: parseInt(formData.edad, 10),
    grupoEtnico: formData.grupoEtnico,
    genero: formData.genero,
    telefonoContacto: formData.telefonoContacto,
    correoElectronico: formData.correoElectronico,
    direccion: formData.direccion,
    esPensionado: formData.esPensionado === 'si',
    actividadEconomica: formData.actividadEconomica,
    trabajoAnterior: formData.trabajoAnterior === 'si',
    sectorTrabajo: formData.sectorTrabajo,
    ingresosAdicionales: formData.ingresosAdicionales === 'si',
    fuenteIngresos: formData.fuenteIngresos,
    areasInteres: formData.areasInteres,
    otrasAreas: formData.otrasAreas,
    habilidades: formData.habilidades,
    tiempoSemanal: formData.tiempoSemanal,
    motivacion: formData.motivacion,
    expectativas: formData.expectativas,
    aceptaTerminos: formData.aceptaTerminos,
  };
}

export function useFormSubmit({
  programId,
  onSuccess,
  validationFn = null,
  successMessage = "¡Inscripción exitosa!",
  successDescription = "Te has inscrito correctamente en el programa.",
  errorMessage = "Error",
  termsErrorMessage = "Debes aceptar los términos y condiciones para continuar.",
}) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { registerProgram } = usePrograms();
  const { toast } = useToast();

  const handleSubmit = async (e, formData) => {
    e.preventDefault();

    if (!formData.aceptaTerminos) {
      toast({
        title: errorMessage,
        description: termsErrorMessage,
        variant: "destructive",
      });
      return;
    }

    if (validationFn && !validationFn(formData)) {
      return;
    }

    setIsSubmitting(true);

    try {
      let payload;
      let endpoint;

      if (programId === "voluntariado") {
        payload = transformVoluntariadoDataForApi(formData);
        endpoint = "/api/registro/voluntariado";
      } else if (programId === "cultural") {
        payload = transformCulturalDataForApi(formData);
        endpoint = "/api/registro/cultural";
      } else if (programId === "economia-plateada") {
        payload = transformEconomiaPDataForApi(formData);
        endpoint = "/api/registro/economia-plateada";
      } else if (programId === "otroFormulario") {
        throw new Error(`Función de transformación y endpoint no definidos para: ${programId}`);
      } else {
        throw new Error(`ID de programa no válido: ${programId}`);
      }

      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData?.error || "Error desconocido");
      }

      registerProgram(programId);

      toast({
        title: successMessage,
        description: successDescription,
        variant: "default",
      });

      if (onSuccess) {
        onSuccess();
      }
    } catch (error) {
      console.error("Error al enviar el formulario:", error);
      toast({
        title: "Error",
        description:
          error.message ||
          "Ocurrió un error al procesar tu solicitud. Por favor, intenta nuevamente.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    isSubmitting,
    handleSubmit,
  };
}