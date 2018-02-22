import { Router } from 'express';

import rpc from '../rpc';

export let router = Router();

router.get('/', async (_, res) => {
    // compile a bunch of stats together
    try {
        let net_stats = await rpc().request('get_net_stats', []);
        let chain_stats = await rpc().request('get_chain_stats', []);
    
        res.json({
            net: net_stats.result,
            chain: chain_stats.result
        });
    } catch(err) {
        console.error(err);
        res.status(502).end('Service Unavailable');
    }
    
    res.end();
});

router.get('/net', async (_, res) => {
    try {
        let stats = await rpc().request('get_net_stats', []);
    
        res.json(stats.result);
    } catch(err) {
        console.error(err);
        res.status(502).end('Service Unavailable');
    }
});

router.get('/imports', () => {

});

router.get('/shard/:root_network', () => {

});
