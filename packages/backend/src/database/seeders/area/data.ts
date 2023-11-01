export default [
  {
    id: 1,
    name: 'Municipalidad',
    rolename: 'Intendente',
    description: 'Municipalidad',
    multiple: false,
    parentId: null,
    responsibleId: null,
  },
  {
    id: 2,
    name: 'Secretaria de Gobierno',
    rolename: 'Secretario',
    description: 'Secretaria de Gobierno',
    multiple: false,
    parentId: 1,
    responsibleId: null,
  },
  {
    id: 3,
    name: 'Secretaria de Hacienda',
    rolename: 'Secretario',
    description: 'Secretaria de Hacienda',
    multiple: false,
    parentId: 1,
    responsibleId: null,
  },
]
