import { Router } from 'express';

import rpc from '../rpc';

export let router = Router();

// retrieve transaction by hash hex
router.get('/:id', async (_, res) => {
    // dummy data
    res.json({
        timestamp: 1513044594000,
        txn_type: 7,
        pubkey: '',
        mutation: {
            contra: false,
            changes: [
                {
                    "type": "SetValue",
                    "key": "0000",
                    "value": "0005",
                    "supp": ""
                }
            ]
        },
        signature: ''
    });
});

// post a raw transaction to the network
router.post('/', () => {

});