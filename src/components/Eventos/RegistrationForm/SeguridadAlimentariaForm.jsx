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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { TIPOS_DOCUMENTO } from "../form-utils/formConstants";

export default function SeguridadAlimentariaForm({ program, onClose }) {
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

    // Situación Productiva y Agrícola
    esAgricultor: "no",
    tieneTierras: "no",
    hectareas: "",
    pisoTermico: "",
    tieneCultivo: "no",
    tiposCultivo: "",
    participacionPrevia: "no",
    proyectosAnteriores: "",

    // Infraestructura y Recursos
    tieneRiego: "no",
    tieneHerramientas: "no",
    tiposHerramientas: "",
    tieneAsistenciaTecnica: "no",

    // Motivación y Disponibilidad
    motivacion: "",
    tiempoSemanal: "",
    expectativas: "",

    // Autorización
    aceptaTerminos: false,
  });

  const { isSubmitting, handleSubmit } = useFormSubmit({
    programId: program.id,
    onSuccess: onClose,
    successDescription: `Te has inscrito correctamente en el Programa de Seguridad Alimentaria.`,
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

  const pisosTermicos = [
    "Cálido (0 - 1.000 m.s.n.m.)",
    "Medio (1.000 - 2.000 m.s.n.m.)",
    "Frío (2.000 - 3.000 m.s.n.m.)",
    "Páramo (+3.000 m.s.n.m.)",
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
          Formulario de Registro - Programa de Seguridad Alimentaria
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
                  handleSelectChange("tipoDocumento", value)
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
        </FormSection>

        <FormSection
          title="Situación Productiva y Agrícola"
          icon="🌱"
          color={program.color}>
          <div className="space-y-4">
            <RadioOptions
              label="¿Es agricultor/a?"
              name="esAgricultor"
              value={formData.esAgricultor}
              onChange={handleRadioChange}
              required
            />

            <RadioOptions
              label="¿Cuenta con tierras disponibles para participar en el cultivo del proyecto?"
              name="tieneTierras"
              value={formData.tieneTierras}
              onChange={handleRadioChange}
              required
            />

            {formData.tieneTierras === "si" && (
              <div className="space-y-2">
                <Label htmlFor="hectareas">
                  Si la respuesta es sí, ¿cuántas hectáreas?
                </Label>
                <Input
                  id="hectareas"
                  name="hectareas"
                  value={formData.hectareas}
                  onChange={handleChange}
                />
              </div>
            )}

            {formData.tieneTierras === "si" && (
              <div className="space-y-2">
                <Label htmlFor="pisoTermico">
                  ¿En qué piso térmico o clima se encuentran sus tierras?
                </Label>
                <Select
                  value={formData.pisoTermico}
                  onValueChange={(value) =>
                    handleSelectChange("pisoTermico", value)
                  }>
                  <SelectTrigger>
                    <SelectValue placeholder="Seleccionar" />
                  </SelectTrigger>
                  <SelectContent>
                    {pisosTermicos.map((piso) => (
                      <SelectItem key={piso} value={piso}>
                        {piso}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            )}

            <RadioOptions
              label="¿Tiene actualmente una actividad de cultivo específica?"
              name="tieneCultivo"
              value={formData.tieneCultivo}
              onChange={handleRadioChange}
              required
            />

            {formData.tieneCultivo === "si" && (
              <div className="space-y-2">
                <Label htmlFor="tiposCultivo">
                  Si la respuesta es sí, ¿qué cultivos realiza?
                </Label>
                <Input
                  id="tiposCultivo"
                  name="tiposCultivo"
                  value={formData.tiposCultivo}
                  onChange={handleChange}
                />
              </div>
            )}

            <RadioOptions
              label="¿Ha participado en otros proyectos de seguridad alimentaria o agrícolas?"
              name="participacionPrevia"
              value={formData.participacionPrevia}
              onChange={handleRadioChange}
              required
            />

            {formData.participacionPrevia === "si" && (
              <div className="space-y-2">
                <Label htmlFor="proyectosAnteriores">
                  Si la respuesta es sí, ¿en cuáles?
                </Label>
                <Input
                  id="proyectosAnteriores"
                  name="proyectosAnteriores"
                  value={formData.proyectosAnteriores}
                  onChange={handleChange}
                />
              </div>
            )}
          </div>
        </FormSection>

        <FormSection
          title="Infraestructura y Recursos"
          icon="🛠️"
          color={program.color}>
          <div className="space-y-4">
            <RadioOptions
              label="¿Cuenta con acceso a riego en sus tierras?"
              name="tieneRiego"
              value={formData.tieneRiego}
              onChange={handleRadioChange}
              required
            />

            <RadioOptions
              label="¿Dispone de herramientas o maquinaria agrícola?"
              name="tieneHerramientas"
              value={formData.tieneHerramientas}
              onChange={handleRadioChange}
              required
            />

            {formData.tieneHerramientas === "si" && (
              <div className="space-y-2">
                <Label htmlFor="tiposHerramientas">
                  Si la respuesta es sí, ¿cuáles?
                </Label>
                <Input
                  id="tiposHerramientas"
                  name="tiposHerramientas"
                  value={formData.tiposHerramientas}
                  onChange={handleChange}
                />
              </div>
            )}

            <RadioOptions
              label="¿Cuenta con acceso a asistencia técnica o capacitación agrícola?"
              name="tieneAsistenciaTecnica"
              value={formData.tieneAsistenciaTecnica}
              onChange={handleRadioChange}
              required
            />
          </div>
        </FormSection>

        <FormSection
          title="Motivación y Disponibilidad"
          icon="🌟"
          color={program.color}>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="motivacion">
                ¿Por qué desea participar en el Programa de Seguridad
                Alimentaria?
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
              <Label htmlFor="tiempoSemanal">
                ¿Cuánto tiempo podría dedicar al programa semanalmente?
                <span className="text-red-500">*</span>
              </Label>
              <Input
                id="tiempoSemanal"
                name="tiempoSemanal"
                value={formData.tiempoSemanal}
                onChange={handleChange}
                placeholder="Ej: 10 horas semanales"
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
            text="Autorizo mi participación en el Programa de Seguridad Alimentaria y el uso de mis datos personales para efectos de gestión y comunicación del programa, según la Ley 1581 de 2012."
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
