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

export default function SoftwareFactoryForm({ program, onClose }) {
  const { registerProgram } = usePrograms();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [date, setDate] = useState();

  const [formData, setFormData] = useState({
    nombreCompleto: "",
    tipoDocumento: "",
    numeroDocumento: "",
    fechaNacimiento: "",
    telefono: "",
    correoElectronico: "",
    direccion: "",
    comuna: "",
    estratoSocial: "",
    edad: "",
    grupoEtnico: "",
    institucionEducativa: "",
    programaAcademico: "",
    semestreNivel: "",
    modalidadVinculacion: "pasantia",
    tiempoDisponible: "",
    tecnologias: [],
    proyectosRealizados: "",
    motivacion: "",
    areasInteres: [],
    experienciaAgile: "",
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

  const handleTecnologiaChange = (tecnologia) => {
    setFormData((prev) => {
      const currentTecnologias = [...prev.tecnologias];

      if (currentTecnologias.includes(tecnologia)) {
        return {
          ...prev,
          tecnologias: currentTecnologias.filter((t) => t !== tecnologia),
        };
      } else {
        return {
          ...prev,
          tecnologias: [...currentTecnologias, tecnologia],
        };
      }
    });
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
        description: `Te has inscrito correctamente en la Factoría de Software.`,
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

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="bg-gray-50 p-4 rounded-lg border">
          <h4
            className="font-semibold text-lg mb-4"
            style={{ color: program.color }}>
            Datos Personales
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
                    <SelectItem value="CC">CC</SelectItem>
                    <SelectItem value="TI">TI</SelectItem>
                    <SelectItem value="CE">CE</SelectItem>
                    <SelectItem value="Pasaporte">Pasaporte</SelectItem>
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
              <Label htmlFor="telefono">Teléfono de contacto</Label>
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
              <Label htmlFor="direccion">Dirección de residencia física</Label>
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
            Información Académica
          </h4>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div className="space-y-2">
              <Label htmlFor="institucionEducativa">
                Institución educativa
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
              <Label htmlFor="programaAcademico">Programa académico</Label>
              <Input
                id="programaAcademico"
                name="programaAcademico"
                value={formData.programaAcademico}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div className="space-y-2">
              <Label htmlFor="semestreNivel">Semestre o nivel actual</Label>
              <Input
                id="semestreNivel"
                name="semestreNivel"
                value={formData.semestreNivel}
                onChange={handleChange}
                required
              />
            </div>
            <div className="space-y-2">
              <Label className="mb-2 block">Modalidad de vinculación</Label>
              <RadioGroup
                value={formData.modalidadVinculacion}
                onValueChange={(value) =>
                  setFormData({ ...formData, modalidadVinculacion: value })
                }
                className="flex space-x-4">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="pasantia" id="pasantia" />
                  <Label htmlFor="pasantia">Pasantía</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="voluntariado" id="voluntariado" />
                  <Label htmlFor="voluntariado">Voluntariado</Label>
                </div>
              </RadioGroup>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="tiempoDisponible">
              Tiempo disponible semanalmente
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

        <div className="bg-gray-50 p-4 rounded-lg border">
          <h4
            className="font-semibold text-lg mb-4"
            style={{ color: program.color }}>
            Experiencia y Habilidades
          </h4>

          <div className="space-y-4">
            <div>
              <Label className="mb-2 block">
                Conocimientos en tecnologías de desarrollo (marcar las que
                apliquen):
              </Label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                {tecnologias.map((tecnologia) => (
                  <div key={tecnologia} className="flex items-center space-x-2">
                    <Checkbox
                      id={`tecnologia-${tecnologia}`}
                      checked={formData.tecnologias.includes(tecnologia)}
                      onCheckedChange={() => handleTecnologiaChange(tecnologia)}
                    />
                    <Label htmlFor={`tecnologia-${tecnologia}`}>
                      {tecnologia}
                    </Label>
                  </div>
                ))}
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="tecnologia-otras"
                    checked={formData.tecnologias.includes("Otras")}
                    onCheckedChange={() => handleTecnologiaChange("Otras")}
                  />
                  <Label htmlFor="tecnologia-otras">Otras</Label>
                </div>
              </div>
            </div>

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
        </div>

        <div className="bg-gray-50 p-4 rounded-lg border">
          <h4
            className="font-semibold text-lg mb-4"
            style={{ color: program.color }}>
            Motivación e Intereses
          </h4>

          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="motivacion">
                ¿Por qué desea vincularse a la factoría de software?
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

            <div>
              <Label className="mb-2 block">
                Áreas de interés en el desarrollo de software:
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
              </div>
            </div>

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
        </div>

        <div className="bg-gray-50 p-4 rounded-lg border">
          <h4
            className="font-semibold text-lg mb-4"
            style={{ color: program.color }}>
            Autorización al Tratamiento de Datos
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
              Autorizo a la factoría de software para el uso y almacenamiento de
              mis datos personales con el propósito de gestionar mi vinculación
              y participación en sus actividades, según la Ley 1581 de 2012.
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
