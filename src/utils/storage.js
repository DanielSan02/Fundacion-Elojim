// Funciones para manejar el almacenamiento local

export const getStoredPrograms = () => {
    if (typeof window === "undefined") return []
  
    try {
      const storedPrograms = localStorage.getItem("userPrograms")
      return storedPrograms ? JSON.parse(storedPrograms) : []
    } catch (error) {
      console.error("Error loading programs from localStorage:", error)
      return []
    }
  }
  
  export const storePrograms = (programs) => {
    if (typeof window === "undefined") return
  
    try {
      localStorage.setItem("userPrograms", JSON.stringify(programs))
    } catch (error) {
      console.error("Error storing programs in localStorage:", error)
    }
  }
  
  export const getStoredEvents = () => {
    if (typeof window === "undefined") return []
  
    try {
      const storedEvents = localStorage.getItem("userEvents")
      return storedEvents ? JSON.parse(storedEvents) : []
    } catch (error) {
      console.error("Error loading events from localStorage:", error)
      return []
    }
  }
  
  export const storeEvents = (events) => {
    if (typeof window === "undefined") return
  
    try {
      localStorage.setItem("userEvents", JSON.stringify(events))
    } catch (error) {
      console.error("Error storing events in localStorage:", error)
    }
  }
  
  