// app/eventos/voluntariado/page.tsx
import EventoForm from "@/components/forms/EventoForm";

export default function SemilleroInnovacionEventoPage() {
  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Registrar evento - Semillero Innovación</h1>
      <EventoForm programId="semillero-innovacion"/>
    </div>
  );
}
