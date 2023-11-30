export * from './area'

export enum ECacheKey {
  AREA_TREE = 'AREA_TREE',
}

export interface ICache {
  id: number
  key: ECacheKey
  value: string
  createdAt: string
  updatedAt: string
}
