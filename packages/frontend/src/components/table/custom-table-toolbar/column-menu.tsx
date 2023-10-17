import { useState } from 'react'
import { Button, Typography, Box, Menu, Switch, FormControlLabel, TextField } from '@mui/material'
import type { TUseMenu } from 'src/hooks/use-menu'
import useTable from 'src/components/table/use-table'

type TColumn = {
  id: string
  label: string
}

type ColumnMenuProps = {
  menu: TUseMenu
  columns: TColumn[]
}

const ColumnMenu = (props: ColumnMenuProps) => {
  const { menu, columns } = props
  const { hiddenColumns, toggleColumn, hideAllColumns, showAllColumns } = useTable()
  const ids = columns.map((column) => column.id)

  const [search, setSearch] = useState('')

  const handleShowAll = () => {
    showAllColumns()
    setSearch('')
  }

  const handleHideAll = () => {
    hideAllColumns(ids)
    setSearch('')
  }

  return (
    <Menu
      keepMounted
      id="simple-menu"
      anchorEl={menu.element}
      onClose={menu.close}
      open={menu.isOpen}
    >
      <Box sx={{ p: 2 }}>
        <Typography variant="h5" component="h1" paragraph>
          Columnas
        </Typography>
        <TextField
          fullWidth
          label="Buscar"
          variant="outlined"
          size="small"
          sx={{ mb: 2 }}
          value={search}
          onChange={(event) => {
            const newValue = event.target.value || ''
            setSearch(newValue.toLowerCase())
          }}
          type="search"
        />

        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
          {columns
            .filter((column) => column.label.toLowerCase().includes(search))
            .map((column) => (
              <FormControlLabel
                key={column.id}
                label={column.label}
                control={
                  <Switch
                    checked={!hiddenColumns.includes(column.id)}
                    onChange={() => toggleColumn(column.id)}
                  />
                }
              />
            ))}
        </Box>
        <Box sx={{ mt: 2, display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
          <Button variant="text" color="inherit" size="medium" onClick={handleHideAll}>
            Ocultar todo
          </Button>
          <Button variant="contained" color="primary" size="medium" onClick={handleShowAll}>
            Mostrar todo
          </Button>
        </Box>
      </Box>
    </Menu>
  )
}

export default ColumnMenu
