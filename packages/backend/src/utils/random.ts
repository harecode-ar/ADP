export const randomColor = (): string => {
  const code = Math.floor(Math.random() * 16777215).toString(16)
  if (code.length < 6) {
    return randomColor()
  }
  return `#${code}`
}

export const randomString = (length = 10): string => {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  let result = ''
  for (let i = 0; i < length; i += 1) {
    result += characters.charAt(Math.floor(Math.random() * characters.length))
  }
  return result
}

export const randomInt = (min: number, max: number): number =>
  Math.floor(Math.random() * (max - min + 1) + min)
