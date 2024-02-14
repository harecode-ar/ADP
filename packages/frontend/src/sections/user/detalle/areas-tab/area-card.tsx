'use client'

import { IArea, IProjectCountByState, IUser } from '@adp/shared'
import React, { useMemo } from 'react'
import NextLink from 'next/link'
import { Box, Card, Avatar, Typography, Link } from '@mui/material'
import { GET_PROJECT_COUNT_BY_STATE } from 'src/graphql/queries'
import { useQuery } from '@apollo/client'
import { paths } from 'src/routes/paths'
import { getStorageFileUrl } from 'src/utils/storage'
import { getColorFromAcp, getColorFromPacp } from 'src/utils/average-completition'
import { DEFAULT_PERCENTAGE_ALERT_MARGIN } from 'src/constants'
import ProyectAreaReportItem from './proyect-area-report-item'

const colorFromAcpOrPacp = (area: IArea) => {
  if (!area.averageCompletition) return getColorFromAcp(null, DEFAULT_PERCENTAGE_ALERT_MARGIN)
  if (area.averageCompletition.projectAcp === null) {
    return getColorFromPacp(area.averageCompletition.projectPacp, DEFAULT_PERCENTAGE_ALERT_MARGIN)
  }
  return getColorFromAcp(area.averageCompletition.projectAcp, DEFAULT_PERCENTAGE_ALERT_MARGIN)
}

type TProps = {
  area: IArea,
  user: IUser
}

export default function AreaCard({ area, user }: TProps) {
  const { id, name } = area
  const responsible = user

  const { data } = useQuery(GET_PROJECT_COUNT_BY_STATE, {
    variables: {
      areas: [Number(id)],
    },
    skip: !id,
  })

  const report: IProjectCountByState = useMemo(() => {
    if (!data) return { new: 0, inProgress: 0, completed: 0, cancelled: 0 }
    return data.projectCountByState
  }, [data])

  return (
    <Link
      component={NextLink}
      href={paths.dashboard.area.detail.replace(':id', String(id))}
      underline="none"
    >
      <Card
        sx={{
          py: 5,
          display: 'flex',
          position: 'relative',
          alignItems: 'center',
          flexDirection: 'column',
          cursor: 'pointer',
          backgroundColor: 'background.paper',
          height: '100%',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'space-between',
            height: '100%',
          }}
        >
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              flexDirection: 'column',
            }}
          >
            <Box
              sx={{
                marginBottom: 3,
                border: `5px solid ${colorFromAcpOrPacp(area)}`,
                borderRadius: '50%',
                backgroundColor: 'transparent',
                boxShadow: `0 0 20px 0 ${colorFromAcpOrPacp(area)}`,
              }}
            >
              <Avatar
                alt={responsible?.fullname || 'Sin responsable'}
                src={
                  responsible?.image ? getStorageFileUrl(responsible.image) : '/broken-image.jpg'
                }
                sx={{
                  width: 64,
                  height: 64,
                }}
              />
            </Box>

            <Typography
              variant="subtitle1"
              fontSize={20}
              sx={{
                textAlign: 'center',
              }}
            >
              {name}
            </Typography>

            <Typography
              variant="body2"
              sx={{ color: 'text.secondary', mb: 0.5, mt: 0.5 }}
              fontSize={15}
            >
              {responsible?.fullname || 'Sin responsable'}
            </Typography>
          </Box>

          <Box
            sx={{
              display: 'flex',
              gap: 2,
            }}
          >
            <ProyectAreaReportItem icon="entypo:new" value={report.new} size={17} />
            <ProyectAreaReportItem icon="mdi:tools" value={report.inProgress} size={15} />
            <ProyectAreaReportItem
              icon="fluent-mdl2:completed-solid"
              value={report.completed}
              size={15}
            />
            <ProyectAreaReportItem icon="ic:sharp-cancel" value={report.cancelled} size={18} />
          </Box>
        </Box>
      </Card>
    </Link>
  )
}
