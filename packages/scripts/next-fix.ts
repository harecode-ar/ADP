import path from 'node:path'
import fs from 'fs'

const baseDir = process.cwd()

const nextFix = async () => {
  const file = path.join(baseDir, '..', '..', '/node_modules', 'next/dist/server/require-hook.js')

  const content = await fs.promises.readFile(file, 'utf-8')
  await fs.promises.writeFile(
    file,
    content.replace('if (process.env.__NEXT_PRIVATE_PREBUNDLED_REACT) {', 'if (true) {')
  )
}

nextFix()
