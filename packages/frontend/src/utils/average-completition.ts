import { SUCCESS, WARNING, ERROR, GREY } from 'src/theme/palette'

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
