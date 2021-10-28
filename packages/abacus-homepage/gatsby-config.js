'use strict'

const path = require(`path`)

module.exports = {
  siteMetadata: {
    title: `Abacus Protocol`,
    description: ``,
    author: {
      name: 'Abacus'
    }
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        trackingId: "G-RQL9BMSZ1Y",
        head: true
      }
    },
    {
      resolve: 'gatsby-plugin-generate-types',
      options: {
        inProduction: true
      }
    },

    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Personal Website`,
        display: `minimal-ui`,
        path: `${__dirname}/src/images`,
        icon: `src/images/logo.png`
      }
    },

    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: path.join(__dirname, `src`, `images`)
      }
    },

    {
      resolve: `gatsby-plugin-nprogress`,
      options: {
        // Setting a color is optional.
        color: `#E85D75`,
        // Disable the loading spinner.
        showSpinner: true
      }
    },


    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    `gatsby-plugin-typescript`,
    `gatsby-plugin-styled-components`,
  ],
}
