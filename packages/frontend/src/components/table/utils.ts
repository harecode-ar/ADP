// ----------------------------------------------------------------------

import { TColumn, EOrder, EColumnType } from './types'

const getValuesToCompare = (row: any, orderBy: any, column: TColumn) => {
  const { searchValue, type } = column
  let value = row[orderBy]
  if (typeof searchValue === 'function') {
    value = searchValue(row)
  }
  if (type === EColumnType.DATE) {
    return new Date(value).getTime()
  }
  if (type === EColumnType.TIME) {
    const [hours, minutes] = value.split(':')
    return Number(hours) * 60 + Number(minutes)
  }
  return value
}

export function emptyRows(page: number, rowsPerPage: number, arrayLength: number) {
  return page > 0 ? Math.max(0, (1 + page) * rowsPerPage - arrayLength) : 0
}

function descendingComparator<T>(a: T, b: T, orderBy: keyof T, column: TColumn | null) {
  const A = column ? getValuesToCompare(a, orderBy, column) : a[orderBy]
  const B = column ? getValuesToCompare(b, orderBy, column) : b[orderBy]
  if (B < A) {
    return -1
  }
  if (B > A) {
    return 1
  }
  return 0
}

export function getComparator<Key extends keyof any>(
  order: EOrder,
  orderBy: Key,
  column: TColumn | null
): (a: { [key in Key]: number | string }, b: { [key in Key]: number | string }) => number {
  return order === EOrder.DESC
    ? (a, b) => descendingComparator(a, b, orderBy, column)
    : (a, b) => -descendingComparator(a, b, orderBy, column)
}

export const verifyConfig = (config: string): boolean => {
  try {
    const parsedConfig = JSON.parse(config)
    if (
      parsedConfig.filters &&
      parsedConfig.hiddenColumns &&
      parsedConfig.density &&
      parsedConfig.rowsPerPage &&
      parsedConfig.columnOrder
    ) {
      // CHECK FILTERS
      if (
        !Array.isArray(parsedConfig.filters) ||
        parsedConfig.filters.some(
          (f: any) =>
            typeof f !== 'object' ||
            typeof f.id !== 'string' ||
            typeof f.column !== 'object' ||
            typeof f.operator !== 'string' ||
            (f.value !== null && typeof f.value !== 'string') ||
            !f.id ||
            !f.column ||
            !f.operator ||
            f.value === undefined
        )
      ) {
        return false
      }

      // CHECK HIDDEN COLUMNS
      if (
        !Array.isArray(parsedConfig.hiddenColumns) ||
        parsedConfig.hiddenColumns.some((c: any) => typeof c !== 'string')
      ) {
        return false
      }

      // CHECK DENSITY
      if (
        typeof parsedConfig.density !== 'object' ||
        typeof parsedConfig.density.key !== 'string' ||
        typeof parsedConfig.density.label !== 'string' ||
        typeof parsedConfig.density.icon !== 'string' ||
        typeof parsedConfig.density.value !== 'number' ||
        !parsedConfig.density.key ||
        !parsedConfig.density.label ||
        !parsedConfig.density.icon ||
        !parsedConfig.density.value
      ) {
        return false
      }

      // CHECK ROWS PER PAGE
      if (typeof parsedConfig.rowsPerPage !== 'number' || parsedConfig.rowsPerPage < 1) {
        return false
      }

      // CHECK COLUMN ORDER
      if (
        !Array.isArray(parsedConfig.columnOrder) ||
        parsedConfig.columnOrder.some((c: any) => typeof c !== 'string')
      ) {
        return false
      }

      return true
    }
    return false
  } catch (error) {
    return false
  }
}
