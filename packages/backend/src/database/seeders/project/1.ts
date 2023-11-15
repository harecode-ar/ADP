import { PROJECT_STATE, STAGE_STATE } from '@adp/shared'

export const PROJECT = {
  name: 'Construcción de 10 km de calle en Intendencia',
  startDate: '2023-12-01',
  endDate: '2024-11-30',
  description:
    'El proyecto "Construcción de 10km de calle" implica el desarrollo y mejora de infraestructura vial en una área específica. Comienza con una fase de planificación y diseño, seguida de la obtención de los permisos necesarios. Luego, se realiza la preparación del terreno, que incluye el desbroce y nivelación del área. La fase central del proyecto es la construcción de la base de la calle y su pavimentación, utilizando materiales como asfalto o concreto. Posteriormente, se lleva a cabo la señalización y los acabados necesarios para garantizar la seguridad y funcionalidad de la calle. Finalmente, el proyecto concluye con una revisión exhaustiva y la entrega oficial de la obra. Este proyecto no solo mejorará la conectividad y accesibilidad de la zona, sino que también potenciará el desarrollo económico y social en la región.',
  cost: String(3000000 * 1000),
  progress: 0,
  areaId: 1,
  stateId: PROJECT_STATE.NEW,
}

export const STAGES = [
  {
    name: 'Planificación y permisos',
    startDate: '2023-12-01',
    endDate: '2024-02-15',
    description:
      'Incluye estudios de ingeniería, diseño de la calle, y otros costos administrativos. Esto podría representar alrededor del 10-15% del costo total del proyecto. Los costos varían según las regulaciones locales y los requisitos de permisos. Podría ser un pequeño porcentaje del costo total, alrededor del 1-3%.',
    progress: 0,
    areaId: 1,
    stateId: STAGE_STATE.NEW,
  },
  {
    name: 'Preparación del sitio',
    startDate: '2024-02-16',
    endDate: '2024-04-15',
    description:
      'Incluye desbroce, movimiento de tierras, y preparación del sitio. Esto podría costar entre 5-10% del total.',
    progress: 0,
    areaId: 1,
    stateId: STAGE_STATE.NEW,
  },
  {
    name: 'Excavación y nivelación',
    startDate: '2024-04-16',
    endDate: '2024-06-15',
    description: '',
    progress: 0,
    areaId: 1,
    stateId: STAGE_STATE.NEW,
  },
  {
    name: 'Construcción de la base',
    startDate: '2024-06-16',
    endDate: '2024-08-30',
    description:
      'Esto constituye una gran parte del costo, incluyendo materiales como asfalto, concreto y la mano de obra. Puede ser hasta el 50-70% del costo total.',
    progress: 0,
    areaId: 1,
    stateId: STAGE_STATE.NEW,
  },
  {
    name: 'Colocación de pavimento',
    startDate: '2024-09-01',
    endDate: '2024-10-30',
    description:
      'Incluye señalización vial, pintura, y otros acabados. Esto podría ser alrededor del 5-10%.',
    progress: 0,
    areaId: 1,
    stateId: STAGE_STATE.NEW,
  },
  {
    name: 'Acabados y señalización',
    startDate: '2024-11-01',
    endDate: '2024-11-30',
    description:
      'Incluye inspecciones finales y otros costos asociados a la finalización del proyecto, alrededor del 1-5%.',
    progress: 0,
    areaId: 1,
    stateId: STAGE_STATE.NEW,
  },
]
