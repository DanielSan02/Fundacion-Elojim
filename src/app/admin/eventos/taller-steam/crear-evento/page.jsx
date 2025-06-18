// app/eventos/voluntariado/page.tsx
import EventoForm from "@/components/forms/EventoForm";

export default function TallerSteamEventoPage() {
  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Registrar evento - Programa Taller Steam + H</h1>
      <EventoForm programId="taller-steam"/>
    </div>
  );
}
