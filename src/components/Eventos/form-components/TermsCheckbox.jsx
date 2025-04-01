import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

/**
 * Componente reutilizable para aceptación de términos y condiciones
 */
export function TermsCheckbox({
  checked,
  onChange,
  text = "Acepto los términos y condiciones",
  id = "aceptaTerminos",
  className = "",
}) {
  return (
    <div className={`flex items-center space-x-2 ${className}`}>
      <Checkbox id={id} checked={checked} onCheckedChange={onChange} />
      <Label htmlFor={id} className="text-sm">
        {text}
      </Label>
    </div>
  );
}
