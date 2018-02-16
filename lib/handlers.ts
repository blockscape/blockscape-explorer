import express from 'express';

export default {
    invalidParam(res: express.Response, name: string, v: string, expected: string) {
        res.status(400).json({param: name, value: v, msg: 'Invalid value - expected ' + expected});
    },

    internalError(req: express.Request, res: express.Response, err: any) {
        console.error('Server Error:', req.url, ':', err);
        res.status(500).json({msg: 'Internal Server Error'});
    },

    dismantleRPC(res: express.Response, rpcResponse: any) {
        if(rpcResponse.result) {
            return res.json(rpcResponse.result);
        }
        else {
            // some error occured, find out which it is
            module.exports.internalError();
        }
    }
};