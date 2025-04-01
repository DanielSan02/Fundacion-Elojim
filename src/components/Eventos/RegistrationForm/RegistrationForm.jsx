"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useFormSubmit } from "@/hooks/useFormSubmit";
import { FormSection } from "../form-components/FormSection";
import { PersonalInfoFields } from "../form-components/PersonalInfoFields";
import { TermsCheckbox } from "../form-components/TermsCheckbox";
import { FormButtons } from "../form-components/FormButtons";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

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

  // Formulario genérico para otros programas

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="space-y-6">
      <div>
        <h3
          className="text-2xl font-bold mb-2"
          style={{ color: program.color }}>
          Inscripción: {program.title}
        </h3>
        <p className="text-gray-600 mb-6">
          Complete el siguiente formulario para inscribirse en este programa.
        </p>
      </div>

      <form onSubmit={(e) => handleSubmit(e, formData)} className="space-y-6">
        <FormSection title="Información Personal" color={program.color}>
          <PersonalInfoFields
            formData={formData}
            onChange={setFormData}
            showEthnicity={false}
            showCommune={false}
            showStratum={false}
            showAge={false}
            showContact={true}
            showEmail={true}
          />
        </FormSection>

        <FormSection title="Motivación" color={program.color}>
          <div className="space-y-2">
            <Label htmlFor="reason">
              ¿Por qué desea participar en este programa?
              <span className="text-red-500">*</span>
            </Label>
            <Textarea
              id="reason"
              name="reason"
              value={formData.reason}
              onChange={handleChange}
              required
            />
          </div>
        </FormSection>

        <FormSection title="Términos y Condiciones" color={program.color}>
          <TermsCheckbox
            checked={formData.acceptTerms}
            onChange={(checked) =>
              setFormData({ ...formData, acceptTerms: checked })
            }
            text="Acepto los términos y condiciones del programa"
          />
        </FormSection>

        <FormButtons
          onCancel={onClose}
          isSubmitting={isSubmitting}
          submitColor={program.color}
        />
      </form>
    </motion.div>
  );
}
