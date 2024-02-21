const { PHASE_DEVELOPMENT_SERVER } = require('next/constants');

module.exports = (phase) => {
    if (phase === PHASE_DEVELOPMENT_SERVER) {
        return {
            images: {
                domains: ['static.vecteezy.com', 'img.freepik.com', 'static-00.iconduck.com'],
            },
            env: {
                mongodb_username: 'fluenty',
                mongodb_password: 'e9jcfRdqz6QcqyW7',
                mongodb_clustername: 'cluster0',
                mongodb_database: 'Fluenty',
                mongodb_database_projects: 'fluenty-dev-projects',
                mongodb_database_services: 'fluenty-dev-services',
                mongodb_database_tech: 'fluenty-dev-tech',
            },
        };
    }

    return {
        images: {
            domains: ['static.vecteezy.com', 'img.freepik.com', 'static-00.iconduck.com'],
        },
        env: {
            mongodb_username: 'fluenty',
            mongodb_password: 'e9jcfRdqz6QcqyW7',
            mongodb_clustername: 'cluster0',
            mongodb_database: 'Fluenty',
            mongodb_database_projects: 'projects',
            mongodb_database_services: 'services',
            mongodb_database_tech: 'tech',
        },
    };
};