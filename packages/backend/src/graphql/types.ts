import type { IUser, IRole, IPermission, ISession } from '@adp/shared'

export type TResolverFunction = (parent?: any, args?: any, context?: IContext) => any

export interface TResolvers {
  Query: {
    [key: string]: TResolverFunction
  }
  Mutation: {
    [key: string]: TResolverFunction
  }

  [key: string]: {
    [key: string]: TResolverFunction
  }
}

export interface IContext {
  user: IUser | null
  role: IRole | null
  permissions: IPermission[]
  session: ISession | null
  userAgent: string | null
  resolvers: TResolvers
}
