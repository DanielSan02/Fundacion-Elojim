"use client";

import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

/**
 * Componente reutilizable para selección de fechas con día, mes y año
 */
export function DateSelector({
  label = "Fecha",
  value = { day: "", month: "", year: "" },
  onChange,
  required = false,
  yearRange = 100,
  startYear = new Date().getFullYear(),
  className = "",
}) {
  // Función para actualizar la fecha completa
  const handleChange = (type, newValue) => {
    const newDate = { ...value, [type]: newValue };

    // Convertir a formato ISO (YYYY-MM-DD) si todos los campos están completos
    let isoDate = "";
    if (newDate.day && newDate.month && newDate.year) {
      const day = newDate.day.toString().padStart(2, "0");
      const month = newDate.month.toString().padStart(2, "0");
      isoDate = `${newDate.year}-${month}-${day}`;
    }

    onChange(newDate, isoDate);
  };

  return (
    <div className={`space-y-2 ${className}`}>
      <Label>
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </Label>
      <div className="grid grid-cols-3 gap-2">
        {/* Selector de día */}
        <Select
          value={value.day?.toString() || ""}
          onValueChange={(val) => handleChange("day", val)}>
          <SelectTrigger>
            <SelectValue placeholder="Día" />
          </SelectTrigger>
          <SelectContent>
            {Array.from({ length: 31 }, (_, i) => i + 1).map((day) => (
              <SelectItem key={`day-${day}`} value={day.toString()}>
                {day}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {/* Selector de mes */}
        <Select
          value={value.month?.toString() || ""}
          onValueChange={(val) => handleChange("month", val)}>
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
            ].map((month) => (
              <SelectItem key={`month-${month.value}`} value={month.value}>
                {month.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {/* Selector de año */}
        <Select
          value={value.year?.toString() || ""}
          onValueChange={(val) => handleChange("year", val)}>
          <SelectTrigger>
            <SelectValue placeholder="Año" />
          </SelectTrigger>
          <SelectContent className="max-h-[200px]">
            {Array.from({ length: yearRange }, (_, i) => startYear - i).map(
              (year) => (
                <SelectItem key={`year-${year}`} value={year.toString()}>
                  {year}
                </SelectItem>
              )
            )}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
