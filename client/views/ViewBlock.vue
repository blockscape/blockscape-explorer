<template>
<main>
<split-layout :columns="2">
    <card title="Summary" slot="0" :loading="block == null">
        <table>
            <tr><td>Hash</td><td>{{ block.hash }}</td></tr>
            <tr><td>Height</td><td>{{ block.height }} ({{ block.status }})</td></tr>
            <tr><td># of Txns</td><td>{{ block.txns.length }}</td></tr>
        </table>
    </card>
    <card title="Header Info" slot="1" :loading="block == null">
        <table>
            <tr><td>Timestamp</td><td>{{ block.header.timestamp | datetime }}</td></tr>
            <tr><td>Shard Hash</td><td><router-link :href="'/shard/' + block.header.shard">{{ block.header.shard }}</router-link></td></tr>
            <tr><td>Merkle Root</td><td>{{ block.header.merkle_root }}</td></tr>
            <tr><td>Previous Block</td><td><router-link :href="'/block/' + block.header.prev">{{ block.header.prev }}</router-link></td></tr>
            <tr><td>Next Block</td><td><router-link :href="'/block/' + block.next">{{ block.next }}</router-link></td></tr>
        </table>
    </card>
</split-layout>
<card title="List of Transactions" :loading="block == null">

</card>
</main>
</template>

<style lang="scss" scoped>
</style>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';

import Card from './layouts/Card';
import ShardTree from './charts/ShardTree';
import TimeSeries from './charts/TimeSeries';
import SplitLayout from './layouts/SplitLayout';
import MiniTxn from './MiniTxn';

import {Block} from 'lib/primitives/block';

Vue.component('card', Card);
Vue.component('time-series', TimeSeries);
Vue.component('split-layout', SplitLayout);
Vue.component('mini-txn', MiniTxn);

@Component({
    props: {
        hash: {
            type: String,
            required: true
        }
    }
})
export default class ViewBlock extends Vue {

    hash: string;

    block: Block|null = null;

    created() {
        this.reload();
    }

    async reload() {
        try {
            this.block = (await this.$http.get('/api/block/' + this.hash)).data;
        }
        catch(err) {
            console.error('Could not load block: ', err);
        }
    }
}
</script>