'use strict';

const Hapi = require('@hapi/hapi');
const http = require('http');
const https = require('https');
const fs = require('fs');

const server = Hapi.server({
    port: 3000,
    host: 'localhost'
});

const data_url = 'https://gbfs.divvybikes.com/gbfs/en/station_information.json';
let parsedData = {};
https.get(data_url, (res) => {
    const { statusCode } = res;
    const contentType = res.headers['content-type'];

    let error;

    res.setEncoding('utf8');
    let rawData = '';
    
    res.on('data', (chunk) => { 
        rawData += chunk;
    });

    res.on('end', () => {
        try {
            parsedData = JSON.parse(rawData);

            parsedData.data.stations = parsedData.data.stations.map(function(station) {
                delete station.rental_methods;
                delete station.rental_uris;
                
                station.externalId = station.external_id;
                station.stationId = station.station_id;
                station.legacyId = station.legacy_id;
                
                delete station.external_id;
                delete station.station_id;
                delete station.legacy_id;

                return station;
            }).filter(function(station) {
                return station.capacity < 12;
            });
        } catch (e) {
            console.error('error', e.message);
        }
    });
}).on('error', (e) => {
    console.error(`Got error: ${e.message}`);
});

function jsonToCSV(arrayOfObjects) {
    const fd = fs.openSync('out/test.csv', 'w');
    
    const headers = Object.keys(arrayOfObjects[0]).join(',');
    fs.writeSync(fd, headers + '\n');
    
    arrayOfObjects.forEach(function(item) {
        const row = Object.values(item).join(',');
        fs.writeSync(fd, row+ '\n');
    });
}

server.route({
    method: 'GET',
    path: '/',
    handler: function() {
        return parsedData;
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