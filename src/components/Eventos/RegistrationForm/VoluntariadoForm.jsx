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

import {
  NIVELES_EDUCATIVOS,
  TIPOS_DOCUMENTO,
} from "../form-utils/formConstants";

export default function VoluntariadoForm({ program, onClose }) {
  const [formData, setFormData] = useState({
    // Datos Personales
    nombreCompleto: "",
    documentoIdentidad: "",
    fechaNacimiento: "",
    direccion: "",
    telefonoContacto: "",
    correoElectronico: "",
    comuna: "",
    estratoSocial: "",
    edad: "",
    grupoEtnico: "",
    nivelEducativo: "",
    profesionOcupacion: "",

    // Información de Disponibilidad
    disponibilidad: "parcial",
    diasEspecificos: "",
    horasDisponibles: "",

    // Áreas de Interés
    areasInteres: [],
    otrasAreas: "",

    // Habilidades y Conocimientos
    habilidades: "",

    // Experiencia previa
    experienciaPrevia: {
      fundacion: "",
      funcion: "",
      tiempo: "",
    },

    // Motivación
    motivacion: "",

    // Referencias personales
    referencias: [
      { nombre: "", telefono: "" },
      { nombre: "", telefono: "" },
    ],

    // Autorización
    aceptaTerminos: false,
  });

  const { isSubmitting, handleSubmit } = useFormSubmit({
    programId: "voluntariado",
    onSuccess: onClose,
    successDescription: `Te has inscrito correctamente como voluntario en ${program.title}.`,
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

  const handleAreaInteresChange = (newValues) => {
    setFormData({
      ...formData,
      areasInteres: newValues,
    });
  };

  const handleExperienciaChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      experienciaPrevia: {
        ...prev.experienciaPrevia,
        [field]: value,
      },
    }));
  };

  const handleReferenciaChange = (index, field, value) => {
    setFormData((prev) => {
      const referencias = [...prev.referencias];
      referencias[index] = { ...referencias[index], [field]: value };
      return { ...prev, referencias };
    });
  };

  const areasInteres = [
    "Educación",
    "Medio ambiente",
    "Apoyo psicosocial",
    "Gestión administrativa",
    "Comunicación y redes sociales",
    "Actividades recreativas",
    "Logística y eventos",
    "Visitar comunidades para entrega de alimentos",
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
          Formulario de Registro de Voluntariado Social
        </h3>
        <p className="text-gray-600 mb-6">
          Complete el siguiente formulario para inscribirse como voluntario.
        </p>
      </div>

      <form
        onSubmit={(e) => {
          e.preventDefault(); // <-- ¡ESENCIAL! Previene la recarga de la página
          handleSubmit(formData); // <-- SOLO pasar formData al hook
        }}
        className="space-y-6">
        <FormSection title="Información Personal" color={program.color}>
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
                value={formData.tipoDocumento || ""}
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
                value={formData.numeroDocumento || ""}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
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
              <Label htmlFor="profesionOcupacion">
                Profesión/ocupación<span className="text-red-500">*</span>
              </Label>
              <Input
                id="profesionOcupacion"
                name="profesionOcupacion"
                value={formData.profesionOcupacion}
                onChange={handleChange}
                required
              />
            </div>
          </div>
        </FormSection>

        <FormSection
          title="Información de Disponibilidad"
          color={program.color}>
          <div className="space-y-4">
            <RadioOptions
              label="¿Tiene disponibilidad de tiempo completo o parcial?"
              name="disponibilidad"
              value={formData.disponibilidad}
              onChange={handleRadioChange}
              options={[
                { value: "TIEMPO_COMPLETO", label: "Tiempo completo" },
                { value: "TIEMPO_PARCIAL", label: "Tiempo parcial" },
                { value: "FINES_DE_SEMANA", label: "Fines de semana" },
                { value: "DIAS_ESPECIFICOS", label: "Días específicos" },
              ]}
              orientation="vertical"
              required
            />

            {formData.disponibilidad === "DIAS_ESPECIFICOS" && (
              <div className="space-y-2">
                <Label htmlFor="diasEspecificos">Especifique los días</Label>
                <Input
                  id="diasEspecificos"
                  name="diasEspecificos"
                  value={formData.diasEspecificos}
                  onChange={handleChange}
                />
              </div>
            )}

            <div className="space-y-2">
              <Label htmlFor="horasDisponibles">
                Horas disponibles por semana
                <span className="text-red-500">*</span>
              </Label>
              <Input
                id="horasDisponibles"
                name="horasDisponibles"
                value={formData.horasDisponibles}
                onChange={handleChange}
                required
              />
            </div>
          </div>
        </FormSection>

        <FormSection title="Áreas de Interés" color={program.color}>
          <CheckboxGroup
            label="Seleccione las áreas en las que le gustaría colaborar:"
            options={areasInteres}
            selectedValues={formData.areasInteres}
            onChange={handleAreaInteresChange}
            columns={2}
            showOtherOption={true}
            otherOptionLabel="Otros"
            otherValue={formData.otrasAreas}
            onOtherValueChange={(value) =>
              setFormData({ ...formData, otrasAreas: value })
            }
            required
          />
        </FormSection>

        <FormSection title="Habilidades y Conocimientos" color={program.color}>
          <div className="space-y-2">
            <Label htmlFor="habilidades">
              Describe brevemente las habilidades, conocimientos o experiencias
              que puedas aportar:
              <span className="text-red-500">*</span>
            </Label>
            <Textarea
              id="habilidades"
              name="habilidades"
              value={formData.habilidades}
              onChange={handleChange}
              rows={4}
              required
            />
          </div>
        </FormSection>

        <FormSection
          title="Experiencia previa como voluntario"
          color={program.color}>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="fundacion">Fundación/Organización</Label>
              <Input
                id="fundacion"
                value={formData.experienciaPrevia.fundacion}
                onChange={(e) =>
                  handleExperienciaChange("fundacion", e.target.value)
                }
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="funcion">Función desempeñada</Label>
              <Input
                id="funcion"
                value={formData.experienciaPrevia.funcion}
                onChange={(e) =>
                  handleExperienciaChange("funcion", e.target.value)
                }
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="tiempo">Tiempo de servicio</Label>
              <Input
                id="tiempo"
                value={formData.experienciaPrevia.tiempo}
                onChange={(e) =>
                  handleExperienciaChange("tiempo", e.target.value)
                }
              />
            </div>
          </div>
        </FormSection>

        <FormSection title="Motivación" color={program.color}>
          <div className="space-y-2">
            <Label htmlFor="motivacion">
              ¿Por qué desea participar como voluntario en esta fundación?
              <span className="text-red-500">*</span>
            </Label>
            <Textarea
              id="motivacion"
              name="motivacion"
              value={formData.motivacion}
              onChange={handleChange}
              rows={4}
              required
            />
          </div>
        </FormSection>

        <FormSection
          title="Referencias personales (opcional)"
          color={program.color}>
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="referencia1Nombre">Nombre</Label>
                <Input
                  id="referencia1Nombre"
                  value={formData.referencias[0].nombre}
                  onChange={(e) =>
                    handleReferenciaChange(0, "nombre", e.target.value)
                  }
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="referencia1Telefono">Teléfono</Label>
                <Input
                  id="referencia1Telefono"
                  value={formData.referencias[0].telefono}
                  onChange={(e) =>
                    handleReferenciaChange(0, "telefono", e.target.value)
                  }
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="referencia2Nombre">Nombre</Label>
                <Input
                  id="referencia2Nombre"
                  value={formData.referencias[1].nombre}
                  onChange={(e) =>
                    handleReferenciaChange(1, "nombre", e.target.value)
                  }
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="referencia2Telefono">Teléfono</Label>
                <Input
                  id="referencia2Telefono"
                  value={formData.referencias[1].telefono}
                  onChange={(e) =>
                    handleReferenciaChange(1, "telefono", e.target.value)
                  }
                />
              </div>
            </div>
          </div>
        </FormSection>

        <FormSection title="Declaración" color={program.color}>
          <TermsCheckbox
            checked={formData.aceptaTerminos}
            onChange={(checked) =>
              setFormData({ ...formData, aceptaTerminos: checked })
            }
            text="Declaro que la información suministrada es veraz y autorizo el tratamiento de mis datos personales de acuerdo con la ley de protección de datos 1581 de 2012."
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
