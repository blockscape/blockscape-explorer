<template>
<div ref="chart"></div>
</template>

<style lang="scss" scoped>
</style>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';

import _ from 'lodash';
import * as c3 from 'c3';
import * as d3 from 'd3';

@Component({
    props: {
        x: {
            type: String
        },
        xLabel: {
            type: String,
            default: ''
        },
        yLabel: {
            type: String,
            default: ''
        },
        yFormat: {
            type: String,
            default: null
        },
        points: {
            type: Array,
            required: true
        }
    },
    watch: {
        'chartPoints': 'updatePoints'
    }
})
export default class Graph extends Vue {

    chart: c3.ChartAPI;

    x: string;
    points: (string|number|boolean)[][];

    xLabel: string;
    yLabel: string;

    yFormat: string;


    get chartX() {
        return this.x;
    }

    get chartXLabel() {
        return this.xLabel;
    }

    get chartYLabel() {
        return this.yLabel;
    }

    get chartYFormat() {
        if(this.yFormat)
            return d3.format(this.yFormat);
        else
            return null;
    }

    get chartPoints() {
        return this.points;
    }

    mounted() {
        this.chart = c3.generate({
            bindto: <HTMLDivElement>this.$refs.chart,
            data: {
                x: this.chartX,
                columns: this.points,

            },
            axis: {
                x: {
                    label: {
                        text: this.chartXLabel,
                        position: 'outer-middle'
                    }
                },
                y: {
                    label: {
                        text: this.chartYLabel,
                        position: 'outer-middle'
                    },
                    tick: {
                        format: this.chartYFormat
                    }
                }
            }
        });
    }

    updatePoints(oldPoints: (string|number|boolean)[][], newPoints: (string|number|boolean)[][]) {
        // figure out where the changes happened
        // first remove nonexistant ones, then add new ones
        const removed: any[] = _.map(_.difference(oldPoints, newPoints), _.head);
        const added = _.difference(newPoints, oldPoints);

        this.chart.load({
            columns: added,
            unload: removed
        });
    }
}
</script>
