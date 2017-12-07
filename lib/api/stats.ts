import { Router } from 'express';

import rpc from '../rpc';

export let router = Router();

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
