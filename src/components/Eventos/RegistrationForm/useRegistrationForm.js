import { useState } from "react"
import { useToast } from "@/hooks/use-toast"
import { usePrograms } from "@/context/ProgramContext"

// Hook personalizado para manejar la lógica del formulario de inscripción
export const useRegistrationForm = (program, onClose) => {
  const { registerProgram } = usePrograms()
  const { toast } = useToast()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    reason: "",
    acceptTerms: false,
  })

  // Manejar el cambio en los campos del formulario
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    })
  }

  // Manejar el envío del formulario
  const handleSubmit = (e) => {
    e.preventDefault()

    if (!formData.acceptTerms) {
      toast({
        title: "Error",
        description: "Debes aceptar los términos y condiciones para continuar.",
        variant: "destructive",
      })
      return
    }

    setIsSubmitting(true)

    // Simulación de envío de datos
    setTimeout(() => {
      registerProgram(program.id)
      setIsSubmitting(false)
      toast({
        title: "¡Inscripción exitosa!",
        description: `Te has inscrito correctamente en el ${program.title}.`,
        variant: "default",
      })
      onClose()
    }, 1500)
  }

  return {
    formData,
    isSubmitting,
    handleChange,
    handleSubmit,
  }
}
