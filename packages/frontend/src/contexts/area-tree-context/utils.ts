import type { TAreaTree } from './types'

// Función para agregar un nodo
export const addNode = (tree: TAreaTree, parentId: number, newNode: TAreaTree): TAreaTree => {
  if (tree.id === parentId) {
    // Si el nodo actual es el padre, agrega el nuevo nodo a sus hijos
    return {
      ...tree,
      children: [...(tree.children || []), newNode],
    }
  }
  if (tree.children) {
    // Si el nodo actual tiene hijos, busca recursivamente en sus hijos
    return {
      ...tree,
      children: tree.children.map((child) => addNode(child, parentId, newNode)),
    }
  }
  // Si no se encuentra el nodo padre, devuelve el árbol sin cambios
  return tree
}

// Función para eliminar un nodo
export const deleteNode = (tree: TAreaTree, nodeId: number): TAreaTree | null => {
  if (tree.id === nodeId) {
    // Si el nodo actual es el que se desea eliminar, devuelve null para eliminarlo
    return null
  }
  if (tree.children) {
    const children = tree.children.map((child) => deleteNode(child, nodeId)).filter(Boolean)
    // Si el nodo actual tiene hijos, busca recursivamente en sus hijos
    return {
      ...tree,
      // @ts-ignore
      children: children.length ? children : undefined,
    }
  }
  // Si no se encuentra el nodo a eliminar, devuelve el árbol sin cambios
  return tree
}
