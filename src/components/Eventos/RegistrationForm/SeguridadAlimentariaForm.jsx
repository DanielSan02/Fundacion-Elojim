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

export default function SeguridadAlimentariaForm({ program, onClose }) {
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
        description: `Te has inscrito correctamente en el Programa de Seguridad Alimentaria.`,
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
            <span className="mr-2">🌱</span>Situación Productiva y Agrícola
          </h4>

          <div className="space-y-4">
            <div>
              <Label className="mb-2 block">¿Es agricultor/a?</Label>
              <RadioGroup
                value={formData.esAgricultor}
                onValueChange={(value) =>
                  setFormData({ ...formData, esAgricultor: value })
                }
                className="flex space-x-4">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="si" id="agricultor-si" />
                  <Label htmlFor="agricultor-si">Sí</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="no" id="agricultor-no" />
                  <Label htmlFor="agricultor-no">No</Label>
                </div>
              </RadioGroup>
            </div>

            <div>
              <Label className="mb-2 block">
                ¿Cuenta con tierras disponibles para participar en el cultivo
                del proyecto?
              </Label>
              <RadioGroup
                value={formData.tieneTierras}
                onValueChange={(value) =>
                  setFormData({ ...formData, tieneTierras: value })
                }
                className="flex space-x-4">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="si" id="tierras-si" />
                  <Label htmlFor="tierras-si">Sí</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="no" id="tierras-no" />
                  <Label htmlFor="tierras-no">No</Label>
                </div>
              </RadioGroup>
            </div>

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
                    setFormData({ ...formData, pisoTermico: value })
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

            <div>
              <Label className="mb-2 block">
                ¿Tiene actualmente una actividad de cultivo específica?
              </Label>
              <RadioGroup
                value={formData.tieneCultivo}
                onValueChange={(value) =>
                  setFormData({ ...formData, tieneCultivo: value })
                }
                className="flex space-x-4">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="si" id="cultivo-si" />
                  <Label htmlFor="cultivo-si">Sí</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="no" id="cultivo-no" />
                  <Label htmlFor="cultivo-no">No</Label>
                </div>
              </RadioGroup>
            </div>

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

            <div>
              <Label className="mb-2 block">
                ¿Ha participado en otros proyectos de seguridad alimentaria o
                agrícolas?
              </Label>
              <RadioGroup
                value={formData.participacionPrevia}
                onValueChange={(value) =>
                  setFormData({ ...formData, participacionPrevia: value })
                }
                className="flex space-x-4">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="si" id="participacion-si" />
                  <Label htmlFor="participacion-si">Sí</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="no" id="participacion-no" />
                  <Label htmlFor="participacion-no">No</Label>
                </div>
              </RadioGroup>
            </div>

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
        </div>

        <div className="bg-gray-50 p-4 rounded-lg border">
          <h4
            className="font-semibold text-lg mb-4"
            style={{ color: program.color }}>
            <span className="mr-2">🛠️</span>Infraestructura y Recursos
          </h4>

          <div className="space-y-4">
            <div>
              <Label className="mb-2 block">
                ¿Cuenta con acceso a riego en sus tierras?
              </Label>
              <RadioGroup
                value={formData.tieneRiego}
                onValueChange={(value) =>
                  setFormData({ ...formData, tieneRiego: value })
                }
                className="flex space-x-4">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="si" id="riego-si" />
                  <Label htmlFor="riego-si">Sí</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="no" id="riego-no" />
                  <Label htmlFor="riego-no">No</Label>
                </div>
              </RadioGroup>
            </div>

            <div>
              <Label className="mb-2 block">
                ¿Dispone de herramientas o maquinaria agrícola?
              </Label>
              <RadioGroup
                value={formData.tieneHerramientas}
                onValueChange={(value) =>
                  setFormData({ ...formData, tieneHerramientas: value })
                }
                className="flex space-x-4">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="si" id="herramientas-si" />
                  <Label htmlFor="herramientas-si">Sí</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="no" id="herramientas-no" />
                  <Label htmlFor="herramientas-no">No</Label>
                </div>
              </RadioGroup>
            </div>

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

            <div>
              <Label className="mb-2 block">
                ¿Cuenta con acceso a asistencia técnica o capacitación agrícola?
              </Label>
              <RadioGroup
                value={formData.tieneAsistenciaTecnica}
                onValueChange={(value) =>
                  setFormData({ ...formData, tieneAsistenciaTecnica: value })
                }
                className="flex space-x-4">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="si" id="asistencia-si" />
                  <Label htmlFor="asistencia-si">Sí</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="no" id="asistencia-no" />
                  <Label htmlFor="asistencia-no">No</Label>
                </div>
              </RadioGroup>
            </div>
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
                ¿Por qué desea participar en el Programa de Seguridad
                Alimentaria?
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
                placeholder="Ej: 10 horas semanales"
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
              Autorizo mi participación en el Programa de Seguridad Alimentaria
              y el uso de mis datos personales para efectos de gestión y
              comunicación del programa, según la Ley 1581 de 2012.
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
