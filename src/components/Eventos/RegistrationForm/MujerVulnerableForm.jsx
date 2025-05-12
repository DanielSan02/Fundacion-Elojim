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
import { NIVELES_EDUCATIVOS } from "../form-utils/formConstants";

import { TIPOS_DOCUMENTO } from "../form-utils/formConstants";


export default function MujerVulnerableForm({ program, onClose }) {
  const [formData, setFormData] = useState({
    // Datos Personales
    nombreCompleto: "",
    tipoDocumento: "",
    numeroDocumento: "",
    fechaNacimiento: "",
    comuna: "",
    estratoSocial: "",
    edad: "",
    grupoEtnico: "",
    telefonoContacto: "",
    correoElectronico: "",
    direccion: "",

    // Situación Socioeconómica
    esMadreCabeza: "no",
    numeroHijos: "",
    conviveOtros: "no",
    conQuienesConvive: "",
    nivelEducativo: "",
    tieneEmpleo: "no",
    actividadLaboral: "",
    fuenteIngresos: "",

    // Intereses y Necesidades
    areasApoyo: [],
    otrasAreas: "",
    tieneApoyoGubernamental: "no",
    tipoApoyoGubernamental: "",

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
    successDescription: `Te has inscrito correctamente en el Programa Mujer Vulnerable.`,
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

  const handleAreasApoyoChange = (newValues) => {
    setFormData({
      ...formData,
      areasApoyo: newValues,
    });
  };

  const areasApoyo = [
    "Capacitación y empleo",
    "Emprendimiento",
    "Educación",
    "Salud y bienestar",
    "Apoyo psicológico y social",
    "Vivienda y subsidios",
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
          Formulario de Registro - Programa Mujer Vulnerable
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
        </FormSection>

        <FormSection
          title="Situación Socioeconómica"
          icon="💼"
          color={program.color}>
          <div className="space-y-4">
            <RadioOptions
              label="¿Es madre cabeza de hogar?"
              name="esMadreCabeza"
              value={formData.esMadreCabeza}
              onChange={handleRadioChange}
              required
            />

            <div className="space-y-2">
              <Label htmlFor="numeroHijos">
                Número de hijos a cargo<span className="text-red-500">*</span>
              </Label>
              <Input
                id="numeroHijos"
                name="numeroHijos"
                type="number"
                value={formData.numeroHijos}
                onChange={handleChange}
                required
              />
            </div>

            <RadioOptions
              label="¿Convive con otras personas?"
              name="conviveOtros"
              value={formData.conviveOtros}
              onChange={handleRadioChange}
              required
            />

            {formData.conviveOtros === "si" && (
              <div className="space-y-2">
                <Label htmlFor="conQuienesConvive">
                  Si la respuesta es sí, ¿con quiénes?
                </Label>
                <Input
                  id="conQuienesConvive"
                  name="conQuienesConvive"
                  value={formData.conQuienesConvive}
                  onChange={handleChange}
                />
              </div>
            )}

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

            <RadioOptions
              label="¿Cuenta con empleo actualmente?"
              name="tieneEmpleo"
              value={formData.tieneEmpleo}
              onChange={handleRadioChange}
              required
            />

            {formData.tieneEmpleo === "si" ? (
              <div className="space-y-2">
                <Label htmlFor="actividadLaboral">
                  Si la respuesta es sí, ¿en qué actividad laboral?
                </Label>
                <Input
                  id="actividadLaboral"
                  name="actividadLaboral"
                  value={formData.actividadLaboral}
                  onChange={handleChange}
                />
              </div>
            ) : (
              <div className="space-y-2">
                <Label htmlFor="fuenteIngresos">
                  Si la respuesta es no, ¿tiene alguna fuente de ingresos?
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
          title="Intereses y Necesidades"
          icon="💡"
          color={program.color}>
          <div className="space-y-4">
            <CheckboxGroup
              label="¿En qué áreas le gustaría recibir apoyo? (Marcar las que apliquen):"
              options={areasApoyo}
              selectedValues={formData.areasApoyo}
              onChange={handleAreasApoyoChange}
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
              label="¿Cuenta con algún tipo de apoyo gubernamental o institucional?"
              name="tieneApoyoGubernamental"
              value={formData.tieneApoyoGubernamental}
              onChange={handleRadioChange}
              required
            />

            {formData.tieneApoyoGubernamental === "si" && (
              <div className="space-y-2">
                <Label htmlFor="tipoApoyoGubernamental">
                  Si la respuesta es sí, ¿cuál?
                </Label>
                <Input
                  id="tipoApoyoGubernamental"
                  name="tipoApoyoGubernamental"
                  value={formData.tipoApoyoGubernamental}
                  onChange={handleChange}
                />
              </div>
            )}
          </div>
        </FormSection>

        <FormSection
          title="Motivación y Disponibilidad"
          icon="🌟"
          color={program.color}>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="motivacion">
                ¿Por qué desea participar en el Programa Mujer Vulnerable?
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
                placeholder="Ej: 5 horas semanales"
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
            text="Autorizo mi participación en el Programa Mujer Vulnerable y el uso de mis datos personales para efectos de gestión y comunicación del programa, según la Ley 1581 de 2012."
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
