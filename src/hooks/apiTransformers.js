// src/utils/apiTransformers.js (o el archivo donde guardes tus funciones de transformación)

// Función para transformar los datos del formulario de voluntariado (ya existente)
export function transformVoluntariadoDataForApi(formData) {
  return {
    nombreCompleto: formData.nombreCompleto,
    tipoDocumento: formData.tipoDocumento,
    numeroDocumento: formData.numeroDocumento,
    fechaNacimiento: formData.fechaNacimiento,
    direccion: formData.direccion,
    telefonoContacto: formData.telefonoContacto,
    correoElectronico: formData.correoElectronico,
    comuna: formData.comuna,
    estratoSocial: formData.estratoSocial,
    edad: parseInt(formData.edad, 10),
    grupoEtnico: formData.grupoEtnico,
    nivelEducativo: formData.nivelEducativo,
    profesionOcupacion: formData.profesionOcupacion,
    disponibilidadTipo: formData.disponibilidad,
    diasEspecificos: formData.diasEspecificos,
    horasDisponibles: parseInt(formData.horasDisponibles, 10),
    areasInteres: formData.areasInteres,
    otrasAreas: formData.otrasAreas,
    habilidades: formData.habilidades,
    motivacion: formData.motivacion,
    // Asegúrate de que estos campos existan o se manejen correctamente si son opcionales
    fundacion: formData.experienciaPrevia?.fundacion || null,
    funcion: formData.experienciaPrevia?.funcion || null,
    tiempo: formData.experienciaPrevia?.tiempo || null,
    referencia1Nombre: formData.referencias?.[0]?.nombre || null,
    referencia1Telefono: formData.referencias?.[0]?.telefono || null,
    referencia2Nombre: formData.referencias?.[1]?.nombre || null,
    referencia2Telefono: formData.referencias?.[1]?.telefono || null,
    aceptaTerminos: formData.aceptaTerminos,
  };
}

// Función para transformar los datos del formulario cultural (ya existente)
export function transformCulturalDataForApi(formData) {
  return {
    nombreCompleto: formData.nombreCompleto,
    fechaNacimiento: new Date(formData.fechaNacimiento).toISOString(), // Asegúrate de que la fecha sea ISO string
    comuna: formData.comuna,
    estratoSocial: formData.estratoSocial,
    edad: parseInt(formData.edad, 10),
    grupoEtnico: formData.grupoEtnico,
    telefonoContacto: formData.telefonoContacto,
    direccion: formData.direccion,
    documentoIdentidad: formData.documentoIdentidad,
    correoElectronico: formData.correoElectronico, // Agregado, si se usa
    municipioDepartamento: formData.municipioDepartamento,
    nivelEducativo: formData.nivelEducativo,
    ocupacion: formData.ocupacion,
    areaInteresPrincipal: formData.areaInteres === 'Otro' ? formData.otraArea : formData.areaInteres,
    formacionPrevia: formData.formacionPrevia === 'si',
    detalleFormacion: formData.detalleFormacion || null,
    perteneceGrupo: formData.perteneceGrupo === 'si',
    detalleGrupo: formData.detalleGrupo || null,
    diasDisponibles: formData.diasDisponibles,
    motivacion: formData.motivacion,
    expectativas: formData.expectativas,
    aceptaTerminos: formData.aceptaTerminos,
  };
}

