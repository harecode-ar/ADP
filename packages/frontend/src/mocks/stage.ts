export const STAGES_MOCK = [
  {
    id: 1,
    name: 'Etapa 1',
    progress: 0.5,
    startDate: '2023-11-02',
    endDate: '2023-11-03',
    state: {
      id: 2,
      name: 'En Progreso',
    },
    responsible: {
      id: 3,
      fullname: 'Pepe Perez',
    },
  },
  {
    id: 2,
    name: 'Etapa 2',
    progress: 0.7,
    startDate: '2023-11-02',
    endDate: '2023-11-03',
    state: {
      id: 1,
      name: 'Finalizada',
    },
    responsible: {
      id: 4,
      fullname: 'Juan Perez',
    },
  },
  {
    id: 3,
    name: 'Etapa 3',
    progress: 0.2,
    startDate: '2023-11-03',
    endDate: '2023-11-03',
    state: {
      id: 3,
      name: 'Pendiente',
    },
    responsible: {
      id: 5,
      fullname: 'Pedro Perez',
    },
  },
  {
    id: 4,
    name: 'Etapa 4',
    progress: 0.1,
    startDate: '2023-11-02',
    endDate: '2023-11-03',
    state: {
      id: 3,
      name: 'Pendiente',
    },
    responsible: {
      id: 6,
      fullname: 'Pablo Perez',
    },
  },
]
