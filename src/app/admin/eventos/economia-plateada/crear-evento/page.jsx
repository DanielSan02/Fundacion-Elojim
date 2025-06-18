// app/eventos/voluntariado/page.tsx
import EventoForm from "@/components/forms/EventoForm";
import ProtectedAdmin from "@/components/ProtectedAdmin";

export default function EconomiaPlateadaEventoPage() {
  return (
    <ProtectedAdmin>
    <div className="p-6 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Registrar evento - Programa Economia Plateada</h1>
      <EventoForm programId="economia-plateada"/>
    </div>
    </ProtectedAdmin>
  );
}
