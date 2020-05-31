export const formatNumber = (number: string) => {
  const strNumber = number.match(/\d+(((.)\d+(,)\d+)|(.)\d+)?/)[0]
  const strFormatedNumber = strNumber.replace('.', '').replace(',', '.')
  return Number(strFormatedNumber)
}
