"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ContentLayout } from "@/components/admin-panel/content-layout";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

export default function EventosSeguridadAlimentariaPage() {
  const programId = "seguridad-alimentaria";

  const [eventos, setEventos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [eventoEnEdicion, setEventoEnEdicion] = useState(null);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    date: "",
    location: "",
    duration: "",
    capacity: "",
  });

  const [busqueda, setBusqueda] = useState("");

  const fetchEventos = async () => {
    try {
      const res = await fetch(`/api/eventos/${programId}`);
      if (res.ok) {
        const data = await res.json();
        const sorted = data.sort((a, b) => new Date(a.date) - new Date(b.date));
        setEventos(sorted);
      } else {
        console.error("Error al obtener eventos");
      }
    } catch (error) {
      console.error("Error al obtener eventos", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (eventId) => {
    if (!confirm("¿Estás seguro de que deseas eliminar este evento?")) return;

    try {
      const res = await fetch(`/api/eventos/${programId}?eventId=${eventId}`, {
        method: "DELETE",
      });

      if (res.ok) {
        setEventos((prev) => prev.filter((ev) => ev.id !== eventId));
        alert("Evento eliminado correctamente");
      } else {
        alert("Error al eliminar el evento");
      }
    } catch (error) {
      console.error("Error al eliminar el evento", error);
      alert("Error al eliminar el evento");
    }
  };

  useEffect(() => {
    fetchEventos();
  }, []);

  const eventosFiltrados = eventos.filter((ev) => {
    const matchesBusqueda =
      ev.title?.toLowerCase().includes(busqueda.toLowerCase()) ||
      ev.description?.toLowerCase().includes(busqueda.toLowerCase());
    return matchesBusqueda;
  });

  if (loading) {
    return <div className="p-4">Cargando eventos...</div>;
  }

  return (
    <ContentLayout title="Eventos - Programa Seguridad Alimentaria">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link href="/">Inicio</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link href="/admin">Dashboard</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Eventos Programa Seguridad Alimentaria</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <div className="mt-6 max-w-4xl">
        <div className="mb-6 space-y-4">
          <input
            type="text"
            placeholder="Buscar por título o descripción"
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
            className="w-full rounded-md border border-gray-300 bg-white py-2 px-4 text-sm shadow-sm placeholder:text-gray-400 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
        </div>

        <h2 className="text-2xl font-semibold mb-4">Eventos</h2>
        <table className="min-w-full table-auto border border-gray-300">
          <thead className="bg-gray-100">
            <tr>
              <th className="py-2 px-4 border border-gray-300 text-left">Título</th>
              <th className="py-2 px-4 border border-gray-300 text-left">Descripción</th>
              <th className="py-2 px-4 border border-gray-300 text-left">Fecha y Hora</th>
              <th className="py-2 px-4 border border-gray-300 text-left">Ubicación</th>
              <th className="py-2 px-4 border border-gray-300 text-left">Duración</th>
              <th className="py-2 px-4 border border-gray-300 text-left">Capacidad</th>
              <th className="py-2 px-4 border border-gray-300 text-left">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {eventosFiltrados.length === 0 ? (
              <tr>
                <td colSpan={7} className="text-center py-4 text-gray-500">
                  No hay eventos que coincidan con los filtros.
                </td>
              </tr>
            ) : (
              eventosFiltrados.map((ev) => (
                <tr key={ev.id} className="text-sm">
                  <td className="py-2 px-4 border border-gray-300">{ev.title}</td>
                  <td className="py-2 px-4 border border-gray-300">
                    {ev.description.length > 100
                      ? ev.description.slice(0, 100) + "..."
                      : ev.description}
                  </td>
                  <td className="py-2 px-4 border border-gray-300">
                    {new Date(ev.date).toLocaleString("es-CO", {
                      dateStyle: "medium",
                      timeStyle: "short",
                    })}
                  </td>
                  <td className="py-2 px-4 border border-gray-300">{ev.location}</td>
                  <td className="py-2 px-4 border border-gray-300">{ev.duration}</td>
                  <td className="py-2 px-4 border border-gray-300">{ev.capacity}</td>
                  <td className="py-2 px-4 border border-gray-300 space-x-2">
                    <button
                      onClick={() => {
                        setEventoEnEdicion(ev);
                        setFormData({
                          title: ev.title || "",
                          description: ev.description || "",
                          date: new Date(ev.date).toISOString().slice(0, 16),
                          location: ev.location || "",
                          duration: ev.duration || "",
                          capacity: ev.capacity?.toString() || "",
                        });
                      }}
                      className="text-blue-600 hover:underline"
                    >
                      Editar
                    </button>
                    <button
                      onClick={() => handleDelete(ev.id)}
                      className="text-red-600 hover:underline"
                    >
                      Eliminar
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>

        {eventoEnEdicion && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg max-w-xl w-full relative">
              <button
                onClick={() => setEventoEnEdicion(null)}
                className="absolute top-2 right-2 text-gray-600 hover:text-gray-800 text-xl"
                aria-label="Cerrar"
              >
                ×
              </button>
              <h3 className="text-lg font-semibold mb-4">Editar Evento</h3>
              <form
                onSubmit={async (e) => {
                  e.preventDefault();
                  try {
                    const requestData = {
                      id: eventoEnEdicion.id,
                      title: formData.title,
                      description: formData.description,
                      date: formData.date,
                      location: formData.location,
                      duration: formData.duration,
                      capacity: Number(formData.capacity),
                    };

                    const res = await fetch(`/api/eventos/${programId}`, {
                      method: "PUT",
                      headers: { "Content-Type": "application/json" },
                      body: JSON.stringify(requestData),
                    });

                    if (res.ok) {
                      fetchEventos();
                      setEventoEnEdicion(null);
                      alert("Evento actualizado correctamente");
                    } else {
                      const errorData = await res.json();
                      alert(
                        `Error al actualizar: ${
                          errorData.message || "Error desconocido"
                        }`
                      );
                    }
                  } catch (err) {
                    console.error("Error al actualizar", err);
                    alert("Error al actualizar el evento");
                  }
                }}
                className="space-y-4"
              >
                <input
                  type="text"
                  placeholder="Título"
                  value={formData.title}
                  onChange={(e) =>
                    setFormData({ ...formData, title: e.target.value })
                  }
                  className="w-full px-3 py-2 border rounded"
                  required
                />
                <textarea
                  placeholder="Descripción"
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                  className="w-full px-3 py-2 border rounded"
                  required
                />
                <input
                  type="datetime-local"
                  value={formData.date}
                  onChange={(e) =>
                    setFormData({ ...formData, date: e.target.value })
                  }
                  className="w-full px-3 py-2 border rounded"
                  required
                />
                <input
                  type="text"
                  placeholder="Ubicación"
                  value={formData.location}
                  onChange={(e) =>
                    setFormData({ ...formData, location: e.target.value })
                  }
                  className="w-full px-3 py-2 border rounded"
                />
                <input
                  type="text"
                  placeholder="Duración"
                  value={formData.duration}
                  onChange={(e) =>
                    setFormData({ ...formData, duration: e.target.value })
                  }
                  className="w-full px-3 py-2 border rounded"
                />
                <input
                  type="number"
                  placeholder="Capacidad"
                  value={formData.capacity}
                  onChange={(e) =>
                    setFormData({ ...formData, capacity: e.target.value })
                  }
                  className="w-full px-3 py-2 border rounded"
                />
                <div className="flex justify-end gap-4">
                  <button
                    type="button"
                    onClick={() => setEventoEnEdicion(null)}
                    className="text-gray-600 underline"
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                  >
                    Guardar cambios
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </ContentLayout>
  );
}
