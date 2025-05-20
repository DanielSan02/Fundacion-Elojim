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

export default function RefuerzoForm({ program, onClose }) {
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

    // Información Académica
    areasAyuda: [],
    otrasAreas: "",
    refuerzoPrevio: "no",
    dificultadesAcademicas: "",

    // Disponibilidad y Recursos
    disponibilidad: "",
    accesoMateriales: "no",
    apoyoHabitos: "no",

    // Motivación
    motivacion: "",
    expectativas: "",

    // Autorización
    aceptaTerminos: false,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleRadioChange = (name, value) => {
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleAreaChange = (newValues) => {
    setFormData({
      ...formData,
      areasAyuda: newValues,
    });
  };

  const areasAyuda = [
    "Matemáticas",
    "Lectura y comprensión",
    "Escritura",
    "Ciencias naturales",
    "Inglés",
  ];
  
  const AREAS_APOYO_MAP = {
  "Matemáticas": "Matemáticas",
  "Lectura y comprensión": "Lectura y comprensión",
  "Escritura": "Escritura",
  "Ciencias naturales": "Ciencias naturales",
  "Inglés": "Inglés"
};

const handleSubmit = async (e) => {
  e.preventDefault();

  if (!formData.aceptaTerminos) {
    alert("Debes aceptar los términos y condiciones antes de continuar.");
    return;
  }

  setIsSubmitting(true);

  const mappedAreas = formData.areasAyuda
    .filter(area => AREAS_APOYO_MAP.hasOwnProperty(area))
    .map(area => AREAS_APOYO_MAP[area]);

  const adaptedData = {
    ...formData,
    edad: isNaN(Number(formData.edad)) ? 0 : parseInt(formData.edad, 10),
    aceptaTerminos: Boolean(formData.aceptaTerminos),
    fechaNacimiento: new Date(formData.fechaNacimiento).toISOString(),
    areasAyuda: mappedAreas
  };

  try {
    const response = await fetch("/api/registro/refuerzo-escolar", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(adaptedData),
    });

    const result = await response.json();

    if (!response.ok) throw new Error(result.error || "Error al registrar");

    alert("Formulario enviado exitosamente.");
    onClose?.();
  } catch (error) {
    alert(error.message || "Error al enviar el formulario.");
  } finally {
    setIsSubmitting(false);
  }
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
          Formulario de Registro - Jornadas de Refuerzo
        </h3>
        <p className="text-gray-600 mb-6">
          Complete el siguiente formulario para inscribir al niño, niña o
          adolescente en las jornadas de refuerzo.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
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

        <FormSection
          title="Información Académica y Necesidades de Refuerzo"
          color={program.color}>
          <div className="space-y-4">
            <CheckboxGroup
              label="¿En qué áreas necesita apoyo el niño/a? (Marcar las que apliquen):"
              options={areasAyuda}
              selectedValues={formData.areasAyuda}
              onChange={handleAreaChange}
              columns={2}
              showOtherOption={true}
              otherOptionLabel="Otras"
              otherValue={formData.otrasAreas}
              onOtherValueChange={(value) =>
                setFormData({ ...formData, otrasAreas: value })
              }
              required
            />

            <RadioOptions
              label="¿Ha recibido refuerzo escolar anteriormente?"
              name="refuerzoPrevio"
              value={formData.refuerzoPrevio}
              onChange={handleRadioChange}
              required
            />

            <div className="space-y-2">
              <Label htmlFor="dificultadesAcademicas">
                ¿Cuáles considera que son las principales dificultades
                académicas del niño/a?
                <span className="text-red-500">*</span>
              </Label>
              <Textarea
                id="dificultadesAcademicas"
                name="dificultadesAcademicas"
                value={formData.dificultadesAcademicas}
                onChange={handleChange}
                rows={3}
                required
              />
            </div>
          </div>
        </FormSection>

        <FormSection
          title="Disponibilidad y Acceso a Recursos"
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
              label="¿Cuenta con acceso a materiales escolares básicos en casa?"
              name="accesoMateriales"
              value={formData.accesoMateriales}
              onChange={handleRadioChange}
              required
            />

            <RadioOptions
              label="¿Requiere apoyo en hábitos de estudio y organización del tiempo?"
              name="apoyoHabitos"
              value={formData.apoyoHabitos}
              onChange={handleRadioChange}
              required
            />
          </div>
        </FormSection>

        <FormSection title="Motivación y Expectativas" color={program.color}>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="motivacion">
                ¿Por qué desea que el niño/a participe en las jornadas de
                refuerzo?
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
              <Label htmlFor="expectativas">
                ¿Cuáles son sus expectativas respecto al programa?
                <span className="text-red-500">*</span>
              </Label>
              <Textarea
                id="expectativas"
                name="expectativas"
                value={formData.expectativas}
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
            text="Autorizo la participación del niño/a en las jornadas de refuerzo escolar y el uso de sus datos personales para efectos de gestión, comunicación y participación en las actividades del programa, según la Ley 1581 de 2012."
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
