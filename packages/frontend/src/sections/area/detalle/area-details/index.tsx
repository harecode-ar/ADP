import React, { useMemo } from 'react'
import { Typography, Paper } from '@mui/material'
import List from '@mui/material/List'
import { /* useMutation, */ useQuery } from '@apollo/client'
import { GET_AREA } from 'src/graphql/queries'
import CustomListItem from './custom-list-item'

type TProps = {
  areaId: string
}

export default function AreaDetails(props: TProps) {
  const { areaId } = props

  const { data, loading } = useQuery(GET_AREA, {
    variables: { id: Number(areaId) },
    fetchPolicy: 'network-only',
    skip: !areaId,
  })

  const area = useMemo(() => {
    if (data?.area) return data.area
    return null
  }, [data])

  // Aquí puedes utilizar la información del área para mostrar los detalles, por ejemplo:
  return (
    <Paper elevation={3} style={{ padding: '16px', marginBottom: '16px' }}>
      {loading && (
        <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
          Cargando...
        </Typography>
      )}
      {!!area && (
        <List>
          <CustomListItem title="Nombre del área" value={area.name} />
          <CustomListItem title="Descripción" value={area.description} />
          <CustomListItem title="Responsable" value={area.responsible} />
        </List>
      )}
    </Paper>
  )
}
