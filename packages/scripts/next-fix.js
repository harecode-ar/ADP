const path = require('node:path')
const fs = require('fs/promises')

const baseDir = process.cwd()

const nextFix = async () => {
  try {
    const file = path.join(baseDir, '..', '..', 'node_modules', 'next/dist/server/require-hook.js')
    const content = await fs.readFile(file, 'utf-8')
    await fs.writeFile(
      file,
      content.replace('if (process.env.__NEXT_PRIVATE_PREBUNDLED_REACT) {', 'if (true) {')
    )
    console.log('✅ next-fix applied')
  } catch (error) {
    console.log('❌ next-fix failed, ', error.message)
  }
}

nextFix()
