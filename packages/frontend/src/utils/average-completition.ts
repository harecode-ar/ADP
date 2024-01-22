import { SUCCESS, WARNING, ERROR, GREY } from 'src/theme/palette'
import { DEFAULT_PERCENTAGE_ALERT_MARGIN } from 'src/constants'

export const getColorFromAcp = (acp: number | null, percentageAlertMargin: number) => {
  if (acp === null) {
    return GREY[500]
  }

  if (acp <= 0) {
    return SUCCESS.main
  }
  if (percentageAlertMargin >= acp) {
    return WARNING.main
  }
  if (acp > percentageAlertMargin) {
    return ERROR.main
  }

  return GREY[500]
}

export const getColorFromPacp = (pacp: number | null, percentageAlertMargin: number) => {
  if (pacp === null) {
    return GREY[500]
  }

  if (pacp + percentageAlertMargin <= 0) {
    return SUCCESS.main
  }
  if (pacp <= 0 && pacp > -percentageAlertMargin) {
    return WARNING.main
  }
  if (pacp > 0) {
    return ERROR.main
  }

  return GREY[500]
}

export const getTooltipFromAcp = (acp: number | null, percentageAlertMargin: number) => {
  if (acp === null) {
    return 'Aun no ha comenzado'
  }

  if (acp <= 0) {
    return 'Finalizado a tiempo'
  }
  if (percentageAlertMargin >= acp) {
    return 'Finalizado con retraso'
  }
  if (acp > percentageAlertMargin) {
    return 'Finalizado con mucho retraso'
  }

  return ''
}

export const getTooltipFromPacp = (pacp: number | null, percentageAlertMargin: number) => {
  if (pacp === null) {
    return 'Aun no ha comenzado'
  }

  if (pacp + percentageAlertMargin <= 0) {
    return 'Dentro de los plazos previstos'
  }
  if (pacp <= 0 && pacp > -percentageAlertMargin) {
    return 'Por finalizar'
  }
  if (pacp > 0) {
    return 'Fuera de plazo'
  }

  return ''
}

export const getSeverityFromAcp = (acp: number | null) => {
  const severity = getColorFromAcp(acp, DEFAULT_PERCENTAGE_ALERT_MARGIN)
  switch (severity) {
      case SUCCESS.main:
      return 'success'
      case WARNING.main:
      return 'warning'
      case ERROR.main:
      return 'error'
      default:
      return 'info'
  }
}

export const colorFromAcpOrPacp = (acp: number | null, pacp: number | null) => {
  if (acp === null) {
    return getColorFromPacp(pacp, DEFAULT_PERCENTAGE_ALERT_MARGIN)
  }
  return getColorFromAcp(acp, DEFAULT_PERCENTAGE_ALERT_MARGIN)
}

export const getTootipFromAcpOrPacp = (acp: number | null, pacp: number | null) => {
  if (acp === null) {
    return getTooltipFromPacp(pacp, DEFAULT_PERCENTAGE_ALERT_MARGIN)
  }
  return getTooltipFromAcp(acp, DEFAULT_PERCENTAGE_ALERT_MARGIN)
}