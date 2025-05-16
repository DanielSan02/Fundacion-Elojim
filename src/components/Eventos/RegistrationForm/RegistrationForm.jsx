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
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    reason: "",
    acceptTerms: false,
  });

  const { isSubmitting, handleSubmit } = useFormSubmit({
    programId: program.id,
    onSuccess: onClose,
    successDescription: `Te has inscrito correctamente en el ${program.title}.`,
  });

  // Determinar qué formulario mostrar según el programa
  if (program.id === 1) {
    // Programa Mujer Vulnerable
    return <MujerVulnerableForm program={program} onClose={onClose} />;
  }

  if (program.id === 2) {
    // Semillero de Innovación y Emprendimiento
    return <SemilleroForm program={program} onClose={onClose} />;
  }

  if (program.id === 3) {
    // Programa Taller STEAM+H
    return <SteamForm program={program} onClose={onClose} />;
  }

  if (program.id === 4) {
    // Programa de Seguridad Alimentaria
    return <SeguridadAlimentariaForm program={program} onClose={onClose} />;
  }

  if (program.id === 6) {
    // Programa de Jornadas de Refuerzo Escolar
    return <RefuerzoForm program={program} onClose={onClose} />;
  }

  if (program.id === 7) {
    // Programa de Factoría de Software
    return <SoftwareFactoryForm program={program} onClose={onClose} />;
  }

  if (program.id === 8) {
    // Programa de Voluntariado Social
    return <VoluntariadoForm program={program} onClose={onClose} />;
  }

  if (program.id === 9) {
    // Programa Cultural
    return <ProgramaCulturalForm program={program} onClose={onClose} />;
  }

  if (program.id === 10) {
    // Programa Economía Plateada
    return <EconomiaPForm program={program} onClose={onClose} />;
  }
}
