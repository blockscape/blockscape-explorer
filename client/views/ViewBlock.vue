<template>
<main v-if="block">
<split-layout :columns="2">
    <card title="Summary" slot="0">
        <table v-if="block != null" class="kv">
            <tr><td>Hash</td><td>{{ block.header.hash }}</td></tr>
            <tr><td>Height</td><td>{{ block.height }} ({{ block.status }})</td></tr>
            <tr><td># of Txns</td><td>{{ block.txns.length }}</td></tr>
            <tr></tr>
            <tr></tr>
        </table>
    </card>
    <card title="Header Info" slot="1">
        <table v-if="block != null">
            <tr><td>Timestamp</td><td>{{ block.header.timestamp | datetime }}</td></tr>
            <tr><td>Shard Hash</td>
                <td v-if="is_good_hash(block.header.shard)"><router-link :to="'/shard/' + block.header.shard">{{ block.header.shard }}</router-link></td>
                <td v-else>-</td>
            </tr>
            <tr><td>Merkle Root</td>
                <td>{{ is_good_hash(block.header.merkle_root) ? block.header.merkle_root : '-' }}</td>
            </tr>
            <tr><td>Previous Block</td>
                <td v-if="is_good_hash(block.header.prev)"><router-link :to="'/block/' + block.header.prev">{{ block.header.prev }}</router-link></td>
                <td v-else>-</td>
            </tr>
            <tr><td>Next Block</td>
                <td v-if="is_good_hash(block.next)"><router-link :to="'/block/' + block.next">{{ block.next }}</router-link></td>
                <td v-else>-</td>
            </tr>
        </table>
    </card>
</split-layout>
<card title="List of Transactions">
    <paged-table 
    :header="['Timestamp', 'Hash', 'Size', 'Change Count']"
    :items="block.txns" 
    :cur="0" :max="0" :min="0" 
    class="selectable">
        <tr slot-scope="props" @click="$router.push('/txn/' + props.item.hash)">
            <td style="width: 20%">{{ props.item.timestamp | timeAbsolute }}</td>
            <td style="width: 50%">{{ props.item.hash }}</td>
            <td style="width: 20%">{{ props.item.size | bytes }}</td>
            <td style="width: 20%">{{ props.item.change_count }}</td>
        </tr>
    </paged-table>
</card>
</main>
<spinner v-else></spinner>
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
import PagedTable from './PagedTable';

import {Block} from 'lib/primitives/block';

import datetime from '../lib/filters/datetime';
import { timeAbsolute } from '../lib/filters/datetime';
import * as sizes from '../lib/filters/sizes';
import * as abbrev from '../lib/filters/abbrev';

Vue.component('card', Card);
Vue.component('time-series', TimeSeries);
Vue.component('split-layout', SplitLayout);
Vue.component('paged-table', PagedTable);

Vue.filter('datetime', datetime);
Vue.filter('timeAbsolute', timeAbsolute);
Vue.filter('hash_abbrev', abbrev.hash);
Vue.filter('bytes', sizes.bytes);

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
        console.log(this.block);

        this.reload();
    }

    async reload() {
        try {
            this.block = (await this.$http.get('/api/chain/block/' + this.hash)).data;
        }
        catch(err) {
            console.error('Could not load block: ', err);
        }
    }

    is_good_hash(h: string) {
        return h != '0x0000000000000000000000000000000000000000000000000000000000000000';
    }
}
</script>