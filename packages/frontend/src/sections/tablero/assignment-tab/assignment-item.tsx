import { IProject, IStage } from '@adp/shared'
import React, { useMemo } from 'react'
import NextLink from 'next/link'
import { Tooltip, Link, IconButton, Stack, Card } from '@mui/material'
import { paths } from 'src/routes/paths'
import { fDate } from 'src/utils/format-time'
import Label from 'src/components/label'
import Iconify from 'src/components/iconify'
import TextMaxLine from 'src/components/text-max-line'
import { getColorFromAcp, getColorFromPacp } from 'src/utils/average-completition'
import { DEFAULT_PERCENTAGE_ALERT_MARGIN } from 'src/constants'

// ----------------------------------------------------------------------

type TProps = {
  project?: IProject
  stage?: IStage
  subStage?: IStage
}

const colorFromAcpOrPacp = (acp: number | null, pacp: number | null) => {
  if (acp === null) {
    return getColorFromPacp(pacp, DEFAULT_PERCENTAGE_ALERT_MARGIN)
  }
  return getColorFromAcp(acp, DEFAULT_PERCENTAGE_ALERT_MARGIN)
}

export default function AssignmentItem(props: TProps) {
  const { project, stage, subStage } = props

  const { id, name, description, startDate, endDate, progress } = project ||
    stage ||
    subStage || {
      id: 0,
      name: '',
      description: '',
      startDate: '',
      endDate: '',
      progress: 0,
      stateId: 0,
    }

  const assignment = useMemo(() => {
    if (project)
      return {
        title: 'Proyecto',
        color: 'info',
        path: paths.dashboard.project.detail,
        acp: project.acp,
        pacp: project.pacp,
      }
    if (stage)
      return {
        title: 'Etapa',
        color: 'warning',
        path: paths.dashboard.stage.detail,
        acp: stage.acp,
        pacp: stage.pacp,
      }
    if (subStage)
      return {
        title: 'Sub Etapa',
        color: 'success',
        path: paths.dashboard.subStage.detail,
        acp: subStage.acp,
        pacp: subStage.pacp,
      }
    return {
      title: '',
      color: 'default',
      path: '',
    }
  }, [project, stage, subStage])

  if (!project && !stage && !subStage) return null

  return (
    <Stack component={Card} direction="row">
      <Stack
        sx={{
          p: (theme) => theme.spacing(3, 3, 2, 3),
          width: 1,
        }}
      >
        <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ mb: 2 }}>
          <Label variant="soft" color={assignment.color as any}>
            {assignment.title}
          </Label>

          <Tooltip title="Ver detalle">
            <Link component={NextLink} href={assignment.path.replace(':id', String(id))}>
              <IconButton>
                <Iconify icon="mdi:eye" />
              </IconButton>
            </Link>
          </Tooltip>
        </Stack>

        <Stack spacing={1} flexGrow={1}>
          <TextMaxLine variant="subtitle2" line={2}>
            {name}
          </TextMaxLine>

          <Tooltip title={description}>
            <TextMaxLine variant="body2" sx={{ color: 'text.secondary' }}>
              {description}
            </TextMaxLine>
          </Tooltip>
        </Stack>

        <Stack direction="row" alignItems="center" justifyContent="space-between" mt={1}>
          <Stack
            direction="row"
            alignItems="center"
            sx={{
              typography: 'caption',
              color: 'text.disabled',
            }}
          >
            <div
              style={{
                backgroundColor: colorFromAcpOrPacp(
                  assignment.acp ?? null,
                  assignment.pacp ?? null
                ),
                width: '15px',
                height: '15px',
                borderRadius: '50%',
                marginRight: '5px',
              }}
            />
            {progress * 100}%
          </Stack>
          <Stack
            spacing={1.5}
            flexGrow={1}
            direction="row"
            flexWrap="wrap"
            justifyContent="flex-end"
            sx={{
              typography: 'caption',
              color: 'text.disabled',
            }}
          >
            <Stack direction="row" alignItems="center">
              <Iconify icon="clarity:date-line" width={16} sx={{ mr: 0.5 }} />
              {fDate(new Date(startDate))} - {fDate(new Date(endDate))}
            </Stack>
          </Stack>
        </Stack>
      </Stack>
    </Stack>
  )
}
