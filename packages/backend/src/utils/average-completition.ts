export const getAcp = ({
  startDate,
  endDate,
  finishedAt,
}: {
  startDate: string
  endDate: string
  finishedAt: string | null
}) => {
  let acp = null
  let pacp = null

  const today = new Date()
  today.setHours(0, 0, 0, 0)
  const time = today.getTime()
  const start = new Date(startDate).getTime()
  const end = new Date(endDate).getTime()

  if (time < start) {
    return {
      acp,
      pacp,
    }
  }

  const finished = finishedAt ? new Date(finishedAt).getTime() : null
  const deltaDate = end - start
  if (finished) {
    acp = (finished - end) / (deltaDate || 1)
  } else {
    pacp = (time - end) / (deltaDate || 1)
  }

  return {
    acp,
    pacp,
  }
}
