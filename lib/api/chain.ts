import { Router } from 'express';

import { parallel } from 'async';

import { promisify } from 'util';

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
            let r = await promisify(parallel)([
                async (callback) => {
                    return await rpc().request('get_block', [q]);
                },
                async (callback) => {
                    return await rpc().request('get_txn', [q]);
                }
            ])
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

    return res.status(404);
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
    let block = await rpc().request('get_block', [req.params.id]);
    res.json(block);
});

// post a raw block to the network
router.post('/', () => {

});

// retrieve transaction by hash hex
router.get('/txn/:id', async (req, res) => {
    // dummy data
    let txn = await rpc().request('get_txn', [req.params.id]);
    res.json(txn);
});

// post a raw transaction to the network
router.post('/txn', () => {

});