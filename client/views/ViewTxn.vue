<template>
<main v-if="txn != null">
<card title="Summary">
    <table>
        <tr><td>Size</td><td>{{ txn.size | bytes }}</td></tr>
        <tr><td>Timestamp</td><td>{{ txn.timestamp | datetime }}</td></tr>
        <tr><td>Receive Time</td><td>{{ txn.recv_time }}</td></tr>
        <tr><td>Included in Block</td>
            <td v-if="is_good_hash(txn.block)"><router-link :to="'/block/' + txn.block">{{ txn.block }}</router-link></td>
            <td v-else>-</td>
        </tr>
    </table>
</card>
<card title="Mutation Details">
    <mini-mutation-change v-for="(change, i) in txn.mutation.changes" :key="i" :change="change"></mini-mutation-change>
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
import MiniMutationChange from './MiniMutationChange';

import { Txn } from 'lib/primitives/txn';

import datetime from '../lib/filters/datetime';
import * as sizes from '../lib/filters/sizes';

Vue.component('card', Card);
Vue.component('mini-mutation-change', MiniMutationChange);

Vue.filter('datetime', datetime);
Vue.filter('bytes', sizes.bytes);

@Component({
    props: {
        hash: {
            type: String,
            required: true
        }
    },
    watch: {
        hash: 'reload'
    }
})
export default class ViewTxn extends Vue {

    hash: string;

    txn: Txn|null = null;

    created() {
        console.log(this.txn);

        this.reload();
    }

    async reload() {
        try {
            this.txn = (await this.$http.get('/api/chain/txn/' + this.hash)).data;
        }
        catch(err) {
            console.error('Could not load txn: ', err);
        }
    }

    is_good_hash(h: string) {
        return h != '0x0000000000000000000000000000000000000000000000000000000000000000';
    }
}
</script>