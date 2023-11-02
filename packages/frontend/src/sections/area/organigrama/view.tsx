'use client'

import React, { useEffect, useMemo } from 'react'
import { Container, Box } from '@mui/material'
import { useSettingsContext } from 'src/components/settings'
import { paths } from 'src/routes/paths'
import { _mock } from 'src/_mock'
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs'
import { useBoolean } from 'src/hooks/use-boolean'
import { useAreaTreeContext } from 'src/contexts/area-tree-context'
import { useQuery } from '@apollo/client'
import { GET_AREAS_FOR_TREE } from 'src/graphql/queries'
import type { TAreaTree } from 'src/contexts/area-tree-context/types'
import { buildTree } from 'src/utils/tree'
import { isEqual, cloneDeep } from 'lodash'
import Chart from './chart'
import DeleteAreaModal from './delete-area-modal'
import CreateAreaModal from './create-area-modal'
import EditAreaModal from './edit-area-modal'

export default function OrganigramaView() {
  const settings = useSettingsContext()
  const { tree: savedTree, setTree, setSelected } = useAreaTreeContext()
  const deleteAreaModal = useBoolean()
  const createAreaModal = useBoolean()
  const editAreaModal = useBoolean()
  const { data, loading, refetch } = useQuery(GET_AREAS_FOR_TREE)

  const areas = useMemo(() => {
    if (!data) return []
    return data.areas
  }, [data])

  const tree = useMemo(() => {
    const trees = buildTree(cloneDeep(areas))
    return trees[0]
  }, [areas])

  useEffect(() => {
    if (tree && !isEqual(tree, savedTree)) {
      setTree(tree)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tree, savedTree])

  const onDelete = (node: TAreaTree) => {
    setSelected(node)
    deleteAreaModal.onTrue()
  }

  const onAdd = (node: TAreaTree) => {
    setSelected(node)
    createAreaModal.onTrue()
  }

  const onEdit = (node: TAreaTree) => {
    setSelected(node)
    editAreaModal.onTrue()
  }

  return (
    <Container maxWidth={settings.themeStretch ? false : 'xl'}>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: 2,
        }}
      >
        <CustomBreadcrumbs
          heading="Organigrama"
          links={[{ name: 'Area', href: paths.dashboard.area.root }, { name: 'Organigrama' }]}
        />
        {!!tree && <Chart lineHeight="40px" onDelete={onDelete} onAdd={onAdd} onEdit={onEdit} />}
        {!tree && !loading && (
          <Box
            sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}
          >
            <h1>No hay areas para mostrar</h1>
          </Box>
        )}
        {loading && (
          <Box
            sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}
          >
            <h1>Cargando...</h1>
          </Box>
        )}
      </Box>
      <DeleteAreaModal modal={deleteAreaModal} />
      {createAreaModal.value && (
        <CreateAreaModal modal={createAreaModal} refetch={refetch} areas={areas} />
      )}
      {editAreaModal.value && (
        <EditAreaModal modal={editAreaModal} refetch={refetch} areas={areas} />
      )}
    </Container>
  )
}
