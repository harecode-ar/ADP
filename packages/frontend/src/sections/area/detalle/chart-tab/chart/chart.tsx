import React from 'react'
import { Tree, TreeNode } from 'react-organizational-chart'
import { useTheme } from '@mui/material/styles'
import { useAreaTreeContext } from 'src/contexts/area-tree-context'
import Node from './node'
import { ListProps, SubListProps, ChartProps } from './types'

export default function Chart({ sx, ...other }: ChartProps) {
  const theme = useTheme()
  const { tree } = useAreaTreeContext()

  return (
    <Tree
      lineWidth="1.5px"
      nodePadding="4px"
      lineBorderRadius="24px"
      lineColor={theme.palette.divider}
      label={<Node sx={sx} node={tree} />}
      {...other}
    >
      {tree?.children?.map((list) => <List key={list.name} depth={1} data={list} sx={sx} />)}
    </Tree>
  )
}

export function List({ data, depth, sx }: ListProps) {
  return (
    <TreeNode label={<Node sx={sx} node={data} />}>
      {data.children && !!data.children && <SubList data={data.children} depth={depth} sx={sx} />}
    </TreeNode>
  )
}

function SubList({ data, depth, sx }: SubListProps) {
  return (
    <React.Fragment>
      {data.map((list) => (
        <List key={list.name} data={list} depth={depth + 1} sx={sx} />
      ))}
    </React.Fragment>
  )
}
