'use strict';

const Hapi = require('@hapi/hapi');

const server = Hapi.server({
    port: 3000,
    host: 'localhost'
});

server.route({
    method: 'GET',
    path: '/',
    handler: function() {
        return 'Hello world';
    }
});

exports.init = async () => {
    await server.start();
    console.log(`Server running at ${server.info.uri}`);
    return server;
};

process.on('unhandledRejection', (error) => {
    console.log('error', error);
    process.exit(1);
});