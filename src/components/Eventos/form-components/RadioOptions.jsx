"use client";

import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

/**
 * Componente reutilizable para opciones de radio
 */
export function RadioOptions({
  label,
  name,
  value,
  onChange,
  options = [
    { value: "si", label: "Sí" },
    { value: "no", label: "No" },
  ],
  orientation = "horizontal", // horizontal o vertical
  required = false,
  className = "",
}) {
  const handleChange = (newValue) => {
    onChange(name, newValue);
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
        value={value}
        onValueChange={handleChange}
        className={orientationClass}>
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
