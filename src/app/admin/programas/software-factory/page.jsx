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

export default function SoftwareFactoryPage() {
  const [registros, setRegistros] = useState([]);
  const [loading, setLoading] = useState(true);

  const [busqueda, setBusqueda] = useState("");
  const [comuna, setComuna] = useState("");
  const [estrato, setEstrato] = useState("");
  const [grupoEtnico, setGrupoEtnico] = useState("");
  const [edadExacta, setEdadExacta] = useState("");

  const fetchRegistros = async () => {
    try {
      const res = await fetch("/api/registro/software-factory");
      if (res.ok) {
        const data = await res.json();
        const sorted = data.sort((a, b) => {
          const nameCompare = a.nombreCompleto.localeCompare(b.nombreCompleto);
          if (nameCompare !== 0) return nameCompare;
          return a.numeroDocumento?.localeCompare(b.numeroDocumento || "") || 0;
        });
        setRegistros(sorted);
      } else {
        console.error("Error al obtener registros");
      }
    } catch (error) {
      console.error("Error al obtener registros", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    const confirmar = confirm("¿Estás seguro de que deseas eliminar este registro?");
    if (!confirmar) return;

    try {
      const res = await fetch("/api/registro/software-factory", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });

      if (res.ok) {
        setRegistros((prev) => prev.filter((registro) => registro.id !== id));
        alert("Registro eliminado correctamente");
      } else {
        alert("Error al eliminar el registro");
      }
    } catch (error) {
      console.error("Error al eliminar el registro", error);
    }
  };

  useEffect(() => {
    fetchRegistros();
  }, []);

  const registrosFiltrados = registros.filter((registro) => {
    const matchesBusqueda =
      registro.nombreCompleto?.toLowerCase().includes(busqueda.toLowerCase()) ||
      registro.numeroDocumento?.toLowerCase().includes(busqueda.toLowerCase());

    const matchesComuna = comuna ? registro.comuna === comuna : true;
    const matchesEstrato = estrato ? registro.estratoSocial === estrato : true;
    const matchesGrupo = grupoEtnico ? registro.grupoEtnico === grupoEtnico : true;
    const matchesEdad =
      edadExacta !== "" ? registro.edad === parseInt(edadExacta) : true;

    return (
      matchesBusqueda &&
      matchesComuna &&
      matchesEstrato &&
      matchesGrupo &&
      matchesEdad
    );
  });

  const comunas = [...new Set(registros.map((r) => r.comuna))];
  const estratos = [...new Set(registros.map((r) => r.estratoSocial))];
  const grupos = [...new Set(registros.map((r) => r.grupoEtnico))];

  if (loading) {
    return <div className="p-4">Cargando registros...</div>;
  }

  return (
    <ContentLayout title="Programa de Factoría de Software">
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
            <BreadcrumbPage>Software Factory</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <div className="mt-6">
        <div className="relative max-w-md">
          <input
            type="text"
            placeholder="Buscar por nombre o documento"
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
            className="w-full rounded-md border border-gray-300 bg-white py-2 pl-10 pr-4 text-sm shadow-sm placeholder:text-gray-400 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
            <svg
              className="h-4 w-4"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 21l-4.35-4.35M17 11a6 6 0 11-12 0 6 6 0 0112 0z"
              />
            </svg>
          </div>
        </div>

        <div className="mb-10 mt-10">
          <h3 className="text-xl font-semibold mb-5">Filtros</h3>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <select
              value={comuna}
              onChange={(e) => setComuna(e.target.value)}
              className="border p-2 rounded"
            >
              <option value="">Todas las comunas</option>
              {comunas.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
            <select
              value={estrato}
              onChange={(e) => setEstrato(e.target.value)}
              className="border p-2 rounded"
            >
              <option value="">Todos los estratos</option>
              {estratos.map((e) => (
                <option key={e} value={e}>
                  {e}
                </option>
              ))}
            </select>
            <select
              value={grupoEtnico}
              onChange={(e) => setGrupoEtnico(e.target.value)}
              className="border p-2 rounded"
            >
              <option value="">Todos los grupos étnicos</option>
              {grupos.map((g) => (
                <option key={g} value={g}>
                  {g}
                </option>
              ))}
            </select>
        
            <input
              type="number"
              min={0}
              placeholder="Edad exacta"
              value={edadExacta}
              onChange={(e) => setEdadExacta(e.target.value)}
              className="border p-2 rounded"
            />
          </div>
        </div>

        <h2 className="text-2xl font-semibold">Registros</h2>
        <table className="min-w-full table-auto mt-4 border">
          <thead className="bg-gray-100">
            <tr>
              <th className="py-2 px-4 border">Nombre</th>
              <th className="py-2 px-4 border">Documento</th>
              <th className="py-2 px-4 border">Edad</th>
              <th className="py-2 px-4 border">Comuna</th>
              <th className="py-2 px-4 border">Estrato</th>
              <th className="py-2 px-4 border">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {registrosFiltrados.map((registro) => (
              <tr key={registro.id} className="text-sm">
                <td className="py-2 px-4 border">{registro.nombreCompleto}</td>
                <td className="py-2 px-4 border">{registro.numeroDocumento}</td>
                <td className="py-2 px-4 border">{registro.edad}</td>
                <td className="py-2 px-4 border">{registro.comuna}</td>
                <td className="py-2 px-4 border">{registro.estratoSocial}</td>
                <td className="py-2 px-4 border">
                  <button
                    onClick={() => handleDelete(registro.id)}
                    className="text-red-600 hover:underline"
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
            {registrosFiltrados.length === 0 && (
              <tr>
                <td colSpan={8} className="text-center py-2">
                  No hay registros que coincidan con los filtros.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </ContentLayout>
  );
}
