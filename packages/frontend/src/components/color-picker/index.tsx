import React from 'react'
import Iconify from 'src/components/iconify/iconify'
import {
  Box,
  TextField,
  Autocomplete,
  FormControl,
} from '@mui/material'

type TValue = {
  label: string
  color: string
}

type TProps = {
  label: string
  value: TValue
  options: TValue[]
  error?: boolean
  helperText?: string
  onChange: (event: any, value: TValue | null) => void
}

const ColorPicker = (props: TProps) => {
  const {
    label,
    value,
    options,
    error,
    helperText,
    onChange,
  } = props
  return (
    <Autocomplete
      fullWidth
      options={options}
      getOptionLabel={(option) => option.label}
      renderOption={(renderProps, option) => (
        <Box component="li" {...renderProps} sx={{
          display: 'flex',
          alignItems: 'center',
          gap: 1,
        }}>
          <Iconify icon="mdi:circle" color={option.color} />
          {option.label}
        </Box>
      )}
      value={value}
      renderInput={(params) => (
        <FormControl fullWidth>
          <TextField
            {...params}
            label={label}
            variant="filled"
            error={error}
            helperText={helperText}
            InputProps={{
              ...params.InputProps,
              startAdornment: (
                <Iconify icon="mdi:circle" color={value.color} />
              )
            }}
          />
        </FormControl>
      )}
      onChange={onChange}
      clearIcon={null}
    />
  )
}

export default ColorPicker