import React from 'react';
import { Typography, Paper } from '@mui/material';

const nombre = 'Area 1'
const descripcion = 'area de prueba'
const responsable = 'Pablo Kass'

function AreaDetails() {
  // Aquí puedes utilizar la información del área para mostrar los detalles, por ejemplo:
  return (
    <Paper elevation={3} style={{ padding: '16px', marginBottom: '16px' }}>
      <Typography variant="body1" >
        Nombre del área: {nombre}
      </Typography>
      <Typography variant="body1">
        Descripción: {descripcion}
      </Typography>
      <Typography variant="body1">
        Responsable: {responsable}
      </Typography>

      {/* Otros datos del área */}
    </Paper>
  );
}

export default AreaDetails;
