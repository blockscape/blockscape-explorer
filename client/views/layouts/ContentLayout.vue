<template>
<main>
    <div class="left">
        <slot name="left"></slot>
    </div>
    <div class="main">
        <slot name="main"></slot>
    </div>
    <div class="right">
        <slot name="right"></slot>
    </div>
</main>
</template>

<style lang="scss" scoped>
main {

    margin-left: auto;
    margin-right: auto;

    .left, .right {
        display: inline-block;
        max-width: 300px;
    }

    .main {
        display: inline-block;

        width: 100%;

        max-width: 960px;
    }
}
</style>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';

@Component({
    props: {
    }
})
export default class Card extends Vue {
    columns: number;
    
}
</script>
