'use client'

import { m } from 'framer-motion'
import React from 'react'
import { IconButton, Box } from '@mui/material'
import Iconify from 'src/components/iconify'
import { varHover } from 'src/components/animate'

export default function PrintButton() {

  const print = () => {
    window.dispatchEvent(new Event('printScreen'))
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