// Función para transformar los datos del formulario de Economía Plateada (ya existente)
export function transformEconomiaPDataForApi(formData) {
  return {
    nombreCompleto: formData.nombreCompleto,
    tipoDocumento: formData.tipoDocumento,
    numeroDocumento: formData.numeroDocumento,
    fechaNacimiento: new Date(formData.fechaNacimiento).toISOString(), // Asegúrate de que la fecha sea ISO string
    comuna: formData.comuna,
    estratoSocial: formData.estratoSocial,
    edad: parseInt(formData.edad, 10),
    grupoEtnico: formData.grupoEtnico,
    genero: formData.genero,
    telefonoContacto: formData.telefonoContacto,
    correoElectronico: formData.correoElectronico || null,
    direccion: formData.direccion,
    esPensionado: formData.esPensionado === 'si',
    actividadEconomica: formData.actividadEconomica || null,
    trabajoAnterior: formData.trabajoAnterior === 'si',
    sectorTrabajo: formData.sectorTrabajo || null,
    ingresosAdicionales: formData.ingresosAdicionales === 'si',
    fuenteIngresos: formData.fuenteIngresos || null,
    areasInteres: Array.isArray(formData.areasInteres) ? formData.areasInteres : [],
    otrasAreas: formData.otrasAreas || null,
    habilidades: formData.habilidades || null,
    tiempoSemanal: formData.tiempoSemanal,
    motivacion: formData.motivacion,
    expectativas: formData.expectativas,
    aceptaTerminos: formData.aceptaTerminos,
  };
}

// *** NUEVA FUNCIÓN PARA MUJER VULNERABLE ***
export function transformMujerVulnerableDataForApi(formData) {
  const AREAS_APOYO_MAP = {
    "Capacitación y empleo": "CAPACITACION_Y_EMPLEO",
    "Emprendimiento": "EMPRENDIMIENTO",
    "Educación": "EDUCACION",
    "Salud y bienestar": "SALUD_Y_BIENESTAR",
    "Apoyo psicológico y social": "APOYO_PSICOLOGICO_Y_SOCIAL",
    "Vivienda y subsidios": "VIVIENDA_Y_SUBSIDIOS"
  };

  const mappedAreas = (Array.isArray(formData.areasApoyo) ? formData.areasApoyo : [])
    .filter(area => AREAS_APOYO_MAP.hasOwnProperty(area))
    .map(area => AREAS_APOYO_MAP[area]);

  return {
    nombreCompleto: formData.nombreCompleto,
    tipoDocumento: formData.tipoDocumento,
    numeroDocumento: formData.numeroDocumento,
    fechaNacimiento: new Date(formData.fechaNacimiento).toISOString(), // Formato ISO para el backend
    comuna: formData.comuna,
    estratoSocial: formData.estratoSocial,
    edad: isNaN(Number(formData.edad)) ? 0 : parseInt(formData.edad, 10),
    grupoEtnico: formData.grupoEtnico,
    telefonoContacto: formData.telefonoContacto,
    correoElectronico: formData.correoElectronico || null, // Puede ser nulo
    direccion: formData.direccion,

    esMadreCabeza: formData.esMadreCabeza, // Si ya es booleano, pásalo directamente
    numeroHijos: isNaN(Number(formData.numeroHijos)) ? 0 : parseInt(formData.numeroHijos, 10),
    conviveConOtrasPersonas: formData.conviveConOtrasPersonas, // Si ya es booleano, pásalo directamente
    conQuienesConvive: formData.conQuienesConvive || null,
    nivelEducativo: formData.nivelEducativo,
    tieneEmpleo: formData.tieneEmpleo, // Si ya es booleano, pásalo directamente
    actividadLaboral: formData.actividadLaboral || null,
    fuenteIngresos: (!formData.tieneEmpleo && formData.fuenteIngresos) ? formData.fuenteIngresos : null,
    // La lógica de fuenteIngresos: si 'tieneEmpleo' es 'no' Y hay 'fuenteIngresos', lo envía. Si no, es nulo.

    areasApoyo: mappedAreas, // Ya transformadas
    otrasAreas: formData.otrasAreas || null, // Puede ser nulo
    tieneApoyoGubernamental: formData.tieneApoyoGubernamental, // Si ya es booleano, pásalo directamente
    tipoApoyoGubernamental: (formData.tieneApoyoGubernamental && formData.tipoApoyoGubernamental) ? formData.tipoApoyoGubernamental : null,
    // Lógica para tipoApoyoGubernamental: si 'tieneApoyoGubernamental' es 'si' Y hay 'tipoApoyoGubernamental', lo envía. Si no, es nulo.

    motivacion: formData.motivacion,
    tiempoSemanalDisponible: formData.tiempoSemanal, // El backend espera 'tiempoSemanalDisponible'
    expectativas: formData.expectativas,

    aceptaTerminos: Boolean(formData.aceptaTerminos), // Convertir a booleano
  };
}

