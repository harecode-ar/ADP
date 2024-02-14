import { IConfiguration, EConfigurationKey } from '@adp/shared'
import { EColumnType } from 'src/components/table'
import type { TColumn } from 'src/components/table'

type TRow = Pick<IConfiguration, 'id' | 'key' | 'value' | 'description'>

export const TABLE_ID = 'configuration-list-table'

export const COLUMNS: TColumn[] = [
  // {
  //   id: 'id',
  //   label: 'ID',
  //   type: EColumnType.NUMBER,
  //   renderCell: (row: TRow) => row.id,
  // },
  {
    id: 'key',
    label: 'Clave',
    type: EColumnType.STRING,
    renderCell: (row: TRow) => {
      switch (row.key) {
        case EConfigurationKey.PERCENTAGE_ALERT_MARGIN_PROJECT:
          return 'Margen de alerta de proyectos'
        case EConfigurationKey.PERCENTAGE_ALERT_MARGIN_STAGE:
          return 'Margen de alerta de etapas'
        default:
          return row.key
      }
    },
    searchValue: (row: TRow) => {
      switch (row.key) {
        case EConfigurationKey.PERCENTAGE_ALERT_MARGIN_PROJECT:
          return 'Margen de alerta de proyectos'
        case EConfigurationKey.PERCENTAGE_ALERT_MARGIN_STAGE:
          return 'Margen de alerta de etapas'
        default:
          return row.key
      }
    },
  },
  {
    id: 'value',
    label: 'Valor',
    type: EColumnType.STRING,
    renderCell: (row: TRow) => {
      switch (row.key) {
        case EConfigurationKey.PERCENTAGE_ALERT_MARGIN_PROJECT:
          return `${(Number(row.value) * 100).toFixed(0)}%`
        case EConfigurationKey.PERCENTAGE_ALERT_MARGIN_STAGE:
          return `${(Number(row.value) * 100).toFixed(0)}%`
        default:
          return row.value
      }
    },
    searchValue: (row: TRow) => {
      switch (row.key) {
        case EConfigurationKey.PERCENTAGE_ALERT_MARGIN_PROJECT:
          return `${(Number(row.value) * 100).toFixed(0)}%`
        case EConfigurationKey.PERCENTAGE_ALERT_MARGIN_STAGE:
          return `${(Number(row.value) * 100).toFixed(0)}%`
        default:
          return row.value
      }
    },
  },
  {
    id: 'description',
    label: 'Descripción',
    type: EColumnType.STRING,
    searchable: false,
    renderCell: (row: TRow) => row.description,
  },
]
