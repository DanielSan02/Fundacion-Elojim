"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import { usePrograms } from "@/context/ProgramContext";
import RegistrationForm from "./RegistrationForm/RegistrationForm";
import EventsList from "./EventisList/EventsList";

export default function ProgramDetail({ program, isOpen, onClose }) {
  const { isRegistered } = usePrograms();
  const registered = isRegistered(program?.id);
  const [showEvents, setShowEvents] = useState(false);

  if (!program) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[700px] p-0 overflow-hidden">
        <DialogTitle className="sr-only">{program.title}</DialogTitle>{" "}
        {/* Título accesible */}
        <div className="flex flex-col h-full max-h-[90vh]">
          {/* Header con color del programa */}
          <div
            className="p-6 sticky top-0 z-10"
            style={{ backgroundColor: program.bgColor }}>
            <Button
              variant="ghost"
              className="absolute right-4 top-4 rounded-full p-2 h-auto"
              onClick={onClose}>
              <X className="h-4 w-4" />
              <span className="sr-only">Cerrar</span>
            </Button>

            <div className="flex items-center space-x-4">
              <div
                className="rounded-full p-3"
                style={{ backgroundColor: program.color }}>
                <program.icon className="h-6 w-6 text-white" />
              </div>
              <h2
                className="text-2xl font-bold"
                style={{ color: program.color }}>
                {program.title}
              </h2>
            </div>
          </div>

          {/* Contenido con scroll */}
          <div className="p-6 overflow-y-auto flex-grow">
            <AnimatePresence mode="wait">
              {registered && showEvents ? (
                <EventsList key="events" program={program} />
              ) : registered ? (
                <motion.div
                  key="details"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="space-y-6">
                  <p className="text-gray-600">{program.longDescription}</p>

                  <div>
                    <h3
                      className="text-lg font-semibold mb-2"
                      style={{ color: program.color }}>
                      Requisitos
                    </h3>
                    <ul className="list-disc pl-5 space-y-1 text-gray-600">
                      {program.requirements.map((req, index) => (
                        <li key={index}>{req}</li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h3
                      className="text-lg font-semibold mb-2"
                      style={{ color: program.color }}>
                      Beneficios
                    </h3>
                    <ul className="list-disc pl-5 space-y-1 text-gray-600">
                      {program.benefits.map((benefit, index) => (
                        <li key={index}>{benefit}</li>
                      ))}
                    </ul>
                  </div>

                  <div className="pt-4 flex justify-end">
                    <Button
                      onClick={() => setShowEvents(true)}
                      style={{
                        backgroundColor: program.color,
                        color: "white",
                      }}>
                      Ver eventos disponibles
                    </Button>
                  </div>
                </motion.div>
              ) : (
                <RegistrationForm
                  key="form"
                  program={program}
                  onClose={onClose}
                />
              )}
            </AnimatePresence>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
