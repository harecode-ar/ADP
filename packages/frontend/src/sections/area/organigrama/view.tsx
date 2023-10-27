'use client'

import React, { useEffect } from 'react'
import { Container, Box } from '@mui/material'
import { useSettingsContext } from 'src/components/settings'
import { paths } from 'src/routes/paths'
import { _mock } from 'src/_mock'
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs'
import { useBoolean } from 'src/hooks/use-boolean'
import { useAreaTreeContext } from 'src/contexts/area-tree-context'
import type { TAreaTree } from 'src/contexts/area-tree-context/types'
import Chart from './chart'
import { AREA_TREE_MOCK } from './mock'
import DeleteAreaModal from './delete-area-modal'

export default function OrganigramaView() {
  const settings = useSettingsContext()
  const { setTree, setSelected, addNode } = useAreaTreeContext()
  const deleteAreaModal = useBoolean()

  useEffect(() => {
    setTree(AREA_TREE_MOCK)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const onDelete = (node: TAreaTree) => {
    setSelected(node)
    deleteAreaModal.onTrue()
    console.info('DELETE', node.name)
  }

  const onAdd = (node: TAreaTree) => {
    setSelected(node)
    const newId = Math.floor(Math.random() * 100000)
    const newNode = {
      id: newId,
      name: `Nueva area: ${newId}`,
      parentId: node.id,
    }
    addNode(newNode)
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
        <Chart lineHeight="40px" onDelete={onDelete} onAdd={onAdd} />
      </Box>
      <DeleteAreaModal modal={deleteAreaModal} />
    </Container>
  )
}
