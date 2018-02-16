import { Router } from 'express';

import rpc from '../rpc';

import handlers from '../handlers';

import { isNumber } from 'lodash';

export let router = Router();

let HASH_REGEX = /^(0x)?[0-9a-f]{64}$/i.compile();
let ACCOUNT_ID_REGEX = /^(0x)?[0-9a-f]{40}$/i.compile();
let HEIGHT_REGEX = /^\d+$/.compile();


router.get('/resolve', async (req, res) => {
    // did we get a hash?

    let q = req.query.q.trim();

    try {
        if(HASH_REGEX.test(q)) {
            // trying querying for both a block and a transaction
            var r = null;
            await Promise.all([
                async () => {
                    try {
                        let d = await rpc().request('get_block', [q]);
                        r = {
                            type: 'block',
                            key: d.header.hash
                        };
                    }
                    catch(e) {}
                },

                async () => {
                    try {
                        let d = await rpc().request('get_txn', [q]);
                        r = {
                            type: 'txn',
                            key: d.hash
                        };
                    }
                    catch(e) {}
                }
            ]);

            if(r) {
                return res.json(r);
            }
        }

        else if(ACCOUNT_ID_REGEX.test(q)) {
            // unimplemented!
            return res.status(404);
        }

        else if(HEIGHT_REGEX.test(q)) {
            return res.json(await rpc().request('get_block_by_height', [q]));
        }
    }
    catch(e) {
        if(e.code <= -32603 || e.code > -32100) {
            // some sort of internal error occured
            handlers.internalError(req, res, e);
        }

        // the rest we will simply resolve to 404 for right now, since that is how they are created one way or another
    }

    return res.status(404).end();
});

router.get('/block/latest', async (req, res) => {
    let size = parseInt(req.query.size);
    if(!isNumber(size)) {
        return handlers.invalidParam(res, 'size', req.query.size, 'number');
    }

    let blocks;
    if(!isNumber(req.query.height)) {
        blocks = await rpc().request('get_latest_blocks', [size]);
    }
    else {
        blocks = await rpc().request('get_latest_blocks', [size, req.query.height]);
    }

    handlers.dismantleRPC(res, blocks);
});

router.get('/block/:id', async (req, res) => {
    handlers.dismantleRPC(res, await rpc().request('get_block', [req.params.id]));
});

// post a raw block to the network
router.post('/', () => {

});

// retrieve transaction by hash hex
router.get('/txn/:id', async (req, res) => {
    // dummy data
    handlers.dismantleRPC(res, await rpc().request('get_txn', [req.params.id]));
});

// post a raw transaction to the network
router.post('/txn', () => {

});