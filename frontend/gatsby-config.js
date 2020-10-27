import dotenv from 'dotenv'

dotenv.config({
  path: `.env.${process.env.NODE_ENV}`,
})

export default {
  siteMetadata: {
    title: `Recipeat`,
    description: `Our favorite recipes without the ads and influencers!`,
    author: `Andrew Owen`,
  },
  plugins: [
    'gatsby-plugin-styled-components',
    {
        resolve: 'gatsby-source-sanity',
        options: {
            projectId: process.env.SANITY_PROJECT_ID,
            dataset: 'production',
            watchMode: true,
            token: process.env.SANITY_TOKEN,
        }
    },
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    // `gatsby-plugin-offline`,
  ],
}
