import {
    Heart,
    Utensils,
    Music,
    Recycle,
    Sprout,
    GraduationCap,
    Tractor,
    Users,
    Apple,
    Accessibility,
  } from "lucide-react"
  
  export const programs = [
    {
      id: 8,
      title: "Voluntariado Social",
      description:
        "Formación de liderazgos juveniles y promoción de la participación activa en procesos de desarrollo comunitario.",
      color: "#03A9F4", // Celeste
      bgColor: "#E1F5FE",
      icon: Users,
      longDescription:
        "El Programa de Juventud Activa y Participación Ciudadana forma líderes juveniles y promueve la participación activa de los jóvenes en procesos de desarrollo comunitario. Ofrecemos talleres de liderazgo, resolución de conflictos, diseño de proyectos sociales y comunicación efectiva. Creamos espacios donde los jóvenes pueden desarrollar iniciativas propias, participar en la toma de decisiones comunitarias y convertirse en agentes de cambio. Fomentamos valores democráticos y una ciudadanía responsable y comprometida con el bien común.",
      requirements: [
        "Jóvenes entre 15 y 29 años",
        "Interés en temas sociales y comunitarios",
        "Compromiso con la participación activa",
        "Disposición para desarrollar proyectos comunitarios",
      ],
      benefits: [
        "Formación en liderazgo y ciudadanía",
        "Apoyo para iniciativas juveniles",
        "Participación en redes de jóvenes líderes",
        "Intercambios con otras organizaciones",
        "Certificación en gestión de proyectos sociales",
      ],
    },
    {
      id: 7,
      title: "SOFTWARE FACTORY",
      description:
        "Implementación de soluciones tecnológicas para optimizar la producción agrícola y adaptarse al cambio climático.",
      color: "#9C27B0", // Morado
      bgColor: "#F3E5F5",
      icon: Tractor,
      longDescription:
        "El Programa de Innovación Tecnológica en el Agro implementa soluciones tecnológicas avanzadas para optimizar la producción agrícola y adaptarse a los desafíos del cambio climático. Introducimos sistemas de riego inteligente, monitoreo de cultivos mediante drones, análisis de datos para optimizar siembras, y técnicas de agricultura de precisión. Trabajamos con pequeños y medianos agricultores para que puedan aumentar su productividad, reducir costos y minimizar el impacto ambiental de sus actividades.",
      requirements: [
        "Ser productor agrícola (pequeña o mediana escala)",
        "Disposición para implementar nuevas tecnologías",
        "Participación en capacitaciones técnicas",
        "Compromiso con prácticas agrícolas sostenibles",
      ],
      benefits: [
        "Acceso a tecnologías agrícolas innovadoras",
        "Capacitación técnica especializada",
        "Asesoría para implementación en campo",
        "Conexión con mercados para productos",
        "Monitoreo y seguimiento técnico",
      ],
    },
    {
      id: 3,
      title: "Programa Cultural",
      description:
        "Promoción de expresiones artísticas y culturales como herramientas de transformación social y construcción de identidad comunitaria.",
      color: "#FF9800", // Naranja
      bgColor: "#FFF3E0",
      icon: Music,
      longDescription:
        "El Programa Cultural fomenta las expresiones artísticas como herramientas poderosas para la transformación social y la construcción de identidad comunitaria. A través de talleres de música, danza, teatro, artes plásticas y literatura, creamos espacios donde niños, jóvenes y adultos pueden desarrollar su creatividad y talentos. Organizamos festivales comunitarios, exposiciones y presentaciones que celebran la diversidad cultural y fortalecen el tejido social de nuestras comunidades.",
      requirements: [
        "Interés en actividades artísticas y culturales",
        "Disponibilidad para asistir a talleres semanales",
        "Compromiso con la participación en eventos comunitarios",
        "Todas las edades son bienvenidas",
      ],
      benefits: [
        "Talleres gratuitos de diversas expresiones artísticas",
        "Materiales para actividades sin costo",
        "Participación en festivales y eventos culturales",
        "Desarrollo de habilidades sociales y emocionales",
        "Espacios seguros para la expresión personal",
      ],
    },
    {
      id: 4,
      title: "Programa de Medio Ambiente y Reciclaje",
      description:
        "Iniciativas para la conservación ambiental, gestión de residuos y educación ecológica en comunidades urbanas y rurales.",
      color: "#2196F3", // Azul
      bgColor: "#E3F2FD",
      icon: Recycle,
      longDescription:
        "El Programa de Medio Ambiente y Reciclaje desarrolla iniciativas para la conservación ambiental, gestión eficiente de residuos y educación ecológica en comunidades urbanas y rurales. Implementamos sistemas de reciclaje comunitario, campañas de limpieza, talleres de educación ambiental y proyectos de reforestación. Nuestro objetivo es crear conciencia sobre la importancia de proteger nuestro entorno natural y proporcionar herramientas prácticas para que las comunidades puedan contribuir activamente a la sostenibilidad ambiental.",
      requirements: [
        "Interés en temas ambientales",
        "Disposición para participar en actividades comunitarias",
        "Compromiso con prácticas sostenibles",
        "Residir en las áreas de intervención del programa",
      ],
      benefits: [
        "Capacitación en gestión de residuos",
        "Participación en proyectos de reforestación",
        "Kits de reciclaje para hogares",
        "Certificación como promotor ambiental",
        "Acceso a huertos comunitarios sostenibles",
      ],
    },
    {
      id: 5,
      title: "Programa de Agricultura Urbana",
      description:
        "Desarrollo de huertos urbanos y técnicas de cultivo sostenible para mejorar la seguridad alimentaria en entornos urbanos.",
      color: "#795548", // Marrón
      bgColor: "#EFEBE9",
      icon: Sprout,
      longDescription:
        "El Programa de Agricultura Urbana promueve el desarrollo de huertos en espacios urbanos y enseña técnicas de cultivo sostenible para mejorar la seguridad alimentaria en las ciudades. Transformamos terrazas, balcones, patios y espacios comunitarios en productivos jardines comestibles. Ofrecemos capacitación en hidroponía, cultivos verticales, compostaje y control natural de plagas. Este programa no solo proporciona acceso a alimentos frescos y orgánicos, sino que también fortalece los lazos comunitarios y mejora los entornos urbanos.",
      requirements: [
        "Acceso a un espacio mínimo para cultivo (balcón, terraza, patio)",
        "Compromiso de mantenimiento regular",
        "Participación en talleres de capacitación",
        "Disposición para compartir conocimientos con la comunidad",
      ],
      benefits: [
        "Semillas y plántulas gratuitas",
        "Capacitación en técnicas de cultivo urbano",
        "Herramientas básicas para iniciar",
        "Asesoría técnica continua",
        "Participación en red de intercambio de productos",
      ],
    },
    {
      id: 6,
      title: "Programa de Capacitación y Empleabilidad",
      description:
        "Formación técnica y desarrollo de habilidades para mejorar las oportunidades laborales y fomentar el emprendimiento.",
      color: "#FFC107", // Amarillo
      bgColor: "#FFF8E1",
      icon: GraduationCap,
      longDescription:
        "El Programa de Capacitación y Empleabilidad ofrece formación técnica y desarrollo de habilidades para mejorar las oportunidades laborales y fomentar el emprendimiento en comunidades vulnerables. Impartimos cursos en oficios demandados por el mercado laboral, habilidades digitales, idiomas y competencias blandas. Además, proporcionamos asesoría para la búsqueda de empleo, preparación de currículos y entrevistas de trabajo. Para quienes desean emprender, ofrecemos mentorías y apoyo para el desarrollo de planes de negocio.",
      requirements: [
        "Ser mayor de 16 años",
        "Situación de desempleo o subempleo",
        "Compromiso de asistencia a los cursos completos",
        "Motivación para mejorar habilidades laborales",
      ],
      benefits: [
        "Cursos gratuitos certificados",
        "Materiales de estudio sin costo",
        "Prácticas en empresas aliadas",
        "Bolsa de empleo exclusiva",
        "Asesoría para emprendimientos",
      ],
    },
    {
      id: 2,
      title: "Programa de Seguridad Alimentaria con Tecnología Inteligente",
      description:
        "Implementación de sistemas tecnológicos para mejorar la producción, distribución y acceso a alimentos nutritivos.",
      color: "#4CAF50", // Verde
      bgColor: "#F1F8E9",
      icon: Utensils,
      longDescription:
        "El Programa de Seguridad Alimentaria con Tecnología Inteligente utiliza innovaciones tecnológicas para revolucionar la forma en que producimos, distribuimos y accedemos a alimentos nutritivos. Implementamos sistemas de monitoreo de cultivos, análisis de suelos mediante sensores, y plataformas digitales para conectar productores locales con consumidores. Este enfoque tecnológico nos permite maximizar la eficiencia de los recursos y garantizar la disponibilidad de alimentos saludables para las comunidades más necesitadas.",
      requirements: [
        "Comunidades con problemas de acceso a alimentos nutritivos",
        "Disponibilidad de espacio para implementación de huertos",
        "Compromiso comunitario para el mantenimiento de los sistemas",
        "Participación en capacitaciones técnicas",
      ],
      benefits: [
        "Sistemas de cultivo de alta eficiencia",
        "Monitoreo digital de producción alimentaria",
        "Capacitación en tecnologías agrícolas",
        "Mejora en la calidad nutricional de la dieta",
        "Reducción de pérdidas de alimentos",
      ],
    },
    {
      id: 1,
      title: "Programa Mujer Vulnerable",
      description:
        "Apoyo integral a mujeres en situación de vulnerabilidad a través de asistencia psicológica, legal y formación para el empleo.",
      color: "#FF69B4", // Rosa
      bgColor: "#FFF0F5",
      icon: Heart,
      longDescription:
        "El Programa Mujer Vulnerable ofrece un enfoque holístico para apoyar a mujeres en situación de vulnerabilidad. Proporcionamos asistencia psicológica para ayudar a superar traumas y construir resiliencia, asesoría legal para defender sus derechos, y capacitación laboral para fomentar la independencia económica. Nuestro objetivo es empoderar a las mujeres para que puedan reconstruir sus vidas con dignidad y confianza.",
      requirements: [
        "Ser mujer mayor de 18 años",
        "Encontrarse en situación de vulnerabilidad económica o social",
        "Residir en la zona de influencia del programa",
        "Compromiso de asistencia a las actividades programadas",
      ],
      benefits: [
        "Atención psicológica personalizada",
        "Asesoría legal gratuita",
        "Talleres de formación para el empleo",
        "Redes de apoyo entre participantes",
        "Posibilidad de microcréditos para emprendimientos",
      ],
    },
    {
      id: 9,
      title: "Programa de Nutrición y Salud Comunitaria",
      description:
        "Promoción de hábitos alimenticios saludables y prevención de enfermedades a través de la educación nutricional.",
      color: "#F44336", // Rojo
      bgColor: "#FFEBEE",
      icon: Apple,
      longDescription:
        "El Programa de Nutrición y Salud Comunitaria promueve hábitos alimenticios saludables y previene enfermedades a través de la educación nutricional y el acceso a alimentos nutritivos. Realizamos talleres de cocina saludable, evaluaciones nutricionales, huertos familiares de alimentos nutritivos y campañas de prevención de enfermedades relacionadas con la alimentación. Trabajamos especialmente con madres gestantes, niños en edad escolar y adultos mayores para mejorar su estado nutricional y calidad de vida.",
      requirements: [
        "Familias con niños menores de 12 años",
        "Mujeres embarazadas o en periodo de lactancia",
        "Adultos mayores",
        "Personas con condiciones de salud relacionadas con la nutrición",
      ],
      benefits: [
        "Evaluación nutricional personalizada",
        "Talleres de alimentación saludable",
        "Seguimiento de indicadores de salud",
        "Suplementos nutricionales cuando sea necesario",
        "Recetarios adaptados a recursos locales",
      ],
    },
    {
      id: 10,
      title: "Programa de Inclusión Social y Diversidad",
      description: "Promoción de la igualdad de oportunidades y el respeto a la diversidad en todas sus formas.",
      color: "#9C27B0", // Violeta
      bgColor: "#F3E5F5",
      icon: Accessibility,
      longDescription:
        "El Programa de Inclusión Social y Diversidad promueve la igualdad de oportunidades y el respeto a la diversidad en todas sus formas. Trabajamos para eliminar barreras que enfrentan personas con discapacidad, minorías étnicas, comunidad LGBTIQ+ y otros grupos vulnerables. Desarrollamos talleres de sensibilización, campañas contra la discriminación, adaptaciones para accesibilidad y políticas inclusivas. Nuestro objetivo es construir comunidades donde todas las personas sean valoradas, respetadas y puedan desarrollar plenamente su potencial.",
      requirements: [
        "Personas pertenecientes a grupos en situación de vulnerabilidad",
        "Organizaciones interesadas en implementar políticas inclusivas",
        "Comunidades con necesidades de sensibilización",
        "Compromiso con valores de respeto y diversidad",
      ],
      benefits: [
        "Apoyo para accesibilidad e inclusión",
        "Talleres de sensibilización",
        "Asesoría legal en casos de discriminación",
        "Redes de apoyo comunitario",
        "Materiales educativos adaptados",
      ],
    },
  ]
  
  