'use client'

import { m } from 'framer-motion'
import React from 'react'
import { usePathname } from 'src/routes/hooks'
import { IconButton, Box } from '@mui/material'
import Iconify from 'src/components/iconify'
import { varHover } from 'src/components/animate'
import { paths } from 'src/routes/paths'
import { ECustomEvent } from 'src/types'

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
    window.dispatchEvent(new Event(ECustomEvent.printScreen))
  }

  return (
    <Box>
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
    </Box>
  )
}
