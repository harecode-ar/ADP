export interface IAverageCompletition {
  id: number
  projectAcp: number | null
  projectPacp: number | null
  stageAcp: number | null
  stagePacp: number | null
}

export interface IAreaAverageCompletition extends IAverageCompletition {
  areaId: number
}

export interface IUserAverageCompletition extends IAverageCompletition {
  userId: number
}
