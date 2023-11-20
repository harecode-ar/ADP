import React from 'react'
import { Autocomplete, TextField, FormControl, Box } from '@mui/material'
import { VIEW_OPTIONS } from 'src/components/gantt'
import type { TViewOption } from 'src/components/gantt'

type ViewSwitcherProps = {
  viewOption: TViewOption
  handleChangeView: (viewOption: TViewOption) => void
}

export const ViewSwitcher: React.FC<ViewSwitcherProps> = ({ viewOption, handleChangeView }) => {

  const handleViewModeChange = (event: React.ChangeEvent<{}>, option: TViewOption | null) => {
    if (option !== null) {
      handleChangeView(option)
    }
  }

  return (
    <Box className="ViewContainer">
      <FormControl>
        <Autocomplete
          style={{ width: 150, marginBottom: '16px' }}
          options={VIEW_OPTIONS}
          getOptionLabel={(option) => option.label}
          value={viewOption}
          onChange={handleViewModeChange}
          renderInput={(params) => <TextField {...params} label="Mostrar por" />}
          clearIcon={null}
        />
      </FormControl>
    </Box>
  )
}
