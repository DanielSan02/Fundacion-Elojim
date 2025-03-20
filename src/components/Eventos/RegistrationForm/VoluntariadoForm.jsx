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

export default function VoluntariadoForm({ program, onClose }) {
  const { registerProgram } = usePrograms();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [date, setDate] = useState();

  const [formData, setFormData] = useState({
    nombreCompleto: "",
    documentoIdentidad: "",
    fechaNacimiento: "",
    direccion: "",
    telefono: "",
    correoElectronico: "",
    comuna: "",
    estratoSocial: "",
    edad: "",
    grupoEtnico: "",
    nivelEducativo: "",
    profesionOcupacion: "",
    disponibilidad: "parcial",
    diasEspecificos: "",
    horasDisponibles: "",
    areasInteres: [],
    habilidades: "",
    experienciaPrevia: {
      fundacion: "",
      funcion: "",
      tiempo: "",
    },
    motivacion: "",
    referencias: [
      { nombre: "", telefono: "" },
      { nombre: "", telefono: "" },
    ],
    aceptaTerminos: false,
  });

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

  const handleReferenciaChange = (index, field, value) => {
    setFormData((prev) => {
      const referencias = [...prev.referencias];
      referencias[index] = { ...referencias[index], [field]: value };
      return { ...prev, referencias };
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
        description: `Te has inscrito correctamente como voluntario en ${program.title}.`,
        variant: "default",
      });
      onClose();
    }, 1500);
  };

  const nivelEducativoOptions = [
    "Primaria",
    "Secundaria",
    "Técnico",
    "Tecnólogo",
    "Pregrado",
    "Especialización",
    "Maestría",
    "Doctorado",
  ];

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

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="bg-gray-50 p-4 rounded-lg border">
          <h4
            className="font-semibold text-lg mb-4"
            style={{ color: program.color }}>
            Información Personal
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
              <Label htmlFor="fechaNacimiento">Fecha de nacimiento</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant={"outline"}
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !date && "text-muted-foreground"
                    )}>
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {date
                      ? format(date, "PPP", { locale: es })
                      : "Seleccionar fecha"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={(date) => {
                      setDate(date);
                      setFormData({
                        ...formData,
                        fechaNacimiento: date ? format(date, "yyyy-MM-dd") : "",
                      });
                    }}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>
            <div className="space-y-2">
              <Label htmlFor="telefono">Teléfono</Label>
              <Input
                id="telefono"
                name="telefono"
                value={formData.telefono}
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
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="direccion">Dirección</Label>
              <Input
                id="direccion"
                name="direccion"
                value={formData.direccion}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
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
                  {nivelEducativoOptions.map((nivel) => (
                    <SelectItem key={nivel} value={nivel}>
                      {nivel}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="profesionOcupacion">Profesión/ocupación</Label>
              <Input
                id="profesionOcupacion"
                name="profesionOcupacion"
                value={formData.profesionOcupacion}
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
            Información de Disponibilidad
          </h4>

          <div className="space-y-4">
            <div>
              <Label className="mb-2 block">
                ¿Tiene disponibilidad de tiempo completo o parcial?
              </Label>
              <RadioGroup
                value={formData.disponibilidad}
                onValueChange={(value) =>
                  setFormData({ ...formData, disponibilidad: value })
                }
                className="flex flex-col space-y-2">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="completo" id="tiempo-completo" />
                  <Label htmlFor="tiempo-completo">Tiempo completo</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="parcial" id="tiempo-parcial" />
                  <Label htmlFor="tiempo-parcial">Tiempo parcial</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="fines-semana" id="fines-semana" />
                  <Label htmlFor="fines-semana">Fines de semana</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem
                    value="dias-especificos"
                    id="dias-especificos"
                  />
                  <Label htmlFor="dias-especificos">Días específicos</Label>
                </div>
              </RadioGroup>
            </div>

            {formData.disponibilidad === "dias-especificos" && (
              <div className="space-y-2">
                <Label htmlFor="diasEspecificos">Especifique los días</Label>
                <Input
                  id="diasEspecificos"
                  name="diasEspecificos"
                  value={formData.diasEspecificos}
                  onChange={handleChange}
                  placeholder="Ej: Lunes y miércoles"
                />
              </div>
            )}

            <div className="space-y-2">
              <Label htmlFor="horasDisponibles">
                Horas disponibles por semana
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
        </div>

        <div className="bg-gray-50 p-4 rounded-lg border">
          <h4
            className="font-semibold text-lg mb-4"
            style={{ color: program.color }}>
            Áreas de Interés
          </h4>

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
                id="area-otros"
                checked={formData.areasInteres.includes("Otros")}
                onCheckedChange={() => handleAreaInteresChange("Otros")}
              />
              <Label htmlFor="area-otros">Otros</Label>
            </div>
          </div>
        </div>

        <div className="bg-gray-50 p-4 rounded-lg border">
          <h4
            className="font-semibold text-lg mb-4"
            style={{ color: program.color }}>
            Habilidades y Conocimientos
          </h4>

          <div className="space-y-2">
            <Label htmlFor="habilidades">
              Describe brevemente las habilidades, conocimientos o experiencias
              que puedas aportar:
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
        </div>

        <div className="bg-gray-50 p-4 rounded-lg border">
          <h4
            className="font-semibold text-lg mb-4"
            style={{ color: program.color }}>
            Experiencia previa como voluntario
          </h4>

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
        </div>

        <div className="bg-gray-50 p-4 rounded-lg border">
          <h4
            className="font-semibold text-lg mb-4"
            style={{ color: program.color }}>
            Motivación
          </h4>

          <div className="space-y-2">
            <Label htmlFor="motivacion">
              ¿Por qué desea participar como voluntario en esta fundación?
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
        </div>

        <div className="bg-gray-50 p-4 rounded-lg border">
          <h4
            className="font-semibold text-lg mb-4"
            style={{ color: program.color }}>
            Referencias personales (opcional)
          </h4>

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
        </div>

        <div className="bg-gray-50 p-4 rounded-lg border">
          <h4
            className="font-semibold text-lg mb-4"
            style={{ color: program.color }}>
            Declaración
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
              Declaro que la información suministrada es veraz y autorizo el
              tratamiento de mis datos personales de acuerdo con la ley de
              protección de datos 1581 de 2012.
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
