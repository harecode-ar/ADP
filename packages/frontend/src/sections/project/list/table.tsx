import React, { useMemo, useEffect } from 'react'
import type { IProject, IRole, IUser } from '@adp/shared/types'
import CustomTable from 'src/components/table/custom-table'
// import { useBoolean } from 'src/hooks/use-boolean'
import CustomTableSearch from 'src/components/table/custom-table-search'
import CustomTableToolbar from 'src/components/table/custom-table-toolbar'
import CustomTableSkeleton from 'src/components/table/custom-table-skeleton'
import { EColumnType, useTable } from 'src/components/table'
import type { TColumn } from 'src/components/table'
import { useQuery } from '@apollo/client'
import { USERS_FOR_LIST } from 'src/graphql/queries'
import { PROJECT_MOCK } from 'src/mocks/project'
import { Box, IconButton, Typography } from '@mui/material'
// import Iconify from 'src/components/iconify'
// import ModalCreate from './modal-create'
// import ModalEdit from './modal-edit'
// import ModalDelete from './modal-delete'

type TRow = Pick<IProject, 'id' | 'name' | 'description' | 'cost' | 'startDate' | 'endDate' | 'progress' | 'stateId' | 'areaId' | 'createdAt' | 'updatedAt' | 'state' | 'area' | 'stages' | 'responsible'>

const columns: TColumn[] = [
  {
    id: 'name',
    label: 'Nombre de proyecto',
    type: EColumnType.STRING,
    renderCell: (row: TRow) => row.name,
  },
  {
    id: 'areaId',
    label: 'Area',
    type: EColumnType.STRING,
    hidden: true,
    renderCell: (row: any) => row.area?.name,
  },
  {
    id: 'lastname',
    label: 'Responsable',
    type: EColumnType.STRING,
    renderCell: (row: any) => row.responsible?.fullname,
  },
  {
    id: 'email',
    label: 'Avance',
    type: EColumnType.STRING,
    // renderCell: (row: TRow) => row.progress,
    renderCell: (row: any) => {
      const result = `${(row.progress * 100)}%`
      return result
    },
  },
  {
    id: 'telephone',
    label: 'Estado',
    type: EColumnType.STRING,
    // renderCell: (row: TRow) => row.state?.name,
    renderCell: (row: any) => {
        const result = row.state?.name
        return (

            result
            // <Typography >
            // </Typography>
            
        )
      },
  
  },
  // {
  //   id: 'roleId',
  //   label: 'Rol',
  //   type: EColumnType.STRING,
  //   renderCell: (row: TRow) => (row.role ? row.role.name : 'Sin rol'),
  //   searchValue: (row: TRow) => (row.role ? row.role.name : 'Sin rol'),
  // },
]

// type TRole = Pick<IRole, 'id' | 'name'>

// type TProps = {
//   modalCreate: ReturnType<typeof useBoolean>
// }

const projects = PROJECT_MOCK
  // console.log('Proyectoss', projects)

// const Table = (props: TProps) => {
const Table = () => {
  // const { modalCreate } = props
  const { data, loading, refetch } = useQuery(USERS_FOR_LIST)
  const { selected, hideColumns } = useTable()
  // const modalEdit = useBoolean()
  // const modalDelete = useBoolean()

  useEffect(() => {
    hideColumns(columns)
  }, [hideColumns])

  // const rolesQuery = useQuery(GET_ROLES_FOR_SELECT)
  // const roles: TRole[] = useMemo(() => {
  //   if (!rolesQuery.data) return []
  //   return rolesQuery.data.roles || []
  // }, [rolesQuery.data])

  // const users = useMemo(() => {
  //   if (!data) return []
  //   return data.users.map((user: IUser) => {
  //     const role = roles.find((r) => r.id === user.roleId)
  //     return {
  //       ...user,
  //       role,
  //     }
  //   })
  // }, [data, roles])

  return (
    <Box>
      {loading ? (
        <CustomTableSkeleton columns={columns.length} search />
      ) : (
        <React.Fragment>
          <CustomTableToolbar id="one" columns={columns} download refetch={refetch} />
          <CustomTableSearch />
          <CustomTable
            id="one"
            columns={columns}
            data={projects}
            checkbox={false}
            // action={
            //   <React.Fragment>
            //     {/* {selected.length === 1} */}
            //   </React.Fragment>
            // }
          />
          {/* {modalCreate.value && <ModalCreate modal={modalCreate} refetch={refetch} />}
          {modalEdit.value && <ModalEdit modal={modalEdit} refetch={refetch} />}
          <ModalDelete modal={modalDelete} refetch={refetch} /> */}
        </React.Fragment>
      )}
    </Box>
  )
}

export default Table
