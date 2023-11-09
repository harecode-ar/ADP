const path = require('path')
const fs = require('fs')
const { execSync } = require('child_process')

const packages = fs.readdirSync(path.join(__dirname, '..'))

const isWindows = process.platform === 'win32'

const removeFolder = (folderPath) => {
  const exist = fs.existsSync(folderPath)
  if (!exist) return
  try {
    if (isWindows) execSync(`rmdir /s /q ${folderPath}`)
    else execSync(`rm -rf ${folderPath}`)
    console.log(`✅ ${folderPath} removed!`)
  } catch (_) {
    console.log(`❌ ${folderPath} not found!`)
  }
}

const removeFile = (filePath) => {
  const exist = fs.existsSync(filePath)
  if (!exist) return
  try {
    if (isWindows) execSync(`del /f ${filePath}`)
    else execSync(`rm -rf ${filePath}`)
    console.log(`✅ ${filePath} removed!`)
  } catch (_) {
    console.log(`❌ ${filePath} not found!`)
  }
}

const init = async () => {
  try {
    const rootPath = path.join(__dirname, '..', '..')
    removeFolder(path.join(rootPath, 'node_modules'))
    removeFile(path.join(rootPath, 'yarn.lock'))
    removeFile(path.join(rootPath, 'yarn-error.log'))

    await Promise.all(
      packages.map(async (proyectPackage) => {
        try {
          const packagePath = path.join(__dirname, '..', proyectPackage)
          removeFolder(path.join(packagePath, 'node_modules'))
          removeFolder(path.join(packagePath, 'dist'))
          removeFolder(path.join(packagePath, 'build'))
          removeFile(path.join(packagePath, 'yarn.lock'))
          removeFile(path.join(packagePath, 'yarn-error.log'))
          removeFolder(path.join(packagePath, '.next'))
          console.log(`🧹 ${proyectPackage} cleaned!`)
          await new Promise((resolve) => setTimeout(resolve, 100))
        } catch (error) {
          console.log(error)
        }
      })
    )
    console.log(`✅ Cleaning completed!`)
    await new Promise((resolve) => setTimeout(resolve, 100))
    process.exit(0)
  } catch (error) {
    console.log(`❌ Cleaning error: ${error}!`)
    await new Promise((resolve) => setTimeout(resolve, 100))
    process.exit(1)
  }
}

init()
