import React, { useState } from 'react'
import 'gantt-task-react/dist/index.css'
import { Autocomplete, TextField, FormControl, Box } from '@mui/material'
import { ViewMode } from 'gantt-task-react'

type ViewSwitcherProps = {
  onViewModeChange: (viewMode: ViewMode) => void
}

type ViewOption = {
  label: string
  value: ViewMode
}

const viewOptions = [
  { label: 'Día', value: ViewMode.Day },
  { label: 'Semana', value: ViewMode.Week },
  { label: 'Mes', value: ViewMode.Month },
  { label: 'Año', value: ViewMode.Year },
]

export const ViewSwitcher: React.FC<ViewSwitcherProps> = ({ onViewModeChange }) => {
  const [selectedView, setSelectedView] = useState(viewOptions[3])
  const handleViewModeChange = (event: React.ChangeEvent<{}>, value: ViewOption | null) => {
    if (value !== null) {
      setSelectedView(value)
      onViewModeChange(value.value)
    }
  }

  return (
    <Box className="ViewContainer">
      <FormControl>
        <Autocomplete
          style={{ width: 150, marginBottom: '16px' }}
          options={viewOptions}
          getOptionLabel={(option) => option.label}
          value={selectedView}
          onChange={handleViewModeChange}
          renderInput={(params) => <TextField {...params} label="Mostrar por" />}
          clearIcon={null}
        />
      </FormControl>
    </Box>
  )
}
