<template>
<main>
<split-layout :columns="2">
    <card title="Recent Blocks" slot="0">
        <list-block></list-block>
    </card>
    <card title="Txn Volume" slot="2">
        <shard-tree :tree="shardTree"></shard-tree>
        <time-series 
            :startTime="0" 
            :skip="86400"
            :points="[['data1', 5,4,2,3]]"></time-series>
    </card>
</split-layout>
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
import ListBlock from './ListBlock';

Vue.component('card', Card);
Vue.component('shard-tree', ShardTree);
Vue.component('time-series', TimeSeries);
Vue.component('split-layout', SplitLayout);
Vue.component('list-block', ListBlock);

@Component
export default class Home extends Vue {

    shardTree: any;

    data() {
        return {
            shardTree: [
                {
                    id: 'uno',
                    parent: null,
                    height: 0,
                    isLeaf: false
                },
                {
                    id: 'dos',
                    parent: 'uno',
                    height: 1,
                    isLeaf: false
                },
                {
                    id: 'tres',
                    parent: 'uno',
                    height: 1,
                    isLeaf: true
                },
                {
                    id: 'cinco',
                    parent: 'dos',
                    height: 2,
                    isLeaf: true
                },
                {
                    id: 'quatro',
                    parent: 'dos',
                    height: 2,
                    isLeaf: true
                }
            ]
        };
    }
}
</script>