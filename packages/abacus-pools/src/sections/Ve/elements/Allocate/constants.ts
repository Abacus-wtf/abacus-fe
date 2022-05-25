import { IS_PRODUCTION } from "@config/constants"
import { VeAllocation } from "@sections/Ve/models"

export const defaultCollections: Partial<VeAllocation>[] = IS_PRODUCTION
  ? [
      {
        name: "Doodles",
        address: "0x8a90cab2b38dba80c64b7734e58ee1db38b8992e",
        imgSrc:
          "https://lh3.googleusercontent.com/7B0qai02OdHA8P_EOVK672qUliyjQdQDGNrACxs7WnTgZAkJa_wWURnIFKeOh5VTf8cfTqW3wQpozGedaC9mteKphEOtztls02RlWQ=s120",
      },
      {
        name: "CryptoPunks",
        address: "0xb47e3cd837ddf8e4c57f05d70ab865de6e193bbb",
        imgSrc:
          "https://lh3.googleusercontent.com/BdxvLseXcfl57BiuQcQYdJ64v-aI8din7WPk0Pgo3qQFhAUH-B6i-dCqqc_mCkRIzULmwzwecnohLhrcH8A9mpWIZqA7ygc52Sr81hE=s0",
      },
      {
        name: "Bored Apes",
        address: "0xbc4ca0eda7647a8ab7c2061c2e118a18a936f13d",
        imgSrc:
          "https://lh3.googleusercontent.com/Ju9CkWtV-1Okvf45wo8UctR-M9He2PjILP0oOvxE89AyiPPGtrR3gysu1Zgy0hjd2xKIgjJJtWIc0ybj4Vd7wv8t3pxDGHoJBzDB=s120",
      },
      {
        name: "Azuki",
        address: "0xed5af388653567af2f388e6224dc7c4b3241c544",
        imgSrc:
          "https://lh3.googleusercontent.com/H8jOCJuQokNqGBpkBN5wk1oZwO7LM8bNnrHCaekV2nKjnCqw6UB5oaH8XyNeBDj6bA_n1mjejzhFQUP3O1NfjFLHr3FOaeHcTOOT=s120",
      },
    ]
  : [
      {
        name: "CryptoKitties",
        address: "0x16baf0de678e52367adc69fd067e5edd1d33e3bf",
        imgSrc:
          "https://storage.googleapis.com/opensea-static/cryptokitties-logo.png",
      },
      {
        name: "Uncanny",
        address: "0x24b5a675a7684cdbb12fa5215b7b775e291ed355",
        imgSrc:
          "https://lh3.googleusercontent.com/upPM9uL5UBEUoY5hThjEgUgl8ySUC1aFL_LG7xAzQb3BFAESQ-MFbTdH36TC3vymXKYffP-9K-cFu1XcoqfSj1IKf6_k5P7nxbZy=s0",
      },
      {
        name: "Dragon Age",
        address: "0x1935899bfb630aed1fa54f2a943f0b0841724007",
        imgSrc:
          "https://lh3.googleusercontent.com/OA1RwoiShxvCf2Ib-8p_sQyCS705qLWShC0yT8ex-jbp0-snIY-e5dcI33ScOR8GDobrnN4Ofet4MEVTETh2G1chIazPMEY6iaZA_V8=s0",
      },
      {
        name: "Azuki God",
        address: "0xb74bf94049d2c01f8805b8b15db0909168cabf46",
        imgSrc:
          "https://lh3.googleusercontent.com/1jhEpK2LCYLVGst-RJHlCRpgD7agCaS8CIS8C8-x2gu2pPUgiz7yrx008ZaaEFe0lZt3UqE1R5_2EfH9n1X57ChOM5re7pFBqqs2=s0",
      },
    ]
