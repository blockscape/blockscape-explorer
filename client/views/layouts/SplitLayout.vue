<template>
<main>
    <div class="column"
        v-for="id in columnIdentifiers"
        :style="{width: Math.floor(100.0 / columns) + '%' }">
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
