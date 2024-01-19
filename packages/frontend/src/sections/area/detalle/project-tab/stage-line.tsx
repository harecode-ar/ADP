import { IStage } from '@adp/shared'
import React from 'react'
import NextLink from 'next/link'
import { Box, IconButton, Typography, Link, Tooltip } from '@mui/material'
import Iconify from 'src/components/iconify'
import { paths } from 'src/routes/paths'
import { getColorFromAcp, getColorFromPacp, getTooltipFromAcp, getTooltipFromPacp } from 'src/utils/average-completition'
import { DEFAULT_PERCENTAGE_ALERT_MARGIN } from 'src/constants'
import { useResponsive } from 'src/hooks/use-responsive'

type TProps = {
  stage: IStage
}

const colorFromAcpOrPacp = (stag: IStage) => {
  if (stag.acp === null) {
    return getColorFromPacp(stag.pacp, DEFAULT_PERCENTAGE_ALERT_MARGIN)
  }
  return getColorFromAcp(stag.acp, DEFAULT_PERCENTAGE_ALERT_MARGIN)
}

const getTootipFromAcpOrPacp = (acp: number | null, pacp: number | null) => {
  if (acp === null) {
    return getTooltipFromPacp(pacp, DEFAULT_PERCENTAGE_ALERT_MARGIN)
  }
  return getTooltipFromAcp(acp, DEFAULT_PERCENTAGE_ALERT_MARGIN)
}

export default function StageLine(props: TProps) {
  const { stage } = props

  const isMobile = useResponsive('down', 'sm')

  return (
    <Box
      sx={{
        width: '100%',
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        gap: 1,
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 1,
        }}
      >
        <Tooltip
          title={getTootipFromAcpOrPacp(stage.acp ?? null, stage.pacp ?? null)}
        >
          <Box
            sx={{
              height: 15,
              width: 15,
              borderRadius: '50%',
              backgroundColor: colorFromAcpOrPacp(stage),
            }}
          />
        </Tooltip>
        <Typography
          sx={{
            textAlign: 'center',
            flex: isMobile ? 1 : null,
          }}
        >
          {stage.name}
        </Typography>
        <Link
          component={NextLink}
          href={paths.dashboard.stage.detail.replace(':id', String(stage.id))}
        >
          <IconButton size="small">
            <Iconify icon="mdi:eye" width={15} height={15} />
          </IconButton>
        </Link>
      </Box>
      <Box
        sx={(theme) => ({
          width: '100%',
          backgroundColor: theme.palette.mode === 'dark' ? 'grey.700' : 'grey.300',
          height: 25,
          borderRadius: 2,
          position: 'relative',
        })}
      >
        <Box
          sx={{
            width: `${stage.progress * 100}%`,
            backgroundColor: colorFromAcpOrPacp(stage),
            height: 25,
            borderRadius: 2,
            textAlign: 'center',
          }}
        />
        <Box
          sx={{
            width: '100%',
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'center',
            position: 'absolute',
            top: 0,
          }}
        >
          <Typography
            sx={{
              color: 'white',
              fontWeight: 'bold',
              lineHeight: '26px',
              textShadow: '0px 0px 2px rgba(0,0,0,0.5)',
            }}
          >
            {stage.progress * 100}%
          </Typography>
        </Box>
      </Box>
    </Box>
  )
}
