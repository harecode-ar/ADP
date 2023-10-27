'use client'

import React, { useState, useMemo, useCallback, createContext, useContext } from 'react'
import type { TAreaTree, AreaTreeContextProps } from './types'
import { addNode as addNodeUtil, deleteNode as deleteNodeUtil } from './utils'

export const AreaTreeContext = createContext({} as AreaTreeContextProps)

export const useAreaTreeContext = () => {
  const context = useContext(AreaTreeContext)

  if (!context) throw new Error('useAreaTreeContext must be use inside AreaTreeProvider')

  return context
}

type TProps = {
  children: React.ReactNode
}

export function AreaTreeProvider({ children }: TProps) {
  const [selected, setSelected] = useState<TAreaTree | null>(null)
  const [tree, setTree] = useState<TAreaTree>({} as TAreaTree)

  const addNode = useCallback(
    (newNode: TAreaTree) => {
      if (!newNode.parentId) return
      const updatedTree = addNodeUtil(tree, newNode.parentId, newNode)
      setTree(updatedTree)
    },
    [tree]
  )

  const deleteNode = useCallback(
    (node: TAreaTree) => {
      if (!node.id || !node.parentId) return
      const updatedTree = deleteNodeUtil(tree, node.id)
      if (updatedTree) setTree(updatedTree)
    },
    [tree]
  )

  const value = useMemo(
    () => ({
      tree,
      selected,
      setSelected,
      setTree,
      addNode,
      deleteNode,
    }),
    [selected, setSelected, tree, setTree, addNode, deleteNode]
  )

  return <AreaTreeContext.Provider value={value}>{children}</AreaTreeContext.Provider>
}
