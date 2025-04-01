"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { DateSelector } from "./DateSelector";

/**
 * Componente reutilizable para campos de información personal básica
 */
export function PersonalInfoFields({
  formData,
  onChange,
  showEthnicity = true,
  showCommune = true,
  showStratum = true,
  showAge = true,
  showAddress = true,
  showContact = false,
  showEmail = false,
  className = "",
}) {
  const handleChange = (e) => {
    const { name, value } = e.target;
    onChange({ ...formData, [name]: value });
  };

  const handleSelectChange = (field, value) => {
    onChange({ ...formData, [field]: value });
  };

  const handleDateChange = (dateObj, isoDate) => {
    onChange({
      ...formData,
      diaNacimiento: dateObj.day,
      mesNacimiento: dateObj.month,
      anoNacimiento: dateObj.year,
      fechaNacimiento: isoDate,
    });
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

  return (
    <div className={`space-y-4 ${className}`}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="nombreCompleto">
            Nombre completo<span className="text-red-500">*</span>
          </Label>
          <Input
            id="nombreCompleto"
            name="nombreCompleto"
            value={formData.nombreCompleto || ""}
            onChange={handleChange}
            required
          />
        </div>

        <DateSelector
          label="Fecha de nacimiento"
          value={{
            day: formData.diaNacimiento || "",
            month: formData.mesNacimiento || "",
            year: formData.anoNacimiento || "",
          }}
          onChange={handleDateChange}
          required
          yearRange={100}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {showCommune && (
          <div className="space-y-2">
            <Label htmlFor="comuna">
              Comuna<span className="text-red-500">*</span>
            </Label>
            <Input
              id="comuna"
              name="comuna"
              value={formData.comuna || ""}
              onChange={handleChange}
              required
            />
          </div>
        )}

        {showStratum && (
          <div className="space-y-2">
            <Label htmlFor="estratoSocial">
              Estrato social<span className="text-red-500">*</span>
            </Label>
            <Select
              value={formData.estratoSocial || ""}
              onValueChange={(value) =>
                handleSelectChange("estratoSocial", value)
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
        )}

        {showAge && (
          <div className="space-y-2">
            <Label htmlFor="edad">
              Edad<span className="text-red-500">*</span>
            </Label>
            <Input
              id="edad"
              name="edad"
              type="number"
              value={formData.edad || ""}
              onChange={handleChange}
              required
            />
          </div>
        )}

        {showEthnicity && (
          <div className="space-y-2">
            <Label htmlFor="grupoEtnico">
              Grupo étnico<span className="text-red-500">*</span>
            </Label>
            <Select
              value={formData.grupoEtnico || ""}
              onValueChange={(value) =>
                handleSelectChange("grupoEtnico", value)
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
        )}
      </div>

      {showContact && (
        <div className="space-y-2">
          <Label htmlFor="telefonoContacto">
            Teléfono de contacto<span className="text-red-500">*</span>
          </Label>
          <Input
            id="telefonoContacto"
            name="telefonoContacto"
            value={formData.telefonoContacto || ""}
            onChange={handleChange}
            required
          />
        </div>
      )}

      {showEmail && (
        <div className="space-y-2">
          <Label htmlFor="correoElectronico">Correo electrónico</Label>
          <Input
            id="correoElectronico"
            name="correoElectronico"
            type="email"
            value={formData.correoElectronico || ""}
            onChange={handleChange}
          />
        </div>
      )}

      {showAddress && (
        <div className="space-y-2">
          <Label htmlFor="direccion">
            Dirección de residencia<span className="text-red-500">*</span>
          </Label>
          <Input
            id="direccion"
            name="direccion"
            value={formData.direccion || ""}
            onChange={handleChange}
            required
          />
        </div>
      )}
    </div>
  );
}
