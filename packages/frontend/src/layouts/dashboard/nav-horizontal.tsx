import { memo } from 'react'
import { useTheme } from '@mui/material/styles'
import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import { bgBlur } from 'src/theme/css'
import { useAuthContext } from 'src/auth/hooks'
import { NavSectionHorizontal } from 'src/components/nav-section'
import { hasRole, hasPermission } from 'src/utils/nav-config'
import { HEADER } from '../config-layout'
import { useNavData } from './config-navigation'
import { HeaderShadow } from '../_common'

// ----------------------------------------------------------------------

function NavHorizontal() {
  const theme = useTheme()

  const { role, permissions } = useAuthContext()

  const navData = useNavData()

  const filteredNavData = navData
    .filter((item) => hasRole(item.roles, role) && hasPermission(item.permissions, permissions))
    .map((item) => ({
      ...item,
      items: item.items.filter(
        (subItem) => hasRole(subItem.roles, role) && hasPermission(subItem.permissions, permissions)
      ),
    }))

  return (
    <AppBar
      component="nav"
      sx={{
        top: HEADER.H_DESKTOP_OFFSET,
      }}
    >
      <Toolbar
        sx={{
          ...bgBlur({
            color: theme.palette.background.default,
          }),
        }}
      >
        <NavSectionHorizontal data={filteredNavData} />
      </Toolbar>

      <HeaderShadow />
    </AppBar>
  )
}

export default memo(NavHorizontal)
