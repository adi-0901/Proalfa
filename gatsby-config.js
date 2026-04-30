require("dotenv").config()

module.exports = {
  siteMetadata: {
    title: `Proalfa Dynamic`,
    description: `Proalfa Dynamic is an end-to-end turnkey industrial infrastructure developer based in Pune, India. We design, engineer, and deliver large-scale industrial facilities—from foundation and structure to operations-ready assets—with integrated EPC capabilities.`,
    author: `Proalfa Dynamic`,
    siteUrl: `https://www.proalfa.in`,
    location: {
      city: `Pune`,
      state: `Maharashtra`,
      country: `India`,
      countryCode: `IN`,
      latitude: `18.5204`,
      longitude: `73.8567`,
    },
  },
  // pathPrefix: "/creative-studio",
  plugins: [
    {
      resolve: `gatsby-plugin-sitemap`,
      options: {
        output: `/`,
      },
    },
    {
      resolve: `gatsby-plugin-google-gtag`,
      options: {
        trackingIds: [`G-181C1653LK`],
        gtagConfig: {
          anonymize_ip: true,
        },
        pluginConfig: {
          head: true,
          respectDNT: true,
        },
      },
    },
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
    "@babel/plugin-transform-runtime",
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    // `gatsby-plugin-offline`,
  ],
}
