import { JSX } from 'react'

export enum EOrder {
  ASC = 'asc',
  DESC = 'desc',
}

export enum EOperator {
  EQ = 'eq',
  NEQ = 'neq',
  GT = 'gt',
  GTE = 'gte',
  LT = 'lt',
  LTE = 'lte',
  LIKE = 'like',
  NLIKE = 'nlike',
}

export enum EColumnType {
  NUMBER = 'number',
  STRING = 'string',
  BOOLEAN = 'boolean',
  SELECT = 'select',
  TIME = 'time',
  DATE = 'date',
  ACTIONS = 'actions',
}

export enum EDensity {
  COMPACT = 'compact',
  COMFORTABLE = 'comfortable',
}

export type TDensity = {
  key: string
  label: string
  icon: string
  value: number
}

export type TColumn = {
  id: string
  label: string
  type: TColumnType
  hidden?: boolean
  searchable?: boolean
  renderCell: (value: any) => JSX.Element
  searchValue?: (value: any) => string
}

export type TOperator = EOperator

export type TColumnType = EColumnType

export type TFilter = {
  id: string
  column: TColumn | null
  operator: TOperator | null
  value: string | null
}

export type TableProps = {
  multiple: boolean
  search: string
  ready: boolean
  density: TDensity
  page: number
  rowsPerPage: number
  order: EOrder
  orderBy: string
  tableSize: 'small' | 'medium'
  filters: TFilter[]
  hiddenColumns: string[]
  toggleColumn: (id: string) => void
  showAllColumns: () => void
  hideAllColumns: (columns: string[]) => void
  hideColumns: (columns: TColumn[]) => void
  columnOrder: string[]
  //
  selected: string[]
  onSelectRow: (id: string) => void
  onSelectAllRows: (checked: boolean, newSelecteds: string[]) => void
  //
  onSort: (id: string) => void
  onChangePage: (event: unknown, newPage: number) => void
  onChangeRowsPerPage: (event: React.ChangeEvent<HTMLInputElement>) => void
  //
  setMultiple: React.Dispatch<React.SetStateAction<boolean>>
  setSearch: React.Dispatch<React.SetStateAction<string>>
  setHiddenColumns: React.Dispatch<React.SetStateAction<string[]>>
  setColumnOrder: React.Dispatch<React.SetStateAction<string[]>>
  setPage: React.Dispatch<React.SetStateAction<number>>
  setDensity: React.Dispatch<React.SetStateAction<TDensity>>
  setOrder: React.Dispatch<React.SetStateAction<EOrder>>
  setOrderBy: React.Dispatch<React.SetStateAction<string>>
  setSelected: React.Dispatch<React.SetStateAction<string[]>>
  setRowsPerPage: React.Dispatch<React.SetStateAction<number>>
  setFilters: React.Dispatch<React.SetStateAction<TFilter[]>>

  createFilter: () => void
  deleteFilter: (id: string) => void
  updateFilter: (id: string, filter: TFilter) => void
  filter: (data: any[]) => any[]
  saveConfig: (id: string, name: string) => void
  loadConfig: (config: string) => void
  loadDefaltConfig: () => void
}
