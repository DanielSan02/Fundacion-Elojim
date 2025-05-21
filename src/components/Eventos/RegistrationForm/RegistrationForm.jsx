"use client";

import { useState } from "react";

import { useFormSubmit } from "@/hooks/useFormSubmit";

// Importar formularios específicos
import VoluntariadoForm from "./VoluntariadoForm";
import SoftwareFactoryForm from "./SoftwareFactoryForm";
import RefuerzoForm from "./RefuerzoForm";
import SemilleroForm from "./SemilleroForm";
import EconomiaPForm from "./EconomiaPForm";
import MujerVulnerableForm from "./MujerVulnerableForm";
import SeguridadAlimentariaForm from "./SeguridadAlimentariaForm";
import ProgramaCulturalForm from "./CulturalForm";
import SteamForm from "./SteamForm";

export default function RegistrationForm({ program, onClose }) {
  // Determinar qué formulario mostrar según el programa
  if (program.id === "mujer-vulnerable") {
    // Programa Mujer Vulnerable
    return <MujerVulnerableForm program={program} onClose={onClose} />;
  }

  if (program.id === "semillero-innovacion") {
    // Semillero de Innovación y Emprendimiento
    return <SemilleroForm program={program} onClose={onClose} />;
  }

  if (program.id === "taller-steam") {
    // Programa Taller STEAM+H
    return <SteamForm program={program} onClose={onClose} />;
  }

  if (program.id === "seguridad-alimentaria") {
    // Programa de Seguridad Alimentaria
    return <SeguridadAlimentariaForm program={program} onClose={onClose} />;
  }

  if (program.id === "refuerzo-escolar") {
    // Programa de Jornadas de Refuerzo Escolar
    return <RefuerzoForm program={program} onClose={onClose} />;
  }

  if (program.id === "software-factory") {
    // Programa de Factoría de Software
    return <SoftwareFactoryForm program={program} onClose={onClose} />;
  }

  if (program.id === "voluntariado") {
    // Programa de Voluntariado Social
    return <VoluntariadoForm program={program} onClose={onClose} />;
  }

  if (program.id === "cultural") {
    // Programa Cultural
    return <ProgramaCulturalForm program={program} onClose={onClose} />;
  }

  if (program.id === "economia-plateada") {
    // Programa Economía Plateada
    return <EconomiaPForm program={program} onClose={onClose} />;
  }
}
