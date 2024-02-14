import React from 'react'
import { Box } from '@mui/material'
import Iconify from 'src/components/iconify'

type TProps = {
  icon: string
  value: number
  size: number
}

const ProyectAreaReportItem = (props: TProps) => {
  const { icon, value, size } = props
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 1,
        color: 'text.secondary',
        mt: 1,
      }}
    >
      <Iconify height={size} width={size} icon={icon} />
      {value}
    </Box>
  )
}

export default ProyectAreaReportItem
