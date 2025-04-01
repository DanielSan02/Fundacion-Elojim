/**
 * Componente para secciones de formulario con estilo consistente
 */
export function FormSection({
  title,
  color = "#1B3C8C",
  icon = null,
  children,
  className = "",
}) {
  return (
    <div className={`bg-gray-50 p-4 rounded-lg border ${className}`}>
      <h4
        className="font-semibold text-lg mb-4 flex items-center"
        style={{ color }}>
        {icon && <span className="mr-2">{icon}</span>}
        {title}
      </h4>
      {children}
    </div>
  );
}
