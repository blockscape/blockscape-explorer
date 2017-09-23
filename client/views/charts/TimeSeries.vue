<template>
<svg ref="diag">
    <g class="lines">

    </g>
    <g class="nodes">

    </g>
</svg>
</template>

<style lang="scss" scoped>
svg {
    width: 100%;
    min-height: 200px;
}
</style>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';

import _ from 'lodash';
import * as c3 from 'c3';
import {u256, ShardInfo} from "../../../lib/primatives";

@Component({
    props: {
        mode: {
            type: String,
            default: 'full'
        },
        startTime: {
            type: Number,
            require: true
        },

        points: {
            type: Array,
            required: true
        }
    }
})
export default class TimeSeries extends Vue {
    mode: 'full' | 'time' | 'date';
    startTime: number;
    points: number[][];

    mounted() {
        const pointsMaxLength = _.max(_.map(this.points, 'length'));

        // generate dates
        
    }
}
</script>
