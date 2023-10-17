import React, { useMemo } from 'react'
import { TableRow, TableCell, Skeleton, Stack, Box } from '@mui/material'
import { TDensity, useTable } from 'src/components/table'
import { useResponsive } from 'src/hooks/use-responsive'

type TableRowSkeletonProps = {
  density: TDensity
  size: number
}

const TableRowSkeleton = ({ density, size }: TableRowSkeletonProps) => {
  const isMobile = useResponsive('down', 'sm')
  const isTablet = useResponsive('down', 'md')

  const maxWidth = useMemo(() => {
    if (isMobile) return 330
    if (isTablet) return 600
    return 1250
  }, [isMobile, isTablet])

  return (
    <TableRow>
      <TableCell
        colSpan={12}
        sx={{
          p: 0,
        }}
      >
        <Stack spacing={3} direction="row" alignItems="center">
          <Skeleton
            variant="rectangular"
            width={density.value / 2}
            height={density.value / 2}
            sx={{ borderRadius: 1, flexShrink: 0 }}
          />
          {Array.from({ length: size }).map((_, index) => (
            <Skeleton
              key={index}
              variant="rounded"
              width={maxWidth / size}
              height={density.value / 2}
            />
          ))}
        </Stack>
      </TableCell>
    </TableRow>
  )
}

type CustomTableSkeletonProps = {
  columns?: number
  search?: boolean
}

export default function CustomTableSkeleton(props: CustomTableSkeletonProps) {
  const { columns = 1, search = false } = props
  const { rowsPerPage, density } = useTable()

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 3,
        width: '100%',
      }}
    >
      <Box
        sx={{
          width: '90%',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 3,
          }}
        >
          {Array.from(new Array(3)).map((_, index) => (
            <Box
              key={index}
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 1,
              }}
            >
              <Skeleton
                variant="rectangular"
                width={density.value / 2}
                height={density.value / 2}
                sx={{ borderRadius: 1, flexShrink: 0 }}
              />
              <Skeleton variant="text" width={90} height={density.value / 2} />
            </Box>
          ))}
        </Box>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 3,
          }}
        >
          {Array.from(new Array(3)).map((_, index) => (
            <Box
              key={index}
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 1,
              }}
            >
              <Skeleton
                variant="rectangular"
                width={density.value / 2}
                height={density.value / 2}
                sx={{ borderRadius: 1, flexShrink: 0 }}
              />
              <Skeleton variant="text" width={90} height={density.value / 2} />
            </Box>
          ))}
        </Box>
      </Box>
      {search && (
        <Box
          sx={{
            width: '100%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Skeleton width="90%" variant="rounded" height={density.value / 2} />
        </Box>
      )}
      {Array.from(new Array(rowsPerPage)).map((_, index) => (
        <TableRowSkeleton key={index} density={density} size={columns} />
      ))}
    </Box>
  )
}
