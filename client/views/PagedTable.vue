<template>

<div v-if="items != null">
    <div class="actions">
        <button type="button" @click="$emit('next')" v-show="false && min < cur - items.length" style="float: right;">Older &raquo;</button>
        <button type="button" @click="$emit('prev')" v-show="false && max > cur">&laquo; Newer</button>
    </div>

    <table>
        <thead>
            <tr>
                <th v-for="head in header" :key="head">{{ head }}</th>
            </tr>
        </thead>
        <tbody>
            <slot v-if="items.length" v-for="item in items" :item="item"></slot>
            <span v-else class="center">Table is empty!</span>
        </tbody>
        <!-- Next and previous buttons -->
    </table>
</div>

<spinner v-else></spinner>

</template>
<style>
.actions {
    height: 50px;
}
</style>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';

import Spinner from './Spinner';

Vue.component('spinner', Spinner);

@Component({
    props: {
        header: {
            type: Array,
            required: true
        },

        items: {
            type: Array
        },

        cur: {
            type: Number,
            default: 0
        },

        max: {
            type: Number,
            default: Number.MAX_VALUE
        },

        min: {
            type: Number,
            default: Number.MIN_VALUE
        }
    }
})
export default class ListBlock extends Vue {

    /// The text to put at the top of the table to describe each column
    header: string[];

    /// Data to put in each row of the table
    items: any[];

    /// The numerical index of the first item in the table
    cur: number;

    /// The numerical maximum of the known data in the table
    max: number;
    
    /// Opposite of max
    min: number;
}
</script>
