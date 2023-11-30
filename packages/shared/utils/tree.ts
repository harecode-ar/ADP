import type { IArea } from '../types'

function removeEmptyChildren(tree: IArea[]): IArea[] {
  tree.forEach((area) => {
    if (area.children && area.children.length === 0) {
      // Eliminamos la propiedad 'children' si es un array vacío.
      delete area.children
    } else if (area.children && area.children.length > 0) {
      // Si hay hijos, continuamos eliminando 'children' en los hijos.
      removeEmptyChildren(area.children)
    }
  })
  return tree
}

export function buildTree(areas: IArea[]): IArea[] {
  const areaMap = new Map<number, IArea>()

  // Primero, creamos un mapa para acceder a cada área por su ID.
  areas.forEach((area) => {
    area.children = []
    areaMap.set(area.id, area)
  })

  // Luego, organizamos las áreas en una estructura de árbol.
  const tree: IArea[] = []
  areas.forEach((area) => {
    if (area.parentId === null) {
      // Esta área es la raíz del árbol.
      tree.push(area)
    } else {
      // Agregamos esta área como un hijo de su área padre correspondiente.
      const parentArea = areaMap.get(area.parentId)
      if (parentArea && parentArea.children) {
        parentArea.children.push(area)
      }
    }
  })
  return removeEmptyChildren(tree)
}

export function getAreaAncestors(area: IArea): IArea[] {
  const ancestors: IArea[] = []
  if (area.parentId) {
    const parent = area.parentId
    const parentArea = area
    parentArea.id = parent
    ancestors.push(parentArea)
    ancestors.push(...getAreaAncestors(parentArea))
  }
  return ancestors
}

export function getAreaDescendants(area: IArea): IArea[] {
  const descendants: IArea[] = []
  if (area.children) {
    area.children.forEach((child) => {
      descendants.push(child)
      descendants.push(...getAreaDescendants(child))
    })
  }
  return descendants
}

export function getAreaDescendantsIds(area: IArea): number[] {
  const descendants: number[] = []
  if (area.children) {
    area.children.forEach((child) => {
      descendants.push(child.id)
      descendants.push(...getAreaDescendantsIds(child))
    })
  }
  return descendants
}

export function getAreaFromTree(tree: IArea[], id: number): IArea | undefined {
  let area: IArea | undefined
  for (let i = 0; i < tree.length; i += 1) {
    if (area) break
    const { children = [] } = tree[i]
    if (tree[i].id === id) {
      area = tree[i]
    } else if (children.length > 0) {
      area = getAreaFromTree(children, id)
    }
  }
  return area
}
