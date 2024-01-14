import { useEffect, useState, useCallback } from 'react'
import { logger } from 'src/utils/logger'

// ----------------------------------------------------------------------

export function useLocalStorage(key: string, initialState: any) {
  const [state, setState] = useState(initialState)

  useEffect(() => {
    const restored = getStorage(key)

    if (restored) {
      setState((prevValue: any) => ({
        ...prevValue,
        ...restored,
      }))
    }
  }, [key])

  const updateState = useCallback(
    (updateValue: any) => {
      setState((prevValue: any) => {
        setStorage(key, {
          ...prevValue,
          ...updateValue,
        })

        return {
          ...prevValue,
          ...updateValue,
        }
      })
    },
    [key]
  )

  const update = useCallback(
    (name: string, updateValue: any) => {
      updateState({
        [name]: updateValue,
      })
    },
    [updateState]
  )

  const reset = useCallback(() => {
    removeStorage(key)
    setState(initialState)
  }, [initialState, key])

  return {
    state,
    update,
    reset,
  }
}

// ----------------------------------------------------------------------

export const getStorage = (key: string) => {
  let value = null

  try {
    const result = window.localStorage.getItem(key)

    if (result) {
      value = JSON.parse(result)
    }
  } catch (error) {
    logger.error(error)
  }

  return value
}

export const setStorage = (key: string, value: any) => {
  try {
    window.localStorage.setItem(key, JSON.stringify(value))
  } catch (error) {
    logger.error(error)
  }
}

export const removeStorage = (key: string) => {
  try {
    window.localStorage.removeItem(key)
  } catch (error) {
    logger.error(error)
  }
}
