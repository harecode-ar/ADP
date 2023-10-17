import { Menu, MenuItem } from '@mui/material'
import Iconify from 'src/components/iconify'
import useTable from 'src/components/table/use-table'
import type { TUseMenu } from 'src/hooks/use-menu'
import { DENSITY_MAP } from '../constants'
import type { TDensity } from '../types'

type DensityMenuProps = {
  menu: TUseMenu
}

const DensityMenu = (props: DensityMenuProps) => {
  const { menu } = props

  const { setDensity } = useTable()

  const handleDensityChange = (value: TDensity) => {
    setDensity(value)
    menu.close()
  }

  return (
    <Menu
      keepMounted
      id="simple-menu"
      anchorEl={menu.element}
      onClose={menu.close}
      open={menu.isOpen}
    >
      {Object.entries(DENSITY_MAP).map(([key, value]) => (
        <MenuItem key={key} onClick={() => handleDensityChange(value)}>
          <Iconify icon={value.icon} sx={{ mr: 1 }} />
          {value.label}
        </MenuItem>
      ))}
    </Menu>
  )
}

export default DensityMenu
