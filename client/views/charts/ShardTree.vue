<template>
<svg ref="diag">
    <g class="lines">

    </g>
    <g class="nodes">

    </g>

    <g class="text">

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

import * as d3 from 'd3';

import {u256, ShardInfo} from "../../../lib/primatives";

const TREE_ITEM_WIDTH = 75;
const TREE_ITEM_HEIGHT = 30;

const TREE_VERTICAL_SPACE = 70;

const TRANSITION_TIME = 250;

@Component({
    props: {
        tree: {
            type: Array,
            required: true
        }
    }
})
export default class ShardTree extends Vue {
    tree: ShardInfo[];

    get drawData() {
        let edges: {
            height: number,
            idx0: number,
            idx1: number
        }[] = [];

        let nodes: {
            id: u256,
            idx: number,
            height: number
        }[] = [];

        let idxs: number[] = [];
        let idxCache: any = {};

        for(let node of this.tree) {

            while(_.isNil(idxs[node.height])) {
                idxs.push(0);
            }

            let idx = idxs[node.height];

            nodes.push({
                id: node.id,
                idx: idxs[node.height],
                height: node.height
            });

            if(node.height != 0)
                edges.push({
                    height: node.height,
                    idx0: idxCache[node.parent],
                    idx1: idx
                });
            
            idxCache[node.id] = idx;
            idxs[node.height]++;
        }

        return { nodes: nodes, edges: edges, sizes: idxs };
    }

    animate(time: number) {

        let dd = this.drawData;

        let r = d3.select(<HTMLElement>this.$refs.diag);

        let { width, height } = r.node().getBoundingClientRect();

        let e = r.select('.lines').selectAll('line').data(dd.edges);
        let n = r.select('.nodes').selectAll('rect').data(dd.nodes);

        function nodePos(d: {height: number, idx: number}, x: number, y: number) {

            const jump = width / (dd.sizes[d.height] + 1);

            return {
                x: (d.idx + 1) * jump + (x - 0.5) * TREE_ITEM_WIDTH,
                y: 5 + d.height * TREE_VERTICAL_SPACE + y * TREE_ITEM_HEIGHT
            }
        }

        n.enter().append('a')
            .attr('href', (d) => '/shard/' + d.id)
            .append('rect')
            .attr('style', 'fill: white; stroke: black; stroke-width: 2;')
            .attr('x', (d) => nodePos(d, 0, 0).x + 'px')
            .attr('y', (d) => nodePos(d, 0, 0).y + 'px')
            .attr('width', (d) => TREE_ITEM_WIDTH + 'px')
            .attr('height', (d) => TREE_ITEM_HEIGHT + 'px')

        e.enter().append('line')
            .attr('stroke-width', 2)
            .attr('stroke', 'black')
            .attr('x1', (d) => nodePos({height: d.height, idx: d.idx1}, 0.5, 0).x + 'px')
            .attr('y1', (d) => nodePos({height: d.height, idx: d.idx1}, 0.5, 0).y + 'px')
            .attr('x2', (d) => nodePos({height: d.height - 1, idx: d.idx0}, 0.5, 1).x + 'px')
            .attr('y2', (d) => nodePos({height: d.height - 1, idx: d.idx0}, 0.5, 1).y + 'px')

        /*e.transition().duration(250)
            .attr('x1', (d) => d[0])
            .attr('x2', (d) => d[1])
        
        e.enter().append('line')
            .attr('x1', (d) => d[0])
            .attr('x2', (d) => d[0])
            .transition().duration(250)
            .attr('x2', (d) => d[1])*/
        
    }

    mounted() {
        this.animate(0);
    }
}
</script>
