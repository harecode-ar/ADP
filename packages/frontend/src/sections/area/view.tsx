'use client'

import * as React from 'react';
import { Container, Typography} from '@mui/material'
import { useSettingsContext } from 'src/components/settings'
import { TableContextProvider } from 'src/components/table/context'

import TabContext from '@mui/lab/TabContext'
import TabPanel from '@mui/lab/TabPanel'
import TabList from '@mui/lab/TabList'
import Tab from '@mui/material/Tab'
import Table from './table'
// import AreaOptions from './area-options';
import AreaDetails from './area-details';
import AvatarDisplay from './avatar-display';

// ----------------------------------------------------------------------

export default function AreaView() {
  const settings = useSettingsContext();
  const [value, setValue] = React.useState('1');

  const handleChange = (event:any, newValue:any) => {
    setValue(newValue);
  };

  return (
    <Container maxWidth={settings.themeStretch ? false : 'xl'}>
      <Typography variant="h4" style={{ marginBottom: '20px' }}>Detalle de Area</Typography>
      <TabContext value={value}>
        <TabList onChange={handleChange} aria-label="lab API tabs example">
          <Tab label="Detalles" value="1" />
          <Tab label="Staff" value="2" />
        </TabList>
        <TabPanel value="1" sx={{p: 0}}>
          <AreaDetails />
        </TabPanel>
        <TabPanel value="2" sx={{p: 0}}>
          <AvatarDisplay />
        </TabPanel>
      </TabContext>
      <TableContextProvider>
        <Table />
      </TableContextProvider>
    </Container>
  );
}
