import * as path from 'path';
import * as fs from 'fs';
import * as util from 'util';
import * as http from 'http';

var debug = require('debug')('server');

import * as express from 'express';

var server: http.Server | null = null;

export function startServer() {

    if(server != null)
        return; // server already started

    let app = express();
    // mount the static site files
    app.use(express.static(process.cwd() + '/client'));
    // mount the api
    try {
        var apiDir = path.join(__dirname, 'api');
        debug('API directory: ' + apiDir);
        fs.readdirSync(apiDir).forEach(function (p) {
            //if (!fs.statSync(path.join(apiDir, p)).isDirectory())
            //    return;
            try {
                app.use('/api/' + p.split('.')[0], require(path.join(apiDir, p)).router);
                debug('Added API endpoint: ' + '/api/' + p);
            }
            catch (e) {
                console.error('Faulty API could not be loaded: ' + p + ', ' + util.inspect(e));
            }
        });
    }
    catch (e) {
        console.error('No APIs were found!');
    }

    server = app.listen(3000, () => {
        return console.log('Listening on port 3000!');
    });
}

export function stopServer() {
    if(server == null)
        return;

    server.close();

    server = null;
}

if (require.main === module) {
    startServer();
}
