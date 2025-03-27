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

export default function SteamForm({ program, onClose }) {
  const { registerProgram } = usePrograms();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [date, setDate] = useState();

  const [formData, setFormData] = useState({
    // Datos del Niño/a
    nombreCompleto: "",
    fechaNacimiento: "",
    comuna: "",
    estratoSocial: "",
    edad: "",
    grupoEtnico: "",
    institucionEducativa: "",
    cursoGrado: "",
    direccion: "",

    // Datos del Acudiente
    nombreAcudiente: "",
    relacionNino: "",
    telefonoContacto: "",
    correoElectronico: "",

    // Intereses y Conocimientos
    participacionPrevia: "no",
    actividadesInteres: [],
    otrasActividades: "",

    // Disponibilidad y Acceso
    disponibilidad: "",
    accesoComputadora: "no",
    accesoInternet: "no",

    // Motivación
    motivacion: "",
    expectativa: "",

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

  const handleActividadChange = (actividad) => {
    setFormData((prev) => {
      const currentActividades = [...prev.actividadesInteres];

      if (currentActividades.includes(actividad)) {
        return {
          ...prev,
          actividadesInteres: currentActividades.filter((a) => a !== actividad),
        };
      } else {
        return {
          ...prev,
          actividadesInteres: [...currentActividades, actividad],
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
        description: `Has inscrito correctamente al niño/a en el Taller STEAM+H.`,
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

  const actividadesTecnologicas = [
    "Programación básica",
    "Robótica educativa",
    "Diseño de videojuegos",
    "Inteligencia Artificial para niños",
    "Ciencia y experimentos",
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
          Formulario de Registro - Taller STEAM+H
        </h3>
        <p className="text-gray-600 mb-6">
          Complete el siguiente formulario para inscribir al niño, niña o
          adolescente en el taller.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="bg-gray-50 p-4 rounded-lg border">
          <h4
            className="font-semibold text-lg mb-4"
            style={{ color: program.color }}>
            Datos del Niño, Niña o Adolescente
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
              <Label htmlFor="cursoGrado">Curso/Grado</Label>
              <Input
                id="cursoGrado"
                name="cursoGrado"
                value={formData.cursoGrado}
                onChange={handleChange}
                required
              />
            </div>
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

        <div className="bg-gray-50 p-4 rounded-lg border">
          <h4
            className="font-semibold text-lg mb-4"
            style={{ color: program.color }}>
            Datos del Acudiente
          </h4>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div className="space-y-2">
              <Label htmlFor="nombreAcudiente">Nombre completo</Label>
              <Input
                id="nombreAcudiente"
                name="nombreAcudiente"
                value={formData.nombreAcudiente}
                onChange={handleChange}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="relacionNino">Relación con el niño/a</Label>
              <Input
                id="relacionNino"
                name="relacionNino"
                value={formData.relacionNino}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                required
              />
            </div>
          </div>
        </div>

        <div className="bg-gray-50 p-4 rounded-lg border">
          <h4
            className="font-semibold text-lg mb-4"
            style={{ color: program.color }}>
            Intereses y Conocimientos
          </h4>

          <div className="space-y-4">
            <div>
              <Label className="mb-2 block">
                ¿Ha participado antes en programas STEAM o de pensamiento
                computacional?
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
                ¿Qué actividades tecnológicas le interesan? (Marcar las que
                apliquen):
              </Label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                {actividadesTecnologicas.map((actividad) => (
                  <div key={actividad} className="flex items-center space-x-2">
                    <Checkbox
                      id={`actividad-${actividad}`}
                      checked={formData.actividadesInteres.includes(actividad)}
                      onCheckedChange={() => handleActividadChange(actividad)}
                    />
                    <Label htmlFor={`actividad-${actividad}`}>
                      {actividad}
                    </Label>
                  </div>
                ))}
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="actividad-otras"
                    checked={formData.actividadesInteres.includes("Otras")}
                    onCheckedChange={() => handleActividadChange("Otras")}
                  />
                  <Label htmlFor="actividad-otras">Otras</Label>
                </div>
              </div>

              {formData.actividadesInteres.includes("Otras") && (
                <div className="mt-2">
                  <Input
                    id="otrasActividades"
                    name="otrasActividades"
                    value={formData.otrasActividades}
                    onChange={handleChange}
                    placeholder="Especifique otras actividades"
                  />
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="bg-gray-50 p-4 rounded-lg border">
          <h4
            className="font-semibold text-lg mb-4"
            style={{ color: program.color }}>
            Disponibilidad y Acceso a Tecnología
          </h4>

          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="disponibilidad">
                Días y horarios disponibles
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

            <div>
              <Label className="mb-2 block">
                ¿Cuenta con acceso a computadora o Tablet en casa?
              </Label>
              <RadioGroup
                value={formData.accesoComputadora}
                onValueChange={(value) =>
                  setFormData({ ...formData, accesoComputadora: value })
                }
                className="flex space-x-4">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="si" id="computadora-si" />
                  <Label htmlFor="computadora-si">Sí</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="no" id="computadora-no" />
                  <Label htmlFor="computadora-no">No</Label>
                </div>
              </RadioGroup>
            </div>

            <div>
              <Label className="mb-2 block">
                ¿Cuenta con acceso a internet en casa?
              </Label>
              <RadioGroup
                value={formData.accesoInternet}
                onValueChange={(value) =>
                  setFormData({ ...formData, accesoInternet: value })
                }
                className="flex space-x-4">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="si" id="internet-si" />
                  <Label htmlFor="internet-si">Sí</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="no" id="internet-no" />
                  <Label htmlFor="internet-no">No</Label>
                </div>
              </RadioGroup>
            </div>
          </div>
        </div>

        <div className="bg-gray-50 p-4 rounded-lg border">
          <h4
            className="font-semibold text-lg mb-4"
            style={{ color: program.color }}>
            Motivación
          </h4>

          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="motivacion">
                ¿Por qué desea participar en el Taller de pensamiento
                computacional?
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
              <Label htmlFor="expectativa">
                ¿Cuál es su expectativa sobre el programa?
              </Label>
              <Textarea
                id="expectativa"
                name="expectativa"
                value={formData.expectativa}
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
            Autorización de Participación y Tratamiento de Datos
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
              Autorizo la participación del niño/a y adolescente en el taller
              con el uso de sus datos personales para efectos de gestión,
              comunicación con el involucrado y participación en sus
              actividades, según la Ley 1581 de 2012.
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
