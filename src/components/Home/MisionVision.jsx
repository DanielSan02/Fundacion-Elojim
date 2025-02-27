import { Card, CardContent } from "@/components/ui/card";

const MisionVision = () => {
  return (
    <section id="nosotros" className="py-20 bg-mainBg">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-12">
          <Card className="relative overflow-hidden border-2 border-[#1B3C8C] bg-white shadow-lg">
            <div className="absolute top-0 left-0 w-full h-2 bg-[#1B3C8C]" />
            <CardContent className="pt-8 pb-6 px-6">
              <h3 className="text-2xl font-bold text-[#1B3C8C] mb-4">
                Nuestra Misión
              </h3>
              <p className="text-gray-600 leading-relaxed">
                La fundación Elojim Jadach fundamentada en la promoción de
                proyectos con un enfoque en desarrollo sostenible y tecnológico,
                orientados hacia la inclusión y el bienestar común. Su meta es
                generar un cambio duradero en la sociedad con modelos de madurez
                tecnologica trabajando en colaboración con modelos de
                investigación, emprendimiento e innovación. Se esfuerza por
                crear soluciones innovadoras que aborden desafíos sociales y
                ambientales, y que contribuyan al progreso y la
                igualdad para todos.
              </p>
            </CardContent>
          </Card>
          <Card className="relative overflow-hidden border-2 border-[#2E7D32] bg-white shadow-lg">
            <div className="absolute top-0 left-0 w-full h-2 bg-[#2E7D32]" />
            <CardContent className="pt-8 pb-6 px-6">
              <h3 className="text-2xl font-bold text-[#2E7D32] mb-4">
                Nuestra Visión
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Nuestra visión va dirigida a un mundo donde todas las personas
                tengan la oportunidad de alcanzar su máximo potencial y vivir
                vidas dignas y plenas. Visualizamos en el 2030 una sociedad
                donde la igualdad de oportunidades, el respeto por la diversidad
                y la solidaridad son los pilares fundamentales, esforzandonos
                por ser agentes de cambio positivo, inspirando y empoderando a
                individuos y comunidades para que superen las barreras que
                limitan su desarrollo y prosperen en un entorno de inclusión y
                justicia social
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default MisionVision;
