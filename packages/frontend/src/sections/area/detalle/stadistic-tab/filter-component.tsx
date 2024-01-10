
import React from 'react'
import { useDashboardReportContext } from 'src/contexts/dashboard-report-context'
import { Box, Grid, Card } from '@mui/material'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'

export default function FilterComponent() {

  const {
    selectedInitialDate,
    selectedFinalDate,
    minDate,
    maxDate,
    setSelectedInitialDate,
    setSelectedFinalDate,
  } = useDashboardReportContext()

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
        </Grid>
      </Box>
    </Card>
  )
}
