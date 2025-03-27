"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { usePrograms } from "@/context/ProgramContext";
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
  const { registerProgram } = usePrograms();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    reason: "",
    acceptTerms: false,
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

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.acceptTerms) {
      toast({
        title: "Error",
        description: "Debes aceptar los términos y condiciones para continuar.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    // Simulación de envío de datos
    setTimeout(() => {
      registerProgram(program.id);
      setIsSubmitting(false);
      toast({
        title: "¡Inscripción exitosa!",
        description: `Te has inscrito correctamente en el ${program.title}.`,
        variant: "default",
      });
      onClose();
    }, 1500);
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

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="name">Nombre completo</Label>
            <Input
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Correo electrónico</Label>
            <Input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="phone">Teléfono</Label>
            <Input
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="address">Dirección</Label>
            <Input
              id="address"
              name="address"
              value={formData.address}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="reason">
            ¿Por qué desea participar en este programa?
          </Label>
          <Textarea
            id="reason"
            name="reason"
            value={formData.reason}
            onChange={handleChange}
            required
          />
        </div>

        <div className="flex items-center space-x-2">
          <Checkbox
            id="acceptTerms"
            name="acceptTerms"
            checked={formData.acceptTerms}
            onCheckedChange={(checked) =>
              setFormData({ ...formData, acceptTerms: checked })
            }
          />
          <Label htmlFor="acceptTerms" className="text-sm">
            Acepto los términos y condiciones del programa
          </Label>
        </div>

        <div className="flex justify-end space-x-4 pt-4">
          <Button type="button" variant="outline" onClick={onClose}>
            Cancelar
          </Button>
          <Button
            type="submit"
            disabled={isSubmitting}
            style={{
              backgroundColor: program.color,
              color: "white",
              borderColor: program.color,
            }}>
            {isSubmitting ? "Procesando..." : "Inscribirse"}
          </Button>
        </div>
      </form>
    </motion.div>
  );
}
