import type { IUser, IRole, IPermission } from '@adp/shared/types'
import { LogoutOptions, RedirectLoginOptions, PopupLoginOptions } from '@auth0/auth0-react'

export type ActionMapType<M extends { [index: string]: any }> = {
  [Key in keyof M]: M[Key] extends undefined
    ? {
        type: Key
      }
    : {
        type: Key
        payload: M[Key]
      }
}

export type AuthStateType = {
  status?: string
  loading: boolean
  user: IUser | null
  role: IRole | null
  permissions: IPermission[]
}

// ----------------------------------------------------------------------

type CanRemove = {
  login?: (email: string, password: string) => Promise<void>
  //
  loginWithGoogle?: () => Promise<void>
  loginWithGithub?: () => Promise<void>
  loginWithTwitter?: () => Promise<void>
  //
  loginWithPopup?: (options?: PopupLoginOptions) => Promise<void>
  loginWithRedirect?: (options?: RedirectLoginOptions) => Promise<void>
  //
  confirmRegister?: (email: string, code: string) => Promise<void>
  forgotPassword?: (email: string) => Promise<void>
  resendCodeRegister?: (email: string) => Promise<void>
  newPassword?: (email: string, code: string, password: string) => Promise<void>
}

export type JWTContextType = CanRemove & {
  user: IUser | null
  role: IRole | null
  permissions: IPermission[]
  method: string
  loading: boolean
  authenticated: boolean
  unauthenticated: boolean
  login: (email: string, password: string) => Promise<void>
  logout: () => Promise<void>
}

export type FirebaseContextType = CanRemove & {
  user: IUser | null
  role: IRole | null
  permissions: IPermission[]
  method: string
  loading: boolean
  authenticated: boolean
  unauthenticated: boolean
  logout: () => Promise<void>
  loginWithGoogle: () => Promise<void>
  loginWithGithub: () => Promise<void>
  loginWithTwitter: () => Promise<void>
  forgotPassword?: (email: string) => Promise<void>
  login: (email: string, password: string) => Promise<void>
}

export type AmplifyContextType = CanRemove & {
  user: IUser | null
  role: IRole | null
  permissions: IPermission[]
  method: string
  loading: boolean
  authenticated: boolean
  unauthenticated: boolean
  login: (email: string, password: string) => Promise<unknown>
  logout: () => Promise<unknown>
  confirmRegister: (email: string, code: string) => Promise<void>
  forgotPassword: (email: string) => Promise<void>
  resendCodeRegister: (email: string) => Promise<void>
  newPassword: (email: string, code: string, password: string) => Promise<void>
}

// ----------------------------------------------------------------------

export type Auth0ContextType = CanRemove & {
  user: IUser | null
  role: IRole | null
  permissions: IPermission[]
  method: string
  loading: boolean
  authenticated: boolean
  unauthenticated: boolean
  loginWithPopup: (options?: PopupLoginOptions) => Promise<void>
  loginWithRedirect: (options?: RedirectLoginOptions) => Promise<void>
  logout: (options?: LogoutOptions) => Promise<void>
}
