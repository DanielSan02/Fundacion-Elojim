import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Send, MapPin, Phone, Mail, Clock } from "lucide-react";

const Contactanos = () => {
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
                      fundacion@elojimjadach.org <br />{" "}
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
            <form className="space-y-6 bg-white p-8 rounded-lg shadow-md">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Nombre</label>
                  <Input type="text" placeholder="Tu nombre" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Email</label>
                  <Input type="email" placeholder="tu@email.com" />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Asunto</label>
                <Input type="text" placeholder="Asunto del mensaje" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Mensaje</label>
                <Textarea
                  placeholder="Escribe tu mensaje aquí..."
                  className="min-h-[150px]"
                />
              </div>
              <Button className="w-full bg-[#1B3C8C] hover:bg-[#2563EB] text-white transition-colors">
                <Send className="w-4 h-4 mr-2" />
                Enviar Mensaje
              </Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contactanos;
