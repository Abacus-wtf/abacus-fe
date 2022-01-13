const sizes = {
  tablet: "1200px",
  phone: "600px",
}

export const theme = {
  colors: {
    text1: "#000",
    text2: "#6C7388",
    oppositeText1: "#fff",

    bg1: "#fff",
    bg2: "#E4E4E4",

    accent: "#383FF4",
  },

  media: {
    tablet: `(min-width: ${sizes.tablet})`,
    phone: `(min-width: ${sizes.phone})`,
  },
}
