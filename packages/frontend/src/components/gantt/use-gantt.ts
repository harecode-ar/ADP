import { useState } from 'react'
import { VIEW_OPTIONS } from './constants'
import type { TViewOption } from './types'

export const useGantt = (defaultOption: TViewOption | undefined = VIEW_OPTIONS[3]) => {
  const [viewOption, setViewOption] = useState<TViewOption>(defaultOption)

  const handleChangeView = (option: TViewOption) => {
    setViewOption(option)
  }

  return {
    viewOption,
    handleChangeView,
  }
}
