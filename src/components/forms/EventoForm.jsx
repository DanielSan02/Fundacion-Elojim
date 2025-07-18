"use client";

import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

export default function EventoForm({ programId }) {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    date: "",
    location: "",
    duration: "",
    capacity: "",
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: null }));
    }

    if (name === "capacity") {
      setFormData((prev) => ({ ...prev, [name]: Number(value) }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.title.trim()) newErrors.title = "El título es obligatorio";
    if (!formData.description.trim()) newErrors.description = "La descripción es obligatoria";
    if (!formData.date) newErrors.date = "La fecha es obligatoria";
    if (!formData.location.trim()) newErrors.location = "El lugar es obligatorio";
    if (!formData.duration.trim()) newErrors.duration = "La duración es obligatoria";
    if (!formData.capacity || formData.capacity <= 0)
      newErrors.capacity = "La capacidad debe ser mayor que cero";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsSubmitting(true);

    try {
      const res = await fetch(`/api/eventos/${programId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!res.ok) throw new Error("Error al registrar el evento");

      toast({
        title: "Evento registrado",
        description: `El evento para ${programId} ha sido registrado exitosamente.`,
      });

      setFormData({
        title: "",
        description: "",
        date: "",
        location: "",
        duration: "",
        capacity: "",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#F9FAFB] py-12">
      <main className="flex-grow max-w-2xl mx-auto bg-white shadow-lg rounded-2xl p-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Registrar Evento</h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Título */}
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
              Título
            </label>
            <input
              id="title"
              name="title"
              type="text"
              className={`w-full p-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white text-black ${
                errors.title ? "border-red-500" : "border-gray-300"
              }`}
              value={formData.title}
              onChange={handleChange}
              required
            />
            {errors.title && <p className="mt-1 text-sm text-red-600">{errors.title}</p>}
          </div>

          {/* Descripción */}
          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
              Descripción
            </label>
            <textarea
              id="description"
              name="description"
              rows="5"
              className={`w-full p-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white text-black ${
                errors.description ? "border-red-500" : "border-gray-300"
              }`}
              value={formData.description}
              onChange={handleChange}
              required
            />
            {errors.description && <p className="mt-1 text-sm text-red-600">{errors.description}</p>}
          </div>

          {/* Fecha */}
          <div>
            <label htmlFor="date" className="block text-sm font-medium text-gray-700 mb-1">
              Fecha y hora
            </label>
            <input
              id="date"
              name="date"
              type="datetime-local"
              className={`w-full p-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white text-black ${
                errors.date ? "border-red-500" : "border-gray-300"
              }`}
              value={formData.date}
              onChange={handleChange}
              required
            />
            {errors.date && <p className="mt-1 text-sm text-red-600">{errors.date}</p>}
          </div>

          {/* Lugar */}
          <div>
            <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-1">
              Lugar
            </label>
            <input
              id="location"
              name="location"
              type="text"
              className={`w-full p-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white text-black ${
                errors.location ? "border-red-500" : "border-gray-300"
              }`}
              value={formData.location}
              onChange={handleChange}
              required
            />
            {errors.location && <p className="mt-1 text-sm text-red-600">{errors.location}</p>}
          </div>

          {/* Duración */}
          <div>
            <label htmlFor="duration" className="block text-sm font-medium text-gray-700 mb-1">
              Duración (ejemplo: 2 horas)
            </label>
            <input
              id="duration"
              name="duration"
              type="text"
              className={`w-full p-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white text-black ${
                errors.duration ? "border-red-500" : "border-gray-300"
              }`}
              value={formData.duration}
              onChange={handleChange}
              required
            />
            {errors.duration && <p className="mt-1 text-sm text-red-600">{errors.duration}</p>}
          </div>

          {/* Capacidad */}
          <div>
            <label htmlFor="capacity" className="block text-sm font-medium text-gray-700 mb-1">
              Capacidad máxima
            </label>
            <input
              id="capacity"
              name="capacity"
              type="number"
              min={1}
              className={`w-full p-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white text-black ${
                errors.capacity ? "border-red-500" : "border-gray-300"
              }`}
              value={formData.capacity}
              onChange={handleChange}
              required
            />
            {errors.capacity && <p className="mt-1 text-sm text-red-600">{errors.capacity}</p>}
          </div>

          {/* Botón */}
          <div>
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-blue-600 text-white py-3 px-6 rounded-xl font-semibold hover:bg-blue-700 transition"
            >
              {isSubmitting ? "Registrando..." : "Registrar evento"}
            </button>
          </div>
        </form>
      </main>
    </div>
  );
}
