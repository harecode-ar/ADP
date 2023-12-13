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
  newProjects: number
  inProgressProjects: number
  finishedProjects: number
  canceledProjects: number
  totalProjects: number
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
  const { newProjects, inProgressProjects, finishedProjects, canceledProjects, totalProjects } =
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
            <Row label="Nuevos" value={newProjects} color="info" />
            <Row label="En proceso" value={inProgressProjects} color="warning" />
            <Row label="Finalizados" value={finishedProjects} color="success" />
            <Row label="Cancelados" value={canceledProjects} color="default" />
            <Row label="Totales" value={totalProjects} color="secondary" />
          </TableBody>
        </Table>
      </TableContainer>
    </Card>
  )
}
