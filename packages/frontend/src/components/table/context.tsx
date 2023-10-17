import React, { useState, useEffect } from 'react'
import { usePrevious } from 'src/hooks/use-previous'
import { isEqual } from 'lodash'
import { DENSITY_MAP } from './constants'
import { EOrder } from './types'
import type { TDensity, TFilter } from './types'

export type TTableContext = {
  multiple: boolean
  setMultiple: React.Dispatch<React.SetStateAction<boolean>>
  search: string
  setSearch: React.Dispatch<React.SetStateAction<string>>
  ready: boolean
  setReady: React.Dispatch<React.SetStateAction<boolean>>
  density: TDensity
  setDensity: React.Dispatch<React.SetStateAction<TDensity>>
  orderBy: string
  setOrderBy: React.Dispatch<React.SetStateAction<string>>
  order: EOrder
  setOrder: React.Dispatch<React.SetStateAction<EOrder>>
  page: number
  setPage: React.Dispatch<React.SetStateAction<number>>
  rowsPerPage: number
  setRowsPerPage: React.Dispatch<React.SetStateAction<number>>
  selected: string[]
  setSelected: React.Dispatch<React.SetStateAction<string[]>>
  filters: TFilter[]
  setFilters: React.Dispatch<React.SetStateAction<TFilter[]>>
  hiddenColumns: string[]
  setHiddenColumns: React.Dispatch<React.SetStateAction<string[]>>
  columnOrder: string[]
  setColumnOrder: React.Dispatch<React.SetStateAction<string[]>>
}

const DEFAULT_TABLE_VALUES = {
  multiple: true,
  search: '',
  ready: true,
  density: DENSITY_MAP.comfortable,
  orderBy: 'id',
  order: EOrder.ASC,
  page: 0,
  rowsPerPage: 10,
  selected: [],
}

export const TableContext = React.createContext({} as TTableContext)

export const TableContextProvider = ({ children }: any) => {
  const [multiple, setMultiple] = useState<boolean>(DEFAULT_TABLE_VALUES.multiple)
  const [search, setSearch] = useState<string>(DEFAULT_TABLE_VALUES.search)
  const [ready, setReady] = useState<boolean>(DEFAULT_TABLE_VALUES.ready)
  const [density, setDensity] = useState<TDensity>(DEFAULT_TABLE_VALUES.density)
  const [orderBy, setOrderBy] = useState<string>(DEFAULT_TABLE_VALUES.orderBy)
  const [order, setOrder] = useState<EOrder>(DEFAULT_TABLE_VALUES.order)
  const [page, setPage] = useState<number>(DEFAULT_TABLE_VALUES.page)
  const [rowsPerPage, setRowsPerPage] = useState<number>(DEFAULT_TABLE_VALUES.rowsPerPage)
  const [selected, setSelected] = useState<string[]>(DEFAULT_TABLE_VALUES.selected)
  const [filters, setFilters] = useState<TFilter[]>([])
  const [hiddenColumns, setHiddenColumns] = useState<string[]>([])
  const [columnOrder, setColumnOrder] = useState<string[]>([])

  const prevSearch = usePrevious(search)
  const prevFilters = usePrevious(filters)

  useEffect(() => {
    const nonEmptyFilters = filters.filter((filter) => filter.value !== null && filter.value !== "" && filter.operator !== null && filter.column !== null)
    const nonEmptyPrevFilters = prevFilters?.filter((filter) => filter.value !== null && filter.value !== "" && filter.operator !== null && filter.column !== null)
    if (prevSearch !== search || !isEqual(nonEmptyFilters, nonEmptyPrevFilters)) {
      setSelected([])
    }
  }, [search, prevSearch, filters, prevFilters, setSelected])

  const value = React.useMemo(
    () => ({
      multiple,
      setMultiple,
      search,
      setSearch,
      ready,
      setReady,
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
    }),
    [
      multiple,
      search,
      ready,
      density,
      orderBy,
      order,
      page,
      rowsPerPage,
      selected,
      filters,
      hiddenColumns,
      columnOrder,
    ]
  )

  return <TableContext.Provider value={value}>{children}</TableContext.Provider>
}
