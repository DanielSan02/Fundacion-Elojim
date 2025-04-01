"use client"

import { useState } from "react"
import { useToast } from "@/hooks/use-toast"
import { usePrograms } from "@/context/ProgramContext"

/**
 * Hook personalizado para manejar el envío de formularios
 */
export function useFormSubmit({
  programId,
  onSuccess,
  validationFn = null,
  successMessage = "¡Inscripción exitosa!",
  successDescription = "Te has inscrito correctamente en el programa.",
  errorMessage = "Error",
  termsErrorMessage = "Debes aceptar los términos y condiciones para continuar.",
}) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { registerProgram } = usePrograms()
  const { toast } = useToast()

  const handleSubmit = async (e, formData) => {
    e.preventDefault()

    // Validar términos y condiciones
    if (!formData.aceptaTerminos) {
      toast({
        title: errorMessage,
        description: termsErrorMessage,
        variant: "destructive",
      })
      return
    }

    // Validación personalizada si se proporciona
    if (validationFn && !validationFn(formData)) {
      return
    }

    setIsSubmitting(true)

    try {
      // Simulación de envío de datos
      await new Promise((resolve) => setTimeout(resolve, 1500))

      // Registrar en el programa
      registerProgram(programId)

      // Mostrar mensaje de éxito
      toast({
        title: successMessage,
        description: successDescription,
        variant: "default",
      })

      // Ejecutar callback de éxito
      if (onSuccess) {
        onSuccess()
      }
    } catch (error) {
      console.error("Error al enviar el formulario:", error)
      toast({
        title: "Error",
        description: "Ocurrió un error al procesar tu solicitud. Por favor, intenta nuevamente.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return {
    isSubmitting,
    handleSubmit,
  }
}

