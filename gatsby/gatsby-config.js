import dotenv from 'dotenv';

dotenv.config({ path: '.env' });

export default {
    siteMetadata: {
        title: `Slick's Slices`,
        siteUrl: `https://gatsby.pizza`,
        description: `The best pizza place in Hamilton`
    },
    plugins: [
        'gatsby-plugin-styled-components',
        {
            // this is the name of the plugin you are adding
            resolve: 'gatsby-source-sanity',
            options: {
                projectId: '2l23f96n',
                dataset: 'production',
                watchMode: true,
                token: process.env.SANITY_TOKEN
            }
        }
    ]
}