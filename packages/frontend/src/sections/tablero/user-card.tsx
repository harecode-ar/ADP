'use client'

import * as React from 'react'

import { Container, Avatar, Box, Typography, Button } from '@mui/material'
import { useSettingsContext } from 'src/components/settings'
import { useAuthContext } from 'src/auth/hooks'
import Iconify from 'src/components/iconify'
import { getStorageFileUrl } from 'src/utils/storage'

// ----------------------------------------------------------------------

export default function UserCard() {
  const { user, role } = useAuthContext()

  return (
    <Box
      sx={{
        backgroundColor: 'rgb(255, 255, 255)',
        color: 'rgb(33, 43, 54)',
        transition: 'box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1) 0m',
        backgroundImage: 'none',
        overflow: 'hidden',
        position: 'relative',
        boxShadow:
          'rgba(145, 158, 171, 0.2) 0px 0px 2px 0px, rgba(145, 158, 171, 0.12) 0px 12px 24px -4px',
        borderRadius: '16px',
        zIndex: '0',
        height: '290px',
      }}
    >
      <Box
        sx={{
          height: '100%',
          color: 'rgb(255, 255, 255)',
          background:
            'linear-gradient(rgba(0, 75, 80, 0.8), rgba(0, 75, 80, 0.8)) center center / cover no-repeat, url(https://api-prod-minimal-v510.vercel.app/assets/images/cover/cover_4.jpg)',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center center',
        }}
      >
        <Box
          sx={{
            left: ' 24px',
            bottom: '24px',
            zIndex: '10',
            paddingTop: '0px',
            position: 'absolute',
            display: 'flex',
            flexDirection: 'row',
          }}
        >
          {user ? (
            <Avatar
              src={getStorageFileUrl(
                user.image,
                'https://api-dev-minimal-v510.vercel.app/assets/images/avatar/avatar_25.jpg'
              )}
              alt={user.fullname}
              sx={{ width: 128, height: 128, border: '2px solid rgb(255, 255, 255)' }}
            />
          ) : null}
          <Box
            sx={{
              margin: '24px',
              textAlign: 'unset',
            }}
          >
            <Typography sx={{ fontSize: '1.5rem', fontWeight: '700' }}>
              {user?.fullname || 'No tiene nombre'}
            </Typography>
            <Typography
              sx={{
                margin: '4px 0px 0px',
                color: 'inherit',
                display: 'block',
                lineHeight: '1.57143',
                fontSize: '0.875rem',
                fontFamily: '"Public Sans", sans-serif',
                fontWeight: '400',
                opacity: '0.48',
              }}
            >
              {role?.name || 'No tiene rol'}
            </Typography>
          </Box>
        </Box>
      </Box>

      <Box
        sx={{
          overflow: 'hidden',
          minHeight: '48px',
          display: 'flex',
          width: '100%',
          bottom: '0px',
          zIndex: '9',
          position: 'absolute',
          backgroundColor: 'rgb(255, 255, 255)',
        }}
      >
        <Box
          sx={{
            overflow: 'hidden',
            minHeight: '48px',
            display: 'flex',
            justifyContent: 'flex-end',
            width: '100%',
            bottom: '0px',
            zIndex: '9',
            position: 'absolute',
            backgroundColor: 'rgb(255, 255, 255)',
          }}
        >
          <Button>
            <Iconify sx={{ mr: 1 }} icon="ic:baseline-people" />
            Areas
          </Button>
        </Box>
      </Box>
    </Box>
  )
}
