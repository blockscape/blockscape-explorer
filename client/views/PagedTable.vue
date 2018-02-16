<template>

<table v-if="items != null">
    <thead>
        <tr>
            <th v-for="head in header">{{ head }}</th>
        </tr>
    </thead>
    <tbody>
        <slot v-if="items.length" v-for="item in items" :item="item"></slot>
        <span v-else class="center">Table is empty!</span>
    </tbody>
    <!-- Next and previous buttons -->
    <button type="button" style="float: right;">Next &raquo;</button>
    <button type="button">&laquo; Prev</button>
</table>

<spinner v-else></spinner>

</template>
<style>
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
