// ----------------------------------------------------------------------

const ROOTS = {
  AUTH: '/auth',
  DASHBOARD: '/tablero',
}

// ----------------------------------------------------------------------

export const paths = {
  minimalUI: 'https://mui.com/store/items/minimal-dashboard/',
  '403': '/403',
  '404': '/404',
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
    stage: {
      root: `${ROOTS.DASHBOARD}/etapa`,
      detail: `${ROOTS.DASHBOARD}/etapa/detalle/:id`,
    },
    subStage: {
      root: `${ROOTS.DASHBOARD}/sub-etapa`,
      detail: `${ROOTS.DASHBOARD}/sub-etapa/detalle/:id`,
    },
    configuration: {
      root: `${ROOTS.DASHBOARD}/configuracion`,
    },
  },
}

export default ROOTS
