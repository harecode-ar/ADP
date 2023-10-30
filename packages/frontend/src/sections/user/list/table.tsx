import React, { useMemo } from 'react'
import CustomTable from 'src/components/table/custom-table'
import { useBoolean } from 'src/hooks/use-boolean'
import CustomTableSearch from 'src/components/table/custom-table-search'
import CustomTableToolbar from 'src/components/table/custom-table-toolbar'
import CustomTableSkeleton from 'src/components/table/custom-table-skeleton'
import { EColumnType, useTable } from 'src/components/table'
import type { TColumn } from 'src/components/table'
import { useQuery } from '@apollo/client'
import { USERS_FOR_LIST } from 'src/graphql/queries'
import { Box, IconButton } from '@mui/material'
import Iconify from 'src/components/iconify'
import Link from 'next/link'
import { paths } from 'src/routes/paths'
import ModalCreate from './modal-create'
import ModalEdit from './modal-edit'
import ModalDelete from './modal-delete'

const columns: TColumn[] = [
  {
    id: 'id',
    label: 'ID',
    type: EColumnType.NUMBER,
    renderCell: (row: any) => row.id,
  },
  {
    id: 'firstname',
    label: 'Nombre',
    type: EColumnType.STRING,
    renderCell: (row: any) => row.firstname,
  },
  {
    id: 'lastname',
    label: 'Apellido',
    type: EColumnType.STRING,
    renderCell: (row: any) => row.lastname,
  },
  {
    id: 'email',
    label: 'Email',
    type: EColumnType.STRING,
    renderCell: (row: any) => row.email,
  },
  {
    id: 'telephone',
    label: 'Telefono',
    type: EColumnType.STRING,
    renderCell: (row: any) => row.telephone,
  },
  {
    id: 'roleId',
    label: 'RolId',
    type: EColumnType.STRING,
    renderCell: (row: any) => row.roleId,
  }
]

type TProps = {
  modalCreate: ReturnType<typeof useBoolean>
}

const Table = (props: TProps) => {
  const { modalCreate } = props
  const { data, loading, refetch } = useQuery(USERS_FOR_LIST)
  const { selected } = useTable()
  const modalEdit = useBoolean()
  const modalDelete = useBoolean()

  const users = useMemo(() => {
    if (!data) return []
    return data.users || []
  }, [data])

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
            data={users}
            action={
              <React.Fragment>
                {selected.length === 1 && (
                  <React.Fragment>
                    <Link
                      href={
                        selected.length === 1
                          ? paths.dashboard.area.detalle.replace(':id', selected[0])
                          : ''
                      }
                    >
                      <IconButton>
                        <Iconify icon="material-symbols:visibility" />
                      </IconButton>
                    </Link>

                    <IconButton
                      onClick={() => {
                        // setAreaId(Number(selected[0]))
                        modalEdit.onTrue()
                      }}
                    >
                      <Iconify icon="material-symbols:edit" />
                    </IconButton>
                    <IconButton
                      onClick={() => {
                        console.log(selected)
                        // setAreaId(Number(selected[0]))
                        modalDelete.onTrue()
                      }}
                    >
                      <Iconify icon="material-symbols:delete" />
                    </IconButton>
                  </React.Fragment>
                )}
              </React.Fragment>
            }
          />
          <ModalCreate modal={modalCreate} refetch={refetch} />
          <ModalEdit modal={modalEdit} refetch={refetch} />
          <ModalDelete modal={modalDelete} refetch={refetch} />
        </React.Fragment>
      )}
    </Box>
  )
}

export default Table
