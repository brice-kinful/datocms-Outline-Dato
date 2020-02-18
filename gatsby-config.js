require("dotenv").config({
  path: `.env.${process.env.NODE_ENV}`
});

module.exports = {
  siteMetadata: {
    title: "Outline | Branding | Web Design | Charleston, SC",
    titleTemplate: "%s | Outline | Charleston, SC",
    siteUrl: "https://nifty-lovelace-0b9de5.netlify.com"
  },
  plugins: [
    'gatsby-plugin-eslint',
    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-sass`,
    `gatsby-transformer-remark`,
    `gatsby-plugin-transition-link`,
    {
      resolve: `gatsby-source-datocms`,
      options: {
        apiToken: process.env.GATSBY_DATO_API_TOKEN,
        previewMode: true
      }
    }
  ]
};