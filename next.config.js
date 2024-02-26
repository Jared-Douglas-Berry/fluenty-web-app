const { PHASE_DEVELOPMENT_SERVER } = require('next/constants');
const jose = require('node-jose');

module.exports = (phase) => {


    async function generateKey() {
        const keystore = jose.JWK.createKeyStore();
        const key = await keystore.generate('oct', 512, { alg: 'HS512' });
        console.log(JSON.stringify(key.toJSON()));
    }

    if (phase === PHASE_DEVELOPMENT_SERVER) {
        return {
            images: {
                domains: ['static.vecteezy.com', 'img.freepik.com', 'static-00.iconduck.com', "media.licdn.com" ],
            },
            env: {
                NEXTAUTH_SECRET: generateKey(),
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
            },
        };
    }

    return {
        images: {
            domains: ['static.vecteezy.com', 'img.freepik.com', 'static-00.iconduck.com', "media.licdn.com" ],
        },
        env: {
            NEXTAUTH_SECRET: generateKey(),
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
        },
    };
};