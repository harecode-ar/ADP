'use client'

import { buildTree } from '@adp/shared'
import React, { useEffect, useMemo } from 'react'
import { Container, Box } from '@mui/material'
import { useSettingsContext } from 'src/components/settings'
import { _mock } from 'src/_mock'
import Scrollbar from 'src/components/scrollbar'
import { useAreaTreeContext } from 'src/contexts/area-tree-context'
import { useQuery } from '@apollo/client'
import { GET_AREAS_TREE } from 'src/graphql/queries'
import { isEqual, cloneDeep } from 'lodash'
import Chart from '../../organigrama/chart/chart'

type TProps = {
  areaId: string
}

export default function OrganigramaView(props: TProps) {
  const { areaId } = props
  const settings = useSettingsContext()
  const { tree: savedTree, setTree } = useAreaTreeContext()
  const { data, loading } = useQuery(GET_AREAS_TREE, {
    variables: {
      areaId: Number(areaId),
    },
  })

  const areas = useMemo(() => {
    if (!data) return []
    return data.areaTree
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

  return (
    <Container maxWidth={settings.themeStretch ? false : 'xl'}>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: 2,
        }}
      >
        {!!tree && (
          <Scrollbar
            sx={{
              maxHeight: 'calc(70vh)',
            }}
          >
            <Chart lineHeight="40px" />
          </Scrollbar>
        )}
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
    </Container>
  )
}
