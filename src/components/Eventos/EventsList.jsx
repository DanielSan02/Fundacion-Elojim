"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, MapPin, Users } from "lucide-react";
import { usePrograms } from "@/context/ProgramContext";
import { useToast } from "@/hooks/use-toast";
import { events } from "@/data/events";

export default function EventsList({ program }) {
  const { registerEvent, isEventRegistered } = usePrograms();
  const { toast } = useToast();
  const [registering, setRegistering] = useState(null);

  // Filtrar eventos por programa
  const programEvents = events.filter(
    (event) => event.programId === program.id
  );

  // Ordenar eventos por fecha
  const sortedEvents = [...programEvents].sort(
    (a, b) => new Date(a.date) - new Date(b.date)
  );

  const handleRegister = (eventId) => {
    setRegistering(eventId);

    // Simulación de registro
    setTimeout(() => {
      registerEvent(eventId);
      setRegistering(null);
      toast({
        title: "¡Registro exitoso!",
        description: "Te has registrado correctamente en este evento.",
        variant: "default",
      });
    }, 1000);
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

      {sortedEvents.length === 0 ? (
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
