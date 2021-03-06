export const round2Decimals = (num: number) =>
  Math.round((num + Number.EPSILON) * 100) / 100

export const getUserIcon = (account: string) => {
  const acc: number = parseInt(account, 16) % 613 // using a relatively large prime number here to get a lot of diversity

  if (acc < 200) {
    return "/user_green.png"
  }
  if (acc < 400) {
    return "/user_orange.png"
  }
  if (acc < 613) {
    return "/user_purple.png"
  }
  return "/monkas.png"
}