// *** NUEVA FUNCIÓN PARA SEMILLERO DE INNOVACIÓN ***

export function transformSemilleroDataForApi(formData) {
  const AREAS_INTERES_MAP = {
    "Emprendimiento social": "EMPRENDIMIENTO_SOCIAL",
    "Tecnología e innovación": "TECNOLOGIA_E_INNOVACION",
    "Medio ambiente y sostenibilidad": "MEDIO_AMBIENTE_Y_SOSTENIBILIDAD",
    "Transformación digital": "TRANSFORMACION_DIGITAL",
    "Desarrollo de productos o servicios": "DESARROLLO_DE_PRODUCTOS_O_SERVICIOS",
    "Otras": "OTRAS", // si fue seleccionada
  };

  const TIPO_VINCULACION_MAP_BACKEND = {
    "institucion": "INSTITUCION_EDUCATIVA",
    "comunidad": "COMUNIDAD",
  };

  const mappedAreas = (Array.isArray(formData.areasInteres) ? formData.areasInteres : [])
    .filter((area) => AREAS_INTERES_MAP[area]) // solo si está en el mapa
    .map((area) => AREAS_INTERES_MAP[area]);

  return {
    nombreCompleto: formData.nombreCompleto,
    tipoDocumento: formData.tipoDocumento,
    numeroDocumento: formData.numeroDocumento,
    fechaNacimiento: new Date(formData.fechaNacimiento).toISOString(),
    telefonoContacto: formData.telefonoContacto,
    correoElectronico: formData.correoElectronico || null,
    direccion: formData.direccion,
    comuna: formData.comuna,
    estratoSocial: formData.estratoSocial,
    edad: isNaN(Number(formData.edad)) ? 0 : parseInt(formData.edad, 10),
    grupoEtnico: formData.grupoEtnico,

    tipoVinculacion: TIPO_VINCULACION_MAP_BACKEND[formData.tipoVinculacion],
    nombreEntidadVinculacion: formData.nombreEntidadVinculacion,
    nivelEducativo: formData.nivelEducativo,

    participacionPrevia: formData.participacionPrevia,
    areasInteres: mappedAreas, // ← limpio, sin texto suelto
    otrasAreas: formData.otrasAreas?.trim() || null, // ← va como string separado
    tieneProyecto: formData.tieneProyecto,
    descripcionProyecto: formData.tieneProyecto ? formData.descripcionProyecto : null,

    habilidades: formData.habilidades,
    disponibilidad: formData.disponibilidad,
    motivacion: formData.motivacion,
    expectativas: formData.expectativas,
    aceptaTerminos: Boolean(formData.aceptaTerminos),
  };
}


export function transformSteamDataForAp(formData) {
  
  let mappedActividades = Array.isArray(formData.actividadesInteres) ? [...formData.actividadesInteres] : [];

  // Añadimos 'otrasActividades' si existe y no está vacío, directamente al array
  if (formData.otrasActividades && formData.otrasActividades.trim() !== "") {
  }

  return {
    nombreCompleto: formData.nombreCompleto,
    fechaNacimiento: new Date(formData.fechaNacimiento).toISOString(), // Formato ISO
    comuna: formData.comuna,
    estratoSocial: formData.estratoSocial,
    edad: isNaN(Number(formData.edad)) ? 0 : parseInt(formData.edad, 10),
    grupoEtnico: formData.grupoEtnico,
    institucionEducativa: formData.institucionEducativa,
    cursoGrado: formData.cursoGrado, // Lo enviamos como string, el backend ya lo convertirá si es necesario o lo validará
    direccion: formData.direccion,

    nombreAcudiente: formData.nombreAcudiente,
    relacionNino: formData.relacionNino,
    telefonoContacto: formData.telefonoContacto,
    correoElectronico: formData.correoElectronico || null,

    participacionPrevia: formData.participacionPrevia,
    actividadesInteres: mappedActividades, // ¡Aquí no hay mapeo, se envía el array directo!
    otrasActividades: formData.otrasActividades || null, // Se envía el texto libre de 'otrasActividades' como un campo separado

    disponibilidad: formData.disponibilidad,
    accesoComputadora: formData.accesoComputadora,
    accesoInternet: formData.accesoInternet,

    motivacion: formData.motivacion,
    expectativa: formData.expectativa,

    aceptaTerminos: Boolean(formData.aceptaTerminos),
  };
}

