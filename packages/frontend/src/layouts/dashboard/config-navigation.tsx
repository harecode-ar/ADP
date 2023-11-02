import { ROLE_MAP } from '@adp/shared/constants'
import { useMemo } from 'react'
// routes
import { paths } from 'src/routes/paths'
// components
import SvgColor from 'src/components/svg-color'

// ----------------------------------------------------------------------

const icon = (name: string) => (
  <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />
  // OR
  // <Iconify icon="fluent:mail-24-filled" />
  // https://icon-sets.iconify.design/solar/
  // https://www.streamlinehq.com/icons
)

const ICONS = {
  job: icon('ic_job'),
  blog: icon('ic_blog'),
  chat: icon('ic_chat'),
  mail: icon('ic_mail'),
  user: icon('ic_user'),
  file: icon('ic_file'),
  lock: icon('ic_lock'),
  tour: icon('ic_tour'),
  order: icon('ic_order'),
  label: icon('ic_label'),
  blank: icon('ic_blank'),
  kanban: icon('ic_kanban'),
  folder: icon('ic_folder'),
  banking: icon('ic_banking'),
  booking: icon('ic_booking'),
  invoice: icon('ic_invoice'),
  product: icon('ic_product'),
  calendar: icon('ic_calendar'),
  disabled: icon('ic_disabled'),
  external: icon('ic_external'),
  menuItem: icon('ic_menu_item'),
  ecommerce: icon('ic_ecommerce'),
  analytics: icon('ic_analytics'),
  dashboard: icon('ic_dashboard'),
}

// ----------------------------------------------------------------------

export type TNavDataItem = {
  title: string
  path: string
  icon: ReturnType<typeof icon>
  roles: string[]
  permissions: string[]
  children?: TNavDataItem[]
}

export type TNavData = {
  subheader: string
  items: TNavDataItem[]
  roles: string[]
  permissions: string[]
}

export function useNavData(): TNavData[] {
  const data = useMemo(
    () =>
      [
        // OVERVIEW
        // ----------------------------------------------------------------------
        {
          subheader: 'overview v5.5.0',
          items: [],
          roles: [ROLE_MAP.ADMIN, ROLE_MAP.USER],
        },
        // MANAGEMENT
        // ----------------------------------------------------------------------
        {
          subheader: 'management',
          items: [
            {
              title: 'Usuarios',
              path: paths.dashboard.user.root,
              icon: ICONS.user,
              children: [{ title: 'Listado', path: paths.dashboard.user.list }],
            },
            {
              title: 'area',
              path: paths.dashboard.area.root,
              icon: ICONS.user,
              children: [{ title: 'organigrama', path: paths.dashboard.area.organigrama }],
            },
            {
              title: 'Proyectos',
              path: paths.dashboard.project.root,
              icon: ICONS.user,
            },
          ],
          roles: [ROLE_MAP.ADMIN, ROLE_MAP.USER],
        },
      ].map(
        (group) =>
          ({
            ...group,
            // @ts-ignore
            permissions: (group.permissions || []) as string[],
            // @ts-ignore
            roles: (group.roles || []) as string[],
            items: group.items.map((item) => ({
              ...item,
              // @ts-ignore
              permissions: (item?.permissions || []) as string[],
              // @ts-ignore
              roles: (item?.roles || []) as string[],
            })),
          }) as TNavData
      ),
    []
  )

  return data
}
