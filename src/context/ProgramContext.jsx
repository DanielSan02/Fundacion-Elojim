"use client";

import { createContext, useContext, useEffect, useState } from "react";
import {
  getStoredPrograms,
  storePrograms,
  getStoredEvents,
  storeEvents,
} from "@/utils/storage";

const ProgramContext = createContext(undefined);

export function ProgramProvider({ children }) {
  const [userPrograms, setUserPrograms] = useState([]);
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Cargar datos almacenados al iniciar
    const storedPrograms = getStoredPrograms();
    const storedEvents = getStoredEvents();

    if (storedPrograms) {
      setUserPrograms(storedPrograms);
    }

    if (storedEvents) {
      setEvents(storedEvents);
    }

    setLoading(false);
  }, []);

  // Guardar cambios en localStorage cuando cambian los datos
  useEffect(() => {
    if (!loading) {
      storePrograms(userPrograms);
      storeEvents(events);
    }
  }, [userPrograms, events, loading]);

  const registerProgram = (programId) => {
    setUserPrograms((prev) => {
      if (prev.includes(programId)) return prev;
      return [...prev, programId];
    });
  };

  const unregisterProgram = (programId) => {
    setUserPrograms((prev) => prev.filter((id) => id !== programId));
  };

  const isRegistered = (programId) => {
    return userPrograms.includes(programId);
  };

  const registerEvent = (eventId) => {
    setEvents((prev) => {
      if (prev.includes(eventId)) return prev;
      return [...prev, eventId];
    });
  };

  const unregisterEvent = (eventId) => {
    setEvents((prev) => prev.filter((id) => id !== eventId));
  };

  const isEventRegistered = (eventId) => {
    return events.includes(eventId);
  };

  return (
    <ProgramContext.Provider
      value={{
        userPrograms,
        registerProgram,
        unregisterProgram,
        isRegistered,
        events,
        registerEvent,
        unregisterEvent,
        isEventRegistered,
        loading,
      }}>
      {children}
    </ProgramContext.Provider>
  );
}

export const usePrograms = () => {
  const context = useContext(ProgramContext);
  if (context === undefined) {
    throw new Error("usePrograms must be used within a ProgramProvider");
  }
  return context;
};