export function transformSeguridadAlimentariaDataForApi(formData) {
  return {
    // Mapeo de nombreCompleto (frontend) a nombreResponsable (backend/Prisma)
    nombreResponsable: formData.nombreCompleto,
    
    tipoDocumento: formData.tipoDocumento,
    numeroDocumento: formData.numeroDocumento,
    fechaNacimiento: new Date(formData.fechaNacimiento), // Asegúrate de que la fecha se convierta a un objeto Date

    // Mapeo de telefonoContacto (frontend) a telefono (backend/Prisma)
    telefono: formData.telefonoContacto,

    correoElectronico: formData.correoElectronico,
    direccion: formData.direccion,
    barrio: formData.barrio, // Añadir este campo para que coincida con Prisma
    comuna: formData.comuna,
    estratoSocial: formData.estratoSocial,
    grupoEtnico: formData.grupoEtnico,

    esAgricultor: formData.esAgricultor,
    tieneTierras: formData.tieneTierras,
    // Asegurarse de que hectareas y pisoTermico sean null si tieneTierras es false
    hectareas: formData.tieneTierras ? parseFloat(formData.hectareas) : null,
    pisoTermico: formData.tieneTierras ? formData.pisoTermico : null,
    
    tieneCultivo: formData.tieneCultivo,
    tiposCultivo: formData.tieneCultivo ? formData.tiposCultivo : null,
    
    participacionPrevia: formData.participacionPrevia,
    proyectosAnteriores: formData.participacionPrevia ? formData.proyectosAnteriores : null,

    tieneRiego: formData.tieneRiego,
    tieneHerramientas: formData.tieneHerramientas,
    tiposHerramientas: formData.tieneHerramientas ? formData.tiposHerramientas : null,
    tieneAsistenciaTecnica: formData.tieneAsistenciaTecnica,

    motivacion: formData.motivacion,
    tiempoSemanal: formData.tiempoSemanal,
    expectativas: formData.expectativas,

    aceptaTerminos: formData.aceptaTerminos,
    // ... otros campos que necesites enviar si los tienes en formData
  };
}

export function transformRefuerzoEscolarDataForApi(formData) {
  // Lista de áreas válidas reconocidas por el backend
  const AREAS_AYUDA_VALIDAS = [
    "MATEMATICAS",
    "LECTURA",
    "ESCRITURA",
    "CIENCIAS",
    "TECNOLOGIA",
    "OTRAS"
  ];

  // Filtra áreas válidas desde el frontend (convertidas a mayúscula por seguridad)
  const mappedAreas = Array.isArray(formData.areasAyuda)
    ? formData.areasAyuda.filter((area) =>
        AREAS_AYUDA_VALIDAS.includes(area.toUpperCase())
      )
    : [];

  // Si hay texto en otrasAreas, se envía por separado (NO se mete en el array)
  const otrasAreas = formData.otrasAreas?.trim() || null;

  return {
    // Datos del Niño/a
    nombreCompleto: formData.nombreCompleto,
    fechaNacimiento: new Date(formData.fechaNacimiento).toISOString(),
    comuna: formData.comuna,
    estratoSocial: formData.estratoSocial,
    edad: isNaN(Number(formData.edad)) ? 0 : parseInt(formData.edad, 10),
    grupoEtnico: formData.grupoEtnico,
    institucionEducativa: formData.institucionEducativa,
    cursoGrado: formData.cursoGrado,
    direccion: formData.direccion,

    // Datos del Acudiente
    nombreAcudiente: formData.nombreAcudiente,
    relacionNino: formData.relacionNino,
    telefonoContacto: formData.telefonoContacto,
    correoElectronico: formData.correoElectronico || null,

    // Información Académica
    areasAyuda: mappedAreas,
    otrasAreas: otrasAreas,
    refuerzoPrevio: Boolean(formData.refuerzoPrevio),
    dificultadesAcademicas: formData.dificultadesAcademicas,

    // Disponibilidad y Recursos
    disponibilidad: formData.disponibilidad,
    accesoMateriales: Boolean(formData.accesoMateriales),
    apoyoHabitos: Boolean(formData.apoyoHabitos),

    // Motivación
    motivacion: formData.motivacion,
    expectativas: formData.expectativas,

    // Autorización
    aceptaTerminos: Boolean(formData.aceptaTerminos),
  };
}


