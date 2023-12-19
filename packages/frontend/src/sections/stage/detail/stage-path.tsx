import { IProject, IStage } from '@adp/shared'
import { Typography, Card, Link } from '@mui/material'
import NextLink from 'next/link'
import Iconify from 'src/components/iconify'
import { paths } from 'src/routes/paths'
import React from 'react'

// ----------------------------------------------------------------------

type Props = {
  project: IProject | null
  stage: IStage | null
  subStage: IStage | null
}

export default function StagePath(props: Props) {
  const { project, stage, subStage } = props
  if (!project) return null

  return (
    <Card
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        p: 2,
        gap: 1,
      }}
    >
      <Link
        component={NextLink}
        href={paths.dashboard.project.detail.replace(':id', String(project.id))}
        sx={{
          color: 'text.primary',
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <Typography variant="caption">{project.name}</Typography>
      </Link>

      {stage && (
        <React.Fragment>
          <Iconify icon="ic:round-greater-than" width={12} />
          <Link
            component={NextLink}
            href={paths.dashboard.stage.detail.replace(':id', String(stage.id))}
            sx={{ color: 'text.primary', display: 'flex', alignItems: 'center' }}
          >
            <Typography variant="caption">{stage.name}</Typography>
          </Link>
        </React.Fragment>
      )}

      {subStage && (
        <React.Fragment>
          <Iconify icon="ic:round-greater-than" width={12} />
          <Link
            component={NextLink}
            href={paths.dashboard.subStage.detail.replace(':id', String(subStage.id))}
            sx={{ color: 'text.primary', display: 'flex', alignItems: 'center' }}
          >
            <Typography variant="caption">{subStage.name}</Typography>
          </Link>
        </React.Fragment>
      )}
    </Card>
  )
}
