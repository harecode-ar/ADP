import isPlainObject from 'is-plain-obj'

export function extractFiles(value: any, isExtractable: any, path = '') {
  if (!arguments.length) throw new TypeError('Argument 1 `value` is required.')

  if (typeof isExtractable !== 'function')
    throw new TypeError('Argument 2 `isExtractable` must be a function.')

  if (typeof path !== 'string') throw new TypeError('Argument 3 `path` must be a string.')

  const clones = new Map()

  const files = new Map()

  // eslint-disable-next-line
  function recurse(value: any, path: any, recursed: any) {
    if (isExtractable(value)) {
      const filePaths = files.get(value)
      //  eslint-disable-next-line
      filePaths ? filePaths.push(path) : files.set(value, [path])
      return null
    }

    const valueIsList =
      Array.isArray(value) || (typeof FileList !== 'undefined' && value instanceof FileList)
    const valueIsPlainObject = isPlainObject(value)

    if (valueIsList || valueIsPlainObject) {
      let clone = clones.get(value)

      const uncloned = !clone

      if (uncloned) {
        // eslint-disable-next-line
        clone = valueIsList
          ? []
          : // Replicate if the plain object is an `Object` instance.
          value instanceof /** @type {any} */ Object
          ? {}
          : Object.create(null)

        clones.set(value, /** @type {Clone} */ clone)
      }

      if (!recursed.has(value)) {
        const pathPrefix = path ? `${path}.` : ''
        const recursedDeeper = new Set(recursed).add(value)

        if (valueIsList) {
          let index = 0

          // eslint-disable-next-line
          for (const item of value as any[]) {
            // eslint-disable-next-line
            const itemClone = recurse(item, pathPrefix + index++, recursedDeeper)
            if (uncloned) clone.push(itemClone)
          }
        } else {
          // eslint-disable-next-line
          for (const key in value) {
            const propertyClone = recurse(value[key], pathPrefix + key, recursedDeeper)

            if (uncloned) clone[key] = propertyClone
          }
        }
      }

      return clone
    }

    return value
  }

  return {
    clone: recurse(value, path, new Set()),
    files,
  }
}

export function isExtractableFile(value: any) {
  return (
    (typeof File !== 'undefined' && value instanceof File) ||
    (typeof Blob !== 'undefined' && value instanceof Blob)
  )
}
