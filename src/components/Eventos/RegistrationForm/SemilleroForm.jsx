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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { TIPOS_DOCUMENTO } from "../form-utils/formConstants";

import { NIVELES_EDUCATIVOS } from "../form-utils/formConstants";

export default function SemilleroForm({ program, onClose }) {
  const [formData, setFormData] = useState({
    // Datos Personales
    nombreCompleto: "",
    tipoDocumento: "",
    numeroDocumento: "",
    fechaNacimiento: "",
    telefonoContacto: "",
    correoElectronico: "",
    direccion: "",
    comuna: "",
    estratoSocial: "",
    edad: "",
    grupoEtnico: "",

    // Información de Vinculación
    tipoVinculacion: "institucion",
    nombreEntidadVinculacion: "",
    nivelEducativo: "",

    // Intereses y Experiencia
    participacionPrevia: "no",
    areasInteres: [],
    otrasAreas: "",
    tieneProyecto: "no",
    descripcionProyecto: "",

    // Habilidades y Disponibilidad
    habilidades: "",
    disponibilidad: "",

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

  const handleAreaInteresChange = (newValues) => {
    setFormData({
      ...formData,
      areasInteres: newValues,
    });
  };

  const handleSelectChange = (field, value) => {
    setFormData({
      ...formData,
      [field]: value,
    });
  };

  const areasInteres = [
    "Emprendimiento social",
    "Tecnología e innovación",
    "Medio ambiente y sostenibilidad",
    "Transformación digital",
    "Desarrollo de productos o servicios",
  ];
    const NIVELES_EDUCATIVOS_MAP = {
    "Primaria": "Primaria",
    "Secundaria": "Secundaria",
    "Técnica/Tecnológica": "Tecnica_Tecnologica",
    "Universitaria": "Universitaria",
    "Especialización": "Especializacion",
    "Maestría": "Maestria",
    "Doctorado": "Doctorado",
    "Ninguno": "Ninguno"
  };

    const TIPO_VINCULACION_MAP = {
    institucion: "INSTITUCION_EDUCATIVA",
    comunidad: "COMUNIDAD"
  };
   

  

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.aceptaTerminos) {
    alert("Debes aceptar los términos y condiciones antes de continuar.");
    return;
    }

    setIsSubmitting(true);
    
    const dataToSend = {
      ...formData,
      edad: isNaN(Number(formData.edad)) ? 0 : parseInt(formData.edad, 10),
      tipoVinculacion: TIPO_VINCULACION_MAP[formData.tipoVinculacion],
      nivelEducativo: NIVELES_EDUCATIVOS_MAP[formData.nivelEducativo],
      nombreEntidadVinculacion: formData.nombreEntidadVinculacion, // <- Aquí está la corrección
      aceptaTerminos: Boolean(formData.aceptaTerminos),
      fechaNacimiento: new Date(formData.fechaNacimiento).toISOString(),
      areasInteres: formData.areasInteres,
    };

    if (!dataToSend.tieneProyecto) {
      dataToSend.descripcionProyecto = "";
    }

    try {
      const res = await fetch("/api/registro/semillero-innovacion", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dataToSend),
      });

      const result = await res.json();

      if (!res.ok) throw new Error(result.error || "Error al registrar");

      alert("Formulario enviado exitosamente.");
      onClose?.();
    } catch (error) {
      alert(error.message);
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
          Formulario de Registro - Semillero de Innovación y Emprendimiento
        </h3>
        <p className="text-gray-600 mb-6">
          Complete el siguiente formulario para inscribirse en el semillero.
        </p>
      </div>

      <form onSubmit={(e) => handleSubmit(e, formData)} className="space-y-6">
        <FormSection title="Datos Personales" icon="📇" color={program.color}>
          <PersonalInfoFields
            formData={formData}
            onChange={setFormData}
            showContact={true}
            showEmail={true}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            <div className="space-y-2">
              <Label htmlFor="tipoDocumento">
                Tipo de documento<span className="text-red-500">*</span>
              </Label>
              <Select
                value={formData.tipoDocumento}
                onValueChange={(value) =>
                  setFormData({ ...formData, tipoDocumento: value })
                }>
                <SelectTrigger>
                  <SelectValue placeholder="Seleccionar" />
                </SelectTrigger>
                <SelectContent>
                  {TIPOS_DOCUMENTO.map((tipo) => (
                    <SelectItem key={tipo.value} value={tipo.value}>
                      {tipo.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="numeroDocumento">
                Número de documento<span className="text-red-500">*</span>
              </Label>
              <Input
                id="numeroDocumento"
                type="number"
                max="10"
                name="numeroDocumento"
                value={formData.numeroDocumento}
                onChange={handleChange}
                required
              />
            </div>
          </div>
        </FormSection>

        <FormSection
          title="Información de Vinculación"
          icon="🔗"
          color={program.color}>
          <div className="space-y-4">
            <RadioOptions
              label="¿Cómo desea vincularse al semillero?"
              name="tipoVinculacion"
              value={formData.tipoVinculacion}
              onChange={handleRadioChange}
              options={[
                {
                  value: "institucion",
                  label: "A través de una institución educativa",
                },
                { value: "comunidad", label: "Como miembro de una comunidad" },
              ]}
              orientation="vertical"
              required
            />

            <div className="space-y-2">
              <Label htmlFor="nombreEntidadVinculacion">
                Nombre de la institución educativa o comunidad
                <span className="text-red-500">*</span>
              </Label>
              <Input
                id="nombreEntidadVinculacion"
                name="nombreEntidadVinculacion"
                value={formData.nombreEntidadVinculacion}
                onChange={handleChange}
                required
              />
            </div>

            <div className="space-y-2">
                          <Label htmlFor="nivelEducativo">
                            Nivel educativo alcanzado<span className="text-red-500">*</span>
                          </Label>
                          <Select
                            value={formData.nivelEducativo}
                            onValueChange={(value) =>
                              handleSelectChange("nivelEducativo", value)
                            }>
                            <SelectTrigger>
                              <SelectValue placeholder="Seleccionar" />
                            </SelectTrigger>
                            <SelectContent>
                              {NIVELES_EDUCATIVOS.map((nivel) => (
                                <SelectItem key={nivel} value={nivel}>
                                  {nivel}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
          </div>
        </FormSection>

        <FormSection
          title="Intereses y Experiencia"
          icon="💡"
          color={program.color}>
          <div className="space-y-4">
            <RadioOptions
              label="¿Ha participado anteriormente en iniciativas de innovación o emprendimiento?"
              name="participacionPrevia"
              value={formData.participacionPrevia}
              onChange={handleRadioChange}
              required
            />

            <CheckboxGroup
              label="Áreas de interés (Marcar las que apliquen):"
              options={areasInteres}
              selectedValues={formData.areasInteres}
              onChange={handleAreaInteresChange}
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
              label="¿Tiene un proyecto en marcha o una idea de emprendimiento?"
              name="tieneProyecto"
              value={formData.tieneProyecto}
              onChange={handleRadioChange}
              required
            />

            {formData.tieneProyecto === true && (
              <div className="space-y-2">
                <Label htmlFor="descripcionProyecto">
                  Describa brevemente su proyecto o idea:
                  <span className="text-red-500">*</span>
                </Label>
                <Textarea
                  id="descripcionProyecto"
                  name="descripcionProyecto"
                  value={formData.descripcionProyecto}
                  onChange={handleChange}
                  rows={3}
                  required
                />
              </div>
            )}
          </div>
        </FormSection>

        <FormSection
          title="Habilidades y Disponibilidad"
          icon="🛠️"
          color={program.color}>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="habilidades">
                ¿En qué áreas considera que tiene habilidades relevantes para el
                semillero?
                <span className="text-red-500">*</span>
              </Label>
              <Textarea
                id="habilidades"
                name="habilidades"
                value={formData.habilidades}
                onChange={handleChange}
                rows={3}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="disponibilidad">
                Disponibilidad horaria para actividades del semillero
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
          </div>
        </FormSection>

        <FormSection title="Motivación" icon="🌱" color={program.color}>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="motivacion">
                ¿Por qué desea unirse al Semillero de Innovación y
                Emprendimiento?
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
                ¿Qué espera lograr con su participación en el semillero?
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
          icon="✅"
          color={program.color}>
          <TermsCheckbox
            checked={formData.aceptaTerminos}
            onChange={(checked) =>
              setFormData({ ...formData, aceptaTerminos: checked })
            }
            text="Autorizo mi participación en el Semillero de Innovación y Emprendimiento y el uso de mis datos personales para efectos de gestión y comunicación del programa, según la Ley 1581 de 2012."
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
