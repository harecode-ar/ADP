import React from 'react'
import { Box } from '@mui/material'
import { IUser } from '@adp/shared'

type Props = {
  user: IUser
  sx?: any
}

const getColorById = (id: number) => {
  const colors = [
    '#f44336',
    '#e91e63',
    '#9c27b0',
    '#673ab7',
    '#3f51b5',
    '#2196f3',
    '#00bcd4',
    '#009688',
    '#4caf50',
    '#ff9800',
    '#ff5722',
    '#795548',
  ]
  return colors[id % colors.length]
}

const getInitials = (firstname: string, lastname: string) => {
  if (firstname && lastname) {
    return `${firstname[0]}${lastname[0]}`
  }
  return 'UK'
}

const UserIcon = (props: Props) => {
  const { user, sx = {} } = props
  const { id, firstname, lastname } = user
  const initials = getInitials(firstname, lastname)
  const color = getColorById(id || 1)
  return (
    <Box
      sx={{
        width: 30,
        height: 30,
        borderRadius: '50%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        bgcolor: color,
        fontSize: 16,
        ...sx,
      }}
    >
      <p
        style={{
          color: '#fff',
          padding: 0,
          margin: 0,
        }}
      >
        {initials}
      </p>
    </Box>
  )
}

export default UserIcon
