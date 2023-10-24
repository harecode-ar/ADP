import React from 'react';
import { Typography, Paper, Box } from '@mui/material';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import { /* useMutation, */ useQuery } from '@apollo/client'
import { GET_AREA } from 'src/graphql/queries'
import { useTable } from 'src/components/table'

// const nombre = 'Area 1'
// const descripcion = 'area de prueba'
// const responsable = 'Pablo Kass'

function CustomListItem({ title, value }) {
  return (
    <ListItem>
      <ListItemText
        primary={
          <Box>
            <Typography variant="body1" sx={{ display: 'inline' }}>
              {title}:
            </Typography>
            <Typography variant="body1" sx={{ fontWeight: 'bold', display: 'inline',marginLeft: '8px' }}>
              {value}
            </Typography>
          </Box>
        }
      />
    </ListItem>
  );
}

function AreaDetails({ id }) {
  const { data } = useQuery(GET_AREA, {
    variables: { id },
  });

  const areaData = data.area;
  // Aquí puedes utilizar la información del área para mostrar los detalles, por ejemplo:
  return (
    <Paper elevation={3} style={{ padding: '16px', marginBottom: '16px' }}>
      <Typography variant="body1">
        <List>
          <CustomListItem title="Nombre del área" value={areaData.name} />
          <CustomListItem title="Descripción" value={areaData.description} />
          <CustomListItem title="Responsable" value={areaData.responsible} />
        </List>
      </Typography>
    </Paper>
  );
}

export default AreaDetails;
