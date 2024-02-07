import type { IRole, IUser } from '@adp/shared'
import React, { useEffect, useMemo } from 'react'
import NextLink from 'next/link'
import CustomTable from 'src/components/table/custom-table'
import { useBoolean } from 'src/hooks/use-boolean'
import CustomTableSearch from 'src/components/table/custom-table-search'
import CustomTableToolbar from 'src/components/table/custom-table-toolbar'
import CustomTableSkeleton from 'src/components/table/custom-table-skeleton'
import { EColumnType, useTable } from 'src/components/table'
import type { TColumn } from 'src/components/table'
import { useQuery } from '@apollo/client'
import { USERS_FOR_LIST, GET_ROLES_FOR_SELECT } from 'src/graphql/queries'
import { Avatar, Box, IconButton, Link } from '@mui/material'
import Iconify from 'src/components/iconify'
import { getStorageFileUrl } from 'src/utils/storage'
import { paths } from 'src/routes/paths'
import ModalCreate from './modal-create'
import ModalEdit from './modal-edit'
import ModalDelete from './modal-delete'

type TRow = Pick<
  IUser,
  'id' | 'firstname' | 'lastname' | 'email' | 'phone' | 'image' | 'roleId' | 'role'
>

const columns: TColumn[] = [
  {
    id: 'image',
    label: 'Imagen',
    type: EColumnType.ACTIONS,
    searchable: false,
    renderCell: (row: TRow) => (
      <Avatar
        src={getStorageFileUrl(row.image, '/broken-image.jpg')}
        alt={row.firstname}
        sx={{
          width: 50,
          height: 50,
        }}
      />
    ),
  },
  {
    id: 'firstname',
    label: 'Nombre',
    type: EColumnType.STRING,
    renderCell: (row: TRow) => row.firstname,
  },
  {
    id: 'lastname',
    label: 'Apellido',
    type: EColumnType.STRING,
    renderCell: (row: TRow) => row.lastname,
  },
  {
    id: 'email',
    label: 'Email',
    type: EColumnType.STRING,
    renderCell: (row: TRow) => row.email,
  },
  {
    id: 'phone',
    label: 'Telefono',
    type: EColumnType.STRING,
    renderCell: (row: TRow) => row.phone || 'Sin telefono',
    searchValue: (row: TRow) => row.phone || 'Sin telefono',
  },
  {
    id: 'roleId',
    label: 'Rol',
    type: EColumnType.STRING,
    renderCell: (row: TRow) => (row.role ? row.role.name : 'Sin rol'),
    searchValue: (row: TRow) => (row.role ? row.role.name : 'Sin rol'),
  },
]

type TRole = Pick<IRole, 'id' | 'name'>

type TProps = {
  modalCreate: ReturnType<typeof useBoolean>
}

const Table = (props: TProps) => {
  const { modalCreate } = props
  const { data, loading, refetch } = useQuery(USERS_FOR_LIST)
  const { selected, setMultiple } = useTable()
  const modalEdit = useBoolean()
  const modalDelete = useBoolean()

  const rolesQuery = useQuery(GET_ROLES_FOR_SELECT)
  const roles: TRole[] = useMemo(() => {
    if (!rolesQuery.data) return []
    return rolesQuery.data.roles || []
  }, [rolesQuery.data])

  const users = useMemo(() => {
    if (!data) return []
    return data.users.map((user: IUser) => {
      const role = roles.find((r) => r.id === user.roleId)
      return {
        ...user,
        role,
      }
    })
  }, [data, roles])

  useEffect(() => {
    setMultiple(false)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <Box>
      {loading ? (
        <CustomTableSkeleton columns={columns.length} search />
      ) : (
        <React.Fragment>
          <CustomTableToolbar id="user-list-table" columns={columns} download refetch={refetch} />
          <CustomTableSearch />
          <CustomTable
            id="user-list-table"
            columns={columns}
            data={users}
            action={
              <React.Fragment>
                {selected.length === 1 && (
                  <React.Fragment>
                    <Link
                      component={NextLink}
                      href={paths.dashboard.user.detail.replace(':id', selected[0])}
                    >
                      <IconButton>
                        <Iconify icon="mdi:eye" />
                      </IconButton>
                    </Link>

                    <IconButton onClick={modalEdit.onTrue}>
                      <Iconify icon="material-symbols:edit" />
                    </IconButton>
                    <IconButton onClick={modalDelete.onTrue}>
                      <Iconify icon="material-symbols:delete" />
                    </IconButton>
                  </React.Fragment>
                )}
              </React.Fragment>
            }
          />
          {modalCreate.value && <ModalCreate modal={modalCreate} refetch={refetch} />}
          {modalEdit.value && <ModalEdit modal={modalEdit} roles={roles} refetch={refetch} />}
          <ModalDelete modal={modalDelete} refetch={refetch} />
        </React.Fragment>
      )}
    </Box>
  )
}

export default Table
