"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useFormSubmit } from "@/hooks/useFormSubmit"; // Importa el hook
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

export default function SoftwareFactoryForm({ program, onClose }) {
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
    modalidadVinculacion: "pasantia",
    institucionEducativa: "",
    programaAcademico: "",
    semestreNivel: "",
    tiempoDisponible: "",

    // Experiencia y Habilidades
    tecnologias: [],
    proyectosRealizados: "",

    // Motivación e Intereses
    areasInteres: [],
    otrasAreas: "", // Mantener para el campo "Otras" si aplica en CheckboxGroup
    experienciaAgile: "",
    motivacion: "",

    // Autorización
    aceptaTerminos: false,
  });

  // Utiliza el hook useFormSubmit
  const { isSubmitting, handleSubmit } = useFormSubmit({
    programId: "software-factory", // <--- ¡Importante! Nuevo programId
    onSuccess: onClose,
    successDescription: `Te has inscrito correctamente en la factoría de software.`,
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

  const handleTecnologiasChange = (newValues) => {
    setFormData({
      ...formData,
      tecnologias: newValues,
    });
  };

  const handleAreasInteresChange = (newValues) => {
    setFormData({
      ...formData,
      areasInteres: newValues,
    });
  };

  const tecnologias = [
    "Desarrollo web (HTML, CSS, JavaScript)",
    "Backend (Python, Java, Node.js, etc.)",
    "Bases de datos (MySQL, PostgreSQL, MongoDB, etc.)",
    "Desarrollo móvil (Android, iOS, Flutter, React Native)",
    "Inteligencia Artificial / Machine Learning",
    "Ciberseguridad",
  ];

  const areasInteres = [
    "Desarrollo de Aplicaciones",
    "Inteligencia Artificial y Aprendizaje Automático",
    "Bases de Datos y Big Data",
    "Ciberseguridad",
    "Computación en la Nube y DevOps",
    "Internet de las Cosas (IoT)",
    "Realidad Virtual y Aumentada",
    "Blockchain y Criptomonedas",
    "Ingeniería de Software y Metodologías de Desarrollo",
    "Software para Educación e Inclusión",
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
          Formulario de Registro - Software Factory
        </h3>
        <p className="text-gray-600 mb-6">
          Complete el siguiente formulario para inscribirse en nuestra factoría
          de software.
        </p>
      </div>

      <form
        onSubmit={(e) => {
          e.preventDefault(); // Previene la recarga de la página
          handleSubmit(formData); // Llama al handleSubmit del hook, pasándole formData
        }}
        className="space-y-6">
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
          title="Información Académica"
          icon="🔗"
          color={program.color}>
          <div className="space-y-4">
            <RadioOptions
              label="Modalidad de vinculación"
              name="modalidadVinculacion"
              value={formData.modalidadVinculacion}
              onChange={handleRadioChange}
              options={[
                { value: "pasantia", label: "Pasantía" },
                { value: "voluntariado", label: "Voluntariado" },
              ]}
              required
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
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
                <Label htmlFor="programaAcademico">
                  Programa académico<span className="text-red-500">*</span>
                </Label>
                <Input
                  id="programaAcademico"
                  name="programaAcademico"
                  value={formData.programaAcademico}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="semestreNivel">
                  Semestre o nivel actual<span className="text-red-500">*</span>
                </Label>
                <Input
                  id="semestreNivel"
                  name="semestreNivel"
                  value={formData.semestreNivel}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="tiempoDisponible">
                  Tiempo disponible semanalmente
                  <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="tiempoDisponible"
                  name="tiempoDisponible"
                  value={formData.tiempoDisponible}
                  onChange={handleChange}
                  placeholder="Ej: 20 horas"
                  required
                />
              </div>
            </div>
          </div>
        </FormSection>

        <FormSection
          title="Experiencia y Habilidades"
          icon="🛠️"
          color={program.color}>
          <div className="space-y-4">
            <CheckboxGroup
              label="Conocimientos en tecnologías de desarrollo (marcar las que apliquen):"
              options={tecnologias}
              selectedValues={formData.tecnologias}
              onChange={handleTecnologiasChange}
              columns={2}
              showOtherOption={true}
              otherOptionLabel="Otras"
              otherValue={formData.otrasAreas} // Reutilizamos otrasAreas del estado para esto
              onOtherValueChange={(value) =>
                setFormData({ ...formData, otrasAreas: value })
              }
              required // Considera si es realmente requerido o si pueden no tener ninguna
            />

            <div className="space-y-2">
              <Label htmlFor="proyectosRealizados">
                Proyectos realizados (breve descripción o enlaces):
              </Label>
              <Textarea
                id="proyectosRealizados"
                name="proyectosRealizados"
                value={formData.proyectosRealizados}
                onChange={handleChange}
                rows={4}
              />
            </div>
          </div>
        </FormSection>

        <FormSection
          title="Motivación e Intereses"
          icon="💡"
          color={program.color}>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="motivacion">
                ¿Por qué desea vincularse a la factoría de software?
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

            <CheckboxGroup
              label="Áreas de interés en el desarrollo de software:"
              options={areasInteres}
              selectedValues={formData.areasInteres}
              onChange={handleAreasInteresChange}
              columns={2}
              showOtherOption={true} // Agregado showOtherOption para áreas de interés
              otherOptionLabel="Otras"
              otherValue={formData.otrasAreasInteres} // Nuevo campo para "otras" áreas de interés
              onOtherValueChange={(value) =>
                setFormData({ ...formData, otrasAreasInteres: value })
              }
              required // Considera si es realmente requerido o si pueden no tener ninguna
            />

            <div className="space-y-2">
              <Label htmlFor="experienciaAgile">
                ¿Tienes experiencia en trabajo colaborativo y metodologías
                ágiles?
              </Label>
              <Textarea
                id="experienciaAgile"
                name="experienciaAgile"
                value={formData.experienciaAgile}
                onChange={handleChange}
                rows={3}
              />
            </div>
          </div>
        </FormSection>

        <FormSection
          title="Autorización al Tratamiento de Datos"
          icon="✅"
          color={program.color}>
          <TermsCheckbox
            checked={formData.aceptaTerminos}
            onChange={(checked) =>
              setFormData({ ...formData, aceptaTerminos: checked })
            }
            text="Autorizo a la factoría de software para el uso y almacenamiento de mis datos personales con el propósito de gestionar mi vinculación y participación en sus actividades, según la Ley 1581 de 2012."
          />
        </FormSection>

        <FormButtons
          onCancel={onClose}
          isSubmitting={isSubmitting} // isSubmitting viene del hook
          submitColor={program.color}
        />
      </form>
    </motion.div>
  );
}
