const calc = (value: number) => Math.abs(value * 100).toFixed(0)

export const getTooltipFromAcp = (
    acp: number | null,
    percentageAlertMargin: number,
    type: 'project' | 'stage'
    ) => {
    if (acp === null) {
      return `No tiene ${type === 'project' ? 'proyectos finalizados' : 'etapas finalizadas'}`
    }
    if (acp <= 0) {
      return `Se ahorra ${calc(acp)}% del tiempo estipulado para ${type === 'project' ? 'el proyecto' : 'la etapa'}`
    }
    if (percentageAlertMargin >= acp) {
      return `Se excede ${calc(acp)}% del tiempo estipulado para ${type === 'project' ? 'el proyecto' : 'la etapa'}`
    }
    if (acp > percentageAlertMargin) {
      return `Se excede ${calc(acp)}% del tiempo estipulado para ${type === 'project' ? 'el proyecto' : 'la etapa'}`
    }
  
    return ''
  }
  
  export const getTooltipFromPacp = (
    pacp: number | null,
    percentageAlertMargin: number,
    type: 'project' | 'stage'
    ) => {
    if (pacp === null) {
        return `No tiene ${type === 'project' ? 'proyectos' : 'etapas'} en curso`
    }
    if (pacp + percentageAlertMargin <= 0) {
        return `En promedio esta a tiempo con sus ${type === 'project' ? 'proyectos' : 'etapas'}`
    }
    if (pacp <= 0 && pacp > -percentageAlertMargin) {
        return `En promedio se esta excediendo un ${calc(pacp)}% del tiempo estipulado para sus ${type === 'project' ? 'proyectos' : 'etapas'}`
    }
    if (pacp > 0) {
      return `En promedio se esta excediendo un ${calc(pacp)}% del tiempo estipulado para sus ${type === 'project' ? 'proyectos' : 'etapas'}`
    }
  
    return ''
  }