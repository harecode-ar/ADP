import type { IUser } from '@adp/shared'
import React from 'react'
import { Autocomplete, TextField, Box } from '@mui/material'
import UserIcon from '../user-icon'

type TUser = Pick<IUser, 'id' | 'fullname'>

type TProps = {
  users: TUser[]
  value: TUser | TUser[] | null
  onChange: (event: any, value: TUser | null) => void
  label: string
  placeholder: string
  variant?: 'standard' | 'filled' | 'outlined'
  multiple?: boolean
  disabled?: boolean
  error?: boolean
  helperText?: string
}

const UserPicker = (props: TProps) => {
  const {
    multiple = false,
    users,
    value,
    onChange,
    label,
    placeholder,
    variant = 'filled',
    disabled = false,
    error,
    helperText,
  } = props
  return (
    <Autocomplete
      multiple={multiple}
      options={users}
      getOptionLabel={(option: any) => option.fullname}
      value={value}
      onChange={(event, newValue) => onChange(event, newValue)}
      renderInput={(params) => (
        <TextField
          {...params}
          variant={variant}
          label={label}
          placeholder={placeholder}
          error={error}
          helperText={helperText}
        />
      )}
      renderOption={(p2: any, option) => (
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 1,
            p: 1,
          }}
          {...p2}
        >
          <UserIcon
            user={option}
            sx={{
              fontSize: 14,
            }}
          />
          {option.fullname}
        </Box>
      )}
      disabled={disabled}
    />
  )
}

export default UserPicker
