import type { IProject } from '@adp/shared'

export const PROJECT_MOCK = [
    {
        name: "Proyecto Infraestructura 1",
        area: {
            id: 1,
            name: "Area Infraestructura"
        },
        responsible: {
            id: 1,
            fullname: "Sofia Fernandez"
        },
        progress: 1,
        state: {
            id: 1,
            name: "Terminado"
        }
    },
    {
        name: "Proyecto Infraestructura 2",
        area: {
            id: 1,
            name: "Area Infraestructura"
        },
        responsible: {
            id: 2,
            fullname: "Mariana Marelli"
        },
        progress: 0.4,
        state: {
            id: 2,
            name: "En Progreso"
        }
    },
    {
        name: "Proyecto Infraestructura 3",
        area: {
            id: 1,
            name: "Area Infraestructura"
        },
        responsible: {
            id: 3,
            fullname: "Juan Loizzo"
        },
        progress: 0.3,
        state: {
            id: 2,
            name: "En Progreso"
        }
    },
    {
        name: "Proyecto Infraestructura 4",
        area: {
            id: 1,
            name: "Area Infraestructura"
        },
        responsible: {
            id: 4,
            fullname: "Pedro Lopez"
        },
        progress: 0.1,
        state: {
            id: 3,
            name: "Demorado"
        }
    }
] as unknown as IProject[]


