import { Router } from 'express';

import rpc from '../rpc';

export let router = Router();

router.get('/:id', async (_, res) => {
    // dummy data
    res.json({
        header: {
            version: 1,
            timestamp: 1513044594000,
            shard: '233e251a80db5d04fcc516ebf114d8e9be79b7a2b824369af2095f48d29de948',
            prev: '0000000000000000000000000000000000000000000000000000000000000000',
            next: '0000000000000000000000000000000000000000000000000000000000001111',
            merkle_root: '233e251a80db5d04fcc516ebf114d8e9be79b7a2b824369af2095f48d29de948'
        },
        txns: [

        ],
        hash: '0000000000000000000000000000000000000000000000000000000000000000',
        height: 1,
        status: 'Mainchain'
    })
});

router.get('/:id/header', async (_, res) => {
    res.json({
        version: 1,
        timestamp: 1513044594000,
        shard: '233e251a80db5d04fcc516ebf114d8e9be79b7a2b824369af2095f48d29de948',
        prev: '0000000000000000000000000000000000000000000000000000000000000000',
        next: '0000000000000000000000000000000000000000000000000000000000001111',
        merkle_root: '233e251a80db5d04fcc516ebf114d8e9be79b7a2b824369af2095f48d29de948'
    })
});

// post a raw transaction to the network
router.post('/', () => {

});