<template>
<div class="container">
    <div class="card">
        <h2>{{ title }}</h2>
        <slot></slot>
    </div>
</div>
</template>

<style lang="scss" scoped>

.container {
    padding: 5px;
    width: 100%;
    box-sizing: border-box;
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

@Component({
    props: {
        title: {
            type: String,
            required: true
        }
    }
})
export default class Card extends Vue {
    title: String;
    
}
</script>
