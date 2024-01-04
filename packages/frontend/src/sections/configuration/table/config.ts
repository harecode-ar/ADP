import { IConfiguration } from '@adp/shared'
import { EColumnType } from 'src/components/table'
import type { TColumn } from 'src/components/table'

type TRow = Pick<IConfiguration, 'id' | 'key' | 'value'>

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
    renderCell: (row: TRow) => row.key,
  },
  {
    id: 'value',
    label: 'Valor',
    type: EColumnType.STRING,
    renderCell: (row: TRow) => row.value,
  },
]
