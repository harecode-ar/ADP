import { Button, Box } from '@mui/material'
import Iconify from 'src/components/iconify'
import { useResponsive } from 'src/hooks/use-responsive'
import { useMenu } from 'src/hooks/use-menu'
import { useBoolean } from 'src/hooks/use-boolean'
import useTable from 'src/components/table/use-table'
import ColumnMenu from './column-menu'
import DensityMenu from './density-menu'
import FilterMenu from './filter-menu'
import ConfigurationMenu from './configuration-menu'
import ColumnModal from './column-modal'
import type { TColumn } from '../types'

type CustomTableToolbarProps = {
  id: string
  columns: TColumn[]
  download?: boolean
  refetch?: () => void
}

const CustomTableToolbar = (props: CustomTableToolbarProps) => {
  const { id, columns, download = false, refetch } = props

  const columnMenu = useMenu(null)
  const filterMenu = useMenu(null)
  const densityMenu = useMenu(null)
  const configurationMenu = useMenu(null)
  const columnModal = useBoolean()

  const { density } = useTable()

  const isMobile = useResponsive('down', 'sm')

  return (
    <Box
      sx={{
        p: 3,
        display: 'flex',
        gap: 2,
        flexDirection: isMobile ? 'column' : 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
      }}
    >
      <Box sx={{ display: 'flex', gap: 2 }}>
        <Button
          variant="text"
          color="inherit"
          size="medium"
          startIcon={<Iconify icon="ic:round-view-column" />}
          onClick={columnModal.onTrue}
        >
          Columnas
        </Button>
        <Button
          variant="text"
          color="inherit"
          size="medium"
          startIcon={<Iconify icon="material-symbols:filter-list-rounded" />}
          onClick={filterMenu.open}
        >
          Filtros
        </Button>
        <Button
          variant="text"
          color="inherit"
          size="medium"
          startIcon={<Iconify icon={density.icon} />}
          onClick={densityMenu.open}
        >
          Densidad
        </Button>
      </Box>
      <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', justifyContent: 'center' }}>
        {refetch && (
          <Button
            variant="text"
            color="inherit"
            size="medium"
            startIcon={<Iconify icon="ic:baseline-refresh" />}
            onClick={() => {
              refetch()
            }}
          >
            Refrescar
          </Button>
        )}
        {download && (
          <Button
            variant="text"
            color="inherit"
            size="medium"
            startIcon={<Iconify icon="ic:baseline-download" />}
            onClick={() => {
              window.dispatchEvent(new CustomEvent(`onDownload-${id}`))
            }}
          >
            Descargar
          </Button>
        )}
        <Button
          variant="text"
          color="inherit"
          size="medium"
          startIcon={<Iconify icon="ic:round-settings" />}
          onClick={configurationMenu.open}
        >
          Configurac&iacute;on
        </Button>
      </Box>
      <ColumnMenu menu={columnMenu} columns={columns} />
      <ColumnModal modal={columnModal} columns={columns} />
      <DensityMenu menu={densityMenu} />
      <FilterMenu menu={filterMenu} columns={columns} isMobile={isMobile} />
      <ConfigurationMenu menu={configurationMenu} id={id} />
    </Box>
  )
}

export default CustomTableToolbar
