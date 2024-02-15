import React from 'react'
import type { IArea } from '@adp/shared'
import { EColumnType } from 'src/components/table'
import type { TColumn } from 'src/components/table'
import { Box, Tooltip, Typography } from '@mui/material'
import {
  getColorFromAcp,
  getColorFromPacp,
  getTooltipFromAcp,
  getTooltipFromPacp,
} from 'src/utils/average-completition'

type TRow = Pick<IArea, 'id' | 'name' | 'averageCompletition'>

type TArgs = {
  stagePercentageAlertMargin: number
  projectPercentageAlertMargin: number
}

const calculatePercentage = (value: number) => value * 100

export const getColumns = (args: TArgs): TColumn[] => [
  {
    id: 'name',
    label: 'Area',
    type: EColumnType.STRING,
    searchable: true,
    renderCell: (row: TRow) => row.name,
    searchValue: (row: TRow) => row.name,
  },
  {
    id: 'projectAcp',
    label: 'Proyecto ACP',
    type: EColumnType.STRING,
    searchable: true,
    renderCell: (row: TRow) => (
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <Tooltip title={getTooltipFromAcp(row.averageCompletition?.projectAcp || null, 0)}>
          <Box
            sx={{
              backgroundColor: getColorFromAcp(
                row.averageCompletition?.projectAcp || null,
                args.projectPercentageAlertMargin
              ),
              width: 15,
              height: 15,
              borderRadius: '50%',
              marginRight: 2,
            }}
          />
        </Tooltip>
        <Typography>
          {row.averageCompletition?.projectAcp !== null
            ? `${calculatePercentage(
                Number(row.averageCompletition?.projectAcp?.toFixed(2)) || 0
              )}%`
            : '-'}
        </Typography>
      </Box>
    ),
    // renderCell: (row: TRow) => (row.averageCompletition?.projectAcp ?? '-'),
    searchValue: (row: TRow) => row.averageCompletition?.projectAcp ?? '-',
  },
  {
    id: 'projectPacp',
    label: 'Proyecto PACP',
    type: EColumnType.STRING,
    searchable: true,
    renderCell: (row: TRow) => (
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <Tooltip title={getTooltipFromPacp(row.averageCompletition?.projectPacp || null, 0)}>
          <Box
            sx={{
              backgroundColor: getColorFromPacp(
                row.averageCompletition?.projectPacp || null,
                args.projectPercentageAlertMargin
              ),
              width: 15,
              height: 15,
              borderRadius: '50%',
              marginRight: 2,
            }}
          />
        </Tooltip>
        <Typography>
          {row.averageCompletition?.projectPacp !== null
            ? `${calculatePercentage(
                Number(row.averageCompletition?.projectPacp?.toFixed(2)) || 0
              )}%`
            : '-'}
        </Typography>
      </Box>
    ),
    searchValue: (row: TRow) => row.averageCompletition?.projectPacp ?? '-',
  },
  {
    id: 'stageAcp',
    label: 'Etapa ACP',
    type: EColumnType.STRING,
    searchable: true,
    renderCell: (row: TRow) => (
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <Tooltip title={getTooltipFromAcp(row.averageCompletition?.stageAcp || null, 0)}>
          <Box
            sx={{
              backgroundColor: getColorFromAcp(
                row.averageCompletition?.stageAcp || null,
                args.stagePercentageAlertMargin
              ),
              width: 15,
              height: 15,
              borderRadius: '50%',
              marginRight: 2,
            }}
          />
        </Tooltip>
        <Typography>
          {row.averageCompletition?.stageAcp !== null
            ? `${calculatePercentage(Number(row.averageCompletition?.stageAcp?.toFixed(2)) || 0)}%`
            : '-'}
        </Typography>
      </Box>
    ),
    searchValue: (row: TRow) => row.averageCompletition?.stageAcp ?? '-',
  },
  {
    id: 'stagePacp',
    label: 'Etapa PACP',
    type: EColumnType.STRING,
    searchable: true,
    renderCell: (row: TRow) => (
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <Tooltip title={getTooltipFromPacp(row.averageCompletition?.stagePacp || null, 0)}>
          <Box
            sx={{
              backgroundColor: getColorFromPacp(
                row.averageCompletition?.stagePacp || null,
                args.stagePercentageAlertMargin
              ),
              width: 15,
              height: 15,
              borderRadius: '50%',
              marginRight: 2,
            }}
          />
        </Tooltip>
        <Typography>
          {row.averageCompletition?.stagePacp !== null
            ? `${calculatePercentage(Number(row.averageCompletition?.stagePacp?.toFixed(2)) || 0)}%`
            : '-'}
        </Typography>
      </Box>
    ),
    searchValue: (row: TRow) => row.averageCompletition?.stagePacp ?? '-',
  },
]
