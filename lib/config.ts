import * as fs from 'fs';

import { cloneDeep, assign } from 'lodash';

interface Config {
    rpc: {
        host: string,
        port: number
    }
}

const CONFIG_LOCATIONS = [
    process.cwd() + '/config.json',
    process.cwd() + '/../config.json',
    process.cwd() + '/../../config.json'
];

if(process.env.BLOCKSCAPE_EXPLORER_CONFIG) {
    CONFIG_LOCATIONS.splice(0, 0, process.env.BLOCKSCAPE_EXPLORER_CONFIG as string);
}

const DEFAULT_CONFIG: Config = {
    rpc: {
        host: '127.0.0.1',
        port: 8356
    }
}


// immediately load config, and expose it as an export
var c: Config = cloneDeep(DEFAULT_CONFIG);

for(let location of CONFIG_LOCATIONS) {

    try {
        let data = JSON.parse(fs.readFileSync(location).toString());

        console.log('Loaded config file: ', location);

        assign(c, data);
    } catch(e) {
        // TODO: Print JSON parse exception if that is the error
    }
}

export default function getConfig() {
    return c;
}