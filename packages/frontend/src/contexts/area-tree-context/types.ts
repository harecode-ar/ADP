import type { IUser, IArea } from '@adp/shared'
import React from 'react'

export type TAreaTree = Pick<IArea, 'id' | 'name' | 'parentId'> & {
  responsible?: Pick<IUser, 'id' | 'email' | 'fullname' | 'image'>
  children?: TAreaTree[]
}

export type AreaTreeContextProps = {
  tree: TAreaTree
  selected: TAreaTree | null
  setSelected: React.Dispatch<React.SetStateAction<TAreaTree | null>>
  setTree: React.Dispatch<React.SetStateAction<TAreaTree>>
  addNode: (node: TAreaTree) => void
  deleteNode: (node: TAreaTree) => void
}
