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

export default function MujerVulnerableForm({ program, onClose }) {
  const { registerProgram } = usePrograms();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [date, setDate] = useState();

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

  const handleAreaApoyoChange = (area) => {
    setFormData((prev) => {
      const currentAreas = [...prev.areasApoyo];

      if (currentAreas.includes(area)) {
        return {
          ...prev,
          areasApoyo: currentAreas.filter((a) => a !== area),
        };
      } else {
        return {
          ...prev,
          areasApoyo: [...currentAreas, area],
        };
      }
    });
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
        description: `Te has inscrito correctamente en el Programa Mujer Vulnerable.`,
        variant: "default",
      });
      onClose();
    }, 1500);
  };

  const tiposDocumento = ["CC", "TI", "CE", "Pasaporte"];
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
    "Ninguno",
  ];

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

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="bg-gray-50 p-4 rounded-lg border">
          <h4
            className="font-semibold text-lg mb-4"
            style={{ color: program.color }}>
            <span className="mr-2">📇</span>Datos Personales
          </h4>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div className="space-y-2">
              <Label htmlFor="nombreCompleto">Nombre completo</Label>
              <Input
                id="nombreCompleto"
                name="nombreCompleto"
                value={formData.nombreCompleto}
                onChange={handleChange}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="tipoDocumento">Tipo y número de documento</Label>
              <div className="flex space-x-2">
                <Select
                  value={formData.tipoDocumento}
                  onValueChange={(value) =>
                    setFormData({ ...formData, tipoDocumento: value })
                  }>
                  <SelectTrigger className="w-[30%]">
                    <SelectValue placeholder="Tipo" />
                  </SelectTrigger>
                  <SelectContent>
                    {tiposDocumento.map((tipo) => (
                      <SelectItem key={tipo} value={tipo}>
                        {tipo}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Input
                  id="numeroDocumento"
                  name="numeroDocumento"
                  value={formData.numeroDocumento}
                  onChange={handleChange}
                  className="w-[70%]"
                  required
                />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
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
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
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
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
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
        </div>

        <div className="bg-gray-50 p-4 rounded-lg border">
          <h4
            className="font-semibold text-lg mb-4"
            style={{ color: program.color }}>
            <span className="mr-2">💼</span>Situación Socioeconómica
          </h4>

          <div className="space-y-4">
            <div>
              <Label className="mb-2 block">¿Es madre cabeza de hogar?</Label>
              <RadioGroup
                value={formData.esMadreCabeza}
                onValueChange={(value) =>
                  setFormData({ ...formData, esMadreCabeza: value })
                }
                className="flex space-x-4">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="si" id="madre-si" />
                  <Label htmlFor="madre-si">Sí</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="no" id="madre-no" />
                  <Label htmlFor="madre-no">No</Label>
                </div>
              </RadioGroup>
            </div>

            <div className="space-y-2">
              <Label htmlFor="numeroHijos">Número de hijos a cargo</Label>
              <Input
                id="numeroHijos"
                name="numeroHijos"
                type="number"
                value={formData.numeroHijos}
                onChange={handleChange}
                required
              />
            </div>

            <div>
              <Label className="mb-2 block">¿Convive con otras personas?</Label>
              <RadioGroup
                value={formData.conviveOtros}
                onValueChange={(value) =>
                  setFormData({ ...formData, conviveOtros: value })
                }
                className="flex space-x-4">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="si" id="convive-si" />
                  <Label htmlFor="convive-si">Sí</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="no" id="convive-no" />
                  <Label htmlFor="convive-no">No</Label>
                </div>
              </RadioGroup>
            </div>

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
              <Label htmlFor="nivelEducativo">Nivel educativo alcanzado</Label>
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

            <div>
              <Label className="mb-2 block">
                ¿Cuenta con empleo actualmente?
              </Label>
              <RadioGroup
                value={formData.tieneEmpleo}
                onValueChange={(value) =>
                  setFormData({ ...formData, tieneEmpleo: value })
                }
                className="flex space-x-4">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="si" id="empleo-si" />
                  <Label htmlFor="empleo-si">Sí</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="no" id="empleo-no" />
                  <Label htmlFor="empleo-no">No</Label>
                </div>
              </RadioGroup>
            </div>

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
        </div>

        <div className="bg-gray-50 p-4 rounded-lg border">
          <h4
            className="font-semibold text-lg mb-4"
            style={{ color: program.color }}>
            <span className="mr-2">💡</span>Intereses y Necesidades
          </h4>

          <div className="space-y-4">
            <div>
              <Label className="mb-2 block">
                ¿En qué áreas le gustaría recibir apoyo? (Marcar las que
                apliquen):
              </Label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                {areasApoyo.map((area) => (
                  <div key={area} className="flex items-center space-x-2">
                    <Checkbox
                      id={`area-${area}`}
                      checked={formData.areasApoyo.includes(area)}
                      onCheckedChange={() => handleAreaApoyoChange(area)}
                    />
                    <Label htmlFor={`area-${area}`}>{area}</Label>
                  </div>
                ))}
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="area-otras"
                    checked={formData.areasApoyo.includes("Otras")}
                    onCheckedChange={() => handleAreaApoyoChange("Otras")}
                  />
                  <Label htmlFor="area-otras">Otras</Label>
                </div>
              </div>

              {formData.areasApoyo.includes("Otras") && (
                <div className="mt-2">
                  <Input
                    id="otrasAreas"
                    name="otrasAreas"
                    value={formData.otrasAreas}
                    onChange={handleChange}
                    placeholder="Especifique otras áreas"
                  />
                </div>
              )}
            </div>

            <div>
              <Label className="mb-2 block">
                ¿Cuenta con algún tipo de apoyo gubernamental o institucional?
              </Label>
              <RadioGroup
                value={formData.tieneApoyoGubernamental}
                onValueChange={(value) =>
                  setFormData({ ...formData, tieneApoyoGubernamental: value })
                }
                className="flex space-x-4">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="si" id="apoyo-si" />
                  <Label htmlFor="apoyo-si">Sí</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="no" id="apoyo-no" />
                  <Label htmlFor="apoyo-no">No</Label>
                </div>
              </RadioGroup>
            </div>

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
        </div>

        <div className="bg-gray-50 p-4 rounded-lg border">
          <h4
            className="font-semibold text-lg mb-4"
            style={{ color: program.color }}>
            <span className="mr-2">🌟</span>Motivación y Disponibilidad
          </h4>

          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="motivacion">
                ¿Por qué desea participar en el Programa Mujer Vulnerable?
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
              Autorizo mi participación en el Programa Mujer Vulnerable y el uso
              de mis datos personales para efectos de gestión y comunicación del
              programa, según la Ley 1581 de 2012.
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
