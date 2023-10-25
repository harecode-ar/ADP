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
    jwt: {
      login: `${ROOTS.AUTH}/jwt/login`,
    },
  },
  // DASHBOARD
  dashboard: {
    root: ROOTS.DASHBOARD,
    areas: `${ROOTS.DASHBOARD}/area`,
    // one: `${ROOTS.DASHBOARD}/area-detalle/:id`,
    two: `${ROOTS.DASHBOARD}/two`,
    three: `${ROOTS.DASHBOARD}/three`,
    group: {
      root: `${ROOTS.DASHBOARD}/group`,
      five: `${ROOTS.DASHBOARD}/group/five`,
      six: `${ROOTS.DASHBOARD}/group/six`,
    },
    area: {
      root: `${ROOTS.DASHBOARD}/area`,
      listado: `${ROOTS.DASHBOARD}/area/listado`,
      detalle: `${ROOTS.DASHBOARD}/area/detalle/:id`,
    },
  },
}

export default ROOTS
