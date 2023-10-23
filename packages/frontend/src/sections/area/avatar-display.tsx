import React from 'react';
import { Box, Avatar, Paper, Popover, Typography } from '@mui/material';


function AvatarDisplay() {
  const avatarContainerStyle = {
    display: 'flex',
  };
  const avatarStyle = {
    display: 'flex',
    marginRight: '10px',
  };

  const [anchorEl, setAnchorEl] = React.useState<HTMLElement | null>(null);
  const [popoverMessage, setPopoverMessage] = React.useState<JSX.Element | null>(null); // Estado para el mensaje del popover

  const handlePopoverOpen = (event: React.MouseEvent<HTMLElement>, message: JSX.Element) => {
    setAnchorEl(event.currentTarget);
    setPopoverMessage(message); // Establecer el mensaje del popover al mensaje específico
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);

  return (
    <Paper elevation={3} sx={{ margin: 0, padding: 2, marginBottom: '16px' }}>
      <Typography variant="h6" gutterBottom>
        Staff
      </Typography>
      <Box sx={avatarContainerStyle}>
        <Typography
          aria-owns={open ? 'mouse-over-popover' : undefined}
          aria-haspopup="true"
          onMouseEnter={(e) => handlePopoverOpen(e, <Box>
            <Box>
              <strong>Integrante 1</strong>, Lucas Lezano
            </Box>
            <Box>
              <strong>Cargo :</strong> Manager
            </Box>
            <Box>
              <strong>Telefono :</strong> 22145575
            </Box>

            <Box>
              <strong>Email :</strong> lukitas@gmail.com
            </Box>
            {/* Agrega más elementos aquí */}
          </Box>)}
          onMouseLeave={handlePopoverClose}
        >
          <Avatar alt="Usuario 1" src="/ruta/a/la/imagen-usuario-1.jpg" style={avatarStyle} />
        </Typography>
        <Typography
          aria-owns={open ? 'mouse-over-popover' : undefined}
          aria-haspopup="true"
          onMouseEnter={(e) => handlePopoverOpen(e, <Box>
            <Box>
              <strong>Integrante 2</strong>, Martin facciuto
            </Box>
            <Box>
              <strong>Telefono :</strong> 22145575
            </Box>
            <Box>
              <strong>Email :</strong> martin@gmail.com
            </Box>
            {/* Agrega más elementos aquí */}
          </Box>)}
          onMouseLeave={handlePopoverClose}
        >
          <Avatar alt="Usuario 2" src="/ruta/a/la/imagen-usuario-2.jpg" style={avatarStyle} />
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
        <Typography sx={{ p: 1 }}>{popoverMessage}</Typography> {/* Mostrar el mensaje específico del popover */}
      </Popover>
    </Paper>
  );
}

export default AvatarDisplay;
