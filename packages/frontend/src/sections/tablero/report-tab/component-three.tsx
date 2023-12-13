import React from 'react'

import {
  Card,
  Typography,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material'
import Label, { LabelColor } from 'src/components/label'

type TProps = {
  news: number
  inProgress: number
  completed: number
  cancelled: number
  total: number
}

type TRowProps = {
  label: string
  value: number
  color: LabelColor
}

function Row(props: TRowProps) {
  const { label, value, color } = props
  return (
    <TableRow>
      <TableCell>
        <Label color={color} variant="soft">
          {label}
        </Label>
      </TableCell>
      <TableCell align="right">
        <Grid container direction="column" alignItems="center">
          <Grid item>
            <Typography variant="body1">{value}</Typography>
          </Grid>
        </Grid>
      </TableCell>
    </TableRow>
  )
}

export default function ComponentTree(props: TProps) {
  const { news, inProgress, completed, cancelled, total } =
    props

  return (
    <Card
      sx={{
        width: '100%',
        height: '100%',
      }}
    >
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Estado</TableCell>
              <TableCell align="center">Cantidad de Proyectos</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <Row label="Nuevos" value={news} color="info" />
            <Row label="En proceso" value={inProgress} color="warning" />
            <Row label="Finalizados" value={completed} color="success" />
            <Row label="Cancelados" value={cancelled} color="default" />
            <Row label="Totales" value={total} color="secondary" />
          </TableBody>
        </Table>
      </TableContainer>
    </Card>
  )
}
