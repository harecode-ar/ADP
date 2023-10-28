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
    area: {
      root: `${ROOTS.DASHBOARD}/area`,
      detalle: `${ROOTS.DASHBOARD}/area/detalle/:id`,
      organigrama: `${ROOTS.DASHBOARD}/area/organigrama`,
    },
  },
}

export default ROOTS
