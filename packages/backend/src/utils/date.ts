export const getDaysDiff = (startDate: string, endDate: string) => {
  const start = new Date(startDate).getTime()
  const end = new Date(endDate).getTime()
  const deltaDate = end - start
  return deltaDate / (1000 * 60 * 60 * 24)
}
