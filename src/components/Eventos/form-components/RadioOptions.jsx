// src/components/form-components/RadioOptions.jsx
import React from "react";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

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
  // Aseguramos que el valor siempre sea un string
  const displayValue = String(value);

  const handleChange = (newValue) => {
    // Si las opciones son booleanas, convertir
    const allValuesAreBooleans = options.every(
      (opt) => opt.value === "true" || opt.value === "false"
    );

    const parsedValue = allValuesAreBooleans
      ? newValue === "true"
      : newValue;

    onChange(name, parsedValue);
  };

  const orientationClass =
    orientation === "horizontal"
      ? "flex space-x-4"
      : "flex flex-col space-y-2";

  return (
    <div className={`space-y-2 ${className}`}>
      <Label className="mb-2 block">
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </Label>

      <RadioGroup
        value={displayValue}
        onValueChange={handleChange}
        className={orientationClass}
      >
        {options.map((option) => (
          <div key={option.value} className="flex items-center space-x-2">
            <RadioGroupItem
              value={option.value}
              id={`${name}-${option.value}`}
            />
            <Label htmlFor={`${name}-${option.value}`}>
              {option.label}
            </Label>
          </div>
        ))}
      </RadioGroup>
    </div>
  );
}
