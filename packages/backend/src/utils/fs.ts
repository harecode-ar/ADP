import fs from 'fs'
import path from 'path'

export const getFilesFromDir = (dir: string): string[] => {
  const files = fs.readdirSync(dir, { withFileTypes: true })
  const withoutFolders = files.filter((file) => file.isFile())
  return withoutFolders.map((file) => path.join(dir, file.name))
}

export const getDirectoriesFromDir = (dir: string): string[] => {
  const directories = fs.readdirSync(dir, { withFileTypes: true })
  return directories
    .filter((directory) => directory.isDirectory())
    .map((directory) => path.join(dir, directory.name))
}

export const getFilesFromDirRecursively = (dir: string): string[] => {
  const files = fs.readdirSync(dir, { withFileTypes: true })
  const directories = files.filter((file) => file.isDirectory())
  const filesFromDir = files
    .filter((file) => file.isFile())
    .map((file) => path.join(dir, file.name))
  const filesFromDirectories = directories.map((directory) =>
    getFilesFromDirRecursively(path.join(dir, directory.name))
  )
  return [...filesFromDir, ...filesFromDirectories.flat()]
}

export const saveFile = (dir: string, data: string): void => {
  try {
    fs.writeFileSync(dir, data)
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(error)
  }
}

export const readFile = (dir: string): string => fs.readFileSync(dir, 'utf8')

export const checkIfFileExists = (dir: string): boolean => {
  const exists = fs.existsSync(dir)
  return exists
}

export const removeFile = (dir: string): void => {
  try {
    fs.unlinkSync(dir)
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(error)
  }
}

export const createDirectory = (dir: string): void => {
  try {
    fs.mkdirSync(dir)
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(error)
  }
}

export const removeDirectory = (dir: string): void => {
  try {
    fs.rmdirSync(dir)
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(error)
  }
}

export const checkIfDirectoryExists = (dir: string): boolean => {
  const exists = fs.existsSync(dir)
  return exists
}
