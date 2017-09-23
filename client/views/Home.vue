<template>
<main>
<card title="Running Shards">
    <shard-tree></shard-tree>
</card>
</main>
</template>

<style lang="scss" scoped>
</style>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';

import Card from './Card.vue';
import ShardTree from './charts/ShardTree.vue';

Vue.component('card', Card);
Vue.component('shard-tree', ShardTree);

@Component
export default class Home extends Vue {
    
}
</script>