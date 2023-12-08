import { IArea } from '@adp/shared'
import React, { useMemo } from 'react'
import { useResponsive } from 'src/hooks/use-responsive'
import { useDashboardReportContext } from 'src/contexts/dashboard-report-context'
import { Box, Autocomplete, TextField, Button, Grid } from '@mui/material'
import Iconify from 'src/components/iconify/iconify'

type TArea = Pick<IArea, 'id' | 'name'>

type TProps = {
  areas: TArea[]
}

const DEFAULT_AREA: TArea = { id: 0, name: 'Todas las areas' }

export default function FilterComponent(props: TProps) {
  const { areas } = props

  const {
    selectedAreas,
    selectedInitialDate,
    selectedFinalDate,
    setSelectedAreas,
    setSelectedInitialDate,
    setSelectedFinalDate,
  } = useDashboardReportContext()

  const options = useMemo(() => [DEFAULT_AREA, ...areas], [areas])

  const handleChange = (_: any, newValue: TArea[]) => {
    if (newValue.length === 0 || newValue.find((area) => area.id === 0)) {
      setSelectedAreas([options[0]])
      return
    }
    setSelectedAreas(newValue)
  }

  const smDown = useResponsive('down', 'sm')

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: 2,
      }}
    >
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <Autocomplete
            multiple
            options={options}
            getOptionLabel={(option) => option.name}
            renderInput={(params) => <TextField {...params} label="Areas" />}
            noOptionsText="No hay areas"
            disableClearable
            value={selectedAreas}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12} md={3}>
          <TextField
            fullWidth
            label="Fecha inicial"
            type="month"
            InputLabelProps={{ shrink: true }}
            value={selectedInitialDate}
            onChange={(event) => setSelectedInitialDate(event.target.value)}
          />
        </Grid>
        <Grid item xs={12} md={3}>
          <TextField
            fullWidth
            label="Fecha final"
            type="month"
            InputLabelProps={{ shrink: true }}
            value={selectedFinalDate}
            onChange={(event) => setSelectedFinalDate(event.target.value)}
          />
        </Grid>
      </Grid>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'flex-end',
        }}
      >
        <Button
          fullWidth={smDown}
          variant="contained"
          color="primary"
          startIcon={<Iconify icon="fa-solid:search" />}
        >
          Buscar
        </Button>
      </Box>
    </Box>
  )
}
