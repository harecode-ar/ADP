import type { IProject } from '@adp/shared/types'
import { EColumnType } from 'src/components/table'
import type { TColumn } from 'src/components/table'
import Label from 'src/components/label'

const getLabelColor = (id: number) => {
  switch (id) {
    case 1:
      return 'primary'
    case 2:
      return 'warning'
    case 3:
      return 'error'
    default:
      return 'primary'
  }
}

type TRow = Pick<
  IProject,
  | 'id'
  | 'name'
  | 'description'
  | 'cost'
  | 'startDate'
  | 'endDate'
  | 'progress'
  | 'stateId'
  | 'areaId'
  | 'createdAt'
  | 'updatedAt'
  | 'state'
  | 'area'
  | 'stages'
  | 'responsible'
>

export const columns: TColumn[] = [
  {
    id: 'name',
    label: 'Nombre de proyecto',
    type: EColumnType.STRING,
    searchable: true,
    renderCell: (row: TRow) => row.name,
    searchValue: (row: TRow) => row.name,
  },
  {
    id: 'area',
    label: 'Area',
    type: EColumnType.STRING,
    hidden: true,
    searchable: true,
    renderCell: (row: any) => (row.area ? row.area?.name : 'Sin area'),
    searchValue: (row: any) => (row.area ? row.area?.name : 'Sin area'),
  },
  {
    id: 'fullName',
    label: 'Responsable',
    type: EColumnType.STRING,
    searchable: true,
    renderCell: (row: any) => (row.responsible ? row.responsible?.fullname : 'Sin responsable'),
    searchValue: (row: any) => (row.responsible ? row.responsible?.fullname : 'Sin responsable'),
  },
  {
    id: 'progress',
    label: 'Avance',
    type: EColumnType.STRING,
    searchable: true,
    renderCell: (row: any) => `${row.progress * 100}%`,
    searchValue: (row: TRow) => `${row.progress * 100}%`,
  },
  {
    id: 'state',
    label: 'Estado',
    type: EColumnType.STRING,
    searchable: true,
    renderCell: (row: any) => {
      const result = row.state?.name
      return (
        <Label variant="soft" sx={{ ml: 1 }} color={getLabelColor(row.state.id)}>
          {result}
        </Label>
      )
    },
    searchValue: (row: any) => row.state?.name || 'No tiene',
  },
]
