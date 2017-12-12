<template>
<main>
<card title="Latest Transactions">

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

    txn: Txn|null;

    created() {

    }
}
</script>