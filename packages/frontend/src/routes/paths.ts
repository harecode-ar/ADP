// ----------------------------------------------------------------------

const ROOTS = {
  AUTH: '/auth',
  DASHBOARD: '/dashboard',
}

// ----------------------------------------------------------------------

export const paths = {
  minimalUI: 'https://mui.com/store/items/minimal-dashboard/',
  // AUTH
  auth: {
    login: `${ROOTS.AUTH}/iniciar-sesion`,
    forgotPassword: `${ROOTS.AUTH}/olvide-mi-clave`,
  },
  // DASHBOARD
  dashboard: {
    root: ROOTS.DASHBOARD,
    user: {
      root: `${ROOTS.DASHBOARD}/usuario`,
      list: `${ROOTS.DASHBOARD}/usuario/listado`,
    },
    area: {
      root: `${ROOTS.DASHBOARD}/area`,
      detalle: `${ROOTS.DASHBOARD}/area/detalle/:id`,
      organigrama: `${ROOTS.DASHBOARD}/area/organigrama`,
    },
    project: {
      root: `${ROOTS.DASHBOARD}/projects`,
    },
  },
}

export default ROOTS
