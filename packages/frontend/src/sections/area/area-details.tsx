import React from 'react';
import { Typography, Paper } from '@mui/material';


function AreaDetails() {
  // Aquí puedes utilizar la información del área para mostrar los detalles, por ejemplo:
  return (
    <Paper elevation={3} style={{ padding: '16px', marginBottom: '16px' }}>
      <Typography variant="body1" >
        Nombre del área: Area 1
      </Typography>
      <Typography variant="body1">
        Descripción: en producción
      </Typography>
      <Typography variant="body1">
        Staff: en producción
      </Typography>

      {/* Otros datos del área */}
    </Paper>
  );
}

export default AreaDetails;
