// Calculate the average of all the numbers
const calculateMean = (values: number[]) => {
  const sum = values.reduce((acc, current) => acc + current, 0)
  const mean = sum / values.length
  return mean
}

// Calculate variance
export const calculateVariance = (values: number[]) => {
  const average = calculateMean(values)
  const squareDiffs = values.map((value) => {
    const diff = value - average
    return diff * diff
  })
  const variance = calculateMean(squareDiffs)
  return variance
}

// Calculate stand deviation
export const calculateSD = (variance: number) => Math.sqrt(variance)
