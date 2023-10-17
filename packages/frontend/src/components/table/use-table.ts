import { useCallback, useContext, useMemo, useEffect } from 'react'
import { isEqual } from 'lodash'
import { uuidv4 } from 'src/utils/uuidv4'
import { usePrevious } from 'src/hooks/use-previous'
import { DENSITY_MAP } from './constants'
import { TableContext } from './context'
import { verifyConfig } from './utils'
import { TFilter, TColumn, TColumnType, TableProps, EColumnType, EOperator, EOrder } from './types'

type ReturnType = TableProps

const getMinutesFromTime = (value: string): number => {
  const [hours, minutes] = value.split(':')
  return Number(hours) * 60 + Number(minutes)
}

const getRowValue = (type: TColumnType, row: any, column: TColumn): any => {
  let value
  const { searchValue } = column
  const safeValue = searchValue ? searchValue(row) : row[column.id]
  switch (type) {
    case EColumnType.NUMBER:
      value = Number(safeValue)
      break
    case EColumnType.BOOLEAN:
      value = safeValue
      break
    case EColumnType.TIME:
      value = getMinutesFromTime(safeValue)
      break
    case EColumnType.DATE:
      value = new Date(safeValue).getTime()
      break
    default:
      value = safeValue
      break
  }
  return value
}

const getValues = (type: TColumnType, column: TColumn, row: any, value: any): [a: any, b: any] => {
  let a
  let b
  switch (type) {
    case EColumnType.NUMBER:
      a = getRowValue(type, row, column)
      b = Number(value)
      break
    case EColumnType.BOOLEAN:
      a = getRowValue(type, row, column)
      b = value
      break
    case EColumnType.TIME:
      a = getRowValue(type, row, column)
      b = getMinutesFromTime(value)
      break
    case EColumnType.DATE:
      a = getRowValue(type, row, column)
      b = new Date(value).getTime()
      break
    default:
      a = getRowValue(EColumnType.STRING, row, column)?.toLowerCase()
      b = (value || '').toLowerCase()
      break
  }
  return [a, b]
}

