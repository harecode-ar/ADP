import React from 'react'
import CustomTable from 'src/components/table/custom-table'
import CustomTableSearch from 'src/components/table/custom-table-search'
import CustomTableToolbar from 'src/components/table/custom-table-toolbar'
import CustomTableSkeleton from 'src/components/table/custom-table-skeleton'
import { EColumnType } from 'src/components/table'
import type { TColumn } from 'src/components/table'

const columns: TColumn[] = [
  {
    id: 'id',
    label: 'ID',
    type: EColumnType.NUMBER,
    renderCell: (row: any) => row.id,
  },
  {
    id: 'name',
    label: 'Nombre',
    type: EColumnType.STRING,
    renderCell: (row: any) => row.name,
  },
  {
    id: 'workStartTime',
    label: 'Hora de inicio',
    type: EColumnType.TIME,
    renderCell: (row: any) => row.workStartTime,
    searchValue: (row: any) => row.workStartTime,
  },
  {
    id: 'dayOfRest',
    label: 'Día de descanso',
    type: EColumnType.DATE,
    renderCell: (row: any) => row.dayOfRest,
  },
]

const data = [
  {
    id: 1,
    name: 'John',
    workStartTime: '08:00',
    dayOfRest: '2021-10-10',
  },
  {
    id: 2,
    name: 'Jane',
    workStartTime: '09:00',
    dayOfRest: '2021-10-11',
  },
  {
    id: 3,
    name: 'Joe',
    workStartTime: '08:30',
    dayOfRest: '2021-10-12',
  },
  {
    id: 4,
    name: 'Jill',
    workStartTime: '08:45',
    dayOfRest: '2021-10-13',
  }

]

const Table = () => {
  const [loading, setLoading] = React.useState(true)

  React.useEffect(() => {
    setTimeout(() => {
      setLoading(false)
    }, 2000)
  }, [])

  const refetch = () => {
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
    }, 2000)
  }

  return (
    <div>
      {loading ? (
        <CustomTableSkeleton columns={columns.length} search />
      ) : (
        <React.Fragment>
          <CustomTableToolbar id="one" columns={columns} download refetch={refetch} />
          <CustomTableSearch />
          <CustomTable id="one" columns={columns} data={data} />
        </React.Fragment>
      )}
    </div>
  )
}

export default Table
