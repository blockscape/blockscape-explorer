<template>
<div class="toasts">
    <toast-message
        v-for="toast in $store.state.toast" :key="toast.birth"
        :content="toast"
        @close="$store.commit('spliceToast', $event.target)">
    </toast-message>
</div>
</template>

<style scoped lang="scss">

.toasts {
    position: fixed;
    top: 10px;
    right: 10px;
    z-index: 20000;
}
</style>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';

import ToastMessage from './ToastMessage';

Vue.component('toast-message', ToastMessage);

@Component
export default class ToastStack extends Vue {

}

</script>
