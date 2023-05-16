export const formatDateYYYYMMDD = (date: Date, spacer: string) => {
  const day = date.getDate() < 10 ? `0${date.getDate()}` : date.getDate()
  const month =
    date.getMonth() + 1 < 10 ? `0${date.getMonth() + 1}` : date.getMonth() + 1
  const year = date.getFullYear()
  return `${year}${spacer}${month}${spacer}${day}`
}

export const formatDateDDMMYYYY = (date: Date, spacer: string) => {
  const day = date.getDate() < 10 ? `0${date.getDate()}` : date.getDate()
  const month =
    date.getMonth() + 1 < 10 ? `0${date.getMonth() + 1}` : date.getMonth() + 1
  const year = date.getFullYear()
  return `${day}${spacer}${month}${spacer}${year}`
}

export const formatDateStringDDMMYYYY = (date: string, spacer: string) => {
  const day = date.slice(8, 10)
  const month = date.slice(5, 7)
  const year = date.slice(0, 4)
  return `${day}${spacer}${month}${spacer}${year}`
}
