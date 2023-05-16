const removeThousandsSeparator = (value: string) => value.replace(/\./g, '')
const changeDecimalSeparator = (value: string) => value.replace(',', '.')

export const formatCurrencyToString = (value: string) => {
  console.log('value', value)
  const digits = removeThousandsSeparator(value)
  const digitsWithDecimalSeparator = changeDecimalSeparator(digits)
  return digitsWithDecimalSeparator
}
