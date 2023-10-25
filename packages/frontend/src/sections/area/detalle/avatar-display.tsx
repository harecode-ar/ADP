import React from 'react'
import { Box, Avatar, Paper, Popover, Typography } from '@mui/material'

function AvatarDisplay() {
  const avatarContainerStyle = {
    display: 'flex',
  }
  const avatarStyle = {
    display: 'flex',
    marginRight: '10px',
  }

  const [anchorEl, setAnchorEl] = React.useState<HTMLElement | null>(null)
  const [popoverMessage, setPopoverMessage] = React.useState<JSX.Element | null>(null) // Estado para el mensaje del popover

  const handlePopoverOpen = (event: React.MouseEvent<HTMLElement>, message: JSX.Element) => {
    setAnchorEl(event.currentTarget)
    setPopoverMessage(message) // Establecer el mensaje del popover al mensaje específico
  }

  const handlePopoverClose = () => {
    setAnchorEl(null)
  }

  const open = Boolean(anchorEl)
  const miembro = 'lucas lezano'
  const miembro2 = 'Martin Facciuto'
  const cargo = 'CEO'
  const cargo2 = 'Manager'
  const telefono = '24444455'
  const telefono2 = '24444455'
  const email = 'lucas@gmail.com'
  const email2 = 'martin@gmail.com'

  return (
    <Paper elevation={3} sx={{ margin: 0, padding: 2, marginBottom: '16px' }}>
      <Typography variant="h6" gutterBottom>
        Staff
      </Typography>
      <Box sx={avatarContainerStyle}>
        <Typography
          aria-owns={open ? 'mouse-over-popover' : undefined}
          aria-haspopup="true"
          onMouseEnter={(e) =>
            handlePopoverOpen(
              e,
              <Box>
                <Box>
                  <Typography variant="body1">
                    <Typography variant="body1" style={{ fontWeight: 'bold', display: 'inline' }}>
                      Integrante 1
                    </Typography>
                    , {miembro}
                  </Typography>
                </Box>
                <Box>
                  <Typography variant="body1">
                    <Typography variant="body1" style={{ fontWeight: 'bold', display: 'inline' }}>
                      Cargo
                    </Typography>
                    , {cargo}
                  </Typography>
                </Box>
                <Box>
                  <Typography variant="body1">
                    <Typography variant="body1" style={{ fontWeight: 'bold', display: 'inline' }}>
                      Telefono
                    </Typography>
                    , {telefono}
                  </Typography>
                </Box>
                <Box>
                  <Typography variant="body1">
                    <Typography variant="body1" style={{ fontWeight: 'bold', display: 'inline' }}>
                      Email
                    </Typography>
                    , {email}
                  </Typography>
                </Box>
                {/* Agrega más elementos aquí */}
              </Box>
            )
          }
          onMouseLeave={handlePopoverClose}
        >
          <Avatar alt="Usuario 1" src="/assets/images/pablocortado.png" style={avatarStyle} />
        </Typography>
        <Typography
          aria-owns={open ? 'mouse-over-popover' : undefined}
          aria-haspopup="true"
          onMouseEnter={(e) =>
            handlePopoverOpen(
              e,
              <Box>
                <Box>
                  <Typography variant="body1">
                    <Typography variant="body1" style={{ fontWeight: 'bold', display: 'inline' }}>
                      Integrante 1
                    </Typography>
                    , {miembro2}
                  </Typography>
                </Box>
                <Box>
                  <Typography variant="body1">
                    <Typography variant="body1" style={{ fontWeight: 'bold', display: 'inline' }}>
                      Cargo
                    </Typography>
                    , {cargo2}
                  </Typography>
                </Box>
                <Box>
                  <Typography variant="body1">
                    <Typography variant="body1" style={{ fontWeight: 'bold', display: 'inline' }}>
                      Telefono
                    </Typography>
                    , {telefono2}
                  </Typography>
                </Box>
                <Box>
                  <Typography variant="body1">
                    <Typography variant="body1" style={{ fontWeight: 'bold', display: 'inline' }}>
                      Email
                    </Typography>
                    , {email2}
                  </Typography>
                </Box>
                {/* Agrega más elementos aquí */}
              </Box>
            )
          }
          onMouseLeave={handlePopoverClose}
        >
          <Avatar alt="Usuario 2" src="/assets/images/MMM.jpg" style={avatarStyle} />
        </Typography>
        {/* Agrega más avatares aquí */}
      </Box>
      <Popover
        id="mouse-over-popover"
        sx={{
          pointerEvents: 'none',
        }}
        open={open}
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        onClose={handlePopoverClose}
        disableRestoreFocus
      >
        <Typography sx={{ p: 1 }}>{popoverMessage}</Typography>{' '}
        {/* Mostrar el mensaje específico del popover */}
      </Popover>
    </Paper>
  )
}

export default AvatarDisplay
