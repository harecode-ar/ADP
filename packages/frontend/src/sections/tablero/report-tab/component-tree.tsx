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
import { useTheme } from '@mui/material/styles'
import Label from 'src/components/label'

type TProps = {
  newProjects: number
  inProgressProjects: number
  finishedProjects: number
  canceledProjects: number
  totalProjects: number
}

export default function ComponentTree(props: TProps) {
  const { newProjects, inProgressProjects, finishedProjects, canceledProjects, totalProjects } =
    props
  const theme = useTheme()

  return (
    <Card
      sx={{
        width: 300,
        mt: 2,
        mb: { xs: 3, md: 5 },
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
            <TableRow>
              <TableCell>
                <Label color="info" variant="soft">
                  Nuevos
                </Label>
              </TableCell>
              <TableCell align="right">
                <Grid container direction="column" alignItems="center">
                  <Grid item>
                    <Typography variant="body1">{newProjects}</Typography>
                  </Grid>
                </Grid>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <Label color="warning" variant="soft">
                  En proceso
                </Label>
              </TableCell>
              <TableCell align="right">
                <Grid container direction="column" alignItems="center">
                  <Grid item>
                    <Typography variant="body1">{inProgressProjects}</Typography>
                  </Grid>
                </Grid>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell sx={{ color: theme.palette.error.main }}>
                <Label color="error" variant="soft">
                  Cancelados
                </Label>
              </TableCell>
              <TableCell align="right">
                <Grid container direction="column" alignItems="center">
                  <Grid item>
                    <Typography variant="body1">{canceledProjects}</Typography>
                  </Grid>
                </Grid>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell sx={{ color: theme.palette.success.main }}>
                <Label color="primary" variant="soft">
                  Finalizados
                </Label>
              </TableCell>
              <TableCell align="right">
                <Grid container direction="column" alignItems="center">
                  <Grid item>
                    <Typography variant="body1">{finishedProjects}</Typography>
                  </Grid>
                </Grid>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell sx={{ color: theme.palette.success.main }}>
                <Label color="secondary" variant="soft">
                  Totales
                </Label>
              </TableCell>
              <TableCell align="right">
                <Grid container direction="column" alignItems="center">
                  <Grid item>
                    <Typography variant="body1">{totalProjects}</Typography>
                  </Grid>
                </Grid>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </Card>
  )
}
