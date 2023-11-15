'use client'

import * as React from 'react'
import { Avatar, Box, Typography, Card } from '@mui/material'
import { useAuthContext } from 'src/auth/hooks'
import { getStorageFileUrl } from 'src/utils/storage'

// ----------------------------------------------------------------------

export default function UserCard() {
  const { user, role } = useAuthContext()

  return (
    <Card
      sx={{
        backgroundColor: 'background.paper',
        color: 'rgb(33, 43, 54)',
        transition: 'box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1) 0m',
        backgroundImage: 'none',
        overflow: 'hidden',
        position: 'relative',

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
              sx={(theme) => ({ width: 128, height: 128, border: `2px solid ${theme.palette.background.paper}` })}
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
          backgroundColor: 'background.paper',
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
            backgroundColor: 'background.paper',
          }}
        />
      </Box>
    </Card>
  )
}