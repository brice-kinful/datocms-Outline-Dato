require("dotenv").config({
  path: `.env.${process.env.NODE_ENV}`
});

module.exports = {
  siteMetadata: {
    title: 'Outline | Branding | Web Design | Charleston, SC',
    titleTemplate: '%s | Outline | Charleston, SC',
    description: 'Outline is your partner in exploring, designing and elevating your brand. We focus on naming, branding, narratives, web design and development.',
    siteUrl: "https://nifty-lovelace-0b9de5.netlify.com",
    image: '/og-image.jpg' // Path to your image you placed in the 'static' folder
  },
  plugins: [
    "gatsby-plugin-eslint",
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
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: "Outline | Branding | Web Design | Charleston, SC",
        short_name: "Outline",
        start_url: "/",
        background_color: "#F5F5F1",
        theme_color: "#000000",
        // Enables "Add to Homescreen" prompt and disables browser UI (including back button)
        // see https://developers.google.com/web/fundamentals/web-app-manifest/#display
        display: "standalone",
        icon: "static/icon.png", // This path is relative to the root of the site.
        // An optional attribute which provides support for CORS check.
        // If you do not provide a crossOrigin option, it will skip CORS for manifest.
        // Any invalid keyword or empty string defaults to `anonymous`
        crossOrigin: `use-credentials`
      }
    },
    "gatsby-plugin-offline"
  ]
};