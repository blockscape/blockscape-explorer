<template>
<main>
<card title="Summary" :loading="txn == null">
    <table>
        <tr><td>Size</td><td>{{ txn.size }} (bytes)</td></tr>
        <tr><td>Timestamp</td><td><router-link :href="'/shard/' + block.header.shard">{{ txn.timestamp | datetime }}</router-link></td></tr>
        <tr><td>Receive Time</td><td>{{ block.header.merkle_root }}</td></tr>
        <tr><td>Included in Block</td><td><router-link :href="'/block/' + block.header.prev">{{ txn.block }}</router-link></td></tr>
    </table>
</card>
<card title="Details" :loading="txn == null">

</card>
</main>
</template>

<style lang="scss" scoped>
</style>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';

import Card from './layouts/Card';
import MiniMutation from './MiniMutation';

import { Txn } from 'lib/primitives/txn';

Vue.component('card', Card);
Vue.component('mini-mutation', MiniMutation);

@Component({
    props: {
        hash: {
            type: String,
            required: true
        }
    }
})
export default class ViewTxn extends Vue {

    hash: string;

    txn: Txn|null = null;


    async reload() {
        try {
            this.txn = (await this.$http.get('/api/txn/' + this.hash)).data;
        }
        catch(err) {
            console.error('Could not load block: ', err);
        }
    }
}
</script>