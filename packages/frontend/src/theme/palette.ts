import { alpha } from '@mui/material/styles'

// ----------------------------------------------------------------------

export type ColorSchema = 'primary' | 'secondary' | 'info' | 'success' | 'warning' | 'error'

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

export const PRIMARY = { //2
  "lighter": "#ddb1ff",
  "light": "#d897eb",
  "main": "#a93bfe",
  "dark": "#7f2bbe",
  "darker": "#602366",
  contrastText: '#FFFFFF',
}

export const SECONDARY = { //1
  "lighter": "#f2a7c8",
  "light": "#ef7eb4",
  "main": "#f5478f",
  "dark": "#bb36b5",
  "darker": "#82285b",
  contrastText: '#FFFFFF',
}

export const INFO = { //5
  "lighter": "#ccfaf8",
  "light": "#9af4f2",
  "main": "#01e6e3",
  "dark": "#01a6a2",
  "darker": "#004f66",
  contrastText: '#FFFFFF',
}

export const SUCCESS = { //4
  "lighter": "#9ee8d9",
  "light": "#9ed3c9",
  "main": "#0dc7a2",
  "dark": "#0a947b",
  "darker": "#0a4c3e",
  contrastText: '#ffffff',
}

export const WARNING = { //3
  "lighter": "#dcdef7",
  "light": "#959cec",
  "main": "#4e58dc",
  "dark": "#6269ba",
  "darker": "#252d7e",
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
