import { useState } from "react"
import { usePrograms } from "@/context/ProgramContext"
import { useToast } from "@/hooks/use-toast"
import { events } from "@/data/events"

// Hook personalizado para manejar la lógica de los eventos
export const useEventLogic = (program) => {
  const { registerEvent, isEventRegistered } = usePrograms()
  const { toast } = useToast()
  const [registering, setRegistering] = useState(null)

  // Filtrar eventos por programa
  const programEvents = events.filter((event) => event.programId === program.id)

  // Ordenar eventos por fecha
  const sortedEvents = [...programEvents].sort((a, b) => new Date(a.date) - new Date(b.date))

  // Formatear la fecha para mostrar
  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("es-ES", {
      day: "numeric",
      month: "long",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  // Manejar el registro a un evento
  const handleRegister = (eventId) => {
    setRegistering(eventId)

    // Simulación de registro
    setTimeout(() => {
      registerEvent(eventId)
      setRegistering(null)
      toast({
        title: "¡Registro exitoso!",
        description: "Te has registrado correctamente en este evento.",
        variant: "default",
      })
    }, 1000)
  }

  return {
    registering,
    sortedEvents,
    handleRegister,
    formatDate,
    isEventRegistered,
  }
}
