import React, { useMemo } from 'react'
import type { TUseMenu } from 'src/hooks/use-menu'
import { useFormik } from 'formik'
import { IconButton, Box, Menu, Autocomplete, TextField } from '@mui/material'
import Iconify from 'src/components/iconify'
import Scrollbar from 'src/components/scrollbar'
import useTable from '../use-table'
import { OPERATOR_TRANSLATE, OPERATOR_BY_COLUMN_TYPE } from '../constants'
import { EColumnType } from '../types'
import type { TColumn, TFilter, TColumnType, TOperator } from '../types'

type FilterMenuProps = {
  isMobile: boolean
  menu: TUseMenu
  columns: TColumn[]
}

type FilterProps = {
  isMobile: boolean
  columns: TColumn[]
  filter: TFilter
}

type FilterValueProps = {
  formik: any
  handleChange: (filter: TFilter) => void
  type: TColumnType
}

type FilterOperatorProps = {
  formik: any
  handleChange: (filter: TFilter) => void
  type: TColumnType
}

const FilterValue = (props: FilterValueProps) => {
  const { formik, handleChange, type } = props
  return (
    <React.Fragment>
      {type === EColumnType.STRING && (
        <TextField
          label="Valor"
          variant="outlined"
          size="small"
          sx={{ width: 150 }}
          value={formik.values.value}
          onChange={(event) => {
            const newValue = event.target.value
            handleChange({ value: newValue } as TFilter)
          }}
        />
      )}
      {type === EColumnType.BOOLEAN && (
        <Autocomplete
          options={[true, false]}
          getOptionLabel={(option) => (option ? 'Si' : 'No')}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Valor"
              variant="outlined"
              size="small"
              sx={{ width: 150 }}
            />
          )}
          value={typeof formik.values.value === 'boolean' ? formik.values.value : null}
          onChange={(_, newValue) => {
            handleChange({ value: newValue } as TFilter)
          }}
        />
      )}
      {type === EColumnType.NUMBER && (
        <TextField
          label="Valor"
          variant="outlined"
          type="number"
          size="small"
          sx={{ width: 150 }}
          value={formik.values.value}
          onChange={(event) => {
            const newValue = event.target.value
            handleChange({ value: newValue } as TFilter)
          }}
        />
      )}
      {type === EColumnType.TIME && (
        <TextField
          label="Valor"
          variant="outlined"
          type="time"
          size="small"
          sx={{ width: 150 }}
          value={formik.values.value || '24:00'}
          onChange={(event) => {
            const newValue = event.target.value
            handleChange({ value: newValue } as TFilter)
          }}
        />
      )}
      {type === EColumnType.DATE && (
        <TextField
          label="Valor"
          variant="outlined"
          type="date"
          size="small"
          sx={{ width: 150 }}
          value={formik.values.value || '0000-00-00'}
          onChange={(event) => {
            const newValue = event.target.value
            handleChange({ value: newValue } as TFilter)
          }}
        />
      )}
    </React.Fragment>
  )
}

const FilterOperator = (props: FilterOperatorProps) => {
  const { formik, handleChange, type } = props
  return (
    <Autocomplete
      options={OPERATOR_BY_COLUMN_TYPE[type]}
      getOptionLabel={(option: TOperator) => OPERATOR_TRANSLATE[option]}
      renderInput={(params) => (
        <TextField {...params} label="Operador" variant="outlined" size="small" />
      )}
      sx={{ width: 150 }}
      value={formik.values.operator}
      onChange={(_, newValue) => {
        handleChange({ operator: newValue } as TFilter)
      }}
      noOptionsText="No hay operadores"
    />
  )
}

const Filter = (props: FilterProps) => {
  const { isMobile, columns, filter } = props
  const { updateFilter, deleteFilter } = useTable()

  const formik = useFormik({
    initialValues: {
      column: filter?.column || null,
      operator: filter?.operator || null,
      value: filter?.value ?? '',
    },
    onSubmit: () => {},
  })

  const handleChange = (updatedFilter: TFilter) => {
    const newFilter = { ...filter, ...updatedFilter } as TFilter
    Object.entries(updatedFilter).forEach(([key, value]) => {
      formik.setFieldValue(key, value)
    })
    updateFilter(filter.id, newFilter)
  }

  const column = useMemo(() => filter.column, [filter.column])

  return (
    <Box sx={{ py: 1, display: 'flex', gap: 1, alignItems: 'center' }}>
      <IconButton
        aria-label="more"
        aria-controls="long-menu"
        aria-haspopup="true"
        onClick={() => deleteFilter(filter.id)}
        sx={{ width: 40, height: 40 }}
      >
        <Iconify icon="clarity:times-line" />
      </IconButton>
      <Box sx={{ display: 'flex', flexDirection: isMobile ? 'column' : 'row', gap: 1 }}>
        <Autocomplete
          options={columns}
          getOptionLabel={(option) => option.label}
          renderInput={(params) => (
            <TextField {...params} label="Columna" variant="outlined" size="small" />
          )}
          sx={{ width: 150 }}
          value={formik.values.column}
          onChange={(_, newValue) => {
            handleChange({ column: newValue, operator: null, value: '' } as TFilter)
          }}
          noOptionsText="No hay columnas"
        />
        <FilterOperator
          formik={formik}
          handleChange={handleChange}
          type={column?.type || EColumnType.STRING}
        />
        <FilterValue
          formik={formik}
          handleChange={handleChange}
          type={column?.type || EColumnType.STRING}
        />
      </Box>
    </Box>
  )
}

const FilterMenu = (props: FilterMenuProps) => {
  const { menu, columns, isMobile } = props

  const { filters, createFilter } = useTable()

  return (
    <Menu
      keepMounted
      id="simple-menu"
      anchorEl={menu.element}
      onClose={menu.close}
      open={menu.isOpen}
    >
      <Scrollbar
        sx={{
          minWidth: isMobile ? 350 : 550,
          maxHeight: '50vh',
        }}
      >
        <Box
          sx={{
            p: 2,
            display: 'flex',
            flexDirection: 'column',
            gap: 2,
            alignItems: 'center',
          }}
        >
          {filters.map((filter) => (
            <React.Fragment key={filter.id}>
              <Filter isMobile={isMobile} columns={columns} filter={filter} />
            </React.Fragment>
          ))}

          <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
            <IconButton
              aria-label="more"
              aria-controls="long-menu"
              aria-haspopup="true"
              onClick={createFilter}
              sx={{ width: 40, height: 40 }}
            >
              <Iconify icon="ic:round-plus" />
            </IconButton>
          </Box>
        </Box>
      </Scrollbar>
    </Menu>
  )
}

export default FilterMenu
