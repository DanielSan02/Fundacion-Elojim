import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Send, MapPin, Phone, Mail, Clock } from "lucide-react";

const Contactanos = () => {
  const [sending, setSending] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSending(true);

    const nombre = e.target.nombre.value.trim();
    const email = e.target.email.value.trim();
    const asunto = e.target.asunto.value.trim();
    const mensaje = e.target.mensaje.value.trim();

    if (!nombre || !email || !asunto || !mensaje) {
      alert("Por favor completa todos los campos.");
      setSending(false);
      return;
    }

    try {
      const res = await fetch("/api/contacto", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nombre, email, asunto, mensaje }),
      });

      if (res.ok) {
        alert("Mensaje enviado correctamente");
        e.target.reset();
      } else {
        alert("Hubo un error al enviar el mensaje");
      }
    } catch (error) {
      alert("Error al enviar el mensaje. Intenta de nuevo.");
    }

    setSending(false);
  };

  return (
    <section id="contacto" className="py-20 bg-mainBg">
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-[#1B3C8C] mb-12">
            Contáctanos
          </h2>
          <div className="grid md:grid-cols-2 gap-12">
            {/* Información de contacto */}
            <div className="space-y-6">
              <h3 className="text-2xl font-semibold text-[#1B3C8C] mb-6">
                Información de Contacto
              </h3>
              <div className="space-y-4">
                <div className="flex items-start space-x-4">
                  <MapPin className="w-6 h-6 text-[#3B82F6] mt-1" />
                  <div>
                    <h4 className="font-semibold">Dirección</h4>
                    <p className="text-gray-600">Av. Principal #123, Ciudad</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <Phone className="w-6 h-6 text-[#3B82F6] mt-1" />
                  <div>
                    <h4 className="font-semibold">Teléfono</h4>
                    <p className="text-gray-600">3173172333</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <Mail className="w-6 h-6 text-[#3B82F6] mt-1" />
                  <div>
                    <h4 className="font-semibold">Email</h4>
                    <p className="text-gray-600">
                      fundacion@elojimjadach.org <br />
                      ginav.sm@elojimjadach.org
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <Clock className="w-6 h-6 text-[#3B82F6] mt-1" />
                  <div>
                    <h4 className="font-semibold">Horario de Atención</h4>
                    <p className="text-gray-600">
                      Lunes a Viernes: 9:00 AM - 6:00 PM
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Formulario */}
            <form
              onSubmit={handleSubmit}
              className="space-y-6 bg-white p-8 rounded-lg shadow-md"
            >
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label htmlFor="nombre" className="text-sm font-medium">
                    Nombre
                  </label>
                  <Input name="nombre" id="nombre" type="text" placeholder="Tu nombre" />
                </div>
                <div className="space-y-2">
                  <label htmlFor="email" className="text-sm font-medium">
                    Email
                  </label>
                  <Input name="email" id="email" type="email" placeholder="tu@email.com" />
                </div>
              </div>
              <div className="space-y-2">
                <label htmlFor="asunto" className="text-sm font-medium">
                  Asunto
                </label>
                <Input name="asunto" id="asunto" type="text" placeholder="Asunto del mensaje" />
              </div>
              <div className="space-y-2">
                <label htmlFor="mensaje" className="text-sm font-medium">
                  Mensaje
                </label>
                <Textarea
                  name="mensaje"
                  id="mensaje"
                  placeholder="Escribe tu mensaje aquí..."
                  className="min-h-[150px]"
                />
              </div>
              <Button
                disabled={sending}
                type="submit"
                className="w-full bg-[#1B3C8C] hover:bg-[#2563EB] text-white transition-colors"
              >
                <Send className="w-4 h-4 mr-2" />
                {sending ? "Enviando..." : "Enviar Mensaje"}
              </Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contactanos;
