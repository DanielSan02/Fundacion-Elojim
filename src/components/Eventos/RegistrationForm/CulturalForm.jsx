"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { usePrograms } from "@/context/ProgramContext";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { cn } from "@/lib/utils";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

export default function CulturalForm({ program, onClose }) {
  const { registerProgram } = usePrograms();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [date, setDate] = useState();

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

  // Función para actualizar la fecha de nacimiento completa
  const actualizarFechaNacimiento = (dia, mes, ano) => {
    if (!dia || !mes || !ano) return "";

    // Asegurar que el día tenga dos dígitos
    const diaFormateado = dia.toString().padStart(2, "0");
    // Asegurar que el mes tenga dos dígitos
    const mesFormateado = mes.toString().padStart(2, "0");

    return `${ano}-${mesFormateado}-${diaFormateado}`;
  };

  const handleChange = (e) => {
    const { name, value, type } = e.target;

    if (type === "checkbox") {
      setFormData({
        ...formData,
        [name]: e.target.checked,
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.aceptaTerminos) {
      toast({
        title: "Error",
        description: "Debes aceptar los términos y condiciones para continuar.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    // Simulación de envío de datos
    setTimeout(() => {
      registerProgram(program.id);
      setIsSubmitting(false);
      toast({
        title: "¡Inscripción exitosa!",
        description: `Te has inscrito correctamente en el Programa Cultural.`,
        variant: "default",
      });
      onClose();
    }, 1500);
  };

  const estratoOptions = ["1", "2", "3", "4", "5", "6"];

  const gruposEtnicos = [
    "Ninguno",
    "Afrodescendiente",
    "Indígena",
    "Raizal",
    "Rom/Gitano",
    "Palenquero",
    "Otro",
  ];

  const nivelesEducativos = [
    "Primaria",
    "Secundaria",
    "Técnica/Tecnológica",
    "Universitaria",
    "Otro",
  ];

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

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="bg-gray-50 p-4 rounded-lg border">
          <h4
            className="font-semibold text-lg mb-4"
            style={{ color: program.color }}>
            <span className="mr-2">📇</span>Datos Personales
          </h4>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div className="space-y-2">
              <Label htmlFor="nombreCompleto">Nombres y apellidos</Label>
              <Input
                id="nombreCompleto"
                name="nombreCompleto"
                value={formData.nombreCompleto}
                onChange={handleChange}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="fechaNacimiento">Fecha de nacimiento</Label>
              <div className="grid grid-cols-3 gap-2">
                <Select
                  value={formData.diaNacimiento || ""}
                  onValueChange={(value) => {
                    setFormData({
                      ...formData,
                      diaNacimiento: value,
                      fechaNacimiento: actualizarFechaNacimiento(
                        value,
                        formData.mesNacimiento,
                        formData.anoNacimiento
                      ),
                    });
                  }}>
                  <SelectTrigger>
                    <SelectValue placeholder="Día" />
                  </SelectTrigger>
                  <SelectContent>
                    {Array.from({ length: 31 }, (_, i) => i + 1).map((dia) => (
                      <SelectItem key={dia} value={dia.toString()}>
                        {dia}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Select
                  value={formData.mesNacimiento || ""}
                  onValueChange={(value) => {
                    setFormData({
                      ...formData,
                      mesNacimiento: value,
                      fechaNacimiento: actualizarFechaNacimiento(
                        formData.diaNacimiento,
                        value,
                        formData.anoNacimiento
                      ),
                    });
                  }}>
                  <SelectTrigger>
                    <SelectValue placeholder="Mes" />
                  </SelectTrigger>
                  <SelectContent>
                    {[
                      { value: "1", label: "Enero" },
                      { value: "2", label: "Febrero" },
                      { value: "3", label: "Marzo" },
                      { value: "4", label: "Abril" },
                      { value: "5", label: "Mayo" },
                      { value: "6", label: "Junio" },
                      { value: "7", label: "Julio" },
                      { value: "8", label: "Agosto" },
                      { value: "9", label: "Septiembre" },
                      { value: "10", label: "Octubre" },
                      { value: "11", label: "Noviembre" },
                      { value: "12", label: "Diciembre" },
                    ].map((mes) => (
                      <SelectItem key={mes.value} value={mes.value}>
                        {mes.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Select
                  value={formData.anoNacimiento || ""}
                  onValueChange={(value) => {
                    setFormData({
                      ...formData,
                      anoNacimiento: value,
                      fechaNacimiento: actualizarFechaNacimiento(
                        formData.diaNacimiento,
                        formData.mesNacimiento,
                        value
                      ),
                    });
                  }}>
                  <SelectTrigger>
                    <SelectValue placeholder="Año" />
                  </SelectTrigger>
                  <SelectContent className="max-h-[200px]">
                    {Array.from(
                      { length: 105 },
                      (_, i) => new Date().getFullYear() - i
                    ).map((ano) => (
                      <SelectItem key={ano} value={ano.toString()}>
                        {ano}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            <div className="space-y-2">
              <Label htmlFor="comuna">Comuna</Label>
              <Input
                id="comuna"
                name="comuna"
                value={formData.comuna}
                onChange={handleChange}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="estratoSocial">Estrato social</Label>
              <Select
                value={formData.estratoSocial}
                onValueChange={(value) =>
                  setFormData({ ...formData, estratoSocial: value })
                }>
                <SelectTrigger>
                  <SelectValue placeholder="Seleccionar" />
                </SelectTrigger>
                <SelectContent>
                  {estratoOptions.map((estrato) => (
                    <SelectItem key={estrato} value={estrato}>
                      {estrato}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="edad">Edad</Label>
              <Input
                id="edad"
                name="edad"
                type="number"
                value={formData.edad}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div className="space-y-2">
              <Label htmlFor="grupoEtnico">Grupo étnico</Label>
              <Select
                value={formData.grupoEtnico}
                onValueChange={(value) =>
                  setFormData({ ...formData, grupoEtnico: value })
                }>
                <SelectTrigger>
                  <SelectValue placeholder="Seleccionar" />
                </SelectTrigger>
                <SelectContent>
                  {gruposEtnicos.map((grupo) => (
                    <SelectItem key={grupo} value={grupo}>
                      {grupo}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="documentoIdentidad">Documento de identidad</Label>
              <Input
                id="documentoIdentidad"
                name="documentoIdentidad"
                value={formData.documentoIdentidad}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div className="space-y-2">
              <Label htmlFor="telefonoContacto">Teléfono de contacto</Label>
              <Input
                id="telefonoContacto"
                name="telefonoContacto"
                value={formData.telefonoContacto}
                onChange={handleChange}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="correoElectronico">Correo electrónico</Label>
              <Input
                id="correoElectronico"
                name="correoElectronico"
                type="email"
                value={formData.correoElectronico}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="direccion">Dirección de residencia</Label>
              <Input
                id="direccion"
                name="direccion"
                value={formData.direccion}
                onChange={handleChange}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="municipioDepartamento">
                Municipio / Departamento
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
        </div>

        <div className="bg-gray-50 p-4 rounded-lg border">
          <h4
            className="font-semibold text-lg mb-4"
            style={{ color: program.color }}>
            <span className="mr-2">💼</span>Datos Socioeconómicos
          </h4>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="nivelEducativo">Nivel educativo</Label>
              <Select
                value={formData.nivelEducativo}
                onValueChange={(value) =>
                  setFormData({ ...formData, nivelEducativo: value })
                }>
                <SelectTrigger>
                  <SelectValue placeholder="Seleccionar" />
                </SelectTrigger>
                <SelectContent>
                  {nivelesEducativos.map((nivel) => (
                    <SelectItem key={nivel} value={nivel}>
                      {nivel}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="ocupacion">Ocupación</Label>
              <Input
                id="ocupacion"
                name="ocupacion"
                value={formData.ocupacion}
                onChange={handleChange}
                required
              />
            </div>
          </div>
        </div>

        <div className="bg-gray-50 p-4 rounded-lg border">
          <h4
            className="font-semibold text-lg mb-4"
            style={{ color: program.color }}>
            <span className="mr-2">🎭</span>Área de Interés
          </h4>

          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Seleccione el área en la que deseas participar:</Label>
              <RadioGroup
                value={formData.areaInteres}
                onValueChange={(value) =>
                  setFormData({ ...formData, areaInteres: value })
                }
                className="grid grid-cols-2 md:grid-cols-3 gap-2">
                {areasInteres.map((area) => (
                  <div key={area} className="flex items-center space-x-2">
                    <RadioGroupItem value={area} id={`area-${area}`} />
                    <Label htmlFor={`area-${area}`}>{area}</Label>
                  </div>
                ))}
              </RadioGroup>
            </div>

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
        </div>

        <div className="bg-gray-50 p-4 rounded-lg border">
          <h4
            className="font-semibold text-lg mb-4"
            style={{ color: program.color }}>
            <span className="mr-2">🎓</span>Experiencia en el Área Seleccionada
          </h4>

          <div className="space-y-4">
            <div>
              <Label className="mb-2 block">
                ¿Has recibido formación previa en esta área?
              </Label>
              <RadioGroup
                value={formData.formacionPrevia}
                onValueChange={(value) =>
                  setFormData({ ...formData, formacionPrevia: value })
                }
                className="flex space-x-4">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="si" id="formacion-si" />
                  <Label htmlFor="formacion-si">Sí</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="no" id="formacion-no" />
                  <Label htmlFor="formacion-no">No</Label>
                </div>
              </RadioGroup>
            </div>

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

            <div>
              <Label className="mb-2 block">
                ¿Perteneces o has pertenecido a algún grupo cultural o
                artístico?
              </Label>
              <RadioGroup
                value={formData.perteneceGrupo}
                onValueChange={(value) =>
                  setFormData({ ...formData, perteneceGrupo: value })
                }
                className="flex space-x-4">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="si" id="grupo-si" />
                  <Label htmlFor="grupo-si">Sí</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="no" id="grupo-no" />
                  <Label htmlFor="grupo-no">No</Label>
                </div>
              </RadioGroup>
            </div>

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
        </div>

        <div className="bg-gray-50 p-4 rounded-lg border">
          <h4
            className="font-semibold text-lg mb-4"
            style={{ color: program.color }}>
            <span className="mr-2">📅</span>Disponibilidad y Expectativas
          </h4>

          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="diasDisponibles">
                Días disponibles para participar:
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
        </div>

        <div className="bg-gray-50 p-4 rounded-lg border">
          <h4
            className="font-semibold text-lg mb-4"
            style={{ color: program.color }}>
            <span className="mr-2">✅</span>Autorización de Participación y
            Tratamiento de Datos
          </h4>

          <div className="flex items-center space-x-2">
            <Checkbox
              id="aceptaTerminos"
              name="aceptaTerminos"
              checked={formData.aceptaTerminos}
              onCheckedChange={(checked) =>
                setFormData({ ...formData, aceptaTerminos: checked })
              }
            />
            <Label htmlFor="aceptaTerminos" className="text-sm">
              Autorizo el uso de mis datos personales para los fines del
              programa cultural, conforme a la Ley de Protección de Datos
              Personales (Ley 1581 de 2012).
            </Label>
          </div>
        </div>

        <div className="flex justify-end space-x-4 pt-4">
          <Button type="button" variant="outline" onClick={onClose}>
            Cancelar
          </Button>
          <Button
            type="submit"
            disabled={isSubmitting}
            style={{
              backgroundColor: program.color,
              color: "white",
              borderColor: program.color,
            }}>
            {isSubmitting ? "Procesando..." : "Enviar solicitud"}
          </Button>
        </div>
      </form>
    </motion.div>
  );
}
