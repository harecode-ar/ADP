import { IArea } from '@adp/shared'
import React, { useMemo } from 'react'
import { useDashboardReportContext } from 'src/contexts/dashboard-report-context'
import { Box, Autocomplete, TextField, Grid, Card } from '@mui/material'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'

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
    minDate,
    maxDate,
    setSelectedAreas,
    setSelectedInitialDate,
    setSelectedFinalDate,
  } = useDashboardReportContext()

  const options = useMemo(() => [DEFAULT_AREA, ...areas], [areas])

  const handleChange = (_: any, newValue: TArea[]) => {
    if (newValue.length === 0 || newValue[newValue.length - 1].id === 0) {
      setSelectedAreas([options[0]])
      return
    }
    setSelectedAreas(newValue.filter((area) => area.id !== 0))
  }

  return (
    <Card
      sx={{
        p: 2,
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: 2,
        }}
      >
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <DatePicker
              views={['year', 'month']}
              label="Fecha inicial"
              minDate={minDate ? new Date(minDate) : null}
              maxDate={maxDate ? new Date(maxDate) : null}
              value={selectedInitialDate ? new Date(selectedInitialDate) : null}
              onChange={(newValue) => {
                if (newValue !== null && !Number.isNaN(newValue.getTime())) {
                  setSelectedInitialDate(newValue ? newValue.toISOString().split('T')[0] : null)
                } else {
                  setSelectedInitialDate(null)
                }
              }}
              slotProps={{
                textField: {
                  fullWidth: true,
                  margin: 'none',
                },
              }}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <DatePicker
              views={['year', 'month']}
              label="Fecha final"
              minDate={minDate ? new Date(minDate) : null}
              maxDate={maxDate ? new Date(maxDate) : null}
              value={selectedFinalDate ? new Date(selectedFinalDate) : null}
              onChange={(newValue) => {
                if (newValue !== null && !Number.isNaN(newValue.getTime())) {
                  setSelectedFinalDate(newValue ? newValue.toISOString().split('T')[0] : null)
                } else {
                  setSelectedFinalDate(null)
                }
              }}
              slotProps={{
                textField: {
                  fullWidth: true,
                  margin: 'none',
                },
              }}
            />
          </Grid>
          <Grid item xs={12}>
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
        </Grid>
      </Box>
    </Card>
  )
}
