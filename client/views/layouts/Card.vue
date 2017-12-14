<template>
<div class="container">
    <div class="card">
        <h2>{{ title }}</h2>
        <div v-if="loading" style="margin-bottom: 10px">
            <spinner :size="40"></spinner>
        </div>
        <slot v-else></slot>
    </div>
</div>
</template>

<style lang="scss" scoped>

.container {
    padding: 5px;
    width: 100%;
    box-sizing: border-box;

    margin-left: auto;
    margin-right: auto;

    max-width: 1536px;
}

.card {
    display: inline-block;
    background-color: white;
    //margin: 5px;

    width: 100%;

    h2 {
        text-align: center;
    }
}
</style>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';

import Spinner from '../Spinner';

Vue.component('spinner', Spinner);

@Component({
    props: {
        title: {
            type: String,
            required: true
        },

        loading: {
            type: Boolean,
            default: false
        }
    }
})
export default class Card extends Vue {
    title: String;
    
    loading: boolean;
}
</script>
