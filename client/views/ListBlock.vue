<template>
<main>
    <paged-table 
    :header="['Height', 'Hash', 'Age', 'Txn Count']"
    :items="blocks" 
    :cur="blocks ? blocks[0].height : 1" :max="block_max" :min="1" 
    class="selectable"
    @next="change(blocks[blocks.length - 1].height - 1)" @prev="change(blocks[0].height + size)">
        <tr slot-scope="props" @click="$router.push('/block/' + props.item.hash)">
            <td style="width: 12%">{{ props.item.height }}</td>
            <td style="width: 40%">{{ props.item.hash | hash_abbrev }}</td>
            <td style="width: 28%">{{ props.item.timestamp | timeAgo(timeNow) }}</td>
            <td style="width: 20%">{{ props.item.txn_count }}</td>
        </tr>
    </paged-table>
</main>
</template>

<style lang="scss" scoped>
</style>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';

import Card from './layouts/Card';
import PagedTable from './PagedTable';

import {Block} from 'lib/primitives/block';

import { timeAgo } from '../lib/filters/datetime';
import * as abbrev from '../lib/filters/abbrev';

Vue.component('card', Card);
Vue.component('paged-table', PagedTable);

Vue.filter('timeAgo', timeAgo);
Vue.filter('hash_abbrev', abbrev.hash);

@Component({
    props: {
        height: {
            type: Number,
            default: null
        },

        size: {
            type: Number,
            default: 10
        }
    }
})
export default class ListBlock extends Vue {

    height: number|null;
    curHeight: number|null;
    size: number;

    /// The maximum known block hash based on the current state of the list
    block_max: number = 1;

    blocks: Block[]|null = null;

    timeNow: Date = new Date();

    scanInterval?: any = undefined;

    created() {

        this.curHeight = this.height;

        this.change(this.curHeight);

        this.scanInterval = setInterval(() => {
            this.timeNow = new Date();

            // query for new blocks if we are at the latest
            if(this.curHeight == null) {
                // query for latest blocks
                this.change(this.curHeight);
            }
            else clearInterval(this.scanInterval);
        }, 1000);
    }

    destroyed() {
        if(this.scanInterval) {
            clearInterval(this.scanInterval);
        }
    }

    async change(height: number|null) {
        this.curHeight = height;
        let size = this.size + 1;

        try {
            let newBlocks;
            if(height == null) {
                newBlocks = (await this.$http.get('/api/chain/block/latest?size=' + (size - 1))).data;
            }
            else {
                newBlocks = (await this.$http.get('/api/chain/block/latest?size=' + size + '?height=' + height)).data;
            }

            console.log(newBlocks);

            if(newBlocks.length > this.size) {
                this.block_max = newBlocks.shift().height;
            }
            else {
                this.block_max = newBlocks[0].height;
            }

            this.blocks = newBlocks;

        }
        catch(err) {
            console.error('Could not load block: ', err);
        }
    }
}
</script>