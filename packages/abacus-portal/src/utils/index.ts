export const round2Decimals = (num: number) =>
  Math.round((num + Number.EPSILON) * 100) / 100

export const getUserIcon = (account: string) => {
  if (!account) {
    return "/monkas.png"
  }
  return "/temp_icon.png"
}
