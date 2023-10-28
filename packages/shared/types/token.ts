export enum ETokenType {
  NEW_PASSWORD = 'NEW_PASSWORD',
}

export interface IToken {
  id: number
  token: string
  type: ETokenType
  userId: string
  createdAt: string
  updatedAt: string
}