export default function useTable(): ReturnType {
  const tableContext = useContext(TableContext)

  const {
    multiple,
    setMultiple,
    search,
    setSearch,
    ready,
    density,
    setDensity,
    orderBy,
    setOrderBy,
    order,
    setOrder,
    page,
    setPage,
    rowsPerPage,
    setRowsPerPage,
    selected,
    setSelected,
    filters,
    setFilters,
    hiddenColumns,
    setHiddenColumns,
    columnOrder,
    setColumnOrder,
  } = tableContext

  const prevFilters = usePrevious(filters)
  const prevSearch = usePrevious(search)

  const onSort = useCallback(
    (id: string) => {
      const isAsc = orderBy === id && order === EOrder.ASC
      if (id !== '') {
        setOrder(isAsc ? EOrder.DESC : EOrder.ASC)
        setOrderBy(id)
      }
    },
    [order, orderBy, setOrder, setOrderBy]
  )

  const onSelectRow = useCallback(
    (id: string) => {
      const selectedIndex = selected.indexOf(id)

      let newSelected: string[] = []

      if (multiple) {
        if (selectedIndex === -1) {
          newSelected = newSelected.concat(selected, id)
        } else if (selectedIndex === 0) {
          newSelected = newSelected.concat(selected.slice(1))
        } else if (selectedIndex === selected.length - 1) {
          newSelected = newSelected.concat(selected.slice(0, -1))
        } else if (selectedIndex > 0) {
          newSelected = newSelected.concat(
            selected.slice(0, selectedIndex),
            selected.slice(selectedIndex + 1)
          )
        }
      } else {
        if (selectedIndex === -1) {
          newSelected = newSelected.concat(id)
        } else if (selectedIndex === 0) {
          newSelected = newSelected.concat([])
        } else if (selectedIndex > 0) {
          newSelected = newSelected.concat(selected.slice(0, selectedIndex))
        } else {
          newSelected = newSelected.concat(selected.slice(selectedIndex + 1))
        }
        if (newSelected.length > 0) {
          newSelected = newSelected.slice(0, 1)
        }
      }

      setSelected(newSelected)
    },
    [selected, setSelected, multiple]
  )

  const onSelectAllRows = useCallback(
    (checked: boolean, newSelecteds: string[]) => {
      if (checked && multiple) {
        setSelected(newSelecteds)
        return
      }
      setSelected([])
    },
    [setSelected, multiple]
  )

  const onChangePage = useCallback(
    (event: unknown, newPage: number) => {
      setPage(newPage)
    },
    [setPage]
  )

  const onChangeRowsPerPage = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setPage(0)
      setRowsPerPage(parseInt(event.target.value, 10))
    },
    [setPage, setRowsPerPage]
  )

  const createFilter = useCallback(() => {
    const id = uuidv4()
    const newFilter = { id, column: null, operator: null, value: null }
    setFilters((prev) => [...prev, newFilter])
  }, [setFilters])

  const deleteFilter = useCallback(
    (id: string) => {
      setFilters((prev) => prev.filter((item) => item.id !== id))
    },
    [setFilters]
  )

  const updateFilter = useCallback(
    (id: string, filter: TFilter) => {
      setFilters((prev) => prev.map((item) => (item.id === id ? filter : item)))
    },
    [setFilters]
  )

  const filter = useCallback(
    (data: any[]) => {
      if (filters.length === 0) return data
      const filteredData = data.filter((row) =>
        filters.every((f) => {
          const { column, operator, value } = f
          if (column && operator && value !== null && value !== undefined && value !== '') {
            const { type } = column
            const [a, b] = getValues(type, column, row, value)
            switch (operator) {
              case EOperator.EQ:
                return a === b
              case EOperator.NEQ:
                return a !== b
              case EOperator.GT:
                return a > b
              case EOperator.GTE:
                return a >= b
              case EOperator.LT:
                return a < b
              case EOperator.LTE:
                return a <= b
              case EOperator.LIKE:
                return a.includes(b)
              case EOperator.NLIKE:
                return !a.includes(b)
              default:
                return true
            }
          }
          return true
        })
      )

      return filteredData
    },
    [filters]
  )

  const toggleColumn = useCallback(
    (id: string) => {
      setHiddenColumns((prev) => {
        const index = prev.indexOf(id)
        if (index === -1) {
          return [...prev, id]
        }
        return prev.filter((item) => item !== id)
      })
    },
    [setHiddenColumns]
  )

  const showAllColumns = useCallback(() => {
    setHiddenColumns([])
  }, [setHiddenColumns])

  const hideAllColumns = useCallback(
    (columns: string[]) => {
      setHiddenColumns(columns)
    },
    [setHiddenColumns]
  )

  const tableSize = useMemo(() => {
    switch (density.key) {
      case DENSITY_MAP.compact.key:
        return 'small'
      case DENSITY_MAP.comfortable.key:
        return 'medium'
      default:
        return 'medium'
    }
  }, [density]) as 'small' | 'medium'

  const hideColumns = useCallback(
    (columns: TColumn[]) => {
      setHiddenColumns((prev) => {
        const hColumns = columns
          .filter((column) => column.hidden && !prev.includes(column.id))
          .map((column) => column.id)
        return [...prev, ...hColumns]
      })
    },
    [setHiddenColumns]
  )

  const saveConfig = useCallback(
    (id: string, name: string) => {
      const config = {
        filters,
        hiddenColumns,
        density,
        rowsPerPage,
        columnOrder,
      }
      localStorage.setItem(`tableConfig-${id}-${name}`, JSON.stringify(config))
    },
    [filters, hiddenColumns, density, rowsPerPage, columnOrder]
  )

  const loadConfig = useCallback(
    (config: string) => {
      if (config && verifyConfig(config)) {
        const parsedConfig = JSON.parse(config)
        setFilters(parsedConfig.filters)
        setHiddenColumns(parsedConfig.hiddenColumns)
        setDensity(parsedConfig.density)
        setRowsPerPage(parsedConfig.rowsPerPage)
        setColumnOrder(parsedConfig.columnOrder)
      }
    },
    [setFilters, setHiddenColumns, setDensity, setRowsPerPage, setColumnOrder]
  )

  const loadDefaltConfig = useCallback(() => {
    setFilters([])
    setHiddenColumns([])
    setDensity(DENSITY_MAP.comfortable)
    setRowsPerPage(10)
    setColumnOrder([])
  }, [setFilters, setHiddenColumns, setDensity, setRowsPerPage, setColumnOrder])

  useEffect(() => {
    const filteredFilters = filters.filter(
      (f) => f.column && f.operator && f.value !== null && f.value !== undefined && f.value !== ''
    )
    const filteredPrevFilters =
      prevFilters?.filter(
        (f) => f.column && f.operator && f.value !== null && f.value !== undefined && f.value !== ''
      ) || []

    if (!isEqual(filteredFilters, filteredPrevFilters) || search !== prevSearch) {
      setPage(0)
    }
  }, [filters, prevFilters, setPage, search, prevSearch])

  return {
    multiple,
    setMultiple,
    search,
    setSearch,
    ready,
    density,
    order,
    page,
    orderBy,
    rowsPerPage,
    tableSize,
    filters,
    //
    selected,
    onSelectRow,
    onSelectAllRows,
    //
    onSort,
    onChangePage,
    onChangeRowsPerPage,
    //
    setPage,
    setDensity,
    setOrder,
    setOrderBy,
    setSelected,
    setRowsPerPage,
    setFilters,

    filter,
    createFilter,
    deleteFilter,
    updateFilter,

    hiddenColumns,
    setHiddenColumns,
    columnOrder,
    setColumnOrder,
    hideColumns,
    toggleColumn,
    showAllColumns,
    hideAllColumns,
    saveConfig,
    loadConfig,
    loadDefaltConfig,
  }
}
