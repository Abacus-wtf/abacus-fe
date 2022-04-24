// eslint-disable-next-line import/no-extraneous-dependencies
require("dotenv").config({
  path: `.env.${process.env.NODE_ENV}`,
})

const path = require(`path`)
const config = require("./website")

module.exports = {
  siteMetadata: {
    siteUrl: config.siteUrl,
    title: config.siteTitle,
    twitterHandle: config.twitterHandle,
    description: config.siteDescription,
    keywords: [],
    canonicalUrl: config.siteUrl,
    author: {
      name: config.author,
      minibio: config.minibio,
    },
    organization: {
      name: config.organization,
      url: config.siteUrl,
    },
    social: {
      twitter: config.twitterHandle,
      fbAppID: "",
    },
  },
  plugins: [
    {
      resolve: `gatsby-plugin-google-gtag`,
      options: {
        trackingIds: ["G-RQL9BMSZ1Y"],
        gtagConfig: {
          anonymize_ip: true,
          cookie_expires: 0,
        },
        pluginConfig: {
          head: true,
          respectDNT: true,
        },
      },
    },
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: path.join(__dirname, `src`, `images`),
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    `gatsby-plugin-typescript`,
    `gatsby-plugin-styled-components`,
    `gatsby-plugin-image`,
  ],
}
