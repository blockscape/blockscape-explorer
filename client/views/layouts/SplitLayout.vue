<template>
<main>
    <div v-for="id in columnIdentifiers"
        :class="['column', 'column-size-' + columns]">
        <slot  :name="id" ></slot>
    </div>
</main>
</template>

<style lang="scss" scoped>
main {

    max-width: 1536px;

    margin-left: auto;
    margin-right: auto;

    .column {
        display: inline-block;
        min-width: 300px;

        @media screen and (max-width: 600px) {
            display: block;
        }
    }

    .column-size-2 {
        width: 50%;
        @media screen and (max-width: 600px) {
            width: 100%;
        }
    }
    .column-size-3 {
        width: 33%;
        @media screen and (max-width: 600px) {
            width: 100%;
        }
    }
    .column-size-4 {
        width: 25%;
        @media screen and (max-width: 600px) {
            width: 100%;
        }
    }
    .column-size-5 {
        width: 20%;
        @media screen and (max-width: 600px) {
            width: 100%;
        }
    }
    .column-size-6 {
        width: 16%;
        @media screen and (max-width: 400px) {
            width: 100%;
        }
    }
}
</style>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';

@Component({
    props: {
        columns: {
            type: Number,
            default: 3
        }
    }
})
export default class Card extends Vue {
    columns: number;
    

    get columnIdentifiers() {
        const ids = [];
        for(let i = 0;i < this.columns;i++) {
            ids.push(i);
        }

        return ids;
    }
}
</script>
