'use client'

import { m } from 'framer-motion'
import React from 'react'
import { usePathname } from 'src/routes/hooks'
import { IconButton, Box, Tooltip } from '@mui/material'
import Iconify from 'src/components/iconify'
import { varHover } from 'src/components/animate'
import { paths } from 'src/routes/paths'
import { ECustomEvent } from 'src/types'
import { dispatchCustomEvent } from 'src/utils/custom-event'

const EXCLUDE_PATHS = [
  paths[403],
  paths[404],
  paths.auth.forgotPassword,
  paths.auth.login,
  paths.dashboard.project.new,
]
export default function PrintButton() {
  const pathname = usePathname()
  if (EXCLUDE_PATHS.some((p) => pathname.includes(p))) return null

  const print = () => {
    dispatchCustomEvent(ECustomEvent.printScreen)
  }

  return (
    <Box>
      <Tooltip title="Imprimir" arrow>
        <IconButton
          component={m.button}
          whileTap="tap"
          whileHover="hover"
          variants={varHover(1.05)}
          color="default"
          onClick={print}
        >
          <Iconify icon="lets-icons:print-duotone" width={24} />
        </IconButton>
      </Tooltip>
    </Box>
  )
}
