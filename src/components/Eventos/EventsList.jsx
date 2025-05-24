"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, MapPin, Users } from "lucide-react";
import { usePrograms } from "@/context/ProgramContext";
import { useToast } from "@/hooks/use-toast";

export default function EventsList({ program }) {
  const { registerEvent, isEventRegistered } = usePrograms();
  const { toast } = useToast();
  const [registering, setRegistering] = useState(null);
  const [apiEvents, setApiEvents] = useState([]); // <-- Aquí guardaremos los eventos de la API
  const [loadingEvents, setLoadingEvents] = useState(true); // <-- Estado para el indicador de carga
  const [errorEvents, setErrorEvents] = useState(null); // <-- Estado para manejar errores de la API

  useEffect(() => {
    const fetchEvents = async () => {
      setLoadingEvents(true);
      setErrorEvents(null); // Limpiar errores previos
      try {
        const response = await fetch(`/api/eventos/${program.id}`);

        if (!response.ok) {
          // Si la respuesta no es 2xx, lanza un error
          const errorData = await response.json();
          throw new Error(
            errorData.message || `Error HTTP! status: ${response.status}`
          );
        }

        const data = await response.json();
        setApiEvents(data);
      } catch (error) {
        console.error("Error al cargar eventos:", error);
        setErrorEvents("No se pudieron cargar los eventos. " + error.message);
        toast({
          title: "Error al cargar eventos",
          description:
            "Hubo un problema al obtener los eventos. " + error.message,
          variant: "destructive",
        });
      } finally {
        setLoadingEvents(false);
      }
    };

    // Solo realiza la llamada si 'program' existe y tiene un 'id'
    if (program?.id) {
      fetchEvents();
    }
  }, [program?.id, toast]); // El efecto se ejecuta cuando program.id cambia

  const sortedEvents = [...apiEvents].sort(
    (a, b) => new Date(a.date) - new Date(b.date)
  );

  const handleRegister = async (eventId) => {
  setRegistering(eventId);

  try {
    const res = await fetch("/api/inscripciones-evento", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        eventoId: eventId,
        programId: program.id,
      }),
    });

    const data = await res.json();

    if (res.ok) {
      registerEvent(eventId); // actualiza el contexto local
      toast({
        title: "¡Registro exitoso!",
        description: "Te has registrado correctamente en este evento.",
        variant: "default",
      });

      // Opcional: Actualiza estado local de `apiEvents` para incrementar el contador visualmente
      setApiEvents((prev) =>
        prev.map((ev) =>
          ev.id === eventId
            ? { ...ev, registered: ev.registered + 1 }
            : ev
        )
      );
    } else {
      toast({
        title: "Error al registrarse",
        description: data.message || "No se pudo completar la inscripción.",
        variant: "destructive",
      });
    }
  } catch (error) {
    toast({
      title: "Error inesperado",
      description: error.message,
      variant: "destructive",
    });
  } finally {
    setRegistering(null);
  }
};


  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("es-ES", {
      day: "numeric",
      month: "long",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="space-y-6">
      <div>
        <h3
          className="text-2xl font-bold mb-2"
          style={{ color: program.color }}>
          Eventos de {program.title}
        </h3>
        <p className="text-gray-600 mb-6">
          Estos son los próximos eventos disponibles para este programa.
        </p>
      </div>

      {loadingEvents ? (
        <div className="text-center py-8">
          <p className="text-gray-500">Cargando eventos...</p>
        </div>
      ) : errorEvents ? (
        <div className="text-center py-8 text-red-500">
          <p>{errorEvents}</p>
        </div>
      ) : sortedEvents.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-gray-500">
            No hay eventos programados actualmente.
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          <AnimatePresence>
            {sortedEvents.map((event) => (
              <motion.div
                key={event.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.2 }}>
                <Card
                  className="overflow-hidden border-l-4"
                  style={{ borderLeftColor: program.color }}>
                  <CardContent className="p-6">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                      <div className="space-y-2">
                        <h4 className="text-lg font-semibold">{event.title}</h4>
                        <p className="text-gray-600 text-sm">
                          {event.description}
                        </p>

                        <div className="flex flex-wrap gap-y-2 gap-x-4 text-sm text-gray-500 mt-2">
                          <div className="flex items-center">
                            <Calendar className="h-4 w-4 mr-1" />
                            {formatDate(event.date)}
                          </div>
                          <div className="flex items-center">
                            <Clock className="h-4 w-4 mr-1" />
                            {event.duration}
                          </div>
                          <div className="flex items-center">
                            <MapPin className="h-4 w-4 mr-1" />
                            {event.location}
                          </div>
                          <div className="flex items-center">
                            <Users className="h-4 w-4 mr-1" />
                            {/* Los valores 'registered' y 'capacity' ahora vienen directamente del backend */}
                            {event.registered}/{event.capacity} participantes
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center space-x-2">
                        {isEventRegistered(event.id) ? (
                          <Badge className="bg-green-500 hover:bg-green-600">
                            Inscrito
                          </Badge>
                        ) : (
                          <Button
                            onClick={() => handleRegister(event.id)}
                            disabled={
                              registering === event.id ||
                              event.registered >= event.capacity
                            }
                            style={{
                              backgroundColor:
                                event.registered >= event.capacity
                                  ? undefined
                                  : program.color,
                              color:
                                event.registered >= event.capacity
                                  ? undefined
                                  : "white",
                            }}>
                            {registering === event.id
                              ? "Procesando..."
                              : event.registered >= event.capacity
                              ? "Cupo lleno"
                              : "Inscribirse"}
                          </Button>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}
    </motion.div>
  );
}
