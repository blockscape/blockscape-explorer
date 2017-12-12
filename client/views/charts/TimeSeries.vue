<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';

import _ from 'lodash';
import * as c3 from 'c3';
import {u256, ShardInfo} from "lib/primitives";

import Graph from './Graph';

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
        skip: {
            type: Number,
            require: true
        }
    }
})
export default class TimeSeries extends Graph {
    mode: 'full' | 'time' | 'date';
    startTime: number;
    skip: number;

    get chartX() {
        return 'date';
    }

    get chartXLabel() {
        switch(this.mode) {
            case 'full':
            case 'date':
                return 'Date';
            case 'time':
                return 'Time';
        }

        return 'Date';
    }

    get chartYLabel() {
        return 'Count';
    }

    get chartPoints() {
        const pts = _.clone(this.points);

        const dates = ['date'];

        // make as many points from the start date as the longest set of points
        let longest: number = _.max(_.map(pts, 'length'));

        for(let i = 0;i < longest - 1;i++) {
            dates.push(new Date(this.startTime + this.skip * i * 1000).toString());
        }

        pts.unshift(dates);

        return pts;
    }
}
</script>
