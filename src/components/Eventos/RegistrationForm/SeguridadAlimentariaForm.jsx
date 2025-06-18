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
// Asumiendo que EstratoSocial y GrupoEtnico se manejan en PersonalInfoFields
// Si no, necesitarás constantes para ellos aquí también.
const radioYesNoOptions = [
  { value: "true", label: "Sí" },
  { value: "false", label: "No" },
];

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
    barrio: "",
    comuna: "",
    estratoSocial: "",
    edad: "",
    grupoEtnico: "",

    // Situación Productiva y Agrícola
    esAgricultor: false, // ¡Cambiado a booleano!
    tieneTierras: false, // ¡Cambiado a booleano!
    hectareas: "",
    pisoTermico: "",
    tieneCultivo: false, // ¡Cambiado a booleano!
    tiposCultivo: "",
    participacionPrevia: false, // ¡Cambiado a booleano!
    proyectosAnteriores: "",

    // Infraestructura y Recursos
    tieneRiego: false, // ¡Cambiado a booleano!
    tieneHerramientas: false, // ¡Cambiado a booleano!
    tiposHerramientas: "",
    tieneAsistenciaTecnica: false, // ¡Cambiado a booleano!

    // Motivación y Disponibilidad
    motivacion: "",
    tiempoSemanal: "",
    expectativas: "",

    // Autorización
    aceptaTerminos: false,
  });

  // Usamos el hook useFormSubmit
  const { isSubmitting, handleSubmit } = useFormSubmit({
    programId: "seguridad-alimentaria", // Un ID único para este programa
    onSuccess: onClose,
    successDescription: "Formulario enviado exitosamente.",
    // Aquí puedes añadir un validationFn si necesitas validaciones extra en el frontend
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

      {/* Actualiza el onSubmit para usar el handleSubmit del hook */}
      <form
        onSubmit={(e) => {
          e.preventDefault(); // Previene la recarga de la página
          handleSubmit(formData); // Pasa solo formData al hook
        }}
        className="space-y-6">
        <FormSection title="Datos Personales" icon="📇" color={program.color}>
          <PersonalInfoFields
            formData={formData}
            onChange={setFormData}
            showContact={true}
            showEmail={true}
          />

          <div className="space-y-2">
            <Label htmlFor="barrio">
              Barrio<span className="text-red-500">*</span>
            </Label>
            <Input
              id="barrio"
              name="barrio"
              value={formData.barrio}
              onChange={handleChange}
              required // Es requerido según tu esquema
            />
          </div>

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
              value={formData.esAgricultor} // Pasa el booleano
              onChange={handleRadioChange}
              options={radioYesNoOptions}
              required
            />
            <RadioOptions
              label="¿Cuenta con tierras disponibles para participar en el cultivo del proyecto?"
              name="tieneTierras"
              value={formData.tieneTierras} // Pasa el booleano
              onChange={handleRadioChange}
              options={radioYesNoOptions}
              required
            />
            {formData.tieneTierras === true && ( // Compara con true (booleano)
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
            {formData.tieneTierras === true && ( // Compara con true (booleano)
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
              value={formData.tieneCultivo} // Pasa el booleano
              onChange={handleRadioChange}
              required
            />
            {formData.tieneCultivo === true && ( // Compara con true (booleano)
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
              value={formData.participacionPrevia} // Pasa el booleano
              onChange={handleRadioChange}
              required
            />
            {formData.participacionPrevia === true && ( // Compara con true (booleano)
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
              value={formData.tieneRiego} // Pasa el booleano
              onChange={handleRadioChange}
              required
            />

            <RadioOptions
              label="¿Dispone de herramientas o maquinaria agrícola?"
              name="tieneHerramientas"
              value={formData.tieneHerramientas} // Pasa el booleano
              onChange={handleRadioChange}
              required
            />

            {formData.tieneHerramientas === true && ( // Compara con true (booleano)
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
              value={formData.tieneAsistenciaTecnica} // Pasa el booleano
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
          isSubmitting={isSubmitting} // isSubmitting ahora viene del hook
          submitColor={program.color}
        />
      </form>
    </motion.div>
  );
}
