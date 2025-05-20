"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useFormSubmit } from "@/hooks/useFormSubmit";
import { FormSection } from "../form-components/FormSection";
import { PersonalInfoFields } from "../form-components/PersonalInfoFields";
import { RadioOptions } from "../form-components/RadioOptions";
import { CheckboxGroup } from "../form-components/CheckboxGroup";
import { TermsCheckbox } from "../form-components/TermsCheckbox";
import { FormButtons } from "../form-components/FormButtons";

export default function SteamForm({ program, onClose }) {
  const [formData, setFormData] = useState({
    // Datos del Niño/a
    nombreCompleto: "",
    fechaNacimiento: "",
    comuna: "",
    estratoSocial: "",
    edad: "",
    grupoEtnico: "",
    institucionEducativa: "",
    cursoGrado: "",
    direccion: "",

    // Datos del Acudiente
    nombreAcudiente: "",
    relacionNino: "",
    telefonoContacto: "",
    correoElectronico: "",

    // Intereses y Conocimientos
    participacionPrevia: false,
    actividadesInteres: [],
    otrasActividades: "",

    // Disponibilidad y Acceso
    disponibilidad: "",    
    accesoComputadora: false,
    accesoInternet: false,


    // Motivación
    motivacion: "",
    expectativa: "",

    // Autorización
    aceptaTerminos: false,
  });

   const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleRadioChange = (name, value) => {
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleCheckboxGroupChange = (newValues) => {
    setFormData({
      ...formData,
      actividadesInteres: newValues,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.aceptaTerminos) {
      alert("Debes aceptar los términos y condiciones antes de continuar.");
      return;
    }

    setIsSubmitting(true);

    try {
          const dataToSend = {
            ...formData,
      edad: parseInt(formData.edad, 10),
      //participacionPrevia: Boolean(formData.participacionPrevia),
      //accesoComputadora: Boolean(formData.accesoComputadora),
      //accesoInternet: Boolean(formData.accesoInternet)
    };

      const res = await fetch("/api/registro/taller-steam", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(dataToSend),
      });

      const result = await res.json();

      if (!res.ok) throw new Error(result.error || "Error al enviar el formulario.");

      alert("Has inscrito correctamente al niño/a en el Taller STEAM+H.");
      onClose?.();
    } catch (error) {
      alert(`Error: ${error.message}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  const actividadesTecnologicas = [
    "Programación básica",
    "Robótica educativa",
    "Diseño de videojuegos",
    "Inteligencia Artificial para niños",
    "Ciencia y experimentos",
  ];


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
          Formulario de Registro - Taller STEAM+H
        </h3>
        <p className="text-gray-600 mb-6">
          Complete el siguiente formulario para inscribir al niño, niña o
          adolescente en el taller.
        </p>
      </div>

      <form onSubmit={(e) => handleSubmit(e, formData)} className="space-y-6">
        <FormSection
          title="Datos del Niño, Niña o Adolescente"
          color={program.color}>
          <PersonalInfoFields formData={formData} onChange={setFormData} />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            <div className="space-y-2">
              <Label htmlFor="institucionEducativa">
                Institución educativa<span className="text-red-500">*</span>
              </Label>
              <Input
                id="institucionEducativa"
                name="institucionEducativa"
                value={formData.institucionEducativa}
                onChange={handleChange}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="cursoGrado">
                Curso/Grado<span className="text-red-500">*</span>
              </Label>
              <Input
                id="cursoGrado"
                name="cursoGrado"
                type="number"
                value={formData.cursoGrado}
                onChange={handleChange}
                required
              />
            </div>
          </div>
        </FormSection>

        <FormSection title="Datos del Acudiente" color={program.color}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div className="space-y-2">
              <Label htmlFor="nombreAcudiente">
                Nombre completo<span className="text-red-500">*</span>
              </Label>
              <Input
                id="nombreAcudiente"
                name="nombreAcudiente"
                value={formData.nombreAcudiente}
                onChange={handleChange}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="relacionNino">
                Relación con el niño/a<span className="text-red-500">*</span>
              </Label>
              <Input
                id="relacionNino"
                name="relacionNino"
                value={formData.relacionNino}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="telefonoContacto">
                Teléfono de contacto<span className="text-red-500">*</span>
              </Label>
              <Input
                id="telefonoContacto"
                name="telefonoContacto"
                value={formData.telefonoContacto}
                onChange={handleChange}
                type="number"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="correoElectronico">
                Correo electrónico<span className="text-red-500">*</span>
              </Label>
              <Input
                id="correoElectronico"
                name="correoElectronico"
                type="email"
                value={formData.correoElectronico}
                onChange={handleChange}
                required
              />
            </div>
          </div>
        </FormSection>

        <FormSection title="Intereses y Conocimientos" color={program.color}>
          <div className="space-y-4">
            <RadioOptions
              label="¿Ha participado antes en programas STEAM o de pensamiento computacional?"
              name="participacionPrevia"
              value={formData.participacionPrevia}
              onChange={handleRadioChange}
              required
            />

            <CheckboxGroup
              label="¿Qué actividades tecnológicas le interesan? (Marcar las que apliquen):"
              options={actividadesTecnologicas}
              selectedValues={formData.actividadesInteres}
              onChange={handleCheckboxGroupChange}
              columns={2}
              showOtherOption={true}
              otherOptionLabel="Otras"
              otherValue={formData.otrasActividades}
              onOtherValueChange={(value) =>
                setFormData({ ...formData, otrasActividades: value })
              }
              required
            />
          </div>
        </FormSection>

        <FormSection
          title="Disponibilidad y Acceso a Tecnología"
          color={program.color}>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="disponibilidad">
                Días y horarios disponibles
                <span className="text-red-500">*</span>
              </Label>
              <Input
                id="disponibilidad"
                name="disponibilidad"
                value={formData.disponibilidad}
                onChange={handleChange}
                placeholder="Ej: Lunes y miércoles de 3pm a 5pm"
                required
              />
            </div>

            <RadioOptions
              label="¿Cuenta con acceso a computadora o Tablet en casa?"
              name="accesoComputadora"
              value={formData.accesoComputadora}
              onChange={handleRadioChange}
              required
            />

            <RadioOptions
              label="¿Cuenta con acceso a internet en casa?"
              name="accesoInternet"
              value={formData.accesoInternet}
              onChange={handleRadioChange}
              required
            />
          </div>
        </FormSection>

        <FormSection title="Motivación" color={program.color}>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="motivacion">
                ¿Por qué desea participar en el Taller de pensamiento
                computacional?
                <span className="text-red-500">*</span>
              </Label>
              <Textarea
                id="motivacion"
                name="motivacion"
                value={formData.motivacion}
                onChange={handleChange}
                rows={3}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="expectativa">
                ¿Cuál es su expectativa sobre el programa?
                <span className="text-red-500">*</span>
              </Label>
              <Textarea
                id="expectativa"
                name="expectativa"
                value={formData.expectativa}
                onChange={handleChange}
                rows={3}
                required
              />
            </div>
          </div>
        </FormSection>

        <FormSection
          title="Autorización de Participación y Tratamiento de Datos"
          color={program.color}>
          <TermsCheckbox
            checked={formData.aceptaTerminos}
            onChange={(checked) =>
              setFormData({ ...formData, aceptaTerminos: checked })
            }
            text="Autorizo la participación del niño/a y adolescente en el taller con el uso de sus datos personales para efectos de gestión, comunicación con el involucrado y participación en sus actividades, según la Ley 1581 de 2012."
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
