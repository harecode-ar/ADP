import React, { useEffect, useMemo, useState } from 'react'
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd'
import {
  Button,
  Dialog,
  TextField,
  Typography,
  DialogContent,
  Box,
  FormControlLabel,
  Switch,
} from '@mui/material'
import { useBoolean } from 'src/hooks/use-boolean'
import useTable from '../use-table'
import { TColumn } from '../types'

type SaveConfigModalProps = {
  modal: ReturnType<typeof useBoolean>
  columns: TColumn[]
}

const reorder = (list: any[], startIndex: number, endIndex: number) => {
  const result = Array.from(list)
  const [removed] = result.splice(startIndex, 1)
  result.splice(endIndex, 0, removed)
  return result
}

export default function SaveConfigModal(props: SaveConfigModalProps) {
  const { modal, columns } = props
  const {
    hiddenColumns,
    toggleColumn,
    hideAllColumns,
    showAllColumns,
    columnOrder,
    setColumnOrder,
  } = useTable()
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

  const onDragEnd = (result: any) => {
    // dropped outside the list
    if (!result.destination) {
      return
    }
    setColumnOrder((prevColumnOrder) =>
      reorder(prevColumnOrder, result.source.index, result.destination.index)
    )
  }

  useEffect(() => {
    if (columns.length > 0 && columnOrder.length === 0) {
      setColumnOrder(columns.map((column) => column.id))
    }
  }, [columns, columnOrder.length, setColumnOrder])

  const orderedColumns = useMemo(
    () =>
      columnOrder
        .map((id) => columns.find((column) => column.id === id))
        .filter((column) => column !== undefined) as TColumn[],
    [columnOrder, columns]
  )

  return (
    <Dialog open={modal.value} onClose={modal.onFalse}>
      <DialogContent>
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

          <DragDropContext onDragEnd={onDragEnd}>
            <Droppable droppableId="droppable">
              {(p1: any) => (
                <Box
                  sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}
                  {...p1.droppableProps}
                  ref={p1.innerRef}
                >
                  {orderedColumns
                    .filter((column) => column.label.toLowerCase().includes(search))
                    .map((column, index) => (
                      <Draggable key={column.id} draggableId={column.id} index={index}>
                        {(p2: any) => (
                          <FormControlLabel
                            key={column.id}
                            ref={p2.innerRef}
                            {...p2.draggableProps}
                            {...p2.dragHandleProps}
                            label={column.label}
                            control={
                              <Switch
                                checked={!hiddenColumns.includes(column.id)}
                                onChange={() => toggleColumn(column.id)}
                              />
                            }
                          />
                        )}
                      </Draggable>
                    ))}
                  {p1.placeholder}
                </Box>
              )}
            </Droppable>
          </DragDropContext>
          <Box sx={{ mt: 2, display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
            <Button variant="text" color="inherit" size="medium" onClick={handleHideAll}>
              Ocultar todo
            </Button>
            <Button variant="contained" color="primary" size="medium" onClick={handleShowAll}>
              Mostrar todo
            </Button>
          </Box>
        </Box>
      </DialogContent>
    </Dialog>
  )
}
