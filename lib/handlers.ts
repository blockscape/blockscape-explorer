import * as _ from 'lodash';

var debug = require('debug')('handler');

export default {
    invalidParam(res, name, v, expected) {
        res.status(400).json({param: name, value: v, msg: 'Invalid value - expected ' + expected});
    },

    internalError(req, res, err) {
        console.error('Server Error:', req.url, ':', err);
        res.status(500).json({msg: 'Internal Server Error'});
    },

    dismantleRPC(res, rpcResponse) {
        if(rpcResponse.result) {
            return res.json(rpcResponse.result);
        }
        else {
            // some error occured, find out which it is
            module.exports.internalError();
        }
    }
};