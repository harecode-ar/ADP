// eslint-disable-next-line import/no-duplicates
import { format, getTime, formatDistanceToNow } from 'date-fns'
// eslint-disable-next-line import/no-duplicates
import { es } from 'date-fns/locale'

// ----------------------------------------------------------------------

type InputValue = Date | string | number | null | undefined

export function fDate(date: InputValue, newFormat?: string) {
  const fm = newFormat || 'dd MMM yyyy'

  return date ? format(new Date(date), fm) : ''
}

export function fDateTime(date: InputValue, newFormat?: string) {
  const fm = newFormat || 'dd MMM yyyy p'

  return date ? format(new Date(date), fm) : ''
}

export function fTimestamp(date: InputValue) {
  return date ? getTime(new Date(date)) : ''
}

export function fToNow(date: InputValue) {
  return date
    ? formatDistanceToNow(new Date(date), {
        addSuffix: true,
        locale: es,
      })
    : ''
}

export const formatDate = (date: string) => {
  const [yyyy, mm, dd] = date.split('-')
  return `${dd}/${mm}/${yyyy}`
}

export function getLastDayOfMonth(dateString: string): string {
  const [year, month] = dateString.split('-').map(Number)
  const firstDayNextMonth = new Date(year, month, 1)
  firstDayNextMonth.setDate(firstDayNextMonth.getDate() - 1)
  const lastDay = firstDayNextMonth.getDate()
  const lastMonth = firstDayNextMonth.getMonth() + 1 // +1 porque los meses están indexados desde 0
  const lastYear = firstDayNextMonth.getFullYear()
  const formattedDate = `${lastYear}-${lastMonth.toString().padStart(2, '0')}-${lastDay
    .toString()
    .padStart(2, '0')}`
  return formattedDate
}
