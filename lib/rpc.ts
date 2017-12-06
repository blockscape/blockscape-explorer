import config from './config';

const jayson = require('jayson/promise');

const client = new jayson.client.http({
    host: config().rpc.host, port: config().rpc.port
});

export default function getClient() {
    return client;
}

