import type { TAreaTree } from 'src/contexts/area-tree-context/types'

export const AREA_TREE_MOCK: TAreaTree = {
  id: 1,
  name: 'root',
  parentId: null,
  responsible: {
    id: 1,
    email: 'root@mail.com',
    fullname: 'root user',
  },
  children: [
    {
      id: 2,
      name: 'product design',
      parentId: 1,
      responsible: {
        id: 2,
        email: 'product_design@mail.com',
        fullname: 'product design user',
      },
    },
    {
      id: 3,
      name: 'development',
      parentId: 1,
      responsible: {
        id: 3,
        email: 'development@mail.com',
        fullname: 'development user',
      },
      children: [
        {
          id: 4,
          name: 'frontend',
          parentId: 3,
        },
      ],
    },
  ],
}
