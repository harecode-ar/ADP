'use client'

import type { IUser, IRole, IPermission } from '@adp/shared'
import { useState, useEffect, useReducer, useCallback, useMemo } from 'react'
import { useLazyQuery, useMutation } from '@apollo/client'
import { GET_SESSION } from 'src/graphql/queries'
import { LOGIN as LOGIN_MUTATION } from 'src/graphql/mutations'
import { localStorageSetItem, localStorageGetItem } from 'src/utils/storage-available'
import { wait } from 'src/utils/wait'
import { paths } from 'src/routes/paths'
import { useRouter } from 'src/routes/hooks'
import { isEqual } from 'lodash'
import { AuthContext } from './auth-context'
import { setSession } from './utils'
import { ActionMapType, AuthStateType } from '../../types'

enum Types {
  INITIAL = 'INITIAL',
  LOGIN = 'LOGIN',
  LOGOUT = 'LOGOUT',
}

type Payload = {
  [Types.INITIAL]: {
    user: IUser | null
    role: IRole | null
    permissions: IPermission[]
  }
  [Types.LOGIN]: {
    user: IUser
    role: IRole
    permissions: IPermission[]
  }
  [Types.LOGOUT]: undefined
}

type ActionsType = ActionMapType<Payload>[keyof ActionMapType<Payload>]

// ----------------------------------------------------------------------

const initialState: AuthStateType = {
  user: null,
  role: null,
  permissions: [],
  loading: true,
}

const reducer = (state: AuthStateType, action: ActionsType) => {
  if (action.type === Types.INITIAL) {
    return {
      loading: false,
      user: action.payload.user,
      role: action.payload.role,
      permissions: action.payload.permissions,
    }
  }
  if (action.type === Types.LOGIN) {
    return {
      ...state,
      user: action.payload.user,
      role: action.payload.role,
      permissions: action.payload.permissions,
    }
  }
  if (action.type === Types.LOGOUT) {
    return {
      ...state,
      user: null,
      role: null,
      permissions: [],
    }
  }
  return state
}

// ----------------------------------------------------------------------

const STORAGE_KEY = 'accessToken'

type Props = {
  children: React.ReactNode
}

export function AuthProvider({ children }: Props) {
  const [state, dispatch] = useReducer(reducer, initialState)
  const [initialized, setInitialized] = useState(false)
  const router = useRouter()

  // INITIAL
  const [getSession] = useLazyQuery(GET_SESSION)
  // LOGIN
  const [loginMutation] = useMutation(LOGIN_MUTATION)

  const initialize = useCallback(async () => {
    try {
      const accessToken = localStorageGetItem(STORAGE_KEY)

      if (accessToken) {
        setSession(accessToken)

        const response = await getSession()

        if (!response.data.getSession || !!response.error) throw new Error('No hay sesión')

        const { user } = response.data.getSession
        const { role } = user
        const { permissions } = role

        const userWithoutAT = { ...state.user }
        // @ts-ignore
        delete userWithoutAT.accessToken

        if (isEqual(userWithoutAT, user)) return

        dispatch({
          type: Types.INITIAL,
          payload: {
            user: {
              ...user,
              accessToken,
            },
            role,
            permissions,
          },
        })
      } else {
        dispatch({
          type: Types.INITIAL,
          payload: {
            user: null,
            role: null,
            permissions: [],
          },
        })
      }
    } catch {
      setSession(null)
      localStorage.removeItem(STORAGE_KEY)
      dispatch({
        type: Types.INITIAL,
        payload: {
          user: null,
          role: null,
          permissions: [],
        },
      })
    }
  }, [getSession, router, state])

  useEffect(() => {
    if (!initialized) {
      wait(600).then(() => {
        initialize()
        setInitialized(true)
      })
    }
  }, [initialize, initialized])

  useEffect(() => {
    const intervalId = setInterval(() => {
      if (initialized) initialize()
    }, 30000)

    return () => clearInterval(intervalId)
  }, [initialize, initialized])

  // LOGIN
  const login = useCallback(
    async (email: string, password: string) => {
      const response = await loginMutation({
        variables: {
          email,
          password,
        },
      })

      if (!response.data.login) throw new Error('No se pudo iniciar sesión')

      const { token, user } = response.data.login
      const { role } = user
      const { permissions } = role

      setSession(token)
      localStorageSetItem(STORAGE_KEY, token)

      dispatch({
        type: Types.LOGIN,
        payload: {
          user: {
            ...user,
            accessToken: token,
          },
          role,
          permissions,
        },
      })
    },
    [loginMutation]
  )

  // LOGOUT
  const logout = useCallback(async () => {
    setSession(null)
    localStorage.removeItem(STORAGE_KEY)
    dispatch({
      type: Types.LOGOUT,
    })
  }, [])

  // ----------------------------------------------------------------------

  const checkAuthenticated = state.user ? 'authenticated' : 'unauthenticated'

  const status = state.loading ? 'loading' : checkAuthenticated

  const memoizedValue = useMemo(
    () => ({
      user: state.user,
      role: state.role,
      permissions: state.permissions,
      method: 'jwt',
      loading: status === 'loading',
      authenticated: status === 'authenticated',
      unauthenticated: status === 'unauthenticated',
      //
      login,
      logout,
    }),
    [login, logout, state.user, state.role, state.permissions, status]
  )

  return <AuthContext.Provider value={memoizedValue}>{children}</AuthContext.Provider>
}
