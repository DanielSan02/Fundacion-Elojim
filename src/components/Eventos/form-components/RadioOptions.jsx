// src/components/form-components/RadioOptions.jsx
import React from "react";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

export function RadioOptions({
  label,
  name,
  value, // Este es el valor que viene del formData del padre (true/false)
  onChange,
  options = [
    { value: "true", label: "Sí" },
    { value: "false", label: "No" },
  ],
  orientation = "horizontal",
  required = false,
  className = "",
}) {
  // Convertir el booleano 'value' a string para el RadioGroup
  // Si 'value' es undefined o null por alguna razón, String(value) lo manejará
  const displayValue = String(value);

  const handleChange = (newValue) => {
    let parsedValue;

    const allValuesAreBooleans = options.every(
      (opt) => opt.value === "true" || opt.value === "false"
    );

    if (allValuesAreBooleans) {
      parsedValue = newValue === "true";
    } else {
      parsedValue = newValue;
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
        value={displayValue} // Usar el string transformado
        onValueChange={handleChange}
        className={orientationClass}>
        {options.map((option) => (
          <div key={option.value} className="flex items-center space-x-2">
            <RadioGroupItem
              value={option.value}
              id={`${name}-${option.value}`}
            />
            <Label
              htmlFor={`<span class="math-inline">\{name\}\-</span>{option.value}`}>
              {option.label}
            </Label>
          </div>
        ))}
      </RadioGroup>
    </div>
  );
}
