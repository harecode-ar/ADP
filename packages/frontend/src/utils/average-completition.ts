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
