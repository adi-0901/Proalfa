require("dotenv").config()

module.exports = {
  siteMetadata: {
    title: `Proalfa Dynamic`,
    description: `Proalfa Dynamic is an end-to-end turnkey industrial infrastructure developer. We design, engineer, and deliver large-scale industrial facilities—from foundation and structure to operations-ready assets—with integrated EPC capabilities.`,
    author: `@gatsbyjs`,
    siteUrl: `https://gatsbystarterdefaultsource.gatsbyjs.io/`,
  },
  // pathPrefix: "/creative-studio",
  plugins: [
    `gatsby-plugin-postcss`,
    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-image`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: "gatsby-plugin-manifest",
      options: {
        icon: "src/assets/images/icon-512x512.png",
      },
    },
    `gatsby-plugin-gatsby-cloud`,
    "gatsby-plugin-antd",
    "@babel/plugin-transform-runtime",
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    // `gatsby-plugin-offline`,
  ],
}
