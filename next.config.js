const { PHASE_DEVELOPMENT_SERVER } = require('next/constants');
const path = require('path')
// const jose = require('node-jose');

module.exports = (phase) => {


    // async function generateKey() {
    //     const keystore = jose.JWK.createKeyStore();
    //     return await keystore.generate('oct', 512, {alg: 'HS512'})
    // }

    if (phase === PHASE_DEVELOPMENT_SERVER) {
        return {
            // sassOptions: {
            //     includePaths: [path.join(__dirname, 'styles')],
            // },
            pageExtensions: ['mdx', 'md', 'jsx', 'js', 'tsx', 'ts'],
            reactStrictMode: true,
            // output: 'export',
            images: {
                unoptimized: true,
            },
            env: {
                // NEXTAUTH_URL: 'https://vite.fluenty.co.za/',
                // NEXTAUTH_SECRET: generateKey(),
                NEXTAUTH_URL: 'https://d36841g6o19rmz.cloudfront.net/',
                mongodb_username: 'fluenty',
                mongodb_password: 'e9jcfRdqz6QcqyW7',
                mongodb_clustername: 'cluster0',
                mongodb_database: 'Fluenty',
                mongodb_database_projects: 'fluenty-dev-projects',
                mongodb_database_services: 'fluenty-dev-services',
                mongodb_database_tech: 'fluenty-dev-tech',
                mongodb_database_team: 'fluenty-dev-team',
                mongodb_database_send_email: 'fluenty-dev-emails',
                mongodb_database_email_subjects: 'fluenty-dev-emails-subjects',
                mongodb_database_blog: 'fluenty-dev-blog',
                mongodb_database_user: 'fluenty-dev-user',
                mongodb_database_comments: 'fluenty-dev-comments',
            },
        };
    }

    return {
        sassOptions: {
            includePaths: [path.join(__dirname, 'styles')],
        },
        pageExtensions: ['mdx', 'md', 'jsx', 'js', 'tsx', 'ts'],
        reactStrictMode: true,
        output: 'export',
        images: {
            unoptimized: true,
        },
        env: {
            NEXTAUTH_URL: 'https://d36841g6o19rmz.cloudfront.net/',
            // NEXTAUTH_SECRET: generateKey(),
            mongodb_username: 'fluenty',
            mongodb_password: 'e9jcfRdqz6QcqyW7',
            mongodb_clustername: 'cluster0',
            mongodb_database: 'Fluenty',
            mongodb_database_projects: 'projects',
            mongodb_database_services: 'services',
            mongodb_database_tech: 'tech',
            mongodb_database_team: 'team',
            mongodb_database_send_email: 'emails',
            mongodb_database_email_subjects: 'emails-subjects',
            mongodb_database_blog: 'blog',
            mongodb_database_user: 'user',
            mongodb_database_comments: 'comments',
        },
    };
};