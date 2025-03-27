import {
  Heart,
  SproutIcon as Seedling,
  Music,
  Leaf,
  GraduationCap,
  Code,
  HandHeart,
  Lightbulb,
  UserCog,
} from "lucide-react"

export const programs = [
  {
    id: 1,
    title: "Programa Mujer Vulnerable",
    description:
      "Apoyo integral a mujeres en situación de vulnerabilidad a través de asistencia psicológica, legal y formación para el empleo.",
    color: "#E91E63", // Rosa más vibrante
    bgColor: "#FCE4EC",
    icon: Heart,
    longDescription:
      "El Programa Mujer Vulnerable busca promover la autonomía económica y el bienestar integral de las mujeres en situación de vulnerabilidad, a través de la capacitación productiva, el acceso a microcréditos y el acompañamiento psicosocial. El programa fomenta la creación de redes de apoyo comunitarias y alianzas estratégicas con el sector privado para generar oportunidades laborales y fortalecer el emprendimiento. Además, se gestionan espacios seguros donde las mujeres puedan desarrollar sus talentos y construir su independencia económica.",
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
    id: 2,
    title: "Semillero de Innovación y Emprendimiento",
    description:
      "Formación y acompañamiento para el desarrollo de proyectos innovadores con impacto social y económico.",
    color: "#4CAF50", // Verde
    bgColor: "#E8F5E9",
    icon: Seedling,
    longDescription:
      "El Semillero de Innovación y Emprendimiento está dirigido a jóvenes de 15 años en adelante interesados en desarrollar habilidades creativas con pensamiento crítico, orientadas a generar soluciones innovadoras con impacto social y espíritu emprendedor.",
    requirements: [
      "Personas mayores de 15 años",
      "Interés en innovación y emprendimiento",
      "Compromiso con el desarrollo de proyectos",
      "Disponibilidad para participar en actividades formativas",
    ],
    benefits: [
      "Formación en metodologías de innovación",
      "Mentoría especializada",
      "Acceso a redes de colaboración",
      "Espacios de trabajo colaborativo",
      "Oportunidades de financiación para proyectos destacados",
    ],
  },
  {
    id: 3,
    title: "Programa Taller STEAM+H",
    description:
      "Formación en ciencia, tecnología, ingeniería, arte, matemáticas y humanidades para niños, niñas y adolescentes.",
    color: "#FF9800", // Naranja
    bgColor: "#FFF3E0",
    icon: Lightbulb,
    longDescription:
      "El programa STEAM+H está diseñado para que niños y jóvenes desarrollen habilidades en Ciencia, Tecnología, Ingeniería, Artes, Matemáticas y Humanidades, fomentando el pensamiento crítico, la creatividad y la resolución de problemas con ética y comunicación efectiva.",
    requirements: [
      "Niños, niñas y adolescentes entre 8 y 14 años",
      "Interés en actividades tecnológicas y creativas",
      "Disponibilidad para asistir a los talleres semanales",
      "Autorización de padres o acudientes",
    ],
    benefits: [
      "Desarrollo de pensamiento computacional",
      "Aprendizaje de programación básica y robótica",
      "Fomento de la creatividad y trabajo en equipo",
      "Materiales y equipos incluidos",
      "Presentación de proyectos finales a la comunidad",
    ],
  },
  {
    id: 4,
    title: "Programa de Seguridad Alimentaria",
    description:
      "Implementación de sistemas agrícolas sostenibles para mejorar la producción, distribución y acceso a alimentos nutritivos.",
    color: "#00796B", // Verde azulado
    bgColor: "#E0F2F1",
    icon: Leaf,
    longDescription:
      "El Programa de Seguridad Alimentaria con Tecnología Inteligente tiene como objetivo fortalecer la seguridad alimentaria mediante la implementación de buenas prácticas de cultivo, respaldadas por hardware y software especializado. El programa brinda un acompañamiento integral a los agricultores en procesos de producción, capacitación, transformación y comercialización, optimizando las prácticas agrícolas a través de tecnologías innovadoras. Se utiliza una plataforma digital para monitorear variables clave del cultivo, permitiendo evidenciar una producción limpia y sostenible.",
    requirements: [
      "Agricultores o personas con interés en la producción de alimentos",
      "Acceso a tierra cultivable (propia o comunitaria)",
      "Compromiso con prácticas agrícolas sostenibles",
      "Disponibilidad para participar en capacitaciones técnicas",
    ],
    benefits: [
      "Insumos agrícolas y semillas de calidad",
      "Capacitación en técnicas de cultivo sostenible",
      "Asistencia técnica durante todo el ciclo productivo",
      "Conexión con mercados locales",
      "Apoyo para la implementación de sistemas de riego eficientes",
    ],
  },
  {
    id: 6,
    title: "Programa de Jornadas de Refuerzo Escolar",
    description:
      "Apoyo académico para niños, niñas y adolescentes con dificultades en su proceso de aprendizaje escolar.",
    color: "#FFC107", // Amarillo
    bgColor: "#FFF8E1",
    icon: GraduationCap,
    longDescription:
      "Las Jornadas de Refuerzo están diseñadas para fortalecer el aprendizaje de niños y jóvenes a través de estrategias dinámicas e interdisciplinarias. El enfoque práctico y la resolución de problemas en situaciones reales permiten un desarrollo integral, trabajando en conjunto con las familias para lograr mejores resultados académicos.",
    requirements: [
      "Niños, niñas y adolescentes en edad escolar",
      "Presentar dificultades en una o más áreas académicas",
      "Compromiso de asistencia regular a las jornadas",
      "Participación de padres o acudientes en el proceso",
    ],
    benefits: [
      "Atención personalizada según necesidades específicas",
      "Materiales educativos complementarios",
      "Desarrollo de hábitos de estudio efectivos",
      "Seguimiento del progreso académico",
      "Coordinación con docentes de la institución educativa",
    ],
  },
  {
    id: 7,
    title: "Programa de Factoría de Software",
    description:
      "Formación en desarrollo de software y creación de soluciones tecnológicas para problemas comunitarios.",
    color: "#2196F3", // Azul
    bgColor: "#E3F2FD",
    icon: Code,
    longDescription:
      "El programa Software Factory busca vincular a jóvenes interesados en fortalecer sus competencias en el desarrollo de software, participando en proyectos de impacto social que aporten soluciones tecnológicas a contextos que lo requieran. Los participantes se vinculan a través de semilleros de innovación, emprendimiento o prácticas profesionales desde instituciones de educación superior. El programa fomenta el uso de metodologías ágiles y promueve el emprendimiento, alineándose con los Objetivos de Desarrollo Sostenible. Los proyectos realizados benefician a comunidades que necesitan soluciones tecnológicas, contribuyendo al progreso social y comunitario.",
    requirements: [
      "Jóvenes entre 16 y 29 años",
      "Interés en tecnología y programación",
      "Compromiso con el desarrollo comunitario",
      "Disponibilidad para participar en todo el ciclo de formación",
    ],
    benefits: [
      "Formación técnica en desarrollo de software",
      "Experiencia práctica en proyectos reales",
      "Mentoría de profesionales del sector",
      "Acceso a equipos y herramientas tecnológicas",
      "Posibilidades de vinculación laboral o emprendimiento",
    ],
  },
  {
    id: 8,
    title: "Programa de Voluntariado Social",
    description: "Oportunidades para contribuir con tiempo y talento en proyectos sociales de impacto comunitario.",
    color: "#FF5722", // Naranja
    bgColor: "#FBE9E7",
    icon: HandHeart,
    longDescription:
      "El voluntariado social de la fundación consiste en la movilización de profesionales y ciudadanos comprometidos que, durante los fines de semana, visitan espacios donde se encuentran personas vulnerables con dificultades para acceder a alimentos. El objetivo es brindar apoyo solidario mediante la entrega de alimentos como chocolate, pan, huevos y envueltos, promoviendo un acto de empatía que contribuye a reducir la desigualdad y mejorar la calidad de vida de las personas en situación de vulnerabilidad. Esta labor es realizada generalmente los días sábado o domingo y permite canalizar esfuerzos hacia los más necesitados, contribuyendo a construir una sociedad más humana y equitativa.",
    requirements: [
      "Personas mayores de 18 años",
      "Compromiso con los valores de solidaridad y respeto",
      "Disponibilidad de tiempo según el área de voluntariado",
      "Disposición para trabajar en equipo y aprender constantemente",
    ],
    benefits: [
      "Formación en acción social y voluntariado",
      "Experiencia práctica en proyectos de impacto",
      "Desarrollo de habilidades personales y profesionales",
      "Certificación de las horas de voluntariado",
      "Participación en una red de agentes de cambio social",
    ],
  },
  {
    id: 9,
    title: "Programa Cultural",
    description:
      "Formación en música, danza, manualidades y otras expresiones artísticas para el desarrollo cultural de la comunidad.",
    color: "#9C27B0", // Púrpura
    bgColor: "#F3E5F5",
    icon: Music,
    longDescription:
      "El desarrollo de la cultura a través de las artes, el dibujo, las manualidades, la danza y la belleza, entre otros, contribuye a los Objetivos de Desarrollo Sostenible (ODS), fortaleciendo habilidades blandas esenciales como la creatividad, el trabajo en equipo, la comunicación y la resiliencia. Estas competencias son clave para la empleabilidad y el bienestar social (ODS 8 y 10). Además, la inclusión de programas radiales amplía el impacto cultural al fomentar el pensamiento crítico y la expresión oral, promoviendo la educación de calidad (ODS 4), el acceso a la información (ODS 16) y la integración de comunidades diversas.",
    requirements: [
      "Personas de todas las edades interesadas en actividades culturales",
      "Compromiso con el proceso de aprendizaje",
      "Disponibilidad para asistir a los talleres programados",
      "Participación en muestras artísticas comunitarias",
    ],
    benefits: [
      "Formación en diversas disciplinas artísticas",
      "Materiales básicos incluidos",
      "Participación en eventos culturales",
      "Desarrollo de habilidades creativas",
      "Integración en redes culturales locales",
    ],
  },
  {
    id: 10,
    title: "Programa Economía Plateada",
    description: "Apoyo integral para adultos mayores en el desarrollo de proyectos productivos y bienestar.",
    color: "#607D8B", // Azul grisáceo
    bgColor: "#ECEFF1",
    icon: UserCog,
    longDescription:
      "El Programa Economía Plateada busca integrar a personas mayores de 60 años en el desarrollo de emprendimientos sostenibles, aprovechando sus conocimientos y tradiciones para fortalecer el turismo local. A través de actividades como el turismo rural, la gastronomía autóctona y la narración de historias, los participantes podrán ofrecer experiencias auténticas que promuevan la identidad cultural y atraigan visitantes.",
    requirements: [
      "Personas mayores de 60 años",
      "Interés en desarrollar actividades productivas",
      "Compromiso con el proceso formativo",
      "Residir en la zona de influencia del programa",
    ],
    benefits: [
      "Formación en emprendimiento adaptada a adultos mayores",
      "Educación financiera y digital",
      "Apoyo para el desarrollo de proyectos productivos",
      "Actividades de bienestar físico y mental",
      "Espacios de socialización e intercambio de experiencias",
    ],
  },
]

