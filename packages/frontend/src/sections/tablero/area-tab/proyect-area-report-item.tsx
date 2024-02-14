import React from 'react'
import { Box, Tooltip } from '@mui/material'
import Iconify from 'src/components/iconify'

type TProps = {
  tooltip: string
  icon: string
  value: number
  size: number
}

const ProyectAreaReportItem = (props: TProps) => {
  const { tooltip, icon, value, size } = props
  return (
    <Tooltip title={tooltip}>
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
    </Tooltip>
  )
}

export default ProyectAreaReportItem
