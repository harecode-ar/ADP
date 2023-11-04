// ----------------------------------------------------------------------

const ROOTS = {
  AUTH: '/auth',
  DASHBOARD: '/tablero',
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
      detail: `${ROOTS.DASHBOARD}/area/detalle/:id`,
      tree: `${ROOTS.DASHBOARD}/area/organigrama`,
    },
    project: {
      root: `${ROOTS.DASHBOARD}/proyecto`,
      new: `${ROOTS.DASHBOARD}/proyecto/nuevo`,
      list: `${ROOTS.DASHBOARD}/proyecto/listado`,
      detail: `${ROOTS.DASHBOARD}/proyecto/detalle/:id`,
    },
  },
}

export default ROOTS
