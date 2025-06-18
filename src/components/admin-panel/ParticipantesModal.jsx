"use client";

import { useEffect, useState } from "react";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";

export default function ParticipantesModal({ eventoId, open, onClose }) {
  const [participantes, setParticipantes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [eventoSeleccionado, setEventoSeleccionado] = useState(null);


  useEffect(() => {
    if (!open) return;

    const fetchParticipantes = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch(`/api/inscripciones-evento/${eventoId}`);
        const data = await res.json();
        if (!res.ok) throw new Error(data.message || "Error desconocido");
        setParticipantes(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchParticipantes();
  }, [eventoId, open]);

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogTitle>Participantes Inscritos</DialogTitle>

        {loading ? (
          <p className="text-sm text-gray-500">Cargando...</p>
        ) : error ? (
          <p className="text-sm text-red-500">{error}</p>
        ) : participantes.length === 0 ? (
          <p className="text-sm text-gray-500">No hay inscritos aún.</p>
        ) : (
          <ScrollArea className="h-80 mt-4">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-gray-700 border-b">
                  <th className="p-2">Nombre</th>
                  <th className="p-2">Documento</th>
                  <th className="p-2">Programa</th>
                  <th className="p-2">Fecha</th>
                </tr>
              </thead>
              <tbody>
                {participantes.map((p) => (
                  <tr key={p.id} className="border-b">
                    <td className="p-2">{p.nombreCompleto}</td>
                    <td className="p-2">{p.numeroDocumento || "NO APLICA"}</td>
                    <td className="p-2">{p.programId}</td>
                    <td className="p-2">
                      {new Date(p.createdAt).toLocaleString("es-CO")}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </ScrollArea>
        )}
      </DialogContent>
    </Dialog>
  );
}
