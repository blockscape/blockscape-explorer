<template>
<div class="card">
    <h2>{{ title }}</h2>
    <slot></slot>
</div>
</template>

<style lang="scss" scoped>
.card {
    display: inline-block;
    background-color: white;
    margin: 5px;

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
