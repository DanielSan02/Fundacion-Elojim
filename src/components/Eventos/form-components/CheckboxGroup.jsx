"use client";

import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

/**
 * Componente reutilizable para grupos de checkbox
 */
export function CheckboxGroup({
  label,
  options,
  selectedValues,
  onChange,
  columns = 1,
  showOtherOption = false,
  otherOptionLabel = "Otras",
  otherValue = "",
  onOtherValueChange,
  required = false,
  className = "",
}) {
  const handleCheckboxChange = (value) => {
    let newValues;

    if (selectedValues.includes(value)) {
      // Si ya está seleccionado, lo quitamos
      newValues = selectedValues.filter((item) => item !== value);
    } else {
      // Si no está seleccionado, lo añadimos
      newValues = [...selectedValues, value];
    }

    onChange(newValues);
  };

  return (
    <div className={`space-y-2 ${className}`}>
      <Label className="mb-2 block">
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </Label>
      <div className={`grid grid-cols-1 md:grid-cols-${columns} gap-2`}>
        {options.map((option) => (
          <div
            key={option.value || option}
            className="flex items-center space-x-2">
            <Checkbox
              id={`checkbox-${option.value || option}`}
              checked={selectedValues.includes(option.value || option)}
              onCheckedChange={() =>
                handleCheckboxChange(option.value || option)
              }
            />
            <Label htmlFor={`checkbox-${option.value || option}`}>
              {option.label || option}
            </Label>
          </div>
        ))}

        {showOtherOption && (
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="checkbox-other"
                checked={selectedValues.includes(otherOptionLabel)}
                onCheckedChange={() => handleCheckboxChange(otherOptionLabel)}
              />
              <Label htmlFor="checkbox-other">{otherOptionLabel}</Label>
            </div>

            {selectedValues.includes(otherOptionLabel) && (
              <Input
                value={otherValue}
                onChange={(e) => onOtherValueChange(e.target.value)}
                placeholder={`Especifique ${otherOptionLabel.toLowerCase()}`}
                className="mt-2"
              />
            )}
          </div>
        )}
      </div>
    </div>
  );
}
