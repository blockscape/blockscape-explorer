<template>
<canvas :width="canvasSize" :height="canvasSize"></canvas>
</template>

<style scoped>

canvas {
    display: block;

    margin-left: auto;
    margin-right: auto;
}

</style>

<script lang="ts">
import _ from 'lodash';
import Vue, { ComponentOptions } from 'vue';
import Component from 'vue-class-component';

import * as primitives from '../lib/canvas/primitives';

// Constants for the animation
const PRIMARY_CYCLE_TIME = 3000;

const BORDER_RADIUS_FACTOR = 36;
const MATRIX_SIZE = 12;
const SPEED_FACTOR = 200;
const LEAVE_TIME = 1750;
const FADE_SPEED = 150;

function ease(t: number, b: number, c: number, d: number) {
    return -c * ((t=t/d-1)*t*t*t - 1) + b;
}

@Component({
    props: {
        size: {
            default: 120
        }
    }
})
export default class Spinner extends Vue {

    ctx: CanvasRenderingContext2D;
    stopped: boolean;
    canvasScale: number;
    size: number;
    start: number = -1;

    matrixContent: string[] = [];
    matrixCycles: number[] = [];

    data() {
        return {
            canvasScale: 1.2
        };
    }

    get canvasSize() {
        return this.size * this.canvasScale;
    }

    generateMatrixContent() {
        this.matrixContent = [];
        for(let i = 0;i < MATRIX_SIZE * MATRIX_SIZE;i++) {
            this.matrixContent.push(Math.floor(Math.random() * 2) + '');
        }
    }

    animate(time: number) {

        if(!this.ctx)
            this.ctx = (<HTMLCanvasElement>this.$el).getContext('2d');

        if(this.stopped)
            return;
        
        if(this.start == -1) {
            this.start = 0;

            for(let i = 0;i < MATRIX_SIZE * MATRIX_SIZE;i++) {
                // calculate the initial arrival time
                const x = i % MATRIX_SIZE;
                const y = Math.floor(i / MATRIX_SIZE);
                
                // the time in which the letter will have arrived
                // take into account cycle stuff
                let arrival = this.start + 1000;
                if(y % 2 == 0)
                    arrival += y * 93 + x * 250;
                else
                    arrival += 125 + (y - 1) * 93 + (MATRIX_SIZE - x - 1) * 250;
                
                this.matrixCycles[i] = arrival;
            }
        }

        requestAnimationFrame(<FrameRequestCallback>_.bind(this.animate, this));

        // Draw stuff on the canvas based on the current time.
        this.ctx.clearRect(0, 0, this.canvasSize, this.canvasSize);

        this.ctx.stroke();
        this.ctx.lineWidth = this.canvasSize / BORDER_RADIUS_FACTOR;
        this.ctx.fillStyle = '#0099ff';
        this.ctx.strokeStyle = '#0099ff';

        const inset = this.ctx.lineWidth * 2;

        this.ctx.font = 'bold ' + ((this.canvasSize - inset * 2) / MATRIX_SIZE) + 'px Inconsolata';
        this.ctx.textAlign = 'center';
        this.ctx.textBaseline = 'top';

        // first draw flying digits
        for(let i = 0;i < MATRIX_SIZE * MATRIX_SIZE;i++) {

            // update cycle turnover if necessary
            if(time >= this.matrixCycles[i] + LEAVE_TIME + 500) {
                // regenerate the matrix number
                this.matrixContent[i] = Math.floor(Math.random() * 2) + '';

                // also do the phase shift
                this.matrixCycles[i] += PRIMARY_CYCLE_TIME;
            }

            // calculate the arrival time
            const x = i % MATRIX_SIZE;
            const y = Math.floor(i / MATRIX_SIZE);

            if(time < this.matrixCycles[i] + LEAVE_TIME && time >= this.matrixCycles[i]) {
                this.ctx.fillStyle = 'rgba(0, 144, 255, 1)';
                this.ctx.fillText(this.matrixContent[i], 
                        inset + (this.canvasSize - inset * 2) / MATRIX_SIZE * (x + 0.5),
                        inset + (this.canvasSize - inset * 2) / MATRIX_SIZE * y);
            }
            else {
                let opacity = 1 - Math.max(time - (this.matrixCycles[i] + LEAVE_TIME), this.matrixCycles[i] - time) / FADE_SPEED;
                this.ctx.fillStyle = 'rgba(0, 144, 255, ' + opacity + ')';

                this.ctx.fillText(this.matrixContent[i], 
                        inset + (this.canvasSize - inset * 2) / MATRIX_SIZE * (x + 0.5),
                        inset + (this.canvasSize - inset * 2) / MATRIX_SIZE * y);
            }
            /*else {
                this.ctx.fillText(this.matrixContent[i], 
                        inset + (this.canvasSize - inset * 2) / MATRIX_SIZE * (x + 0.5),
                        inset + (this.canvasSize - inset * 2) / MATRIX_SIZE * y + (this.canvasSize / SPEED_FACTOR) * (this.matrixCycles[i] + LEAVE_TIME - time));
            }*/
        }

        // then draw a rectangle
        primitives.drawSoftRectangle(this.ctx, this.ctx.lineWidth * 3, this.ctx.lineWidth / 2, this.ctx.lineWidth / 2, this.canvasSize - this.ctx.lineWidth / 2, this.canvasSize - this.ctx.lineWidth / 2);
    }

    mounted() {
        this.generateMatrixContent();
        this.animate(0);
    }

    activated() {
        this.stopped = false;
        this.animate(0);
    }

    deactivated() {
        this.stopped = true;
    }
}
</script>