export function transformSoftwareFactoryDataForApi(formData) {
  const TECNOLOGIAS_VALIDAS = [
    "Desarrollo web (HTML, CSS, JavaScript)",
    "Backend (Python, Java, Node.js, etc.)",
    "Bases de datos (MySQL, PostgreSQL, MongoDB, etc.)",
    "Desarrollo móvil (Android, iOS, Flutter, React Native)",
    "Inteligencia Artificial / Machine Learning",
    "Ciberseguridad",
    "Otras",
  ];

  const AREAS_INTERES_VALIDAS = [
    "Desarrollo de Aplicaciones",
    "Inteligencia Artificial y Aprendizaje Automático",
    "Bases de Datos y Big Data",
    "Ciberseguridad",
    "Computación en la Nube y DevOps",
    "Internet de las Cosas (IoT)",
    "Realidad Virtual y Aumentada",
    "Blockchain y Criptomonedas",
    "Ingeniería de Software y Metodologías de Desarrollo",
    "Software para Educación e Inclusión",
    "Otras",
  ];

  // Filtrar tecnologías seleccionadas
  const tecnologiasFiltradas = Array.isArray(formData.tecnologias)
    ? formData.tecnologias.filter((t) => TECNOLOGIAS_VALIDAS.includes(t))
    : [];

  // Filtrar áreas de interés seleccionadas
  const areasInteresFiltradas = Array.isArray(formData.areasInteres)
    ? formData.areasInteres.filter((a) => AREAS_INTERES_VALIDAS.includes(a))
    : [];

  return {
    // Datos Personales
    nombreCompleto: formData.nombreCompleto,
    tipoDocumento: formData.tipoDocumento,
    numeroDocumento: formData.numeroDocumento,
    fechaNacimiento: new Date(formData.fechaNacimiento).toISOString(),
    telefonoContacto: formData.telefonoContacto,
    correoElectronico: formData.correoElectronico || null,
    direccion: formData.direccion,
    comuna: formData.comuna,
    estratoSocial: formData.estratoSocial,
    edad: isNaN(Number(formData.edad)) ? 0 : parseInt(formData.edad, 10),
    grupoEtnico: formData.grupoEtnico,

    // Información Académica
    modalidadVinculacion: formData.modalidadVinculacion,
    institucionEducativa: formData.institucionEducativa,
    programaAcademico: formData.programaAcademico,
    semestreNivel: formData.semestreNivel,
    tiempoDisponible: formData.tiempoDisponible,

    // Experiencia y Habilidades
    tecnologias: tecnologiasFiltradas,
    otrasAreas: formData.otrasAreas?.trim() || null,
    proyectosRealizados: formData.proyectosRealizados || null,

    // Motivación e Intereses
    areasInteres: areasInteresFiltradas,
    otrasAreasInteres: formData.otrasAreasInteres?.trim() || null,
    experienciaAgile: formData.experienciaAgile || null,
    motivacion: formData.motivacion,

    // Autorización
    aceptaTerminos: Boolean(formData.aceptaTerminos),
  };
}
