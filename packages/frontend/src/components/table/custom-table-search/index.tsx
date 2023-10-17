import React from 'react'
import { Box, TextField } from '@mui/material'
import { debounce } from 'lodash'
import useTable from '../use-table'

const CustomTableSearch = () => {
  const { setSearch } = useTable()

  const debouncedSetSearch = debounce(setSearch, 500)

  return (
    <Box
      sx={{
        p: 2,
        pt: 0,
      }}
    >
      <TextField
        label="Buscar"
        variant="outlined"
        size="small"
        fullWidth
        onChange={(e) => debouncedSetSearch(e.target.value)}
      />
    </Box>
  )
}

export default CustomTableSearch
