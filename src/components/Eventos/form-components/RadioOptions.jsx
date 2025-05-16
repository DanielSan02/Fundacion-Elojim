"use client";

import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

/**
 * Componente reutilizable para opciones de radio, soporta booleanos o strings
 */
export function RadioOptions({
  label,
  name,
  value,
  onChange,
  options = [
    { value: "true", label: "Sí" },
    { value: "false", label: "No" },
  ],
  orientation = "horizontal",
  required = false,
  className = "",
}) {
  const handleChange = (newValue) => {
    let parsedValue;

    // Si los únicos valores posibles son "true"/"false", los convertimos a booleano
    const allValuesAreBooleans =
      options.every((opt) => opt.value === "true" || opt.value === "false");

    if (allValuesAreBooleans) {
      parsedValue = newValue === "true";
    } else {
      parsedValue = newValue; // mantener como string
    }

    onChange(name, parsedValue);
  };

  const orientationClass =
    orientation === "horizontal" ? "flex space-x-4" : "flex flex-col space-y-2";

  return (
    <div className={`space-y-2 ${className}`}>
      <Label className="mb-2 block">
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </Label>
      <RadioGroup
        value={String(value)}
        onValueChange={handleChange}
        className={orientationClass}
      >
        {options.map((option) => (
          <div key={option.value} className="flex items-center space-x-2">
            <RadioGroupItem
              value={option.value}
              id={`${name}-${option.value}`}
            />
            <Label htmlFor={`${name}-${option.value}`}>{option.label}</Label>
          </div>
        ))}
      </RadioGroup>
    </div>
  );
}
