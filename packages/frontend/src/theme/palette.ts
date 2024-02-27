import { alpha } from '@mui/material/styles'

// ----------------------------------------------------------------------

export type ColorSchema = 'primary' | 'secondary' | 'info' | 'success' | 'warning' | 'error' | 'statisticsNew' | 'statisticsOnHold' | 'statisticsInProgress' | 'statisticsCompleted' | 'statisticsCancelled' | 'statisticsTotal'

declare module '@mui/material/styles/createPalette' {
  interface TypeBackground {
    neutral: string
  }
  interface SimplePaletteColorOptions {
    lighter: string
    darker: string
  }
  interface PaletteColor {
    lighter: string
    darker: string
  }
}

// SETUP COLORS

export const GREY = {
  0: '#FFFFFF',
  100: '#F9FAFB',
  200: '#F4F6F8',
  300: '#DFE3E8',
  400: '#C4CDD5',
  500: '#919EAB',
  600: '#637381',
  700: '#454F5B',
  800: '#212B36',
  900: '#161C24',
}

//TODO: revisar si los colores, primary, secondary, info, success y warning no convendría volverlos al color original (el que tenían antes).
export const PRIMARY = { //2 //4
  "lighter": "#ddb0fe",
  "light": "#d996ea",
  "main": "#a63cfc",
  "dark": "#7f2cbe",
  "darker": "#551d7f",
  contrastText: '#FFFFFF',
}

export const SECONDARY = { //1 //5
  "lighter": "#f2a6c6",
  "light": "#ee7eb4",
  "main": "#f3478f",
  "dark": "#ba36b4",
  "darker": "#83295a",
  contrastText: '#FFFFFF',
}

export const INFO = { //5 //1
  "lighter": "#ccfaf9",
  "light": "#9af5f3",
  "main": "#4cc9fe",
  "dark": "#178cbe",
  "darker": "#042d3f",
  contrastText: '#FFFFFF',
}

export const SUCCESS = { //4 //2
  "lighter": "#b7f9ec",
  "light": "#9dd4c9",
  "main": "#03c7a0",
  "dark": "#09957a",
  "darker": "#094c3f",
  contrastText: '#ffffff',
}

export const WARNING = { //3 //3
  "lighter": "#dcdef8",
  "light": "#959beb",
  "main": "#4d57da",
  "dark": "#6369bb",
  "darker": "#242e7e",
  contrastText: GREY[800],
}

export const ERROR = {
  lighter: '#FFE9D5',
  light: '#FFAC82',
  main: '#FF5630',
  dark: '#B71D18',
  darker: '#7A0916',
  contrastText: '#FFFFFF',
}

export const STATISTICSNEW = {
  "lighter": "#ccfaf9",
  "light": "#9af5f3",
  "main": "#4cc9fe",
  "dark": "#178cbe",
  "darker": "#042d3f",
  contrastText: '#061B64',
}

export const STATISTICSONHOLD = {
  "lighter": "#ddb0fe",
  "light": "#d996ea",
  "main": "#a63cfc",
  "dark": "#7f2cbe",
  "darker": "#551d7f",
  contrastText: '#FFFFFF',
}

export const STATISTICSPROGRESS = {
  "lighter": "#dcdef8",
  "light": "#959beb",
  "main": "#4d57da",
  "dark": "#6369bb",
  "darker": "#242e7e",
  contrastText: '#FFFFFF',
}

export const STATISTICSCOMPLETED = {
  "lighter": "#b7f9ec",
  "light": "#9dd4c9",
  "main": "#03c7a0",
  "dark": "#09957a",
  "darker": "#094c3f",
  contrastText: '#FFFFFF',
}

export const STATISTICSCANCELLED = {
  "lighter": "#f2a6c6",
  "light": "#ee7eb4",
  "main": "#f3478f",
  "dark": "#ba36b4",
  "darker": "#83295a",
  contrastText: '#FFFFFF',
}

export const STATISTICSTOTAL = {
  lighter: '#ddb0fe',
  light: '#ddb0fe',
  main: '#ddb0fe',
  dark: '#ddb0fe',
  darker: '#ddb0fe',
  contrastText: '#551d7f',
}



export const COMMON = {
  common: {
    black: '#000000',
    white: '#FFFFFF',
  },
  primary: PRIMARY,
  secondary: SECONDARY,
  info: INFO,
  success: SUCCESS,
  warning: WARNING,
  error: ERROR,
  grey: GREY,
  statisticsNew: STATISTICSNEW,
  statisticsOnHold: STATISTICSONHOLD,
  statisticsInProgress: STATISTICSPROGRESS,
  statisticsCompleted: STATISTICSCOMPLETED,
  statisticsCancelled: STATISTICSCANCELLED,
  statisticsTotal: STATISTICSTOTAL,
  divider: alpha(GREY[500], 0.2),
  action: {
    hover: alpha(GREY[500], 0.08),
    selected: alpha(GREY[500], 0.16),
    disabled: alpha(GREY[500], 0.8),
    disabledBackground: alpha(GREY[500], 0.24),
    focus: alpha(GREY[500], 0.24),
    hoverOpacity: 0.08,
    disabledOpacity: 0.48,
  },
}

export function palette(mode: 'light' | 'dark') {
  const light = {
    ...COMMON,
    mode: 'light',
    text: {
      primary: GREY[800],
      secondary: GREY[600],
      disabled: GREY[500],
    },
    background: {
      paper: '#FFFFFF',
      default: '#FFFFFF',
      neutral: GREY[200],
    },
    action: {
      ...COMMON.action,
      active: GREY[600],
    },
  }

  const dark = {
    ...COMMON,
    mode: 'dark',
    text: {
      primary: '#FFFFFF',
      secondary: GREY[500],
      disabled: GREY[600],
    },
    background: {
      paper: GREY[800],
      default: GREY[900],
      neutral: alpha(GREY[500], 0.12),
    },
    action: {
      ...COMMON.action,
      active: GREY[500],
    },
  }

  return mode === 'light' ? light : dark
}
