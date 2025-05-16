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
import { TermsCheckbox } from "../form-components/TermsCheckbox";
import { FormButtons } from "../form-components/FormButtons";
import { NIVELES_EDUCATIVOS } from "../form-utils/formConstants";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function CulturalForm({ program, onClose }) {
  const [formData, setFormData] = useState({
    // Datos Personales
    nombreCompleto: "",
    fechaNacimiento: "",
    comuna: "",
    estratoSocial: "",
    edad: "",
    grupoEtnico: "",
    documentoIdentidad: "",
    telefonoContacto: "",
    correoElectronico: "",
    direccion: "",
    municipioDepartamento: "",

    // Datos Socioeconómicos
    nivelEducativo: "",
    ocupacion: "",

    // Área de Interés
    areaInteres: "",
    otraArea: "",

    // Experiencia
    formacionPrevia: "no",
    detalleFormacion: "",
    perteneceGrupo: "no",
    detalleGrupo: "",

    // Disponibilidad y Expectativas
    diasDisponibles: "",
    motivacion: "",
    expectativas: "",

    // Autorización
    aceptaTerminos: false,
  });

  const { isSubmitting, handleSubmit } = useFormSubmit({
    programId: "cultural",
    onSuccess: onClose,
    successDescription: `Te has inscrito correctamente en el Programa Cultural.`,
  });

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

  const handleSelectChange = (field, value) => {
    setFormData({
      ...formData,
      [field]: value,
    });
  };

  const areasInteres = [
    "Música",
    "Danza",
    "Manualidades",
    "Maquillaje",
    "Dibujo",
    "Otro",
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
          Formulario de Registro - Programa Cultural
        </h3>
        <p className="text-gray-600 mb-6">
          Complete el siguiente formulario para inscribirse en el programa.
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
              <Label htmlFor="documentoIdentidad">
                Documento de identidad<span className="text-red-500">*</span>
              </Label>
              <Input
                id="documentoIdentidad"
                name="documentoIdentidad"
                value={formData.documentoIdentidad}
                onChange={handleChange}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="municipioDepartamento">
                Municipio / Departamento<span className="text-red-500">*</span>
              </Label>
              <Input
                id="municipioDepartamento"
                name="municipioDepartamento"
                value={formData.municipioDepartamento}
                onChange={handleChange}
                required
              />
            </div>
          </div>
        </FormSection>

        <FormSection
          title="Datos Socioeconómicos"
          icon="💼"
          color={program.color}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="nivelEducativo">
                Nivel educativo<span className="text-red-500">*</span>
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
            <div className="space-y-2">
              <Label htmlFor="ocupacion">
                Ocupación<span className="text-red-500">*</span>
              </Label>
              <Input
                id="ocupacion"
                name="ocupacion"
                value={formData.ocupacion}
                onChange={handleChange}
                required
              />
            </div>
          </div>
        </FormSection>

        <FormSection title="Área de Interés" icon="🎭" color={program.color}>
          <div className="space-y-4">
            <RadioOptions
              label="Seleccione el área en la que deseas participar:"
              name="areaInteres"
              value={formData.areaInteres}
              onChange={handleRadioChange}
              options={areasInteres.map((area) => ({
                value: area,
                label: area,
              }))}
              orientation="grid"
              required
            />

            {formData.areaInteres === "Otro" && (
              <div className="space-y-2">
                <Label htmlFor="otraArea">Especifique otra área:</Label>
                <Input
                  id="otraArea"
                  name="otraArea"
                  value={formData.otraArea}
                  onChange={handleChange}
                />
              </div>
            )}
          </div>
        </FormSection>

        <FormSection
          title="Experiencia en el Área Seleccionada"
          icon="🎓"
          color={program.color}>
          <div className="space-y-4">
            <RadioOptions
              label="¿Has recibido formación previa en esta área?"
              name="formacionPrevia"
              value={formData.formacionPrevia}
              onChange={handleRadioChange}
              required
            />

            {formData.formacionPrevia === "si" && (
              <div className="space-y-2">
                <Label htmlFor="detalleFormacion">Especificar:</Label>
                <Input
                  id="detalleFormacion"
                  name="detalleFormacion"
                  value={formData.detalleFormacion}
                  onChange={handleChange}
                />
              </div>
            )}

            <RadioOptions
              label="¿Perteneces o has pertenecido a algún grupo cultural o artístico?"
              name="perteneceGrupo"
              value={formData.perteneceGrupo}
              onChange={handleRadioChange}
              required
            />

            {formData.perteneceGrupo === "si" && (
              <div className="space-y-2">
                <Label htmlFor="detalleGrupo">Especificar:</Label>
                <Input
                  id="detalleGrupo"
                  name="detalleGrupo"
                  value={formData.detalleGrupo}
                  onChange={handleChange}
                />
              </div>
            )}
          </div>
        </FormSection>

        <FormSection
          title="Disponibilidad y Expectativas"
          icon="📅"
          color={program.color}>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="diasDisponibles">
                Días disponibles para participar:
                <span className="text-red-500">*</span>
              </Label>
              <Input
                id="diasDisponibles"
                name="diasDisponibles"
                value={formData.diasDisponibles}
                onChange={handleChange}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="motivacion">
                Motivación para participar en el programa:
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
                ¿Qué esperas aprender o desarrollar en este programa?
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
            text="Autorizo el uso de mis datos personales para los fines del programa cultural, conforme a la Ley de Protección de Datos Personales (Ley 1581 de 2012)."
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
