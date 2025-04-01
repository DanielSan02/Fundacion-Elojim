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

export default function EconomiaPForm({ program, onClose }) {
  const [formData, setFormData] = useState({
    // Datos Personales
    nombreCompleto: "",
    tipoDocumento: "",
    numeroDocumento: "",
    fechaNacimiento: "",
    diaNacimiento: "",
    mesNacimiento: "",
    anoNacimiento: "",
    comuna: "",
    estratoSocial: "",
    edad: "",
    grupoEtnico: "",
    genero: "",
    telefonoContacto: "",
    correoElectronico: "",
    direccion: "",

    // Situación Económica y Laboral
    esPensionado: "no",
    actividadEconomica: "",
    trabajoAnterior: "no",
    sectorTrabajo: "",
    ingresosAdicionales: "no",
    fuenteIngresos: "",

    // Intereses y Habilidades
    areasInteres: [],
    otrasAreas: "",
    habilidades: "",

    // Disponibilidad y Motivación
    tiempoSemanal: "",
    motivacion: "",
    expectativas: "",

    // Autorización
    aceptaTerminos: false,
  });

  const { isSubmitting, handleSubmit } = useFormSubmit({
    programId: program.id,
    onSuccess: onClose,
    successDescription: `Te has inscrito correctamente en el Programa Economía Plateada.`,
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

  const handleAreaInteresChange = (newValues) => {
    setFormData({
      ...formData,
      areasInteres: newValues,
    });
  };

  const areasInteres = [
    "Emprendimiento y negocios",
    "Educación financiera",
    "Tecnología y digitalización",
    "Salud y bienestar",
    "Voluntariado y apoyo comunitario",
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
          Formulario de Registro - Programa Economía Plateada
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
                name="numeroDocumento"
                value={formData.numeroDocumento}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="space-y-2 mt-4">
            <RadioOptions
              label="Género"
              name="genero"
              value={formData.genero}
              onChange={handleRadioChange}
              options={[
                { value: "femenino", label: "Femenino" },
                { value: "masculino", label: "Masculino" },
              ]}
              required
            />
          </div>
        </FormSection>

        <FormSection
          title="Situación Económica y Laboral"
          icon="💼"
          color={program.color}>
          <div className="space-y-4">
            <RadioOptions
              label="¿Es pensionado/a?"
              name="esPensionado"
              value={formData.esPensionado}
              onChange={handleRadioChange}
              required
            />

            {formData.esPensionado === "no" && (
              <div className="space-y-2">
                <Label htmlFor="actividadEconomica">
                  En caso de no ser pensionado/a, ¿cuál es su actividad
                  económica actual?
                </Label>
                <Input
                  id="actividadEconomica"
                  name="actividadEconomica"
                  value={formData.actividadEconomica}
                  onChange={handleChange}
                />
              </div>
            )}

            <RadioOptions
              label="¿Ha trabajado anteriormente en algún sector específico?"
              name="trabajoAnterior"
              value={formData.trabajoAnterior}
              onChange={handleRadioChange}
              required
            />

            {formData.trabajoAnterior === "si" && (
              <div className="space-y-2">
                <Label htmlFor="sectorTrabajo">
                  Si la respuesta es sí, ¿en qué sector(es)?
                </Label>
                <Input
                  id="sectorTrabajo"
                  name="sectorTrabajo"
                  value={formData.sectorTrabajo}
                  onChange={handleChange}
                />
              </div>
            )}

            <RadioOptions
              label="¿Recibe ingresos adicionales?"
              name="ingresosAdicionales"
              value={formData.ingresosAdicionales}
              onChange={handleRadioChange}
              required
            />

            {formData.ingresosAdicionales === "si" && (
              <div className="space-y-2">
                <Label htmlFor="fuenteIngresos">
                  Si la respuesta es sí, ¿de qué fuente(s)?
                </Label>
                <Input
                  id="fuenteIngresos"
                  name="fuenteIngresos"
                  value={formData.fuenteIngresos}
                  onChange={handleChange}
                />
              </div>
            )}
          </div>
        </FormSection>

        <FormSection
          title="Intereses y Habilidades"
          icon="💡"
          color={program.color}>
          <div className="space-y-4">
            <CheckboxGroup
              label="Áreas de interés para el programa (Marcar las que apliquen):"
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

            <div className="space-y-2">
              <Label htmlFor="habilidades">
                Habilidades y conocimientos previos en:
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
          </div>
        </FormSection>

        <FormSection
          title="Disponibilidad y Motivación"
          icon="⏳"
          color={program.color}>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="tiempoSemanal">
                ¿Cuánto tiempo podría dedicar al programa semanalmente?
                <span className="text-red-500">*</span>
              </Label>
              <Input
                id="tiempoSemanal"
                name="tiempoSemanal"
                value={formData.tiempoSemanal}
                onChange={handleChange}
                placeholder="Ej: 5 horas semanales"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="motivacion">
                ¿Por qué desea participar en el programa Economía Plateada?
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
                ¿Qué espera lograr con su participación en el programa?
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
            text="Autorizo mi participación en el Programa Economía Plateada y el uso de mis datos personales para efectos de gestión y comunicación del programa, según la Ley 1581 de 2012."
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
