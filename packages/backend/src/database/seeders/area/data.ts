export default [
  {
    id: 1,
    name: 'Intendencia',
    description: 'Responsable de la gestión y administración general.',
    parentId: null,
    rolename: 'Intendente',
    responsibleId: null,
    multiple: false,
  },
  {
    id: 2,
    name: 'Secretaría de Gobierno',
    description: 'Responsable de la gestión de su respectiva área dentro del municipio.',
    parentId: 1,
    rolename: 'Secretario',
    responsibleId: null,
    multiple: false,
  },
  {
    id: 3,
    name: 'Dirección de Asuntos Legales',
    description: 'Gestiona los asuntos legales y jurídicos del municipio.',
    parentId: 2,
    rolename: 'Director',
    responsibleId: null,
    multiple: false,
  },
  {
    id: 4,
    name: 'Dirección de Relaciones Institucionales',
    description: 'Maneja las relaciones con otras instituciones y gobiernos.',
    parentId: 2,
    rolename: 'Director',
    responsibleId: null,
    multiple: false,
  },
  {
    id: 5,
    name: 'Secretaría de Hacienda y Finanzas',
    description: 'Responsable de la gestión de su respectiva área dentro del municipio.',
    parentId: 1,
    rolename: 'Secretario',
    responsibleId: null,
    multiple: false,
  },
  {
    id: 6,
    name: 'Dirección de Presupuesto',
    description: 'Elabora y gestiona el presupuesto municipal.',
    parentId: 5,
    rolename: 'Director',
    responsibleId: null,
    multiple: false,
  },
  {
    id: 7,
    name: 'Dirección de Tesorería',
    description: 'Administra los recursos financieros del municipio.',
    parentId: 5,
    rolename: 'Director',
    responsibleId: null,
    multiple: false,
  },
  {
    id: 8,
    name: 'Secretaría de Obras y Servicios Públicos',
    description: 'Responsable de la gestión de su respectiva área dentro del municipio.',
    parentId: 1,
    rolename: 'Secretario',
    responsibleId: null,
    multiple: false,
  },
  {
    id: 9,
    name: 'Dirección de Obras Públicas',
    description: 'Planifica y ejecuta obras públicas.',
    parentId: 8,
    rolename: 'Director',
    responsibleId: null,
    multiple: false,
  },
  {
    id: 10,
    name: 'Dirección de Servicios Urbanos',
    description: 'Encargada del mantenimiento y servicios urbanos.',
    parentId: 8,
    rolename: 'Director',
    responsibleId: null,
    multiple: false,
  },
  {
    id: 11,
    name: 'Secretaría de Salud',
    description: 'Responsable de la gestión de su respectiva área dentro del municipio.',
    parentId: 1,
    rolename: 'Secretario',
    responsibleId: null,
    multiple: false,
  },
  {
    id: 12,
    name: 'Dirección de Atención Primaria de la Salud',
    description: 'Gestiona los centros de atención primaria de salud.',
    parentId: 11,
    rolename: 'Director',
    responsibleId: null,
    multiple: false,
  },
  {
    id: 13,
    name: 'Dirección de Políticas de Salud',
    description: 'Desarrolla políticas de salud pública.',
    parentId: 11,
    rolename: 'Director',
    responsibleId: null,
    multiple: false,
  },
  {
    id: 14,
    name: 'Secretaría de Desarrollo Social y Comunitario',
    description: 'Responsable de la gestión de su respectiva área dentro del municipio.',
    parentId: 1,
    rolename: 'Secretario',
    responsibleId: null,
    multiple: false,
  },
  {
    id: 15,
    name: 'Dirección de Desarrollo Social',
    description: 'Promueve programas sociales para la comunidad.',
    parentId: 14,
    rolename: 'Director',
    responsibleId: null,
    multiple: false,
  },
  {
    id: 16,
    name: 'Dirección de Políticas Comunitarias',
    description: 'Desarrolla y ejecuta políticas comunitarias.',
    parentId: 14,
    rolename: 'Director',
    responsibleId: null,
    multiple: false,
  },
  {
    id: 17,
    name: 'Secretaría de Seguridad',
    description: 'Responsable de la gestión de su respectiva área dentro del municipio.',
    parentId: 1,
    rolename: 'Secretario',
    responsibleId: null,
    multiple: false,
  },
  {
    id: 18,
    name: 'Dirección de Prevención Ciudadana',
    description: 'Fomenta la seguridad y prevención en la comunidad.',
    parentId: 17,
    rolename: 'Director',
    responsibleId: null,
    multiple: false,
  },
  {
    id: 19,
    name: 'Dirección de Tránsito y Transporte',
    description: 'Regula y gestiona el tránsito y transporte público.',
    parentId: 17,
    rolename: 'Director',
    responsibleId: null,
    multiple: false,
  },
  {
    id: 20,
    name: 'Secretaría de Educación y Cultura',
    description: 'Responsable de la gestión de su respectiva área dentro del municipio.',
    parentId: 1,
    rolename: 'Secretario',
    responsibleId: null,
    multiple: false,
  },
  {
    id: 21,
    name: 'Dirección de Educación',
    description: 'Encargada de la gestión educativa municipal.',
    parentId: 20,
    rolename: 'Director',
    responsibleId: null,
    multiple: false,
  },
  {
    id: 22,
    name: 'Dirección de Cultura',
    description: 'Promueve y gestiona actividades culturales.',
    parentId: 20,
    rolename: 'Director',
    responsibleId: null,
    multiple: false,
  },
  {
    id: 23,
    name: 'Secretaría de Desarrollo Económico',
    description: 'Responsable de la gestión de su respectiva área dentro del municipio.',
    parentId: 1,
    rolename: 'Secretario',
    responsibleId: null,
    multiple: false,
  },
  {
    id: 24,
    name: 'Dirección de Desarrollo Económico',
    description: 'Impulsa el desarrollo económico local.',
    parentId: 23,
    rolename: 'Director',
    responsibleId: null,
    multiple: false,
  },
  {
    id: 25,
    name: 'Dirección de Empleo y Capacitación',
    description: 'Fomenta la creación de empleo y ofrece capacitación laboral.',
    parentId: 23,
    rolename: 'Director',
    responsibleId: null,
    multiple: false,
  },
]
