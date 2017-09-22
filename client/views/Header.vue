<template>
<header class="header">
<div class="infobar">
    <div class="kv">
        <span class="key"># Nodes:</span>
        <span class="value">0</span>
    </div>
    <div class="kv">
        <span class="key">Root Height:</span>
        <span class="value">0</span>
    </div>
</div>
<div class="actionbar">
    <div class="logo">
        <img :src="require('img/logo.png')" />
        <span>SCAPE</span>
    </div>
    <div class="searchbar">
        <form>
            <input type="text" placeholder="Block, Txn, Account..." />
        </form>
    </div>
</div>
</header>
</template>

<style lang="scss">

.header {

    color: white;

    .infobar {
        display: block;
        width: 100%;

        background-color: #383838;
        height: 35px;
        line-height: 35px;

        padding-left: 10px;
        padding-right: 10px;

        .kv {
            display: inline-block;
            margin-right: 20px;

            .key {
                min-width: 100px;
            }

            .value {
                min-width: 40px;
                text-align: right;
            }
        }
    }

    .logo {
        img {
            width: 50px;
            height: 50px;
        }

        span {
            vertical-align: super;
            font-size: 50px;
            font-family: Quicksand;
        }

        display: inline-block;
    }

    .actionbar {
        margin: 10px;
    }

    .searchbar {
        vertical-align: super;
        display: inline-block;

        width: 480px;

        form {
            width: 100%;
        }

        input {
            //height: 50px;
            vertical-align: bottom;
            font-size: 16px;
            margin-left: 20px;
            padding-top: 10px;
            padding-bottom: 10px;
            padding-left: 10px;
            padding-right: 10px;
            border: none;
            outline: none;
            width: 100%;
            //border-radius: 3px;
        }
    }
}

</style>

<script lang="ts">
import _ from 'lodash';
import Vue, { ComponentOptions } from 'vue';
import Component from 'vue-class-component';

@Component({
    props: {
    }
})
export default class Header extends Vue {
};

</script>
