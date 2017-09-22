<template>
<div :class="['toast', type]">
    <span class="close" @click="$emit('close', content)">X</span>
    <div class="heading">{{ content.title }}</div>
    <div class="body">{{ content.message }}</div>
</div>
</template>

<style scoped lang="scss">

.toast {
    background-color: #12accd;
    color: white;
    width: 250px;
    padding: 10px;
    margin: 10px;

    position: relative;

    .close {
        position: absolute;
        top: 2px;
        right: 2px;
        cursor: pointer;
    }

    .heading {
        font-size: 12pt;
    }

    &.success {
        background-color: #4eb548;
    }

    &.error {
        background-color: #cd3737;
    }
}
</style>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';

import ToastData, { ToastType } from '../lib/toast';

@Component({
    props: {
        content: ToastData
    }
})
export default class Toast extends Vue {

    content: ToastData;

    get type() {
        if(this.content.type == ToastType.Success)
            return 'success';
        else if(this.content.type == ToastType.Problem)
            return 'error';
        else return 'info';
    }
}
</script>