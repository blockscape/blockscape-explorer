<template>
<div :class="['mutation-change', change_theme]">
    <div class="kv">
        <span class="key">Type:</span>
        <span class="value">{{ change_type }}</span>
    </div>
</div>
</template>
<style lang="scss" scoped>

@import 'palette';

.mutation-change {
    //border-bottom: 1px solid $color-gray;
    border-bottom-width: 6px;
    border-bottom-style: solid;

    padding-top: 15px;

    padding-bottoM: 20px;

    padding-left: 10px;
    padding-right: 10px;
}

.admin {
    background-color: #faa;
    border-bottom-color: #f55;
}

.new-validator {
    background-color: #aaf;
    border-bottom-color: #55f;
}

.plot-event {
    background-color: #bbb;
    border-bottom-color: #666;
}

</style>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';

import { MutationChange } from 'lib/primitives/txn';

@Component({
    props: {
        change: {
            type: Object,
            required: true
        }
    }
})
export default class MiniMutationChange extends Vue {
    change: MutationChange

    get change_type() {
        switch(this.change.type) {
            case 'Admin':
                return 'Admin Event';
            case 'PlotEvent':
                return 'Event'
            case 'NewValidator':
                return 'New Validator';
            default:
                return '??? Unknown'
        }
    }

    get change_theme() {
        switch(this.change.type) {
            case 'Admin':
                return 'admin';
            case 'PlotEvent':
                return 'event'
            case 'NewValidator':
                return 'new-validator';
            default:
                return ''
        }
    }
}
</script>
