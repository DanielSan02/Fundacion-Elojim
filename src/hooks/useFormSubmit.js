"use client"

import { useState } from "react"
import { useToast } from "@/hooks/use-toast"
import { usePrograms } from "@/context/ProgramContext"

// Importar todas las funciones de transformación desde el archivo centralizado
import {
  transformVoluntariadoDataForApi,
  transformCulturalDataForApi,
  transformEconomiaPDataForApi,
  transformMujerVulnerableDataForApi, // <-- ¡Importa esta nueva función!
  transformSemilleroDataForApi,
  transformSteamDataForAp,
  transformSeguridadAlimentariaDataForApi,
  transformRefuerzoEscolarDataForApi,
  transformSoftwareFactoryDataForApi
} from '../hooks/apiTransformers'; // Ajusta la ruta si es diferente


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

  const handleSubmit = async (formData) => { // <-- ¡Importante! Ahora solo recibe formData
   

    if (!formData.aceptaTerminos) {
      toast({
        title: errorMessage,
        description: termsErrorMessage,
        variant: "destructive",
      });
      return; // Detener la ejecución si no se aceptan los términos
    }

    // La validación `validationFn` si la usas, se ejecuta aquí
    if (validationFn && !validationFn(formData)) {
      return;
    }

    setIsSubmitting(true);

    try {
      let payload;
      let endpoint;

      // Aquí se determina qué función de transformación usar según programId
       if (programId === "voluntariado") {
        payload = transformVoluntariadoDataForApi(formData);
        endpoint = "/api/registro/voluntariado";
      } else if (programId === "cultural") {
        payload = transformCulturalDataForApi(formData);
        endpoint = "/api/registro/cultural";
      } else if (programId === "economia-plateada") {
        payload = transformEconomiaPDataForApi(formData);
        endpoint = "/api/registro/economia-plateada";
      } else if (programId === "mujer-vulnerable") {
        payload = transformMujerVulnerableDataForApi(formData);
        endpoint = "/api/registro/mujer-vulnerable";
      } else if (programId === "semillero-innovacion") {
        payload = transformSemilleroDataForApi(formData);
        endpoint = "/api/registro/semillero-innovacion";
      } else if (programId === "taller-steam") {
        payload = transformSteamDataForAp(formData);
        endpoint = "/api/registro/taller-steam";
      } else if (programId === "seguridad-alimentaria") {
        payload = transformSeguridadAlimentariaDataForApi(formData);
        endpoint = "/api/registro/seguridad-alimentaria";
      } else if (programId === "refuerzo-escolar") {
        payload = transformRefuerzoEscolarDataForApi(formData);
        endpoint = "/api/registro/refuerzo-escolar";
      } else if (programId === "software-factory") { // <--- ¡NUEVO CASO!
        payload = transformSoftwareFactoryDataForApi(formData); // <--- Llama a la nueva función
        endpoint = "/api/registro/software-factory"; // <--- Define el endpoint para este formulario
      } else {
        throw new Error(`ID de programa no manejado o transformación/endpoint no definidos para: ${programId}`);
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
        // Muestra el error específico del backend si existe
        toast({
          title: errorMessage,
          description: errorData?.error || "Error desconocido al enviar el formulario.",
          variant: "destructive",
        });
        throw new Error(errorData?.error || "Error desconocido");
      }

      // Si todo es exitoso:
      registerProgram(programId); // Registrar el programa en el contexto
      toast({
        title: successMessage,
        description: successDescription,
        variant: "default",
      });
      onSuccess?.(); // Ejecutar la función de éxito proporcionada (ej. cerrar el modal)

    } catch (error) {
      console.error("Error al enviar el formulario:", error);
      if (!error.message.includes("Error desconocido")) { // Para evitar duplicados si el error ya fue toast
          toast({
              title: "Error",
              description: error.message || "Ocurrió un error al procesar tu solicitud. Por favor, intenta nuevamente.",
              variant: "destructive",
          });
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    isSubmitting,
    handleSubmit,
  };
}