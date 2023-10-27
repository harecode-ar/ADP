import React from 'react'
import { Tree, TreeNode } from 'react-organizational-chart'
import { useTheme } from '@mui/material/styles'
import { useAreaTreeContext } from 'src/contexts/area-tree-context'
import Node from './node'
import { ListProps, SubListProps, ChartProps } from './types'

export default function Chart({ sx, onEdit, onDelete, onAdd, ...other }: ChartProps) {
  const theme = useTheme()
  const { tree } = useAreaTreeContext()
  const otherProps = {
    onEdit: onEdit ? () => onEdit(tree) : undefined,
    onDelete: onDelete ? () => onDelete(tree) : undefined,
    onAdd: onAdd ? () => onAdd(tree) : undefined,
  }
  return (
    <Tree
      lineWidth="1.5px"
      nodePadding="4px"
      lineBorderRadius="24px"
      lineColor={theme.palette.divider}
      label={<Node sx={sx} node={tree} {...otherProps} />}
      {...other}
    >
      {tree.children?.map((list) => (
        <List
          key={list.name}
          depth={1}
          data={list}
          sx={sx}
          onEdit={onEdit}
          onDelete={onDelete}
          onAdd={onAdd}
        />
      ))}
    </Tree>
  )
}

export function List({ data, depth, sx, onEdit, onDelete, onAdd }: ListProps) {
  const otherProps = {
    onEdit: onEdit ? () => onEdit(data) : undefined,
    onDelete: onDelete ? () => onDelete(data) : undefined,
    onAdd: onAdd ? () => onAdd(data) : undefined,
  }
  return (
    <TreeNode label={<Node sx={sx} node={data} {...otherProps} />}>
      {data.children && !!data.children && (
        <SubList
          data={data.children}
          depth={depth}
          sx={sx}
          onEdit={onEdit}
          onDelete={onDelete}
          onAdd={onAdd}
        />
      )}
    </TreeNode>
  )
}

function SubList({ data, depth, sx, onEdit, onDelete, onAdd }: SubListProps) {
  return (
    <React.Fragment>
      {data.map((list) => (
        <List
          key={list.name}
          data={list}
          depth={depth + 1}
          sx={sx}
          onEdit={onEdit}
          onDelete={onDelete}
          onAdd={onAdd}
        />
      ))}
    </React.Fragment>
  )
}
