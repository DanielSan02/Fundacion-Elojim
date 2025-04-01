"use client";

import { Button } from "@/components/ui/button";

/**
 * Componente reutilizable para botones de formulario
 */
export function FormButtons({
  onCancel,
  isSubmitting = false,
  submitColor = "#1B3C8C",
  submitText = "Enviar solicitud",
  loadingText = "Procesando...",
  cancelText = "Cancelar",
  className = "",
}) {
  return (
    <div className={`flex justify-end space-x-4 pt-4 ${className}`}>
      <Button type="button" variant="outline" onClick={onCancel}>
        {cancelText}
      </Button>
      <Button
        type="submit"
        disabled={isSubmitting}
        style={{
          backgroundColor: submitColor,
          color: "white",
          borderColor: submitColor,
        }}>
        {isSubmitting ? loadingText : submitText}
      </Button>
    </div>
  );
}
