import React, { useCallback, useEffect, useMemo } from 'react'
import { Table, Checkbox, TableRow, TableBody, TableCell, TableContainer } from '@mui/material'
import Scrollbar from 'src/components/scrollbar'
import {
  useTable,
  getComparator,
  emptyRows,
  TableEmptyRows,
  TableHeadCustom,
  TableSelectedAction,
  TablePaginationCustom,
} from 'src/components/table'
import { exportXLSX } from 'src/utils/xlsx'
import { ECustomEvent } from 'src/types'
import { EColumnType } from '../types'
import type { TColumn } from '../types'

type CustomTableProps = {
  id: string
  checkbox?: boolean
  columns: TColumn[]
  data: any[]
  action?: React.ReactNode
}

const CustomTable = (props: CustomTableProps) => {
  const { id, checkbox = true, data, columns, action } = props

  const {
    multiple,
    search,
    filter,
    density,
    page,
    order,
    orderBy,
    rowsPerPage,
    tableSize,
    selected,
    onSelectRow,
    onSelectAllRows,
    onSort,
    onChangePage,
    onChangeRowsPerPage,
    hiddenColumns,
    columnOrder,
  } = useTable()

  const columnForOrder = useMemo(
    () => columns.find((column) => orderBy === column.id) || null,
    [orderBy, columns]
  )

  const filteredData = useMemo(
    () =>
      applyFilter({
        inputData: data,
        comparator: getComparator(order, orderBy, columnForOrder),
        filter,
        search,
        columns,
      }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [data, order, orderBy, filter, columnForOrder, search]
  )

  const filteredColumns = useMemo(
    () =>
      columnOrder
        .map((columnId) => columns.find((column) => column.id === columnId))
        .filter((column) => column && !hiddenColumns.includes(column.id)) as TColumn[],
    [columns, hiddenColumns, columnOrder]
  )

  const download = useCallback(() => {
    const json = filteredData.map((row: any) =>
      filteredColumns.reduce((acc, column) => {
        const { searchValue, type } = column
        const value = searchValue ? searchValue(row) : row[column.id]
        switch (type) {
          case EColumnType.BOOLEAN:
            return { ...acc, [column.label]: value ? 1 : 0 }
          case EColumnType.ACTIONS:
            return { ...acc }
          default:
            return { ...acc, [column.label]: value }
        }
      }, {})
    )
    exportXLSX(json, 'data')
  }, [filteredData, filteredColumns])

  useEffect(() => {
    const eventName = ECustomEvent.onTableDownload.replace(':id', id) as ECustomEvent
    window.addEventListener(eventName, download)

    return () => {
      window.removeEventListener(eventName, download)
    }
  }, [id, download])

  return (
    <React.Fragment>
      <TableContainer sx={{ position: 'relative', overflow: 'unset' }}>
        {checkbox && (
          <TableSelectedAction
            height={density.value}
            numSelected={selected.length}
            rowCount={filteredData.length}
            onSelectAllRows={(checked) =>
              onSelectAllRows(
                checked,
                filteredData.map((row: any) => row.id)
              )
            }
            action={action}
          />
        )}
        <Scrollbar>
          <Table size={tableSize} sx={{ minWidth: 800 }}>
            <TableHeadCustom
              multiple={multiple}
              checkbox={checkbox}
              order={order}
              orderBy={orderBy}
              headLabel={filteredColumns}
              rowCount={filteredData.length}
              numSelected={selected.length}
              onSort={onSort}
              onSelectAllRows={(checked) =>
                onSelectAllRows(
                  checked,
                  filteredData.map((row: any) => row.id)
                )
              }
            />

            <TableBody>
              {filteredData
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row: any) => (
                  <TableRow
                    hover
                    key={row.id}
                    onClick={() => checkbox && onSelectRow(row.id)}
                    selected={selected.includes(row.id)}
                  >
                    {checkbox && (
                      <TableCell padding="checkbox">
                        <Checkbox checked={selected.includes(row.id)} />
                      </TableCell>
                    )}
                    {filteredColumns.map((column) => (
                      <TableCell key={column.id}>{column.renderCell(row)}</TableCell>
                    ))}
                  </TableRow>
                ))}

              <TableEmptyRows
                height={density.value}
                emptyRows={emptyRows(page, rowsPerPage, filteredData.length)}
              />
            </TableBody>
          </Table>
        </Scrollbar>
      </TableContainer>

      <TablePaginationCustom
        count={filteredData.length}
        page={page}
        rowsPerPage={rowsPerPage}
        onPageChange={onChangePage}
        onRowsPerPageChange={onChangeRowsPerPage}
      />
    </React.Fragment>
  )
}

function applyFilter({
  inputData,
  comparator,
  filter,
  search,
  columns,
}: {
  inputData: any[]
  comparator: (a: any, b: any) => number
  filter: (data: any[]) => any[]
  search: string
  columns: TColumn[]
}) {
  const stabilizedThis = inputData.map((el, index) => [el, index] as const)

  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0])

    if (order !== 0) return order

    return a[1] - b[1]
  })

  inputData = stabilizedThis.map((el) => el[0])

  const filteredData = filter(inputData)

  if (search) {
    return filteredData.filter((row) => {
      const { __typename: _, ...rest } = row
      const columnsSearch = columns.filter((column) => column.searchable)
      if (columnsSearch.length > 0) {
        return columnsSearch.some((column) => {
          const { searchValue, type } = column
          const value = searchValue ? searchValue(row) : row[column.id]
          switch (type) {
            case EColumnType.BOOLEAN:
              return String(value).toLowerCase().includes(search.toLowerCase())
            default:
              return String(value).toLowerCase().includes(search.toLowerCase())
          }
        })
      }
      return Object.values(rest).some((value) =>
        String(value).toLowerCase().includes(search.toLowerCase())
      )
    })
  }

  return filteredData
}

export default CustomTable
