require("dotenv").config({
  path: `.env.${process.env.NODE_ENV}`,
});

module.exports = {
  siteMetadata: {
    title: "Outline | Branding | Web Design | Charleston, SC",
    titleTemplate: "%s | Outline | Charleston, SC",
    description: "Outline is your partner in exploring, designing and elevating your brand. We focus on naming, branding, narratives, web design and development.",
    siteUrl: "https://weareoutline.com",
    image: "/og-image.jpg", // Path to your image you placed in the 'static' folder
  },
  plugins: [
    "gatsby-plugin-eslint",
    `gatsby-plugin-sitemap`,
    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-sass`,
    `gatsby-transformer-remark`,
    `gatsby-plugin-transition-link`,
    {
      resolve: `gatsby-source-datocms`,
      options: {
        apiToken: process.env.GATSBY_DATO_API_TOKEN,
        previewMode: true,
      },
    },
    {
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        trackingId: "UA-111080132-1",
      },
    },
    "gatsby-plugin-offline",
  ],
};