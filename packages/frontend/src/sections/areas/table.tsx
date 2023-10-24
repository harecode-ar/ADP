import React, { useMemo, useState } from 'react'
import CustomTable from 'src/components/table/custom-table'
import { useBoolean } from 'src/hooks/use-boolean';
import CustomTableSearch from 'src/components/table/custom-table-search'
import CustomTableToolbar from 'src/components/table/custom-table-toolbar'
import CustomTableSkeleton from 'src/components/table/custom-table-skeleton'
import { EColumnType, useTable } from 'src/components/table'
import type { TColumn } from 'src/components/table'
import { useQuery } from '@apollo/client'
import { AREAS_FOR_LIST } from 'src/graphql/queries'
import { IconButton } from '@mui/material'
import Iconify from 'src/components/iconify'
import ModalCreate from './modalCreate'
import ModalEdit from './modalEdit'
import ModalDelete from './modalDelete'

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
    id: 'description',
    label: 'Descripcion',
    type: EColumnType.STRING,
    renderCell: (row: any) => row.description,
    searchValue: (row: any) => row.description,
  },
  {
    id: 'responsable',
    label: 'Responsable',
    type: EColumnType.STRING,
    renderCell: (row: any) => row.responsable,
  },

]

type TProps = {
  modalCreate: ReturnType<typeof useBoolean>
}

const Table = (props: TProps) => {
  const { modalCreate } = props
  const { data, loading, refetch } = useQuery(AREAS_FOR_LIST)
  const { selected, setSelected } = useTable()
  const modalEdit = useBoolean();
  const modalDelete = useBoolean();

  const [areaId, setAreaId] = useState<number>(0);

  const areas = useMemo(() => {
    if (!data) return []
    return data.areas || []
  }, [data])

  return (
    <div>
      {loading ? (
        <CustomTableSkeleton columns={columns.length} search />
      ) : (
        <React.Fragment>
          <CustomTableToolbar id="one" columns={columns} download refetch={refetch} />
          <CustomTableSearch />
          <CustomTable
            id="one"
            columns={columns}
            data={areas}
            action={<React.Fragment>
              {selected.length === 1 && (
                <React.Fragment>
                  <IconButton onClick={() => {
                    setAreaId(Number(selected[0]));
                    modalEdit.onTrue();
                  }}>
                    <Iconify icon="material-symbols:edit" />
                  </IconButton>
                  <IconButton onClick={() => {
                    console.log(selected)
                    setAreaId(Number(selected[0]));
                    modalDelete.onTrue();
                  }}>
                    <Iconify icon="material-symbols:delete" />
                  </IconButton>
                </React.Fragment>
              )}
            </React.Fragment>}
          />
          <ModalCreate modal={modalCreate} refetch={refetch} />
          <ModalEdit modal={modalEdit} areaId={areaId} refetch={refetch} />
          <ModalDelete modal={modalDelete} areaId={areaId} refetch={refetch} />
        </React.Fragment>
      )}
    </div>
  )
}

export default Table
