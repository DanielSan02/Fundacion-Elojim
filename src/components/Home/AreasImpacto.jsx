import { Card, CardContent } from "@/components/ui/card";

const AreasImpacto = () => {
  const areas = [
    {
      title: "Ayuda Comunitaria",
      description: "Apoyo directo a familias necesitadas",
      color: "#1B3C8C",
    },
    {
      title: "Educación",
      description: "Programas educativos y becas",
      color: "#3B82F6",
    },
    {
      title: "Salud",
      description: "Asistencia médica y prevención",
      color: "#2E7D32",
    },
    {
      title: "Desarrollo Social",
      description: "Proyectos de desarrollo comunitario",
      color: "#8B5E3C",
    },
  ];

  return (
    <section className="py-20 bg-secondaryBg">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-[#1B3C8C] mb-12">
          Nuestras Áreas de Impacto
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {areas.map((area, index) => (
            <Card
              key={index}
              className="group hover:shadow-lg transition-shadow duration-300 bg-white">
              <CardContent className="p-6">
                <div
                  className="h-2 w-20 mb-4"
                  style={{ backgroundColor: area.color }}
                />
                <h3
                  className="text-xl font-semibold mb-2"
                  style={{ color: area.color }}>
                  {area.title}
                </h3>
                <p className="text-gray-600">{area.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AreasImpacto;
