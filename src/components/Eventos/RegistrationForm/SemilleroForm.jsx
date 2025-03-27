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

export default function SemilleroForm({ program, onClose }) {
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

    // Información de Vinculación
    tipoVinculacion: "institucion",
    nombreInstitucion: "",
    nivelEducativo: "",

    // Intereses y Experiencia
    participacionPrevia: "no",
    areasInteres: [],
    otrasAreas: "",
    tieneProyecto: "no",
    descripcionProyecto: "",

    // Habilidades y Disponibilidad
    habilidades: "",
    disponibilidad: "",

    // Motivación
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

  const handleAreaInteresChange = (area) => {
    setFormData((prev) => {
      const currentAreas = [...prev.areasInteres];

      if (currentAreas.includes(area)) {
        return {
          ...prev,
          areasInteres: currentAreas.filter((a) => a !== area),
        };
      } else {
        return {
          ...prev,
          areasInteres: [...currentAreas, area],
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
        description: `Te has inscrito correctamente en el Semillero de Innovación y Emprendimiento.`,
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

  const areasInteres = [
    "Emprendimiento social",
    "Tecnología e innovación",
    "Medio ambiente y sostenibilidad",
    "Transformación digital",
    "Desarrollo de productos o servicios",
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
          Formulario de Registro - Semillero de Innovación y Emprendimiento
        </h3>
        <p className="text-gray-600 mb-6">
          Complete el siguiente formulario para inscribirse en el semillero.
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

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div className="space-y-2">
              <Label htmlFor="correoElectronico">Correo electrónico</Label>
              <Input
                id="correoElectronico"
                name="correoElectronico"
                type="email"
                value={formData.correoElectronico}
                onChange={handleChange}
                required
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
        </div>

        <div className="bg-gray-50 p-4 rounded-lg border">
          <h4
            className="font-semibold text-lg mb-4"
            style={{ color: program.color }}>
            <span className="mr-2">🔗</span>Información de Vinculación
          </h4>

          <div className="space-y-4">
            <div>
              <Label className="mb-2 block">
                ¿Cómo desea vincularse al semillero?
              </Label>
              <RadioGroup
                value={formData.tipoVinculacion}
                onValueChange={(value) =>
                  setFormData({ ...formData, tipoVinculacion: value })
                }
                className="flex flex-col space-y-2">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem
                    value="institucion"
                    id="vinculacion-institucion"
                  />
                  <Label htmlFor="vinculacion-institucion">
                    A través de una institución educativa
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem
                    value="comunidad"
                    id="vinculacion-comunidad"
                  />
                  <Label htmlFor="vinculacion-comunidad">
                    Como miembro de una comunidad
                  </Label>
                </div>
              </RadioGroup>
            </div>

            <div className="space-y-2">
              <Label htmlFor="nombreInstitucion">
                Nombre de la institución educativa o comunidad
              </Label>
              <Input
                id="nombreInstitucion"
                name="nombreInstitucion"
                value={formData.nombreInstitucion}
                onChange={handleChange}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="nivelEducativo">
                Nivel educativo o perfil profesional
              </Label>
              <Input
                id="nivelEducativo"
                name="nivelEducativo"
                value={formData.nivelEducativo}
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
            <span className="mr-2">💡</span>Intereses y Experiencia
          </h4>

          <div className="space-y-4">
            <div>
              <Label className="mb-2 block">
                ¿Ha participado anteriormente en iniciativas de innovación o
                emprendimiento?
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

            <div>
              <Label className="mb-2 block">
                Áreas de interés (Marcar las que apliquen):
              </Label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                {areasInteres.map((area) => (
                  <div key={area} className="flex items-center space-x-2">
                    <Checkbox
                      id={`area-${area}`}
                      checked={formData.areasInteres.includes(area)}
                      onCheckedChange={() => handleAreaInteresChange(area)}
                    />
                    <Label htmlFor={`area-${area}`}>{area}</Label>
                  </div>
                ))}
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="area-otras"
                    checked={formData.areasInteres.includes("Otras")}
                    onCheckedChange={() => handleAreaInteresChange("Otras")}
                  />
                  <Label htmlFor="area-otras">Otras</Label>
                </div>
              </div>

              {formData.areasInteres.includes("Otras") && (
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
                ¿Tiene un proyecto en marcha o una idea de emprendimiento?
              </Label>
              <RadioGroup
                value={formData.tieneProyecto}
                onValueChange={(value) =>
                  setFormData({ ...formData, tieneProyecto: value })
                }
                className="flex space-x-4">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="si" id="proyecto-si" />
                  <Label htmlFor="proyecto-si">Sí</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="no" id="proyecto-no" />
                  <Label htmlFor="proyecto-no">No</Label>
                </div>
              </RadioGroup>
            </div>

            {formData.tieneProyecto === "si" && (
              <div className="space-y-2">
                <Label htmlFor="descripcionProyecto">
                  Describa brevemente su proyecto o idea:
                </Label>
                <Textarea
                  id="descripcionProyecto"
                  name="descripcionProyecto"
                  value={formData.descripcionProyecto}
                  onChange={handleChange}
                  rows={3}
                  required
                />
              </div>
            )}
          </div>
        </div>

        <div className="bg-gray-50 p-4 rounded-lg border">
          <h4
            className="font-semibold text-lg mb-4"
            style={{ color: program.color }}>
            <span className="mr-2">🛠️</span>Habilidades y Disponibilidad
          </h4>

          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="habilidades">
                ¿En qué áreas considera que tiene habilidades relevantes para el
                semillero?
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

            <div className="space-y-2">
              <Label htmlFor="disponibilidad">
                Disponibilidad horaria para actividades del semillero
              </Label>
              <Input
                id="disponibilidad"
                name="disponibilidad"
                value={formData.disponibilidad}
                onChange={handleChange}
                placeholder="Ej: Lunes y miércoles de 3pm a 5pm"
                required
              />
            </div>
          </div>
        </div>

        <div className="bg-gray-50 p-4 rounded-lg border">
          <h4
            className="font-semibold text-lg mb-4"
            style={{ color: program.color }}>
            <span className="mr-2">🌱</span>Motivación
          </h4>

          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="motivacion">
                ¿Por qué desea unirse al Semillero de Innovación y
                Emprendimiento?
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
                ¿Qué espera lograr con su participación en el semillero?
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
              Autorizo mi participación en el Semillero de Innovación y
              Emprendimiento y el uso de mis datos personales para efectos de
              gestión y comunicación del programa, según la Ley 1581 de 2012.
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
