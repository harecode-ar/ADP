export function uuidv4() {
  const hexDigits = '0123456789abcdef'
  let uuid = ''

  for (let i = 0; i < 36; i += 1) {
    if (i === 8 || i === 13 || i === 18 || i === 23) {
      uuid += '-'
    } else if (i === 14) {
      uuid += '4'
    } else if (i === 19) {
      uuid += hexDigits[Math.floor(Math.random() * 4) + 8] // Genera 8, 9, a o b
    } else {
      uuid += hexDigits[Math.floor(Math.random() * 16)]
    }
  }

  return uuid
}

// eslint-disable-next-line no-useless-escape
const reg = /^[a-fA-F\d]{8}(?:\-[a-fA-F\d]{4}){3}\-[a-fA-F\d]{12}$/

export function isUUIDv4(uuid: string) {
  return reg.test(uuid)
}
