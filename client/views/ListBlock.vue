<template>
<main>
<card title="Latest Blocks">

</card>
</main>
</template>

<style lang="scss" scoped>
</style>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';

import Card from './layouts/Card';
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

    block: Block|null;

    created() {
        this.reload();
    }

    reload() {

    }
}
</script>